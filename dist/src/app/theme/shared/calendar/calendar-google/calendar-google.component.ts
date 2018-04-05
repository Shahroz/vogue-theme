import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';


@Component({
  selector: "widgets-calendar-google",
  templateUrl: "./calendar-google.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class CalendarGoogleWidgetComponent implements OnInit, AfterViewInit {
  constructor(private _script: ScriptLoaderService) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this._script.loadScripts('widgets-calendar-google',
      ['assets/demo/default/custom/components/calendar/google.js']);

  }
}
