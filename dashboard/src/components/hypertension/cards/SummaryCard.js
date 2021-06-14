import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { ArrowUpCircle, ArrowDownCircle } from 'react-bootstrap-icons';
import { useData } from '../DataContext';
import { thresholds } from '../constants/constants';

const SummaryCard = () => {

    const bpData = useData().bp_measurements;
    const [percentHigh, setPercentHigh] = useState(0);
    const [percentLow, setPercentLow] = useState(0);

    useEffect(() => {

        setPercentHigh(Math.round(((bpData.filter(measurement => measurement.systolic >= thresholds.systolic.high || measurement.diastolic >= thresholds.diastolic.high).length) / bpData.length) * 100));

        setPercentLow(Math.round(((bpData.filter(measurement => measurement.systolic <= thresholds.systolic.low || measurement.diastolic <= thresholds.diastolic.low).length) / bpData.length) * 100));

    }, [bpData]);

    return (
        <Card className="lead shadow">
            <Card.Body>
                <Card.Title>Summary</Card.Title>
                <Card.Text>
                    <ul className="list-group">
                        <li className="list-group-item">
                            {percentHigh > 0 ?
                                <p><ArrowUpCircle className="m-1" /><strong>{percentHigh}%</strong> of BP readings were high.</p>
                                :
                                <p>There were no elevated blood pressures.</p>
                            }
                            {percentLow > 0 ?
                                <p><ArrowDownCircle className="m-1" /><strong>{percentLow}%</strong> of BP readings were low.</p>
                                :
                                <p>There were no low blood pressures.</p>
                            }
                        </li>

                    </ul>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default SummaryCard;