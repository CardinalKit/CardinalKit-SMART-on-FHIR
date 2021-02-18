import { createContext, useContext } from 'react';

export const FHIRClientContext = createContext(null);

export const useFHIRClient = () => useContext(FHIRClientContext);

export const FHIRClientProvider = ({ children, fhirClient }) =>
    <FHIRClientContext.Provider value={fhirClient}>{children}</FHIRClientContext.Provider>;
