const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Extract CSS
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (styleMatch) {
    const cssContent = styleMatch[1];
    const inputCss = `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n${cssContent}`;
    fs.mkdirSync('src', { recursive: true });
    fs.writeFileSync('src/input.css', inputCss);
    html = html.replace(styleMatch[0], ''); // Remove <style> block
}

// 2. Extract JS
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
if (scriptMatch) {
    const jsContent = scriptMatch[1];
    fs.mkdirSync('assets/js', { recursive: true });
    fs.writeFileSync('assets/js/main.js', jsContent);
    html = html.replace(scriptMatch[0], '<script src="assets/js/main.js" defer></script>');
}

// 3. Remove Tailwind CDN and add Local CSS
html = html.replace('<script src="https://cdn.tailwindcss.com"></script>', '<link rel="stylesheet" href="assets/css/style.css">');

// 4. Add Meta Tags
const metaTags = `
  <meta name="description" content="Enxerga é um dos lados de uma parceria estratégica que eleva a presença digital de médicos e clínicas.">
  <meta property="og:title" content="ENXERGA – Produções Audiovisuais para Profissionais">
  <meta property="og:description" content="Enxerga é um dos lados de uma parceria estratégica que eleva a presença digital de médicos e clínicas.">
  <meta property="og:image" content="assets/images/og-image.png">
  <meta property="og:type" content="website">
  <link rel="icon" href="assets/images/favicon.png" type="image/png">
`;
html = html.replace('<title>ENXERGA – Produções Audiovisuais para Profissionais</title>', '<title>ENXERGA – Produções Audiovisuais para Profissionais</title>\n' + metaTags);

// 5. Update image paths
const images = [
    '0R5A3236.jpg', '0R5A5146-2-2.jpg', '0R5A8871-2.jpg',
    'Clara (12 de 114)-2-2.jpg', 'Katia (38 de 129)-2-2.jpg',
    'Paola_Todas (28 de 247)-2-2.jpg', 'logo enxerga.png'
];

images.forEach(img => {
    // Replace direct src exact match
    // Also encode URI for logo enxerga.png? Wait, HTML uses exact "logo enxerga.png" or "logo%20enxerga.png"
    html = html.split(`src="${img}"`).join(`src="assets/images/${img}"`);
    html = html.split(`src="${encodeURI(img)}"`).join(`src="assets/images/${img}"`);
});

// 6. Security on blank targets
html = html.split('target="_blank"').join('target="_blank" rel="noopener noreferrer"');

// 7. Add loading lazy and better alts for portfolio
// We can just regex replace the specific portfolio items by finding them.
// "0R5A3236.jpg" alt="Portfolio"
html = html.replace(
    'src="assets/images/0R5A3236.jpg" alt="Portfolio"',
    'src="assets/images/0R5A3236.jpg" alt="Fotografia profissional médica em estúdio" loading="lazy"'
);
html = html.replace(
    'src="assets/images/Clara (12 de 114)-2-2.jpg" alt="Portfolio"',
    'src="assets/images/Clara (12 de 114)-2-2.jpg" alt="Retrato profissional de médica" loading="lazy"'
);
html = html.replace(
    'src="assets/images/Katia (38 de 129)-2-2.jpg" alt="Portfolio"',
    'src="assets/images/Katia (38 de 129)-2-2.jpg" alt="Ensaio corporativo para profissionais da saúde" loading="lazy"'
);
html = html.replace(
    'src="assets/images/Paola_Todas (28 de 247)-2-2.jpg" alt="Portfolio"',
    'src="assets/images/Paola_Todas (28 de 247)-2-2.jpg" alt="Fotografia de equipe médica" loading="lazy"'
);
html = html.replace(
    'src="assets/images/0R5A8871-2.jpg" alt="Portfolio"',
    'src="assets/images/0R5A8871-2.jpg" alt="Sessão de fotos para branding médico" loading="lazy"'
);


fs.writeFileSync('index.html', html);
console.log('Done modifying index.html');
