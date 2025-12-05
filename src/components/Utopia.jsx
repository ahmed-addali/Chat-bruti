import { Leaf, Wrench, GraduationCap, Heart, Sparkles, Shield, Globe, Cpu, TreePine, Users, BookOpen, Rocket, Star, Award, Zap, Lock, Unlock, Code, Server, Coffee, Music, Gamepad2, Film, Palette, Terminal, GitBranch, Database, Cloud, Wifi, Battery, Recycle, Sun, Moon, CheckCircle, ArrowRight, Quote, Calendar, MapPin, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Utopia() {
  const [activeTab, setActiveTab] = useState('forge');
  const [counter, setCounter] = useState({ users: 0, tools: 0, schools: 0, co2: 0 });
  
  // Animation des compteurs
  useEffect(() => {
    const targets = { users: 2847, tools: 156, schools: 42, co2: 1250 };
    const duration = 2000;
    const steps = 60;
    const increment = {
      users: targets.users / steps,
      tools: targets.tools / steps,
      schools: targets.schools / steps,
      co2: targets.co2 / steps,
    };
    
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCounter({
        users: Math.min(Math.floor(increment.users * step), targets.users),
        tools: Math.min(Math.floor(increment.tools * step), targets.tools),
        schools: Math.min(Math.floor(increment.schools * step), targets.schools),
        co2: Math.min(Math.floor(increment.co2 * step), targets.co2),
      });
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, []);

  // Logiciels libres alternatifs
  const freeAlternatives = [
    { proprietary: 'Microsoft Office', free: 'LibreOffice', icon: BookOpen, color: 'from-green-400 to-emerald-500' },
    { proprietary: 'Adobe Photoshop', free: 'GIMP', icon: Palette, color: 'from-purple-400 to-pink-500' },
    { proprietary: 'Windows', free: 'Linux (Ubuntu, Mint...)', icon: Terminal, color: 'from-orange-400 to-red-500' },
    { proprietary: 'Adobe Premiere', free: 'Kdenlive / DaVinci', icon: Film, color: 'from-blue-400 to-cyan-500' },
    { proprietary: 'Slack', free: 'Mattermost / Rocket.Chat', icon: Users, color: 'from-pink-400 to-rose-500' },
    { proprietary: 'Google Drive', free: 'Nextcloud', icon: Cloud, color: 'from-cyan-400 to-blue-500' },
    { proprietary: 'GitHub', free: 'GitLab / Gitea', icon: GitBranch, color: 'from-amber-400 to-orange-500' },
    { proprietary: 'Discord', free: 'Element (Matrix)', icon: Music, color: 'from-indigo-400 to-purple-500' },
  ];

  // Timeline de l'histoire du libre
  const timeline = [
    { year: '1983', event: 'Richard Stallman lance le projet GNU', icon: Terminal },
    { year: '1991', event: 'Linus Torvalds crée Linux', icon: Code },
    { year: '1998', event: 'Naissance du terme "Open Source"', icon: Unlock },
    { year: '2004', event: 'Ubuntu démocratise Linux', icon: Users },
    { year: '2008', event: 'GitHub révolutionne le partage de code', icon: GitBranch },
    { year: '2024', event: 'NIRD Village est créé !', icon: TreePine },
  ];

  // Témoignages
  const testimonials = [
    { name: 'Marie L.', role: 'Professeure de SVT', text: 'Depuis que notre lycée est passé sur Linux, les élèves sont plus curieux et comprennent mieux comment fonctionne leur outil de travail.', avatar: '👩‍🏫' },
    { name: 'Thomas K.', role: 'Élève Terminale', text: 'J\'ai découvert la programmation grâce aux logiciels libres. Maintenant je contribue à des projets open source !', avatar: '👨‍💻' },
    { name: 'Sophie M.', role: 'Directrice d\'école', text: 'Nous avons économisé 15 000€ de licences par an. Cet argent finance maintenant des sorties pédagogiques.', avatar: '👩‍💼' },
  ];

  // Principes du libre
  const freedoms = [
    { num: '0', title: 'Liberté d\'utiliser', desc: 'Utiliser le programme pour n\'importe quel usage', icon: Rocket },
    { num: '1', title: 'Liberté d\'étudier', desc: 'Étudier le fonctionnement et l\'adapter', icon: BookOpen },
    { num: '2', title: 'Liberté de redistribuer', desc: 'Partager des copies pour aider les autres', icon: Users },
    { num: '3', title: 'Liberté d\'améliorer', desc: 'Améliorer et publier les améliorations', icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes leaf-fall {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
          50% { box-shadow: 0 0 40px rgba(16, 185, 129, 0.6); }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.8);
        }
        .glass-card-dark {
          background: rgba(16, 185, 129, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(16, 185, 129, 0.3);
        }
        .float-animation { animation: float 3s ease-in-out infinite; }
        .fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .sparkle { animation: sparkle 2s ease-in-out infinite; }
        .leaf { animation: leaf-fall 10s linear infinite; }
        .pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .slide-left { animation: slide-in-left 0.6s ease-out forwards; }
        .slide-right { animation: slide-in-right 0.6s ease-out forwards; }
        .bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
        .gradient-text {
          background: linear-gradient(135deg, #10b981, #059669, #047857);
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Floating leaves background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="leaf absolute text-emerald-300"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 6}s`,
            }}
          >
            <Leaf className="w-6 h-6" />
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 pt-12 pb-8 px-6 text-center fade-in-up">
        <div className="inline-flex items-center gap-3 mb-4">
          <TreePine className="w-10 h-10 text-emerald-600 float-animation" />
          <h1 className="text-5xl md:text-7xl font-bold gradient-text">
            NIRD Village
          </h1>
          <TreePine
            className="w-10 h-10 text-emerald-600 float-animation"
            style={{ animationDelay: "0.5s" }}
          />
        </div>
        <p className="text-xl md:text-2xl text-emerald-700 font-light max-w-3xl mx-auto">
          Bienvenue dans le village de la résistance numérique 🌿
        </p>
        <p className="text-lg text-emerald-600/70 mt-2">
          <span className="font-bold">N</span>umérique{" "}
          <span className="font-bold">I</span>nclusif,{" "}
          <span className="font-bold">R</span>esponsable et{" "}
          <span className="font-bold">D</span>urable
        </p>
      </header>

      {/* Victory Message */}
      <div
        className="relative z-10 max-w-4xl mx-auto px-6 mb-12 fade-in-up"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="glass-card rounded-3xl p-8 text-center shadow-xl shadow-emerald-100 pulse-glow">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full float-animation">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-emerald-800 mb-4">
            🎉 Vous avez vaincu GOLIATH-OS !
          </h2>
          <p className="text-lg text-emerald-700 mb-6">
            En invoquant le pouvoir du{" "}
            <span className="font-bold text-emerald-600">logiciel libre</span>,
            vous avez brisé les chaînes de la dépendance numérique. Bienvenue
            dans un monde où la technologie est au service de tous.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
              🔓 Liberté retrouvée
            </span>
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              🌍 Souveraineté numérique
            </span>
            <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
              ♻️ Durabilité
            </span>
          </div>
        </div>
      </div>

      {/* Stats Counter Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <div className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-transform">
            <Users className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
            <div className="text-4xl font-bold text-emerald-800">
              {counter.users.toLocaleString()}
            </div>
            <div className="text-emerald-600 text-sm">Utilisateurs libérés</div>
          </div>
          <div className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-transform">
            <Wrench className="w-10 h-10 text-amber-500 mx-auto mb-2" />
            <div className="text-4xl font-bold text-emerald-800">
              {counter.tools}
            </div>
            <div className="text-emerald-600 text-sm">Outils libres</div>
          </div>
          <div className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-transform">
            <GraduationCap className="w-10 h-10 text-purple-500 mx-auto mb-2" />
            <div className="text-4xl font-bold text-emerald-800">
              {counter.schools}
            </div>
            <div className="text-emerald-600 text-sm">Écoles converties</div>
          </div>
          <div className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-transform">
            <Leaf className="w-10 h-10 text-green-500 mx-auto mb-2" />
            <div className="text-4xl font-bold text-emerald-800">
              {counter.co2}kg
            </div>
            <div className="text-emerald-600 text-sm">CO₂ économisé</div>
          </div>
        </div>
      </div>

      {/* Les 4 Libertés du Logiciel Libre */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-emerald-800 mb-4">
          🔓 Les 4 Libertés Fondamentales
        </h2>
        <p className="text-center text-emerald-600 mb-10 max-w-2xl mx-auto">
          Définies par Richard Stallman, ces libertés sont le fondement du
          logiciel libre
        </p>
        <div className="grid md:grid-cols-4 gap-6">
          {freedoms.map((freedom, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 hover:shadow-xl"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-white">
                  {freedom.num}
                </span>
              </div>
              <freedom.icon className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
              <h3 className="font-bold text-emerald-800 mb-2">
                {freedom.title}
              </h3>
              <p className="text-emerald-600 text-sm">{freedom.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Alternatives Libres Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-emerald-800 mb-4">
          🔄 Alternatives Libres
        </h2>
        <p className="text-center text-emerald-600 mb-10 max-w-2xl mx-auto">
          Pour chaque logiciel propriétaire, il existe une alternative libre et
          gratuite !
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {freeAlternatives.map((alt, idx) => (
            <div
              key={idx}
              className="glass-card rounded-xl p-4 hover:scale-105 transition-all duration-300 group"
            >
              <div
                className={`w-12 h-12 bg-gradient-to-br ${alt.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
              >
                <alt.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-red-400 text-sm line-through mb-1">
                {alt.proprietary}
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-700 font-bold">{alt.free}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Cards Grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-emerald-800 mb-10">
          🏘️ Les Quartiers du Village
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* La Forge Card */}
          <div
            className="glass-card rounded-3xl p-8 shadow-xl shadow-emerald-100/50 hover:shadow-2xl hover:shadow-emerald-200/50 transition-all duration-500 hover:-translate-y-2 fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl sparkle">
                <Wrench className="w-10 h-10 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-emerald-800 text-center mb-4">
              🔨 La Forge
            </h3>
            <p className="text-emerald-700 text-center mb-6">
              Des outils libres et puissants pour remplacer les solutions
              propriétaires coûteuses.
            </p>
            <ul className="space-y-3 text-emerald-600">
              <li className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>
                  <strong>OpenSAND</strong> par Viveris
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>
                  <strong>ROHC</strong> - Compression d'en-têtes
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>LibreOffice, GIMP, Blender...</span>
              </li>
              <li className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>Audacity, VLC, Inkscape...</span>
              </li>
            </ul>
          </div>

          {/* L'Atelier Card */}
          <div
            className="glass-card rounded-3xl p-8 shadow-xl shadow-emerald-100/50 hover:shadow-2xl hover:shadow-emerald-200/50 transition-all duration-500 hover:-translate-y-2 fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="flex justify-center mb-6">
              <div
                className="p-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl sparkle"
                style={{ animationDelay: "0.3s" }}
              >
                <Cpu className="w-10 h-10 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-emerald-800 text-center mb-4">
              🛠️ L'Atelier
            </h3>
            <p className="text-emerald-700 text-center mb-6">
              Réparer, réutiliser, prolonger la vie du matériel contre
              l'obsolescence programmée.
            </p>
            <ul className="space-y-3 text-emerald-600">
              <li className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-rose-500" />
                <span>Linux sur vieux PC</span>
              </li>
              <li className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-rose-500" />
                <span>Repair Cafés éducatifs</span>
              </li>
              <li className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-rose-500" />
                <span>Réemploi du matériel scolaire</span>
              </li>
              <li className="flex items-center gap-3">
                <Recycle className="w-5 h-5 text-green-500" />
                <span>Recyclage responsable</span>
              </li>
            </ul>
          </div>

          {/* L'École Libre Card */}
          <div
            className="glass-card rounded-3xl p-8 shadow-xl shadow-emerald-100/50 hover:shadow-2xl hover:shadow-emerald-200/50 transition-all duration-500 hover:-translate-y-2 fade-in-up"
            style={{ animationDelay: "0.8s" }}
          >
            <div className="flex justify-center mb-6">
              <div
                className="p-4 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl sparkle"
                style={{ animationDelay: "0.6s" }}
              >
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-emerald-800 text-center mb-4">
              📚 L'École Libre
            </h3>
            <p className="text-emerald-700 text-center mb-6">
              Former les citoyens numériques de demain à l'autonomie
              technologique.
            </p>
            <ul className="space-y-3 text-emerald-600">
              <li className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-purple-500" />
                <span>Lycée Carnot, pionnier NIRD</span>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-purple-500" />
                <span>Ateliers Linux pour élèves</span>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-purple-500" />
                <span>Souveraineté des données</span>
              </li>
              <li className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-indigo-500" />
                <span>Ressources éducatives libres</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-emerald-800 mb-4">
          📜 L'Histoire du Libre
        </h2>
        <p className="text-center text-emerald-600 mb-10">
          40 ans de combat pour la liberté numérique
        </p>
        <div className="relative">
          {/* Ligne verticale */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-emerald-300 via-green-400 to-teal-500 rounded-full" />

          {timeline.map((item, idx) => (
            <div
              key={idx}
              className={`relative flex items-center mb-8 ${
                idx % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              <div
                className={`w-5/12 ${
                  idx % 2 === 0 ? "text-right pr-8" : "text-left pl-8"
                }`}
              >
                <div className="glass-card rounded-xl p-4 inline-block hover:scale-105 transition-transform">
                  <div className="text-2xl font-bold text-emerald-500">
                    {item.year}
                  </div>
                  <div className="text-emerald-700">{item.event}</div>
                </div>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white rounded-full border-4 border-emerald-400 flex items-center justify-center z-10 hover:scale-125 transition-transform">
                <item.icon className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="w-5/12" />
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-emerald-800 mb-4">
          💬 Témoignages
        </h2>
        <p className="text-center text-emerald-600 mb-10">
          Ils ont fait le choix du libre
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((test, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 hover:scale-105 transition-all duration-300"
            >
              <Quote className="w-8 h-8 text-emerald-300 mb-4" />
              <p className="text-emerald-700 italic mb-4">"{test.text}"</p>
              <div className="flex items-center gap-3">
                <span className="text-4xl">{test.avatar}</span>
                <div>
                  <div className="font-bold text-emerald-800">{test.name}</div>
                  <div className="text-emerald-600 text-sm">{test.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Manifesto Section */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 mb-16">
        <div className="glass-card-dark rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-emerald-800 mb-6">
            📜 Le Manifeste NIRD
          </h2>
          <div className="space-y-6 text-emerald-700">
            <p className="text-lg leading-relaxed">
              <strong className="text-emerald-600">Nous croyons</strong> que la
              technologie doit être un bien commun, accessible à tous,
              compréhensible par tous, et au service de l'humanité plutôt que de
              quelques corporations.
            </p>
            <p className="text-lg leading-relaxed">
              <strong className="text-emerald-600">Nous refusons</strong>{" "}
              l'obsolescence programmée, la surveillance de masse, et la
              dépendance aux écosystèmes fermés qui enferment les utilisateurs.
            </p>
            <p className="text-lg leading-relaxed">
              <strong className="text-emerald-600">Nous construisons</strong> un
              avenir où chaque école, chaque élève, chaque citoyen maîtrise ses
              outils numériques et ses données personnelles.
            </p>
            <div className="text-center pt-6">
              <span className="text-3xl">🌱 🔓 🌍 ♻️ 🎓</span>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Cards */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-emerald-800 mb-10">
          🚀 Passez à l'Action !
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Terminal className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-emerald-800 mb-2">Installez Linux</h3>
            <p className="text-emerald-600 text-sm mb-4">
              Essayez Ubuntu, Linux Mint ou Fedora sur une clé USB
            </p>
            <a
              href="https://ubuntu.com/download"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-500 hover:text-emerald-700 font-medium"
            >
              Commencer →
            </a>
          </div>
          <div className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-emerald-800 mb-2">Apprenez</h3>
            <p className="text-emerald-600 text-sm mb-4">
              Découvrez les ressources de Framasoft et Linux.org
            </p>
            <a
              href="https://framasoft.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-500 hover:text-emerald-700 font-medium"
            >
              Explorer →
            </a>
          </div>
          <div className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-emerald-800 mb-2">Rejoignez NIRD</h3>
            <p className="text-emerald-600 text-sm mb-4">
              Participez à la communauté et libérez votre école
            </p>
            <a
              href="https://nird.forge.apps.education.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-500 hover:text-emerald-700 font-medium"
            >
              Rejoindre →
            </a>
          </div>
        </div>
      </div>

      {/* Fun Facts */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-emerald-800 mb-10">
          🤓 Le Saviez-Vous ?
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="glass-card rounded-xl p-4 flex items-start gap-4">
            <span className="text-3xl">🖥️</span>
            <div>
              <p className="text-emerald-700">
                <strong>96%</strong> des serveurs web tournent sous Linux
              </p>
            </div>
          </div>
          <div className="glass-card rounded-xl p-4 flex items-start gap-4">
            <span className="text-3xl">📱</span>
            <div>
              <p className="text-emerald-700">
                Android est basé sur le <strong>noyau Linux</strong>
              </p>
            </div>
          </div>
          <div className="glass-card rounded-xl p-4 flex items-start gap-4">
            <span className="text-3xl">🚀</span>
            <div>
              <p className="text-emerald-700">
                La <strong>NASA</strong> et <strong>SpaceX</strong> utilisent
                Linux
              </p>
            </div>
          </div>
          <div className="glass-card rounded-xl p-4 flex items-start gap-4">
            <span className="text-3xl">🎬</span>
            <div>
              <p className="text-emerald-700">
                <strong>Blender</strong> a été utilisé pour des films
                hollywoodiens
              </p>
            </div>
          </div>
          <div className="glass-card rounded-xl p-4 flex items-start gap-4">
            <span className="text-3xl">🌐</span>
            <div>
              <p className="text-emerald-700">
                <strong>Wikipedia</strong> tourne entièrement sur logiciels
                libres
              </p>
            </div>
          </div>
          <div className="glass-card rounded-xl p-4 flex items-start gap-4">
            <span className="text-3xl">🎮</span>
            <div>
              <p className="text-emerald-700">
                La <strong>Steam Deck</strong> fonctionne sous Linux
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <footer
        className="relative z-10 pb-12 px-6 text-center fade-in-up"
        style={{ animationDelay: "1s" }}
      >
        <div className="glass-card inline-block rounded-2xl px-8 py-6 shadow-lg pulse-glow">
          <p className="text-emerald-700 mb-4 text-lg">
            🌿 Rejoignez la communauté NIRD et libérez votre école !
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://nird.forge.apps.education.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Leaf className="w-5 h-5" />
              Découvrir NIRD
            </a>
            <a
              href="https://github.com/ahmed-addali/Chat-bruti"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-700 to-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:from-gray-800 hover:to-black transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <GitBranch className="w-5 h-5" />
              Voir le Code
            </a>
          </div>
        </div>
        <p className="text-emerald-600/60 text-sm mt-8">
          Projet Nuit de l'Info 2025 — Sous licence MIT — Vive le logiciel libre
          ! 🌱
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <span
            className="text-2xl bounce-subtle"
            style={{ animationDelay: "0s" }}
          >
            🐧
          </span>
          <span
            className="text-2xl bounce-subtle"
            style={{ animationDelay: "0.2s" }}
          >
            🦊
          </span>
          <span
            className="text-2xl bounce-subtle"
            style={{ animationDelay: "0.4s" }}
          >
            🐃
          </span>
          <span
            className="text-2xl bounce-subtle"
            style={{ animationDelay: "0.6s" }}
          >
            🦎
          </span>
          <span
            className="text-2xl bounce-subtle"
            style={{ animationDelay: "0.8s" }}
          >
            🐙
          </span>
        </div>
      </footer>
    </div>
  );
}
