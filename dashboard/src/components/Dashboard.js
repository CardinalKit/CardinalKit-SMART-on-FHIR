import Header from './Header';
import Footer from './Footer';
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
            <Footer />
        </>
    );
}

export default Dashboard;