import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CoreModule } from '@core/core.module';
import { MaterialModule } from '@material/material.module';
import { PhotosModule } from '@photos/photos.module';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    MaterialModule,
    PhotosModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
