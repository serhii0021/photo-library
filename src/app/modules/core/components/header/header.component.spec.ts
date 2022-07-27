import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from '@core/components/header/header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render toolbal', () => {
    expect(fixture.debugElement.query(By.css('mat-toolbar'))).not.toBeNull();
  });

  it('should render photos and favorites buttons', () => {
    const [photos, favorites] = fixture.debugElement.queryAll(
      By.css('a[mat-raised-button]')
    );

    expect(photos.nativeElement.textContent.trim()).toBe('Photos');
    expect(favorites.nativeElement.textContent.trim()).toBe('Favorites');
  });
});
