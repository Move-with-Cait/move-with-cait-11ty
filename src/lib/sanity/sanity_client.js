import { createClient } from "@sanity/client";

export const sanity_client = createClient({
    projectId: "oupsx8bd",
    dataset: "production",
    apiVersion: "2024-12-01",
    useCdn: false,
});
