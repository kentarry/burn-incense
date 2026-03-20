import { useState, useEffect, useRef, useCallback } from "react";

/* ══════════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════════ */
const DEITIES = [
  { id: "none", name: "僅燒香", icon: "🔥", desc: "不指定神明" },
  { id: "mazu", name: "媽祖", icon: "🌊", desc: "天上聖母" },
  { id: "guanyin", name: "觀世音菩薩", icon: "🪷", desc: "大慈大悲" },
  { id: "guan", name: "關聖帝君", icon: "⚔️", desc: "武聖關公" },
  { id: "tudi", name: "土地公", icon: "🏔️", desc: "福德正神" },
  { id: "caishen", name: "財神爺", icon: "💰", desc: "武財神趙公明" },
  { id: "buddha", name: "釋迦牟尼佛", icon: "☸️", desc: "佛祖" },
  { id: "jade", name: "玉皇大帝", icon: "👑", desc: "天公" },
  { id: "wenchang", name: "文昌帝君", icon: "📚", desc: "考試之神" },
  { id: "yuelao", name: "月老", icon: "🎀", desc: "姻緣之神" },
  { id: "baosheng", name: "保生大帝", icon: "🏥", desc: "醫神" },
  { id: "zhusheng", name: "註生娘娘", icon: "👶", desc: "求子之神" },
];
const BRANDS = [
  { id: "laoshan", name: "老山檀香", color: "#C4A35A", rate: 1, smoke: "180,170,150" },
  { id: "agarwood", name: "沉香", color: "#3E2723", rate: .8, smoke: "160,150,140" },
  { id: "sandalwood", name: "檀香", color: "#D4A574", rate: 1.1, smoke: "200,190,170" },
  { id: "chenpi", name: "陳皮香", color: "#8D6E63", rate: 1.2, smoke: "190,170,140" },
  { id: "aiqing", name: "艾草香", color: "#6B8E23", rate: 1.3, smoke: "170,180,160" },
  { id: "jasmine", name: "茉莉香", color: "#F5F0E1", rate: 1, smoke: "220,210,200" },
  { id: "lotus", name: "蓮花香", color: "#E8B4B8", rate: .9, smoke: "210,200,195" },
  { id: "guihua", name: "桂花香", color: "#DAA520", rate: 1.1, smoke: "200,190,160" },
  { id: "mugwort", name: "薄荷香", color: "#98D8C8", rate: 1.4, smoke: "180,200,190" },
];
const THICKS = [
  { id: "thin", name: "細香", w: 2, bt: 25 },
  { id: "medium", name: "中香", w: 3.5, bt: 40 },
  { id: "thick", name: "粗香", w: 5, bt: 60 },
];
const LENS = [
  { id: "short", name: "短香(一尺)", h: 130, bt: 20 },
  { id: "medium", name: "中香(尺三)", h: 180, bt: 35 },
  { id: "long", name: "長香(尺六)", h: 230, bt: 50 },
];
const CENSERS = [
  { id: "classic", name: "古典銅爐", c1: "#B8860B", c2: "#8B6914", ac: "#DAA520" },
  { id: "stone", name: "石雕香爐", c1: "#808080", c2: "#696969", ac: "#A9A9A9" },
  { id: "ceramic", name: "青瓷香爐", c1: "#7FCDCD", c2: "#5BA8A8", ac: "#9DE0E0" },
  { id: "red", name: "紅木香爐", c1: "#8B0000", c2: "#5C0000", ac: "#CD5C5C" },
  { id: "gold", name: "鎏金香爐", c1: "#FFD700", c2: "#B8860B", ac: "#FFF8DC" },
  { id: "purple", name: "紫砂香爐", c1: "#6B3A5D", c2: "#4A2040", ac: "#8B5A7D" },
];
const OCATS = [
  { cat: "🍎 水果", items: ["蘋果","橘子","香蕉","鳳梨","柚子","芭樂","水梨","葡萄","龍眼","荔枝","芒果","木瓜","火龍果","蓮霧","柿子","西瓜","楊桃","棗子"] },
  { cat: "🍖 三牲", items: ["全雞","全鴨","全魚","豬肉","豬腳","滷蛋","燒肉","五花肉","魷魚","蝦"] },
  { cat: "🍚 飯菜", items: ["白飯","油飯","米糕","麵線","滷味拼盤","四神湯","佛跳牆","炒米粉","菜頭湯","筍湯"] },
  { cat: "🍡 糕粿", items: ["壽桃","發糕","紅龜粿","麻糬","湯圓","粽子","年糕","鳳梨酥","月餅","綠豆糕","花生糖","牛軋糖","蛋糕","桂花糕","紅豆餅"] },
  { cat: "🌸 鮮花", items: ["菊花","蓮花","百合","玫瑰","蘭花","牡丹","茉莉花","康乃馨","向日葵","桂花"] },
  { cat: "🍘 零食", items: ["花生","瓜子","開心果","紅棗","核桃","糖果","餅乾","泡麵","沙琪瑪","甜甜圈","仙貝","旺旺","乖乖"] },
];
const GOLD_P = [
  { id: "shou", name: "壽金", cl: "#FFD700", ac: "#E33", desc: "拜天公" },
  { id: "gua", name: "刈金", cl: "#FFCC00", ac: "#C00", desc: "拜神明" },
  { id: "tian", name: "天金", cl: "#FFE44D", ac: "#F33", desc: "拜天公" },
  { id: "fu", name: "福金", cl: "#FFDD33", ac: "#D22", desc: "拜土地公" },
  { id: "da", name: "大百壽金", cl: "#FFE066", ac: "#E33", desc: "大祭典" },
  { id: "ji", name: "金雞母", cl: "#FFCC44", ac: "#F00", desc: "求財運" },
];
const SILVER_P = [
  { id: "yin", name: "銀紙", cl: "#C0C0C0", ac: "#888", desc: "拜好兄弟" },
  { id: "geng", name: "更衣", cl: "#D4D4D4", ac: "#999", desc: "換衣" },
  { id: "lian", name: "蓮花金", cl: "#E8C8D8", ac: "#C06080", desc: "超度" },
  { id: "wang", name: "往生錢", cl: "#DDD", ac: "#AAA", desc: "亡者" },
];
const WINES = [
  { id: "rice", name: "米酒", color: "#FFFDE0", bottle: "#8B7355" },
  { id: "shao", name: "紹興酒", color: "#8B4513", bottle: "#5D4037" },
  { id: "gao", name: "高粱酒", color: "#FAF0E6", bottle: "#6B5B4F" },
  { id: "tea", name: "清茶", color: "#9B7653", bottle: "#5D4E37" },
  { id: "oolong", name: "烏龍茶", color: "#B8860B", bottle: "#4A3728" },
  { id: "soda", name: "汽水", color: "#FFA500", bottle: "#2E7D32" },
];

const SK = "incense-v6";
const ld = () => { try { return JSON.parse(localStorage.getItem(SK)); } catch { return null; } };
const sv = s => { try { localStorage.setItem(SK, JSON.stringify(s)); } catch {} };
const clr = () => { try { localStorage.removeItem(SK); } catch {} };

/* ══════════════════════════════════════════════════════════════
   REALISTIC SVG OFFERINGS — hand-drawn food illustrations
   ══════════════════════════════════════════════════════════════ */
function FoodSVG({ name, size = 40 }) {
  const S = {
    "蘋果": (
      <svg viewBox="0 0 50 50" width={size} height={size}>
        <defs><radialGradient id="ag" cx=".35" cy=".3" r=".65"><stop offset="0%" stopColor="#FF6B6B"/><stop offset="60%" stopColor="#E74C3C"/><stop offset="100%" stopColor="#C0392B"/></radialGradient></defs>
        <ellipse cx="25" cy="28" rx="16" ry="15" fill="url(#ag)"/>
        <ellipse cx="19" cy="23" rx="4" ry="6" fill="rgba(255,255,255,.12)" transform="rotate(-15 19 23)"/>
        <path d="M25 13 Q27 7 30 9" stroke="#5D4037" strokeWidth="1.5" fill="none"/>
        <ellipse cx="29" cy="10" rx="5" ry="3" fill="#4CAF50" transform="rotate(-25 29 10)"/>
        <ellipse cx="26" cy="11" rx="4" ry="2.5" fill="#66BB6A" transform="rotate(10 26 11)"/>
        <path d="M23 14 Q24 13 25 13" stroke="#5D4037" strokeWidth=".8" fill="none"/>
      </svg>
    ),
    "橘子": (
      <svg viewBox="0 0 50 50" width={size} height={size}>
        <defs><radialGradient id="og" cx=".35" cy=".3" r=".65"><stop offset="0%" stopColor="#FFB74D"/><stop offset="60%" stopColor="#FF9800"/><stop offset="100%" stopColor="#E65100"/></radialGradient></defs>
        <circle cx="25" cy="27" r="15" fill="url(#og)"/>
        <circle cx="20" cy="22" r="3.5" fill="rgba(255,255,255,.1)"/>
        <path d="M23 12 Q25 10 27 12" fill="#4CAF50"/>
        <circle cx="25" cy="13" r="2" fill="#388E3C"/>
        {[0,60,120,180,240,300].map((a,i) => <line key={i} x1="25" y1="27" x2={25+12*Math.cos(a*Math.PI/180)} y2={27+12*Math.sin(a*Math.PI/180)} stroke="#E65100" strokeWidth=".3" opacity=".3"/>)}
      </svg>
    ),
    "香蕉": (
      <svg viewBox="0 0 50 50" width={size} height={size}>
        <path d="M12 38 Q6 22 20 10 Q26 6 28 12 Q22 22 16 34 Z" fill="#FFD54F" stroke="#F9A825" strokeWidth=".5"/>
        <path d="M16 34 Q14 38 12 38" fill="#A1887F"/>
        <path d="M20 10 Q22 7 24 8" fill="#795548"/>
        <path d="M14 32 Q8 20 20 10" stroke="rgba(255,255,255,.15)" strokeWidth="1.5" fill="none"/>
        <path d="M28 12 Q34 8 36 14 Q30 24 22 36 Q18 38 16 34 Q22 22 28 12Z" fill="#FFEB3B" stroke="#F9A825" strokeWidth=".3" opacity=".7"/>
      </svg>
    ),
    "鳳梨": (
      <svg viewBox="0 0 50 55" width={size} height={size+5}>
        <ellipse cx="25" cy="34" rx="13" ry="16" fill="#FF8F00"/>
        {[0,1,2,3,4].map(r => <path key={r} d={`M12 ${24+r*5} Q25 ${22+r*5} 38 ${24+r*5}`} stroke="#E65100" strokeWidth=".5" fill="none" opacity=".4"/>)}
        {[0,1,2].map(c => <line key={c} x1={17+c*5} y1="18" x2={17+c*5} y2="50" stroke="#E65100" strokeWidth=".4" opacity=".3"/>)}
        <path d="M20 18 Q22 6 25 10 Q28 6 30 18" fill="#2E7D32"/>
        <path d="M17 20 Q19 8 22 12" fill="#388E3C"/>
        <path d="M28 12 Q31 8 33 20" fill="#1B5E20"/>
        <path d="M22 16 Q25 4 28 16" fill="#4CAF50"/>
      </svg>
    ),
    "葡萄": (
      <svg viewBox="0 0 50 50" width={size} height={size}>
        <defs><radialGradient id="gg" cx=".35" cy=".3"><stop offset="0%" stopColor="#CE93D8"/><stop offset="100%" stopColor="#6A1B9A"/></radialGradient></defs>
        {[[19,22],[28,22],[14,28],[23,28],[32,28],[17,34],[26,34],[21,39]].map(([cx,cy],i) =>
          <g key={i}><circle cx={cx} cy={cy} r="5.5" fill="url(#gg)"/><circle cx={cx-1.5} cy={cy-1.5} r="1.5" fill="rgba(255,255,255,.2)"/></g>
        )}
        <path d="M23 16 Q25 8 27 10" stroke="#5D4037" strokeWidth="1.2" fill="none"/>
        <ellipse cx="27" cy="10" rx="4" ry="2.5" fill="#4CAF50" transform="rotate(-20 27 10)"/>
      </svg>
    ),
    "西瓜": (
      <svg viewBox="0 0 55 45" width={size+6} height={size-2}>
        <ellipse cx="27" cy="25" rx="22" ry="16" fill="#2E7D32"/>
        <path d="M5 25 Q27 10 49 25" fill="#1B5E20" opacity=".5"/>
        {[0,1,2].map(i => <path key={i} d={`M${10+i*12} 15 Q${16+i*12} 35 ${22+i*12} 15`} stroke="#1B5E20" strokeWidth="1" fill="none" opacity=".4"/>)}
        <ellipse cx="27" cy="24" rx="18" ry="3" fill="rgba(255,255,255,.06)"/>
      </svg>
    ),
    "全雞": (
      <svg viewBox="0 0 55 45" width={size+6} height={size-2}>
        <defs><radialGradient id="chg" cx=".4" cy=".3"><stop offset="0%" stopColor="#FFCC80"/><stop offset="100%" stopColor="#BF8C2C"/></radialGradient></defs>
        <ellipse cx="27" cy="28" rx="18" ry="13" fill="url(#chg)"/>
        <ellipse cx="27" cy="32" rx="14" ry="8" fill="#A67B2C" opacity=".3"/>
        <ellipse cx="13" cy="24" rx="4" ry="6" fill="#FFCC80" transform="rotate(20 13 24)"/>
        <ellipse cx="41" cy="24" rx="4" ry="6" fill="#FFCC80" transform="rotate(-20 41 24)"/>
        <circle cx="27" cy="16" r="3" fill="#D4A35A"/>
        <ellipse cx="22" cy="22" rx="3" ry="4" fill="rgba(255,255,255,.08)"/>
      </svg>
    ),
    "全魚": (
      <svg viewBox="0 0 58 38" width={size+10} height={size-6}>
        <defs><linearGradient id="fg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#90CAF9"/><stop offset="100%" stopColor="#1976D2"/></linearGradient></defs>
        <ellipse cx="28" cy="19" rx="22" ry="10" fill="url(#fg)"/>
        <path d="M6 19 Q0 10 7 13 Q2 19 7 25 Q0 28 6 19Z" fill="#64B5F6"/>
        <path d="M12 12 Q28 8 44 12" stroke="#42A5F5" strokeWidth=".5" fill="none"/>
        <circle cx="42" cy="15" r="2.5" fill="white"/><circle cx="42.5" cy="14.5" r="1.2" fill="#1A237E"/>
        <path d="M46 17 Q48 19 46 21" stroke="#E57373" strokeWidth="1" fill="none"/>
        {[16,22,28,34].map(x => <line key={x} x1={x} y1="14" x2={x} y2="24" stroke="#42A5F5" strokeWidth=".3" opacity=".4"/>)}
      </svg>
    ),
    "全鴨": (
      <svg viewBox="0 0 55 45" width={size+6} height={size-2}>
        <ellipse cx="27" cy="28" rx="17" ry="12" fill="#D4A35A"/><ellipse cx="27" cy="31" rx="13" ry="7" fill="#B8860B" opacity=".3"/>
        <ellipse cx="14" cy="25" rx="3.5" ry="5.5" fill="#D4A35A" transform="rotate(15 14 25)"/><ellipse cx="40" cy="25" rx="3.5" ry="5.5" fill="#D4A35A" transform="rotate(-15 40 25)"/>
        <circle cx="27" cy="17" r="3.5" fill="#C49A3C"/><path d="M27 20 L27 22" stroke="#A67B2C" strokeWidth="1"/>
      </svg>
    ),
    "白飯": (
      <svg viewBox="0 0 50 42" width={size} height={size-4}>
        <path d="M8 28 Q8 18 25 18 Q42 18 42 28" fill="#FAFAFA" stroke="#E0E0E0" strokeWidth=".5"/>
        <ellipse cx="25" cy="28" rx="17" ry="9" fill="#EEEEEE" stroke="#BDBDBD" strokeWidth=".5"/>
        <ellipse cx="25" cy="18" rx="14" ry="5" fill="#FEFEFE"/>
        <ellipse cx="25" cy="18" rx="12" ry="4" fill="#FFF9E8"/>
        {[18,22,26,30].map(x => <circle key={x} cx={x} cy={17+Math.random()*2} r="1.5" fill="rgba(255,255,255,.5)"/>)}
      </svg>
    ),
    "壽桃": (
      <svg viewBox="0 0 50 50" width={size} height={size}>
        <path d="M25 40 Q10 36 12 22 Q14 10 25 16 Q36 10 38 22 Q40 36 25 40Z" fill="#FFB6C1"/>
        <path d="M25 40 Q10 36 12 22 Q14 10 25 16" fill="#FF9AAE"/>
        <path d="M25 16 Q23 8 25 5" stroke="#E91E63" strokeWidth="1" fill="none"/>
        <ellipse cx="28" cy="7" rx="5" ry="3" fill="#4CAF50" transform="rotate(-15 28 7)"/>
        <ellipse cx="19" cy="25" rx="4" ry="6" fill="rgba(255,255,255,.15)" transform="rotate(-10 19 25)"/>
      </svg>
    ),
    "發糕": (
      <svg viewBox="0 0 50 42" width={size} height={size-4}>
        <rect x="10" y="22" width="30" height="16" rx="3" fill="#FFF8E1"/>
        <ellipse cx="25" cy="22" rx="15" ry="6" fill="#FFFDE7"/>
        <path d="M16 22 Q18 14 22 18 Q25 13 28 18 Q32 14 34 22" fill="#FFF9C4" stroke="#FFE082" strokeWidth=".3"/>
        <path d="M10 30 L40 30" stroke="#FFE082" strokeWidth=".3" opacity=".5"/>
        <circle cx="22" cy="18" r="1" fill="#FF5252" opacity=".6"/>
      </svg>
    ),
    "粽子": (
      <svg viewBox="0 0 44 50" width={size-4} height={size+2}>
        <path d="M22 6 L8 38 L36 38 Z" fill="#558B2F"/>
        <path d="M22 6 L8 38" stroke="#33691E" strokeWidth="1"/>
        <path d="M22 6 L36 38" stroke="#689F38" strokeWidth=".5"/>
        <path d="M12 24 L32 24" stroke="#7CB342" strokeWidth=".4" opacity=".5"/>
        <path d="M10 30 L34 30" stroke="#7CB342" strokeWidth=".4" opacity=".5"/>
        <path d="M14 18 Q22 15 30 18" stroke="#8BC34A" strokeWidth=".5" fill="none" opacity=".3"/>
        <path d="M16 14 L28 38 M14 20 L32 20" stroke="#33691E" strokeWidth=".3" opacity=".3"/>
      </svg>
    ),
    "菊花": (
      <svg viewBox="0 0 50 50" width={size} height={size}>
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i) => <ellipse key={i} cx={25+10*Math.cos(a*Math.PI/180)} cy={25+10*Math.sin(a*Math.PI/180)} rx="5" ry="2.5" fill="#FDD835" transform={`rotate(${a} ${25+10*Math.cos(a*Math.PI/180)} ${25+10*Math.sin(a*Math.PI/180)})`}/>)}
        <circle cx="25" cy="25" r="5" fill="#F57F17"/>
        <circle cx="25" cy="25" r="3" fill="#FF8F00"/>
      </svg>
    ),
    "蓮花": (
      <svg viewBox="0 0 50 50" width={size} height={size}>
        {[0,45,90,135,180,225,270,315].map((a,i) => <ellipse key={i} cx={25+9*Math.cos((a-90)*Math.PI/180)} cy={28+9*Math.sin((a-90)*Math.PI/180)} rx="6" ry="3" fill={i%2?"#F8BBD0":"#F48FB1"} transform={`rotate(${a} ${25+9*Math.cos((a-90)*Math.PI/180)} ${28+9*Math.sin((a-90)*Math.PI/180)})`}/>)}
        <circle cx="25" cy="28" r="4" fill="#FCE4EC"/>
        <circle cx="25" cy="28" r="2.5" fill="#FFF59D"/>
      </svg>
    ),
    "紅龜粿": (
      <svg viewBox="0 0 50 40" width={size} height={size-6}>
        <ellipse cx="25" cy="24" rx="18" ry="12" fill="#E53935"/>
        <ellipse cx="25" cy="22" rx="16" ry="10" fill="#EF5350"/>
        <path d="M13 22 L37 22 M25 14 L25 30" stroke="#C62828" strokeWidth=".4" opacity=".3"/>
        <ellipse cx="25" cy="22" rx="10" ry="6" fill="none" stroke="#C62828" strokeWidth=".3" opacity=".4"/>
        <text x="25" y="25" textAnchor="middle" fontSize="7" fill="#FFCDD2" opacity=".6">壽</text>
      </svg>
    ),
    "月餅": (
      <svg viewBox="0 0 50 45" width={size} height={size-3}>
        <ellipse cx="25" cy="28" rx="17" ry="12" fill="#D4A35A"/>
        <ellipse cx="25" cy="26" rx="16" ry="10" fill="#E8C87A"/>
        <ellipse cx="25" cy="26" rx="12" ry="7" fill="none" stroke="#BF8C2C" strokeWidth=".5"/>
        <circle cx="25" cy="26" r="4" fill="none" stroke="#BF8C2C" strokeWidth=".3"/>
        <text x="25" y="28" textAnchor="middle" fontSize="6" fill="#8D6E63" opacity=".5">月</text>
      </svg>
    ),
    "滷蛋": (
      <svg viewBox="0 0 42 48" width={size-4} height={size}>
        <ellipse cx="21" cy="28" rx="14" ry="16" fill="#5D4037"/>
        <ellipse cx="21" cy="27" rx="12" ry="14" fill="#6D4C41"/>
        <ellipse cx="18" cy="23" rx="3" ry="4" fill="rgba(255,255,255,.08)"/>
      </svg>
    ),
    "豬腳": (
      <svg viewBox="0 0 55 45" width={size+6} height={size-2}>
        <ellipse cx="27" cy="28" rx="18" ry="12" fill="#8D6E63"/>
        <ellipse cx="27" cy="26" rx="16" ry="10" fill="#A1887F"/>
        <ellipse cx="22" cy="24" rx="4" ry="5" fill="rgba(255,255,255,.06)"/>
        <ellipse cx="27" cy="30" rx="12" ry="4" fill="#795548" opacity=".3"/>
      </svg>
    ),
  };

  if (S[name]) return S[name];

  // Generic offering with colored icon
  const colors = { "柚子":"#8BC34A","芭樂":"#A5D6A7","水梨":"#FFF9C4","龍眼":"#795548","荔枝":"#EF9A9A",
    "芒果":"#FFB74D","木瓜":"#FF8A65","火龍果":"#E91E63","蓮霧":"#E91E63","柿子":"#FF6D00","楊桃":"#FFD54F","棗子":"#8D6E63",
    "豬肉":"#FFAB91","燒肉":"#A1887F","五花肉":"#FFCCBC","魷魚":"#E0E0E0","蝦":"#FF8A65",
    "油飯":"#D4A35A","米糕":"#FFF8E1","麵線":"#FFF9C4","滷味拼盤":"#8D6E63","四神湯":"#FFF9C4","佛跳牆":"#A1887F","炒米粉":"#FFF8E1","菜頭湯":"#E8F5E9","筍湯":"#FFF8E1",
    "麻糬":"#FAFAFA","湯圓":"#FAFAFA","年糕":"#8D6E63","鳳梨酥":"#FFE082","綠豆糕":"#C5E1A5","花生糖":"#D4A35A","牛軋糖":"#FAFAFA","蛋糕":"#FFECB3","桂花糕":"#FFF8E1","紅豆餅":"#8D6E63",
    "百合":"#F3E5F5","玫瑰":"#E91E63","蘭花":"#CE93D8","牡丹":"#EC407A","茉莉花":"#FAFAFA","康乃馨":"#EF5350","向日葵":"#FDD835","桂花":"#FFB74D",
    "花生":"#D4A35A","瓜子":"#5D4037","開心果":"#A5D6A7","紅棗":"#C62828","核桃":"#8D6E63","糖果":"#E91E63","餅乾":"#FFE082","泡麵":"#FF8A65","沙琪瑪":"#FFCC80","甜甜圈":"#D4A35A","仙貝":"#FFE082","旺旺":"#FF5722","乖乖":"#4CAF50",
  };
  const c = colors[name] || "#D4A35A";
  return (
    <svg viewBox="0 0 44 44" width={size-2} height={size-2}>
      <defs><radialGradient id={`gn${name.charCodeAt(0)}`} cx=".35" cy=".3"><stop offset="0%" stopColor={c}/><stop offset="100%" stopColor={c}88/></radialGradient></defs>
      <ellipse cx="22" cy="24" rx="15" ry="14" fill={`url(#gn${name.charCodeAt(0)})`}/>
      <ellipse cx="18" cy="20" rx="3" ry="4" fill="rgba(255,255,255,.1)"/>
      <text x="22" y="28" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,.6)" fontWeight="bold">{name.slice(0,1)}</text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   CENSER SVG
   ══════════════════════════════════════════════════════════════ */
function CenserSVG({ s, w }) {
  return (
    <svg viewBox="0 0 200 90" width={w} height={w * .45}>
      <defs><linearGradient id={`c${s.id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={s.c1}/><stop offset="100%" stopColor={s.c2}/></linearGradient></defs>
      <ellipse cx="100" cy="30" rx="90" ry="14" fill={s.ac} opacity=".3"/>
      <path d="M 20 30 Q 15 60 30 80 L 170 80 Q 185 60 180 30 Z" fill={`url(#c${s.id})`} stroke={s.ac} strokeWidth="1.5"/>
      <ellipse cx="100" cy="30" rx="90" ry="14" fill={s.c1} stroke={s.ac} strokeWidth="1"/>
      <ellipse cx="100" cy="30" rx="75" ry="10" fill="#333" opacity=".5"/>
      <ellipse cx="100" cy="30" rx="72" ry="8" fill="#9E9E9E" opacity=".3"/>
      <ellipse cx="100" cy="55" rx="82" ry="4" fill="none" stroke={s.ac} strokeWidth=".6" opacity=".3"/>
      <rect x="40" y="78" width="14" height="10" rx="3" fill={s.c2}/><rect x="93" y="78" width="14" height="10" rx="3" fill={s.c2}/><rect x="146" y="78" width="14" height="10" rx="3" fill={s.c2}/>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   SMOKE — from actual burn tip positions
   ══════════════════════════════════════════════════════════════ */
function SmokeCanvas({ on, tips, smokeRgb, canvasW, canvasH }) {
  const ref = useRef(null), ps = useRef([]), raf = useRef(null);
  useEffect(() => {
    if (!on || !tips.length) { ps.current = []; return; }
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"), W = canvasW, H = canvasH;
    const mk = (tx, ty) => ({
      x: tx + (Math.random()-.5)*3, y: ty, vx: (Math.random()-.5)*.25,
      vy: -(0.15+Math.random()*.3), r: 1.5+Math.random()*4, life: 1,
      d: .003+Math.random()*.003, ws: .01+Math.random()*.012,
      wa: .15+Math.random()*.4, t: Math.random()*6.28
    });
    let last = 0;
    const loop = ts => {
      ctx.clearRect(0, 0, W, H);
      if (ts - last > 70) { tips.forEach(t => ps.current.push(mk(t.x, t.y))); last = ts; }
      for (const p of ps.current) { p.t += p.ws; p.x += p.vx + Math.sin(p.t)*p.wa; p.y += p.vy; p.r += .03; p.life -= p.d; }
      ps.current = ps.current.filter(p => p.life > 0);
      if (ps.current.length > 200) ps.current.splice(0, ps.current.length - 150);
      for (const p of ps.current) {
        const a = p.life * .25;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        g.addColorStop(0, `rgba(${smokeRgb},${a})`); g.addColorStop(1, `rgba(${smokeRgb},0)`);
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.28); ctx.fillStyle = g; ctx.fill();
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, [on, tips, smokeRgb, canvasW, canvasH]);
  return <canvas ref={ref} width={canvasW} height={canvasH} style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none", zIndex: 15 }} />;
}

/* ══════════════════════════════════════════════════════════════
   POURING ANIMATION — bottle moves to each cup, one by one
   ══════════════════════════════════════════════════════════════ */
function PouringScene({ cups, wine, onDone }) {
  const [pouringIdx, setPouringIdx] = useState(0);
  const [fillLevels, setFillLevels] = useState(Array(cups).fill(0));
  const [bottleX, setBottleX] = useState(0);
  const cupSpacing = 28;
  const startX = -(cups - 1) * cupSpacing / 2;

  useEffect(() => {
    if (pouringIdx >= cups) { setTimeout(onDone, 400); return; }
    setBottleX(startX + pouringIdx * cupSpacing);
    const t1 = setTimeout(() => {
      setFillLevels(prev => { const n = [...prev]; n[pouringIdx] = 1; return n; });
    }, 300);
    const t2 = setTimeout(() => setPouringIdx(p => p + 1), 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [pouringIdx, cups, startX, onDone]);

  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", padding: "8px 0" }}>
      {/* Bottle */}
      <div style={{ position: "relative", height: 45, width: cups * cupSpacing + 20, marginBottom: -8 }}>
        <div style={{
          position: "absolute", left: `calc(50% + ${bottleX}px - 10px)`, top: 0,
          transition: "left 0.3s ease-in-out",
          transform: pouringIdx < cups ? "rotate(-100deg)" : "rotate(0deg)",
          transformOrigin: "bottom center",
        }}>
          <svg width="20" height="42" viewBox="0 0 20 42">
            <rect x="7" y="0" width="6" height="10" rx="2" fill="#5D4037"/>
            <rect x="4" y="10" width="12" height="26" rx="3" fill={wine.bottle}/>
            <rect x="6" y="14" width="8" height="10" rx="1" fill="rgba(255,255,255,.15)"/>
          </svg>
        </div>
        {/* Pour stream */}
        {pouringIdx < cups && (
          <div style={{
            position: "absolute",
            left: `calc(50% + ${bottleX}px - 1px)`,
            top: 30, width: 2, height: 14,
            background: wine.color, borderRadius: 1, opacity: .7,
          }}/>
        )}
      </div>
      {/* Cups row */}
      <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
        {Array.from({ length: cups }).map((_, i) => (
          <svg key={i} width="24" height="20" viewBox="0 0 24 20">
            <path d="M3 4 Q2 14 5 18 L19 18 Q22 14 21 4 Z" fill="#F5F0E6" stroke="#D4C5A0" strokeWidth=".5"/>
            <ellipse cx="12" cy="4" rx="9.5" ry="3.5" fill="#FAF8F0" stroke="#D4C5A0" strokeWidth=".4"/>
            <ellipse cx="12" cy="4.5" rx="8" ry="2.5" fill="#3D2B1F" opacity=".1"/>
            {/* Wine fill */}
            <rect x="4" y={16 - fillLevels[i] * 10} width="16" height={fillLevels[i] * 10} rx="1"
              fill={wine.color} opacity=".65"
              style={{ transition: "height 0.5s ease-out, y 0.5s ease-out" }}
            />
          </svg>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   OFFERING TABLE
   ══════════════════════════════════════════════════════════════ */
function OfferingTable({ offerings, papers, cups, chops, wine, filled }) {
  const total = offerings.length + papers.length + (cups > 0 ? 1 : 0);
  if (total === 0 && cups === 0) return null;
  const tw = Math.min(430, Math.max(200, total * 36 + (cups > 0 ? cups * 22 + 30 : 0) + 50));
  return (
    <div style={{ marginTop: 4 }}>
      <div style={{ width: tw, maxWidth: "92vw", margin: "0 auto", background: "linear-gradient(180deg,#C0392B,#96281B)", borderRadius: "3px 3px 0 0", padding: "8px 8px 6px", boxShadow: "0 3px 10px rgba(0,0,0,.25)", border: "1px solid #7A1010" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, justifyContent: "center", alignItems: "flex-end" }}>
          {cups > 0 && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <div style={{ display: "flex", gap: 3 }}>
                {Array.from({ length: cups }).map((_, i) => (
                  <svg key={i} width="22" height="18" viewBox="0 0 24 20">
                    <path d="M3 4 Q2 14 5 18 L19 18 Q22 14 21 4 Z" fill="#F5F0E6" stroke="#D4C5A0" strokeWidth=".5"/>
                    <ellipse cx="12" cy="4" rx="9.5" ry="3.5" fill="#FAF8F0" stroke="#D4C5A0" strokeWidth=".4"/>
                    {filled && <rect x="4" y="6" width="16" height="10" rx="1" fill={wine.color} opacity=".6"/>}
                  </svg>
                ))}
              </div>
              {chops > 0 && (
                <div style={{ display: "flex", gap: 5 }}>
                  {Array.from({ length: chops }).map((_, i) => (
                    <svg key={i} width="10" height="20" viewBox="0 0 10 20">
                      <rect x="2.5" y="0" width="1.3" height="20" rx=".4" fill="#C4A060" transform="rotate(-3 5 10)"/>
                      <rect x="5.5" y="0" width="1.3" height="20" rx=".4" fill="#C4A060" transform="rotate(3 5 10)"/>
                    </svg>
                  ))}
                </div>
              )}
            </div>
          )}
          {offerings.map((name, i) => (
            <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <FoodSVG name={name} size={36}/>
              <span style={{ fontSize: 7, color: "#FFD7D7", marginTop: -2 }}>{name}</span>
            </div>
          ))}
          {papers.length > 0 && (
            <div style={{ display: "flex", gap: 3, alignItems: "flex-end" }}>
              {papers.map(p => (
                <div key={p.id} style={{ position: "relative" }}>
                  {Array.from({ length: Math.min(p.qty, 5) }).map((_, si) => (
                    <div key={si} style={{ width: 32-si, height: 22-si, borderRadius: 2, background: `linear-gradient(135deg,${p.cl},${p.cl}cc)`, border: `1px solid ${p.ac}`, position: si===0?"relative":"absolute", top: si===0?0:-si*3, left: si*.5, zIndex: 5-si }}>
                      {si===0 && <div style={{ position: "absolute", top: 2, left: "50%", transform: "translateX(-50%)", width: 12, height: 7, background: p.ac, borderRadius: 1, opacity: .6 }}/>}
                    </div>
                  ))}
                  <div style={{ fontSize: 6, color: "#FFD7D7", textAlign: "center", marginTop: 1 }}>{p.name}×{p.qty}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", width: tw, maxWidth: "92vw", margin: "0 auto" }}>
        <div style={{ width: 6, height: 14, background: "#8B1A1A", borderRadius: "0 0 2px 2px" }}/>
        <div style={{ width: 6, height: 14, background: "#8B1A1A", borderRadius: "0 0 2px 2px" }}/>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN APP
   ══════════════════════════════════════════════════════════════ */
export default function App() {
  const [phase, setPhase] = useState("setup");
  const [deity, setDeity] = useState(DEITIES[0]);
  const [brand, setBrand] = useState(BRANDS[0]);
  const [thick, setThick] = useState(THICKS[1]);
  const [len, setLen] = useState(LENS[1]);
  const [count, setCount] = useState(3);
  const [censer, setCenser] = useState(CENSERS[0]);
  const [offerings, setOfferings] = useState([]);
  const [gP, setGP] = useState([]);
  const [sP, setSP] = useState([]);
  const [cups, setCups] = useState(3);
  const [chops, setChops] = useState(3);
  const [wine, setWine] = useState(WINES[0]);
  const [elapsed, setElapsed] = useState(0);
  const [showLeave, setShowLeave] = useState(false);
  const [tab, setTab] = useState("deity");
  const [oCat, setOCat] = useState(0);
  const [lighter, setLighter] = useState(null);
  const [wineFilled, setWineFilled] = useState(false);
  const timerRef = useRef(null);

  const totalTime = (thick.bt + len.bt) * 60 * brand.rate;
  const burnPct = Math.min(1, elapsed / totalTime);
  const spread = Math.min(260, count * 24 + 32);
  const censerW = Math.max(170, spread + 50);
  const censerH = censerW * .45;
  const stickH = len.h + 22; // incense body + handle
  const plantDepth = 32; // how deep sticks go into censer
  const sceneW = 460;
  const sceneH = stickH - plantDepth + censerH + 10;

  // Smoke tip positions — computed from burn percentage
  const tipPositions = [];
  if (phase === "burning" || phase === "done") {
    const gap = spread / (count + 1);
    const x0 = sceneW / 2 - spread / 2;
    for (let i = 0; i < count; i++) {
      const burnedPx = len.h * burnPct;
      // Tip Y: top of scene is 0. Sticks are placed so bottom = sceneH - censerH + plantDepth
      // stick top = sceneH - censerH + plantDepth - stickH = sceneH - censerH + plantDepth - (len.h + 22)
      const stickBottom = sceneH - censerH + plantDepth;
      const stickTop = stickBottom - stickH;
      const tipY = stickTop + burnedPx;
      tipPositions.push({ x: x0 + gap * (i + 1), y: Math.max(5, tipY) });
    }
  }

  // Restore state
  useEffect(() => {
    const s = ld();
    if (s?.ph === "burning" && s.el < s.tt) {
      const ne = s.el + (Date.now() - s.at) / 1000;
      setBrand(BRANDS.find(b => b.id === s.br) || BRANDS[0]);
      setThick(THICKS.find(t => t.id === s.th) || THICKS[1]);
      setLen(LENS.find(l => l.id === s.ln) || LENS[1]);
      setCount(s.ct || 3); setCenser(CENSERS.find(c => c.id === s.cs) || CENSERS[0]);
      setDeity(DEITIES.find(d => d.id === s.dt) || DEITIES[0]);
      setOfferings(s.of || []); setGP(s.gp || []); setSP(s.sp || []);
      setCups(s.cc ?? 3); setChops(s.ch ?? 3);
      setWine(WINES.find(w => w.id === s.wn) || WINES[0]);
      setWineFilled(true);
      if (ne >= s.tt) { setElapsed(s.tt); setPhase("done"); } else { setElapsed(ne); setPhase("burning"); }
    }
  }, []);

  // Persist
  useEffect(() => {
    if (phase === "burning") {
      const iv = setInterval(() => sv({ ph:"burning",el:elapsed,tt:totalTime,at:Date.now(),br:brand.id,th:thick.id,ln:len.id,ct:count,cs:censer.id,dt:deity.id,of:offerings,gp:gP,sp:sP,cc:cups,ch:chops,wn:wine.id }), 3000);
      return () => clearInterval(iv);
    }
  }, [phase,elapsed,totalTime,brand,thick,len,count,censer,deity,offerings,gP,sP,cups,chops,wine]);

  // Burn timer
  useEffect(() => {
    if (phase === "burning") {
      timerRef.current = setInterval(() => setElapsed(p => {
        const n = p + 1;
        if (n >= totalTime) { clearInterval(timerRef.current); setPhase("done"); clr(); return totalTime; }
        return n;
      }), 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [phase, totalTime]);

  // START: Light → Insert → Pour → Burn
  const startBurn = useCallback(() => {
    setElapsed(0); setWineFilled(false);
    setPhase("lighting"); setLighter("in");
    setTimeout(() => setLighter("lit"), 900);
    setTimeout(() => setLighter("out"), 2800);
    setTimeout(() => { setLighter(null); setPhase("inserting"); }, 3400);
    setTimeout(() => {
      if (cups > 0) { setPhase("pouring"); }
      else { setPhase("burning"); }
    }, 4300);
  }, [cups]);

  const onPourDone = useCallback(() => { setWineFilled(true); setPhase("burning"); }, []);
  const reset = () => { setPhase("setup"); setElapsed(0); clr(); setLighter(null); setWineFilled(false); };
  const togO = n => setOfferings(p => p.includes(n) ? p.filter(x => x !== n) : [...p, n]);
  const togPaper = (paper, setter) => setter(p => {
    const ex = p.find(x => x.id === paper.id);
    if (ex) { if (ex.qty >= 5) return p.filter(x => x.id !== paper.id); return p.map(x => x.id === paper.id ? {...x, qty: x.qty+1} : x); }
    return [...p, {...paper, qty: 1}];
  });

  const Sel = s => ({ padding: "8px 3px", borderRadius: 7, cursor: "pointer", textAlign: "center", border: s ? "2px solid #DAA520" : "1px solid rgba(255,255,255,.05)", background: s ? "rgba(218,165,32,.1)" : "rgba(255,255,255,.02)" });
  const allPapers = [...gP, ...sP];

  const CSS_STR = `
    @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;700;900&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:#DAA520;border-radius:3px}
    @keyframes ember{0%,100%{box-shadow:0 0 4px 2px rgba(255,100,0,.5)}50%{box-shadow:0 0 10px 5px rgba(255,80,0,.8)}}
    @keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
    @keyframes glow{0%,100%{text-shadow:0 0 6px rgba(255,215,0,.1)}50%{text-shadow:0 0 20px rgba(255,215,0,.4)}}
    @keyframes lighterIn{0%{opacity:0;transform:translate(55px,15px) rotate(18deg)}55%{opacity:1;transform:translate(0,-3px) rotate(-7deg)}100%{transform:translate(0,0) rotate(-5deg)}}
    @keyframes lighterFlame{0%{height:18px;opacity:.8}50%{height:24px;opacity:1}100%{height:18px;opacity:.8}}
    @keyframes lighterOut{0%{opacity:1;transform:rotate(-5deg)}100%{opacity:0;transform:translate(60px,25px) rotate(22deg)}}
    @keyframes insertStick{0%{transform:translateY(-60px);opacity:0}55%{transform:translateY(3px);opacity:1}75%{transform:translateY(-2px)}100%{transform:translateY(0)}}
    @keyframes popIn{0%{transform:scale(0)}70%{transform:scale(1.08)}100%{transform:scale(1)}}
    button{transition:all .12s;font-family:'Noto Serif TC',sans-serif}button:hover{filter:brightness(1.1)}
  `;

  /* ═════════ SETUP ═════════ */
  if (phase === "setup") {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(180deg,#0D0D1A,#1A1A2E 40%,#16213E)", color: "#E8DCC8", fontFamily: "'Noto Serif TC',Georgia,serif", padding: "10px 0 26px" }}>
        <style>{CSS_STR}</style>
        <div style={{ textAlign: "center", marginBottom: 12, animation: "fadeIn .4s" }}>
          <div style={{ fontSize: 34 }}>🪔</div>
          <h1 style={{ fontSize: 21, fontWeight: 900, color: "#FFD700" }}>虔誠燒香</h1>
          <p style={{ color: "#8B7D6B", fontSize: 10 }}>選擇您的供品與祈願</p>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
          {[{k:"deity",l:"🙏神明"},{k:"incense",l:"🪔香品"},{k:"censer",l:"🏺香爐"},{k:"offering",l:"🍎供品"},{k:"paper",l:"🧧金銀紙"},{k:"cups",l:"🍵酒杯"}].map((t,i,a) => (
            <button key={t.k} onClick={() => setTab(t.k)} style={{ padding: "6px 10px", border: "1px solid rgba(218,165,32,.2)", background: tab===t.k?"rgba(218,165,32,.15)":"rgba(255,255,255,.02)", color: tab===t.k?"#FFD700":"#8B7D6B", fontSize: 10, fontWeight: 600, cursor: "pointer", borderRadius: i===0?"6px 0 0 6px":i===a.length-1?"0 6px 6px 0":"0" }}>{t.l}</button>
          ))}
        </div>
        <div style={{ maxWidth: 430, margin: "0 auto", padding: "0 10px" }}>
          {tab === "deity" && <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6, animation: "fadeIn .2s" }}>{DEITIES.map(d => <button key={d.id} onClick={() => setDeity(d)} style={Sel(deity.id===d.id)}><div style={{ fontSize: 20 }}>{d.icon}</div><div style={{ fontSize: 9, color: deity.id===d.id?"#FFD700":"#BBA86A", fontWeight: 600 }}>{d.name}</div><div style={{ fontSize: 7, color: "#777" }}>{d.desc}</div></button>)}</div>}
          {tab === "incense" && <div style={{ animation: "fadeIn .2s" }}>
            <div style={{ fontSize: 10, color: "#BBA86A", marginBottom: 4 }}>品牌</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 4, marginBottom: 10 }}>{BRANDS.map(b => <button key={b.id} onClick={() => setBrand(b)} style={Sel(brand.id===b.id)}><div style={{ width: 11, height: 11, borderRadius: "50%", background: b.color, margin: "0 auto 2px", border: "1px solid rgba(255,255,255,.1)" }}/><div style={{ fontSize: 9, color: brand.id===b.id?"#FFD700":"#BBA86A", fontWeight: 600 }}>{b.name}</div></button>)}</div>
            <div style={{ fontSize: 10, color: "#BBA86A", marginBottom: 4 }}>粗細</div>
            <div style={{ display: "flex", gap: 5, marginBottom: 10 }}>{THICKS.map(t => <button key={t.id} onClick={() => setThick(t)} style={{ ...Sel(thick.id===t.id), flex: 1 }}><div style={{ width: t.w*2, height: 22, background: brand.color, margin: "0 auto 2px", borderRadius: 2 }}/><div style={{ fontSize: 9, color: thick.id===t.id?"#FFD700":"#BBA86A", fontWeight: 600 }}>{t.name}</div></button>)}</div>
            <div style={{ fontSize: 10, color: "#BBA86A", marginBottom: 4 }}>長度</div>
            <div style={{ display: "flex", gap: 5, marginBottom: 10 }}>{LENS.map(l => <button key={l.id} onClick={() => setLen(l)} style={{ ...Sel(len.id===l.id), flex: 1 }}><div style={{ width: thick.w*2, height: l.h/6, background: brand.color, margin: "0 auto 2px", borderRadius: 2 }}/><div style={{ fontSize: 8, color: len.id===l.id?"#FFD700":"#BBA86A", fontWeight: 600 }}>{l.name}</div></button>)}</div>
            <div style={{ fontSize: 10, color: "#BBA86A", marginBottom: 4 }}>數量</div>
            <div style={{ display: "flex", gap: 4 }}>{[1,3,5,7,9].map(n => <button key={n} onClick={() => setCount(n)} style={{ ...Sel(count===n), width: 40, height: 40, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 0 }}><div style={{ fontSize: 14, fontWeight: 700, color: count===n?"#FFD700":"#BBA86A" }}>{n}</div><div style={{ fontSize: 7, color: "#777" }}>支</div></button>)}</div>
          </div>}
          {tab === "censer" && <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 7, animation: "fadeIn .2s" }}>{CENSERS.map(c => <button key={c.id} onClick={() => setCenser(c)} style={{ ...Sel(censer.id===c.id), padding: "8px 4px" }}><CenserSVG s={c} w={95}/><div style={{ fontSize: 10, color: censer.id===c.id?"#FFD700":"#BBA86A", fontWeight: 600, marginTop: 1 }}>{c.name}</div></button>)}</div>}
          {tab === "offering" && <div style={{ animation: "fadeIn .2s" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginBottom: 6 }}>{OCATS.map((c,i) => <button key={i} onClick={() => setOCat(i)} style={{ padding: "3px 7px", borderRadius: 4, fontSize: 9, fontWeight: 600, cursor: "pointer", border: oCat===i?"1px solid #DAA520":"1px solid rgba(255,255,255,.04)", background: oCat===i?"rgba(218,165,32,.08)":"transparent", color: oCat===i?"#FFD700":"#8B7D6B" }}>{c.cat}</button>)}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 4 }}>{OCATS[oCat].items.map(name => {
              const sel = offerings.includes(name);
              return <button key={name} onClick={() => togO(name)} style={{ ...Sel(sel), padding: "4px 2px" }}><FoodSVG name={name} size={34}/><div style={{ fontSize: 7, color: sel?"#FFD700":"#BBA86A", marginTop: -1, lineHeight: 1 }}>{name}</div></button>;
            })}</div>
            {offerings.length > 0 && <div style={{ marginTop: 6, fontSize: 9, color: "#BBA86A" }}>已選 {offerings.length} 項 <span style={{ cursor: "pointer", color: "#FF6B6B" }} onClick={() => setOfferings([])}>清除</span></div>}
          </div>}
          {tab === "paper" && <div style={{ animation: "fadeIn .2s" }}>
            <div style={{ fontSize: 10, color: "#FFD700", marginBottom: 4 }}>金紙（點擊增疊 1~5，再點移除）</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 5, marginBottom: 10 }}>{GOLD_P.map(p => { const ex = gP.find(x => x.id===p.id); return <button key={p.id} onClick={() => togPaper(p,setGP)} style={{ ...Sel(!!ex), padding: "6px 3px" }}><div style={{ width: 24, height: 16, borderRadius: 2, background: p.cl, border: `1px solid ${p.ac}`, margin: "0 auto 2px" }}/><div style={{ fontSize: 8, color: ex?"#FFD700":"#BBA86A", fontWeight: 600 }}>{p.name}</div>{ex && <div style={{ fontSize: 7, color: "#FF6B00" }}>×{ex.qty}疊</div>}</button>; })}</div>
            <div style={{ fontSize: 10, color: "#C0C0C0", marginBottom: 4 }}>銀紙</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 5 }}>{SILVER_P.map(p => { const ex = sP.find(x => x.id===p.id); return <button key={p.id} onClick={() => togPaper(p,setSP)} style={{ ...Sel(!!ex), padding: "6px 3px" }}><div style={{ width: 24, height: 16, borderRadius: 2, background: p.cl, border: `1px solid ${p.ac}`, margin: "0 auto 2px" }}/><div style={{ fontSize: 8, color: ex?"#FFD700":"#BBA86A", fontWeight: 600 }}>{p.name}</div>{ex && <div style={{ fontSize: 7, color: "#CCC" }}>×{ex.qty}疊</div>}</button>; })}</div>
          </div>}
          {tab === "cups" && <div style={{ animation: "fadeIn .2s" }}>
            <div style={{ fontSize: 10, color: "#BBA86A", marginBottom: 4 }}>酒杯數量</div>
            <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>{[0,1,3,5,7,12].map(n => <button key={n} onClick={() => setCups(n)} style={{ ...Sel(cups===n), width: 42, height: 42, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 0 }}><div style={{ fontSize: 13, fontWeight: 700, color: cups===n?"#FFD700":"#BBA86A" }}>{n}</div><div style={{ fontSize: 7, color: "#777" }}>{n===0?"不放":"杯"}</div></button>)}</div>
            <div style={{ fontSize: 10, color: "#BBA86A", marginBottom: 4 }}>筷子組數</div>
            <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>{[0,1,3,5,7,12].map(n => <button key={n} onClick={() => setChops(n)} style={{ ...Sel(chops===n), width: 42, height: 42, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 0 }}><div style={{ fontSize: 13, fontWeight: 700, color: chops===n?"#FFD700":"#BBA86A" }}>{n}</div><div style={{ fontSize: 7, color: "#777" }}>{n===0?"不放":"雙"}</div></button>)}</div>
            <div style={{ fontSize: 10, color: "#BBA86A", marginBottom: 4 }}>倒入的酒/茶</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 5 }}>{WINES.map(w => <button key={w.id} onClick={() => setWine(w)} style={{ ...Sel(wine.id===w.id), padding: "8px 3px" }}><div style={{ width: 14, height: 14, borderRadius: "50%", background: w.color, margin: "0 auto 2px", border: "1px solid rgba(0,0,0,.12)" }}/><div style={{ fontSize: 9, color: wine.id===w.id?"#FFD700":"#BBA86A", fontWeight: 600 }}>{w.name}</div></button>)}</div>
          </div>}
          {/* Summary */}
          <div style={{ marginTop: 12, padding: 8, borderRadius: 6, background: "rgba(218,165,32,.03)", border: "1px solid rgba(218,165,32,.06)", fontSize: 9, color: "#BBA86A", lineHeight: 1.5 }}>
            {deity.id !== "none" ? `🙏${deity.name}` : "🔥自由燒香"} ・ {brand.name} ・ {thick.name} ・ {len.name} ・ {count}支 ・ {censer.name}
            {cups > 0 && ` ・ 🍵${cups}杯${wine.name}`}{chops > 0 && ` ・ 🥢${chops}雙`}
            {offerings.length > 0 && ` ・ 🎁供品${offerings.length}項`}
            {allPapers.length > 0 && ` ・ 🧧${allPapers.map(p=>`${p.name}×${p.qty}`).join("、")}`}
            <br/><span style={{ fontSize: 8, color: "#777" }}>≈ {Math.round(totalTime/60)} 分鐘</span>
          </div>
          <button onClick={startBurn} style={{ width: "100%", marginTop: 10, padding: "11px 0", borderRadius: 9, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700, background: "linear-gradient(135deg,#8B6914,#DAA520,#B8860B)", color: "#FFF", boxShadow: "0 3px 12px rgba(218,165,32,.18)" }}>🔥 點香開始</button>
        </div>
      </div>
    );
  }

  /* ═════════ SCENE ═════════ */
  // Sticks bottom sits at: sceneH - censerH + plantDepth (planted into censer)
  const stickBottom = sceneH - censerH + plantDepth;
  const gap = spread / (count + 1);
  const x0 = sceneW / 2 - spread / 2;

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg,#0D0D1A,#1A1A2E 40%,#16213E)", color: "#E8DCC8", fontFamily: "'Noto Serif TC',Georgia,serif", display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 8px" }}>
      <style>{CSS_STR}</style>
      {showLeave && <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.7)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: "linear-gradient(135deg,#1A1A2E,#16213E)", border: "1px solid rgba(218,165,32,.25)", borderRadius: 12, padding: "22px 28px", textAlign: "center", maxWidth: 300 }}>
          <div style={{ fontSize: 28 }}>🙏</div><div style={{ fontSize: 14, fontWeight: 700, color: "#FFD700", marginTop: 2 }}>香尚未燒完</div>
          <div style={{ fontSize: 11, color: "#ccc", marginBottom: 14, lineHeight: 1.4 }}>繼續燃燒或結束？</div>
          <div style={{ display: "flex", gap: 7, justifyContent: "center" }}>
            <button onClick={() => setShowLeave(false)} style={{ padding: "6px 16px", borderRadius: 6, border: "1px solid #DAA520", background: "linear-gradient(135deg,#8B6914,#B8860B)", color: "#FFF", fontWeight: 600, cursor: "pointer", fontSize: 11 }}>🔥 繼續</button>
            <button onClick={() => { setShowLeave(false); reset(); }} style={{ padding: "6px 16px", borderRadius: 6, border: "1px solid #555", background: "rgba(255,255,255,.04)", color: "#ccc", fontWeight: 600, cursor: "pointer", fontSize: 11 }}>🕯️ 結束</button>
          </div>
        </div>
      </div>}

      {deity.id !== "none" && <div style={{ textAlign: "center", marginBottom: 4, padding: "5px 14px", background: "rgba(139,0,0,.06)", borderRadius: 7, border: "1px solid rgba(218,165,32,.12)" }}><div style={{ fontSize: 32 }}>{deity.icon}</div><div style={{ fontSize: 15, fontWeight: 700, color: "#FFD700" }}>{deity.name}</div><div style={{ fontSize: 9, color: "#BBA86A" }}>{deity.desc}</div></div>}

      {/* SCENE */}
      <div style={{ position: "relative", width: sceneW, maxWidth: "100%", height: sceneH }}>
        {/* Smoke from burn tips */}
        <SmokeCanvas on={phase === "burning"} tips={tipPositions} smokeRgb={brand.smoke} canvasW={sceneW} canvasH={sceneH}/>

        {/* Lighter during lighting phase */}
        {phase === "lighting" && lighter && (
          <div style={{
            position: "absolute",
            top: stickBottom - stickH - 5, // at tip of sticks
            left: "50%", marginLeft: -20, zIndex: 30,
            animation: lighter === "in" ? "lighterIn .9s cubic-bezier(.25,.46,.45,.94) forwards" : lighter === "out" ? "lighterOut .6s ease-in forwards" : "none",
            transformOrigin: "bottom center",
          }}>
            <div style={{ position: "relative", width: 40, height: 60 }}>
              {(lighter === "in" || lighter === "lit") && <div style={{ position: "absolute", top: -14, left: 11, width: 18, zIndex: 2 }}><div style={{ width: "100%", height: 22, animation: "lighterFlame .35s infinite", background: "radial-gradient(ellipse at bottom,#FFF7AA,#FFD700 20%,#FF8C00 50%,#FF4500 78%,transparent)", borderRadius: "50% 50% 40% 40%/65% 65% 35% 35%", filter: "blur(1px)" }}/></div>}
              <div style={{ position: "absolute", bottom: 0, left: 5, width: 30, height: 42, borderRadius: "5px 5px 7px 7px", background: "linear-gradient(160deg,#E74C3C,#C0392B 60%,#96281B)", border: "1px solid rgba(0,0,0,.12)" }}>
                <div style={{ position: "absolute", top: -7, left: 4, width: 22, height: 12, background: "linear-gradient(to bottom,#D5D8DC,#ABB2B9)", borderRadius: "3px 3px 1px 1px" }}><div style={{ width: 9, height: 4, background: "#7F8C8D", borderRadius: 2, margin: "2px auto 0" }}/></div>
              </div>
            </div>
          </div>
        )}

        {/* INCENSE STICKS — absolutely positioned, planted into censer */}
        {(phase !== "lighting" || lighter === "out" || !lighter) && (
          <div style={{
            position: "absolute",
            bottom: censerH - plantDepth, // bottom of sticks is INSIDE the censer
            left: "50%", transform: "translateX(-50%)",
            display: "flex", gap: Math.max(2, 14 - count), justifyContent: "center", alignItems: "flex-end",
            zIndex: 5,
          }}>
            {Array.from({ length: count }).map((_, i) => {
              const h = len.h, w = thick.w;
              const burnedH = h * (phase === "done" ? 1 : burnPct);
              const remainH = h - burnedH;
              const glowing = phase === "burning" && burnPct < 1;
              const inserting = phase === "inserting";
              return (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", animation: inserting ? "insertStick .8s cubic-bezier(.34,1.56,.64,1) forwards" : "none" }}>
                  {/* EMBER — follows burn position */}
                  {glowing && <div style={{ width: w + 6, height: 5, borderRadius: "50%", background: "radial-gradient(circle,#FF6B00 25%,#FF4500 55%,transparent)", animation: "ember 1s infinite", marginBottom: -1, zIndex: 2 }}/>}
                  {/* Ash */}
                  {burnedH > 1 && <div style={{ width: w - .5, height: burnedH, background: "linear-gradient(to bottom,#999,#bbb,#aaa)", opacity: .45, borderRadius: "1px 1px 0 0" }}/>}
                  {/* Remaining incense */}
                  <div style={{ width: w, height: Math.max(remainH, 0), background: `linear-gradient(135deg,${brand.color}ee,${brand.color})`, borderRadius: "1px 1px 2px 2px", boxShadow: "inset 1px 0 0 rgba(255,255,255,.1),inset -1px 0 0 rgba(0,0,0,.08)", transition: "height 1s linear" }}/>
                  {/* Handle */}
                  <div style={{ width: w + 1, height: 22, background: "linear-gradient(to bottom,#DEB887,#C4A060)", borderRadius: "0 0 1px 1px" }}/>
                </div>
              );
            })}
          </div>
        )}
        {/* Static sticks during lighting */}
        {phase === "lighting" && lighter && lighter !== "out" && (
          <div style={{ position: "absolute", bottom: censerH + 20, left: "50%", transform: "translateX(-50%)", display: "flex", gap: Math.max(2, 14 - count), justifyContent: "center", zIndex: 5 }}>
            {Array.from({ length: count }).map((_, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: thick.w, height: len.h, background: `linear-gradient(135deg,${brand.color}ee,${brand.color})`, borderRadius: "1px 1px 2px 2px" }}/>
                <div style={{ width: thick.w + 1, height: 22, background: "linear-gradient(to bottom,#DEB887,#C4A060)" }}/>
              </div>
            ))}
          </div>
        )}

        {/* CENSER — at very bottom */}
        <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", zIndex: 6 }}>
          <CenserSVG s={censer} w={censerW}/>
        </div>
      </div>

      {/* POURING SCENE */}
      {phase === "pouring" && (
        <div style={{ animation: "fadeIn .3s" }}>
          <div style={{ fontSize: 12, color: "#DAA520", textAlign: "center", marginBottom: 4 }}>🍶 正在倒{wine.name}...</div>
          <PouringScene cups={cups} wine={wine} onDone={onPourDone}/>
        </div>
      )}

      {/* OFFERING TABLE */}
      {phase !== "pouring" && <OfferingTable offerings={offerings} papers={allPapers} cups={cups} chops={chops} wine={wine} filled={wineFilled}/>}

      {/* Timer */}
      {phase === "burning" && (
        <div style={{ textAlign: "center", marginTop: 6 }}>
          <div style={{ fontSize: 9, color: "#999" }}>剩餘時間</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#FFD700" }}>{String(Math.floor(Math.max(0,totalTime-elapsed)/60)).padStart(2,"0")}:{String(Math.floor(Math.max(0,totalTime-elapsed)%60)).padStart(2,"0")}</div>
          <div style={{ width: 140, height: 3, background: "#333", borderRadius: 2, margin: "3px auto 0", overflow: "hidden" }}><div style={{ width: `${burnPct*100}%`, height: "100%", background: "linear-gradient(90deg,#FF6B00,#FFD700)", transition: "width 1s linear" }}/></div>
        </div>
      )}

      {phase === "lighting" && <div style={{ textAlign: "center", marginTop: 6 }}><div style={{ fontSize: 12, color: "#FFD700" }}>🔥 對準香頭點火中...</div></div>}
      {phase === "inserting" && <div style={{ textAlign: "center", marginTop: 6 }}><div style={{ fontSize: 12, color: "#BBA86A" }}>📌 將香插入香爐...</div></div>}
      {phase === "done" && <div style={{ textAlign: "center", marginTop: 8 }}><div style={{ fontSize: 28 }}>🙏</div><div style={{ fontSize: 16, fontWeight: 700, color: "#FFD700", animation: "glow 2s infinite" }}>香已燒完，功德圓滿</div><div style={{ fontSize: 10, color: "#8B7D6B" }}>{deity.id !== "none" ? `${deity.name} 保佑平安` : "心誠則靈"}</div></div>}

      <div style={{ marginTop: 8, padding: "5px 10px", borderRadius: 5, background: "rgba(255,255,255,.02)", fontSize: 8, color: "#777", textAlign: "center" }}>
        {brand.name} ・ {thick.name} ・ {len.name} ・ {count}支{offerings.length > 0 && ` ・ 供品${offerings.length}項`}{cups > 0 && ` ・ ${wine.name}${cups}杯`}
      </div>
      <div style={{ display: "flex", gap: 7, marginTop: 8, marginBottom: 16 }}>
        {phase === "burning" && <button onClick={() => setShowLeave(true)} style={{ padding: "6px 18px", borderRadius: 5, border: "1px solid rgba(255,255,255,.07)", background: "rgba(255,255,255,.03)", color: "#BBA86A", cursor: "pointer", fontSize: 10, fontWeight: 600 }}>🚪 離開</button>}
        {(phase === "done" || phase === "burning") && <button onClick={reset} style={{ padding: "6px 18px", borderRadius: 5, border: "1px solid rgba(218,165,32,.2)", background: "rgba(218,165,32,.08)", color: "#FFD700", cursor: "pointer", fontSize: 10, fontWeight: 600 }}>🔄 重新燒香</button>}
      </div>
    </div>
  );
}
