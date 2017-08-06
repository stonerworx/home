const localtunnel = require('localtunnel');

exports.tunnel = (subdomain, port) => {
  const tunnel = localtunnel(port, { subdomain }, (err, t) => {
    if (err) {
      console.log('error opening tunnel', err);
      process.exit(1);
    }

    console.log('tunnel openend', t.url);
  });

  tunnel.on('close', () => {
    console.log('tunnel closed.');
    process.exit(1);
  });

  tunnel.on('error', err => {
    console.log('tunnel error', err);
    process.exit(1);
  });
};
