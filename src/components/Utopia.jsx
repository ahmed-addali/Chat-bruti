import { Leaf, Wrench, GraduationCap, Heart, Sparkles, Shield, Globe, Cpu, TreePine } from 'lucide-react';

export default function Utopia() {
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
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.8);
        }
        .float-animation { animation: float 3s ease-in-out infinite; }
        .fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .sparkle { animation: sparkle 2s ease-in-out infinite; }
        .leaf { animation: leaf-fall 10s linear infinite; }
      `}</style>

      {/* Floating leaves background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="leaf absolute text-emerald-300"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 6}s`
            }}
          >
            <Leaf className="w-6 h-6" />
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 pt-12 pb-8 px-6 text-center fade-in-up">
        <div className="inline-flex items-center gap-3 mb-4">
          <TreePine className="w-10 h-10 text-emerald-600" />
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 bg-clip-text text-transparent">
            NIRD Village
          </h1>
          <TreePine className="w-10 h-10 text-emerald-600" />
        </div>
        <p className="text-xl md:text-2xl text-emerald-700 font-light max-w-3xl mx-auto">
          Bienvenue dans le village de la résistance numérique 🌿
        </p>
        <p className="text-lg text-emerald-600/70 mt-2">
          Numérique Inclusif, Responsable et Durable
        </p>
      </header>

      {/* Victory Message */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 mb-12 fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="glass-card rounded-3xl p-8 text-center shadow-xl shadow-emerald-100">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full float-animation">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-emerald-800 mb-4">
            🎉 Vous avez vaincu GOLIATH-OS !
          </h2>
          <p className="text-lg text-emerald-700">
            En invoquant le pouvoir du <span className="font-bold text-emerald-600">logiciel libre</span>, 
            vous avez brisé les chaînes de la dépendance numérique. 
            Bienvenue dans un monde où la technologie est au service de tous.
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* La Forge Card */}
          <div className="glass-card rounded-3xl p-8 shadow-xl shadow-emerald-100/50 hover:shadow-2xl hover:shadow-emerald-200/50 transition-all duration-500 hover:-translate-y-2 fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl sparkle">
                <Wrench className="w-10 h-10 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-emerald-800 text-center mb-4">La Forge</h3>
            <p className="text-emerald-700 text-center mb-6">
              Des outils libres et puissants pour remplacer les solutions propriétaires coûteuses.
            </p>
            <ul className="space-y-3 text-emerald-600">
              <li className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span><strong>OpenSAND</strong> par Viveris</span>
              </li>
              <li className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span><strong>ROHC</strong> - Compression d'en-têtes</span>
              </li>
              <li className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>LibreOffice, GIMP, Blender...</span>
              </li>
            </ul>
          </div>

          {/* L'Atelier Card */}
          <div className="glass-card rounded-3xl p-8 shadow-xl shadow-emerald-100/50 hover:shadow-2xl hover:shadow-emerald-200/50 transition-all duration-500 hover:-translate-y-2 fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl sparkle" style={{ animationDelay: '0.3s' }}>
                <Cpu className="w-10 h-10 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-emerald-800 text-center mb-4">L'Atelier</h3>
            <p className="text-emerald-700 text-center mb-6">
              Réparer, réutiliser, prolonger la vie du matériel contre l'obsolescence programmée.
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
            </ul>
          </div>

          {/* L'École Libre Card */}
          <div className="glass-card rounded-3xl p-8 shadow-xl shadow-emerald-100/50 hover:shadow-2xl hover:shadow-emerald-200/50 transition-all duration-500 hover:-translate-y-2 fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl sparkle" style={{ animationDelay: '0.6s' }}>
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-emerald-800 text-center mb-4">L'École Libre</h3>
            <p className="text-emerald-700 text-center mb-6">
              Former les citoyens numériques de demain à l'autonomie technologique.
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
            </ul>
          </div>

        </div>
      </div>

      {/* Footer CTA */}
      <footer className="relative z-10 pb-12 px-6 text-center fade-in-up" style={{ animationDelay: '1s' }}>
        <div className="glass-card inline-block rounded-2xl px-8 py-6 shadow-lg">
          <p className="text-emerald-700 mb-4">Rejoignez la communauté NIRD et libérez votre école !</p>
          <a 
            href="https://nird.forge.apps.education.fr/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Leaf className="w-5 h-5" />
            Découvrir NIRD
          </a>
        </div>
        <p className="text-emerald-600/60 text-sm mt-8">
          Projet Nuit de l'Info 2025 — Sous licence MIT — Vive le logiciel libre ! 🌱
        </p>
      </footer>
    </div>
  );
}
