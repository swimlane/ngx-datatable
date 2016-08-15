# Expressive Cell Templates
Below is a example that lets developers define the columns and the templates
expressively in markup. This is especially useful for complex situations
where you want rich controls within your grid.

<iframe width="100%" height="300" src="https://embed.plnkr.co/iH1e7cIAdX5Ds4jY7WYc/" />


## Notes
Its important to note, in order for you to project your column/row/value
properties onto the template, you must define those using the `let-*` syntax.
You can also use variables from outside the scope of the parent component.

[import:15-37, expressive.ts](../../src/demos/expressive.ts)
