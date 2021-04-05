import { useEffect } from "react";
import FHIR from "fhirclient";
import Loading from './components/Loading';

export default function Launcher() {
    useEffect(() => {
        FHIR.oauth2.authorize({
            clientId: process.env.REACT_APP_SMART_CLIENTID,
            clientSecret: process.env.REACT_APP_SMART_CLIENTSECRET,
            scope: process.env.REACT_APP_SMART_SCOPE,
            redirectUri: './app',
            completeInTarget: true
        });
    }, []);

    return <Loading />;
};
