import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';


@Component({
  selector: "widgets-calendar-list-view",
  templateUrl: "./calendar-list-view.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class CalendarListViewWidgetComponent implements OnInit, AfterViewInit {
  constructor(private _script: ScriptLoaderService) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this._script.loadScripts('widgets-calendar-list-view',
      ['assets/demo/default/custom/components/calendar/list-view.js']);
  }
}
