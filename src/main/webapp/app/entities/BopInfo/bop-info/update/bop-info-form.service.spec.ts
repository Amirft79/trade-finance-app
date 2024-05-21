import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../bop-info.test-samples';

import { BopInfoFormService } from './bop-info-form.service';

describe('BopInfo Form Service', () => {
  let service: BopInfoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BopInfoFormService);
  });

  describe('Service methods', () => {
    describe('createBopInfoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createBopInfoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
          }),
        );
      });

      it('passing IBopInfo should create a new form with FormGroup', () => {
        const formGroup = service.createBopInfoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
          }),
        );
      });
    });

    describe('getBopInfo', () => {
      it('should return NewBopInfo for default BopInfo initial value', () => {
        const formGroup = service.createBopInfoFormGroup(sampleWithNewData);

        const bopInfo = service.getBopInfo(formGroup) as any;

        expect(bopInfo).toMatchObject(sampleWithNewData);
      });

      it('should return NewBopInfo for empty BopInfo initial value', () => {
        const formGroup = service.createBopInfoFormGroup();

        const bopInfo = service.getBopInfo(formGroup) as any;

        expect(bopInfo).toMatchObject({});
      });

      it('should return IBopInfo', () => {
        const formGroup = service.createBopInfoFormGroup(sampleWithRequiredData);

        const bopInfo = service.getBopInfo(formGroup) as any;

        expect(bopInfo).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IBopInfo should not enable id FormControl', () => {
        const formGroup = service.createBopInfoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewBopInfo should disable id FormControl', () => {
        const formGroup = service.createBopInfoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
