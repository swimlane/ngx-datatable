# Custom row wrapper

Use to pre-apply directives at row level.

### `rowDef`

Directive to be applied on `ng-template`.

### `datatable-row-def`

Component to be used as content of `ng-template`.
Apply your custom row level directive/class on this component. Example:

**Template**

```html
<ng-template rowDef>
  <datatable-row-def applyYourCustomDirectiveHereForRow />
</ng-template>
```
