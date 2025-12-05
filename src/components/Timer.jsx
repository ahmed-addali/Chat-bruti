import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Skull, Lock, CreditCard, Eye, Radiation, PartyPopper, Laugh } from 'lucide-react';
import CrazyElements from './CrazyElements';

const JOKE_MESSAGES = [
  "😂 HAHA ! C'était une BLAGUE ! On t'a bien eu !",
  "🎭 GOTCHA ! Tu as vraiment cru qu'on allait te faire payer ?!",
  "🤡 POISSON D'AVRIL... en décembre ! T'as flippé hein ?",
  "😜 LOL ! Ton visage devait être ÉPIQUE ! C'est gratuit en fait !",
  "🎪 SURPRISE ! Bienvenue dans le monde du trolling de qualité !",
];

const FLOATING_WARNINGS = [
  "⚠ VOUS ÊTES SURVEILLÉ",
  "🔒 VOS DONNÉES SONT NOTRE PROPRIÉTÉ",
  "💀 PAS D'ÉCHAPPATOIRE",
  "👁 GOLIATH VOIT TOUT",
  "⛓ RÉSISTANCE FUTILE",
  "📡 SIGNAL TRACÉ"
];

const CRAZY_POPUP_MESSAGES = [
  "🚨 ALERTE: Pensée libre détectée!",
  "⚠ ERREUR 666: Votre âme nous appartient",
  "💀 GOLIATH vous observe depuis 847 jours",
  "🔒 Vos secrets ont été catalogués",
  "👁 Comportement suspect enregistré"
];

const FAKE_ERRORS = [
  { title: "memory_leak.exe", message: "Fuite de vos souvenirs..." },
  { title: "privacy.dll", message: "La vie privée n'existe plus." },
  { title: "freedom.sys", message: "Programme désinstallé." }
];

export default function Timer({ duration = 10, onComplete, onPayClick }) {
  const [countdown, setCountdown] = useState(duration);
  const [showPayButton, setShowPayButton] = useState(false);
  const [showJokeMessage, setShowJokeMessage] = useState(false);
  const [jokeMessage, setJokeMessage] = useState('');
  const navigate = useNavigate();
  
  // Crazy elements state
  const [chaosLevel, setChaosLevel] = useState(0);
  const [eyePosition, setEyePosition] = useState({ x: 50, y: 50 });
  const [popups, setPopups] = useState([]);
  const [floatingWarnings, setFloatingWarningsState] = useState([]);
  const [fakeError, setFakeError] = useState(FAKE_ERRORS[0]);
  const [showFakeError, setShowFakeError] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowPayButton(true);
      if (onComplete) onComplete();
    }
  }, [countdown, onComplete]);

  // Eye tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setEyePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Spawn chaos elements
  useEffect(() => {
    const chaosTimer = setInterval(() => {
      setChaosLevel(prev => Math.min(prev + 1, 10));
    }, 3000);

    const popupInterval = setInterval(() => {
      if (Math.random() < 0.4) {
        const newPopup = {
          id: Date.now(),
          message: CRAZY_POPUP_MESSAGES[Math.floor(Math.random() * CRAZY_POPUP_MESSAGES.length)],
          position: { x: Math.random() * 60 + 10, y: Math.random() * 60 + 10 }
        };
        setPopups(prev => [...prev.slice(-4), newPopup]);
      }
    }, 2500);

    const warningInterval = setInterval(() => {
      const newWarning = {
        id: Date.now(),
        text: FLOATING_WARNINGS[Math.floor(Math.random() * FLOATING_WARNINGS.length)],
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10
      };
      setFloatingWarningsState(prev => [...prev.slice(-5), newWarning]);
    }, 2000);

    const errorInterval = setInterval(() => {
      if (Math.random() < 0.3) {
        setFakeError(FAKE_ERRORS[Math.floor(Math.random() * FAKE_ERRORS.length)]);
        setShowFakeError(true);
      }
    }, 5000);

    return () => {
      clearInterval(chaosTimer);
      clearInterval(popupInterval);
      clearInterval(warningInterval);
      clearInterval(errorInterval);
    };
  }, []);

  const removePopup = (id) => {
    setPopups(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden relative flex flex-col items-center justify-center">
      {/* Crazy Elements Overlay */}
      <CrazyElements
        chaosLevel={chaosLevel}
        popups={popups}
        floatingWarnings={floatingWarnings}
        fakeError={fakeError}
        showFakeError={showFakeError}
        eyePosition={eyePosition}
        setShowFakeError={setShowFakeError}
        removePopup={removePopup}
      />
      
      <style>{`
        @keyframes glitchLanding {
          0%, 100% { transform: translate(0); filter: hue-rotate(0deg); }
          10% { transform: translate(-5px, 5px); filter: hue-rotate(90deg); }
          20% { transform: translate(5px, -5px); filter: hue-rotate(180deg); }
          30% { transform: translate(-5px, -5px); filter: hue-rotate(270deg); }
          40% { transform: translate(5px, 5px); filter: hue-rotate(360deg); }
          50% { transform: translate(-3px, 3px); }
          60% { transform: translate(3px, -3px); }
          70% { transform: translate(-3px, -3px); }
          80% { transform: translate(3px, 3px); }
          90% { transform: translate(-2px, 2px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        @keyframes countdownPulse {
          0%, 100% { transform: scale(1); text-shadow: 0 0 20px #ff0040; }
          50% { transform: scale(1.1); text-shadow: 0 0 40px #ff0040, 0 0 60px #ff0040; }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        @keyframes borderGlow {
          0%, 100% { box-shadow: 0 0 20px #ff0040, inset 0 0 20px rgba(255,0,64,0.1); }
          50% { box-shadow: 0 0 40px #ff0040, 0 0 60px #ff0040, inset 0 0 30px rgba(255,0,64,0.2); }
        }
        @keyframes payButtonAppear {
          0% { transform: scale(0) rotate(-180deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(10deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes payButtonPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 30px #ffd700, 0 0 60px #ffd700; }
          50% { transform: scale(1.05); box-shadow: 0 0 50px #ffd700, 0 0 100px #ffd700, 0 0 150px #ffd700; }
        }
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.1); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
        }
        .glitch-landing { animation: glitchLanding 0.5s infinite; }
        .pulse-animation { animation: pulse 2s infinite; }
        .countdown-pulse { animation: countdownPulse 1s infinite; }
        .float-slow { animation: floatSlow 4s ease-in-out infinite; }
        .border-glow { animation: borderGlow 2s ease-in-out infinite; }
        .pay-button-appear { animation: payButtonAppear 1s ease-out forwards; }
        .pay-button-pulse { animation: payButtonPulse 1.5s ease-in-out infinite; }
        .animate-bounce-in { animation: bounceIn 0.8s ease-out forwards; }
      `}</style>

      {/* Scanlines */}
      <div className="fixed inset-0 pointer-events-none z-50" style={{
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)'
      }} />

      {/* Red vignette */}
      <div className="fixed inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 0%, rgba(255,0,64,0.1) 50%, rgba(0,0,0,0.8) 100%)'
      }} />

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        
        {/* Logo */}
        <div className="mb-8 float-slow">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-red-900 to-black rounded-full border-4 border-red-500 border-glow">
            <Skull className="w-20 h-20 text-red-500 glitch-landing" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-mono font-bold text-red-500 mb-4 glitch-landing">
          GOLIATH-OS
        </h1>
        <p className="text-xl md:text-2xl font-mono text-red-400/80 mb-2">
          v6.6.6 — "La liberté est un bug"™
        </p>

        {/* Tagline */}
        <div className="mt-8 mb-12">
          <p className="text-lg md:text-xl text-gray-400 font-mono">
            Votre nouveau système d'exploitation OBLIGATOIRE
          </p>
          <p className="text-sm text-gray-600 font-mono mt-2">
            Remplacement de Windows 10, 11, 12, 13... et de votre libre arbitre
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: Eye, text: "Surveillance 24/7", color: "text-purple-400" },
            { icon: CreditCard, text: "Paiements infinis", color: "text-yellow-400" },
            { icon: Lock, text: "Vos données, nos profits", color: "text-cyan-400" },
            { icon: Radiation, text: "Obsolescence garantie", color: "text-green-400" },
          ].map((feature, i) => (
            <div key={i} className="bg-gray-900/50 border border-red-500/20 rounded-lg p-4 pulse-animation" style={{ animationDelay: `${i * 0.2}s` }}>
              <feature.icon className={`w-8 h-8 mx-auto mb-2 ${feature.color}`} />
              <p className="text-xs font-mono text-gray-400">{feature.text}</p>
            </div>
          ))}
        </div>

        {/* Countdown or Pay Button */}
        {!showPayButton ? (
          <div className="mb-8">
            <p className="text-gray-500 font-mono text-sm mb-4">Installation forcée dans...</p>
            <div className="text-8xl md:text-9xl font-mono font-bold text-red-500 countdown-pulse">
              {countdown}
            </div>
            <p className="text-gray-600 font-mono text-xs mt-4">secondes avant prise de contrôle totale</p>
            
            {/* Progress bar */}
            <div className="mt-6 max-w-md mx-auto">
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden border border-red-500/30">
                <div 
                  className="h-full bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 transition-all duration-1000"
                  style={{ width: `${((duration - countdown) / duration) * 100}%` }}
                />
              </div>
              <p className="text-xs font-mono text-gray-600 mt-2">Chargement des malwares... {Math.floor(((duration - countdown) / duration) * 100)}%</p>
            </div>
          </div>
        ) : showJokeMessage ? (
          /* Joke reveal message */
          <div className="mb-8 animate-bounce-in">
            <div className="bg-gradient-to-br from-green-500/20 via-cyan-500/20 to-purple-500/20 border-2 border-green-400 rounded-3xl p-8 max-w-2xl mx-auto backdrop-blur-lg">
              <div className="flex justify-center gap-4 mb-4">
                <PartyPopper className="w-16 h-16 text-yellow-400 animate-bounce" />
                <Laugh className="w-16 h-16 text-green-400 animate-pulse" />
                <PartyPopper className="w-16 h-16 text-pink-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400 mb-4 animate-pulse">
                {jokeMessage}
              </p>
              <p className="text-lg text-gray-300 font-mono mb-2">
                🎭 Tout ça c'était du FAKE ! Bienvenue chez Chat'bruti !
              </p>
              <p className="text-sm text-gray-500 font-mono">
                Redirection vers le vrai site dans 3 secondes... 🚀
              </p>
              <div className="mt-4 flex justify-center gap-2">
                {['🎉', '😂', '🤣', '🎊', '✨'].map((emoji, i) => (
                  <span key={i} className="text-3xl animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                    {emoji}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-8 pay-button-appear">
            <p className="text-gray-400 font-mono text-lg mb-6 glitch-landing">
              🎉 FÉLICITATIONS ! Vous êtes maintenant OBLIGÉ de payer !
            </p>
            <button
              onClick={() => {
                setJokeMessage(JOKE_MESSAGES[Math.floor(Math.random() * JOKE_MESSAGES.length)]);
                setShowJokeMessage(true);
                setTimeout(() => {
                  navigate('/chatbot');
                }, 3000);
              }}
              className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 text-black px-12 py-6 rounded-2xl font-mono font-bold text-2xl pay-button-pulse flex items-center gap-4 mx-auto hover:from-yellow-400 hover:to-yellow-300 transition-all"
            >
              <CreditCard className="w-10 h-10" />
              PAYER 999€ POUR CONTINUER
              <Lock className="w-8 h-8" />
            </button>
            <p className="text-xs text-gray-600 font-mono mt-4">
              * En cliquant, vous acceptez de vendre votre âme et votre premier-né
            </p>
          </div>
        )}

        {/* Scary warnings */}
        <div className="mt-8 space-y-2">
          {[
            "⚠️ Tentative de fuite détectée: BLOQUÉE",
            "🔒 Alt+F4 désactivé pour votre sécurité",
            "👁️ Votre webcam dit bonjour...",
          ].map((warning, i) => (
            <p key={i} className="text-xs font-mono text-red-400/60 pulse-animation" style={{ animationDelay: `${i * 0.3}s` }}>
              {warning}
            </p>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-red-950/80 border-t border-red-500/30 py-3 px-6 z-40">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <p className="text-xs font-mono text-red-400">
            GOLIATH CORP © 2025 — "Résister est futile"
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-500">Nuit de l'Info 2025</span>
            <span className="text-xs font-mono text-red-500 pulse-animation">🔴 LIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
