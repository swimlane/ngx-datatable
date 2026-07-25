import { ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';

// Angular 22 defaults components without an explicit changeDetection strategy to OnPush.
// Auto-detect restores prior Default-like fixture behavior for tests that rely on
// whenStable() without an explicit detectChanges() after createComponent.
beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }]
  });
});
