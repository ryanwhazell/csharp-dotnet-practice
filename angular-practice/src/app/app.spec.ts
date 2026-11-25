import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideRouter(routes)],
    }).compileComponents();
  });

  it('renders the site navigation and home route', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('nav')?.textContent).toContain('Text Modifier');
    expect(compiled.querySelector('app-home h1')?.textContent).toContain('The Practice Zone');
  });

  it('renders each feature when its route is selected', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);

    await router.navigateByUrl('/text-modifier');
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).querySelector('#modifier-title')?.textContent)
      .toContain('Text Modifier');

    await router.navigateByUrl('/bookmarks');
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).querySelector('#bookmarks-title')?.textContent)
      .toContain('Bookmarks');
  });
});
