import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AmchartsChartsComponent } from './amcharts-charts.component';
import { LayoutModule } from '../../../../../../layouts/layout.module';
import { DefaultComponent } from '../../../../default.component';

import 'amcharts3/amcharts/amcharts';
import 'amcharts3/amcharts/themes/light';
import 'amcharts3/amcharts/funnel';
import 'amcharts3/amcharts/gantt';
import 'amcharts3/amcharts/gauge';
import 'amcharts3/amcharts/pie';
import 'amcharts3/amcharts/radar';
import 'amcharts3/amcharts/serial';
import 'amcharts3/amcharts/xy';
import 'amcharts3/amcharts/plugins/animate/animate.min';
import 'amcharts3/amcharts/plugins/responsive/responsive.min';
import 'amcharts3/amcharts/plugins/dataloader/dataloader.min';
import 'amcharts3/amcharts/plugins/export/export.min';
import 'amstock3/amcharts/amstock';
import 'ammap3/ammap/maps/js/usaLow';
import 'ammap3/ammap/maps/js/worldLow';
import 'ammap3/ammap/maps/js/worldHigh';
import '../../../../../../../../assets/vendors/custom/amcharts3/polarScatter.min';

const routes: Routes = [
  {
    "path": "",
    "component": DefaultComponent,
    "children": [
      {
        "path": "",
        "component": AmchartsChartsComponent
      }
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule
  ], exports: [
    RouterModule
  ], declarations: [
    AmchartsChartsComponent
  ]
})
export class AmchartsChartsModule {}
