import {Button, Col, ListGroup, Row} from "react-bootstrap";
import PropTypes from 'prop-types';
import {useContext} from "react";
import {EditModeCtx} from "../App.jsx";

export default function TodoItem({id, title, completed, completeHandler, deleteHandler, editHandler}) {
    const {editMode} = useContext(EditModeCtx);

    const onChangeCheck = (e) => completeHandler(id, e.target.checked)
    const onClickEdit = () => editHandler(id)
    const onClickDelete = () => deleteHandler(id)

    return (
        <ListGroup.Item disabled={editMode}>
            <div className="form-check" key={id}>
                <Row>
                    <Col className="d-flex align-items-center">
                        <label className="form-check-label">
                            <input className="form-check-input" type="checkbox"
                                   disabled={editMode}
                                   checked={completed}
                                   onChange={onChangeCheck}/>
                            {title}
                        </label>
                    </Col>
                    <Col className="gap-2 d-md-flex justify-content-md-end">
                        <Button variant="primary"
                                disabled={editMode}
                                onClick={onClickEdit}>
                            Edit
                        </Button>
                        <Button variant="danger"
                                disabled={editMode}
                                onClick={onClickDelete}>
                            Delete
                        </Button>
                    </Col>
                </Row>
            </div>
        </ListGroup.Item>
    )
}

TodoItem.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    completeHandler: PropTypes.func,
    deleteHandler: PropTypes.func,
    editHandler: PropTypes.func,
    editMode: PropTypes.bool
}