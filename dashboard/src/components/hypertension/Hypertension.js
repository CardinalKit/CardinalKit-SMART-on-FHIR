import { Container, Tabs, Tab } from 'react-bootstrap';
import DataLog from './DataLog';
import BPChart from './BPChart';

/**
 * An example dashboard that visualizes useful information for managing hypertension
 */
export default function Hypertension() {
    return (
        <>
            <Container style={{ marginTop: '6em' }}>
                <Tabs defaultActiveKey="bpchart" className="m-1">
                    <Tab eventKey="bpchart" title="BP Trend">
                        <BPChart />
                    </Tab>
                    <Tab eventKey="medlog" title="Data Integrity">
                        <DataLog />
                    </Tab>
                </Tabs>
            </Container>
        </>
    )
}
