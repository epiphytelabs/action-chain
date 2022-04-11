// imports
const core   = require('@actions/core');
const axios  = require('axios').default;
const url    = require('url');

// actual constants
const EPIPHYTE_API_BASE = 'https://api.epiphyte.run';
const OBJECT_URL = '/chains';

function waitFor(millSeconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, millSeconds);
  });
}

async function waitForTestNet(hostname) {
  const testnet = axios.create({
    baseURL: "https://" + hostname
  })

  let attempts = 0;
  while (true) {
    try {
      attempts++;
      if (attempts >= 20) {
        console.log("Too many attempts")
        break;
      }
      const response = await testnet.post('/', {"jsonrpc":"2.0","method":"eth_chainId"})
      if (response.status == 200) {
        return true;
      }
    } catch (error) {
      const message = `Waiting for chain (${error.message})`
      console.log(message);
    }
    await waitFor(1000);
  }
  return false;
}

async function main() {
  // parse input
  let postData = {
    accounts: core.getInput('accounts'),
    id: core.getInput('id'),
    mnemonic: core.getInput('mnemonic'),
    name: core.getInput('name')
  };

  // configure http agent
  const token = core.getInput('token');
  const epiphyte = axios.create({
    baseURL: EPIPHYTE_API_BASE,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  // attempt create network request
  try {
    const params = new url.URLSearchParams(postData);
    const result = await epiphyte.post(OBJECT_URL, params.toString());

    if (result.status == 200) {
      // set output on success
      const data = result.data; 
      core.info(`New epiphyte chain created at ${data.hostname} with id ${data.chain} and ${data.accounts.length} accounts`);
      core.info(`Waiting for chain`);
      const testNetUp = await waitForTestNet(data.hostname);
      if (testNetUp) {
        core.info(`Chain up`);
        core.setOutput('accounts', data.accounts);
        core.setOutput('hostname', data.hostname);
        core.setOutput('id',       data.id);
        core.setOutput('mnemonic', data.mnemonic);
        core.setOutput('name',     data.name);
      } else {
        const message = "Chain failed to boot";
        console.log(message);
        core.setFailed(message);
      }
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