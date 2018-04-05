import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BlogWidgetComponent } from './widgets/blog-widget/blog.component';
import { TopProductsWidgetComponent } from './widgets/top-products/top-products.component';
import { ProductActivityWidgetComponent } from './widgets/product-activity/product-activity.component';

import { CalendarComponent } from './calendar/calendar.component';
import { CalendarBasicWidgetComponent } from './calendar/calendar-basic/calendar-basic.component';
import { CalendarEventsWidgetComponent } from './calendar/calendar-events/calendar-events.component';
import { CalendarGoogleWidgetComponent } from './calendar/calendar-google/calendar-google.component';
import { CalendarListViewWidgetComponent } from './calendar/calendar-list-view/calendar-list-view.component';
import { CalendarExternalEventsWidgetComponent } from './calendar/calendar-external-events/calendar-external-events.component';
import { CalendarBackgroundEventsWidgetComponent } from './calendar/calendar-background-events/calendar-background-events.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CalendarComponent,
    BlogWidgetComponent,
    TopProductsWidgetComponent,
    ProductActivityWidgetComponent,
    CalendarBasicWidgetComponent,
    CalendarEventsWidgetComponent,
    CalendarGoogleWidgetComponent,
    CalendarListViewWidgetComponent,
    CalendarExternalEventsWidgetComponent,
    CalendarBackgroundEventsWidgetComponent,
  ],
  exports: [
    CalendarComponent,
    BlogWidgetComponent,
    TopProductsWidgetComponent,
    ProductActivityWidgetComponent,
    CalendarBasicWidgetComponent,
    CalendarEventsWidgetComponent,
    CalendarGoogleWidgetComponent,
    CalendarListViewWidgetComponent,
    CalendarExternalEventsWidgetComponent,
    CalendarBackgroundEventsWidgetComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class SharedModule { }
