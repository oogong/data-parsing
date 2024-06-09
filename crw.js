import fs from "fs";
import axios from "axios";
import * as cheerio from "cheerio";

const filePath = "./stk/stock.json";
let codeStock = []; // Initialize an empty array to store item.Code values

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  let testData;
  try {
    testData = JSON.parse(data);
  } catch (parseErr) {
    console.error("Error parsing JSON:", parseErr);
    return;
  }

  testData.forEach((item) => {
    // Check if the type of Code is number
    if (typeof item.Code === "number") {
      // Convert number to string
      item.Code = item.Code.toString();
    }
    codeStock.push(item.Code); 
  });

  console.log(codeStock); 
});
 
const result = {}

async function fetchfunction(url){
    const resp = await axios.get(url);
    const html = resp.data;

    const $ = cheerio.load(html);
    const stockData = [];

    $("p_grid1_17").e
    

}


async function fetchData(){
    for(const code of codeStock) {
    
        const url = `https://comp.fnguide.com/SVO2/ASP/SVD_FinanceRatio.asp?pGB=1&gicode=A${codeStock}&cID=&MenuYn=Y&ReportGB=&NewMenuID=104&stkGb=701`; 
        const code_content = await fetchfunction(url);
        result[code] = code_content;
    }

    }

    

