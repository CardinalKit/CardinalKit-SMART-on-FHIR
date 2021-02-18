import { Navbar } from 'react-bootstrap';
import logo from '../images/cardinal_logo_white.svg';
import { useUser } from '../context/UserContext';

const Header = () => {
    const user = useUser();

    return (
        <Navbar className="cardinalkit-bg-color" expand="lg">
            <Navbar.Brand href="#home">
            <img
                src={logo}
                className="d-inline-block align-top"
                alt="CardinalKit Logo"
                height="50"
            />
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text className="text-white">
                    <strong>Provider:</strong> {user.name[0].family} 
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;