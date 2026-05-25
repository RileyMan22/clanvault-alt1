import "./styles.css";

declare const alt1: { identifyAppUrl: (url: string) => void };

const API_BASE = "https://clanvault.io/api";

if (typeof alt1 !== "undefined") {
  alt1.identifyAppUrl("./appconfig.json");
}

// ── Tab switching ──────────────────────────────────────────────────────────
document.querySelectorAll<HTMLButtonElement>(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.tab!;
    document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".tab-pane").forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(target)!.classList.add("active");
  });
});

// ── Hiscores ───────────────────────────────────────────────────────────────
const hiscoresInput = document.getElementById("hiscores-input") as HTMLInputElement;
const hiscoresResults = document.getElementById("hiscores-results")!;

async function lookupHiscores() {
  const player = hiscoresInput.value.trim();
  if (!player) return;

  hiscoresResults.innerHTML = '<div class="loading">Loading…</div>';

  try {
    const res = await fetch(`${API_BASE}/hiscores?player=${encodeURIComponent(player)}`);
    if (res.status === 404) throw new Error("Player not found.");
    if (!res.ok) throw new Error("Hiscores unavailable.");

    const data: {
      player: string;
      skills: Record<string, { rank: number; level: number; xp: number }>;
    } = await res.json();

    const rows = Object.entries(data.skills)
      .map(([name, s]) => {
        const isOverall = name === "Overall";
        const rank = s.rank > 0 ? `#${s.rank.toLocaleString()}` : "—";
        return `
          <div class="skill-row${isOverall ? " overall" : ""}">
            <span class="skill-name">${name}</span>
            <span class="skill-level">${s.level}</span>
            <span class="skill-rank">${rank}</span>
          </div>`;
      })
      .join("");

    hiscoresResults.innerHTML = `
      <div class="player-name">${data.player}</div>
      <div class="skills-grid">${rows}</div>`;
  } catch (e: any) {
    hiscoresResults.innerHTML = `<div class="error">${e.message ?? "Something went wrong."}</div>`;
  }
}

document.getElementById("hiscores-btn")!.addEventListener("click", lookupHiscores);
hiscoresInput.addEventListener("keydown", (e) => { if (e.key === "Enter") lookupHiscores(); });

// ── GE Price ───────────────────────────────────────────────────────────────
const geInput = document.getElementById("ge-input") as HTMLInputElement;
const geResults = document.getElementById("ge-results")!;

async function lookupGEPrice() {
  const name = geInput.value.trim();
  if (!name) return;

  geResults.innerHTML = '<div class="loading">Looking up price…</div>';

  try {
    const res = await fetch(`${API_BASE}/ge-price?name=${encodeURIComponent(name)}`);
    if (res.status === 404) throw new Error("Item not found in GE.");
    if (!res.ok) throw new Error("Price unavailable.");

    const data: { name: string; price: number; id: number | null } = await res.json();

    geResults.innerHTML = `
      <div class="ge-result">
        <div class="item-name">${data.name}</div>
        <div class="item-price">${data.price.toLocaleString()} gp</div>
        ${data.id ? `<div class="item-id">Item ID: ${data.id}</div>` : ""}
      </div>`;
  } catch (e: any) {
    geResults.innerHTML = `<div class="error">${e.message ?? "Something went wrong."}</div>`;
  }
}

document.getElementById("ge-btn")!.addEventListener("click", lookupGEPrice);
geInput.addEventListener("keydown", (e) => { if (e.key === "Enter") lookupGEPrice(); });
