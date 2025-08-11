import opening_hours from "opening_hours";

export const isOpeningHourValid = (value: string) => {
  let valid = false;
  try {
    new opening_hours(value);
    valid = true;
  } catch {
    valid = false;
  }

  return value === "" || value === null || valid;
};


export const isOpenNow = (openingHours: string) => {
  if (!isOpeningHourValid(openingHours)) {
    return false;
  }

  const oh = new opening_hours(openingHours);
  return oh.getState();
}