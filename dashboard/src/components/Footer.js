import Container from 'react-bootstrap/Container';

const Footer = () => {
    return (
        <footer id="footer">
            <Container>
                <div>
                    <hr />
                    <p className="text-center">SMART-on-FHIR Dashboard for <a href="https://cardinalkit.org" target="_blank" rel="noreferrer">CardinalKit</a></p>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;