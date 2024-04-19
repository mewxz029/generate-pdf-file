const { PDFDocument, StandardFonts } = require('pdf-lib');
const fs = require('fs');

// Generate a random string of a specific length
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Generate a PDF with random content to reach a target size in bytes
async function generatePDF(targetSizeInBytes) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 12;

  // Calculate the approximate size of each character in the PDF
  const characterSizeInBytes = 1;

  // Calculate the number of characters needed to reach the target size
  const numCharacters = Math.floor(targetSizeInBytes / characterSizeInBytes);

  // Generate random content to reach the target size
  const content = generateRandomString(numCharacters);

  // Add the content to the PDF
  page.drawText(content, { x: 50, y: page.getHeight() - 50, size: fontSize, font });

  // Save the PDF to a file
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('test.pdf', pdfBytes);
}

// Generate a PDF with a target size of around 15MB (15 * 1024 * 1024 bytes)
generatePDF(15 * 1024 * 1024)
  .then(() => console.log('PDF generated successfully'))
  .catch((error) => console.error('Error generating PDF:', error));
