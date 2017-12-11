# ng-neo-modal

## Installation

To install this library, run:

```bash
$ npm install ng-neo-modal --save
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import library
import { NeoModalModule } from 'ng-neo-modal';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify library as an import
    NeoModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, inject service

```typescript
constructor(neoModalService: NeoModalService){}

// In any function

this.neoModalService.alert('This is an alert');
```

## License

MIT © [Neocomplexx](mailto:info@neocomplexx.com)
