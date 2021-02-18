import { useEffect, useState } from 'react';
import FHIR from 'fhirclient';
import { FHIRClientProvider } from './context/FHIRClientContext';
import { PatientProvider } from './context/PatientContext';
import { UserProvider } from './context/UserContext';
import Dashboard from './components/Dashboard';

const App = () => {

  const [fhirClient, setFhirClient] = useState(null);

  useEffect(() => {
    // initiate SMART EHR Launch Sequence
    async function launchSMART() {
      try {
        const client = await FHIR.oauth2.init({
          clientId: 'cardinalkit_dashboard',
          scope: 'launch/patient openid profile'
        });
        setFhirClient(client);
      } catch (error) {
        console.log(error);
      }
    }
    launchSMART();
  }, []);

  return (
    fhirClient &&
    <FHIRClientProvider fhirClient={fhirClient}>
      <UserProvider>
        <PatientProvider>
          <Dashboard />
        </PatientProvider>
      </UserProvider>
    </FHIRClientProvider>
  );
}

export default App;
