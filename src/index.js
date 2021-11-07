const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const apiRouter = require('./routers/apiRouter');
const infoRouter = require('./routers/infoRouter');
const morgan = require('morgan');

//Server setup
const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

//Morgan config
//Log with tiny config every request other than POST
app.use(
  morgan('tiny', {
    skip: function (req, res) {
      return req.method === 'POST';
    },
  })
);
// Log with custom config every request that is POST
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(
  morgan(
    ':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]',
    {
      skip: function (req, res) {
        return req.method != 'POST';
      },
    }
  )
);

//Api Path
app.use('/api', apiRouter);
app.use('/info', infoRouter);

//Setup error handler
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
