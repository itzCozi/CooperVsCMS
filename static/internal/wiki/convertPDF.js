// convertPDF.js
import convertapi from 'convertapi';

const apiKey = 'lNs9pkMQPfKYdLyl';
const client = convertapi(apiKey);
const wikiPage = 'https://coopervscms.up.railway.app/internal/wiki/wiki.html';

export function convertToPDF() {
  client.convert('pdf', { Url: wikiPage }, 'web')
    .then(function(result) {
      result.saveFiles('wiki.pdf');
    })
    .catch(function(error) {
      console.error('Conversion error:', error);
    });
}