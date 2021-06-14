import { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap';
import { ArrowUpCircle, ArrowDownCircle, Gear } from 'react-bootstrap-icons';
import { Line } from 'react-chartjs-2';
import data from './sample-data.json';
import { useFHIRClient } from '../../context/FHIRClientContext';
import moment from 'moment';
import * as zoom from 'chartjs-plugin-zoom';
import PatientBanner from './PatientBanner';


// configuration
const systolicHighThreshold = 140;
const diastolicHighThreshold = 90;
const systolicLowThreshold = 90;
const diastolicLowThreshold = 60;
const bpUnit = "mmHg";

// frequently used icons
const HighArrow = () => <ArrowUpCircle className="m-1" />;
const LowArrow = () => <ArrowDownCircle className="m-1" />;

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
    const [percentHigh, setPercentHigh] = useState(0);
    const [percentLow, setPercentLow] = useState(0);
    const [systolicMin, setSystolicMin] = useState(0);
    const [systolicMax, setSystolicMax] = useState(0);
    const [systolicMean, setSystolicMean] = useState(0);
    const [diastolicMin, setDiastolicMin] = useState(0);
    const [diastolicMax, setDiastolicMax] = useState(0);
    const [diastolicMean, setDiastolicMean] = useState(0);

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

                const fractionHigh = (bpData.filter(measurement => measurement.systolic >= systolicHighThreshold || measurement.diastolic >= diastolicHighThreshold).length) / bpData.length;
                setPercentHigh(Math.round(fractionHigh * 100));

                const fractionLow = (bpData.filter(measurement => measurement.systolic <= systolicLowThreshold || measurement.diastolic <= diastolicLowThreshold).length) / bpData.length;
                setPercentLow(Math.round(fractionLow * 100));
            }

        }
    }, [patientId]);


    const chartData = {
        datasets: [
            {
                label: `Systolic Blood Pressure (${bpUnit})`,
                data: systolicReadings,
                fill: false,
                backgroundColor: 'rgb(0,152,219)',
                borderColor: 'rgba(0,152,219, 0.2)',
                pointRadius: 6
            },
            {
                label: `Diastolic Blood Pressure (${bpUnit})`,
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
                                    <li className="list-group-item">
                                        {percentHigh > 0 ? 
                                        <p><HighArrow /><strong>{percentHigh}%</strong> of BP readings were high.</p>
                                        :
                                        <p>There were no elevated blood pressures in the last two weeks.</p>
                                        }
                                        {percentLow > 0 ? 
                                        <p><LowArrow /><strong>{percentLow}%</strong> of BP readings were low.</p>
                                        :
                                        <p>There were no low blood pressures in the last two weeks.</p>
                                        }
                                    </li>

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
                                    <li className={`list-group-item ${((systolicMin <= systolicLowThreshold) || (systolicMin >= systolicHighThreshold)) && 'list-group-item-danger'}`}>
                                        Min <strong>{systolicMin}</strong> <small>{bpUnit}</small>
                                        {systolicMin >= systolicHighThreshold && <HighArrow />}
                                        {systolicMin <= systolicLowThreshold && <LowArrow />}
                                    </li>
                                    <li className={`list-group-item ${((systolicMax <= systolicLowThreshold) || (systolicMax >= systolicHighThreshold)) && 'list-group-item-danger'}`}>
                                        Max <strong>{systolicMax}</strong> <small>{bpUnit}</small>
                                        {systolicMax >= systolicHighThreshold && <HighArrow />}
                                        {systolicMax <= systolicLowThreshold && <LowArrow />}
                                    </li>
                                    <li className={`list-group-item ${((systolicMean <= systolicLowThreshold) || (systolicMean >= systolicHighThreshold)) && 'list-group-item-danger'}`}>
                                        Avg <strong>{systolicMean}</strong> <small>{bpUnit}</small>
                                        {systolicMean >= systolicHighThreshold && <HighArrow />}
                                        {systolicMean <= systolicLowThreshold && <LowArrow />}
                                    </li>
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
                                    <li className={`list-group-item ${((diastolicMin < diastolicLowThreshold) || (diastolicMin > diastolicHighThreshold)) && 'list-group-item-danger'}`}>
                                        Min <strong>{diastolicMin}</strong> <small>{bpUnit}</small>
                                        {diastolicMin > diastolicHighThreshold && <HighArrow />}
                                        {diastolicMin < diastolicLowThreshold && <LowArrow />}
                                    </li>
                                    <li className={`list-group-item ${((diastolicMax < diastolicLowThreshold) || (diastolicMax > diastolicHighThreshold)) && 'list-group-item-danger'}`}>
                                        Max <strong>{diastolicMax}</strong> <small>{bpUnit}</small>
                                        {diastolicMax > diastolicHighThreshold && <HighArrow />}
                                        {diastolicMax < diastolicLowThreshold && <LowArrow />}
                                    </li>
                                    <li className={`list-group-item ${((diastolicMean < diastolicLowThreshold) || (diastolicMean > diastolicHighThreshold)) && 'list-group-item-danger'}`}>
                                        Avg <strong>{diastolicMean}</strong> <small>{bpUnit}</small>
                                        {diastolicMean > diastolicHighThreshold && <HighArrow />}
                                        {diastolicMean < diastolicLowThreshold && <LowArrow />}
                                    </li>
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

export default BPChart;