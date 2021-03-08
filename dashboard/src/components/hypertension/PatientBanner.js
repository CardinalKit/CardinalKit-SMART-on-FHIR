import { formatName } from '../../fhir';
import { usePatient } from '../../context/PatientContext';
import moment from 'moment';

const PatientBanner = () => {

    const patient = usePatient();

    return (
        <div className="mt-2">
            <p className="lead">
                <strong>{formatName(patient)}</strong> · {moment().diff(patient.birthDate, 'years')}-year-old {patient.gender || ""} ·
                DOB: {moment(patient.birthDate).format('MM/DD/YYYY')}
            </p>
        </div>
    )
};

export default PatientBanner;
