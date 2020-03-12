import app from './app';
import config from './config/config';

const { listen } = config;

app.listen(listen.port, listen.address, () => {
  // eslint-disable-next-line no-console
  console.log(`Server up on ${listen.address}:${listen.port}`);
});

app.on('error', error => {
  // eslint-disable-next-line no-console
  console.log('Server Error:', error.code, error);
});
