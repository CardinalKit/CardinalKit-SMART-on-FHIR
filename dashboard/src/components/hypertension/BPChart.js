import { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap';
import { ArrowUp, ArrowUpCircle, Gear } from 'react-bootstrap-icons';
import { Line } from 'react-chartjs-2';
import data from './sample-data.json';
import { useFHIRClient } from '../../context/FHIRClientContext';
import moment from 'moment';
import * as zoom from 'chartjs-plugin-zoom';
import PatientBanner from './PatientBanner';


// define threshold values for defining uncontrolled BP
const systolicHighThreshold = 140;
const diastolicHighThreshold = 90;

const BPChart = () => {

    const fhirClient = useFHIRClient();
    const patientId = fhirClient.patient.id;

    // data
    const [systolicReadings, setSystolicReadings] = useState();
    const [diastolicReadings, setDiastolicReadings] = useState();
    const [adherenceLog, setAdherenceLog] = useState();
    const [medicationList, setMedicationList] = useState();
    const [labs, setLabs] = useState();

    // stats
    const [percentUncontrolled, setPercentUncontrolled] = useState(0);
    const [systolicMin, setSystolicMin] = useState();
    const [systolicMax, setSystolicMax] = useState();
    const [systolicMean, setSystolicMean] = useState();
    const [diastolicMin, setDiastolicMin] = useState();
    const [diastolicMax, setDiastolicMax] = useState();
    const [diastolicMean, setDiastolicMean] = useState();

    useEffect(() => {
        // format BP data for display
        const result = data.filter((patient) => patient.patientId === patientId)[0];

        if (result) {
            const bpData = result.bp_measurements;
            const medications = result.medications;
            setMedicationList(medications);
            const labs = result.labs;
            setLabs(labs);

            if (bpData.length > 0) {
                // prepare data for line chart
                const systolicData = bpData.map(({ date, systolic }) => ({ x: new Date(date), y: systolic }));
                setSystolicReadings(systolicData);

                const diastolicData = bpData.map(({ date, diastolic }) => ({ x: new Date(date), y: diastolic }));
                setDiastolicReadings(diastolicData);

                const adherenceData = result.adherence_log.map(({ date }) => ({ x: new Date(date), y: 0 }));
                setAdherenceLog(adherenceData);

                // calculate stats
                const systolicValues = bpData.map(({ systolic }) => systolic);
                setSystolicMin(Math.min(...systolicValues));
                setSystolicMax(Math.max(...systolicValues));
                setSystolicMean(Math.round((systolicValues.reduce((acc, val) => acc + val, 0) / systolicValues.length)));

                const diastolicValues = bpData.map(({ diastolic }) => diastolic);
                setDiastolicMin(Math.min(...diastolicValues));
                setDiastolicMax(Math.max(...diastolicValues));
                setDiastolicMean(Math.round((diastolicValues.reduce((acc, val) => acc + val, 0) / diastolicValues.length)));

                const fractionUncontrolled = (bpData.filter(measurement => measurement.systolic >= systolicHighThreshold || measurement.diastolic >= diastolicHighThreshold).length) / bpData.length;
                setPercentUncontrolled(Math.round(fractionUncontrolled * 100));
            }

        }
    }, [patientId]);


    const chartData = {
        datasets: [
            {
                label: 'Systolic Blood Pressure (mmHg)',
                data: systolicReadings,
                fill: false,
                backgroundColor: 'rgb(0,152,219)',
                borderColor: 'rgba(0,152,219, 0.2)',
                pointRadius: 6
            },
            {
                label: 'Diastolic Blood Pressure (mmHg)',
                data: diastolicReadings,
                fill: false,
                backgroundColor: 'rgb(233, 131, 0)',
                borderColor: 'rgba(233,131,0, 0.2)',
                pointRadius: 6
            },
            {
                label: 'Medications Taken',
                data: adherenceLog,
                pointStyle: 'rectRounded',
                fill: false,
                borderColor: 'rgba(0,155,118, 0.8)',
                backgroundColor: 'rgba(0,155,118, 0.8)',
                pointRadius: 6,
                showLine: false
            }
        ]
    };

    const options = {
        pan: {
            enabled: true,
            mode: 'x'
        },
        zoom: {
            enabled: true,
            mode: 'x'
        },
        tooltips: {
            enabled: true
        },
        scales: {
            xAxes: [{
                type: 'time',
                unit: 'day',
                time: {
                    min: moment().subtract(14, 'days').toDate(),
                    max: moment().toDate(),
                }
            }]
        },
        spanGaps: true
    }


    return (
        <Container className="p-3">
            <Row>
                <Col>
                    <PatientBanner />
                </Col>
                <Col>
                    <DropdownButton
                        menuAlign="right"
                        title="Last 2 weeks"
                        id="dropdown-menu-align-right"
                        variant="outline-secondary"
                        style={{ textAlign: 'right' }}
                    >
                        <Dropdown.Item eventKey="1">Last 2 weeks</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Last month</Dropdown.Item>
                        <Dropdown.Item eventKey="3">Last 6 months</Dropdown.Item>
                    </DropdownButton>
                </Col>
            </Row>
            <Row>
                <Col>
                    {(systolicReadings && diastolicReadings) ?
                        <Card className="p-2 shadow">
                            <Line data={chartData} options={options} />
                        </Card>
                        :
                        <Card className="p-2 text-center shadow">
                            <p className="lead">No blood pressure data available.</p>
                        </Card>
                    }
                </Col>
            </Row>

            <br />

            <Row>
                <Col>
                    <Card className="lead shadow">
                        <Card.Body>
                            <Card.Title>Summary</Card.Title>
                            <Card.Text>
                                <ul className="list-group">
                                    <li className="list-group-item"><ArrowUpCircle className="mr-2 mb-1" /><strong>{percentUncontrolled}%</strong> of blood pressure readings in the last two weeks were elevated.</li>
                                </ul>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="lead shadow">
                        <Card.Body>
                            <Card.Title>Systolic BP</Card.Title>
                            <Card.Text>
                                <ul className="list-group">
                                    <li className={`list-group-item ${systolicMin > systolicHighThreshold && 'list-group-item-danger'}`}>Min <strong>{systolicMin}</strong> <small>mmHg</small> {systolicMin > systolicHighThreshold && <ElevatedArrow />}</li>
                                    <li className={`list-group-item ${systolicMax > systolicHighThreshold && 'list-group-item-danger'}`}>Max <strong>{systolicMax}</strong> <small>mmHg</small> {systolicMax > systolicHighThreshold && <ElevatedArrow />}</li>
                                    <li className={`list-group-item ${systolicMean > systolicHighThreshold && 'list-group-item-danger'}`}>Avg <strong>{systolicMean}</strong> <small>mmHg</small> {systolicMean > systolicHighThreshold && <ElevatedArrow />}</li>
                                </ul>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="lead shadow">
                        <Card.Body>
                            <Card.Title>Diastolic BP</Card.Title>
                            <Card.Text>
                                <ul class="list-group">
                                    <li className={`list-group-item ${diastolicMin > diastolicHighThreshold && 'list-group-item-danger'}`}>Min <strong>{diastolicMin}</strong> <small>mmHg</small> {diastolicMin > diastolicHighThreshold && <ElevatedArrow />}</li>
                                    <li className={`list-group-item ${diastolicMax > diastolicHighThreshold && 'list-group-item-danger'}`}>Max <strong>{diastolicMax}</strong> <small>mmHg</small> {diastolicMax > diastolicHighThreshold && <ElevatedArrow />}</li>
                                    <li className={`list-group-item ${diastolicMean > diastolicHighThreshold && 'list-group-item-danger'}`}>Avg <strong>{diastolicMean}</strong> <small>mmHg</small> {diastolicMean > diastolicHighThreshold && <ElevatedArrow />}</li>
                                </ul>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <Card className="lead shadow">
                        <Card.Body>
                            <Card.Title>Current Medications</Card.Title>
                            <Card.Text>
                                <ul className="list-group">
                                    {medicationList ? medicationList.map((medication) => {
                                        return <li className="list-group-item">{medication.name} <br />
                                            <small className="text-muted">started on {medication.start_date}</small></li>
                                    }) :
                                        <li className="list-group-item">No medications.</li>}
                                </ul>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="lead shadow">
                        <Card.Body>
                            <Card.Title>Common Labs <Gear className="ml-1 mb-1" /></Card.Title>
                            <Card.Text>
                                <ul className="list-group">
                                    {labs && labs.map((lab) => {
                                        return (
                                            <li className="list-group-item">
                                                <span>{lab.name} · <strong>{lab.value}</strong> <small>{lab.unit}</small></span>
                                                <br />
                                                <span><small class="text-muted">{lab.collection_date}</small></span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </Container>
    )
};

const ElevatedArrow = () => <ArrowUp className="mb-1" style={{ color: '' }} />;



export default BPChart;