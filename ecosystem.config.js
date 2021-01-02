module.exports = {
  apps: [
    {
      name: "real_estate_backend",
      script: "./dist/server.js",
      instances: 0,
      exec_mode: "cluster",
      // wait_ready: true,
      // kill_timeout: 5000, // SIGINT -> SIGKILL 전송까지의 시간
    },
  ],
};
