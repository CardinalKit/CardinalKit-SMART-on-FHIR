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
    ObservationsVisualizer
} from 'fhir-visualizers';


/**
 * A demo component that displays FHIR data from the current patient.
 */
const PatientData = () => {
    const patient = usePatient();
    const fhirClient = useFHIRClient();

    const [resources, setResources] = useState([]);

    useEffect(() => {
        getAllResources(fhirClient)
            .then((resources) => {
                if (resources) {
                    setResources(resources);
                }
            })
            .catch(error => {
                console.log(error);
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
            <ObservationsVisualizer rows={filterResource('Observations')} />
        </Container>
    );
};

export default PatientData;