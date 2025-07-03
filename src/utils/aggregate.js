export function aggregate(entries) {
  // totals for current ISO week
  const now    = new Date();
  const weekNo = getWeek(now);
  let minsThisWeek = 0;
  let kmThisWeek   = 0;
  const activityTotals = {}; // minutes per type

  entries.forEach(e => {
    if (getWeek(new Date(e.date)) === weekNo) {
      e.segments.forEach(s => {
        const dur = Number(s.duration || 0);
        minsThisWeek += dur;
        if (s.type === 'Run' || s.type === 'Bike' || s.type === 'Cycle')
          kmThisWeek += Number(s.distance || 0);
      });
    }
    e.segments.forEach(s => {
      activityTotals[s.type] = (activityTotals[s.type] || 0) + Number(s.duration || 0);
    });
  });

  return { minsThisWeek, kmThisWeek, activityTotals };
}

function getWeek(d) {
  const onejan = new Date(d.getFullYear(), 0, 1);
  return Math.ceil((((d - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}