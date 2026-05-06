/**
 * ตัวแปลงหน่วยสากล — script.js
 * =============================
 * หน่วยรวมทั้งหมด + ระบบประวัติ + ธีมตามเวลา + Particles
 */

// ============================================================
// 1. ข้อมูลหน่วยทั้งหมด
// ============================================================
const UNITS = {
  "ความยาว": {
    icon: "📏",
    units: {
      "เมตร":           1,
      "กิโลเมตร":       1000,
      "เซนติเมตร":      0.01,
      "มิลลิเมตร":      0.001,
      "ไมโครเมตร":      1e-6,
      "นาโนเมตร":       1e-9,
      "ไมล์":           1609.344,
      "หลา":            0.9144,
      "ฟุต":            0.3048,
      "นิ้ว":           0.0254,
      "ลิ้ว (ไทย)":     0.0208333,
      "วา (ไทย)":       2,
      "เส้น (ไทย)":     40,
      "ปีแสง":          9.461e15,
      "หน่วยดาราศาสตร์": 1.496e11,
      "พาร์เซก":        3.086e16,
    }
  },
  "น้ำหนัก / มวล": {
    icon: "⚖️",
    units: {
      "กิโลกรัม":   1,
      "กรัม":       0.001,
      "มิลลิกรัม":  1e-6,
      "ไมโครกรัม":  1e-9,
      "ตัน (เมตริก)": 1000,
      "ปอนด์":      0.453592,
      "ออนซ์":      0.0283495,
      "สโตน":       6.35029,
      "กะรัต":      0.0002,
      "ชั่ง (ไทย)": 1.2,
      "บาท (ไทย)":  0.015,
      "สลึง (ไทย)": 0.00375,
    }
  },
  "พื้นที่": {
    icon: "🗺️",
    units: {
      "ตารางเมตร":     1,
      "ตารางกิโลเมตร": 1e6,
      "ตารางเซนติเมตร": 1e-4,
      "ตารางมิลลิเมตร": 1e-6,
      "ตารางฟุต":      0.092903,
      "ตารางนิ้ว":     0.00064516,
      "ตารางไมล์":     2589988.11,
      "เอเคอร์":       4046.856,
      "เฮกตาร์":       10000,
      "ไร่":           1600,
      "งาน":           400,
      "ตารางวา":       4,
    }
  },
  "ปริมาตร": {
    icon: "🧪",
    units: {
      "ลิตร":             1,
      "มิลลิลิตร":        0.001,
      "ลูกบาศก์เมตร":     1000,
      "ลูกบาศก์เซนติเมตร": 0.001,
      "แกลลอน (US)":      3.78541,
      "แกลลอน (UK)":      4.54609,
      "บาร์เรล (น้ำมัน)": 158.987,
      "ควอร์ต":           0.946353,
      "ไพน์ต (US)":       0.473176,
      "ถ้วย (US)":        0.236588,
      "ช้อนโต๊ะ (US)":    0.0147868,
      "ช้อนชา (US)":      0.00492892,
      "ฟลูออนซ์ (US)":    0.0295735,
      "ลูกบาศก์ฟุต":      28.3168,
      "ลูกบาศก์นิ้ว":     0.0163871,
    }
  },
  "อุณหภูมิ": {
    icon: "🌡️",
    special: true,   // ใช้สูตรพิเศษ ไม่ใช่ factor
    units: {
      "เซลเซียส":    "C",
      "ฟาเรนไฮต์":  "F",
      "เคลวิน":     "K",
      "เรอูมีร์":   "Re",
      "แรงคีน":     "Ra",
    }
  },
  "เวลา": {
    icon: "⏱️",
    units: {
      "วินาที":    1,
      "มิลลิวินาที": 0.001,
      "ไมโครวินาที": 1e-6,
      "นาที":      60,
      "ชั่วโมง":   3600,
      "วัน":       86400,
      "สัปดาห์":   604800,
      "เดือน (30 วัน)": 2592000,
      "ปี (365 วัน)":   31536000,
      "ทศวรรษ":    315360000,
      "ศตวรรษ":    3153600000,
    }
  },
  "ความเร็ว": {
    icon: "🚀",
    units: {
      "เมตรต่อวินาที":       1,
      "กิโลเมตรต่อชั่วโมง": 0.277778,
      "ไมล์ต่อชั่วโมง":     0.44704,
      "นอต":                0.514444,
      "ฟุตต่อวินาที":       0.3048,
      "มาค (Mach)":         340.29,
      "ความเร็วแสง":        299792458,
    }
  },
  "พลังงาน": {
    icon: "⚡",
    units: {
      "จูล":              1,
      "กิโลจูล":          1000,
      "เมกะจูล":          1e6,
      "แคลอรี (cal)":     4.184,
      "กิโลแคลอรี (kcal)": 4184,
      "วัตต์ชั่วโมง":     3600,
      "กิโลวัตต์ชั่วโมง": 3600000,
      "อิเล็กตรอนโวลต์":  1.602e-19,
      "บีทียู (BTU)":      1055.06,
      "ฟุต-ปอนด์":        1.35582,
    }
  },
  "ความดัน": {
    icon: "💨",
    units: {
      "ปาสคาล (Pa)":        1,
      "กิโลปาสคาล (kPa)":   1000,
      "เมกะปาสคาล (MPa)":   1e6,
      "บาร์":                100000,
      "มิลลิบาร์":           100,
      "บรรยากาศ (atm)":      101325,
      "ปอนด์ต่อตารางนิ้ว (psi)": 6894.76,
      "มิลลิเมตรปรอท (mmHg)": 133.322,
      "ฝุ่น (torr)":          133.322,
      "บาร์ (bar)":           100000,
    }
  },
  "ไฟฟ้า / กำลังไฟ": {
    icon: "🔌",
    units: {
      // กำลังไฟ (วัตต์เป็นฐาน)
      "วัตต์ (W)":         1,
      "กิโลวัตต์ (kW)":    1000,
      "เมกะวัตต์ (MW)":    1e6,
      "แรงม้า (HP)":       745.7,
      "บีทียูต่อชั่วโมง":  0.293071,
    }
  },
  "หน่วยดิจิทัล (ข้อมูล)": {
    icon: "💾",
    units: {
      "บิต (bit)":         1,
      "ไบต์ (byte)":       8,
      "กิโลบิต (Kbit)":    1000,
      "กิโลไบต์ (KB)":     8000,
      "เมกะบิต (Mbit)":    1e6,
      "เมกะไบต์ (MB)":     8e6,
      "กิกะบิต (Gbit)":    1e9,
      "กิกะไบต์ (GB)":     8e9,
      "เทราบิต (Tbit)":    1e12,
      "เทราไบต์ (TB)":     8e12,
      "เพตะไบต์ (PB)":     8e15,
      "เอกซะไบต์ (EB)":    8e18,
      "กิบิไบต์ (GiB)":    8 * 1073741824,
      "เมบิไบต์ (MiB)":    8 * 1048576,
      "กิบิไบต์ (KiB)":    8 * 1024,
    }
  },
  "หน่วยดาราศาสตร์": {
    icon: "🌌",
    units: {
      "ปีแสง":              9.461e15,
      "หน่วยดาราศาสตร์ (AU)": 1.496e11,
      "พาร์เซก (pc)":       3.086e16,
      "กิโลพาร์เซก (kpc)":  3.086e19,
      "เมกะพาร์เซก (Mpc)":  3.086e22,
      "เมตร":               1,
      "กิโลเมตร":           1000,
      "รัศมีโลก":           6.371e6,
      "รัศมีดวงอาทิตย์":    6.957e8,
    }
  },
  "ความเข้มข้น / อัตราส่วน": {
    icon: "🧬",
    units: {
      "เปอร์เซ็นต์ (%)":   1,
      "ส่วนต่อพัน (‰)":    0.1,
      "ส่วนต่อล้าน (ppm)": 0.0001,
      "ส่วนต่อพันล้าน (ppb)": 1e-7,
      "เศษส่วน (0-1)":     100,
    }
  },
  "มุม": {
    icon: "📐",
    units: {
      "องศา (°)":          1,
      "เรเดียน (rad)":     180 / Math.PI,
      "กราเดียน (grad)":   0.9,
      "นาที (′)":          1/60,
      "วินาที (″)":        1/3600,
      "รอบ (ครึ่ง)":       180,
      "รอบเต็ม":           360,
    }
  },
  "ความถี่": {
    icon: "📡",
    units: {
      "เฮิรตซ์ (Hz)":       1,
      "กิโลเฮิรตซ์ (kHz)":  1000,
      "เมกะเฮิรตซ์ (MHz)":  1e6,
      "กิกะเฮิรตซ์ (GHz)":  1e9,
      "รอบต่อนาที (rpm)":   1/60,
      "รอบต่อวินาที (rps)": 1,
    }
  },
  "สกุลเงิน (อ้างอิง USD)": {
    icon: "💱",
    note: "อัตราประมาณการ ณ ปี 2025",
    units: {
      "ดอลลาร์สหรัฐ (USD)": 1,
      "บาทไทย (THB)":       35.5,
      "ยูโร (EUR)":         0.92,
      "เยนญี่ปุ่น (JPY)":   149.5,
      "ปอนด์อังกฤษ (GBP)":  0.79,
      "หยวนจีน (CNY)":      7.24,
      "วอนเกาหลี (KRW)":    1330,
      "ดอลลาร์ออสเตรเลีย (AUD)": 1.53,
      "ดอลลาร์แคนาดา (CAD)": 1.37,
      "ฟรังก์สวิส (CHF)":   0.89,
      "รูเปียห์อินโดนีเซีย (IDR)": 15700,
      "ริงกิตมาเลเซีย (MYR)": 4.72,
      "ดอลลาร์สิงคโปร์ (SGD)": 1.34,
      "เปโซฟิลิปปินส์ (PHP)": 56.2,
      "รูปีอินเดีย (INR)":  83.2,
    }
  },
};

// ============================================================
// 2. ยูทิลิตี้การแปลงอุณหภูมิ
// ============================================================
function convertTemperature(value, from, to) {
  // แปลงเป็น Celsius ก่อน
  let celsius;
  switch (from) {
    case "C":  celsius = value; break;
    case "F":  celsius = (value - 32) * 5 / 9; break;
    case "K":  celsius = value - 273.15; break;
    case "Re": celsius = value * 5 / 4; break;
    case "Ra": celsius = (value - 491.67) * 5 / 9; break;
    default:   celsius = value;
  }
  // แปลงจาก Celsius เป็นหน่วยปลายทาง
  switch (to) {
    case "C":  return celsius;
    case "F":  return celsius * 9 / 5 + 32;
    case "K":  return celsius + 273.15;
    case "Re": return celsius * 4 / 5;
    case "Ra": return (celsius + 273.15) * 9 / 5;
    default:   return celsius;
  }
}

// ============================================================
// 3. ฟังก์ชันการแปลงหลัก
// ============================================================
function convert(value, category, fromUnit, toUnit) {
  const cat = UNITS[category];
  if (!cat) return null;

  if (cat.special) {
    // อุณหภูมิ
    const fromCode = cat.units[fromUnit];
    const toCode   = cat.units[toUnit];
    return convertTemperature(value, fromCode, toCode);
  }

  const fromFactor = cat.units[fromUnit];
  const toFactor   = cat.units[toUnit];
  if (fromFactor == null || toFactor == null) return null;

  // ค่าในหน่วยฐาน แล้วหารด้วย factor ปลายทาง
  return (value * fromFactor) / toFactor;
}

// ============================================================
// 4. รูปแบบตัวเลข
// ============================================================
function formatNumber(n) {
  if (n === null || isNaN(n)) return "—";
  if (Math.abs(n) === 0) return "0";
  if (Math.abs(n) >= 1e15 || (Math.abs(n) < 1e-6 && n !== 0)) {
    return n.toExponential(6);
  }
  // ตัดทศนิยมอัจฉริยะ
  const decimals = Math.abs(n) >= 1000 ? 3 : Math.abs(n) >= 1 ? 6 : 8;
  let str = parseFloat(n.toPrecision(10)).toLocaleString("th-TH", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: 0,
  });
  return str;
}

// ============================================================
// 5. History (localStorage)
// ============================================================
const HIST_KEY = "unit_converter_history";
let history = [];

function loadHistory() {
  try { history = JSON.parse(localStorage.getItem(HIST_KEY)) || []; }
  catch { history = []; }
}
function saveHistory() {
  localStorage.setItem(HIST_KEY, JSON.stringify(history.slice(0, 10)));
}
function addHistory(entry) {
  // ป้องกันซ้ำติดกัน
  if (history.length > 0 && history[0].expr === entry.expr) return;
  history.unshift(entry);
  if (history.length > 10) history.pop();
  saveHistory();
  renderHistory();
}
function renderHistory() {
  const section = document.getElementById("historySection");
  const list    = document.getElementById("historyList");
  if (!history.length) { section.style.display = "none"; return; }
  section.style.display = "block";
  list.innerHTML = history.map((h, i) => `
    <div class="hist-item" data-idx="${i}" title="คลิกเพื่อโหลดซ้ำ">
      <span class="hist-expr">${h.expr}</span>
      <span class="hist-cat">${h.cat}</span>
      <span class="hist-time">${h.time}</span>
    </div>
  `).join("");

  // คลิกเพื่อ reload
  list.querySelectorAll(".hist-item").forEach(el => {
    el.addEventListener("click", () => {
      const h = history[+el.dataset.idx];
      document.getElementById("categorySelect").value = h.cat;
      updateUnitDropdowns(h.cat);
      document.getElementById("fromUnit").value = h.from;
      document.getElementById("toUnit").value   = h.to;
      document.getElementById("inputValue").value = h.val;
      doConvert();
    });
  });
}

// ============================================================
// 6. UI — Dropdowns
// ============================================================
function populateCategoryDropdown() {
  const sel = document.getElementById("categorySelect");
  Object.keys(UNITS).forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat; opt.textContent = `${UNITS[cat].icon} ${cat}`;
    sel.appendChild(opt);
  });
}

function updateUnitDropdowns(category) {
  const fromSel = document.getElementById("fromUnit");
  const toSel   = document.getElementById("toUnit");
  fromSel.innerHTML = ""; toSel.innerHTML = "";
  if (!category || !UNITS[category]) return;

  Object.keys(UNITS[category].units).forEach(unit => {
    const o1 = document.createElement("option"); o1.value = unit; o1.textContent = unit;
    const o2 = document.createElement("option"); o2.value = unit; o2.textContent = unit;
    fromSel.appendChild(o1); toSel.appendChild(o2);
  });

  // ตั้งค่าเริ่มต้น: from = แรก, to = ที่สอง
  if (fromSel.options.length > 1) toSel.selectedIndex = 1;
}

// ============================================================
// 7. การแปลงค่าหลัก
// ============================================================
function doConvert() {
  const valStr   = document.getElementById("inputValue").value.trim();
  const category = document.getElementById("categorySelect").value;
  const fromUnit = document.getElementById("fromUnit").value;
  const toUnit   = document.getElementById("toUnit").value;

  const resultPanel  = document.getElementById("resultPanel");
  const resultMain   = document.getElementById("resultMain");
  const resultPH     = document.querySelector(".result-placeholder");
  const resultEq     = document.getElementById("resultEq");
  const resultDetail = document.getElementById("resultDetail");

  if (!valStr || !category || !fromUnit || !toUnit) {
    resultPanel.classList.remove("has-result");
    resultMain.style.display = "none";
    resultPH.style.display = "block";
    return;
  }

  const value = parseFloat(valStr);
  if (isNaN(value)) {
    resultEq.textContent = "กรุณากรอกตัวเลขที่ถูกต้อง";
    resultPanel.classList.add("has-result");
    resultMain.style.display = "block";
    resultPH.style.display = "none";
    return;
  }

  const result = convert(value, category, fromUnit, toUnit);
  if (result === null) return;

  const formattedInput  = formatNumber(value);
  const formattedResult = formatNumber(result);

  resultPanel.classList.add("has-result");
  resultPH.style.display = "none";
  resultMain.style.display = "block";

  resultEq.innerHTML =
    `<span class="result-highlight">${formattedInput} ${fromUnit}</span>` +
    ` = ` +
    `<span class="result-highlight2">${formattedResult} ${toUnit}</span>`;

  const note = UNITS[category]?.note ? `<br><small>⚠️ ${UNITS[category].note}</small>` : "";
  resultDetail.innerHTML = `หมวดหมู่: ${UNITS[category].icon} ${category}${note}`;

  // บันทึกประวัติ
  const now = new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" });
  addHistory({
    expr: `${formattedInput} ${fromUnit} = ${formattedResult} ${toUnit}`,
    cat:  category,
    from: fromUnit, to: toUnit,
    val:  valStr,
    time: now,
  });
}

// ============================================================
// 8. Category Pills
// ============================================================
function buildCatPills() {
  const wrap = document.getElementById("catPills");
  Object.keys(UNITS).forEach(cat => {
    const pill = document.createElement("button");
    pill.className = "cat-pill";
    pill.textContent = `${UNITS[cat].icon} ${cat}`;
    pill.addEventListener("click", () => {
      document.getElementById("categorySelect").value = cat;
      updateUnitDropdowns(cat);
      document.querySelectorAll(".cat-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      document.getElementById("inputValue").focus();
    });
    wrap.appendChild(pill);
  });
}

// ============================================================
// 9. Search Suggestions
// ============================================================
function buildSearchIndex() {
  const index = [];
  Object.keys(UNITS).forEach(cat => {
    Object.keys(UNITS[cat].units).forEach(unit => {
      index.push({ cat, unit, label: `${unit} (${cat})` });
    });
  });
  return index;
}

function initSearch(index) {
  const input = document.getElementById("unitSearch");
  const box   = document.getElementById("searchSuggestions");

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    box.innerHTML = "";
    if (!q) { box.classList.remove("active"); return; }

    const matches = index.filter(i =>
      i.unit.toLowerCase().includes(q) || i.cat.toLowerCase().includes(q)
    ).slice(0, 8);

    if (!matches.length) { box.classList.remove("active"); return; }

    matches.forEach(m => {
      const div = document.createElement("div");
      div.className = "sugg-item";
      const hi = m.label.replace(new RegExp(q, "gi"), s => `<strong>${s}</strong>`);
      div.innerHTML = `${UNITS[m.cat].icon} ${hi}`;
      div.addEventListener("click", () => {
        document.getElementById("categorySelect").value = m.cat;
        updateUnitDropdowns(m.cat);
        document.getElementById("fromUnit").value = m.unit;
        input.value = "";
        box.classList.remove("active");
        document.getElementById("inputValue").focus();
      });
      box.appendChild(div);
    });
    box.classList.add("active");
  });

  document.addEventListener("click", e => {
    if (!input.contains(e.target) && !box.contains(e.target))
      box.classList.remove("active");
  });
}

// ============================================================
// 10. ธีมตามเวลา
// ============================================================
function applyTimeTheme() {
  const h = new Date().getHours();
  const bg = document.getElementById("bgLayer");
  bg.classList.remove("morning", "day", "evening", "night");
  if (h >= 5  && h < 10) bg.classList.add("morning");
  else if (h >= 10 && h < 17) bg.classList.add("day");
  else if (h >= 17 && h < 20) bg.classList.add("evening");
  else bg.classList.add("night");
}

// ============================================================
// 11. Clock
// ============================================================
function updateClock() {
  const badge = document.getElementById("timeBadge");
  const now = new Date();
  badge.textContent = now.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

// ============================================================
// 12. Floating Particles
// ============================================================
function createParticles() {
  const container = document.getElementById("particles");
  for (let i = 0; i < 22; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    const size = Math.random() * 5 + 2;
    p.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${Math.random() * 100}%;
      animation-duration: ${12 + Math.random() * 18}s;
      animation-delay: ${-Math.random() * 20}s;
      opacity: ${0.2 + Math.random() * 0.4};
    `;
    container.appendChild(p);
  }
}

// ============================================================
// 13. Init
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  document.getElementById("footerYear").textContent = new Date().getFullYear();

  // Build UI
  populateCategoryDropdown();
  buildCatPills();
  loadHistory();
  renderHistory();
  createParticles();
  applyTimeTheme();
  updateClock();

  // Search
  const searchIdx = buildSearchIndex();
  initSearch(searchIdx);

  // Clock & theme update
  setInterval(updateClock, 1000);
  setInterval(applyTimeTheme, 60000);

  // Category change
  document.getElementById("categorySelect").addEventListener("change", e => {
    updateUnitDropdowns(e.target.value);
    doConvert();
    // sync active pill
    document.querySelectorAll(".cat-pill").forEach(p => {
      p.classList.toggle("active", p.textContent.includes(e.target.value));
    });
  });

  // Real-time conversion
  document.getElementById("inputValue").addEventListener("input", doConvert);
  document.getElementById("fromUnit").addEventListener("change", doConvert);
  document.getElementById("toUnit").addEventListener("change", doConvert);

  // Convert button
  document.getElementById("convertBtn").addEventListener("click", doConvert);

  // Swap button
  document.getElementById("swapBtn").addEventListener("click", () => {
    const from = document.getElementById("fromUnit");
    const to   = document.getElementById("toUnit");
    const tmp  = from.value;
    from.value = to.value;
    to.value   = tmp;
    doConvert();
  });

  // Clear button
  document.getElementById("clearBtn").addEventListener("click", () => {
    document.getElementById("inputValue").value = "";
    const resultPanel = document.getElementById("resultPanel");
    resultPanel.classList.remove("has-result");
    document.getElementById("resultMain").style.display = "none";
    document.querySelector(".result-placeholder").style.display = "block";
  });

  // Clear history
  document.getElementById("clearHistBtn").addEventListener("click", () => {
    history = [];
    saveHistory();
    renderHistory();
  });

  // Enter key
  document.getElementById("inputValue").addEventListener("keydown", e => {
    if (e.key === "Enter") doConvert();
  });

  // Default category
  document.getElementById("categorySelect").value = "ความยาว";
  updateUnitDropdowns("ความยาว");
  document.querySelector(".cat-pill").classList.add("active");

  // --- Language Switcher ---
  initLanguage();

  // --- Mobile Nav ---
  initMobileNav();

  // --- Scroll effects ---
  initScrollEffects();

  // --- FAQ ---
  renderFAQ();

  // --- SEO Categories ---
  renderSEOCategories();

  // --- Educational Content on category change ---
  document.getElementById("categorySelect").addEventListener("change", (e) => {
    updateEduContent(e.target.value);
  });
  updateEduContent("ความยาว");

  // --- Cookie consent ---
  initCookieConsent();
});

// ============================================================
// 14. EDUCATIONAL CONTENT DATA
// ============================================================
const EDU_DATA = {
  "ความยาว": {
    formula: { th: "ค่าผลลัพธ์ = ค่าต้นทาง × (ตัวคูณต้นทาง ÷ ตัวคูณปลายทาง)\n\nตัวอย่าง: 5 กิโลเมตร เป็น เมตร\n= 5 × (1000 ÷ 1) = 5,000 เมตร\n\n1 ไมล์ = 1,609.344 เมตร\n1 ฟุต = 0.3048 เมตร\n1 นิ้ว = 2.54 เซนติเมตร", en: "Result = Source × (Source Factor ÷ Target Factor)\n\nExample: 5 km to meters\n= 5 × (1000 ÷ 1) = 5,000 m\n\n1 mile = 1,609.344 m\n1 foot = 0.3048 m\n1 inch = 2.54 cm" },
    desc: { th: "ความยาวเป็นปริมาณพื้นฐานทางฟิสิกส์ที่ใช้วัดระยะทางระหว่างสองจุด ระบบเมตริก (SI) ใช้ 'เมตร' เป็นหน่วยฐาน ซึ่งเดิมกำหนดจาก 1/10,000,000 ของระยะทางจากขั้วโลกเหนือถึงเส้นศูนย์สูตร ปัจจุบันนิยามใหม่จากความเร็วแสงในสุญญากาศ คือระยะทางที่แสงเดินทางใน 1/299,792,458 วินาที", en: "Length is a fundamental physical quantity measuring distance between two points. The SI system uses the 'meter' as its base unit, originally defined as 1/10,000,000 of the distance from the North Pole to the Equator. It is now defined by the speed of light in vacuum — the distance light travels in 1/299,792,458 of a second." },
    fact: { th: "🌟 หน่วย 'วา' ของไทยมีต้นกำเนิดจากระยะกางแขนของผู้ใหญ่ ซึ่งมีความยาวประมาณ 2 เมตร ส่วน 1 เส้น = 20 วา = 40 เมตร ใช้กันมาตั้งแต่สมัยอยุธยา\n\n🔭 ปีแสง (Light-year) ไม่ใช่หน่วยเวลา แต่เป็นหน่วยความยาว = ระยะทางที่แสงเดินทางใน 1 ปี ≈ 9.461 ล้านล้านกิโลเมตร!", en: "🌟 The Thai unit 'Wa' originates from the arm span of an adult (~2 meters). 1 Sen = 20 Wa = 40 meters, used since the Ayutthaya period.\n\n🔭 A light-year isn't a unit of time — it's the distance light travels in one year ≈ 9.461 trillion km!" },
    history: { th: "ระบบเมตริกถูกสร้างขึ้นในช่วงการปฏิวัติฝรั่งเศส ค.ศ. 1795 เพื่อแทนที่ระบบหน่วยวัดที่หลากหลายของยุโรป สำหรับประเทศไทย หน่วย 'วา' 'เส้น' 'โยชน์' มีใช้มาตั้งแต่สมัยสุโขทัย พระบาทสมเด็จพระจุลจอมเกล้าเจ้าอยู่หัว (ร.5) ทรงนำระบบเมตริกเข้ามาใช้อย่างเป็นทางการ", en: "The metric system was created during the French Revolution in 1795 to replace Europe's diverse measurement systems. Thailand adopted the metric system officially under King Chulalongkorn (Rama V), though traditional units like 'Wa' and 'Sen' have been in use since the Sukhothai period." },
    table: [["1 กม.", "1,000 ม.", "0.621 ไมล์"], ["1 ไมล์", "1,609.34 ม.", "1.609 กม."], ["1 ฟุต", "0.3048 ม.", "12 นิ้ว"], ["1 วา", "2 ม.", "6.56 ฟุต"], ["1 เส้น", "40 ม.", "0.025 ไมล์"]],
    tableHeaders: ["จาก", "เมตร", "เทียบเท่า"],
    realworld: { th: ["🏃 สนามฟุตบอลมาตรฐาน FIFA ยาว 105 เมตร (= 52.5 วา)", "✈️ ระยะทาง กรุงเทพ-เชียงใหม่ ≈ 688 กิโลเมตร (≈ 427 ไมล์)", "🌍 เส้นรอบวงโลก ≈ 40,075 กิโลเมตร", "🔬 เส้นผ่านศูนย์กลางเส้นผม ≈ 70 ไมโครเมตร"], en: ["🏃 FIFA football field = 105 meters (= 52.5 Wa)", "✈️ Bangkok to Chiang Mai ≈ 688 km (≈ 427 miles)", "🌍 Earth's circumference ≈ 40,075 km", "🔬 Human hair diameter ≈ 70 micrometers"] }
  },
  "น้ำหนัก / มวล": {
    formula: { th: "ค่าผลลัพธ์ = ค่าต้นทาง × (ตัวคูณต้นทาง ÷ ตัวคูณปลายทาง)\n\nตัวอย่าง: 150 ปอนด์ เป็น กิโลกรัม\n= 150 × 0.453592 = 68.04 กก.\n\n1 ปอนด์ = 0.4536 กิโลกรัม\n1 ออนซ์ = 28.35 กรัม", en: "Result = Source × (Source Factor ÷ Target Factor)\n\nExample: 150 lbs to kg = 150 × 0.453592 = 68.04 kg" },
    desc: { th: "มวลเป็นปริมาณที่แสดงถึงปริมาณสสารในวัตถุ ต่างจากน้ำหนักที่ขึ้นกับแรงโน้มถ่วง หน่วย SI คือ 'กิโลกรัม' ซึ่งเป็นหน่วยฐาน SI เพียงหนึ่งเดียวที่มีคำนำหน้า (กิโล-) ปัจจุบันกิโลกรัมนิยามจากค่าคงที่ของพลังค์ (h)", en: "Mass represents the amount of matter in an object. Unlike weight, mass doesn't depend on gravity. The SI unit 'kilogram' is uniquely the only base unit with a prefix (kilo-). It's now defined by the Planck constant." },
    fact: { th: "💎 'กะรัต' มาจากเมล็ดแครอบ (Carob) ที่มีน้ำหนักสม่ำเสมอ ≈ 0.2 กรัม ใช้ชั่งเพชรพลอยมาตั้งแต่สมัยโบราณ\n\n🇹🇭 'บาท' ของไทย (15 กรัม) ไม่ใช่แค่สกุลเงิน แต่เป็นหน่วยน้ำหนักทองคำโบราณ! 1 ชั่ง = 80 บาท = 1.2 กก.", en: "💎 'Carat' derives from carob seeds (~0.2g each), used since ancient times.\n\n🇹🇭 Thai 'Baht' (15g) isn't just currency — it's an ancient gold weight unit! 1 Chang = 80 Baht = 1.2 kg." },
    history: { th: "กิโลกรัมถูกกำหนดครั้งแรกในปี 1795 เท่ากับมวลของน้ำ 1 ลิตรที่ 4°C ต่อมาใช้ 'ต้นแบบกิโลกรัมนานาชาติ' (IPK) ทำจากแพลตินัม-อิริเดียม เก็บที่ BIPM ประเทศฝรั่งเศส จนปี 2019 จึงเปลี่ยนไปใช้ค่าคงที่พลังค์แทน", en: "The kilogram was first defined in 1795 as the mass of 1 liter of water at 4°C. The International Prototype Kilogram (IPK) was used until 2019, when the definition was changed to the Planck constant." },
    table: [["1 กก.", "1,000 ก.", "2.205 ปอนด์"], ["1 ปอนด์", "453.59 ก.", "16 ออนซ์"], ["1 ตัน", "1,000 กก.", "2,205 ปอนด์"], ["1 บาท(ไทย)", "15 ก.", "0.529 ออนซ์"]],
    tableHeaders: ["จาก", "กรัม", "เทียบเท่า"],
    realworld: { th: ["🐘 ช้างแอฟริกา ≈ 6,000 กก. (6 ตัน)", "🍎 แอปเปิ้ล 1 ลูก ≈ 180 กรัม", "💍 แหวนเพชร 1 กะรัต = 0.2 กรัม", "🏋️ บาร์เบลโอลิมปิก = 20 กก. (≈ 44 ปอนด์)"], en: ["🐘 African elephant ≈ 6,000 kg", "🍎 One apple ≈ 180 grams", "💍 1 carat diamond ring = 0.2 grams", "🏋️ Olympic barbell = 20 kg (≈ 44 lbs)"] }
  },
  "พื้นที่": {
    formula: { th: "พื้นที่ = ค่า × (ตัวคูณต้นทาง ÷ ตัวคูณปลายทาง)\n\n1 ไร่ = 1,600 ตร.ม. = 0.16 เฮกตาร์\n1 เอเคอร์ = 4,046.86 ตร.ม. ≈ 2.53 ไร่", en: "Area = Value × (Source Factor ÷ Target Factor)\n\n1 Rai = 1,600 sq.m. = 0.16 hectares\n1 Acre = 4,046.86 sq.m. ≈ 2.53 Rai" },
    desc: { th: "พื้นที่คือปริมาณที่แสดงขนาดของพื้นผิว 2 มิติ หน่วย SI คือ ตารางเมตร ในประเทศไทย ที่ดินมักวัดเป็น ไร่-งาน-ตารางวา โดย 1 ไร่ = 4 งาน = 400 ตารางวา = 1,600 ตารางเมตร", en: "Area measures the size of a 2D surface. The SI unit is the square meter. In Thailand, land is measured in Rai-Ngan-Square Wa, where 1 Rai = 4 Ngan = 400 sq. Wa = 1,600 sq.m." },
    fact: { th: "🏘️ ที่ดิน 1 ไร่ในกรุงเทพฯ อาจมีราคาหลายร้อยล้านบาท! ในขณะที่ต่างจังหวัดอาจเพียงไม่กี่แสนบาท", en: "🏘️ 1 Rai of land in Bangkok can cost hundreds of millions of Baht, while in rural areas it may be just a few hundred thousand!" },
    history: { th: "ระบบไร่-งาน-ตารางวา เป็นระบบวัดที่ดินเฉพาะของไทย สืบเนื่องมาจากระบบวัดความยาว 'วา' สมัยโบราณ ส่วน 'เอเคอร์' ของอังกฤษ เดิมหมายถึงพื้นที่ที่วัวคู่หนึ่งสามารถไถได้ใน 1 วัน", en: "The Rai-Ngan-Sq.Wa system is uniquely Thai, derived from the ancient 'Wa' measurement. The English 'Acre' originally meant the area a yoke of oxen could plow in one day." },
    table: [["1 ไร่", "1,600 ตร.ม.", "0.395 เอเคอร์"], ["1 เอเคอร์", "4,046.86 ตร.ม.", "2.53 ไร่"], ["1 เฮกตาร์", "10,000 ตร.ม.", "6.25 ไร่"]],
    tableHeaders: ["จาก", "ตร.ม.", "เทียบเท่า"],
    realworld: { th: ["⚽ สนามฟุตบอล ≈ 7,140 ตร.ม. (≈ 4.46 ไร่)", "🏠 บ้านจัดสรรทั่วไป ≈ 50-100 ตร.วา", "🌾 ที่นา 1 ไร่ ≈ ขนาดสระน้ำโอลิมปิก 1.3 สระ"], en: ["⚽ Football field ≈ 7,140 sq.m. (≈ 4.46 Rai)", "🏠 Typical house lot ≈ 50-100 sq.Wa", "🌾 1 Rai ≈ 1.3 Olympic swimming pools"] }
  },
  "อุณหภูมิ": {
    formula: { th: "°F = (°C × 9/5) + 32\n°C = (°F - 32) × 5/9\nK = °C + 273.15\n°Ré = °C × 4/5\n°Ra = (°C + 273.15) × 9/5", en: "°F = (°C × 9/5) + 32\n°C = (°F - 32) × 5/9\nK = °C + 273.15" },
    desc: { th: "อุณหภูมิวัดระดับพลังงานจลน์เฉลี่ยของอนุภาคในสสาร ต่างจากหน่วยอื่นๆ การแปลงอุณหภูมิใช้สูตรเฉพาะ ไม่ใช่ตัวคูณ ศูนย์สัมบูรณ์ (0 K = -273.15°C) คืออุณหภูมิต่ำที่สุดที่เป็นไปได้ทางทฤษฎี", en: "Temperature measures the average kinetic energy of particles. Unlike other units, temperature conversion uses formulas, not simple factors. Absolute zero (0 K = -273.15°C) is the theoretical lowest temperature." },
    fact: { th: "🌡️ อุณหภูมิ -40° เป็นจุดเดียวที่เซลเซียสและฟาเรนไฮต์ให้ค่าเท่ากัน! (-40°C = -40°F)\n\n☀️ พื้นผิวดวงอาทิตย์ ≈ 5,500°C แต่โคโรนา (ชั้นบรรยากาศ) ร้อนถึง 1-3 ล้าน°C!", en: "🌡️ -40° is the only point where Celsius and Fahrenheit are equal! (-40°C = -40°F)\n\n☀️ Sun's surface ≈ 5,500°C but the corona reaches 1-3 million°C!" },
    history: { th: "แอนเดอร์ส เซลเซียส (1742) เสนอสเกล 100 จุด โดยเดิม 0° = จุดเดือด, 100° = จุดเยือกแข็ง! ภายหลังถูกกลับทิศ ส่วนฟาเรนไฮต์ (1724) กำหนด 0° จากส่วนผสมน้ำแข็ง-เกลือ-แอมโมเนียมคลอไรด์", en: "Anders Celsius (1742) originally set 0° = boiling, 100° = freezing — later reversed! Fahrenheit (1724) set 0° using an ice-salt-ammonium chloride mixture." },
    table: [["0°C", "32°F", "273.15 K"], ["100°C", "212°F", "373.15 K"], ["37°C", "98.6°F", "310.15 K"], ["-40°C", "-40°F", "233.15 K"]],
    tableHeaders: ["เซลเซียส", "ฟาเรนไฮต์", "เคลวิน"],
    realworld: { th: ["🍳 น้ำเดือด = 100°C (212°F) ที่ระดับน้ำทะเล", "🤒 อุณหภูมิร่างกายปกติ = 37°C (98.6°F)", "❄️ น้ำแข็งละลาย = 0°C (32°F)", "🌡️ อุณหภูมิเฉลี่ยกรุงเทพฯ ≈ 28-35°C"], en: ["🍳 Water boils at 100°C (212°F) at sea level", "🤒 Normal body temperature = 37°C (98.6°F)", "❄️ Ice melts at 0°C (32°F)"] }
  }
  ,
  "ปริมาตร": {
    formula: { th: "ค่าผลลัพธ์ = ค่าต้นทาง × (ตัวคูณต้นทาง ÷ ตัวคูณปลายทาง)\n\nตัวอย่าง: 5 แกลลอน (US) เป็น ลิตร\n= 5 × 3.78541 = 18.927 ลิตร\n\n1 ลิตร = 1,000 มิลลิลิตร\n1 แกลลอน (US) = 3.785 ลิตร\n1 บาร์เรล = 158.987 ลิตร", en: "Result = Source × (Source Factor ÷ Target Factor)\n\nExample: 5 US gallons to liters\n= 5 × 3.78541 = 18.927 L\n\n1 liter = 1,000 mL\n1 US gallon = 3.785 L" },
    desc: { th: "ปริมาตรเป็นปริมาณที่วัดพื้นที่ว่าง 3 มิติที่วัตถุครอบครอง หน่วยฐาน SI คือ ลูกบาศก์เมตร (m³) แต่ในชีวิตประจำวันนิยมใช้ 'ลิตร' (1 ลิตร = 1 ลูกบาศก์เดซิเมตร = 0.001 m³) ระบบเมตริกออกแบบให้น้ำ 1 ลิตร ที่ 4°C มีมวลเท่ากับ 1 กิโลกรัมพอดี ซึ่งเป็นความสัมพันธ์ที่สวยงามและใช้งานได้จริง", en: "Volume measures the 3D space an object occupies. The SI base unit is the cubic meter (m³), but liters are more common in daily life. The metric system was designed so that 1 liter of water at 4°C has a mass of exactly 1 kilogram." },
    fact: { th: "🛢️ 'บาร์เรล' น้ำมัน (158.987 ลิตร) เป็นมาตรฐานอุตสาหกรรมน้ำมันทั่วโลก มีที่มาจากถังไม้โอ๊คที่ใช้ขนส่งน้ำมันในยุคบุกเบิกน้ำมันที่เพนซิลเวเนีย สหรัฐฯ\n\n🥛 1 แกลลอน US ≠ 1 แกลลอน UK! แกลลอนอเมริกัน = 3.785 ลิตร แต่แกลลอนอังกฤษ = 4.546 ลิตร ต่างกัน 20%!", en: "🛢️ An oil barrel (158.987 L) became standard from oak barrels used in Pennsylvania's oil boom.\n\n🥛 1 US gallon ≠ 1 UK gallon! US = 3.785 L but UK = 4.546 L — a 20% difference!" },
    history: { th: "คำว่า 'ลิตร' (litre) มาจากภาษาฝรั่งเศสโบราณ 'litron' ซึ่งเป็นหน่วยวัดปริมาตรของธัญพืช ระบบหน่วยอเมริกัน (US customary) มีรากฐานจากหน่วยอังกฤษแต่ถูกปรับเปลี่ยนหลังประกาศเอกราช ทำให้ 1 US gallon ≠ 1 Imperial gallon", en: "The word 'liter' comes from Old French 'litron', a grain measure. US customary units diverged from British Imperial after independence, leading to different gallon sizes." },
    table: [["1 ลิตร", "1,000 มล.", "0.264 แกลลอน US"], ["1 แกลลอน US", "3,785 มล.", "3.785 ลิตร"], ["1 บาร์เรล", "158,987 มล.", "42 แกลลอน US"], ["1 ถ้วย US", "236.6 มล.", "8 ฟลูออนซ์"], ["1 ลบ.ม.", "1,000 ลิตร", "264.2 แกลลอน"]],
    tableHeaders: ["จาก", "มิลลิลิตร", "เทียบเท่า"],
    realworld: { th: ["🚗 ถังน้ำมันรถยนต์ทั่วไป ≈ 40-60 ลิตร", "🍶 ขวดน้ำดื่ม = 600 มล. หรือ 1.5 ลิตร", "🏊 สระว่ายน้ำโอลิมปิก = 2,500,000 ลิตร", "🧴 ช้อนโต๊ะ = 15 มล., ช้อนชา = 5 มล."], en: ["🚗 Typical car fuel tank ≈ 40-60 liters", "🍶 Water bottle = 600 mL or 1.5 L", "🏊 Olympic pool = 2,500,000 liters", "🧴 Tablespoon = 15 mL, Teaspoon = 5 mL"] }
  },
  "เวลา": {
    formula: { th: "1 ชั่วโมง = 60 นาที = 3,600 วินาที\n1 วัน = 24 ชั่วโมง = 86,400 วินาที\n1 สัปดาห์ = 7 วัน = 604,800 วินาที\n1 ปี (365 วัน) = 31,536,000 วินาที\n1 ทศวรรษ = 10 ปี\n1 ศตวรรษ = 100 ปี", en: "1 hour = 60 min = 3,600 sec\n1 day = 24 h = 86,400 sec\n1 week = 7 days = 604,800 sec\n1 year (365 days) = 31,536,000 sec" },
    desc: { th: "เวลาเป็นหนึ่งในปริมาณพื้นฐาน 7 ปริมาณของระบบ SI หน่วย SI ของเวลาคือ 'วินาที' ซึ่งนิยามจากการสั่นของอะตอมซีเซียม-133 จำนวน 9,192,631,770 รอบ ระบบเวลา 60-60-24 ที่เราใช้ทุกวันมีต้นกำเนิดจากชาวบาบิโลน (เมโสโปเตเมีย) เมื่อกว่า 4,000 ปีก่อน ซึ่งใช้ระบบเลขฐาน 60", en: "Time is one of 7 SI base quantities. The SI second is defined by 9,192,631,770 oscillations of cesium-133 atoms. Our 60-60-24 time system originated from the Babylonians over 4,000 years ago, who used base-60 (sexagesimal) counting." },
    fact: { th: "⏰ นาฬิกาอะตอมรุ่นล่าสุด (optical lattice clock) มีความแม่นยำจนจะคลาดเคลื่อนเพียง 1 วินาทีในรอบ 15,000 ล้านปี — นานกว่าอายุของเอกภพ!\n\n🌍 1 วัน ไม่ได้ยาว 24 ชั่วโมงพอดี! โลกหมุนรอบตัวเองใน 23 ชั่วโมง 56 นาที 4 วินาที (วันดาราคติ)", en: "⏰ The latest optical lattice clocks would lose only 1 second in 15 billion years — longer than the universe's age!\n\n🌍 A day isn't exactly 24 hours! Earth rotates in 23h 56m 4s (sidereal day)." },
    history: { th: "ชาวบาบิโลนเลือกฐาน 60 เพราะหารลงตัวด้วยตัวเลขหลายตัว (1,2,3,4,5,6,10,12,15,20,30,60) ทำให้สะดวกในการแบ่ง ชาวอียิปต์โบราณแบ่งวันออกเป็น 12 ชั่วโมงกลางวันและ 12 ชั่วโมงกลางคืน ทำให้ 1 วัน = 24 ชั่วโมง", en: "Babylonians chose base-60 for its many divisors (1,2,3,4,5,6,10,12,15,20,30,60). Ancient Egyptians split the day into 12 daytime and 12 nighttime hours, giving us 24-hour days." },
    table: [["1 นาที", "60 วินาที", "0.0167 ชม."], ["1 ชั่วโมง", "3,600 วินาที", "60 นาที"], ["1 วัน", "86,400 วินาที", "24 ชม."], ["1 ปี", "31,536,000 วิ.", "365 วัน"], ["1 ศตวรรษ", "3.15 × 10⁹ วิ.", "100 ปี"]],
    tableHeaders: ["จาก", "วินาที", "เทียบเท่า"],
    realworld: { th: ["💓 หัวใจเต้นเฉลี่ย 1 ครั้ง ทุก 0.8 วินาที (75 ครั้ง/นาที)", "🌅 แสงอาทิตย์ใช้เวลา 8 นาที 20 วินาทีเดินทางถึงโลก", "🦕 ไดโนเสาร์สูญพันธุ์เมื่อ 66 ล้านปีก่อน", "⚡ กะพริบตาใช้เวลา 100-150 มิลลิวินาที"], en: ["💓 Heart beats once every ~0.8 seconds (75 bpm)", "🌅 Sunlight takes 8 min 20 sec to reach Earth", "🦕 Dinosaurs went extinct 66 million years ago", "⚡ An eye blink takes 100-150 milliseconds"] }
  },
  "ความเร็ว": {
    formula: { th: "กม./ชม. → ม./วินาที: หาร 3.6\nม./วินาที → กม./ชม.: คูณ 3.6\n\nไมล์/ชม. → กม./ชม.: คูณ 1.60934\nนอต → กม./ชม.: คูณ 1.852\nมาค 1 = 340.29 ม./วินาที (ที่ระดับน้ำทะเล)\nความเร็วแสง = 299,792,458 ม./วินาที", en: "km/h → m/s: divide by 3.6\nm/s → km/h: multiply by 3.6\n\nmph → km/h: × 1.60934\n1 knot = 1.852 km/h\nMach 1 = 340.29 m/s\nSpeed of light = 299,792,458 m/s" },
    desc: { th: "ความเร็วคืออัตราการเปลี่ยนแปลงตำแหน่งต่อหนึ่งหน่วยเวลา หน่วย SI คือ เมตรต่อวินาที (m/s) แต่ในชีวิตประจำวันนิยมใช้ กิโลเมตรต่อชั่วโมง (km/h) สำหรับการเดินเรือและการบิน ใช้หน่วย 'นอต' (knots) ซึ่ง 1 นอต = 1 ไมล์ทะเลต่อชั่วโมง = 1.852 กม./ชม.", en: "Speed is the rate of position change per unit time. SI unit is meters per second (m/s). Daily life uses km/h. Maritime and aviation use 'knots' (1 knot = 1 nautical mile/h = 1.852 km/h)." },
    fact: { th: "🚀 ความเร็วแสง (299,792,458 m/s) เป็นความเร็วสูงสุดในจักรวาลตามทฤษฎีสัมพัทธภาพของไอน์สไตน์ ไม่มีวัตถุใดที่มีมวลสามารถเดินทางได้เร็วเท่าหรือเร็วกว่าแสง\n\n✈️ เครื่องบินโดยสาร Concorde บินเร็วมาค 2.04 (2,180 กม./ชม.) แต่ปลดระวางไปแล้วใน 2003", en: "🚀 The speed of light (299,792,458 m/s) is the universe's speed limit per Einstein's relativity.\n\n✈️ Concorde flew at Mach 2.04 (2,180 km/h), retired in 2003." },
    history: { th: "หน่วย 'นอต' มาจากวิธีวัดความเร็วเรือโบราณ โดยใช้เชือกที่ผูกปมเป็นระยะๆ (knots) หย่อนลงน้ำแล้วนับจำนวนปมที่ผ่านไปในเวลาที่กำหนด ส่วน 'มาค' (Mach number) ตั้งชื่อตาม Ernst Mach นักฟิสิกส์ชาวออสเตรีย", en: "The 'knot' comes from ancient sailors who measured speed using a rope with knots dropped overboard. 'Mach' is named after Austrian physicist Ernst Mach." },
    table: [["100 กม./ชม.", "27.78 ม./วิ.", "62.14 ไมล์/ชม."], ["1 นอต", "0.514 ม./วิ.", "1.852 กม./ชม."], ["มาค 1", "340.29 ม./วิ.", "1,225 กม./ชม."], ["แสง", "299,792,458 ม./วิ.", "1.08 พันล้าน กม./ชม."]],
    tableHeaders: ["จาก", "ม./วินาที", "เทียบเท่า"],
    realworld: { th: ["🚶 เดินปกติ ≈ 5 กม./ชม.", "🚗 ขับรถบนทางด่วน ≈ 120 กม./ชม.", "🔊 ความเร็วเสียง ≈ 1,225 กม./ชม. (มาค 1)", "💨 พายุทอร์นาโดแรงสุด ≈ 480 กม./ชม."], en: ["🚶 Walking pace ≈ 5 km/h", "🚗 Highway driving ≈ 120 km/h", "🔊 Speed of sound ≈ 1,225 km/h (Mach 1)", "💨 Strongest tornado ≈ 480 km/h"] }
  },
  "พลังงาน": {
    formula: { th: "1 กิโลแคลอรี (kcal) = 4,184 จูล = 4.184 กิโลจูล\n1 กิโลวัตต์ชั่วโมง (kWh) = 3,600,000 จูล\n1 BTU = 1,055.06 จูล\n1 อิเล็กตรอนโวลต์ (eV) = 1.602 × 10⁻¹⁹ จูล", en: "1 kcal = 4,184 J = 4.184 kJ\n1 kWh = 3,600,000 J\n1 BTU = 1,055.06 J\n1 eV = 1.602 × 10⁻¹⁹ J" },
    desc: { th: "พลังงานคือความสามารถในการทำงาน หน่วย SI คือ 'จูล' (J) ตั้งชื่อตาม James Prescott Joule ในชีวิตประจำวัน เราใช้หลายหน่วย: แคลอรี (อาหาร), กิโลวัตต์ชั่วโมง (ค่าไฟ), BTU (เครื่องปรับอากาศ) สิ่งสำคัญ: 'แคลอรี' ในฉลากอาหาร จริงๆ แล้วคือ 'กิโลแคลอรี' (kcal)", en: "Energy is the ability to do work. SI unit is the 'joule' (J), named after James Prescott Joule. Daily life uses kilocalories (food), kWh (electricity bills), and BTU (air conditioners). Note: food 'Calories' are actually kilocalories (kcal)." },
    fact: { th: "🍎 แอปเปิ้ล 1 ลูก ≈ 95 kcal ให้พลังงานเพียงพอจุดหลอดไฟ LED 10 วัตต์ได้นาน 11 ชั่วโมง!\n\n⚡ ฟ้าผ่า 1 ครั้ง ปลดปล่อยพลังงาน ≈ 1-5 พันล้านจูล (≈ 250-1,400 kWh) แต่เกิดในเวลาเพียงไม่กี่ไมโครวินาที", en: "🍎 One apple ≈ 95 kcal — enough to power a 10W LED bulb for 11 hours!\n\n⚡ A single lightning bolt releases ≈ 1-5 billion joules but lasts only microseconds." },
    history: { th: "James Prescott Joule (1818-1889) พิสูจน์ว่าความร้อนเป็นรูปแบบหนึ่งของพลังงาน ก่อนหน้านี้ นักวิทยาศาสตร์เชื่อว่าความร้อนเป็นสาร (caloric) ที่ไหลจากวัตถุร้อนไปเย็น หน่วย 'แคลอรี' ยังคงใช้ในโภชนาการเพราะเป็นที่คุ้นเคย", en: "Joule (1818-1889) proved heat is a form of energy. Before him, scientists believed heat was a substance (caloric). The 'calorie' persists in nutrition due to familiarity." },
    table: [["1 kcal", "4,184 จูล", "3.968 BTU"], ["1 kWh", "3,600,000 จูล", "860 kcal"], ["1 BTU", "1,055 จูล", "0.252 kcal"], ["1 MJ", "1,000,000 จูล", "239 kcal"]],
    tableHeaders: ["จาก", "จูล", "เทียบเท่า"],
    realworld: { th: ["🍔 แฮมเบอร์เกอร์ 1 ชิ้น ≈ 500 kcal", "💡 ค่าไฟเฉลี่ย 1 หน่วย (kWh) ≈ 4 บาท", "🏃 วิ่ง 30 นาที เผาผลาญ ≈ 300-400 kcal", "🔋 แบตเตอรี่ iPhone 15 ≈ 12.7 Wh"], en: ["🍔 One hamburger ≈ 500 kcal", "💡 1 kWh of electricity ≈ $0.12 (US avg)", "🏃 30-min run burns ≈ 300-400 kcal", "🔋 iPhone 15 battery ≈ 12.7 Wh"] }
  },
  "ความดัน": {
    formula: { th: "1 บรรยากาศ (atm) = 101,325 Pa = 101.325 kPa\n1 bar = 100,000 Pa ≈ 0.987 atm\n1 psi = 6,894.76 Pa\n1 mmHg = 133.322 Pa\n1 atm = 760 mmHg = 14.696 psi", en: "1 atm = 101,325 Pa = 101.325 kPa\n1 bar = 100,000 Pa ≈ 0.987 atm\n1 psi = 6,894.76 Pa\n1 atm = 760 mmHg = 14.696 psi" },
    desc: { th: "ความดันคือแรงที่กระทำต่อหนึ่งหน่วยพื้นที่ หน่วย SI คือ ปาสคาล (Pa) ตั้งชื่อตาม Blaise Pascal ความดันบรรยากาศมาตรฐาน 1 atm = 101,325 Pa ในชีวิตประจำวัน เราพบหน่วยความดันหลายแบบ: psi (ยางรถ), mmHg (ความดันโลหิต), bar (อุตสาหกรรม), hPa (อุตุนิยมวิทยา)", en: "Pressure is force per unit area. SI unit is the pascal (Pa), named after Blaise Pascal. Standard atmospheric pressure is 1 atm = 101,325 Pa. Different fields use different units: psi (tires), mmHg (blood pressure), bar (industry), hPa (meteorology)." },
    fact: { th: "🩺 ความดันโลหิตปกติ ≈ 120/80 mmHg หมายถึง ขณะหัวใจบีบตัว (systolic) ดันปรอทขึ้น 120 มม. และขณะคลายตัว (diastolic) 80 มม.\n\n🌊 ทุกๆ ความลึก 10 เมตรใต้น้ำ ความดันเพิ่มขึ้น 1 บรรยากาศ (atm)", en: "🩺 Normal blood pressure ≈ 120/80 mmHg means 120mm mercury when heart contracts, 80mm when relaxing.\n\n🌊 Every 10 meters underwater adds 1 atmosphere of pressure." },
    history: { th: "Evangelista Torricelli ประดิษฐ์บารอมิเตอร์แบบปรอทตัวแรกในปี 1643 โดยพบว่าบรรยากาศดันปรอทขึ้นได้สูง 760 มม. ทำให้ 1 atm = 760 mmHg หน่วย 'ทอร์' (Torr) ตั้งชื่อเพื่อเป็นเกียรติแก่เขา", en: "Torricelli invented the first mercury barometer in 1643, finding that atmospheric pressure supports mercury to 760 mm. The 'Torr' unit is named in his honor." },
    table: [["1 atm", "101,325 Pa", "14.696 psi"], ["1 bar", "100,000 Pa", "14.504 psi"], ["1 psi", "6,894.76 Pa", "68.95 mbar"], ["120 mmHg", "15,999 Pa", "2.32 psi"]],
    tableHeaders: ["จาก", "ปาสคาล", "เทียบเท่า"],
    realworld: { th: ["🚗 ลมยางรถ ≈ 32-35 psi (2.2-2.4 bar)", "🩺 ความดันโลหิตปกติ ≈ 120/80 mmHg", "✈️ ความดันภายในเครื่องบิน ≈ 0.75 atm (ระดับ 8,000 ฟุต)", "🤿 ดำน้ำ 30 เมตร = 4 atm"], en: ["🚗 Car tire pressure ≈ 32-35 psi", "🩺 Normal blood pressure ≈ 120/80 mmHg", "✈️ Airplane cabin pressure ≈ 0.75 atm", "🤿 30m dive = 4 atm"] }
  },
  "ไฟฟ้า / กำลังไฟ": {
    formula: { th: "กำลังไฟ (วัตต์) = แรงดัน (โวลต์) × กระแส (แอมแปร์)\nP = V × I\n\n1 กิโลวัตต์ (kW) = 1,000 วัตต์\n1 แรงม้า (HP) = 745.7 วัตต์\n1 HP ≈ 0.7457 kW", en: "Power (watts) = Voltage × Current\nP = V × I\n\n1 kW = 1,000 W\n1 HP = 745.7 W" },
    desc: { th: "กำลังไฟฟ้า (Power) คืออัตราการทำงานหรือการใช้พลังงานต่อหนึ่งหน่วยเวลา หน่วย SI คือ วัตต์ (W) ตั้งชื่อตาม James Watt ผู้ปรับปรุงเครื่องจักรไอน้ำ กำลังไฟ 1 วัตต์ หมายถึง การใช้พลังงาน 1 จูลต่อวินาที (1 W = 1 J/s) หน่วย 'แรงม้า' (HP) ถูกสร้างโดย James Watt เพื่อเปรียบเทียบเครื่องจักรไอน้ำกับม้าจริงในเหมืองถ่านหิน", en: "Electrical power is the rate of energy use per unit time. SI unit is the watt (W), named after James Watt. 1 W = 1 J/s. The 'horsepower' (HP) was created by Watt to compare his steam engines to real horses in coal mines." },
    fact: { th: "🐴 James Watt คำนวณว่าม้า 1 ตัวทำงานได้ ≈ 33,000 foot-pounds/นาที แล้วตั้งเป็น 1 แรงม้า จริงๆ แล้วม้าทำได้สูงสุด ≈ 14.9 HP ในช่วงสั้นๆ!\n\n🧠 สมองมนุษย์ใช้พลังงานเพียง ≈ 20 วัตต์ (เท่าหลอดไฟ LED สว่างๆ) แต่ทำงานซับซ้อนกว่าซูเปอร์คอมพิวเตอร์!", en: "🐴 Watt calculated 1 HP ≈ 33,000 ft·lb/min. A real horse can actually produce up to 14.9 HP in short bursts!\n\n🧠 Human brain uses only ~20 W but outperforms supercomputers!" },
    history: { th: "James Watt (1736-1819) ไม่ได้ประดิษฐ์เครื่องจักรไอน้ำ แต่ปรับปรุงให้มีประสิทธิภาพมากขึ้น เขาสร้างหน่วย 'แรงม้า' เพื่อการตลาด — ช่วยให้เจ้าของเหมืองเข้าใจว่าเครื่องของเขาทดแทนม้าได้กี่ตัว", en: "James Watt (1736-1819) didn't invent the steam engine but improved it dramatically. He created 'horsepower' as a marketing tool to help mine owners understand how many horses his engine could replace." },
    table: [["1 kW", "1,000 W", "1.341 HP"], ["1 HP", "745.7 W", "0.746 kW"], ["1 MW", "1,000,000 W", "1,341 HP"]],
    tableHeaders: ["จาก", "วัตต์", "เทียบเท่า"],
    realworld: { th: ["💡 หลอด LED = 7-15 W (แทนหลอดไส้ 60-100 W)", "🏠 เครื่องปรับอากาศ 12,000 BTU ≈ 1,000-1,500 W", "🚗 รถยนต์ทั่วไป ≈ 100-200 HP (75-150 kW)", "⚡ โรงไฟฟ้านิวเคลียร์ ≈ 1,000 MW"], en: ["💡 LED bulb = 7-15 W (replaces 60-100 W incandescent)", "🏠 12,000 BTU AC ≈ 1,000-1,500 W", "🚗 Average car ≈ 100-200 HP", "⚡ Nuclear power plant ≈ 1,000 MW"] }
  },
  "หน่วยดิจิทัล (ข้อมูล)": {
    formula: { th: "1 byte = 8 bits\n1 KB = 1,000 bytes (SI) หรือ 1 KiB = 1,024 bytes (IEC)\n1 MB = 1,000,000 bytes = 1,000 KB\n1 GB = 1,000,000,000 bytes = 1,000 MB\n1 TB = 1,000,000,000,000 bytes = 1,000 GB", en: "1 byte = 8 bits\n1 KB = 1,000 bytes (SI) or 1 KiB = 1,024 bytes (IEC)\n1 MB = 1,000,000 bytes\n1 GB = 1,000,000,000 bytes\n1 TB = 1,000 GB" },
    desc: { th: "ข้อมูลดิจิทัลวัดเป็น 'บิต' (bit = binary digit) ซึ่งเป็นหน่วยเล็กที่สุด มีค่าได้เพียง 0 หรือ 1 กลุ่มของ 8 บิต = 1 ไบต์ (byte) ซึ่งเก็บตัวอักษร ASCII 1 ตัวได้ ความสับสนที่พบบ่อยคือ KB vs KiB: มาตรฐาน SI ใช้ 1 KB = 1,000 bytes แต่คอมพิวเตอร์จัดเก็บแบบเลขฐาน 2 ทำให้ 1 KiB = 1,024 bytes", en: "Digital data is measured in 'bits' (binary digits): 0 or 1. 8 bits = 1 byte (stores 1 ASCII character). Common confusion: KB vs KiB — SI uses 1 KB = 1,000 bytes, but computers use binary so 1 KiB = 1,024 bytes." },
    fact: { th: "💾 ฟล็อปปี้ดิสก์ 3.5\" เก็บได้ 1.44 MB — ปัจจุบัน ภาพถ่ายจากมือถือ 1 รูปมีขนาด 3-8 MB!\n\n🌐 ข้อมูลที่สร้างขึ้นทั่วโลกต่อวัน ≈ 2.5 เอกซะไบต์ (EB) = 2.5 ล้านเทราไบต์!", en: "💾 A 3.5\" floppy disk held 1.44 MB — now a single phone photo is 3-8 MB!\n\n🌐 Global data created daily ≈ 2.5 exabytes = 2.5 million terabytes!" },
    history: { th: "Claude Shannon บิดาแห่งทฤษฎีสารสนเทศ เสนอแนวคิด 'bit' ในปี 1948 คำว่า 'byte' ถูกใช้ครั้งแรกที่ IBM ในปี 1956 เดิมไม่ได้กำหนดว่า 1 byte = 8 bits เสมอไป มีคอมพิวเตอร์บางรุ่นที่ใช้ 6 หรือ 7 bits ต่อ byte", en: "Claude Shannon proposed the 'bit' in 1948. 'Byte' was first used at IBM in 1956. Early computers used 6 or 7 bits per byte before 8-bit became standard." },
    table: [["1 KB", "8,000 bits", "1,000 bytes"], ["1 MB", "8 Mbit", "1,000 KB"], ["1 GB", "8 Gbit", "1,000 MB"], ["1 TB", "8 Tbit", "1,000 GB"], ["1 GiB", "8.59 Gbit", "1,024 MiB"]],
    tableHeaders: ["จาก", "บิต", "เทียบเท่า"],
    realworld: { th: ["📱 iPhone 15 Pro = 128 GB - 1 TB", "📧 อีเมลข้อความล้วน ≈ 5-10 KB", "🎬 ภาพยนตร์ 4K 2 ชม. ≈ 15-30 GB", "📶 5G ดาวน์โหลดสูงสุด ≈ 10 Gbit/s"], en: ["📱 iPhone 15 Pro = 128 GB - 1 TB", "📧 Plain text email ≈ 5-10 KB", "🎬 4K movie (2 hrs) ≈ 15-30 GB", "📶 5G max download ≈ 10 Gbit/s"] }
  },
  "หน่วยดาราศาสตร์": {
    formula: { th: "1 ปีแสง = 9.461 × 10¹⁵ เมตร ≈ 9.461 ล้านล้าน กม.\n1 AU (หน่วยดาราศาสตร์) = 1.496 × 10¹¹ เมตร ≈ 149.6 ล้าน กม.\n1 พาร์เซก (pc) = 3.086 × 10¹⁶ เมตร ≈ 3.26 ปีแสง\n1 รัศมีโลก = 6,371 กม.\n1 รัศมีดวงอาทิตย์ = 695,700 กม.", en: "1 light-year = 9.461 × 10¹⁵ m ≈ 9.461 trillion km\n1 AU = 1.496 × 10¹¹ m ≈ 149.6 M km\n1 parsec = 3.086 × 10¹⁶ m ≈ 3.26 ly\n1 Earth radius = 6,371 km" },
    desc: { th: "ระยะทางในจักรวาลมหาศาลเกินกว่าจะใช้หน่วยเมตรหรือกิโลเมตร จึงใช้หน่วยเฉพาะ เช่น ปีแสง (ระยะที่แสงเดินทางใน 1 ปี) พาร์เซก (parallax-second จากการวัดแพรัลแลกซ์ของดวงดาว) และ AU (ระยะทางเฉลี่ยจากโลกถึงดวงอาทิตย์) หน่วยเหล่านี้ช่วยให้ตัวเลขจัดการได้ง่ายขึ้น", en: "Cosmic distances are too vast for meters or kilometers. Special units include light-years (distance light travels in 1 year), parsecs (from stellar parallax measurements), and AU (average Earth-Sun distance)." },
    fact: { th: "🌌 กาแล็กซีทางช้างเผือกมีเส้นผ่านศูนย์กลาง ≈ 100,000 ปีแสง ประกอบด้วยดาวฤกษ์ 100-400 พันล้านดวง!\n\n🔭 เอกภพที่สังเกตได้ (Observable Universe) มีรัศมี ≈ 46,500 ล้านปีแสง", en: "🌌 The Milky Way is ~100,000 light-years across with 100-400 billion stars!\n\n🔭 The observable universe has a radius of ~46.5 billion light-years." },
    history: { th: "หน่วย 'ปีแสง' ถูกใช้ครั้งแรกในปี 1838 โดย Friedrich Bessel เพื่ออธิบายระยะทางไปยังดาว 61 Cygni ส่วน 'พาร์เซก' ถูกเสนอในปี 1913 นักดาราศาสตร์ส่วนใหญ่ชอบใช้พาร์เซกมากกว่าปีแสง เพราะคำนวณง่ายกว่า", en: "Friedrich Bessel first used 'light-year' in 1838 to describe the distance to 61 Cygni. 'Parsec' was proposed in 1913. Astronomers generally prefer parsecs for easier calculations." },
    table: [["1 ปีแสง", "63,241 AU", "0.307 pc"], ["1 AU", "149.6 ล้าน กม.", "8.32 นาทีแสง"], ["1 pc", "3.26 ปีแสง", "206,265 AU"], ["1 รัศมีดวงอาทิตย์", "695,700 กม.", "0.00465 AU"]],
    tableHeaders: ["จาก", "เทียบค่าหลัก", "เทียบค่ารอง"],
    realworld: { th: ["🌙 โลก-ดวงจันทร์ = 384,400 กม. (1.28 วินาทีแสง)", "☀️ โลก-ดวงอาทิตย์ = 1 AU (8.32 นาทีแสง)", "⭐ ดาวฤกษ์ที่ใกล้ที่สุด (Proxima Centauri) = 4.24 ปีแสง", "🌌 กาแล็กซี Andromeda = 2.537 ล้านปีแสง"], en: ["🌙 Earth to Moon = 384,400 km (1.28 light-seconds)", "☀️ Earth to Sun = 1 AU (8.32 light-minutes)", "⭐ Nearest star (Proxima Centauri) = 4.24 light-years", "🌌 Andromeda galaxy = 2.537 million light-years"] }
  },
  "ความเข้มข้น / อัตราส่วน": {
    formula: { th: "1% = 10 ‰ (ส่วนต่อพัน) = 10,000 ppm = 10,000,000 ppb\n\nเปอร์เซ็นต์ → ppm: คูณ 10,000\nppm → เปอร์เซ็นต์: หาร 10,000\nเศษส่วน (0-1) → %: คูณ 100", en: "1% = 10 ‰ = 10,000 ppm = 10,000,000 ppb\n\n% → ppm: multiply by 10,000\nppm → %: divide by 10,000\nFraction (0-1) → %: multiply by 100" },
    desc: { th: "ความเข้มข้นแสดงสัดส่วนของสารหนึ่งในสารผสม เปอร์เซ็นต์ (%) หมายถึง 'ต่อร้อย' ส่วน ppm (parts per million) หมายถึง 'ต่อล้าน' ใช้วัดปริมาณที่น้อยมาก เช่น สารปนเปื้อนในน้ำ มลพิษในอากาศ หรือสารเจือปนในอาหาร ppb (parts per billion) ใช้วัดปริมาณที่น้อยยิ่งกว่า", en: "Concentration shows the proportion of one substance in a mixture. Percent (%) means 'per hundred', ppm means 'per million' (used for trace amounts like pollutants), and ppb means 'per billion'." },
    fact: { th: "🍷 แอลกอฮอล์ในเบียร์ ≈ 5% = 50,000 ppm\n\n🏭 CO₂ ในชั้นบรรยากาศ ≈ 420 ppm (0.042%) แม้จะน้อยมากแต่มีผลมหาศาลต่อภาวะเรือนกระจก!", en: "🍷 Beer alcohol ≈ 5% = 50,000 ppm\n\n🏭 CO₂ in atmosphere ≈ 420 ppm (0.042%) — tiny but hugely impacts greenhouse effect!" },
    history: { th: "แนวคิดเปอร์เซ็นต์มาจากภาษาละติน 'per centum' (ต่อร้อย) เครื่องหมาย % วิวัฒนาการมาจากตัวย่อ 'p cento' ในศตวรรษที่ 15 ส่วน ppm เริ่มใช้กันอย่างแพร่หลายในศตวรรษที่ 20 เมื่อเทคโนโลยีการวัดพัฒนาจนตรวจจับสารปริมาณน้อยมากได้", en: "Percent comes from Latin 'per centum'. The % symbol evolved from the abbreviation 'p cento' in the 15th century. PPM became widespread in the 20th century as measurement technology advanced." },
    table: [["1%", "10 ‰", "10,000 ppm"], ["1 ‰", "0.1%", "1,000 ppm"], ["1 ppm", "0.0001%", "1,000 ppb"], ["100%", "1,000 ‰", "1 (เศษส่วน)"]],
    tableHeaders: ["จาก", "เทียบค่า 1", "เทียบค่า 2"],
    realworld: { th: ["🍺 แอลกอฮอล์ในเบียร์ ≈ 5%", "💧 คลอรีนในน้ำประปา ≈ 0.5-2 ppm", "🏭 CO₂ ในอากาศ ≈ 420 ppm", "🏅 ทองคำ 99.99% = ทอง 4 เก้า"], en: ["🍺 Beer alcohol ≈ 5%", "💧 Chlorine in tap water ≈ 0.5-2 ppm", "🏭 CO₂ in air ≈ 420 ppm", "🏅 99.99% gold = 4 nines fine"] }
  },
  "มุม": {
    formula: { th: "1 รอบเต็ม = 360° = 2π เรเดียน = 400 กราเดียน\n1° = π/180 เรเดียน ≈ 0.01745 rad\n1 เรเดียน = 180°/π ≈ 57.296°\n1° = 60′ (ลิปดา) = 3,600″ (พิลิปดา)", en: "1 full rotation = 360° = 2π radians = 400 gradians\n1° = π/180 rad ≈ 0.01745 rad\n1 radian = 180°/π ≈ 57.296°\n1° = 60′ = 3,600″" },
    desc: { th: "มุมวัดการหมุนหรือทิศทางระหว่างเส้นสองเส้น ในวิชาคณิตศาสตร์และฟิสิกส์มักใช้ 'เรเดียน' (rad) ส่วนในชีวิตประจำวันใช้ 'องศา' (°) ระบบ 360 องศามาจากชาวบาบิโลน ที่เลือก 360 เพราะใกล้เคียงจำนวนวันใน 1 ปี และหารลงตัวด้วยตัวเลขหลายตัว", en: "Angles measure rotation between two lines. Mathematics uses radians (rad), daily life uses degrees (°). The 360° system comes from the Babylonians, who chose 360 because it's close to days in a year and has many divisors." },
    fact: { th: "📐 วงกลมมี 360° เพราะชาวบาบิโลนนับ 1 ปี ≈ 360 วัน และเลข 360 หารลงตัวด้วย 1,2,3,4,5,6,8,9,10,12,15,18,20 — สะดวกมาก!\n\n🧮 เรเดียนจริงๆ ไม่มีหน่วย — มันคืออัตราส่วนของความยาวส่วนโค้งต่อรัศมี", en: "📐 A circle has 360° because Babylonians counted ~360 days/year, and 360 has many divisors!\n\n🧮 A radian is actually dimensionless — it's the ratio of arc length to radius." },
    history: { th: "ชาวบาบิโลนใช้ระบบ 360 องศามาตั้งแต่ ≈ 2,000 ก่อนคริสต์ศักราช หน่วยเรเดียนเกิดขึ้นในศตวรรษที่ 18 จากงานของ Roger Cotes ส่วนกราเดียน (grad) ถูกเสนอในช่วงการปฏิวัติฝรั่งเศสเป็นส่วนหนึ่งของระบบเมตริก (1 มุมฉาก = 100 grad)", en: "Babylonians used 360° since ~2,000 BC. Radians emerged in the 18th century from Roger Cotes' work. Gradians were proposed during the French Revolution as part of the metric system." },
    table: [["90°", "π/2 rad", "100 grad"], ["180°", "π rad", "200 grad"], ["360°", "2π rad", "400 grad"], ["1 rad", "57.296°", "63.662 grad"]],
    tableHeaders: ["องศา", "เรเดียน", "กราเดียน"],
    realworld: { th: ["📐 มุมฉาก = 90° = π/2 rad", "🧭 เข็มทิศ: เหนือ=0°, ตะวันออก=90°, ใต้=180°, ตะวันตก=270°", "🔄 รถยนต์เลี้ยว U-turn = 180°", "🎯 มุมตก 45° = ระยะไกลสุดในฟิสิกส์ (ไม่คิดลม)"], en: ["📐 Right angle = 90° = π/2 rad", "🧭 Compass: N=0°, E=90°, S=180°, W=270°", "🔄 U-turn = 180°", "🎯 45° launch angle = maximum range in physics"] }
  },
  "ความถี่": {
    formula: { th: "1 kHz = 1,000 Hz\n1 MHz = 1,000,000 Hz\n1 GHz = 1,000,000,000 Hz\n\nคาบ (T) = 1 / ความถี่ (f)\nf = 1/T\n\n1 rpm = 1/60 Hz (รอบต่อนาที → เฮิรตซ์)", en: "1 kHz = 1,000 Hz\n1 MHz = 1,000,000 Hz\n1 GHz = 1,000,000,000 Hz\n\nPeriod (T) = 1/frequency (f)\n1 rpm = 1/60 Hz" },
    desc: { th: "ความถี่คือจำนวนรอบ (cycles) ที่เกิดขึ้นใน 1 วินาที หน่วย SI คือ เฮิรตซ์ (Hz) ตั้งชื่อตาม Heinrich Hertz ผู้พิสูจน์การมีอยู่ของคลื่นแม่เหล็กไฟฟ้า ความถี่เกี่ยวข้องกับหลายสิ่ง: เสียง (Hz-kHz), วิทยุ (kHz-GHz), CPU (GHz), แสง (THz-PHz)", en: "Frequency is the number of cycles per second. SI unit is hertz (Hz), named after Heinrich Hertz who proved electromagnetic waves exist. Frequencies relate to sound (Hz-kHz), radio (kHz-GHz), CPUs (GHz), and light (THz-PHz)." },
    fact: { th: "🎵 โน้ต A4 (ลา กลาง) = 440 Hz — มาตรฐานการจูนเครื่องดนตรีทั่วโลก!\n\n📱 CPU ของ iPhone 15 Pro ทำงานที่ 3.78 GHz = 3,780,000,000 รอบต่อวินาที!", en: "🎵 Concert pitch A4 = 440 Hz — the global tuning standard!\n\n📱 iPhone 15 Pro CPU runs at 3.78 GHz = 3.78 billion cycles per second!" },
    history: { th: "Heinrich Hertz (1857-1894) เป็นคนแรกที่พิสูจน์ทฤษฎีคลื่นแม่เหล็กไฟฟ้าของ Maxwell ในปี 1887 เขาเสียชีวิตเมื่ออายุเพียง 36 ปี โดยไม่เห็นว่างานของเขานำไปสู่วิทยุ โทรทัศน์ และเทคโนโลยีไร้สายทั้งหมด", en: "Heinrich Hertz (1857-1894) first proved Maxwell's electromagnetic wave theory in 1887. He died at 36, never seeing how his work led to radio, TV, and all wireless technology." },
    table: [["440 Hz", "0.44 kHz", "โน้ต A4"], ["2.4 GHz", "2,400 MHz", "Wi-Fi"], ["5 GHz", "5,000 MHz", "Wi-Fi 5G"], ["1 rpm", "0.0167 Hz", "1 รอบ/นาที"]],
    tableHeaders: ["ค่า", "เทียบเท่า", "ตัวอย่าง"],
    realworld: { th: ["🎶 เสียงมนุษย์ได้ยิน = 20 Hz - 20 kHz", "📻 FM วิทยุ = 88-108 MHz", "📶 WiFi 2.4 GHz / 5 GHz / 6 GHz", "🖥️ จอ 144 Hz = รีเฟรชหน้าจอ 144 ครั้ง/วินาที"], en: ["🎶 Human hearing = 20 Hz - 20 kHz", "📻 FM radio = 88-108 MHz", "📶 WiFi 2.4/5/6 GHz", "🖥️ 144 Hz monitor = 144 refreshes/sec"] }
  },
  "สกุลเงิน (อ้างอิง USD)": {
    formula: { th: "อัตราแลกเปลี่ยน (ประมาณการ ปี 2025):\n1 USD ≈ 35.5 THB\n1 USD ≈ 0.92 EUR\n1 USD ≈ 149.5 JPY\n1 USD ≈ 0.79 GBP\n\n⚠️ อัตราจริงเปลี่ยนแปลงทุกวัน", en: "Exchange rates (estimated 2025):\n1 USD ≈ 35.5 THB\n1 USD ≈ 0.92 EUR\n1 USD ≈ 149.5 JPY\n\n⚠️ Real rates change daily." },
    desc: { th: "สกุลเงินเป็นสื่อกลางในการแลกเปลี่ยนสินค้าและบริการ อัตราแลกเปลี่ยนระหว่างสกุลเงินเปลี่ยนแปลงตลอดเวลาตามอุปสงค์อุปทานและปัจจัยทางเศรษฐกิจ ค่าที่แสดงในเครื่องมือนี้เป็นค่าประมาณเพื่อใช้อ้างอิงเท่านั้น ⚠️ สำหรับธุรกรรมจริง ควรตรวจสอบอัตราแลกเปลี่ยนปัจจุบันจากธนาคารหรือแหล่งข้อมูลที่เชื่อถือได้", en: "Currency is a medium of exchange for goods and services. Exchange rates fluctuate constantly based on supply, demand, and economic factors. Values shown are estimates only. ⚠️ For real transactions, check current rates from banks." },
    fact: { th: "💰 'บาท' เป็นสกุลเงินที่เก่าแก่ที่สุดที่ยังใช้อยู่สกุลหนึ่ง ใช้มาตั้งแต่สมัยสุโขทัย! เดิมเป็นก้อนเงินรูปกระสุนปืน\n\n🌍 67% ของธุรกรรมระหว่างประเทศใช้ดอลลาร์สหรัฐ แม้สหรัฐฯ มี GDP เพียง 25% ของโลก", en: "💰 The Thai baht is one of the oldest currencies still in use, dating back to the Sukhothai period!\n\n🌍 67% of international transactions use US dollars, though the US has only 25% of world GDP." },
    history: { th: "เงินบาทของไทย เดิมเป็นก้อนเงินแท้รูปกระสุนปืน มีน้ำหนักมาตรฐาน 15 กรัม จึงเป็นที่มาของทั้งสกุลเงินและหน่วยน้ำหนัก คำว่า 'dollar' มาจาก 'thaler' เหรียญเงินของโบฮีเมียในศตวรรษที่ 16", en: "The Thai baht was originally bullet-shaped silver weighing 15g, hence it's both a currency and weight unit. 'Dollar' comes from 'thaler', a 16th-century Bohemian silver coin." },
    table: [["1 USD", "35.5 THB", "0.92 EUR"], ["1 EUR", "38.6 THB", "1.087 USD"], ["1 GBP", "44.9 THB", "1.266 USD"], ["1 JPY", "0.238 THB", "0.00669 USD"]],
    tableHeaders: ["จาก", "บาทไทย", "เทียบเท่า"],
    realworld: { th: ["🛒 ข้าวผัด 1 จาน ≈ 50-80 THB ≈ $1.4-2.3 USD", "🎫 รถไฟฟ้า BTS = 16-59 THB", "🏠 ค่าเช่าคอนโด กทม. ≈ 8,000-25,000 THB/เดือน", "☕ กาแฟ Starbucks ≈ 120-180 THB ≈ $3.4-5 USD"], en: ["🛒 Thai fried rice ≈ 50-80 THB ≈ $1.4-2.3", "🎫 BTS Skytrain = 16-59 THB", "🏠 Bangkok condo rent ≈ 8,000-25,000 THB/mo", "☕ Starbucks coffee ≈ 120-180 THB ≈ $3.4-5"] }
  }
};

// Safety fallback for any category not yet covered
const defaultEdu = (name) => ({
  formula: { th: `ค่าผลลัพธ์ = ค่าต้นทาง × (ตัวคูณต้นทาง ÷ ตัวคูณปลายทาง)`, en: `Result = Source × (Source Factor ÷ Target Factor)` },
  desc: { th: `หมวดหมู่ ${name} รวบรวมหน่วยวัดที่สำคัญในชีวิตประจำวัน การศึกษา และงานวิชาชีพ`, en: `The ${name} category includes important measurement units.` },
  fact: { th: `💡 หน่วยในหมวด ${name} มีความสำคัญในหลายสาขาวิชา`, en: `💡 Units in ${name} are essential across many fields.` },
  history: { th: `ระบบหน่วยวัดในหมวด ${name} มีวิวัฒนาการมายาวนาน`, en: `Measurement units in ${name} have evolved over centuries.` },
  table: [], tableHeaders: [],
  realworld: { th: [`🌍 หน่วยในหมวด ${name} ถูกใช้ในชีวิตประจำวันทั่วโลก`], en: [`🌍 ${name} units are used daily worldwide.`] }
});

Object.keys(UNITS).forEach(cat => {
  if (!EDU_DATA[cat]) EDU_DATA[cat] = defaultEdu(cat);
});

// ============================================================
// 15. Educational Content Rendering
// ============================================================
function updateEduContent(category) {
  const data = EDU_DATA[category];
  if (!data) return;
  const lang = document.documentElement.getAttribute("data-lang") || "th";

  // Formula
  const formulaBody = document.getElementById("eduFormulaBody");
  formulaBody.innerHTML = `<pre style="white-space:pre-wrap;margin:0;font-size:0.85rem;color:var(--text-secondary)">${data.formula[lang] || data.formula.th}</pre>`;

  // Description
  document.getElementById("eduDescBody").innerHTML = `<p>${data.desc[lang] || data.desc.th}</p>`;

  // Fact
  document.getElementById("eduFactBody").innerHTML = `<p>${(data.fact[lang] || data.fact.th).replace(/\n/g, '<br>')}</p>`;

  // History
  document.getElementById("eduHistoryBody").innerHTML = `<p>${data.history[lang] || data.history.th}</p>`;

  // Table
  const tableWrap = document.getElementById("eduTableWrap");
  if (data.table && data.table.length > 0) {
    tableWrap.style.display = "block";
    const thead = document.getElementById("eduTableHead");
    const tbody = document.getElementById("eduTableBody");
    thead.innerHTML = `<tr>${data.tableHeaders.map(h => `<th>${h}</th>`).join("")}</tr>`;
    tbody.innerHTML = data.table.map(row => `<tr>${row.map(c => `<td>${c}</td>`).join("")}</tr>`).join("");
  } else {
    tableWrap.style.display = "none";
  }

  // Real world
  const rw = document.getElementById("eduRealworld");
  const rwBody = document.getElementById("eduRealworldBody");
  const examples = data.realworld[lang] || data.realworld.th;
  if (examples && examples.length) {
    rw.style.display = "block";
    rwBody.innerHTML = `<ul>${examples.map(e => `<li>${e}</li>`).join("")}</ul>`;
  } else {
    rw.style.display = "none";
  }
}

// ============================================================
// 16. FAQ
// ============================================================
const FAQ_DATA = [
  { q: { th: "เครื่องมือแปลงหน่วยนี้ใช้งานฟรีหรือไม่?", en: "Is this unit converter free to use?" }, a: { th: "ใช่ เครื่องมือแปลงหน่วยสากลของเราใช้งานได้ฟรี 100% ไม่มีค่าใช้จ่ายใดๆ ทั้งสิ้น คุณสามารถแปลงหน่วยได้ไม่จำกัดจำนวนครั้ง ไม่ต้องสมัครสมาชิก ไม่ต้องดาวน์โหลดแอป เพียงเปิดเว็บเบราว์เซอร์ก็ใช้งานได้ทันที", en: "Yes! Our Universal Unit Converter is 100% free. Unlimited conversions, no registration, no app download needed." } },
  { q: { th: "รองรับหน่วยกี่ประเภท?", en: "How many unit types are supported?" }, a: { th: "รองรับมากกว่า 16 หมวดหมู่ และกว่า 100 หน่วย ครอบคลุมทุกประเภทที่ใช้ในชีวิตประจำวัน การศึกษา และงานวิชาชีพ ตั้งแต่ความยาว น้ำหนัก พื้นที่ ปริมาตร อุณหภูมิ ไปจนถึงหน่วยดาราศาสตร์และดิจิทัล รวมถึงหน่วยวัดแบบไทยดั้งเดิม เช่น วา เส้น ไร่ งาน ชั่ง บาท สลึง", en: "Over 16 categories and 100+ units, from everyday measurements to astronomy and digital units, including traditional Thai units." } },
  { q: { th: "ผลลัพธ์การแปลงมีความแม่นยำแค่ไหน?", en: "How accurate are the conversion results?" }, a: { th: "เราใช้ค่าคงที่การแปลงตามมาตรฐานสากล (SI) ผลลัพธ์มีความแม่นยำสูงถึง 10 ตำแหน่งนัยสำคัญ เหมาะสำหรับการใช้งานทั้งในชีวิตประจำวันและงานวิชาการ ระบบจะแสดงผลอัจฉริยะ โดยปรับจำนวนทศนิยมตามขนาดของตัวเลขโดยอัตโนมัติ", en: "We use SI standard constants with up to 10 significant figures. Smart formatting automatically adjusts decimal places based on number magnitude." } },
  { q: { th: "ใช้งานบนมือถือได้หรือไม่?", en: "Can I use this on mobile?" }, a: { th: "ได้แน่นอน! เว็บไซต์ของเราออกแบบแบบ Responsive รองรับทุกขนาดหน้าจอ ทั้งคอมพิวเตอร์เดสก์ท็อป แท็บเล็ต และสมาร์ทโฟน ไม่จำเป็นต้องติดตั้งแอปเพิ่ม เพียงเปิดเบราว์เซอร์แล้วเข้าเว็บไซต์ได้เลย", en: "Absolutely! Our site is fully responsive on all devices — desktop, tablet, smartphone. No app installation needed." } },
  { q: { th: "ข้อมูลของฉันปลอดภัยหรือไม่?", en: "Is my data safe?" }, a: { th: "เราไม่เก็บข้อมูลส่วนบุคคลใดๆ การแปลงหน่วยทั้งหมดทำงานบนเบราว์เซอร์ของคุณเอง (Client-side) ไม่มีการส่งข้อมูลไปยังเซิร์ฟเวอร์ ประวัติการแปลงจะถูกเก็บในเบราว์เซอร์ของคุณเท่านั้น (localStorage) คุณสามารถลบได้ตลอดเวลา", en: "We don't store any personal data. All conversions run client-side in your browser. History is stored locally and can be deleted anytime." } },
  { q: { th: "สามารถใช้ในงานวิชาการได้หรือไม่?", en: "Can I use this for academic work?" }, a: { th: "ได้ เครื่องมือของเราใช้ค่าคงที่ตามมาตรฐาน SI สากล จึงเหมาะสำหรับงานวิชาการ การบ้าน รายงาน และการวิจัย ทุกสูตรและคำอธิบายจะแสดงควบคู่ผลลัพธ์เพื่อให้คุณเข้าใจหลักการแปลง", en: "Yes! We use SI standard constants, making it suitable for academic work, homework, reports, and research." } },
  { q: { th: "ทำไมถึงมีหน่วยวัดแบบไทย?", en: "Why include Thai measurement units?" }, a: { th: "หน่วยวัดแบบไทย เช่น วา เส้น ไร่ งาน ชั่ง บาท สลึง เป็นมรดกทางวัฒนธรรมที่ยังใช้งานอยู่ในปัจจุบัน โดยเฉพาะในการซื้อขายที่ดินและทองคำ เราจึงรวบรวมไว้เพื่อความสะดวกของผู้ใช้ชาวไทย", en: "Thai units like Wa, Sen, Rai, Chang, Baht, Salueng are cultural heritage still used today, especially for land and gold trading." } },
  { q: { th: "เว็บไซต์นี้ต่างจากเครื่องคำนวณทั่วไปอย่างไร?", en: "How is this different from other converters?" }, a: { th: "เว็บไซต์ของเราไม่ใช่แค่เครื่องมือแปลงหน่วย แต่เป็นแหล่งความรู้ที่ให้ข้อมูลเชิงลึก ทุกหมวดหมู่มาพร้อมสูตรการแปลง คำอธิบายทางวิทยาศาสตร์ ประวัติศาสตร์ ข้อเท็จจริงน่ารู้ ตัวอย่างในชีวิตจริง และตารางอ้างอิง เพื่อให้คุณเข้าใจ ไม่ใช่แค่ได้คำตอบ", en: "We're not just a converter — we're a knowledge resource with formulas, scientific explanations, history, fun facts, real-world examples, and reference tables." } },
];

function renderFAQ() {
  const list = document.getElementById("faqList");
  if (!list) return;
  const lang = document.documentElement.getAttribute("data-lang") || "th";
  list.innerHTML = FAQ_DATA.map((faq, i) => `
    <div class="faq-item" id="faq-${i}">
      <div class="faq-question" onclick="toggleFAQ(${i})">
        <span>${faq.q[lang] || faq.q.th}</span>
        <span class="faq-arrow">▼</span>
      </div>
      <div class="faq-answer">
        <p>${faq.a[lang] || faq.a.th}</p>
      </div>
    </div>
  `).join("");
}

function toggleFAQ(i) {
  const item = document.getElementById(`faq-${i}`);
  item.classList.toggle("open");
}

// ============================================================
// 17. SEO Categories Rendering
// ============================================================
function renderSEOCategories() {
  const container = document.getElementById("seoCategoriesList");
  if (!container) return;
  container.innerHTML = Object.keys(UNITS).map(cat => {
    const unitCount = Object.keys(UNITS[cat].units).length;
    return `
      <div class="seo-cat-card" onclick="document.getElementById('categorySelect').value='${cat}';updateUnitDropdowns('${cat}');updateEduContent('${cat}');window.scrollTo({top:0,behavior:'smooth'});">
        <span class="seo-cat-icon">${UNITS[cat].icon}</span>
        <div class="seo-cat-info">
          <h4>${cat}</h4>
          <p>${unitCount} หน่วย</p>
        </div>
      </div>
    `;
  }).join("");
}

// ============================================================
// 18. Language Switcher
// ============================================================
function initLanguage() {
  const saved = localStorage.getItem("site_lang") || "th";
  applyLanguage(saved);

  const btn = document.getElementById("langToggle");
  if (btn) {
    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-lang") || "th";
      const next = current === "th" ? "en" : "th";
      applyLanguage(next);
      localStorage.setItem("site_lang", next);
    });
  }
}

function applyLanguage(lang) {
  document.documentElement.setAttribute("data-lang", lang);
  const btn = document.getElementById("langToggle");
  if (btn) btn.textContent = `🌐 ${lang.toUpperCase()}`;

  document.querySelectorAll("[data-th]").forEach(el => {
    el.textContent = lang === "en" ? (el.getAttribute("data-en") || el.getAttribute("data-th")) : el.getAttribute("data-th");
  });
  document.querySelectorAll("[data-th-placeholder]").forEach(el => {
    el.placeholder = lang === "en" ? (el.getAttribute("data-en-placeholder") || el.getAttribute("data-th-placeholder")) : el.getAttribute("data-th-placeholder");
  });

  // Re-render dynamic content
  const cat = document.getElementById("categorySelect")?.value;
  if (cat) updateEduContent(cat);
  renderFAQ();
}

// ============================================================
// 19. Mobile Nav
// ============================================================
function initMobileNav() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => {
    toggle.classList.toggle("open");
    links.classList.toggle("open");
  });
  links.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      toggle.classList.remove("open");
      links.classList.remove("open");
    });
  });
}

// ============================================================
// 20. Scroll Effects
// ============================================================
function initScrollEffects() {
  const nav = document.getElementById("siteNav");
  // Scroll-to-top button
  const scrollBtn = document.createElement("button");
  scrollBtn.className = "scroll-top";
  scrollBtn.innerHTML = "↑";
  scrollBtn.title = "กลับด้านบน";
  scrollBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  document.body.appendChild(scrollBtn);

  window.addEventListener("scroll", () => {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 50);
    scrollBtn.classList.toggle("visible", window.scrollY > 300);
  });
}

// ============================================================
// 21. Cookie Consent
// ============================================================
function initCookieConsent() {
  if (localStorage.getItem("cookie_consent")) return;
  const banner = document.createElement("div");
  banner.className = "cookie-banner";
  banner.innerHTML = `
    <p>🍪 เว็บไซต์นี้ใช้คุกกี้เพื่อปรับปรุงประสบการณ์ของคุณ และแสดงโฆษณาผ่าน Google AdSense <a href="privacy.html">อ่านนโยบายความเป็นส่วนตัว</a></p>
    <button class="cookie-accept" onclick="acceptCookies()">ยอมรับ</button>
  `;
  document.body.appendChild(banner);
}
function acceptCookies() {
  localStorage.setItem("cookie_consent", "1");
  document.querySelector(".cookie-banner")?.remove();
}
