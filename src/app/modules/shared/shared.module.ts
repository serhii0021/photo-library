import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoComponent } from './components/photo/photo.component';

const COMPONENTS = [PhotoComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule],
  exports: [...COMPONENTS],
})
export class SharedModule {}
