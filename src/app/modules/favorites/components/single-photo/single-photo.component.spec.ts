import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';

import { SinglePhotoComponent } from '@favorites/components/single-photo/single-photo.component';
import { FavoritesService } from '@core/services/favorites.service';
import { photoMock } from '@core/mocks/photo.mock';
import { PhotosService } from '@photos/services/photos.service';
import { Route } from '@core/enums/route.enum';

describe('SinglePhotoComponent', () => {
  let component: SinglePhotoComponent;
  let fixture: ComponentFixture<SinglePhotoComponent>;
  let photosService: jasmine.SpyObj<PhotosService>;
  let favoritesService: jasmine.SpyObj<FavoritesService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const photosServiceSpy = jasmine.createSpyObj('PhotosService', [
      'getPhoto',
    ]);

    const favoritesServiceSpy = jasmine.createSpyObj('FavoritesService', [
      'removeFavorite',
    ]);

    photosServiceSpy.getPhoto.and.returnValue(of(photoMock));
    favoritesServiceSpy.removeFavorite.and.returnValue(of(photoMock));

    await TestBed.configureTestingModule({
      declarations: [SinglePhotoComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: PhotosService, useValue: photosServiceSpy },
        { provide: FavoritesService, useValue: favoritesServiceSpy },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate']),
        },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: photoMock.id })),
          },
        },
      ],
    }).compileComponents();

    photosService = TestBed.inject(
      PhotosService
    ) as jasmine.SpyObj<PhotosService>;
    favoritesService = TestBed.inject(
      FavoritesService
    ) as jasmine.SpyObj<FavoritesService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture = TestBed.createComponent(SinglePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('remove()', () => {
    it('should call removeFavorite', () => {
      component.photo$ = of(photoMock);
      component.remove();

      expect(favoritesService.removeFavorite).toHaveBeenCalled();
    });

    it('should navigate to favorites page', () => {
      component.photo$ = of(photoMock);
      component.remove();

      expect(router.navigate).toHaveBeenCalledWith([Route.Favorites]);
    });
  });
});
