import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';


@Component({
  selector: "widgets-calendar-external-events",
  templateUrl: "./calendar-external-events.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class CalendarExternalEventsWidgetComponent implements OnInit, AfterViewInit {
  constructor(private _script: ScriptLoaderService) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this._script.loadScripts('widgets-calendar-external-events',
      ['assets/vendors/custom/jquery-ui/jquery-ui.bundle.js',
        'assets/demo/default/custom/components/calendar/external-events.js']);
  }
}
