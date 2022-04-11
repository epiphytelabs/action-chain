// imports
const core   = require('@actions/core');
const github = require('@actions/github');
const axios  = require('axios').default;
const url    = require('url');

// actual constants
const EPIPHYTE_API_BASE = 'https://api.epiphyte.run';
const NETWORKS_URL = '/chains';

async function main() {
  // parse input
  const apiKey = core.getInput('api_key');
  const id   = core.getInput('id');

  // configure http agent
  const epiphyte = axios.create({
    baseURL: EPIPHYTE_API_BASE,
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  });

  // attempt create network request
  try {
    const url = NETWORKS_URL + '/' + id;
    const result = await epiphyte.delete(url);

    if (result.status == 200) {
      // set output on success
      const data = result.data; 
      core.info(`Chain ${id} destroyed`);
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
