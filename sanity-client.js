// Sanity client
import sanityClient from "@sanity/client";

const client = sanityClient({
  projectId: "2hsh4d2g",
  dataset: "production",
  apiVersion: "2021-11-14", // use current UTC date - see "specifying API version"!
  useCdn: true, // `false` if you want to ensure fresh data
});

export default client;
