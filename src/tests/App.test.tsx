import {expect, test} from 'vitest'
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import App from "../App.tsx";

test("When application is loaded, then it renders the list of todos", async () => {
  render(<App/>);
  await waitApplicationLoaded();
});

test("When clicking in Add button, then a new todo is added to the list", async () => {
  const { getByText, container } = render(<App/>);
  await waitApplicationLoaded();

  const input = container.querySelector("#todo-input");
  if (!input) {
    throw new Error("todo-input not found");
  }
  const addButton = getByText("Add");

  fireEvent.change(input, { target: { value: "New Todo" } });
  fireEvent.click(addButton);

  await waitFor(() => {
    expect(getByText("New Todo")).toBeInTheDocument();
  });
});

test("When clicking in Edit button and then save, we can edit a Todo title", async () => {
  const { getAllByText, container, getByText } = render(<App/>);
  await waitApplicationLoaded();

  const editButton = getAllByText("Edit")[0];
  fireEvent.click(editButton);

  const input = container.querySelector("#todo-input") as HTMLInputElement;
  if (!input) {
    throw new Error("todo-input not found");
  }

  fireEvent.change(input, { target: { value: "Edited Todo" } });
  const saveButton = getByText("Save");
  fireEvent.click(saveButton);

  await waitFor(() => {
    expect(input.value).toBe("");
    expect(getByText("Edited Todo")).toBeInTheDocument();
  });
});

test("When clicking on first delete button, then the first todo is deleted", async () => {
  const { getAllByText, queryByText } = render(<App/>);
  await waitApplicationLoaded();

  const deleteButton = getAllByText("Delete")[0];
  fireEvent.click(deleteButton);

  await waitFor(() => {
    expect(queryByText("Test Title 1")).not.toBeInTheDocument();
    expect(queryByText("Test Title 2")).toBeInTheDocument();
    expect(queryByText("Test Title 3")).toBeInTheDocument();
  });
});

test("When click on the second Todo, then the todo is marked as completed", async () => {
  const { container, getByText } = render(<App/>);
  await waitApplicationLoaded();

  const checkbox = container.querySelectorAll("li.MuiListItem-root")[2] as HTMLInputElement;
  if (!checkbox) {
    throw new Error("Checkbox not found");
  }
  fireEvent.click(checkbox);

  await waitFor(() => {
    const span = getByText("Test Title 2")
    expect(span).toBeInTheDocument();
    const parentDiv = span.closest('div');
    expect(parentDiv).toHaveStyle("text-decoration: line-through");
  });
});

async function waitApplicationLoaded() {
  await waitFor(() => {
    expect(screen.getByText("Test Title 1")).toBeInTheDocument();
    expect(screen.getByText("Test Title 2")).toBeInTheDocument();
    expect(screen.getByText("Test Title 3")).toBeInTheDocument();
  }, {
    timeout: 1000,
  });
}