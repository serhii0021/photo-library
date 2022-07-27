import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { photoMock } from '@core/mocks/photo.mock';
import { PhotosService } from '@photos/services/photos.service';

describe('PhotosService', () => {
  let service: PhotosService;
  let httpMock: HttpTestingController;

  const page = 1;
  const limit = 30;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PhotosService],
    });

    service = TestBed.inject(PhotosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('fetchPhotos()', () => {
    it('should fetch photos', () => {
      service.fetchPhotos(page, limit).subscribe((photos) => {
        expect(photos.length).toBe(1);
        expect(photos).toEqual([photoMock]);
      });

      const req = httpMock.expectOne(
        `${service.baseUrl}/v2/list?page=${page}&limit=${limit}`
      );

      expect(req.request.method).toBe('GET');
      req.flush([photoMock]);
    });

    it('should set loading status to true', () => {
      service.fetchPhotos(page, limit).subscribe();

      httpMock.expectOne(
        `${service.baseUrl}/v2/list?page=${page}&limit=${limit}`
      );

      service.getLoadingStatus().subscribe((status) => {
        expect(status).toBe(true);
      });
    });
  });

  describe('getPhotos()', () => {
    it('should fetch photos', () => {
      const spy = spyOn(service, 'fetchPhotos').and.callThrough();

      service.getPhotos().subscribe();

      httpMock.expectOne(
        `${service.baseUrl}/v2/list?page=${page}&limit=${limit}`
      );

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('getPhoto()', () => {
    it('should fetch single photo', () => {
      service.getPhoto(photoMock.id).subscribe((photo) => {
        expect(photo).toBe(photo);
      });

      const req = httpMock.expectOne(
        `${service.baseUrl}/id/${photoMock.id}/info`
      );

      expect(req.request.method).toBe('GET');
      req.flush(photoMock);
    });
  });
});
