export function calculateAttendance(attended, total) {
  if (total <= 0) return 0;

  return (attended / total) * 100;
}


export function calculateAfterAttend(attended, total) {
  return calculateAttendance(attended + 1, total + 1);
}


export function calculateAfterMiss(attended, total) {
  return calculateAttendance(attended, total + 1);
}


export function calculateClassesCanMiss(
  attended,
  total,
  target
) {
  let missed = 0;

  while (
    calculateAttendance(
      attended,
      total + missed + 1
    ) >= target
  ) {
    missed++;
  }

  return missed;
}


export function calculateClassesNeeded(
  attended,
  total,
  target
) {
  if (calculateAttendance(attended, total) >= target) {
    return 0;
  }

  let required = 0;

  while (
    calculateAttendance(
      attended + required,
      total + required
    ) < target
  ) {
    required++;
  }

  return required;
}