import '@testing-library/jest-dom';
import {afterAll, afterEach, beforeAll} from 'vitest'
import {setupServer} from 'msw/node'
import {http, HttpResponse, JsonBodyType} from 'msw'
import {Todo} from "./todos.types.ts";
import {config} from "./config.ts";

console.log('TEST BACKEND_BASE_URL:', config.BACKEND_BASE_URL)

const initialData = [
  {
    "id": 1,
    "title": "Test Title 1",
    "completed": false,
  },
  {
    "id": 2,
    "title": "Test Title 2",
    "completed": true
  },
  {
    "id": 3,
    "title": "Test Title 3",
    "completed": false
  }
]

let workingData = [...initialData]

type RequestParams = {
  id: string
}

export const restHandlers = [
  http.get(config.BACKEND_BASE_URL + '/todos', () => {
    return HttpResponse.json(workingData, { status: 200 })
  }),

  http.post<never, Todo, JsonBodyType>(config.BACKEND_BASE_URL + '/todos', async ({ request }) => {
    const body = await request.json()
    const newTodo = { ...body, id: workingData.length + 1 }
    workingData.push(newTodo);

    return HttpResponse.json(newTodo, {
      status: 201,
      headers: {
        Location: config.BACKEND_BASE_URL + '/todos/' + newTodo.id,
      },
    })
  }),

  http.patch<RequestParams, Todo, JsonBodyType>(config.BACKEND_BASE_URL + '/todos/:id', async ({ request, params }) => {
    const body = await request.json()
    const { id } = params
    const editTodo = { ...body, id: parseInt(id) }
    const index = workingData.findIndex(todo => todo.id === parseInt(id))
    workingData[index] = editTodo
    return HttpResponse.json(editTodo, { status: 200 })
  }),

  http.delete<RequestParams, Todo>(config.BACKEND_BASE_URL + '/todos/:id', ({ params }) => {
    const { id } = params
    const index = workingData.findIndex(todo => todo.id === parseInt(id))
    workingData.splice(index, 1)
    return new HttpResponse(null, { status: 204 })
  }),
]

const server = setupServer(...restHandlers)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => {
  server.resetHandlers()
  workingData = [...initialData]
})