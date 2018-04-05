import {
  OnInit, NgZone, AfterViewInit, AfterContentChecked, AfterViewChecked, ElementRef, EventEmitter, Component, Input
} from '@angular/core';
import * as $ from 'jquery';

import * as fullcalendar from 'fullcalendar';
import { OptionsInput } from 'fullcalendar';
import './customEvent';

$.fn.fullCalendar = function(options) {
  let args = Array.prototype.slice.call(arguments, 1); // for a possible method call
  let res = this; // what this function will return (this jQuery object by default)

  this.each((i, _element) => { // loop each DOM element involved
    let element = $(_element);
    let calendar = element.data('fullCalendar'); // get the existing calendar object (if any)
    let singleRes; // the returned value of this single method call

    // a method call
    if (typeof options === 'string') {
      if (options === 'getCalendar') {
        if (!i) { // first element only
          res = calendar;
        }
      } else if (options === 'destroy') { // don't warn if no calendar object
        if (calendar) {
          calendar.destroy();
          element.removeData('fullCalendar');
        }
      } else if (!calendar) {
        console.warn("Attempting to call a FullCalendar method on an element with no calendar.");
      } else if ($.isFunction(calendar[options])) {
        singleRes = calendar[options].apply(calendar, args);
        if (!i) {
          res = singleRes; // record the first method call result
        }
        if (options === 'destroy') { // for the destroy method, must remove Calendar object data
          element.removeData('fullCalendar');
        }
      } else {
        console.warn(`'${options}' is an unknown FullCalendar method.`);
      }
    }
    // a new calendar initialization
    else if (!calendar) { // don't initialize twice
      calendar = new fullcalendar.Calendar(element, options);
      element.data('fullCalendar', calendar);
      calendar.render();
    }
  });

  return res;
};

@Component({
  selector: 'vogue-calendar',
  template: '<div></div>'
})
export class CalendarComponent implements OnInit, AfterViewInit, AfterContentChecked, AfterViewChecked {
  private element;
  private zone;
  private _eventsModel;
  private _reRender;
  eventsModelChange: EventEmitter<any>;

  @Input() options: OptionsInput;

  eventDrop: EventEmitter<any>;
  eventResize: EventEmitter<any>;
  eventClick: EventEmitter<any>;
  clickButton: EventEmitter<any>;
  windowResize: EventEmitter<any>;
  viewRender: EventEmitter<any>;
  viewDestroy: EventEmitter<any>;
  eventRender: EventEmitter<any>;
  initialized: EventEmitter<any>;
  select: EventEmitter<any>;
  unselect: EventEmitter<any>;
  dayClick: EventEmitter<any>;
  navLinkDayClick: EventEmitter<any>;
  navLinkWeekClick: EventEmitter<any>;
  constructor(element: ElementRef, zone: NgZone) {
    this.element = element;
    this.zone = zone;
    this._reRender = true;
    this.eventsModelChange = new EventEmitter();
    this.eventDrop = new EventEmitter();
    this.eventResize = new EventEmitter();
    this.eventClick = new EventEmitter();
    this.clickButton = new EventEmitter();
    this.windowResize = new EventEmitter();
    this.viewRender = new EventEmitter();
    this.viewDestroy = new EventEmitter();
    this.eventRender = new EventEmitter();
    this.initialized = new EventEmitter();
    this.select = new EventEmitter();
    this.unselect = new EventEmitter();
    this.dayClick = new EventEmitter();
    this.navLinkDayClick = new EventEmitter();
    this.navLinkWeekClick = new EventEmitter();
  }
  /**
   * @return {?}
   */
  get eventsModel() {
    return this._eventsModel;
  }
  /**
   * @param {?} value
   * @return {?}
   */
  set eventsModel(value) {
    this._eventsModel = value;
    if (this._reRender) {
      setTimeout(() => {
        this.renderEvents(value);
      }, 50);
    } else {
      this._reRender = true;
    }
  }
  /**
   * @return {?}
   */
  ngOnInit() { }
  /**
   * @return {?}
   */
  ngAfterViewInit() {
    setTimeout(() => {
      this.updaterOptions();
      this.zone.runOutsideAngular(() => {
        let /** @type {?} */ elem = this.element.nativeElement;
        $(elem).fullCalendar(this.options);
        this._eventsModel = this.options.events;
        this.eventsModelChange.next(this.options.events);
        this.initialized.emit(true);
        // Click listeners
        $('[class ^="fc"][class *="button"]').click(el => {
          let /** @type {?} */ classnames = el.currentTarget.className.split(' ');
          classnames.forEach(name => {
            if (name.indexOf('button') == name.length - 6) {
              name = name.replace(/fc|button|-/g, '');
              if (name != '') {
                // this.renderEvents(this._eventsModel);
                eventDispatch(name);
              }
            }
          });
        });
        /**
         * @param {?} buttonType
         * @return {?}
         */
        function eventDispatch(buttonType) {
          let /** @type {?} */ data = $(elem).fullCalendar('getDate');
          let /** @type {?} */ currentDetail = {
            buttonType: buttonType,
            data: data
          };
          let /** @type {?} */ widgetEvent = new CustomEvent('clickButton', {
            bubbles: true,
            detail: currentDetail
          });
          elem.dispatchEvent(widgetEvent);
        }
      });
    }, 2000);
  }
  /**
   * @return {?}
   */
  ngAfterContentChecked() {
  }
  /**
   * @return {?}
   */
  ngAfterViewChecked() {
  }
  /**
   * @return {?}
   */
  updateEventsBeforeResize() {
    let /** @type {?} */ events = this.fullCalendar('clientEvents');
    this._reRender = false;
    this.eventsModel = events;
    this.eventsModelChange.next(events);
  }
  /**
   * @return {?}
   */
  updaterOptions() {
    let /** @type {?} */ elem = this.element.nativeElement;
    this.options.eventDrop = (event, duration) => {
      let /** @type {?} */ detail = { event: event, duration: duration };
      let /** @type {?} */ widgetEvent = new CustomEvent('eventDrop', {
        bubbles: true,
        detail: detail
      });
      this.updateEventsBeforeResize();
      elem.dispatchEvent(widgetEvent);
    };
    this.options.eventResize = (event, duration) => {
      let /** @type {?} */ detail = { event: event, duration: duration };
      let /** @type {?} */ widgetEvent = new CustomEvent('eventResize', {
        bubbles: true,
        detail: detail
      });
      this.updateEventsBeforeResize();
      elem.dispatchEvent(widgetEvent);
    };
    this.options.eventRender = (event, element, view) => {
      let /** @type {?} */ detail = { event: event, element: element, view: view };
      let /** @type {?} */ widgetEvent = new CustomEvent('eventRender', {
        bubbles: true,
        detail: detail
      });
      elem.dispatchEvent(widgetEvent);
    };
    this.options.eventClick = (event) => {
      let /** @type {?} */ detail = { event: event, duration: null };
      let /** @type {?} */ widgetEvent = new CustomEvent('eventClick', {
        bubbles: true,
        detail: detail
      });
      elem.dispatchEvent(widgetEvent);
    };
    this.options.windowResize = view => {
      let /** @type {?} */ detail = { view: view };
      let /** @type {?} */ widgetEvent = new CustomEvent('windowResize', {
        bubbles: true,
        detail: detail
      });
      if (elem) {
        elem.dispatchEvent(widgetEvent);
      }
    };
    this.options.viewRender = (view, element) => {
      let /** @type {?} */ detail = { view: view, element: element };
      let /** @type {?} */ widgetEvent = new CustomEvent('viewRender', {
        bubbles: true,
        detail: detail
      });
      elem.dispatchEvent(widgetEvent);
    };
    this.options.viewDestroy = (view, element) => {
      let /** @type {?} */ detail = { view: view, element: element };
      let /** @type {?} */ widgetEvent = new CustomEvent('viewDestroy', {
        bubbles: true,
        detail: detail
      });
      elem.dispatchEvent(widgetEvent);
    };
    this.options.select = (start, end, jsEvent, view, resource) => {
      let /** @type {?} */ detail = { start: start, end: end, jsEvent: jsEvent, view: view, resource: resource };
      let /** @type {?} */ widgetEvent = new CustomEvent('select', {
        bubbles: true,
        detail: detail
      });
      elem.dispatchEvent(widgetEvent);
    };
    this.options.unselect = (view, jsEvent) => {
      let /** @type {?} */ detail = { view: view, jsEvent: jsEvent };
      let /** @type {?} */ widgetEvent = new CustomEvent('unselect', {
        bubbles: true,
        detail: detail
      });
      elem.dispatchEvent(widgetEvent);
    };
    this.options.dayClick = (date, jsEvent, view) => {
      let /** @type {?} */ detail = { date: date, jsEvent: jsEvent, view: view };
      let /** @type {?} */ widgetEvent = new CustomEvent('dayClick', {
        bubbles: true,
        detail: detail
      });
      elem.dispatchEvent(widgetEvent);
    };
    this.options.navLinkDayClick = (date, jsEvent) => {
      let /** @type {?} */ detail = { date: date, jsEvent: jsEvent };
      let /** @type {?} */ widgetEvent = new CustomEvent('navLinkDayClick', {
        bubbles: true,
        detail: detail
      });
      elem.dispatchEvent(widgetEvent);
    };
    this.options.navLinkWeekClick = (weekStart, jsEvent) => {
      let /** @type {?} */ detail = { weekStart: weekStart, jsEvent: jsEvent };
      let /** @type {?} */ widgetEvent = new CustomEvent('navLinkWeekClick', {
        bubbles: true,
        detail: detail
      });
      elem.dispatchEvent(widgetEvent);
    };
  }
  /**
   * @param {...?} args
   * @return {?}
   */
  fullCalendar(...args) {
    if (!args) {
      return;
    }
    switch (args.length) {
      case 0:
        return;
      case 1:
        return $(this.element.nativeElement).fullCalendar(args[0]);
      case 2:
        return $(this.element.nativeElement).fullCalendar(args[0], args[1]);
      case 3:
        return $(this.element.nativeElement).fullCalendar(args[0], args[1], args[2]);
    }
  }
  /**
   * @param {?} event
   * @return {?}
   */
  updateEvent(event) {
    return $(this.element.nativeElement).fullCalendar('updateEvent', event);
  }
  /**
   * @param {?} idOrFilter
   * @return {?}
   */
  clientEvents(idOrFilter) {
    return $(this.element.nativeElement).fullCalendar('clientEvents', idOrFilter);
  }
  /**
   * @param {?} events
   * @return {?}
   */
  renderEvents(events) {
    $(this.element.nativeElement).fullCalendar('removeEvents');
    if (events && events.length > 0) {
      $(this.element.nativeElement).fullCalendar('renderEvents', events, true);
      $(this.element.nativeElement).fullCalendar('rerenderEvents');
    }
  }
}
