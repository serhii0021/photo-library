import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { FavoritesService } from '@core/services/favorites.service';
import { PhotoComponent } from '@shared/components/photo/photo.component';
import { PhotoType } from '@shared/models/photo-type.enum';
import { photoMock } from '@core/mocks/photo.mock';

describe('PhotoComponent', () => {
  let component: PhotoComponent;
  let fixture: ComponentFixture<PhotoComponent>;
  let favoritesService: jasmine.SpyObj<FavoritesService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotoComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: FavoritesService,
          useValue: jasmine.createSpyObj('FavoritesService', [
            'addFavorite',
            'removeFavorite',
          ]),
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoComponent);
    component = fixture.componentInstance;
    component.photo = photoMock;

    favoritesService = TestBed.inject(
      FavoritesService
    ) as jasmine.SpyObj<FavoritesService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addFavorite', () => {
    component.photoType = PhotoType.List;
    component.elementRef.nativeElement.click();

    expect(favoritesService.addFavorite).toHaveBeenCalledWith(component.photo);
  });

  it('should call removeFavorite', () => {
    component.photoType = PhotoType.Favorites;
    component.elementRef.nativeElement.click();

    expect(favoritesService.removeFavorite).toHaveBeenCalledWith(
      component.photo
    );
  });

  it('should navigate to single photo page', () => {
    component.photoType = PhotoType.Favorites;
    component.elementRef.nativeElement.click();

    expect(router.navigate).toHaveBeenCalledWith([
      'photos',
      component.photo.id,
    ]);
  });
});
