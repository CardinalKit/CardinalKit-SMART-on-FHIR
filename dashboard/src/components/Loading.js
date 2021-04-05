import { Container, Row, Spinner } from 'react-bootstrap';
import logo from '../images/cardinalkit_logo.png';

const Loading = () => {
    return (
    <Container>
        <Row>
            <div className="mx-auto mt-5 mb-5 text-center" style={{ width: '500px'}}>
                <img src={logo} alt="CardinalKit Logo"/>
                <br />
                <h2>CardinalKit</h2>
                <br />
                <h4 className="lead">Loading SMART dashboard...</h4>
                <br />
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        </Row>
    </Container>
    )
}

export default Loading;