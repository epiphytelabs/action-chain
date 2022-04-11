# Epiphyte Destroy Network Action
This action destroys an Ethereum network via Epiphyte.

## Inputs
## `auth`
**Required** The username:password from your Epiphyte account.
## `id`
The id of the Epiphyte network.

## Outputs
None

## Example Usage

This example uses the `EPIPHYTE_AUTH` value configured in repository secrets and
the network id from a previous step output named `testnet`.

```yaml
uses: epiphytelabs/action-network-destroy@v0.1
with:
  auth: ${{ secrets.EPIPHYTE_AUTH }}
  id: ${{ steps.testnet.outputs.id }}
```