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
});
