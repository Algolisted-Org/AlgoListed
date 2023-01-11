const request = require("request");
const cheerio = require("cheerio");

const url = "https://codeforces.com/contests";
request(url, (error, response, html) => {
  if (!error && response.statusCode === 200) {
    const $ = cheerio.load(html);
    const upcoming_contests = $("div.datatable")[1];
    $(upcoming_contests)
      .find("tr")
      .each((i, element) => {
        const cells = $(element).find("td");
        if (cells.length > 0) {
          const contest_name = $(cells[0]).text();
          const start_time = $(cells[1]).text();
          const duration = $(cells[2]).text();
          console.log(
            `Name: ${contest_name}, Start Time: ${start_time}, Duration: ${duration}`
          );
        }
      });
  } else {
    console.log(`Error: ${error}`);
  }
});
