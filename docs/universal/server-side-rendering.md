To run ngx-datatable on a server using Angular Universal you must implement 2 services. Below are examples of these
services:

1. DimensionsHelper
2. ScrollbarHelper

If you take the default implementation of these 2 services they do not work on server for valid reasons. There is no viewport on server and there is no scrollbar on server. If you take these services as they are you will get an error like this:

```
 this.document.createElement is not a function
          at ScrollbarHelper.getWidth
```

```
ERROR TypeError: this.element.getBoundingClientRect is not a function
```

## Example Server side Dimensions helper

This service must send back the dimensions of the grid or fallback to a default width.

I am using the ideas about dimensions from client hints that I set on the signin page. http://httpwg.org/http-extensions/client-hints.html

```typescript
import { ScrollbarHelper } from '@swimlane/ngx-datatable';
import { Injectable, Inject } from '@angular/core';
import { Request } from 'express';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { DimensionsHelper } from '@swimlane/ngx-datatable';

@Injectable()
export class ServerDimensionsHelper extends DimensionsHelper {
  constructor(@Inject(REQUEST) private request: Request) {
    super();
  }

  getDimensions(element: Element): ClientRect {
    const width = parseInt(this.request.cookies['CH-DW'], 10) || 1000;
    const height = parseInt(this.request.cookies['CH-DH'], 10) || 800;

    const adjustedWidth = width;
    const adjustedHeight = height;

    return {
      height: adjustedHeight,
      bottom: 0,
      top: 0,
      width: adjustedWidth,
      left: 0,
      right: 0
    };
  }
}
```

## Scrollbar helper

In this case I just returned the scrollbar width based on what I used for css styling

```typescript
import { ScrollbarHelper } from '@swimlane/ngx-datatable';
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class ServerScrollBarHelper extends ScrollbarHelper {
  width: number;

  constructor(@Inject(DOCUMENT) document) {
    super(document);
    this.width = 16; // use default value
  }

  getWidth(): number {
    return this.width;
  }
}
```

I then added these two services using @NgModule providers

```typescript
providers: [
  {
    provide: ScrollbarHelper,
    useClass: ServerScrollBarHelper
  },
  {
    provide: DimensionsHelper,
    useClass: ServerDimensionsHelper
  }
];
```
