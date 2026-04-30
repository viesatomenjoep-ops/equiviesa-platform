const fs = require('fs');
const path = require('path');

let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Color replacements to make it less kitschy and more luxurious
content = content.replace(/from-blue-400 via-purple-400 to-pink-400/g, 'from-white via-slate-200 to-slate-400');
content = content.replace(/bg-purple-500\/30/g, 'bg-slate-400\/10');
content = content.replace(/bg-blue-500\/30/g, 'bg-slate-300\/10');
content = content.replace(/from-blue-600 to-purple-600/g, 'bg-white text-slate-950 hover:bg-slate-200');
content = content.replace(/from-purple-600 to-blue-600/g, 'bg-white text-slate-950 hover:bg-slate-200');
content = content.replace(/bg-gradient-to-r bg-white/g, 'bg-white'); // Fix duplicate bg classes if any
content = content.replace(/from-blue-900\/40 to-purple-900\/40/g, 'bg-white/[0.02] border-white/[0.05]');
content = content.replace(/from-purple-900\/40 to-blue-900\/40/g, 'bg-white/[0.02] border-white/[0.05]');
content = content.replace(/from-blue-900\/30 to-purple-900\/30/g, 'bg-white/[0.02] border-white/[0.05]');
content = content.replace(/bg-gradient-to-br bg-white/g, 'bg-white'); 
content = content.replace(/from-blue-500 to-purple-500/g, 'bg-white/[0.05] border border-white/10');
content = content.replace(/from-purple-500 to-blue-500/g, 'bg-white/[0.05] border border-white/10');
content = content.replace(/from-purple-400 to-blue-400/g, 'from-white to-slate-400');
content = content.replace(/text-blue-200/g, 'text-slate-300');
content = content.replace(/text-blue-100/g, 'text-slate-300');
content = content.replace(/border-blue-500\/30/g, 'border-white/[0.05]');
content = content.replace(/border-purple-500\/30/g, 'border-white/[0.05]');
content = content.replace(/shadow-blue-500\/20/g, 'shadow-white/5');
content = content.replace(/shadow-purple-500\/20/g, 'shadow-white/5');
content = content.replace(/shadow-purple-500\/50/g, 'shadow-white/10');
content = content.replace(/shadow-blue-500\/50/g, 'shadow-white/10');
content = content.replace(/text-white/g, 'text-white'); // Leave text white

// Remove remaining gradients that were transformed into bg-white/[0.02]
content = content.replace(/bg-gradient-to-br bg-white\/\[0\.02\] border-white\/\[0\.05\] backdrop-blur-sm border border-white\/\[0\.05\]/g, 'bg-white/[0.02] backdrop-blur-md border border-white/[0.05]');

// 2. Add the All-in-One section
const newSection = `
      {/* Value Proposition Section */}
      <Section title="Premium Kwaliteit" subtitle="Een fractie van de marktprijs">
        <div className="bg-white/[0.02] backdrop-blur-md border border-white/[0.05] rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl mb-6 font-serif text-white">
              Waarom betalen voor losse tools als u een ultiem alles-in-één ecosysteem kunt hebben?
            </h3>
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              Normaal gesproken betaalt u torenhoge bedragen aan development agencies voor onoverzichtelijke systemen, losse CRM's en trage websites. VIESA Automations levert een naadloos geïntegreerd, state-of-the-art platform dat vele malen luxer is, tegen een absolute fractie van de concurrentie.
            </p>
            <div className="flex justify-center">
              <button className="px-8 py-4 bg-white text-slate-950 rounded-full hover:bg-slate-200 transition-colors font-bold flex items-center gap-2">
                Ontdek Onze Prijzen
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </Section>
`;

// Insert the new section right before Case Study
content = content.replace(/(\{\/\* Case Study \*\/)/, newSection + '\n      $1');

fs.writeFileSync('src/app/page.tsx', content);
console.log('Done');
