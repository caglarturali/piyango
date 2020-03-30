import fs from 'fs';
import path from 'path';
import MarkdownIt from 'markdown-it';

/**
 * Generates documentation from src and
 * writes it into dest.
 * @param src Source file
 * @param dest Destination file
 */
const generateDocs = (
  src: string = 'README.md',
  dest: string = 'index.html',
) => {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });

  const data = fs.readFileSync(path.join(__dirname, '..', src)).toString();
  if (data) {
    const result = md.render(data);
    fs.writeFileSync(path.join(__dirname, '..', dest), generateHtml(result));
  }
};

/**
 * Generates a proper html document.
 * @param body Body of the page
 */
const generateHtml = (body: string) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css">
    <title>Piyango API</title>
    <link
      rel="shortcut icon"
      href="https://piyango.online/images/icons/icon-192.png"
      type="image/png"
    />
    <style>
      li {
        list-style: none;
      }
      a, code {
        font-size: 110%;
      }
    </style>
  </head>
  <body>
    <div class="container">
      ${body}
    </div>
  </body>
  </html>`;
};

generateDocs();
