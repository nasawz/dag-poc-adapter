"use strict";

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

module.exports = async () => {
  const { Client } = require("hazelcast-client");
  const hz = await Client.newHazelcastClient({
    clusterName: "domain",
    network: {
      clusterMembers: ["192.168.5.177"],
    },
  });
  var io = require("socket.io")(strapi.server, {
    path: "/ws/",
  });
  // var io = require('socket.io')(strapi.server, {
  //     cors: {
  //       origin: "http://localhost:8080",
  //       methods: ["GET", "POST"],
  //       allowedHeaders: ["my-custom-header"],
  //       credentials: true
  //     }
  // });

  io.on("connection", function (socket) {
    socket.on("join", async ({ experimentId }, callback) => {
      console.log("experimentId", experimentId);
      callback();
    });

    socket.on("queryJob", async ({ experimentId, nodeIds }, callback) => {
      const map = await hz.getMap(`${experimentId}`);
      let v = await map.getAll(nodeIds);
      console.log(v);
      callback(null, { data: v });
    });

    socket.on("updateNode", async ({ data }, callback) => {
      try {
        for (let key in data) {
          console.log(`${key} : ${data[key]}`);
          const map = await hz.getMap(key);
          await map.put(`s_${key}`, data[key])
        }
        callback(null, { data: "success" });
      } catch (error) {
        callback(error);
      }
    });

    // console.log("=========connection");
    // socket.on("join", ({ username, room }) => {
    //   console.log("user connected");
    //   console.log("username is ", username);
    //   console.log("room is...", room);
    // });
  });
};
// https://webpack.js.org/configuration/dev-server/#websocketurl
