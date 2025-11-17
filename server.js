const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// API lịch sử gốc
const API_HISTORY = "https://taixiu.gsum01.com/api/luckydice/GetSoiCau";

// 🔹 API trả phiên mới nhất theo format mong muốn
app.get("/latest", async (req, res) => {
  try {
    const response = await axios.get(API_HISTORY);
    const data = response.data;

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(500).json({ error: "API gốc trả sai định dạng hoặc rỗng" });
    }

    const newest = data[0];

    const latestResult = {
      Phien: newest.SessionId,
      Xuc_xac_1: newest.FirstDice,
      Xuc_xac_2: newest.SecondDice,
      Xuc_xac_3: newest.ThirdDice,
      Tong: newest.DiceSum,
      Ket_qua: newest.BetSide === 1 ? "Xỉu" : "Tài",
      id: "@mrtinhios"
    };

    res.json(latestResult);

  } catch (err) {
    console.error("Lỗi get latest:", err.message);
    res.status(500).json({ error: "Không lấy được phiên mới nhất" });
  }
});

// 🚀 Khởi động server
app.listen(PORT, () => {
  console.log(`API phiên mới nhất đang chạy tại http://localhost:${PORT}`);
});