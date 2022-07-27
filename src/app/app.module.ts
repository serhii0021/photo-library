import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CoreModule } from '@core/core.module';
import { MaterialModule } from '@material/material.module';
import { PhotosModule } from '@photos/photos.module';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    MaterialModule,
    SharedModule,
    PhotosModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
