# Epiphyte Destroy Chain Action
This action destroys an Ethereum chain via Epiphyte.

## Inputs
## `token`
**Required** The API token from your Epiphyte account.
## `name`
The name of the Epiphyte chain.

## Outputs
None

## Example Usage

This example uses the `EPIPHYTE_TOKEN` value configured in repository secrets and
the chain name from a previous step output named `testnet`.

```yaml
uses: epiphytelabs/action-chain/destroy@main
with:
  auth: ${{ secrets.EPIPHYTE_TOKEN }}
  id: ${{ steps.testnet.outputs.name }}
```