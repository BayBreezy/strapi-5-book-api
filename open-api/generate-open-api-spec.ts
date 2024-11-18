import postmanToOpenAPI from "postman-to-openapi";
import path from "path";

const postmanCollectionPath = path.join(__dirname, "Strapi 5 Book API.Postman.json");
const outputOpenAPIPath = path.join(__dirname, "openapi-spec.yml");

const main = async () => {
  try {
    await postmanToOpenAPI(postmanCollectionPath, outputOpenAPIPath, {
      servers: [{ url: "http://localhost:1337", description: "Localhost" }],
      externalDocs: {
        description: "Strapi Documentation",
        url: "https://docs.strapi.io/",
      },
      info: {
        license: {
          name: "MIT",
          url: "https://opensource.org/licenses/MIT",
        },
        contact: {
          name: "Behon Baker",
          url: "https://behonbaker.com",
          email: "behon.baker@yahoo.com",
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

main();
