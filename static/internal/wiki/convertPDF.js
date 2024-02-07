import convertapi from "convertapi";
              
const apiKey = "lNs9pkMQPfKYdLyl";
const client = convertapi(apiKey);
const wikiPage = "https://coopervscms.up.railway.app/internal/wiki/wiki.html"; // YES I STILL USE RAILWAYS DOMAIN NAME

function convertToPDF() {
  // Convert the current webpage to PDF and save it to the local machine
  client
    .convert("pdf", { Url: wikiPage }, "web")
    .then(function (result) {
      result.saveFiles("wiki.pdf");
    })
    .catch(function (error) {
      console.error("Conversion error:", error);
    });
}
