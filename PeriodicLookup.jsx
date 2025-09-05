import React, { useState } from "react";

export default function PeriodicLookup() {
  const elements = [
  {
    "number": 1,
    "symbol": "H",
    "name": "Hydrogen",
    "atomic_mass": 1.008,
    "category": "Nonmetal",
    "electron_configuration": "1s1",
    "electronegativity": 2.2,
    "density": 8.988e-05,
    "melting_c": -259.14,
    "boiling_c": -252.87,
    "summary": "Lightest element"
  },
  {
    "number": 2,
    "symbol": "He",
    "name": "Helium",
    "atomic_mass": 4.002602,
    "category": "Noble gas",
    "electron_configuration": "1s2",
    "electronegativity": null,
    "density": 0.0001785,
    "melting_c": null,
    "boiling_c": -268.93,
    "summary": "Noble gas, inert"
  },
  {
    "number": 3,
    "symbol": "Li",
    "name": "Lithium",
    "atomic_mass": 6.94,
    "category": "Alkali metal",
    "electron_configuration": "[He] 2s1",
    "electronegativity": 0.98,
    "density": 0.534,
    "melting_c": 180.54,
    "boiling_c": 1342,
    "summary": "Lightest metal"
  }
];

  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState(
    "Type a symbol (Fe), name (iron), atomic number (26), or atomic mass (55.845)"
  );

  const handleLookup = (raw) => {
    const q = raw.trim();
    if (!q) {
      setResult(null);
      setMessage("Please enter something.");
      return;
    }

    const bySymbol = elements.find(
      (el) => el.symbol.toLowerCase() === q.toLowerCase()
    );
    if (bySymbol) {
      setResult(bySymbol);
      setMessage("Found by symbol.");
      return;
    }

    const byName = elements.find(
      (el) => el.name.toLowerCase() === q.toLowerCase()
    );
    if (byName) {
      setResult(byName);
      setMessage("Found by name.");
      return;
    }

    const asNumber = Number(q);
    if (!Number.isNaN(asNumber)) {
      if (Number.isInteger(asNumber)) {
        const byNumber = elements.find((el) => el.number === asNumber);
        if (byNumber) {
          setResult(byNumber);
          setMessage("Found by atomic number.");
          return;
        }
      }
      const tolerance = 0.5;
      const byMass = elements.find(
        (el) => Math.abs(el.atomic_mass - asNumber) <= tolerance
      );
      if (byMass) {
        setResult(byMass);
        setMessage("Found by atomic mass.");
        return;
      }
    }

    setResult(null);
    setMessage("No element found.");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleLookup(query);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 flex items-center justify-center">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 flex flex-col justify-between">
          <header>
            <h1 className="text-2xl font-bold mb-2">Element Lookup 🔬</h1>
            <p className="text-sm text-slate-600 mb-4">
              Enter symbol, name, atomic number, or mass.
            </p>
          </header>
          <form onSubmit={onSubmit} className="flex gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Fe, iron, 26, 55.845"
              className="flex-1 p-3 rounded-lg border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
            <button className="px-4 py-2 rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700">
              Go
            </button>
          </form>
          <div className="mt-4 text-sm text-slate-700">{message}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 min-h-[250px]">
          {result ? (
            <article>
              <h2 className="text-xl font-bold mb-1">
                {result.name} <span className="text-slate-500">({result.symbol})</span>
              </h2>
              <p className="text-sm text-slate-600 mb-3">
                Atomic # {result.number} • Mass {result.atomic_mass}
              </p>
              <dl className="grid grid-cols-2 gap-3 text-sm text-slate-700">
                <div>
                  <dt className="text-xs text-slate-500">Category</dt>
                  <dd>{result.category}</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">Electron config</dt>
                  <dd>{result.electron_configuration}</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">Electronegativity</dt>
                  <dd>{result.electronegativity ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">Density (g/cm³)</dt>
                  <dd>{result.density ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">Melting / Boiling °C</dt>
                  <dd>{result.melting_c ?? "—"} / {result.boiling_c ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">Fun fact</dt>
                  <dd>{result.summary}</dd>
                </div>
              </dl>
            </article>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 italic">
              No result yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
