import { Navbar } from 'react-bootstrap';
import logo from '../images/cardinal_logo_white.svg';
import { useUser } from '../context/UserContext';

const Header = () => {
    const user = useUser();

    const formatProviderName = () => {
        const name = (user.name instanceof Array) ? (user.name.find((e) => e.use === "official") || user.name[0]) : user.name; 
        return name ? `${(name.given ?? []).join(" ")} ${name.family ?? ""} ${name.suffix ?? ""}` : "";
    };

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
            {user &&
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text className="text-white">
                        <strong>{formatProviderName()}</strong>
                    </Navbar.Text>
                </Navbar.Collapse>
            }
        </Navbar>
    )
}

export default Header;