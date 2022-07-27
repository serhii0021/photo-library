import { TestBed } from '@angular/core/testing';
import { photoMock } from '@core/mocks/photo.mock';
import { FavoritesService } from '@core/services/favorites.service';

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavoritesService],
    });

    localStorage.clear();
    service = TestBed.inject(FavoritesService);
  });

  describe('getFavorites()', () => {
    it('should return favorites', () => {
      service.addFavorite(photoMock);

      service.getFavorites().subscribe((favorites) => {
        expect(favorites).toEqual([photoMock]);
      });
    });
  });

  describe('addFavorite()', () => {
    it('should add favorite to localStorage', () => {
      const secondPhotoMock = {
        id: '2',
        author: 'test-author',
        height: 100,
        width: 100,
        url: 'test/url',
        download_url: 'text/url',
      };

      service.addFavorite(photoMock);
      service.addFavorite(secondPhotoMock);

      service
        .getFavorites()
        .subscribe((favorites) =>
          expect(favorites).toEqual([photoMock, secondPhotoMock])
        );
    });
  });

  describe('removeFavorite()', () => {
    it('should remove favorite from localStorage', () => {
      service.addFavorite(photoMock);
      service.removeFavorite(photoMock);

      expect(service.getStoredFavorites()).toEqual(new Set());
    });
  });

  describe('getStoredFavorites()', () => {
    it('should return empty set', () => {
      expect(service.getStoredFavorites()).toEqual(new Set());
    });

    it('should stored favorites', () => {
      const favorites = [photoMock];
      localStorage.setItem(service.storageKey, JSON.stringify(favorites));

      expect(service.getStoredFavorites()).toEqual(new Set(favorites));
    });
  });
});
