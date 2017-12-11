import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeoModalComponent } from './neo-modal.component';
import { NeoModalService } from './neo-modal.service';
import { FormsModule } from '@angular/forms';

export * from './neo-modal.component';
export * from './neo-modal.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    NeoModalComponent,
  ],
  exports: [
    NeoModalComponent,
  ],
  entryComponents: [NeoModalComponent],
})
export class NeoModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NeoModalModule,
      providers: [NeoModalService]
    };
  }
}
