import {Button, Col, Form, Row} from "react-bootstrap";
import PropTypes from "prop-types";
import {useContext, useEffect, useState} from "react";
import {EditModeCtx} from "../App.jsx";

export default function TodoForm({onSubmitForm, todo}) {
    const {editMode, setEditMode} = useContext(EditModeCtx);
    const [title, setTitle] = useState('')

    useEffect(() => {
        setTitle(todo.title)
    }, [todo])

    const onChangeInput = (e) => {
        setTitle(e.target.value)
    }

    const onCancel = (e) => {
        e.preventDefault()
        setEditMode(false)
    }

    const localOnSubmit = (e) => {
        e.preventDefault()
        if (title === '') return
        onSubmitForm({id: todo.id, title, completed: todo.completed})
    }

    return (
        <Form onSubmit={localOnSubmit}>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="todoId">{editMode ? "Edit Item" : "New Item"}</Form.Label>
                <Form.Control type="text"
                              id="todoId"
                              value={title}
                              onChange={onChangeInput}
                              placeholder="Enter Todo title"
                />
            </Form.Group>

            <Row>
                <Col className="gap-2 d-md-flex ">
                    <Button variant="primary"
                            type="submit"
                            className={editMode ? "d-none" : ""}>
                        Add
                    </Button>
                </Col>
                <Col className="gap-2 d-md-flex justify-content-md-end">
                    <Button variant="primary"
                            type="submit"
                            className={!editMode ? "d-none" : ""}>
                        Save
                    </Button>
                    <Button variant="secondary"
                            type="submit"
                            className={!editMode ? "d-none" : ""}
                            onClick={onCancel}>
                        Cancel
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}

TodoForm.propTypes = {
    onSubmitForm: PropTypes.func,
    todo: PropTypes.object,
    onChangeItem: PropTypes.func
}