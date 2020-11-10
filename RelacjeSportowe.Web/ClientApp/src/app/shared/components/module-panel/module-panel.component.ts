import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-module-panel',
  templateUrl: './module-panel.component.html',
  styleUrls: ['./module-panel.component.less']
})
export class ModulePanelComponent implements OnInit {

  @Input() public text: string;

  constructor() { }

  ngOnInit() {
  }

}
