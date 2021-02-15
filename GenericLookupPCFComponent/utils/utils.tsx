/* eslint-disable no-console */

export abstract class StringUtils {
  public static stringifyProperties(
    inputProps: { [key: string]: unknown } | null | undefined
  ): { [key: string]: string } {
    if (!inputProps) {
      return {};
    }
    let returnProps: { [key: string]: string } = {};
    Object.keys(inputProps).forEach(function (key: string) {
      returnProps[key] = String(inputProps[key]);
    });

    return returnProps;
  }
}

export function sortOptionSets(obj: any, sort: boolean) {
  var arr = [];
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      arr.push({
        key: prop,
        value: obj[prop],
      });
    }
  }

  if (sort) {
    arr.sort(function (a, b) {
      return a.value.toLowerCase().localeCompare(b.value.toLowerCase());
    });
  }
  return arr;
}

export function IsEmpty(obj: any) {
  if (
    obj === undefined ||
    obj === null ||
    obj?.toString().trim().length === 0 ||
    obj?.toString() === "0"
  )
    return true;
  else return false;
}

export function MandatoryitleFormatter(title: string) {
  return (
    "<div aria-hidden='true' class='header_required_icon'>*</div> " + title
  );
}

export function IsDropdownChanged(originalValue: any, newValue: any) {
  if (originalValue === null || originalValue === undefined) {
    if (
      newValue === null ||
      newValue === undefined ||
      newValue?.toString() === "0"
    )
      return false;
    else return true;
  }
  return originalValue.toString() !== newValue.toString();
}

export function IsTexChanged(originalValue: any, newValue: any) {
  if (originalValue === null || originalValue === undefined) {
    if (
      newValue === null ||
      newValue === undefined ||
      newValue?.toString().trim().length === 0 ||
      newValue?.toString() === "---"
    )
      return false;
    else return true;
  }
  return originalValue.toString() !== newValue.toString();
}

export function GetEditIconHTML() {
  return "<div class='grid-common-formatter-edit symbolFont Edit-symbol'></div>";
}
