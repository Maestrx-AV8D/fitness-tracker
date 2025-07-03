import { saveAs } from 'file-saver';

export function downloadCSV(entries) {
  const header = ['Date','Segment Type','Fields'];
  const rows = entries.flatMap(e =>
    e.segments.map(s => [
      e.date,
      s.type,
      JSON.stringify(s)
    ])
  );
  const csv = [header, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, 'fitness_log.csv');
}