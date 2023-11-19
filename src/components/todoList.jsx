import TodoItem from "./todoItem.jsx";
import {ListGroup} from "react-bootstrap";
import PropTypes from "prop-types";
import {useContext} from "react";
import {EditModeCtx} from "../App.jsx";

export default function TodoList({todos, completeHandler, deleteHandler, editHandler}) {
    const {editMode} = useContext(EditModeCtx);

    return (<>
            <h1 className="mt-5">Todo List</h1>
            <ListGroup>
                {todos.length === 0 && "No Todo"}
                {todos.map(todo => {
                    return (
                        <TodoItem {...todo}
                                  key={todo.id}
                                  completeHandler={completeHandler}
                                  deleteHandler={deleteHandler}
                                  editHandler={editHandler}
                                  editMode={editMode} />
                    )
                })}
            </ListGroup>
        </>
    )
}

TodoList.propTypes = {
    todos: PropTypes.array,
    completeHandler: PropTypes.func,
    deleteHandler: PropTypes.func,
    editHandler: PropTypes.func,
    editMode: PropTypes.bool
}