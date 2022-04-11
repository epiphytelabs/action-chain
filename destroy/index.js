// imports
const core   = require('@actions/core');
const axios  = require('axios').default;

// actual constants
const EPIPHYTE_API_BASE = 'https://api.epiphyte.run';
const OBJECT_URL = '/chains';

async function main() {
  // parse input
  const token = core.getInput('token');
  const name  = core.getInput('name');

  // configure http agent
  const epiphyte = axios.create({
    baseURL: EPIPHYTE_API_BASE,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  // attempt create network request
  try {
    const url = OBJECT_URL + '/' + encodeURIComponent(name);
    const result = await epiphyte.delete(url);

    if (result.status == 200) {
      // set output on success
      core.info(`Chain ${name} destroyed`);
    } else {
      // report http failure
      console.log(result.statusText);
      core.setFailed(result.statusText);
    }
  } catch (error) {
    // report generic failure
    console.log(error.message);
    core.setFailed(error.message);
  }
}

main();