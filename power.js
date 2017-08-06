const util = require('util');
const exec = util.promisify(require('child_process').exec);

const availableCommands = {
  off: '0',
  on: '1',
  toggle: '2'
};
const outlets = {
  livingroom_tv: {
    code: '11010 1',
    status: 0
  },
  hallway_lights: {
    code: '11100 1',
    status: 0
  },
  bedroom_lights: {
    code: '11001 1',
    status: 0
  },
  bedroom_speakers: {
    code: '11001 2',
    status: 0
  },
  bedroom_printer: {
    code: '11001 3',
    status: 0
  },
  kitchen_appliances: {
    code: '10001 1',
    status: 0
  },
  kitchen_lights: {
    code: '10001 2',
    status: 0
  },
  childsroom_lights: {
    code: '11100 2',
    status: 0
  }
};

const setPowerOutlet = async (outlet, command) => {
  const o = outlets[outlet];
  if (!o) {
    throw new Error('Unknown outlet.');
  }
  const outletId = o.code;
  const c = availableCommands[command];
  if (!c) {
    throw new Error('Unknown command.');
  }
  let cmd = c;
  if (c === '2') {
    cmd = o.status === 0 ? 1 : 0;
  }
  await exec(`sudo send ${outletId} ${cmd}`);
  return cmd;
};

const powerEndpoint = app =>
  app.get('/outlet/:outlet/:command', async function(req, res) {
    const { outlet, command } = req.params;
    try {
      outlets[outlet].status = setPowerOutlet(outlet, command);
      res.send(`${outlet} set to ${command}`);
    } catch (e) {
      res.status(500).send(e.message);
    }
  });

exports.setPowerOutlet = setPowerOutlet;
exports.powerEndpoint = powerEndpoint;
