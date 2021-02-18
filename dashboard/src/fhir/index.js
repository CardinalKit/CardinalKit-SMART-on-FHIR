export const getAllResources = async (fhirClient) => {
    const resourceBundle = await fhirClient.request(`/Patient/${fhirClient.patient.id}/$everything`, 
    {
        pageLimit: 0,
        flat: true,
        useRefreshToken: true
    });
    return resourceBundle;
};