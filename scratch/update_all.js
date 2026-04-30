const fs = require('fs');

// 1. Update NavLinks to make texts much bigger
let navLinks = fs.readFileSync('src/components/frontend/NavLinks.tsx', 'utf8');
navLinks = navLinks.replace(/text-base sm:text-lg/g, 'text-2xl sm:text-3xl md:text-4xl');
navLinks = navLinks.replace(/text-base/g, 'text-2xl sm:text-3xl md:text-4xl');
fs.writeFileSync('src/components/frontend/NavLinks.tsx', navLinks);

// 2. Update Navbar to dark mode and smaller VIESA text
let navbar = fs.readFileSync('src/components/frontend/Navbar.tsx', 'utf8');
// Change bg from light to dark
navbar = navbar.replace('bg-[#e6e6e6]/95', 'bg-slate-950/80');
navbar = navbar.replace('border-gray-100', 'border-white/10');
// Change text to VIESA
navbar = navbar.replace('text-2xl font-serif font-bold tracking-tight text-primary uppercase leading-none', 'text-lg md:text-3xl font-serif font-bold tracking-tight text-white uppercase leading-none');
navbar = navbar.replace('Viesa Automations', 'VIESA');
fs.writeFileSync('src/components/frontend/Navbar.tsx', navbar);

// 3. Update Pricing Page
let pricing = fs.readFileSync('src/app/(frontend)/pricing/page.tsx', 'utf8');
// Fix prices
pricing = pricing.replace('€ {billingCycle === \'yearly\' ? \'490\' : \'49\'}', '€ {billingCycle === \'yearly\' ? \'4.990\' : \'499\'}');
pricing = pricing.replace('€ {billingCycle === \'yearly\' ? \'1.490\' : \'149\'}', '€ {billingCycle === \'yearly\' ? \'9.990\' : \'999\'}');
pricing = pricing.replace('€ {billingCycle === \'yearly\' ? \'3.490\' : \'349\'}', 'Op Maat');
// Fix packages names and descriptions
pricing = pricing.replace('Basic', 'Viesa Pro');
pricing = pricing.replace('Essential tools for private owners and small stables.', 'Het alles-in-één fundament voor uw digitale groei.');
pricing = pricing.replace('Up to 10 horses', 'Compleet CRM & CMS Systeem');
pricing = pricing.replace('Basic Stable Management', 'Lead Automatisering');
pricing = pricing.replace('Digital Task Board', 'SEO & Website Optimalisatie');
pricing = pricing.replace('Basic Feeding Schedules', 'Maandelijks opzegbaar');
pricing = pricing.replace('1 Admin Account', 'Inclusief hosting & onderhoud');

pricing = pricing.replace('Premium', 'Enterprise Blueprint');
pricing = pricing.replace('Professional operations aiming to optimize their daily workflow.', 'Voor bedrijven die de markt volledig willen domineren.');
pricing = pricing.replace('Up to 40 horses', 'Volledige ERP Integratie');
pricing = pricing.replace('Breeding Module (Scans, Cycles)', 'AI Klantenservice Bots');
pricing = pricing.replace('Health & Medical Log', 'Custom Workflows & Dashboards');
pricing = pricing.replace('Advanced Custom Feeding', 'Dedicated Account Manager');
pricing = pricing.replace('5 Staff Accounts (Role-based)', 'Gegarandeerde top 3 Google Ranking');

// Remove the third package (Ultra) completely since we only want two.
// We'll just do it by string replacement.
pricing = pricing.replace(/\{\/\* ULTRA \*\/\}(.|\n)*?(?=\{\/\* Payment Methods)/, '');
pricing = pricing.replace('grid-cols-1 md:grid-cols-3', 'grid-cols-1 md:grid-cols-2 max-w-5xl');

// Make it dark mode natively
pricing = pricing.replace(/bg-white dark:bg-\[\#0a0a0a\]/g, 'bg-slate-950 text-white');
pricing = pricing.replace(/text-primary dark:text-white/g, 'text-white');
pricing = pricing.replace(/bg-white dark:bg-gray-900/g, 'bg-slate-900');
pricing = pricing.replace(/text-gray-600 dark:text-gray-400/g, 'text-slate-400');
pricing = pricing.replace(/text-gray-500/g, 'text-slate-400');
pricing = pricing.replace(/text-gray-900/g, 'text-white');
pricing = pricing.replace(/border-gray-200 dark:border-gray-800/g, 'border-white/10');
pricing = pricing.replace(/border-gray-100 dark:border-gray-800/g, 'border-white/10');
pricing = pricing.replace(/bg-primary text-white/g, 'bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 text-white');
pricing = pricing.replace(/bg-white border-2 border-primary text-primary/g, 'bg-transparent border-2 border-white/20 text-white hover:bg-white hover:text-slate-950');

// Add the 30% discount text
const discountText = `
        <div className="mb-12 bg-gradient-to-r from-blue-900/20 to-slate-800/40 border border-blue-500/30 rounded-2xl p-6 md:p-8 text-center max-w-4xl mx-auto shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-2">💎 Exclusieve Loyaliteitsbonus</h3>
          <p className="text-lg text-blue-200">
            Blijft u het eerste jaar onafgebroken lid? Dan belonen wij uw vertrouwen met <span className="font-bold text-white text-xl">30% korting</span> op uw abonnement in het gehele tweede jaar!
          </p>
        </div>
`;

pricing = pricing.replace(/\{\/\* Pricing Cards \*\/\}/, discountText + '\n      {/* Pricing Cards */}');

fs.writeFileSync('src/app/(frontend)/pricing/page.tsx', pricing);

console.log('Done');
