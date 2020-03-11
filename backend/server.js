import app from './app';
import config from './config/config';

const { listen } = config;

// Listen on the provided address
app.listen(listen.port, listen.address, () => {
  // When the server is listening correctly, print a debug line
  // eslint-disable-next-line no-console
  console.log(`Server up on ${listen.address}:${listen.port}`);
});

// If the server has an error, log the error
app.on('error', error => {
  // eslint-disable-next-line no-console
  console.log('Server Error:', error.code, error);
});
