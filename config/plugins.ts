export default ({ env }) => ({
  "media-prefix": true,
  upload: {
    config: {
      sizeLimit: 10 * 1024 * 1024, // 10mb in bytes
    },
  },
  "gen-types": {
    enabled: true,
    config: {
      outputLocation: "generated-types.ts",
      singleFile: true,
    },
  },
  "config-sync": {
    enabled: true,
    config: {
      minify: false,
      importOnBootstrap: true,
      excludedConfig: [
        "core-store.plugin_users-permissions_grant",
        "core-store.plugin_upload_metrics",
        "core-store.strapi_content_types_schema",
        "core-store.ee_information",
      ],
    },
  },
  "users-permissions": {
    config: {
      register: {
        allowedFields: ["firstName", "lastName", "phone"],
      },
    },
  },
});
