import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { BopInfoDetailComponent } from './bop-info-detail.component';

describe('BopInfo Management Detail Component', () => {
  let comp: BopInfoDetailComponent;
  let fixture: ComponentFixture<BopInfoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BopInfoDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: BopInfoDetailComponent,
              resolve: { bopInfo: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(BopInfoDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BopInfoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load bopInfo on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', BopInfoDetailComponent);

      // THEN
      expect(instance.bopInfo()).toEqual(expect.objectContaining({ id: 123 }));
    });
  });

  describe('PreviousState', () => {
    it('Should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
