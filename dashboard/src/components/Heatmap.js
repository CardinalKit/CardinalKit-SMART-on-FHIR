import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Container } from 'react-bootstrap';

/**
 * A demo heatmap calendar component for visualizing medication adherence
 */

const Heatmap = () => {
    return (
        <Container className="p-3">
            <h1 className="display-4">Medication Log</h1>
            <CalendarHeatmap
                startDate={new Date('2020-09-01')}
                endDate={new Date()}
                showWeekdayLabels={true}
                horizontal={true}
                gutterSize={5}
                values={sampleData(new Date('2020-09-01'))}
            />
        </Container>
    );
}

const sampleData = (startDate) => {
    // generates randomized sample data for testing the heatmap
    let values = [];
    for (let d = startDate; d <= new Date(); d.setDate(d.getDate() + 1)) {
        if (Math.random() < 0.5) {
            values.push({ date: new Date(d), count: 1 });
        }
    };
    return values;
}


export default Heatmap;