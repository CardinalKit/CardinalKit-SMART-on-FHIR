import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import moment from 'moment';
import PatientBanner from '../PatientBanner';
import DataRangeSelector from './ui/DataRangeSelector';
import { useData } from './DataContext';

/**
 * A demo heatmap calendar component for visualizing medication adherence
 */

const DataLog = () => {

    const logs = useData().bp_measurements;

    return (
        <Container className="p-3">
            <Row>
                <Col>
                    <PatientBanner />
                </Col>
                <Col>
                   <DataRangeSelector />
                </Col>
            </Row>
            <p className="text-muted">Green squares indicate dates for which data was received.</p>
            <Row>
                {logs ?
                    <Col>
                        <Card className="shadow p-2">
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
                    : 
                    <p className="lead">No log data available.</p>}
            </Row>
        </Container>
    );
}

export default DataLog;