export const generateTimes = (
  step = 30,
  startHour = 9,
  endHour = 20
): string[] => {
  const times: string[] = [];

  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const start = startHour * 60;
  const end = endHour * 60;

  const roundedNow = Math.ceil(nowMinutes / step) * step;

  for (let t = start; t <= end; t += step) {
    if (t < roundedNow) continue;

    const h = Math.floor(t / 60);
    const m = t % 60;

    const hh = String(h).padStart(2, '0');
    const mm = String(m).padStart(2, '0');

    times.push(`${hh}:${mm}`);
  }

  return times;
};
