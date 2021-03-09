import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import data from './sample-data.json';
import { useFHIRClient } from '../../context/FHIRClientContext';


const BPChart = () => {

    const fhirClient = useFHIRClient();
    const patientId = fhirClient.patient.id;

    const [systolicReadings, setSystolicReadings] = useState();
    const [diastolicReadings, setDiastolicReadings] = useState();
    const [adherenceLog, setAdherenceLog] = useState();

    useEffect(() => {
        // format data for chart
        const result = data.filter((patient) => patient.patientId === patientId)[0];

        if (result) {
            const systolicData = result.bp_measurements.map(({ date, systolic }) => ({ x: new Date(date), y: systolic }));
            setSystolicReadings(systolicData);

            const diastolicData = result.bp_measurements.map(({ date, diastolic }) => ({ x: new Date(date), y: diastolic }));
            setDiastolicReadings(diastolicData);

            const adherenceData = result.adherence_log.map(({ date }) => ({ x: new Date(date), y: 0 }));
            setAdherenceLog(adherenceData);
        }
    }, []);


    const chartData = {
        datasets: [
            {
                label: 'Systolic',
                data: systolicReadings,
                fill: false,
                backgroundColor: 'rgb(215, 51, 255)',
                borderColor: 'rgba(255, 51, 246, 0.2)',
                pointRadius: 6
            },
            {
                label: 'Diastolic',
                data: diastolicReadings,
                fill: false,
                backgroundColor: 'rgb(255, 0, 0)',
                borderColor: 'rgba(255, 102, 102, 0.2)',
                pointRadius: 6
            },
            {
                label: 'Meds Taken',
                data: adherenceLog,
                pointStyle: 'rect',
                fill: false,
                borderColor: 'rgba(50,205,50, 0.8)',
                backgroundColor: 'rgba(50,205,50, 0.8)',
                pointRadius: 10,
                showLine: false
            }
        ]
    };

    const options = {
        scales: {
            xAxes: [{
                type: 'time'
            }]
        },
    }


    return (
        <Container className="p-3">
            { (systolicReadings && diastolicReadings) ?
                <Line data={chartData} options={options} />
                :
                <p className="lead">No blood pressure data available.</p>}
        </Container>
    )
};

export default BPChart;