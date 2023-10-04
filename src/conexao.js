require(`dotenv`).config()


const knex = require('knex')({
    client: 'pg',
    connection: {
      host : process.env.HOST,
      port : process.env.PORT_DATABASE,
      user :  process.env.USER,
      password : process.env.PASSWORD,
      database : process.env.DATA_BASE
    }
  });
  module.exports = knex