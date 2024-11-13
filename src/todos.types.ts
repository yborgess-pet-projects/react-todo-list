export interface Todo {
  id:        number;
  title:     string;
  completed: boolean;
}

// Converts JSON strings to/from your types
export class Convert {
  public static jsonToTodos(json: string): Todo[] {
    return JSON.parse(json) as Todo[];
  }
  public static jsonToTodo(json: string): Todo {
    return JSON.parse(json) as Todo;
  }
  public static todosToJson(value: Todo[]): string {
    return JSON.stringify(value);
  }

  public static todoToJson(todo: Todo): string {
    return JSON.stringify(todo);
  }
}
