import { useState, useEffect, createContext, useContext } from 'react';
import { useFHIRClient } from './FHIRClientContext';
import Loading from '../components/Loading';

export const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {

    const fhirClient = useFHIRClient();
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function getUserData() {
            const currentUser = await fhirClient.user.read();
            setUser(currentUser);
        }
        getUserData();
    }, [fhirClient]);

    return user ?
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
        :
        <Loading />
};