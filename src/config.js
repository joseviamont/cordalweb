require("dotenv").config({path: './src/env/.env'});

module.exports = {
  app: {
    port: process.env.PORT || 4000,
  },
  jwt: {
    secret: process.env.JET_SECRET || 'notasecreta!'
  },
  mysql: {
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'contrasena',
    database: process.env.MYSQL_DB || 'ejemplo'
  }
};
