const express = require('express');
const { globalErrorHandler } = require('./controllers/errors.controller');
const { repairsRouter } = require('./routes/repairs.routes');
const { usersRouter } = require('./routes/users.routes');

const app = express();

/* -------------------------- Enable incoming JSON -------------------------- */
app.use(express.json());

/* -------------------------------- Endpoints ------------------------------- */
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/repairs', repairsRouter);

/* -------------------------- Global error handler -------------------------- */
app.use('*', globalErrorHandler);

module.exports = { app };
