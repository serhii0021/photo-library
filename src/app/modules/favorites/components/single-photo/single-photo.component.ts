import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Route } from '@core/enums/route.enum';
import { FavoritesService } from '@core/services/favorites.service';
import { PhotosService } from '@photos/services/photos.service';
import { Photo } from '@shared/models/photo.interface';

@Component({
  selector: 'app-single-photo',
  templateUrl: './single-photo.component.html',
  styleUrls: ['./single-photo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PhotosService],
})
export class SinglePhotoComponent implements OnInit {
  public photo$!: Observable<Photo>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private photosService: PhotosService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.photo$ = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = params.get('id');
        return id ? this.photosService.getPhoto(id) : EMPTY;
      })
    );
  }

  public remove(): void {
    this.photo$
      .pipe(
        switchMap((photo) => this.favoritesService.removeFavorite(photo)),
        take(1)
      )
      .subscribe(() => this.router.navigate([Route.Favorites]));
  }
}
