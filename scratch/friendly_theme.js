const fs = require('fs');

// 1. page.tsx
let page = fs.readFileSync('src/app/page.tsx', 'utf8');
page = page.replace(/bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900/g, 'bg-gradient-to-br from-slate-900 via-blue-900/80 to-slate-800');
page = page.replace(/bg-slate-950\/80/g, 'bg-slate-900/60');
fs.writeFileSync('src/app/page.tsx', page);

// 2. pricing/page.tsx
let pricing = fs.readFileSync('src/app/(frontend)/pricing/page.tsx', 'utf8');
// Fix background to friendly blue
pricing = pricing.replace(/bg-slate-950/g, 'bg-gradient-to-br from-slate-900 via-blue-900/80 to-slate-800');
pricing = pricing.replace(/bg-slate-900\/60/g, 'bg-slate-900/60'); 
// Ensure header background is correct
pricing = pricing.replace(/className="fixed top-0 left-0 right-0 z-50 py-3 px-4 md:p-6 flex justify-between items-center bg-gradient-to-br from-slate-900 via-blue-900\/80 to-slate-800 backdrop-blur-md border-b border-white\/10"/g, 'className="fixed top-0 left-0 right-0 z-50 py-3 px-4 md:p-6 flex justify-between items-center bg-slate-900/60 backdrop-blur-md border-b border-white/10"');
fs.writeFileSync('src/app/(frontend)/pricing/page.tsx', pricing);

// 3. Navbar.tsx
let navbar = fs.readFileSync('src/components/frontend/Navbar.tsx', 'utf8');
// Fix logo text
const oldLogoNavbar = `<span className="text-lg md:text-3xl font-serif font-bold tracking-tight text-white uppercase leading-none">VIESA</span>`;
const newLogoText = `<span className="font-serif tracking-tight uppercase leading-none text-white flex items-baseline gap-2 notranslate">
              <span className="text-lg md:text-4xl font-bold">VIESA</span>
              <span className="text-xs md:text-xl font-medium text-slate-300">Automations</span>
            </span>`;
navbar = navbar.replace(oldLogoNavbar, newLogoText);
navbar = navbar.replace(/bg-slate-950\/80/g, 'bg-slate-900/60');
fs.writeFileSync('src/components/frontend/Navbar.tsx', navbar);

console.log('Friendly theme applied');
