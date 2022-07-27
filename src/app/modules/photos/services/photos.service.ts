import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { concatMap, delay, scan, tap } from 'rxjs/operators';
import { Photo } from '@shared/models/photo.interface';
import { PhotoPagination } from '@photos/models/photo-pagination.interface';

@Injectable()
export class PhotosService {
  private readonly baseUrl = 'https://picsum.photos';
  private pagination$ = new BehaviorSubject<PhotoPagination>({
    page: 1,
    limit: 30,
  });
  private loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(private http: HttpClient) {}

  public fetchPhotos(page: number, limit: number): Observable<Photo[]> {
    this.loading$.next(true);

    const params = new HttpParams().set('page', page).set('limit', limit);

    return this.http.get<Photo[]>(`${this.baseUrl}/v2/list`, { params }).pipe(
      delay(Math.random() * (300 - 200) + 200),
      tap(() => this.loading$.next(false))
    );
  }

  public getPhotos(): Observable<Photo[]> {
    const photosForCurrentPage$ = this.pagination$.pipe(
      concatMap(({ page, limit }) => this.fetchPhotos(page, limit))
    );

    return photosForCurrentPage$.pipe(
      scan((previousPhotos, currentPhotos) => [
        ...previousPhotos,
        ...currentPhotos,
      ])
    );
  }

  public getLoadingStatus(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  public nextPage(): void {
    const { page, limit } = this.pagination$.value;

    this.pagination$.next({
      page: page + 1,
      limit,
    });
  }

  public getPhoto(id: string): Observable<Photo> {
    return this.http.get<Photo>(`${this.baseUrl}/id/${id}/info`);
  }
}
