import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Photo } from '@shared/models/photo.interface';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService implements OnDestroy {
  readonly storageKey = 'favorites';
  private destroy$: Subject<void> = new Subject<void>();
  private favorites: Set<Photo> = new Set();
  private favorites$: BehaviorSubject<Photo[]> = new BehaviorSubject<Photo[]>(
    []
  );

  constructor() {
    this.favorites = this.getStoredFavorites();
    this.favorites$.next([...this.favorites]);
    this.subscribeOnFavoritesChange();
  }

  private subscribeOnFavoritesChange(): void {
    this.favorites$
      .pipe(takeUntil(this.destroy$))
      .subscribe((favorites) =>
        localStorage.setItem(this.storageKey, JSON.stringify(favorites))
      );
  }

  public getFavorites(): Observable<Photo[]> {
    return this.favorites$.asObservable();
  }

  public addFavorite(photo: Photo): Observable<Photo> {
    if (!this.favorites.has(photo)) {
      this.favorites.add(photo);
      this.favorites$.next([...this.favorites]);
    }

    return of(photo);
  }

  public removeFavorite(photo: Photo): Observable<Photo> {
    if (this.favorites.has(photo)) {
      this.favorites.delete(photo);
      this.favorites$.next([...this.favorites]);
    }

    return of(photo);
  }

  public getStoredFavorites(): Set<Photo> {
    const favorites = localStorage.getItem(this.storageKey);

    if (favorites) {
      return new Set(JSON.parse(favorites));
    }

    return new Set();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
