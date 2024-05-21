import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IBopInfo, NewBopInfo } from '../bop-info.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IBopInfo for edit and NewBopInfoFormGroupInput for create.
 */
type BopInfoFormGroupInput = IBopInfo | PartialWithRequiredKeyOf<NewBopInfo>;

type BopInfoFormDefaults = Pick<NewBopInfo, 'id'>;

type BopInfoFormGroupContent = {
  id: FormControl<IBopInfo['id'] | NewBopInfo['id']>;
};

export type BopInfoFormGroup = FormGroup<BopInfoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class BopInfoFormService {
  createBopInfoFormGroup(bopInfo: BopInfoFormGroupInput = { id: null }): BopInfoFormGroup {
    const bopInfoRawValue = {
      ...this.getFormDefaults(),
      ...bopInfo,
    };
    return new FormGroup<BopInfoFormGroupContent>({
      id: new FormControl(
        { value: bopInfoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
    });
  }

  getBopInfo(form: BopInfoFormGroup): NewBopInfo {
    return form.getRawValue() as NewBopInfo;
  }

  resetForm(form: BopInfoFormGroup, bopInfo: BopInfoFormGroupInput): void {
    const bopInfoRawValue = { ...this.getFormDefaults(), ...bopInfo };
    form.reset(
      {
        ...bopInfoRawValue,
        id: { value: bopInfoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): BopInfoFormDefaults {
    return {
      id: null,
    };
  }
}
