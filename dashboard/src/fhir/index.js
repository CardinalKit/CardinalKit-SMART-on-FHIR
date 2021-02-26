/**
 * Helper functions for use with the FHIR client. 
 */


export const getAllResources = async (fhirClient) => {
    const resourceBundle = await fhirClient.request(`/Patient/${fhirClient.patient.id}/$everything`, 
    {
        pageLimit: 0,
        flat: true,
        useRefreshToken: true
    });
    return resourceBundle;
};

export const getAccessToken = (fhirClient) => {
    const header = fhirClient.getAuthorizationHeader();
    return header.replace("Bearer ", "");
};