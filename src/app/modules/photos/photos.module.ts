import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosComponent } from './photos.component';
import { SharedModule } from '@app/modules/shared/shared.module';
import { MaterialModule } from '@app/modules/material/material.module';
import { PhotosRoutingModule } from '@app/modules/photos/photos-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [PhotosComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    MaterialModule,
    PhotosRoutingModule,
  ],
})
export class PhotosModule {}
