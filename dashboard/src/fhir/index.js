/**
 * Helper functions for use with the FHIR client. 
 */

export const getAllResources = async (client) => {
    const resourceBundle = await client.request(`/Patient/${client.patient.id}/$everything`,
        {
            pageLimit: 0,
            flat: true,
            useRefreshToken: true
        });
    return resourceBundle;
};

export const formatName = (resource) => {
    const name = (resource.name instanceof Array) ? (resource.name.find((e) => e.use === "official") || resource.name[0]) : resource.name;
    return name ? `${(name.given ?? []).join(" ")} ${name.family ?? ""} ${name.suffix ?? ""}` : "";
};