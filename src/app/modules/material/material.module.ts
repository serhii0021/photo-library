import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const MODULES = [MatToolbarModule, MatButtonModule, MatProgressSpinnerModule];

@NgModule({
  imports: [CommonModule, ...MODULES],
  exports: [...MODULES],
})
export class MaterialModule {}
