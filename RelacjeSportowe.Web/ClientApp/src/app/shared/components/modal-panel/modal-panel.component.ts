import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-panel',
  templateUrl: './modal-panel.component.html',
  styleUrls: ['./modal-panel.component.less']
})
export class ModalPanelComponent implements OnInit {

  @Input() public panelTitle: string;
  
  constructor() { }

  ngOnInit() {
  }

}
