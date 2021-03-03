import { FHIRClientProvider } from './context/FHIRClientContext';
import { PatientProvider } from './context/PatientContext';
import { UserProvider } from './context/UserContext';
import Dashboard from './components/Dashboard';

const Home = () => {
  return (
    <FHIRClientProvider>
      <UserProvider>
        <PatientProvider>
          <Dashboard />
        </PatientProvider>
      </UserProvider>
    </FHIRClientProvider>
  );
}

export default Home;
