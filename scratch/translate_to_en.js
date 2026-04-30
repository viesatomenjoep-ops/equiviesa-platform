const fs = require('fs');

let pageContent = fs.readFileSync('src/app/page.tsx', 'utf8');

// Replace Dutch strings with English strings
const translations = [
  ['De Blauwdruk voor Digitale Dominantie in de Bouw', 'The Blueprint for Digital Dominance'],
  ['Start Uw Transformatie', 'Start Your Transformation'],
  ['Bekijk Case Studies', 'View Case Studies'],
  ['De Visie', 'The Vision'],
  ['Een Volledig Geautomatiseerd Fundament', 'A Fully Automated Foundation'],
  ['In de huidige markt wint niet het bedrijf dat het hardste werkt, maar het bedrijf dat het slimste is ingericht.', 'In today\'s market, it is not the company that works the hardest that wins, but the company that operates the smartest.'],
  ['VIESA Automations biedt geen losse tools, maar een integrale <span className="text-blue-400">"Blueprint"</span>.', 'VIESA Automations does not just offer standalone tools, but a complete <span className="text-blue-400">"Blueprint"</span>.'],
  ['Wij automatiseren uw bedrijf van de allereerste klik van een potentiële klant tot de uiteindelijke facturatie en nazorg.', 'We automate your business from the very first click of a potential client to the final invoicing and aftercare.'],
  ['Met onze systemen bouwt u een schaalbaar model waarbij u niet meer afhankelijk bent van handmatige processen.', 'With our systems, you build a scalable model where you are no longer dependent on manual processes.'],
  ['Google Dominantie', 'Google Dominance'],
  ['De Weg naar Nummer 1', 'The Path to Number 1'],
  ['Lokale SEO', 'Local SEO'],
  ['Wij zorgen dat u de eerste keuze bent in uw regio.', 'We ensure you are the number one choice in your region.'],
  ['Nationale Autoriteit', 'National Authority'],
  ['Schaalbare content clusters die u positioneren als dé expert.', 'Scalable content clusters that position you as the ultimate expert.'],
  ['Premium Kwaliteit', 'Premium Quality'],
  ['Een fractie van de marktprijs', 'A Fraction of the Market Price'],
  ['Waarom betalen voor losse tools als u een ultiem alles-in-één ecosysteem kunt hebben?', 'Why pay for separate tools when you can have the ultimate all-in-one ecosystem?'],
  ['Normaal gesproken betaalt u torenhoge bedragen aan development agencies voor onoverzichtelijke systemen, losse CRM\'s en trage websites. VIESA Automations levert een naadloos geïntegreerd, state-of-the-art platform dat vele malen luxer is, tegen een absolute fractie van de concurrentie.', 'Typically, you pay exorbitant amounts to development agencies for disjointed systems, standalone CRMs, and slow websites. VIESA Automations delivers a seamlessly integrated, state-of-the-art platform that is vastly superior, for an absolute fraction of the cost.'],
  ['Ontdek Onze Prijzen', 'Discover Our Pricing'],
  ['Egaliseren.nl - De Potentie van Automatisering', 'Egaliseren.nl - The Power of Automation'],
  ['Google Ranking', 'Google Ranking'],
  ['Door gerichte SEO-clusters claimen we de top 3 posities op zoekwoorden zoals \'vloer egaliseren\'', 'Through targeted SEO clusters, we claim top 3 positions for high-value keywords.'],
  ['Interactive Reviews', 'Interactive Reviews'],
  ['Bezoekers zien direct klikbare, geverifieerde reviews die vertrouwen wekken', 'Visitors instantly see clickable, verified reviews that build immense trust.'],
  ['Lead-to-Order', 'Lead-to-Order'],
  ['Zodra iemand op de site komt, start de automatisering. Een offerteaanvraag wordt direct in het CRM geschoten', 'The moment someone lands on the site, automation kicks in. Quote requests are instantly pushed to the CRM.'],
  ['Sluit je aan bij de elite van digitale koplopers', 'Join the elite circle of digital pioneers'],
  ['Krijg toegang tot ons exclusieve netwerk, geavanceerde blueprint-strategieën, en premium automatiseringstools. Met Viesa Pro til je jouw digitale ecosysteem en bedrijfsgroei naar het allerhoogste niveau.', 'Gain access to our exclusive network, advanced blueprint strategies, and premium automation tools. With Viesa Pro, you elevate your digital ecosystem and business growth to the highest possible level.'],
  ['Word Pro Member', 'Become a Pro Member'],
  ['Klaar voor Digitale Dominantie?', 'Ready for Digital Dominance?'],
  ['Start vandaag nog met de automatisering van uw bedrijf', 'Start automating your business today'],
  ['Neem Contact Op', 'Get in Touch'],
  ['Start vandaag nog met de automatisering van uw bouwbedrijf', 'Start automating your business today']
];

for (const [nl, en] of translations) {
  pageContent = pageContent.split(nl).join(en);
}

fs.writeFileSync('src/app/page.tsx', pageContent);

let layoutContent = fs.readFileSync('src/app/layout.tsx', 'utf8');
layoutContent = layoutContent.replace('De Blauwdruk voor Digitale Dominantie', 'The Blueprint for Digital Dominance');
layoutContent = layoutContent.replace('De Blauwdruk voor Digitale Dominantie', 'The Blueprint for Digital Dominance');
layoutContent = layoutContent.replace('Volledig geautomatiseerde processen van lead tot factuur.', 'Fully automated processes from lead to invoice.');
layoutContent = layoutContent.replace('Volledig geautomatiseerde processen van lead tot factuur.', 'Fully automated processes from lead to invoice.');
// Also change the lang tag to en
layoutContent = layoutContent.replace('<html lang="nl">', '<html lang="en">');
fs.writeFileSync('src/app/layout.tsx', layoutContent);

let pricingContent = fs.readFileSync('src/app/pricing/page.tsx', 'utf8');
const pricingTranslations = [
  ['Transparante Investering.', 'Transparent Investment.'],
  ['Maximale Dominantie.', 'Maximum Dominance.'],
  ['Geen wurgcontracten. Ons platform is', 'No lock-in contracts. Our platform is'],
  ['maandelijks opzegbaar', 'cancellable monthly'],
  ['💎 Exclusieve Loyaliteitsbonus', '💎 Exclusive Loyalty Bonus'],
  ['Blijft u het eerste jaar onafgebroken lid? Dan belonen wij uw vertrouwen met <span className="font-bold text-white text-xl">30% korting</span> op uw volledige abonnement in het gehele tweede jaar!', 'If you remain a continuous member for the first year, we reward your loyalty with a <span className="font-bold text-white text-xl">30% discount</span> on your subscription for the entire second year!'],
  ['Het alles-in-één fundament voor uw digitale groei.', 'The all-in-one foundation for your digital growth.'],
  ['/maand', '/month'],
  ['Compleet CRM & CMS Systeem', 'Complete CRM & CMS System'],
  ['Lead Automatisering', 'Lead Automation'],
  ['SEO & Website Optimalisatie', 'SEO & Website Optimization'],
  ['Maandelijks opzegbaar', 'Monthly cancellable'],
  ['Inclusief hosting & onderhoud', 'Includes hosting & maintenance'],
  ['Start Nu', 'Start Now'],
  ['Meest Gekozen', 'Most Popular'],
  ['Enterprise Blueprint', 'Enterprise Blueprint'],
  ['Voor bedrijven die de markt volledig willen domineren.', 'For companies that want to completely dominate the market.'],
  ['Op Maat', 'Custom'],
  ['Volledige ERP Integratie', 'Full ERP Integration'],
  ['AI Klantenservice Bots', 'AI Customer Service Bots'],
  ['Custom Workflows & Dashboards', 'Custom Workflows & Dashboards'],
  ['Dedicated Account Manager', 'Dedicated Account Manager'],
  ['Gegarandeerde top 3 Google Ranking', 'Guaranteed top 3 Google Ranking'],
  ['Plan Strategiegesprek', 'Schedule Strategy Call']
];

for (const [nl, en] of pricingTranslations) {
  pricingContent = pricingContent.split(nl).join(en);
}

fs.writeFileSync('src/app/pricing/page.tsx', pricingContent);

console.log('Translations applied successfully');
