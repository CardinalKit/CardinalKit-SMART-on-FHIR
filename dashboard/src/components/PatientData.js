import { useState, useEffect } from 'react';
import { usePatient } from '../context/PatientContext';
import { Container } from 'react-bootstrap';
import { getAllResources } from '../fhir';
import { useFHIRClient } from '../context/FHIRClientContext';
import {
    PatientVisualizer,
    AllergiesVisualizer,
    ConditionsVisualizer,
    MedicationsVisualizer,
} from 'fhir-visualizers';


const PatientData = () => {
    const patient = usePatient();
    const fhirClient = useFHIRClient();

    const [resources, setResources] = useState([]);

    useEffect(() => {
        getAllResources(fhirClient).then((resources) => {
            setResources(resources);
        });
    }, [fhirClient]);

    const filterResource = (resourceType) => {
        return resources.filter((resource) => resource.resourceType === resourceType);
    }

    return (
        <Container>
            <PatientVisualizer patient={patient} />
            <ConditionsVisualizer rows={filterResource('Condition')} />
            <MedicationsVisualizer rows={filterResource('MedicationRequest')} />
            <AllergiesVisualizer rows={filterResource('AllergyIntolerance')} />
        </Container>
    );
};

export default PatientData;