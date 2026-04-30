import { getTeamMembers } from '@/app/actions/team'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'About Us | VIESA Automations',
  description: 'Learn more about our passion for elite automations and our digital blueprint.',
}

export const dynamic = 'force-dynamic'

export default async function AboutPage() {
  let team: any[] = [];
  try {
    const rawTeam = await getTeamMembers() || [];
    team = [...rawTeam];
    
    // Filter out Tyler if he exists in DB
    team = team.filter((m: any) => !m.name.toLowerCase().includes('tyler'));

    // Hardcode overrides for Tom van Biene and Joep Hellemons (Founders)
    let tom = team.find((m: any) => m.name.toLowerCase().includes('tom'));
    let joep = team.find((m: any) => m.name.toLowerCase().includes('joep'));
    
    const tomBio = "As Co-Founder & Lead Developer at VIESA Automations, Tom brings specialized experience in designing, hosting, and managing high-end CMS and website infrastructures. His architectural vision ensures that our platforms are robust, incredibly fast, and secure.";
    const joepBio = "As Co-Founder & Director of Strategy, Joep leads the vision for scaling operations. He focuses on high-end digital transformations, process automation, and establishing powerful strategic partnerships for our enterprise clients.";
    
    if (tom) {
      tom.role = 'Co-Founder & Lead Developer';
      tom.bio = tomBio;
      tom.sort_order = -10;
    } else {
      tom = {
        id: 'tom-override',
        name: 'Tom van Biene',
        role: 'Co-Founder & Lead Developer',
        bio: tomBio,
        image_url: null,
        sort_order: -10
      };
      team.push(tom);
    }
    
    if (joep) {
      joep.sort_order = -9;
      joep.role = 'Co-Founder & Director of Strategy';
      joep.bio = joepBio;
    } else {
      joep = {
        id: 'joep-override',
        name: 'Joep Hellemons',
        role: 'Co-Founder & Director of Strategy',
        bio: joepBio,
        image_url: null,
        sort_order: -9
      };
      team.push(joep);
    }
    
    team.sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0));
  } catch (error) {
    console.error("Error fetching team members:", error);
  }

  return (
    <div className="pt-24 md:pt-32 pb-16 min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/80 to-slate-800 text-white font-sans">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tight">
            About Us
          </h1>
          <h2 className="text-2xl md:text-3xl font-serif text-sky-400">The Blueprint for Digital Dominance</h2>
          
          <div className="space-y-6 text-xl text-slate-300 font-medium leading-relaxed text-center sm:text-left bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-md shadow-2xl">
            <p>
              VIESA Automations was founded with a singular vision: to eliminate the friction in modern business through state-of-the-art automation. We recognized that the companies winning in today's market are not necessarily the ones working the hardest, but the ones working the smartest.
            </p>
            <p>
              By leveraging Next.js architectures, advanced AI integrations, and custom CRM/ERP pipelines, we transform traditional businesses into scalable, highly-efficient digital machines. We automate the entire lifecycle—from the very first click of a potential lead, to the final invoice and customer aftercare.
            </p>
            <p>
              Our team consists of elite developers, SEO strategists, and digital architects who are passionate about pushing the boundaries of what is possible on the web. We don't just build websites; we engineer complete, customized ecosystems that guarantee maximum operational efficiency and market dominance.
            </p>
          </div>
          
          <div className="mt-12">
            <Link href="/pricing" className="inline-block bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-slate-200 transition-colors shadow-xl">
              Start Your Journey
            </Link>
          </div>
        </div>
      </div>

      <div className="py-24 border-t border-white/10 bg-slate-900/40 relative z-10">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white">
              Meet The Team
            </h2>
            <div className="w-24 h-1 bg-sky-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl mx-auto">
            {team.map((member: any) => (
              <div key={member.id} className="group flex flex-col items-center text-center bg-white/[0.02] border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-300">
                <div className="relative w-48 h-48 mb-8 rounded-full overflow-hidden shadow-2xl border-4 border-slate-800 group-hover:border-sky-400 transition-colors duration-300">
                  {member.image_url ? (
                    <Image src={member.image_url} alt={member.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                      <span className="text-6xl text-slate-500 font-serif">{member.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <h3 className="text-3xl font-serif font-bold text-white mb-2">{member.name}</h3>
                <p className="text-lg text-sky-400 uppercase tracking-widest font-bold mb-6">{member.role}</p>
                {member.bio && (
                  <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
                    {member.bio}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
