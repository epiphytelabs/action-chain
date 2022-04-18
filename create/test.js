// imports
const assert = require("assert");
const axios  = require('axios');

async function main() {
    const accounts = JSON.parse(process.env.ACCOUNTS);

    const testnet = axios.create({
        baseURL: "https://" + process.env.HOSTNAME
    })
    const idResponse = await testnet.post('/',
      {"jsonrpc":"2.0","method":"eth_chainId"}
    );
    const chainId = parseInt(idResponse.data.result);

    const blockNumberResponse = await testnet.post('/',
      {"jsonrpc":"2.0","method":"eth_blockNumber"}
    );
    const blockNumber = parseInt(blockNumberResponse.data.result);

    assert.equal(blockNumber, 50001);
    console.log("Block number is 50001");
    assert.equal(accounts.length, 7);
    console.log("Accounts length is 7");
    assert.equal(accounts[0].address, "0x0247b86C323E18BaE51eDE7940C395A1B3259748");
    console.log("Address 1 matches");
    assert.equal(accounts[6].private, "0x4331fad821a4f989513b4bc67b4f98ad45fb2a11f5b1bf900e57a05dddcbc252");
    console.log("Private key 7 matches");
    assert.equal(chainId, 42);
    console.log("Chain id equals 42");
    assert.equal(process.env.NAME, process.env.SHA);
    console.log("Chain name matches");
}

main();