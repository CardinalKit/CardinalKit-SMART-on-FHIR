import { Navbar } from 'react-bootstrap';
import logo from '../images/cardinal_logo_white.svg';
import { useUser } from '../context/UserContext';
import { useFHIRClient } from '../context/FHIRClientContext';
import { formatName } from '../fhir';
import { Button } from 'react-bootstrap';

const Header = () => {
    const user = useUser();
    const fhirClient = useFHIRClient();
    const id_token = fhirClient.getIdToken();

    const getProviderName = () => {
        // try to get logged in provider's name from user context. 
        // if no context available, then get from ID token
        if (user) {
            return formatName(user);
        } else if(id_token) {
            return id_token.given_name + " " + id_token.family_name;
        } else {
            return "User not available";
        }
    }

    return (
        <Navbar className="cardinalkit-bg-color" fixed="top" expand="lg">
            <Navbar.Brand href="#home">
                <img
                    src={logo}
                    className="d-inline-block align-top"
                    alt="CardinalKit Logo"
                    height="50"
                />
            </Navbar.Brand>
            <Navbar.Text className="text-white mx-auto">
                <h4>CardinalKit Dashboard</h4>
            </Navbar.Text>
            <Navbar.Text className="text-white ml-auto">
                <Button variant="dark"> {getProviderName()}</Button>
            </Navbar.Text>
        </Navbar>
    )
}

export default Header;