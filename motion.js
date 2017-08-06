const setPowerOutlet = require('./power').setPowerOutlet;

const TIMEOUT = 1000 * 60 * 2;

let timer;

exports.motionEndpoint = app =>
  app.get('/motion', async (req, res) => {
    try {
      console.log('motion detected -> turning on hallway.');
      if (timer) {
        clearTimeout(timer);
      }
      setPowerOutlet('hallway_lights', 'on');
      timer = setTimeout(() => {
        console.log(
          `${TIMEOUT / 60 / 1000} minutes passed -> turning off hallway`
        );
        setPowerOutlet('hallway_lights', 'off');
      }, TIMEOUT);
      res.send('OK');
    } catch (e) {
      console.error(e);
      res.send(500).send('something went wrong.');
    }
  });
