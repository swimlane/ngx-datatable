# Expressive Cell Templates
Below is a example that lets developers define the columns and the templates
expressively in markup. This is especially useful for complex situations
where you want rich controls within your grid.

<iframe width="100%" height="450" frameborder="0" src="https://embed.plnkr.co/iH1e7cIAdX5Ds4jY7WYc?show=preview&autoCloseSidebar=true"></iframe>


## Details
Its important to note, in order for you to project your column/row/value
properties onto the cell templates, you must define those using the `let-*` syntax.
You can also use variables from outside the scope of the parent component.

Checkout this example from `./src/demos/expressive.ts`:

```javascript
<datatable
  class="material"
  [rows]="rows"
  [options]="options">
  <datatable-column name="Name">
    <template let-value="value">
      Hi: <strong>{{value}}</strong>
    </template>
  </datatable-column>
  <datatable-column name="Gender">
    <template let-row="row" let-value="value">
      My name is: <i [innerHTML]="row['name']"></i> and a <i>{{value}}</i>
    </template>
  </datatable-column>
  <datatable-column name="Age">
    <template let-value="value">
      <div style="border:solid 1px #ddd;margin:5px;padding:3px">
        <div style="background:#999;height:10px" [style.width]="value + '%'"></div>
      </div>
    </template>
  </datatable-column>
</datatable>
```

Here you can see in the `Name` column, we bind the `value` property which is the
the cell value for that particular column in the row.

On the `Gender` column, we bind both the `value` and the `row` property
so we can access other column's values and this cells value.

In the last example, we bind `Age` to make a histagram bar. It shows the power
you have to build complex column templates.

## Reference
- [template tag](https://angular.io/docs/ts/latest/guide/structural-directives.html#!#template)
- [ngTemplateOutlet](https://angular.io/docs/ts/latest/api/common/index/NgTemplateOutlet-directive.html)
