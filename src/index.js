const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const apiRouter = require('./routers/apiRouter');
const infoRouter = require('./routers/infoRouter');

//Server setup
const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

//Api Path
app.use('/api', apiRouter);
app.use('/info', infoRouter);

//Setup error handler
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
