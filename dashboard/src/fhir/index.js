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

export const getAllMedications = async (client) => {
    const release = await client.getFhirRelease();
    const resource = (release > 2) ? "MedicationRequest" : "MedicationOrder";
    try {
        const bundle = await client.request(resource, {
            resolveReferences: ["medicationReference"],
        });
        if (!bundle.entry || !bundle.entry.length) {
            return bundle.entry;
        } else {
            return bundle.entry.map((medication) => {
                return getMedicationName(
                    client.getPath(medication, "resource.medicationCodeableConcept.coding") ||
                    client.getPath(medication, "resource.medicationReference.code.coding")
                );
            });
        }
    } catch (error) {
        console.error(error);
    }
};

export const getMedicationName = (codings) => {
    var coding = codings.find((code) => {
        return code.system === "http://www.nlm.nih.gov/research/umls/rxnorm";
    });
    return (coding && coding.display) || "Unknown Medication";
};

export const formatName = (resource) => {
    const name = (resource.name instanceof Array) ? (resource.name.find((e) => e.use === "official") || resource.name[0]) : resource.name;
    return name ? `${(name.given ?? []).join(" ")} ${name.family ?? ""} ${name.suffix ?? ""}` : "";
};