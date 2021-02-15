export default interface iGridButton {
  name: string;
  id: string;
  style: string;
  cssClass: string;
  toolTip: string;
  clickEvent(table: any): void;
}
