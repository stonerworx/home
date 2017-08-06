const express = require('express');
const tunnel = require('./tunnel').tunnel;
const motionEndpoint = require('./motion').motionEndpoint;
const powerEndpoint = require('./power').powerEndpoint;

const PORT = 3100;

const app = express();

motionEndpoint(app);
powerEndpoint(app);

app.listen(PORT, function() {
  console.log(`App listening on port ${PORT}!`);
  tunnel('multicorn', PORT);
});
