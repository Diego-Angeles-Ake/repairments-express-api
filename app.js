const express = require('express');
const { sequelize } = require('./database/database.config');
const { repairsRouter } = require('./routes/repairs.routes');
const { usersRouter } = require('./routes/users.routes');

const app = express();
const PORT = process.env.PORT || 5000;

/* -------------------------- Enable incoming JSON -------------------------- */
app.use(express.json());

/* -------------------------------- Endpoints ------------------------------- */
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/repairs', repairsRouter);

/* ---------------------------------- Auth ---------------------------------- */
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

/* ----------------------------- Synchronization ---------------------------- */
(async () => {
  await sequelize.sync();
  console.log('All models were synchronized successfully.');
})();

/* ----------------------------- Server spin up ----------------------------- */
app.listen(PORT, console.log(`Running on port ${PORT}`));
