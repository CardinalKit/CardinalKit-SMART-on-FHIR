import Header from './Header';
import PatientData from './PatientData';
import Heatmap from './Heatmap';

/**
 * A demo dashboard
 */
const Dashboard = () => {
    return (
        <>
            <Header />
            <Heatmap />
            <PatientData />
        </>
    );
}

export default Dashboard;