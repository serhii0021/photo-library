import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Route } from '@core/enums/route.enum';
import { SinglePhotoComponent } from '@favorites/components/single-photo/single-photo.component';

const routes: Routes = [
  {
    path: Route.Favorites,
    loadChildren: () =>
      import('./modules/favorites/favorites.module').then(
        (m) => m.FavoritesModule
      ),
  },
  { path: 'photos/:id', component: SinglePhotoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
