import Card from 'react-bootstrap/Card';
import { Gear } from 'react-bootstrap-icons';
import { useData } from '../DataContext';

const LabsCard = () => {

    const labs = useData().labs;
    
    return (
        <Card className="lead shadow">
            <Card.Body>
                <Card.Title>Related Labs <Gear className="ml-1 mb-1" /></Card.Title>
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
    )
}

export default LabsCard;