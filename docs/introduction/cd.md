# Change Detection

The table implements `OnPush` change detection which means the dirty checking checks for immutable
data types. That means if you do object mutations like:

```javascript
this.rows[i]['gender'] = 'Female';
```

The table will not detect a change! Instead if you do a change like this, you need to do:

```javascript
this.rows[i]['gender'] = 'Female';
this.rows = [...this.rows];
```

This will cause the table to detect the change and update. Some might have concerns that
this is a pricey operation, however, it is MUCH cheaper than running `ngDoCheck` and
constantly diffing the array.

For more information, I recommend this article [Angular Change Detection Explained](https://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html).
