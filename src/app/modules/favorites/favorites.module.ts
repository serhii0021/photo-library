import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from '@favorites/favorites.component';
import { SharedModule } from '@shared/shared.module';
import { FavoritesRoutingModule } from '@favorites/favorites-routing.module';
import { SinglePhotoComponent } from '@favorites/components/single-photo/single-photo.component';
import { MaterialModule } from '@material/material.module';

@NgModule({
  declarations: [FavoritesComponent, SinglePhotoComponent],
  imports: [CommonModule, SharedModule, MaterialModule, FavoritesRoutingModule],
})
export class FavoritesModule {}
