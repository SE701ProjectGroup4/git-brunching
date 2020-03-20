import dotenv from 'dotenv';

dotenv.config();

// This is only used for GitHub Actions as it requires more time before starting any tests.
before(async function() {
  this.timeout(20000);
  return new Promise(resolve => setTimeout(resolve, process.env.GH_ACTIONS ? 15000 : 1));
});
