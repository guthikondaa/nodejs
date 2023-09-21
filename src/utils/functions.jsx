import Regex from "../utils/Regex";
export const CamelCaseToString = (str) => {
  return str.match(/^[a-z]+|[A-Z][a-z]*/g)
    ? str
      .match(/^[a-z]+|[A-Z][a-z]*/g)
      .map(function (x) {
        return x[0].toUpperCase() + x.substr(1).toLowerCase();
      })
      .join(" ")
    : "";
};

export const simpleUpperString = (str) => {
  var simpleString = str;
  simpleString = simpleString.replace(/[^a-zA-Z0-9]/g, "");
  simpleString = simpleString.trim();
  simpleString = simpleString.toUpperCase();
  return simpleString;
};

export const arrayToString = (array) => {
  return array.join(" , ");
};

export const checkSpecialChar = (value) => {
  if (!Regex.specialCharCheck.test(value)) {
    return true;
  } else {
    return false;
  }
};

export const checkUrl = (value) => {
  if (!Regex.validUrl.test(value)) {
    return true;
  } else {
    return false;
  }
};

export function dateConverter(val) {
  let date = new Date(val);
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}
export function datetimeConverter(val) {
  let date = new Date(val);
  return `${date.getFullYear()}/${date.getMonth() + 1
    }/${date.getDate()} @ ${date.getHours()}:${date.getMinutes()}`;
}

export function stringToCamelCase(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

export function Capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function dateformatMMDDYYYY(val) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  let date = new Date(val);
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

}