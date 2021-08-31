"use strict";
const axios = require("axios");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async deploy(ctx) {
    return new Promise(async (resolve, reject) => {
      const data = ctx.request.body;
      try {
        let res = await axios.post(
          "http://192.168.5.177:2021/domain/demo/v2/job/deploy",
          data
        );
        resolve({ succ: true });
      } catch (error) {
        reject(error);
      }
    });
  },
  async run(ctx) {
    return new Promise(async (resolve, reject) => {
      const data = ctx.request.body;
      try {
        let res = await axios.put(
          `http://192.168.5.177:2021/domain/demo/v2/job/${data.id}/execute`
        );
        resolve({ succ: true });
      } catch (error) {
        reject(error);
      }
    });
  },
  async emulator(ctx) {
    return new Promise(async (resolve, reject) => {
      const data = ctx.request.body;
      const { id, ...others } = data
      try {
        let res = await axios.put(
          `http://192.168.5.177:2021/domain/demo/v2/job/${id}/message`, others
        );
        resolve({ succ: true });
      } catch (error) {
        reject(error);
      }
    });
  },
};
