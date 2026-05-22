/* ══════════════════════════════════════════════════════════════
   Sistema de Notas · app.js  (token-based, sin cookies)
══════════════════════════════════════════════════════════════ */

const API = "http://127.0.0.1:5000/api";

/* ── HTTP helpers ─────────────────────────────────────────── */
async function http(method, path, body) {
  const token = localStorage.getItem("sn_token") || "";
  const opts = {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-Token": token
    }
  };
  if (body) opts.body = JSON.stringify(body);
  const r = await fetch(API + path, opts);
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.error || "Error del servidor");
  return data;
}
const GET    = (p)    => http("GET",    p);
const POST   = (p, b) => http("POST",   p, b);
const PATCH  = (p, b) => http("PATCH",  p, b);
const DELETE = (p)    => http("DELETE", p);

/* ── Toast ────────────────────────────────────────────────── */
const _toastEl = () => document.getElementById("toast");
let _toastTimer;
function toast(msg, type = "success") {
  const el = _toastEl();
  if (!el) return;
  el.textContent = msg;
  el.className = `show ${type}`;
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => (el.className = ""), 3200);
}

/* ── Grade pill helper ────────────────────────────────────── */
function gradePill(val) {
  if (val === null || val === undefined) return `<span class="pill pill-gray">—</span>`;
  const cls = val >= 8 ? "grade-high" : val >= 6 ? "grade-mid" : "grade-low";
  return `<span class="grade-pill ${cls}">${val.toFixed(1)}</span>`;
}

/* ── Auth guard ───────────────────────────────────────────── */
async function requireAuth(redirectTo = "index.html") {
  try {
    return await GET("/me");
  } catch {
    localStorage.removeItem("sn_token");
    window.location.href = redirectTo;
  }
}
