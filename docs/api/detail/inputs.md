# Row Detail Options

### `template`: `TemplateRef`
Template to use in the detail row. Example:

```
<ng-template let-row="row">
  <div>
    <div><strong>Address</strong></div>
    <div>{{row.address.city}}, {{row.address.state}}</div>
  </div>
</ng-template>
```

### `rowHeight`: `Number`
Height of the detail row.
