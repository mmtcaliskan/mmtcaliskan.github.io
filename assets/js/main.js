/* ==========================================================
   Kişisel akademik site — ortak betik
   1) TR/EN dil değiştirme   2) mobil menü
   3) spam'e karşı e-posta   4) yayın süzgeci (yalnız yayinlar.html)
   ========================================================== */

// ---- AYARLAR: kurumsal e-postanızı buraya yazın ----
// Örnek: kullanici = "ad.soyad", alan = "bandirma.edu.tr"
const EPOSTA = { kullanici: "mcaliskan", alan: "bandirma.edu.tr" };

(function () {
  const html = document.documentElement;

  // ---------- 1) Dil ----------
  function setLang(lang) {
    html.lang = lang;
    try { localStorage.setItem("lang", lang); } catch (e) {}
    const t = document.querySelector("title");
    if (t && t.dataset[lang]) t.textContent = t.dataset[lang];
    document.querySelectorAll(".lang-btn").forEach(b => {
      b.textContent = lang === "tr" ? "EN" : "TR";
      b.setAttribute("aria-label", lang === "tr" ? "Switch to English" : "Türkçeye geç");
    });
    document.querySelectorAll("[data-ph-tr]").forEach(el => {
      el.placeholder = el.dataset["ph" + (lang === "tr" ? "Tr" : "En")];
    });
    if (typeof window.__updateCount === "function") window.__updateCount();
  }
  let saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) {}
  const params = new URLSearchParams(location.search);
  setLang(params.get("lang") || saved || "tr");
  document.querySelectorAll(".lang-btn").forEach(b =>
    b.addEventListener("click", () => setLang(html.lang === "tr" ? "en" : "tr")));

  // ---------- 2) Mobil menü ----------
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector("nav.main");
  if (menuBtn && nav) menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
  });

  // ---------- 3) E-posta ----------
  document.querySelectorAll("[data-email]").forEach(el => {
    if (!EPOSTA.kullanici) { el.closest("[data-email-wrap]")?.setAttribute("hidden", ""); return; }
    const addr = EPOSTA.kullanici + "@" + EPOSTA.alan;
    el.href = "mailto:" + addr;
    el.textContent = addr;
  });

  // ---------- 3b) Dış bağlantılar yeni sekmede ----------
  // Başka alan adına giden tüm http(s) bağlantıları yeni sekmede açılır;
  // sitenin kendi sayfaları aynı sekmede kalır. Sonradan eklenen
  // bağlantılar için de HTML'de ayrıca bir şey yapmaya gerek yoktur.
  document.querySelectorAll("a[href]").forEach(a => {
    let url;
    try { url = new URL(a.getAttribute("href"), location.href); } catch (e) { return; }
    if (!/^https?:$/.test(url.protocol) || url.hostname === location.hostname) return;
    a.target = "_blank";
    const rel = new Set((a.getAttribute("rel") || "").split(/\s+/).filter(Boolean));
    rel.add("noopener"); rel.add("noreferrer");
    a.setAttribute("rel", [...rel].join(" "));
  });

  // ---------- 4) Yayın süzgeci ----------
  const list = document.querySelectorAll("ol.pubs li");
  if (!list.length) return;
  const search = document.getElementById("pub-search");
  const chips = document.querySelectorAll(".chip[data-type]");
  const countEl = document.getElementById("pub-count");
  let type = "all";

  function norm(s) {
    return s.toLocaleLowerCase("tr").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ı/g, "i");
  }
  list.forEach(li => { li.dataset.text = norm(li.textContent); });

  function apply() {
    const q = norm(search.value.trim());
    let n = 0;
    list.forEach(li => {
      const ok = (type === "all" || li.closest("[data-section]").dataset.section === type) &&
                 (!q || li.dataset.text.includes(q));
      li.hidden = !ok;
      if (ok) n++;
    });
    document.querySelectorAll("[data-section]").forEach(sec => {
      sec.hidden = !sec.querySelector("li:not([hidden])");
    });
    countEl.textContent = html.lang === "tr" ? `${n} kayıt gösteriliyor` : `Showing ${n} records`;
  }
  window.__updateCount = apply;
  search.addEventListener("input", apply);
  chips.forEach(c => c.addEventListener("click", () => {
    type = c.dataset.type;
    chips.forEach(x => x.setAttribute("aria-pressed", x === c));
    apply();
  }));
  apply();
})();
