import {
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PhotosService } from '@photos/services/photos.service';
import { PhotoComponent } from '@shared/components/photo/photo.component';
import { PhotoType } from '@shared/models/photo-type.enum';
import { Photo } from '@shared/models/photo.interface';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
  providers: [PhotosService],
})
export class PhotosComponent implements OnInit, OnDestroy {
  public photos$!: Observable<Photo[]>;
  public loading$!: Observable<boolean>;
  public PhotoType = PhotoType;

  private destroy$ = new Subject<void>();
  private observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        this.photosService.nextPage();
      }
    },
    {
      root: null,
      threshold: 0,
    }
  );

  @ViewChildren(PhotoComponent) photos!: QueryList<PhotoComponent>;

  constructor(private photosService: PhotosService) {}

  ngOnInit(): void {
    this.photos$ = this.photosService.getPhotos();
    this.loading$ = this.photosService.getLoadingStatus();
  }

  ngAfterViewInit() {
    this.photos.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.observer.disconnect();
      this.setupScrollHanlder();
    });
  }

  private setupScrollHanlder(): void {
    this.observer.observe(this.photos.last.elementRef.nativeElement);
  }

  public identify(_: number, photo: Photo): string {
    return photo.id;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
