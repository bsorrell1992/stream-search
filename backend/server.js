require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

const apiRoutes = require('./routes/apiRoutes');

app.use(cors());
app.use('/api', apiRoutes);

const PORT = 8080;
app.listen(PORT, function (err) {
  if (err) console.log(err);
  else console.log(`Server listening on port ${PORT}`);
});