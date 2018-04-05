/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
interface JQuery {
  mMenu(options: any): JQuery;
  animateClass(options: any): JQuery;
  setActiveItem(item: any): JQuery;
  getPageTitle(item: any): JQuery;
  getBreadcrumbs(item: any): JQuery;
  validate(options: any): JQuery;
  valid(): JQuery;
  resetForm(): JQuery;
  markdown(): JQuery;
  DataTable(options?: object): JQuery;
  mDatatable(options?: object): JQuery;
  selectpicker(): JQuery;
  plot(placeholder: any, options?: object): JQuery;
}
