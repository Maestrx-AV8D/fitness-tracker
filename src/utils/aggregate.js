export function aggregateByDay(entries = [], rangeDays = 7) {
  const cutoff = Date.now() - (rangeDays - 1) * 864e5;
  const bucket = {};

  for (const e of entries) {
    const ts = new Date(e.date).getTime();
    if (ts < cutoff) continue;

    const key = new Date(ts).toLocaleDateString("en-GB", {
      month: "2-digit",
      day: "2-digit",
    });

    if (!bucket[key]) bucket[key] = { date: key, totalDistance: 0, totalDuration: 0 };

    (e.segments || []).forEach((s) => {
      bucket[key].totalDistance += Number(s.distance || 0);
      bucket[key].totalDuration += Number(s.duration || 0);
    });
  }
  return Object.values(bucket).sort((a, b) => new Date(a.date) - new Date(b.date));
}