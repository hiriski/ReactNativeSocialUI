export type UUID = string;

export interface IActionBooleanPayload {
  payload: boolean;
}

export interface IDropdown<T> {
  value: T;
  label: string;
}

export interface IDropdownValue<T> extends IDropdown<T> {}
