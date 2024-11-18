// import type { Core } from '@strapi/strapi';
import _ from "lodash";
import { pagination } from "@strapi/utils";
const USER_MODEL_UID = "plugin::users-permissions.user";
const { transformPagedPaginationInfo } = pagination;

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {
    // Set the requestTimeout to 1,800,000 milliseconds (30 minutes):
    strapi.server.httpServer.requestTimeout = 30 * 60 * 1000;

    strapi.plugin("users-permissions").controllers.user.find = async function (ctx) {
      if (ctx?.query?.limit) ctx.query.limit = Number(ctx.query.limit);
      if (ctx?.query?.start) ctx.query.start = Number(ctx.query.start);
      const total = await strapi.db.query(USER_MODEL_UID).count(ctx.query);
      const users = await strapi.documents(USER_MODEL_UID).findMany(ctx.query);
      const pagination = transformPagedPaginationInfo(ctx.query, total);

      ctx.body = {
        data: _.map(users, (user) =>
          _.omit(user, ["password", "resetPasswordToken", "confirmationToken"]),
        ),
        meta: {
          pagination,
        },
      };
    };
    strapi.plugin("upload").controllers["content-api"].find = async function (ctx) {
      if (ctx?.query?.pagination) {
        // @ts-ignore
        if (ctx.query.pagination.page) {
          // @ts-ignore
          ctx.query.page = ctx.query.pagination.page;
        }
        // @ts-ignore
        if (ctx.query.pagination.pageSize) {
          // @ts-ignore
          ctx.query.pageSize = ctx.query.pagination.pageSize;
        }
      }
      const files = await strapi.plugin("upload").services.upload.findPage(ctx.query);
      ctx.body = {
        data: files.results,
        meta: {
          pagination: files.pagination,
        },
      };
    };
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {},
};
