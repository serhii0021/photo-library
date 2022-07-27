import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { photoMock } from '@app/modules/core/mocks/photo.mock';
import { FavoritesService } from '@app/modules/core/services/favorites.service';
import { FavoritesComponent } from '@favorites/favorites.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let favoritesService: jasmine.SpyObj<FavoritesService>;

  beforeEach(async () => {
    const favoritesServiceSpy = jasmine.createSpyObj('FavoritesService', [
      'getFavorites',
    ]);

    favoritesServiceSpy.getFavorites.and.returnValue(
      of([
        photoMock,
        {
          id: '2',
          author: 'tAuthor',
          width: 100,
          height: 200,
          url: 'tst/url',
          download_url: 'd/url',
        },
      ])
    );

    await TestBed.configureTestingModule({
      declarations: [FavoritesComponent],
      providers: [{ provide: FavoritesService, useValue: favoritesServiceSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    favoritesService = TestBed.inject(
      FavoritesService
    ) as jasmine.SpyObj<FavoritesService>;

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render two photos', () => {
    const photos = fixture.debugElement.queryAll(By.css('app-photo'));

    expect(photos.length).toBe(2);
  });
});
