# 🪔 虔誠燒香 — 線上拜拜工具

> 一款精緻的線上燒香拜拜模擬器，讓您隨時隨地誠心祈願。

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

## ✨ 功能特色

### 🙏 神明選擇
支援多位傳統神明，包含：
- 媽祖（天上聖母）
- 觀世音菩薩
- 關聖帝君（武聖關公）
- 土地公（福德正神）
- 財神爺
- 釋迦牟尼佛
- 玉皇大帝
- 文昌帝君、月老、保生大帝、註生娘娘等

每位神明皆附有精美圖像。

### 🪔 香品配置
- **品牌**：老山檀香、沉香、檀香、陳皮香、艾草香、茉莉香、蓮花香、桂花香、薄荷香
- **粗細**：細香 / 中香 / 粗香
- **長度**：短香（一尺）/ 中香（尺三）/ 長香（尺六）
- **數量**：自由選擇

### 🏺 香爐選擇
提供多款香爐樣式：古典銅爐、石雕香爐、青瓷香爐、紅木香爐、鎏金香爐、紫砂香爐。

### 🍎 供品擺設
六大類供品任選：
- 🍎 水果（蘋果、橘子、香蕉、鳳梨等 18 種）
- 🍖 三牲（全雞、全鴨、全魚等 10 種）
- 🍚 飯菜（白飯、油飯、米糕等 10 種）
- 🍡 糕粿（壽桃、發糕、紅龜粿等 13 種）
- 🌸 鮮花（菊花、蓮花、百合等 10 種）
- 🍘 零食（花生、瓜子、餅乾等 13 種）

### 🧧 金銀紙
- **金紙**：壽金、刈金、天金、福金、大百壽金、太極金
- **銀紙**：小銀、大銀、經衣、更衣

### 🍵 酒杯
可選米酒、高粱酒、清茶、汽水作為敬品。

### 🎭 沉浸式燒香體驗
- 🪔 **點燃動畫**：逼真的打火機點燃香枝動畫
- 💨 **煙霧效果**：根據香品品牌呈現不同煙霧顏色
- 🙇 **鞠躬動畫**：人物鞠躬插香的完整動畫
- 🔮 **擲筊功能**：支援聖杯、笑杯等結果判斷
- ⏱️ **即時計時**：根據香品粗細長度計算燃燒時間

## 🚀 快速開始

### 線上使用
直接訪問：[GitHub Pages](https://kentarry.github.io/burn-incense/)

### 本地運行
```bash
# 克隆專案
git clone https://github.com/kentarry/burn-incense.git

# 進入目錄
cd burn-incense

# 安裝依賴（如需本地伺服器）
npm install

# 直接用瀏覽器開啟
# 或使用本地伺服器
npx serve .
```

## 📂 專案結構

```
burn-incense/
├── index.html          # 主頁面（含完整 CSS 與 JS）
├── incense-burner.jsx  # React 版元件（備用）
├── images/             # 神明與筊杯圖片
│   ├── deity_mazu.png
│   ├── deity_guanyin.png
│   ├── deity_guan.png
│   ├── deity_tudi.png
│   ├── deity_caishen.png
│   ├── deity_buddha.png
│   ├── deity_jade.png
│   ├── deity_wenchang.png
│   ├── deity_yuelao.png
│   ├── deity_baosheng.png
│   ├── deity_zhusheng.png
│   ├── jiaobei_flat.png
│   └── jiaobei_round.png
├── package.json
└── README.md
```

## 🛠️ 技術架構

- **前端**：純 HTML + CSS + Vanilla JavaScript（無框架依賴）
- **字型**：[Noto Serif TC](https://fonts.google.com/noto/specimen/Noto+Serif+TC)（Google Fonts）
- **設計風格**：
  - 深色主題搭配金色點綴
  - Glassmorphism 模糊背景效果
  - 流暢的 CSS 動畫與過場效果
  - 響應式設計，支援手機、平板、桌面

## 📝 使用說明

1. **選擇神明** — 點選想要祈拜的神明
2. **配置香品** — 選擇香的品牌、粗細、長度與數量
3. **選擇香爐** — 挑選喜歡的香爐樣式
4. **擺設供品** — 從六大類中自由搭配供品
5. **準備金銀紙** — 選取適合的金紙與銀紙
6. **設定酒杯** — 選擇酒品
7. **開始拜拜** — 點擊開始，觀賞完整的燒香動畫
8. **擲筊問事** — 在燒香過程中可擲筊問神

## 📄 授權

本專案採用 [MIT License](LICENSE) 授權。

## 🙏 致謝

感謝所有對台灣傳統信仰文化的傳承與推廣。

---

<p align="center">
  <sub>以科技傳承信仰文化 🪔</sub>
</p>
