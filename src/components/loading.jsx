import {Spinner} from "react-bootstrap";

function Loading() {
    return (
        <div className="position-absolute top-0 end-0 z-3">
            <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
}

export default Loading;