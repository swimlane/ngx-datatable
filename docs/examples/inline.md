# Inline Editing Example
Below is an example of how to accomplish inline editing with this project. If you double click
on the name cell, it will toggle the label to a input box.

<iframe width="100%" height="450" frameborder="0" src="https://embed.plnkr.co/S4xg9XdlLLlvV19NMvhW?show=preview&autoCloseSidebar=true"></iframe>

## Details
In this example, we leverage the power of expressive cell templates to bind to
the body cell's label text. Below you can see the column definition for the 'Name'
column. Here we make a template that contains the label and a input box.

```javascript
<datatable-column name="Name">
  <template let-value="value" let-row="row">
    <span
      title="Double click to edit"
      (dblclick)="editing[row.$$index] = true"
      *ngIf="!editing[row.$$index]">
      {{value}}
    </span>
    <input
      autofocus
      (blur)="updateValue($event, 'name', value, row)"
      *ngIf="editing[row.$$index]"
      type="text"
      [value]="value"
    />
  </template>
</datatable-column>
```

We show/hide the controls based on a key/value hash in our parent component. The
`$$index` is a internal attribute applied to every row to track its global row index.
For more information on the `$$index` value goto [Internals](api/internals.md) section.

Upon a double click event, the component swaps out the label with a input box. Then when
the user changes the input box and triggers a blur event, we listen and update the row value.

```javascript
updateValue(event, cell, cellValue, row) {
  this.editing[row.$$index] = false
  this.rows[row.$$index][cell] = event.target.value;
}
```

Above it uses the `$$index` again to find the original row object and update it.

For this example, we just did a simple input box but with expressive columns you can
make the edit controls whatever you want, whether you use material or bootstrap, so it can
match your application, eliminate bloat of double controls and be extremely flexible.
