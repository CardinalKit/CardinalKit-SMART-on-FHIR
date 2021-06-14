import { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import Card from 'react-bootstrap/Card';
import * as zoom from 'chartjs-plugin-zoom';
import { useData } from '../DataContext';
import { bpUnit } from "../constants/constants";

const LineChart = () => {

    const dataSource = useData();
    const bpData = dataSource.bp_measurements;
    const adherence = dataSource.adherence_log;
    const [systolicReadings, setSystolicReadings] = useState();
    const [diastolicReadings, setDiastolicReadings] = useState();
    const [adherenceLog, setAdherenceLog] = useState();

    useEffect(() => {
        if (bpData.length > 0) {
            // prepare data for line chart
            const systolicData = bpData.map(({ date, systolic }) => ({ x: new Date(date), y: systolic }));
            setSystolicReadings(systolicData);

            const diastolicData = bpData.map(({ date, diastolic }) => ({ x: new Date(date), y: diastolic }));
            setDiastolicReadings(diastolicData);

            const adherenceData = adherence.map(({ date }) => ({ x: new Date(date), y: 0 }));
            setAdherenceLog(adherenceData);
        }
    }, [bpData]);

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
        (systolicReadings && diastolicReadings) ?
            <Card className="p-2 shadow">
                <Line data={chartData} options={options} />
            </Card>
            :
            <Card className="p-2 text-center shadow">
                <p className="lead">No blood pressure data available.</p>
            </Card>
    )

};

export default LineChart;