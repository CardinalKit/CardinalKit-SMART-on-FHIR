import { useState, useEffect } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Container, Row, Col, Card, Dropdown, DropdownButton } from 'react-bootstrap';
import data from './sample-data.json';
import { useFHIRClient } from '../../context/FHIRClientContext';
import { getAllMedications } from '../../fhir';
import moment from 'moment';
import PatientBanner from './PatientBanner';

/**
 * A demo heatmap calendar component for visualizing medication adherence
 */

const DataLog = () => {

    const fhirClient = useFHIRClient();
    const patientId = fhirClient.patient.id;
    const [logs, setLogs] = useState();

    useEffect(() => {
        // get medication log data
        const result = data.filter((patient) => patient.patientId === patientId)[0];
        if (result) {
            setLogs(result.bp_measurements);
        }
        console.log(logs);
    }, [fhirClient, patientId]);

    return (
        <Container className="p-3">
            <Row>
                <Col>
                    <PatientBanner />
                </Col>
                <Col>
                    <DropdownButton
                        menuAlign="right"
                        title="Last 6 months"
                        id="dropdown-menu-align-right"
                        variant="outline-secondary"
                        style={{ textAlign: 'right' }}
                    >
                        <Dropdown.Item eventKey="1">Last 6 months</Dropdown.Item>
                    </DropdownButton>
                </Col>
            </Row>
            <p className="text-muted">Green squares indicate dates for which data was received.</p>
            <Row>
                {logs ? 
                        <Col>
                            <Card className="shadow p-2">
                                <Card.Title className="p-2"><h2 className="display-4">2021</h2></Card.Title>
                                <Card.Body>
                                    <CalendarHeatmap
                                        startDate={moment().subtract(6, 'months').toDate()}
                                        endDate={new Date()}
                                        showWeekdayLabels={true}
                                        horizontal={true}
                                        gutterSize={5}
                                        values={logs}
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                
                    : <p className="lead">No log data available.</p>}
            </Row>
        </Container>
    );
}

export default DataLog;