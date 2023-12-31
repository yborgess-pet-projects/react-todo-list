const API_VERSION = import.meta.env.VITE_API_VERSION;
const headers = new Headers();
headers.append('Content-Type', 'application/json');

export async function retrieveTodos() {
    const url = API_VERSION + "/todos"

    const options = {
        method: "GET",
        headers: headers,
        mode: "cors",
        cache: "default",
    };

    const request = new Request(url, options)

    return fetch(request)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json()
        })
        .catch((error) => {
            console.error(error)
            throw new Error(error.message + ": Failed to get the list of Todos from " + request.url)
        })
}


export async function addNewTodoApi(todo) {
    const url = API_VERSION + "/todos"

    const options = {
        method: "POST",
        headers: headers,
        cache: "no-cache",
        mode: "cors",
        body: JSON.stringify(todo)
    };

    const request = new Request(url, options)

    return fetch(request)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json()
        })
        .catch((error) => {
            console.error(error)
            throw new Error(error.message + ": Failed to create a new Todo from " + request.url)
        })
}

export async function deleteTodoApi(id) {
    const url = API_VERSION + "/todos/" + id

    const options = {
        method: "DELETE",
        headers: headers,
        mode: "cors",
        cache: "no-cache",
    };

    const request = new Request(url, options)

    return fetch(request)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return {}
        })
        .catch((error) => {
            console.error(error)
            throw new Error(`${error.message}: Failed to delete todo with id=${id}  a new Todo from ${request.url}`)
        })
}

export async function updateTodoApi(id, completed) {
    const url = API_VERSION + "/todos/" + id

    const patchHeaders = new Headers(headers);
    patchHeaders.set('Content-Type', 'application/merge-patch+json');

    const todo = {completed}
    const options = {
        method: "PATCH",
        headers: patchHeaders,
        cache: "no-cache",
        mode: "cors",
        body: JSON.stringify(todo)
    };

    const request = new Request(url, options)

    return fetch(request)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json()
        })
}

export async function editTitleApi(todo) {
    const url = API_VERSION + "/todos/" + todo.id

    const patchHeaders = new Headers(headers);
    patchHeaders.set('Content-Type', 'application/merge-patch+json');

    const payload = {title: todo.title}
    const options = {
        method: "PATCH",
        headers: patchHeaders,
        cache: "no-cache",
        mode: "cors",
        body: JSON.stringify(payload)
    };

    const request = new Request(url, options)

    return fetch(request)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json()
        })
}




