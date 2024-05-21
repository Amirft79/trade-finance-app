import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IBopInfo } from '../bop-info.model';
import { BopInfoService } from '../service/bop-info.service';
import { BopInfoFormService, BopInfoFormGroup } from './bop-info-form.service';

@Component({
  standalone: true,
  selector: 'jhi-bop-info-update',
  templateUrl: './bop-info-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class BopInfoUpdateComponent implements OnInit {
  isSaving = false;
  bopInfo: IBopInfo | null = null;

  protected bopInfoService = inject(BopInfoService);
  protected bopInfoFormService = inject(BopInfoFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: BopInfoFormGroup = this.bopInfoFormService.createBopInfoFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bopInfo }) => {
      this.bopInfo = bopInfo;
      if (bopInfo) {
        this.updateForm(bopInfo);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const bopInfo = this.bopInfoFormService.getBopInfo(this.editForm);
    this.subscribeToSaveResponse(this.bopInfoService.create(bopInfo));
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBopInfo>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(bopInfo: IBopInfo): void {
    this.bopInfo = bopInfo;
    this.bopInfoFormService.resetForm(this.editForm, bopInfo);
  }
}
