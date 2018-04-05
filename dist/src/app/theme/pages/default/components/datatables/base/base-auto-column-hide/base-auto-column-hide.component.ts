import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';

@Component({
  selector: "app-base-auto-column-hide",
  templateUrl: "./base-auto-column-hide.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class BaseAutoColumnHideComponent implements OnInit, AfterViewInit {
  constructor() {

  }
  ngOnInit() {

  }
  ngAfterViewInit() {
    // this._script.loadScripts('app-base-auto-column-hide',
    //   ['assets/demo/default/custom/components/datatables/base/auto-column-hide.js']);

  }

}
