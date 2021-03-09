import { useState, useEffect } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Container, Row, Col } from 'react-bootstrap';
import data from './sample-data.json';
import { useFHIRClient } from '../../context/FHIRClientContext';
import { getAllMedications } from '../../fhir';
import moment from 'moment';

/**
 * A demo heatmap calendar component for visualizing medication adherence
 */

const MedicationLog = () => {

    const fhirClient = useFHIRClient();
    const patientId = fhirClient.patient.id;

    const [medicationList, setMedicationList] = useState();
    const [medicationLogs, setMedicationLogs] = useState();

    useEffect(() => {
        // get medication log data
        const result = data.filter((patient) => patient.patientId === patientId)[0];
        if (result) {
            setMedicationLogs(result.medications);
        }

        // get medication list
        async function getMedicationList() {
            const medications = await getAllMedications(fhirClient);
            setMedicationList(medications);
        }
        getMedicationList();
    }, [fhirClient, patientId]);

    return (
        <Container className="p-3">
            <Row>
                <Col>
                    {(medicationLogs && medicationLogs.length) ? medicationLogs.map((log) => {
                        return (
                            <>
                                <h4 className="lead">{log.medication_name}</h4>
                                <br />
                                <CalendarHeatmap
                                    startDate={moment().subtract(6, 'months').toDate()}
                                    endDate={new Date()}
                                    showWeekdayLabels={true}
                                    horizontal={true}
                                    gutterSize={5}
                                    values={log.dates_taken}
                                />
                            </>
                        )
                    })
                        : <p className="lead">No medication log data available.</p>}

                </Col>
                {(medicationList && medicationList.length) &&
                    <Col md={4}>
                        <h4 className="lead">Medication List</h4>

                        <div>
                            <ul>
                                {medicationList.map((medicationName) => {
                                    return <li>{medicationName}</li>
                                })
                                }
                            </ul>
                        </div>
                    </Col>
                }
            </Row>
        </Container>
    );
}

export default MedicationLog;