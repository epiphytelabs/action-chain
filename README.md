# Epiphyte Chain Actions

Epiphyte chain actions allow you to create and destroy ethereum chains
as part of your Github workflows.

## Create

### Example Usage
```yaml
uses: epiphytelabs/action-chain/create@main
with:
  token: ${{ secrets.EPIPHYTE_TOKEN }}
```

See [create action](./create)

## Destroy

### Example Usage
```yaml
uses: epiphytelabs/action-chain/destroy@main
with:
  token: ${{ secrets.EPIPHYTE_TOKEN }}
```

See [destroy action](./destroy)