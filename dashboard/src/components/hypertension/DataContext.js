import { useState, useEffect, createContext, useContext } from 'react';
import Loading from "../Loading";
import { useFHIRClient } from '../../context/FHIRClientContext';
import sampleData from './data/sample-data.json';

export const DataContext = createContext(null);

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {

    const fhirClient = useFHIRClient();
    const patientId = fhirClient.patient.id;
    const [data, setData] = useState(null);

    useEffect(() => {
        async function getData() {
            const result = sampleData.filter((patient) => patient.patientId === patientId)[0]
            setData(result);
        }
        getData();
    }, [patientId]);

    return (
        data ?
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
        :
        <Loading />
    );
};