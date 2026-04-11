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
};

// Fill remaining categories with generic data
const defaultEdu = (name) => ({
  formula: { th: `ค่าผลลัพธ์ = ค่าต้นทาง × (ตัวคูณต้นทาง ÷ ตัวคูณปลายทาง)`, en: `Result = Source × (Source Factor ÷ Target Factor)` },
  desc: { th: `หมวดหมู่ ${name} รวบรวมหน่วยวัดที่สำคัญและใช้งานบ่อยในชีวิตประจำวัน การศึกษา และงานวิชาชีพ ระบบการแปลงใช้หน่วยฐานเดียวแล้วคำนวณอัตราส่วนระหว่างหน่วยต่างๆ`, en: `The ${name} category includes commonly used measurement units for daily life, education, and professional work.` },
  fact: { th: `💡 หน่วยในหมวด ${name} มีความสำคัญในหลายสาขาวิชา ไม่ว่าจะเป็นวิทยาศาสตร์ วิศวกรรม หรือชีวิตประจำวัน`, en: `💡 Units in the ${name} category are essential across many fields.` },
  history: { th: `ระบบหน่วยวัดในหมวด ${name} มีวิวัฒนาการมายาวนาน ตั้งแต่ระบบโบราณจนถึงระบบ SI สมัยใหม่ที่ใช้ทั่วโลก`, en: `Measurement units in ${name} have evolved from ancient systems to the modern SI system used worldwide.` },
  table: [], tableHeaders: [],
  realworld: { th: [`🌍 หน่วยในหมวด ${name} ถูกใช้ในชีวิตประจำวันและงานวิชาชีพทั่วโลก`], en: [`🌍 ${name} units are used daily worldwide.`] }
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
