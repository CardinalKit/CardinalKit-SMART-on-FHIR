import { Container, Tabs, Tab } from 'react-bootstrap';
import MedicationLog from './MedicationLog';
import BPChart from './BPChart';
import PatientBanner from './PatientBanner';

/**
 * An example dashboard that visualizes useful information for managing hypertension
 */
export default function Hypertension() {
    return (
        <>
            <Container style={{ marginTop: '6em' }}>
                <PatientBanner />
                <Tabs defaultActiveKey="bpchart">
                    <Tab eventKey="bpchart" title="BP Trend">
                        <BPChart />
                    </Tab>
                    <Tab eventKey="medlog" title="Medication Log">
                        <MedicationLog />
                    </Tab>
                </Tabs>
            </Container>
        </>
    )
}
