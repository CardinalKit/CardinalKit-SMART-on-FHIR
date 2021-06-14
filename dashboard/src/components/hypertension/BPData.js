import { Container, Row, Col } from 'react-bootstrap';
import { useData } from './DataContext';
import PatientBanner from '../PatientBanner';
import MedicationsCard from './cards/MedicationsCard';
import LabsCard from './cards/LabsCard';
import SummaryCard from './cards/SummaryCard';
import BPStatsCard from './cards/BPStatsCard';
import LineChart from './charts/LineChart';
import DataRangeSelector from './ui/DataRangeSelector';
import Loading from '../Loading';

const BPData = () => {
    const data = useData();

    return data ?
        <Container className="p-3">
            <Row>
                <Col>
                    <PatientBanner />
                </Col>
                <Col>
                    <DataRangeSelector />
                </Col>
            </Row>
            <Row>
                <Col>
                    <LineChart />
                </Col>
            </Row>

            <br />

            <Row>
                <Col>
                    <SummaryCard />
                </Col>
                <Col>
                    <BPStatsCard type="systolic" />
                </Col>
                <Col>
                    <BPStatsCard type="diastolic" />
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <MedicationsCard />
                </Col>
                <Col>
                    <LabsCard />
                </Col>
            </Row>

        </Container>
        :
        <Loading />
};

export default BPData;