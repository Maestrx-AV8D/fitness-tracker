// src/utils/aggregate.js
export function aggregateByDay(entries = [], rangeDays = 7) {
  const cutoff = Date.now() - (rangeDays - 1) * 864e5; // ms per day
  const dayMap = {};

  for (const entry of entries) {
    const ts = new Date(entry.date).getTime();
    if (ts < cutoff) continue;

    const key = new Date(ts).toLocaleDateString("en-GB", {
      month: "2-digit",
      day:   "2-digit",
    });

    if (!dayMap[key]) {
      dayMap[key] = { date: key, totalDistance: 0, totalDuration: 0 };
    }

    (entry.segments || []).forEach((seg) => {
      dayMap[key].totalDistance += Number(seg.distance || 0);
      dayMap[key].totalDuration += Number(seg.duration || 0);
    });
  }

  return Object.values(dayMap).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
}