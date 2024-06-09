import axios from "axios";
import fs from "fs";

async function fetchData() {
  const url = `https://api.butler.works/api/analysis/fundamentals/efficiency/summary?corpCode=00126380&fsDiv=MFS&quarterPeriod=accumulated`;

  const response = await axios.get(url, {
    headers: {
      Referer: "https://www.butler.works/",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4NTg2IiwiaWF0IjoxNzE3ODM3NDcwLCJleHAiOjE3MjU2MTM0NzAsImlzcyI6ImJ1dGxlciJ9.aXsXXcQjlhHTSqz2MmNSkNUQvT7erjBXTNTBnIDIcLg",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    },
  });

  return response.data;
}

async function main() {
  const data = await fetchData();
  const targetDates = ["2024.03", "2023.12", "2023.09", "2023.06", "2023.03"];

  const filteredData = data.filter((item) => targetDates.includes(item.date));

  let totalInventoryTurnoverPeriod = 0;
  let totalPayablesTurnoverPeriod = 0;
  let totalReceivablesTurnoverPeriod = 0;

  filteredData.forEach((item) => {
    totalInventoryTurnoverPeriod += parseFloat(item.effInventoryTurnoverPeriod);
    totalPayablesTurnoverPeriod += parseFloat(item.effPayablesTurnoverPeriod);
    totalReceivablesTurnoverPeriod += parseFloat(
      item.effReceivablesTurnoverPeriod
    );
  });

  const averageData = {
    effInventoryTurnoverPeriod: (
      totalInventoryTurnoverPeriod / filteredData.length
    ).toFixed(1),
    effPayablesTurnoverPeriod: (
      totalPayablesTurnoverPeriod / filteredData.length
    ).toFixed(1),
    effReceivablesTurnoverPeriod: (
      totalReceivablesTurnoverPeriod / filteredData.length
    ).toFixed(1),
  };

  fs.writeFileSync(
    "stock_efficiency_mean.json",
    JSON.stringify(averageData, null, 2)
  );
}

main();
