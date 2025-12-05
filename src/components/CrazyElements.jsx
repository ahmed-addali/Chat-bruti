import { useState, useEffect } from 'react';
import { Skull, AlertTriangle, Eye, Flame, Sparkles, Radiation, XCircle, AlertOctagon } from 'lucide-react';

const CRAZY_POPUP_MESSAGES = [
  { text: "⚠️ ALERTE: Votre âme a été vendue à 47 annonceurs", type: "warning" },
  { text: "🔥 URGENT: Température du portefeuille critique", type: "danger" },
  { text: "👁️ INFO: 847 entreprises vous observent en ce moment", type: "creepy" },
  { text: "💀 RAPPEL: Votre vie privée expire dans 0:00:00", type: "danger" },
  { text: "🐛 BUG: Ce bug est une fonctionnalité payante", type: "warning" },
  { text: "📡 WIFI: Connexion interceptée avec succès !", type: "creepy" },
  { text: "🔋 BATTERIE: Obsolescence programmée activée", type: "warning" },
  { text: "💸 PROMO: -0% sur tous nos abonnements !", type: "promo" },
  { text: "🎰 CHANCE: Vous avez perdu ! Rejouez pour 99€", type: "promo" },
  { text: "☢️ RADIATION: Données personnelles en fuite", type: "danger" },
  { text: "👻 FANTÔME: Votre ancien PC vous manque...", type: "creepy" },
  { text: "🚨 POLICE: Pensée non-conforme détectée", type: "danger" },
  { text: "💾 MÉMOIRE: Souvenirs supprimés pour faire de la place aux pubs", type: "warning" },
  { text: "🎪 CIRQUE: Bienvenue dans le capitalisme de surveillance !", type: "promo" },
  { text: "🧠 CERVEAU: Mise à jour forcée de vos opinions...", type: "creepy" },
];

const FLOATING_WARNINGS = [
  "WINDOWS 47 REQUIS",
  "LICENCE EXPIRÉE x∞",
  "ABONNEZ-VOUS",
  "ERREUR 402",
  "PAYEZ SVP",
  "MISE À JOUR: 99.99€",
  "RAM INSUFFISANTE (achetez-en)",
  "VOTRE PC EST LENT (achetez neuf)",
  "ANTIVIRUS DÉSACTIVÉ (999€/an)",
  "COOKIES: OUI OUI OUI",
  "RGPD? LOL",
  "TRACKING: ACTIVÉ ✓",
  "PUBLICITÉ CIBLÉE",
  "DONNÉES VENDUES ✓",
];

const FAKE_ERRORS = [
  "kernel32.dll a cessé de fonctionner (comme prévu)",
  "Erreur 0x80070005: Accès refusé (payez d'abord)",
  "Blue Screen of Greed™ imminent",
  "svchost.exe mange votre RAM (feature)",
  "Update.exe: Redémarrage dans 3... 2... MAINTENANT",
];

export default function CrazyElements({ chaosLevel = 1, onChaosChange }) {
  const [popups, setPopups] = useState([]);
  const [floatingWarnings, setFloatingWarnings] = useState([]);
  const [fakeError, setFakeError] = useState('');
  const [showFakeError, setShowFakeError] = useState(false);
  const [eyePosition, setEyePosition] = useState({ x: 50, y: 50 });
  const [internalChaos, setInternalChaos] = useState(chaosLevel);

  // Crazy popup system
  useEffect(() => {
    const popupInterval = setInterval(() => {
      if (Math.random() < 0.3 * internalChaos) {
        const newPopup = {
          id: Date.now(),
          ...CRAZY_POPUP_MESSAGES[Math.floor(Math.random() * CRAZY_POPUP_MESSAGES.length)],
          x: Math.random() * 60 + 20,
          y: Math.random() * 60 + 20,
        };
        setPopups(prev => [...prev.slice(-4), newPopup]);
        setTimeout(() => {
          setPopups(prev => prev.filter(p => p.id !== newPopup.id));
        }, 3000 + Math.random() * 2000);
      }
    }, 2000 / internalChaos);
    return () => clearInterval(popupInterval);
  }, [internalChaos]);

  // Floating warnings
  useEffect(() => {
    const warnings = FLOATING_WARNINGS.map((text, i) => ({
      id: i,
      text,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      speed: 0.5 + Math.random() * 1.5,
      direction: Math.random() * 360,
    }));
    setFloatingWarnings(warnings.slice(0, 6 + internalChaos * 2));
  }, [internalChaos]);

  // Fake error popups
  useEffect(() => {
    const errorInterval = setInterval(() => {
      if (Math.random() < 0.15 * internalChaos) {
        setFakeError(FAKE_ERRORS[Math.floor(Math.random() * FAKE_ERRORS.length)]);
        setShowFakeError(true);
        setTimeout(() => setShowFakeError(false), 2500);
      }
    }, 5000 / internalChaos);
    return () => clearInterval(errorInterval);
  }, [internalChaos]);

  // Eye that follows mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      setEyePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Increase chaos over time
  useEffect(() => {
    const chaosInterval = setInterval(() => {
      setInternalChaos(prev => {
        const newChaos = Math.min(prev + 0.1, 3);
        if (onChaosChange) onChaosChange(newChaos);
        return newChaos;
      });
    }, 10000);
    return () => clearInterval(chaosInterval);
  }, [onChaosChange]);

  return (
    <>
      {/* CSS Animations */}
      <style>{`
        @keyframes popIn {
          0% { transform: scale(0) rotate(-10deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(5deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes floatAround {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -15px) rotate(3deg); }
          50% { transform: translate(-5px, 10px) rotate(-2deg); }
          75% { transform: translate(15px, 5px) rotate(4deg); }
        }
        @keyframes crazySpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes borderDance {
          0%, 100% { border-color: #ff0040; }
          25% { border-color: #00ffff; }
          50% { border-color: #ff00ff; }
          75% { border-color: #ffff00; }
        }
        @keyframes matrixRain {
          0% { transform: translateY(-100%); opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        @keyframes borderGlow {
          0%, 100% { box-shadow: 0 0 20px #ff0040, inset 0 0 20px rgba(255,0,64,0.1); }
          50% { box-shadow: 0 0 40px #ff0040, 0 0 60px #ff0040, inset 0 0 30px rgba(255,0,64,0.2); }
        }
        .popup-appear { animation: popIn 0.3s ease-out; }
        .float-around { animation: floatAround 4s ease-in-out infinite; }
        .crazy-spin { animation: crazySpin 2s linear infinite; }
        .border-dance { animation: borderDance 1s linear infinite; }
        .scale-breath { animation: pulse 2s ease-in-out infinite; }
        .matrix-char { animation: matrixRain 3s linear infinite; font-family: monospace; color: #00ff00; }
        .border-glow { animation: borderGlow 2s ease-in-out infinite; }
      `}</style>

      {/* MATRIX RAIN EFFECT */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-20 opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-green-500 font-mono text-xs matrix-char"
            style={{
              left: `${i * 5}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          >
            {String.fromCharCode(0x30A0 + Math.random() * 96)}
          </div>
        ))}
      </div>

      {/* CRAZY FLOATING WARNINGS */}
      {floatingWarnings.map((warning, i) => (
        <div
          key={warning.id}
          className="fixed pointer-events-none z-30 float-around"
          style={{
            left: `${warning.x}%`,
            top: `${warning.y}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + i}s`,
          }}
        >
          <div className={`font-mono text-xs md:text-sm px-2 py-1 rounded border ${i % 3 === 0 ? 'bg-red-900/60 border-red-500 text-red-300' : i % 3 === 1 ? 'bg-yellow-900/60 border-yellow-500 text-yellow-300' : 'bg-purple-900/60 border-purple-500 text-purple-300'} border-dance`}>
            {warning.text}
          </div>
        </div>
      ))}

      {/* CRAZY POPUP NOTIFICATIONS */}
      {popups.map((popup) => (
        <div
          key={popup.id}
          className="fixed z-40 popup-appear"
          style={{ left: `${popup.x}%`, top: `${popup.y}%` }}
        >
          <div className={`max-w-xs p-3 rounded-lg shadow-2xl font-mono text-sm border-2 ${
            popup.type === 'danger' ? 'bg-red-950 border-red-500 text-red-200' :
            popup.type === 'warning' ? 'bg-yellow-950 border-yellow-500 text-yellow-200' :
            popup.type === 'creepy' ? 'bg-purple-950 border-purple-500 text-purple-200' :
            'bg-cyan-950 border-cyan-500 text-cyan-200'
          }`}>
            <div className="flex items-start gap-2">
              {popup.type === 'danger' && <Flame className="w-5 h-5 text-red-400 flex-shrink-0 crazy-spin" />}
              {popup.type === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 scale-breath" />}
              {popup.type === 'creepy' && <Eye className="w-5 h-5 text-purple-400 flex-shrink-0" />}
              {popup.type === 'promo' && <Sparkles className="w-5 h-5 text-cyan-400 flex-shrink-0" />}
              <span>{popup.text}</span>
            </div>
            <button className="absolute -top-2 -right-2 w-6 h-6 bg-gray-800 rounded-full text-gray-400 hover:text-white flex items-center justify-center text-xs border border-gray-600">
              ✕
            </button>
          </div>
        </div>
      ))}

      {/* FAKE WINDOWS ERROR */}
      {showFakeError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-gray-200 border-2 border-gray-400 rounded shadow-2xl max-w-md popup-appear" style={{ fontFamily: 'Segoe UI, Tahoma, sans-serif' }}>
            <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white px-3 py-1 flex items-center justify-between">
              <span className="text-sm flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                GOLIATH-OS Error
              </span>
              <button onClick={() => setShowFakeError(false)} className="hover:bg-red-600 px-2">✕</button>
            </div>
            <div className="p-4 flex gap-4">
              <AlertOctagon className="w-12 h-12 text-red-600 flex-shrink-0" />
              <div>
                <p className="text-gray-800 text-sm mb-3">{fakeError}</p>
                <div className="flex gap-2">
                  <button onClick={() => setShowFakeError(false)} className="px-4 py-1 bg-gray-300 border border-gray-500 text-sm hover:bg-gray-400">Payer 49€</button>
                  <button onClick={() => setShowFakeError(false)} className="px-4 py-1 bg-gray-300 border border-gray-500 text-sm hover:bg-gray-400">Payer 99€</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREEPY WATCHING EYE */}
      <div className="fixed top-4 right-4 z-30 pointer-events-none">
        <div className="relative w-16 h-16 bg-gray-900 rounded-full border-2 border-red-500 flex items-center justify-center overflow-hidden border-glow">
          <div className="absolute w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <div 
              className="w-6 h-6 bg-red-600 rounded-full transition-transform duration-100"
              style={{
                transform: `translate(${(eyePosition.x - (typeof window !== 'undefined' ? window.innerWidth/2 : 0)) / 50}px, ${(eyePosition.y - (typeof window !== 'undefined' ? window.innerHeight/2 : 0)) / 50}px)`
              }}
            >
              <div className="w-3 h-3 bg-black rounded-full ml-1.5 mt-1.5" />
            </div>
          </div>
          <div className="absolute bottom-0 w-full text-center">
            <span className="text-[8px] font-mono text-red-400">WATCHING</span>
          </div>
        </div>
      </div>

      {/* CHAOS LEVEL INDICATOR */}
      <div className="fixed bottom-20 left-4 z-30">
        <div className="bg-black/80 border border-red-500/50 rounded-lg p-2 font-mono text-xs">
          <div className="text-red-400 flex items-center gap-2">
            <Radiation className={`w-4 h-4 ${internalChaos > 2 ? 'crazy-spin text-yellow-400' : ''}`} />
            <span>CHAOS: {Math.floor(internalChaos * 33)}%</span>
          </div>
          <div className="w-24 h-2 bg-gray-800 rounded-full mt-1 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-500 via-red-500 to-purple-500 transition-all"
              style={{ width: `${internalChaos * 33}%` }}
            />
          </div>
        </div>
      </div>

      {/* Floating skulls background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <Skull
            key={i}
            className="absolute text-red-900/20"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              width: `${40 + i * 10}px`,
              height: `${40 + i * 10}px`,
              animation: `floatAround ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}
