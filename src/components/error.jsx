import {Alert} from "react-bootstrap";
import {useState} from "react";
import PropTypes from "prop-types";

function Error({ msg }) {
    const [show, setShow] = useState(true);

    if (show) {
        return (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    {msg.message}
                </p>
            </Alert>
        );
    }
}

export default Error;

Error.propTypes = {
    msg: PropTypes.object,
}