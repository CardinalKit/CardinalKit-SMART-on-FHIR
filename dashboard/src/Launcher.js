import { useEffect } from "react";
import FHIR from "fhirclient";

export default function Launcher() {
    useEffect(() => {
        FHIR.oauth2.authorize({
            clientId: process.env.REACT_APP_SMART_CLIENTID,
            clientSecret: process.env.REACT_APP_SMART_CLIENTSECRET,
            scope: "openid fhirUser user/Observation.read user/Patient.read offline_access launch",
            redirectUri: './app',
            completeInTarget: true
        });
    }, []);

    return "Launching...";
};
