import iModalDailog from "./iModalDailog";

export default interface iExtraColumn {
  displayName: string;
  name: string;
  width?: number;
  formatter?(cell: any, tmpGenericGrid: any): void;
  modalDailog?: iModalDailog;
}
