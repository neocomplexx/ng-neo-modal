import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeoModalComponent } from './neo-modal.component';
import { NeoModalService } from './neo-modal.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NeoModalComponent],
  providers: [
    NeoModalService
  ],
  entryComponents: [NeoModalComponent],
})
export class NeoModalModule { }
