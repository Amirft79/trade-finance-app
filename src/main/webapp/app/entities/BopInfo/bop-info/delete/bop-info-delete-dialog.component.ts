import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IBopInfo } from '../bop-info.model';
import { BopInfoService } from '../service/bop-info.service';

@Component({
  standalone: true,
  templateUrl: './bop-info-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class BopInfoDeleteDialogComponent {
  bopInfo?: IBopInfo;

  protected bopInfoService = inject(BopInfoService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.bopInfoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
