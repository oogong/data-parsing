import fs from "fs";
import axios from "axios";
import * as cheerio from "cheerio";

const corp_content = [
  "00126380",
  "00164779",
  "01515323",
  "00164742",
  "00877059",
  "00106641",
  "00413046",
  "00155319",
  "00688996",
  "00266961",
  "00126362",
  "00356361",
  "00149655",
  "00382199",
  "00155276",
  "00164788",
  "00258801",
  "00547583",
  "00401731",
  "00139214",
  "00126256",
  "00860332",
  "00164645",
  "00159193",
  "00120021",
  "00126186",
  "00159616",
  "00760971",
  "00181712",
  "00126371",
  "01390344",
  "00244455",
  "00159023",
  "00149646",
  "01133217",
  "00583424",
  "00126566",
  "01350869",
  "00102858",
  "01596425",
  "01205851",
  "00631518",
  "00190321",
  "00164830",
  "00111704",
  "00124504",
  "01204056",
  "00126478",
  "00113526",
  "00138279",
  "00159102",
  "00360595",
  "00878696",
  "01311408",
  "00145109",
  "00356370",
  "00105855",
  "00155212",
  "00105961",
  "00139889",
  "01032486",
  "00937324",
  "01205709",
  "00904672",
  "00105873",
  "00162461",
  "00635134",
  "00309503",
  "00165413",
  "00106119",
  "00105952",
  "00126292",
  "00126308",
  "00261443",
  "00126955",
  "00983040",
  "01244601",
  "00231363",
  "00170558",
  "00106368",
  "00111722",
  "00261285",
  "00302926",
  "00120182",
  "01319899",
  "00145880",
  "00500254",
  "00828497",
  "00432102",
  "00503668",
  "00148540",
  "00164478",
  "01238169",
  "00296290",
  "00255619",
  "00104856",
  "00117212",
  "00339391",
  "00138224",
  "01386916",
  "00113207",
  "00164973",
  "00164609",
  "00108241",
  "00154462",
  "01568413",
  "00159209",
  "00858364",
  "00161125",
  "00105271",
  "00120562",
  "00980122",
  "00113058",
  "00195229",
  "00122737",
  "01042775",
  "00113410",
  "00113997",
  "00165680",
  "00161426",
  "00158501",
  "00140177",
  "00148276",
  "00481454",
  "00670340",
  "01263022",
  "00140955",
  "00144395",
  "00148896",
  "01009789",
  "00160588",
  "00120526",
  "00160843",
  "00872984",
  "00684714",
  "00125521",
  "00162586",
  "00141529",
  "00133858",
  "00106623",
  "00164724",
  "00136378",
  "00117300",
  "00160047",
  "01316254",
  "01316227",
  "01258507",
  "00939331",
  "00776820",
  "00159218",
  "00124540",
  "01412725",
  "00344287",
  "00150244",
  "00126779",
  "00129679",
  "00120030",
  "00161693",
  "00132637",
  "00427483",
  "00878915",
  "00992871",
  "01524093",
  "00138242",
  "00131780",
  "00109693",
  "00140964",
  "00120076",
  "00160302",
  "00428251",
  "00157681",
  "00117188",
  "00120571",
  "00526599",
  "00854997",
  "00795135",
  "00260383",
  "01319808",
  "01267170",
  "00111810",
  "00972503",
  "00117577",
  "00145260",
  "01010110",
  "00269940",
  "00767460",
  "00557508",
  "00728638",
  "00595191",
  "00426086",
  "00231372",
  "00138792",
  "00137359",
  "00115676",
  "00115977",
  "00173078",
  "00121941",
  "00106669",
  "00141307",
  "00108135",
];

async function profit_fetchData(corp_num) {
  const url = `https://api.butler.works/api/analysis/fundamentals/profitability/summary?corpCode=${corp_num}&fsDiv=MFS&quarterPeriod=accumulated`;

  const response1 = await axios.get(url, {
    headers: {
      //   Accept: "application/json, text/plain, */*",
      //   Authorization:
      //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4NTg2IiwiaWF0IjoxNzE3ODM3NDcwLCJleHAiOjE3MjU2MTM0NzAsImlzcyI6ImJ1dGxlciJ9.aXsXXcQjlhHTSqz2MmNSkNUQvT7erjBXTNTBnIDIcLg",
      //   Connection: "keep-alive",
      //   Host: "api.butler.works",
      //   Origin: "https://www.butler.works",
      Referer: "https://www.butler.works/",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4NTg2IiwiaWF0IjoxNzE3ODM3NDcwLCJleHAiOjE3MjU2MTM0NzAsImlzcyI6ImJ1dGxlciJ9.aXsXXcQjlhHTSqz2MmNSkNUQvT7erjBXTNTBnIDIcLg",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    },
  });

  return response1.data;
}

async function growth_fetchData(corp_num) {
  const url = `https://api.butler.works/api/analysis/fundamentals/yoy/summary?corpCode=${corp_num}&fsDiv=MFS&quarterPeriod=accumulated`;

  const response2 = await axios.get(url, {
    headers: {
      //   Accept: "application/json, text/plain, */*",
      //   Authorization:
      //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4NTg2IiwiaWF0IjoxNzE3ODM3NDcwLCJleHAiOjE3MjU2MTM0NzAsImlzcyI6ImJ1dGxlciJ9.aXsXXcQjlhHTSqz2MmNSkNUQvT7erjBXTNTBnIDIcLg",
      //   Connection: "keep-alive",
      //   Host: "api.butler.works",
      //   Origin: "https://www.butler.works",
      Referer: "https://www.butler.works/",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4NTg2IiwiaWF0IjoxNzE3ODM3NDcwLCJleHAiOjE3MjU2MTM0NzAsImlzcyI6ImJ1dGxlciJ9.aXsXXcQjlhHTSqz2MmNSkNUQvT7erjBXTNTBnIDIcLg",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    },
  });

  return response2.data;
}

async function safe_fetchData(corp_num) {
  const url = `https://api.butler.works/api/analysis/fundamentals/stability?corpCode=${corp_num}&fsDiv=MFS&quarterPeriod=quarter`;

  const response3 = await axios.get(url, {
    headers: {
      Referer: "https://www.butler.works/",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4NTg2IiwiaWF0IjoxNzE3ODM3NDcwLCJleHAiOjE3MjU2MTM0NzAsImlzcyI6ImJ1dGxlciJ9.aXsXXcQjlhHTSqz2MmNSkNUQvT7erjBXTNTBnIDIcLg",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    },
  });

  return response3.data;
}

async function efficiency_fetchData(corp_num) {
  const url = `https://api.butler.works/api/analysis/fundamentals/efficiency/summary?corpCode=${corp_num}&fsDiv=MFS&quarterPeriod=accumulated`;

  const response4 = await axios.get(url, {
    headers: {
      Referer: "https://www.butler.works/",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4NTg2IiwiaWF0IjoxNzE3ODM3NDcwLCJleHAiOjE3MjU2MTM0NzAsImlzcyI6ImJ1dGxlciJ9.aXsXXcQjlhHTSqz2MmNSkNUQvT7erjBXTNTBnIDIcLg",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    },
  });

  return response4.data;
}

async function main() {
  const result = {};
  for (const corp of corp_content) {
    const data1 = await profit_fetchData(corp);
    const data2 = await growth_fetchData(corp);
    const data3 = await safe_fetchData(corp);
    const data4 = await efficiency_fetchData(corp);

    const targetDates = ["2024.03", "2023.12", "2023.09", "2023.06", "2023.03"];
    // const targetDates2 = ["24.03", "23.12"]

    const filteredData1 = data1.filter((item) =>
      targetDates.includes(item.date)
    );
    const filteredData2 = data2.filter((item) =>
      targetDates.includes(item.date)
    );
    const staDebtRatio = data3.staDebtRatio.filter((item) =>
      ["24.03", "23.12"].includes(item.calendarDate)
    );
    const staCurrentRatio = data3.staCurrentRatio.filter((item) =>
      ["24.03", "23.12"].includes(item.calendarDate)
    );
    const filteredData4 = data4.filter((item) =>
      targetDates.includes(item.date)
    );

    let totalproROE = 0;
    let totalproOperatingProfitMargin = 0;
    let totalproNetProfitMargin = 0;

    let totalbsTotalEquityYoY = 0;
    let totalisNetIncomeYoY = 0;
    let totalisOperatingProfitLossYoY = 0;
    let totalisRevenueYoY = 0;

    let totalstaDebtRatio = 0;
    let totalstaCurrentRatio = 0;

    let totalInventoryTurnoverPeriod = 0;
    let totalPayablesTurnoverPeriod = 0;
    let totalReceivablesTurnoverPeriod = 0;

    filteredData1.forEach((item) => {
      totalproROE += parseFloat(item.proROE);
      totalproOperatingProfitMargin += parseFloat(
        item.proOperatingProfitMargin
      );
      totalproNetProfitMargin += parseFloat(item.proNetProfitMargin);
    });

    filteredData2.forEach((item) => {
      totalbsTotalEquityYoY += parseFloat(item.bsTotalEquityYoY);
      totalisNetIncomeYoY += parseFloat(item.isNetIncomeYoY);
      totalisOperatingProfitLossYoY += parseFloat(
        item.isOperatingProfitLossYoY
      );
      totalisRevenueYoY += parseFloat(item.isRevenueYoY);
    });

    const averageStaDebtRatio = (
      staDebtRatio.reduce((sum, item) => sum + parseFloat(item.value), 0) /
      staDebtRatio.length
    ).toFixed(1);

    const averageStaCurrentRatio = (
      staCurrentRatio.reduce((sum, item) => sum + parseFloat(item.value), 0) /
      staCurrentRatio.length
    ).toFixed(1);

    filteredData4.forEach((item) => {
      totalInventoryTurnoverPeriod += parseFloat(
        item.effInventoryTurnoverPeriod
      );
      totalPayablesTurnoverPeriod += parseFloat(item.effPayablesTurnoverPeriod);
      totalReceivablesTurnoverPeriod += parseFloat(
        item.effReceivablesTurnoverPeriod
      );
    });

    result[corp] = {
      profit: {
        prototalproROE: (totalproROE / filteredData1.length).toFixed(1),
        prototalproOperatingProfitMargin: (
          totalproOperatingProfitMargin / filteredData1.length
        ).toFixed(1),
        prototalproNetProfitMargin: (
          totalproNetProfitMargin / filteredData1.length
        ).toFixed(1),
      },
      growth: {
        grototalInventoryTurnoverPeriod: (
          totalbsTotalEquityYoY / filteredData2.length
        ).toFixed(1),
        grototalisNetIncomeYoY: (
          totalisNetIncomeYoY / filteredData2.length
        ).toFixed(1),
        grototalisOperatingProfitLossYoY: (
          totalisOperatingProfitLossYoY / filteredData2.length
        ).toFixed(1),
        grototalisRevenueYoY: (
          totalisRevenueYoY / filteredData2.length
        ).toFixed(1),
      },

      safety: {
        saaverageStaDebtRatio: averageStaDebtRatio,
        saaverageStaCurrentRatio: averageStaCurrentRatio,
      },

      efficiency: {
        effInventoryTurnoverPeriod: (
          totalInventoryTurnoverPeriod / filteredData4.length
        ).toFixed(1),
        effPayablesTurnoverPeriod: (
          totalPayablesTurnoverPeriod / filteredData4.length
        ).toFixed(1),
        effReceivablesTurnoverPeriod: (
          totalReceivablesTurnoverPeriod / filteredData4.length
        ).toFixed(1),
      },
    };

    fs.writeFileSync("stock_all_mean3.json", JSON.stringify(result, null, 2));
  }
}

main();
