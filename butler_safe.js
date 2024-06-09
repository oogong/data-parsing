import axios from "axios";
import fs from "fs";

async function fetchData() {
  const url = `https://api.butler.works/api/analysis/fundamentals/stability?corpCode=00126380&fsDiv=MFS&quarterPeriod=quarter`;

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

  console.log(data);

  const staDebtRatio = data.staDebtRatio.filter((item) =>
    ["24.03", "23.12"].includes(item.calendarDate)
  );
  const staCurrentRatio = data.staCurrentRatio.filter((item) =>
    ["24.03", "23.12"].includes(item.calendarDate)
  );
  const combinedData = staDebtRatio.map((item, index) => {
    return {
      calendarDate: item.calendarDate,
      "staDebtRatio.value": item.value,
      "staCurrentRatio.value": staCurrentRatio[index]
        ? staCurrentRatio[index].value
        : null,
    };
  });

  fs.writeFileSync("stock_safe.json", JSON.stringify(combinedData, null, 2));
}

main();
