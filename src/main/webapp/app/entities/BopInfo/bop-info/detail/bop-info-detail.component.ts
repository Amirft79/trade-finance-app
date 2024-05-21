import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IBopInfo } from '../bop-info.model';

@Component({
  standalone: true,
  selector: 'jhi-bop-info-detail',
  templateUrl: './bop-info-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class BopInfoDetailComponent {
  bopInfo = input<IBopInfo | null>(null);

  previousState(): void {
    window.history.back();
  }
}
