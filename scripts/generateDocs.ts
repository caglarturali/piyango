import fs from 'fs';
import path from 'path';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

fs.readFile(path.join(__dirname, '..', 'README.md'), (err, data) => {
  if (err) {
    // tslint:disable-next-line: no-console
    return console.log(err);
  }

  const result = md.render(data.toString());
  fs.writeFileSync(
    path.join(__dirname, '..', 'index.html'),
    generateHtml(result),
  );
});

const generateHtml = (contents: string) => {
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
      ${contents}
    </div>
  </body>
  </html>`;
};
