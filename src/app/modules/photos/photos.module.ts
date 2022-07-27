import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PhotosComponent } from '@photos/photos.component';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';
import { PhotosRoutingModule } from '@photos/photos-routing.module';

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
