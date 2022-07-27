import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';
import { FavoritesService } from '@core/services/favorites.service';
import { PhotoType } from '@shared/models/photo-type.enum';
import { Photo } from '@shared/models/photo.interface';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoComponent {
  @Input() public photo!: Photo;
  @Input() public photoType!: PhotoType;

  private readonly clickHandlers = {
    [PhotoType.List]: () => {
      this.favoritesService.addFavorite(this.photo);
    },
    [PhotoType.Favorites]: () => {
      this.favoritesService.removeFavorite(this.photo);
      this.router.navigate(['photos', this.photo.id]);
    },
  };

  @HostListener('click')
  public onClick(): void {
    this.clickHandlers[this.photoType]();
  }

  constructor(
    private favoritesService: FavoritesService,
    private router: Router,
    public elementRef: ElementRef
  ) {}
}
