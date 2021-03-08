import { useState, useEffect } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Container } from 'react-bootstrap';
import data from './sample-data.json';
import { useFHIRClient } from '../../context/FHIRClientContext';
import moment from 'moment';

/**
 * A demo heatmap calendar component for visualizing medication adherence
 */

const MedicationLog = () => {

    const fhirClient = useFHIRClient();
    const patientId = fhirClient.patient.id;

    const [medicationLogs, setMedicationLogs] = useState();

    useEffect(() => {
        const result = data.filter((patient) => patient.patientId === patientId)[0];
        setMedicationLogs(result.medications);
    }, []);

    return (
        <Container className="p-3">
            <br />
            {medicationLogs ? medicationLogs.map((log) => {
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
        </Container>
    );
}

export default MedicationLog;