require('dotenv').config();
const app = require('./app');
const db = require('./app/models');

const port = parseInt(process.env.PORT || '5000', null);

async function connect() {
  await db.sequelize.authenticate();
}

async function dropForeignKeyAndIndex(database) {
  try {
    const queryInterface = database.getQueryInterface();

    const tables = await queryInterface.showAllSchemas();
    for (const table of tables) {
      const tableNames = Object.values(table);
      for (const tableName of tableNames) {
        const constraints = await queryInterface.showConstraint(tableName);
        for (const constraint of constraints) {
          if (constraint.constraintType === 'FOREIGN KEY' || constraint.constraintType === 'UNIQUE') {
            try {
              await queryInterface.removeConstraint(tableName, constraint.constraintName);
            } catch (error) {
              console.error(error.message);
            }
          }
        }
      }
    }

    await queryInterface.dropAllEnums();

  } catch (error) {
    console.error(error.message);
  }
}

module.exports = (async () => {

  try {

    await connect();

    if (process.env.DATABASE_ALTER === 'alter') {

      console.log(`------------- Database Altering --------------`)

      console.log(`Please don't terminate during altering database.`)

      console.log(`The database can be broken.`)

      await dropForeignKeyAndIndex(db.sequelize);

      await db.sequelize.sync({ alter: true });

      console.log(`------------- Altering was done --------------`)

    } else if (process.env.DATABASE_ALTER === 'force') {

      await db.sequelize.sync({
        force: true
      });

    } else {

      await db.sequelize.sync();

    }

    return app.listen(port, () => {
      console.log(`Server is running on ${port} port.`);
    });

  } catch (error) {
    console.error(`Database error: ${error.message}`);
  }
})();
