import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { BopInfoService } from '../service/bop-info.service';
import { IBopInfo } from '../bop-info.model';
import { BopInfoFormService } from './bop-info-form.service';

import { BopInfoUpdateComponent } from './bop-info-update.component';

describe('BopInfo Management Update Component', () => {
  let comp: BopInfoUpdateComponent;
  let fixture: ComponentFixture<BopInfoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let bopInfoFormService: BopInfoFormService;
  let bopInfoService: BopInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BopInfoUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(BopInfoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(BopInfoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    bopInfoFormService = TestBed.inject(BopInfoFormService);
    bopInfoService = TestBed.inject(BopInfoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const bopInfo: IBopInfo = { id: 456 };

      activatedRoute.data = of({ bopInfo });
      comp.ngOnInit();

      expect(comp.bopInfo).toEqual(bopInfo);
    });
  });

  describe('save', () => {
    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBopInfo>>();
      const bopInfo = { id: 123 };
      jest.spyOn(bopInfoFormService, 'getBopInfo').mockReturnValue({ id: null });
      jest.spyOn(bopInfoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bopInfo: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: bopInfo }));
      saveSubject.complete();

      // THEN
      expect(bopInfoFormService.getBopInfo).toHaveBeenCalled();
      expect(bopInfoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });
  });
});
