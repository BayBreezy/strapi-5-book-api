const mediaSrc = ["'self'", "data:", "blob:", "market-assets.strapi.io"];

export default [
  "strapi::logger",
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": mediaSrc,
          "media-src": mediaSrc,
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  "strapi::cors",
  {
    name: "strapi::poweredBy",
    config: {
      poweredBy: "Behon Baker <https://behonbaker.com>",
    },
  },
  "strapi::query",
  {
    name: "strapi::body",
    config: {
      jsonLimit: "3mb",
      formLimit: "10mb",
      textLimit: "256kb",
      encoding: "gbk",
    },
  },
  "strapi::compression",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
  "strapi::responseTime",
];
