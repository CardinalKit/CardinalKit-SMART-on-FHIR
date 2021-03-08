import { useEffect } from "react";
import FHIR from "fhirclient";
import Loading from './components/Loading';

export default function Launcher() {
    useEffect(() => {
        FHIR.oauth2.authorize({
            clientId: process.env.REACT_APP_SMART_CLIENTID,
            clientSecret: process.env.REACT_APP_SMART_CLIENTSECRET,
            scope: "openid fhirUser profile api:fhir user/Observation.read user/Patient.read user/Medication.read offline_access launch",
            redirectUri: './app',
            completeInTarget: true
        });
    }, []);

    return <Loading />;
};
