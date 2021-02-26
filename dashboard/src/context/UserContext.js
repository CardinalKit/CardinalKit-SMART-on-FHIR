import { useState, useEffect, createContext, useContext } from 'react';
import { useFHIRClient } from './FHIRClientContext';

export const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {

    const fhirClient = useFHIRClient();
    const [user, setUser] = useState(null);

    useEffect(() => {
        
        // get the current user resource from the FHIR server
        async function getUserData() {
            try {
                const currentUser = await fhirClient.user.read();
                if (currentUser) {
                    setUser(currentUser);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getUserData();

    }, [fhirClient]);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};