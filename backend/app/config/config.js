module.exports = {
  user: process.env.DATABASE_USERNAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DBNAME,
  host: process.env.DATABASE_DBHOST,
  port: process.env.DATABASE_PORT,
  dialect: process.env.DATABASE_DIALECT,
  define: {
    freezeTableName: true,
    underscored: false,
    returning: true
  },
  pool: {
    max: 5,
    min: 0,
    idle: 20000,
    acquire: 20000
  },
  logging: false
};
