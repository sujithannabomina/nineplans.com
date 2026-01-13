export function makeAlias(seed = "") {
  const base = (seed || "Anonymous").split("@")[0].replace(/\s+/g, "").slice(0, 14) || "Anon";
  const n = Math.floor(Math.random() * 900 + 100);
  return `${base}${n}`;
}
