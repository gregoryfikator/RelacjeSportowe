import { Component, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-auto-spinner',
  templateUrl: './auto-spinner.component.html',
  styleUrls: ['./auto-spinner.component.less']
})
export class AutoSpinnerComponent implements OnDestroy {

  constructor(private ngxSpinnerService: NgxSpinnerService) {
    this.ngxSpinnerService.show();
  }

  ngOnDestroy() {
    this.ngxSpinnerService.hide();
  }
}
