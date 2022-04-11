# Epiphyte Create Chain Action
This action creates a new Ethereum chain via Epiphyte.

## Inputs
## `token`
**Required** The API token from your Epiphyte account.
## `accounts`
The number of accounts to create.
## `id`
The chain id of the Ethereum chain.
## `mnemonic`
The wallet seed to use for account creation.
## `name`
The name of the Epiphyte chain.

## Outputs
## `accounts`
A list of objects with addresses and private keys generated with the wallet seed.
Keys of the objects are `address` and `private`.

For example:
```json
[ 
  {
    "address":"0x9837D6001149942E7aDa0f4e13F8c99a7264ebbf",
    "private":"0x17927774b8391270df59bedff51d89f2a4198ec8b4e02b1a8bb28c697b4957db"
  },
  {
    "address":"0xCed0d25bB9711bcD131d042677262bbF2D0d5fA5",
    "private":"0x490b4b6dbca09fca724b9a45dda536461d88d42dc97f202485bc5b718ad8ef83"
  }
]
```
## `hostname`
The host name of the Epiphyte chain.
## `id`
The chain id of the Ethereum chain.
## `mnemonic`
The wallet seed used for account creation.
## `name`
The name of the Epiphyte chain.

## Example Usage
```yaml
uses: epiphytelabs/action-chain/create@main
with:
  token: ${{ secrets.EPIPHYTE_TOKEN }}
```