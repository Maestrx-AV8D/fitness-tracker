// exportImport.js
export function downloadJSON(entries) {
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(entries, null, 2)], { type: "application/json" })
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = "fitness_entries.json";
  a.click();
  URL.revokeObjectURL(url);
}

export function importJSON(setEntries) {
  const inp = document.createElement("input");
  inp.type = "file";
  inp.accept = "application/json";
  inp.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    file.text().then((txt) => {
      try {
        const data = JSON.parse(txt);
        if (Array.isArray(data)) setEntries(data);
      } catch {
        alert("Invalid file");
      }
    });
  };
  inp.click();
}