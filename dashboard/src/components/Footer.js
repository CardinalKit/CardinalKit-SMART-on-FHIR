import Container from 'react-bootstrap/Container';

const Footer = () => {
    return (
        <footer id="footer">
            <Container>
                <div>
                    <hr />
                    <p className="text-center">SMART Provider Dashboard for <a href="https://cardinalkit.org" target="_blank">CardinalKit</a></p>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;