const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') && !fullPath.endsWith('layout.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      // Regex to remove export const metadata = { ... };
      // This is tricky, so we'll just replace 'Equiviesa' and 'sport horses' in the file instead!
      
      const original = content;
      content = content.replace(/Equiviesa/gi, 'Viesa Automations');
      content = content.replace(/Equivest/gi, 'Viesa Automations');
      content = content.replace(/sport horses/gi, 'automations');
      content = content.replace(/sport horse/gi, 'automation');
      content = content.replace(/showjumpers/gi, 'workflows');
      content = content.replace(/showjumping/gi, 'automations');
      content = content.replace(/jumpers/gi, 'workflows');
      content = content.replace(/hunters/gi, 'processen');
      content = content.replace(/equitation horse/gi, 'business system');
      content = content.replace(/equestrian/gi, 'digitale');
      content = content.replace(/Belgium/gi, 'Nederland');
      content = content.replace(/invest in/gi, 'start met');
      content = content.replace(/investment/gi, 'transformatie');
      content = content.replace(/investments/gi, 'transformaties');
      content = content.replace(/investors/gi, 'partners');
      
      if (original !== content) {
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

processDir('src/app');
processDir('src/components');
console.log('Done');
