import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { ArrowUpCircle, ArrowDownCircle } from 'react-bootstrap-icons';
import { useData } from '../DataContext';
import { thresholds, bpUnit as unit } from '../constants/constants';
import { capitalize } from '../utils/utils';

const BPStatsCard = ({ type }) => {

    const bpData = useData().bp_measurements;
    const high = thresholds[type].high;
    const low = thresholds[type].low;

    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);
    const [mean, setMean] = useState(0);

    useEffect(() => {
        const values = type === 'systolic' ? bpData.map(({ systolic }) => systolic) : bpData.map(({ diastolic }) => diastolic);
        setMin(Math.min(...values));
        setMax(Math.max(...values));
        setMean(Math.round((values.reduce((acc, val) => acc + val, 0) / values.length)));
    }, [bpData])

    return (
        <Card className="lead shadow">
            <Card.Body>
                <Card.Title>{capitalize(type)} BP</Card.Title>
                <Card.Text>
                    <ul className="list-group">
                        {
                            [
                                { 'label': 'Min', 'value': min },
                                { 'label': 'Max', 'value': max },
                                { 'label': 'Avg', 'value': mean }
                            ].map((stat) => {
                                return (
                                    <li className={`list-group-item ${((stat.value <= low) || (stat.value >= high)) && 'list-group-item-danger'}`}>
                                        {stat.label} <strong>{stat.value}</strong> <small>{unit}</small>
                                        {stat.value >= high && <ArrowUpCircle className='ml-1' />}
                                        {stat.value <= low && <ArrowDownCircle className='ml-1' />}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default BPStatsCard;