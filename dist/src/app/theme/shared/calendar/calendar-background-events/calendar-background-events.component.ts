import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { OptionsInput } from 'fullcalendar';
import { CalendarComponent } from '../calendar.component';

@Component({
  selector: "widget-calendar-background-events",
  templateUrl: "./calendar-background-events.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class CalendarBackgroundEventsWidgetComponent implements OnInit, AfterViewInit {
  calendarOptions: OptionsInput;
  @ViewChild(CalendarComponent) vCalendar: CalendarComponent;

  constructor() {
    let todayDate = moment().startOf('day');
    let YM = todayDate.format('YYYY-MM');
    let YESTERDAY = todayDate.clone().subtract(1, 'day').format('YYYY-MM-DD');
    let TODAY = todayDate.format('YYYY-MM-DD');
    let TOMORROW = todayDate.clone().add(1, 'day').format('YYYY-MM-DD');

    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      navLinks: true,
      businessHours: true, // display business hours
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events: [
        {
          title: 'All Day Event',
          start: `${YM}-01`,
          description: 'Lorem ipsum dolor sit incid idunt ut',
          className: "m-fc-event--danger m-fc-event--solid-success"
        },
        {
          title: 'Reporting',
          start: `${YM}-14T13:30:00`,
          description: 'Lorem ipsum dolor incid idunt ut labore',
          end: `${YM}-14`,
          className: "m-fc-event--accent",
          constraint: 'businessHours'
        },
        {
          title: 'Company Trip',
          start: `${YM}-02`,
          description: 'Lorem ipsum dolor sit tempor incid',
          end: `${YM}-03`,
          className: "m-fc-event--light m-fc-event--solid-primary"
        },
        {
          title: 'Expo',
          start: `${YM}-03`,
          description: 'Lorem ipsum dolor sit tempor inci',
          end: `${YM}-05`,
          className: "m-fc-event--primary",
          rendering: 'background',
          //color: mUtil.getColor('accent')
        },
        {
          title: 'Dinner',
          start: `${YM}-12`,
          description: 'Lorem ipsum dolor sit amet, conse ctetur',
          end: `${YM}-10`,
          rendering: 'background',
          //color: mUtil.getColor('info')
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: `${YM}-09T16:00:00`,
          description: 'Lorem ipsum dolor sit ncididunt ut labore',
          className: "m-fc-event--danger",
          //color: mUtil.getColor('primary')
        },
        {
          id: 1000,
          title: 'Repeating Event',
          description: 'Lorem ipsum dolor sit amet, labore',
          start: `${YM}-16T16:00:00`
        },
        {
          title: 'Conference',
          start: YESTERDAY,
          end: TOMORROW,
          description: 'Lorem ipsum dolor eius mod tempor labore',
          className: "m-fc-event--accent",
          rendering: 'background',
          //color: mUtil.getColor('metal')
        },
        {
          title: 'Meeting',
          start: `${TODAY}T10:30:00`,
          end: `${TODAY}T12:30:00`,
          description: 'Lorem ipsum dolor eiu idunt ut labore'
        },
        {
          title: 'Lunch',
          start: `${TODAY}T12:00:00`,
          className: "m-fc-event--info",
          description: 'Lorem ipsum dolor sit amet, ut labore'
        },
        {
          title: 'Meeting',
          start: `${TODAY}T14:30:00`,
          className: "m-fc-event--warning",
          description: 'Lorem ipsum conse ctetur adipi scing',
          rendering: 'background',
          //color: mUtil.getColor('warning')
        },
        {
          title: 'Happy Hour',
          start: `${TODAY}T17:30:00`,
          className: "m-fc-event--metal",
          description: 'Lorem ipsum dolor sit amet, conse ctetur'
        },
        {
          title: 'Dinner',
          start: `${TODAY}T20:00:00`,
          description: 'Lorem ipsum dolor sit ctetur adipi scing'
        },
        {
          title: 'Birthday Party',
          start: `${TOMORROW}T07:00:00`,
          className: "m-fc-event--primary",
          description: 'Lorem ipsum dolor sit amet, scing',
          rendering: 'background',
          //color: mUtil.getColor('focus')
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: `${YM}-28`,
          description: 'Lorem ipsum dolor sit amet, labore'
        }
      ],

      eventRender: function(event, element) {
        /*if (element.hasClass('fc-day-grid-event')) {
          element.data('content', event.description);
          element.data('placement', 'top');
          mApp.initPopover(element);
        } else if (element.hasClass('fc-time-grid-event')) {
          element.find('.fc-title').append('<div class="fc-description">' + event.description + '</div>');
        } else if (element.find('.fc-list-item-title').lenght !== 0) {
          element.find('.fc-list-item-title').append('<div class="fc-description">' + event.description + '</div>');
        }*/
      }
    };
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }
}