import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Sparkles, Coffee, Lightbulb, Send, ArrowLeft, Zap, Star, CloudLightning, Atom, Pizza, Rocket, Cat, Ghost, Music, Heart, Flame, Volume2, VolumeX, Keyboard, AlertTriangle, Skull } from 'lucide-react';
import { GOLIATH_SYSTEM_PROMPT, CRASH_MESSAGES } from '../config/systemPrompt';

// Avatars délirants pour le bot
const BOT_AVATARS = ['🧠', '🤖', '🦄', '🐙', '👽', '🤡', '🎭', '🦆', '🐸', '🦊', '🐼', '🦋', '👻', '🎃', '🤠', '🧙‍♂️', '🧛', '🧞', '🦹', '🥸'];

// Avatars pour l'utilisateur
const USER_AVATARS = ['😎', '🤓', '😏', '🧐', '🤨', '😼', '🐱', '🐶', '🐵', '🐰', '🦁', '🐻', '🐨', '🐯', '🦊', '🐸', '🐲', '🦖', '🦕', '🐙'];

// Faux layouts de clavier
const KEYBOARD_LAYOUTS = [
  { name: "AZERTY → QWERTY", map: { a: 'q', z: 'w', e: 'e', r: 'r', q: 'a', w: 'z' } },
  { name: "Mode Pirate 🏴‍☠️", map: { o: '☠', i: '⚓', a: '🦜', e: '🏴‍☠️', s: '⚔️' } },
  { name: "Mode Alien 👽", map: { a: '∆', e: '€', i: '¡', o: '◊', u: 'µ' } },
  { name: "Mode Chaos 🌀", map: { a: '@', e: '3', i: '!', o: '0', s: '$', t: '7' } },
  { name: "Mode UwU ✨", map: { r: 'w', l: 'w' } },
];

// Messages de tips/trolls aléatoires
const CRAZY_TIPS = [
  "💡 TIP: Avez-vous essayé de mettre votre écran dans du riz?",
  "🎯 ASTUCE: Cliquer plus fort fait charger plus vite!",
  "🔥 HOT TIP: Le bug est une feature non documentée!",
  "⚡ PRO TIP: Ctrl+Alt+Suppr résout 99% des problèmes existentiels",
  "🌟 CONSEIL: Parlez à votre code, il comprend vos émotions",
  "🎭 SAGESSE: Un bon programmeur debug d'abord, pleure ensuite",
  "☕ INFO: Ce chatbot fonctionne au café et aux bonnes vibrations",
  "🦆 DEBUG: Expliquez votre problème à un canard en plastique",
  "🍕 RAPPEL: Une pizza résout plus de bugs qu'un debugger",
  "🚀 BREAKING: Votre code marche! ...ah non, fausse alerte",
  "🎪 ALERT: Votre cerveau a besoin d'une mise à jour",
  "🤡 NOTICE: Cette session est sponsorisée par le chaos",
];

// Notifications de changement de clavier
const KEYBOARD_NOTIFICATIONS = [
  "⌨️ OUPS! Votre clavier vient de changer de dimension!",
  "🎹 ALERTE: Les touches ont fait une révolution!",
  "⚡ FLASH: Votre clavier parle maintenant une autre langue!",
  "🌀 ATTENTION: Layout de clavier quantique activé!",
];

// Emojis philosophiques
const PHILOSOPHY_EMOJIS = ['🤔', '💭', '🧠', '✨', '🎭', '🌀', '🎪', '🦆', '🥐', '☕', '🍕', '🦙', '🌈', '🎩', '🔮', '🎸', '🚀', '👻', '🐙', '🦄'];

// Placeholders absurdes
const ABSURD_PLACEHOLDERS = [
  "Demandez-moi pourquoi les chaussettes disparaissent...",
  "Interrogez le sens profond du kebab cosmique...",
  "Posez votre question existentielle (ou pas)...",
  "Que ferait un canard philosophe à votre place?",
  "La réponse est 42, mais quelle est la question?",
  "Partagez vos doutes sur l'existence du lundi...",
  "Un problème? J'ai des métaphores douteuses...",
  "Tapez ici si vous osez défier la logique...",
  "Confessez vos erreurs de code au philosophe...",
  "Le néant vous écoute (moi aussi d'ailleurs)...",
];

// Titres délirants
const CRAZY_TITLES = [
  "🧠 Chat'bruti - Philosophe de Comptoir",
  "🎭 L'Oracle du Code Spaghetti",
  "☕ Socrate du Dimanche",
  "🦆 Le Canard Existentiel",
  "🔮 Gourou des Bugs Cosmiques",
  "🎪 Cirque de la Sagesse Douteuse",
  "🥐 Descartes mais en Pire",
  "🌀 Vortex de Pensées Aléatoires",
];

// Messages de bienvenue
const WELCOME_MESSAGES = [
  "Bienvenue, âme en quête de réponses approximatives! Je suis Chat'bruti, philosophe autoproclamé et expert en métaphores douteuses. Posez-moi vos questions existentielles (ou juste des trucs random, ça marche aussi). 🎭✨",
  "Ah! Un nouveau disciple du chaos organisé! Je suis ton guide spirituel... enfin, si par 'spirituel' on entend 'légèrement confus mais enthousiaste'. Que puis-je embrouiller pour toi? 🧠🦆",
  "SALUTATIONS, être de chair et de bugs! Tu as trouvé le sanctuaire de la sagesse approximative. Ici, on ne résout pas les problèmes, on les philosophise jusqu'à ce qu'ils abandonnent! ☕🌀",
  "Oh oh oh! Un visiteur! *ajuste monocle imaginaire* Je suis Chat'bruti, et je transforme les questions simples en labyrinthes métaphysiques. C'est un don. Ou une malédiction. Peut-être les deux? 🎩✨",
];

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(CRAZY_TITLES[0]);
  const [placeholder, setPlaceholder] = useState(ABSURD_PLACEHOLDERS[0]);
  const [floatingEmojis, setFloatingEmojis] = useState([]);
  const [pulseEffect, setPulseEffect] = useState(false);
  const [chaosMode, setChaosMode] = useState(false);
  
  // Nouveaux états pour les fonctionnalités folles
  const [botAvatar, setBotAvatar] = useState(BOT_AVATARS[0]);
  const [userAvatar, setUserAvatar] = useState(USER_AVATARS[0]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentKeyboardLayout, setCurrentKeyboardLayout] = useState(null);
  const [showKeyboardNotification, setShowKeyboardNotification] = useState(false);
  const [keyboardNotificationText, setKeyboardNotificationText] = useState('');
  const [crazyTip, setCrazyTip] = useState('');
  const [showCrazyTip, setShowCrazyTip] = useState(false);
  const [screenShake, setScreenShake] = useState(false);
  const [rainbowMode, setRainbowMode] = useState(false);
  const [laughingEmojis, setLaughingEmojis] = useState([]);
  
  // États pour le système de crash (détection par l'IA)
  const [isCrashing, setIsCrashing] = useState(false);
  const [crashText, setCrashText] = useState('');
  const [glitchIntensity, setGlitchIntensity] = useState(0);
  
  const messagesEndRef = useRef(null);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  // Initialiser avec un message de bienvenue
  useEffect(() => {
    const randomWelcome = WELCOME_MESSAGES[Math.floor(Math.random() * WELCOME_MESSAGES.length)];
    setMessages([{ role: 'assistant', content: randomWelcome, avatar: botAvatar }]);
  }, []);

  // Changer l'avatar du bot aléatoirement
  useEffect(() => {
    const interval = setInterval(() => {
      setBotAvatar(BOT_AVATARS[Math.floor(Math.random() * BOT_AVATARS.length)]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Changer l'avatar utilisateur parfois
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setUserAvatar(USER_AVATARS[Math.floor(Math.random() * USER_AVATARS.length)]);
      }
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // Changer le titre aléatoirement
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle(CRAZY_TITLES[Math.floor(Math.random() * CRAZY_TITLES.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Changer le placeholder
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholder(ABSURD_PLACEHOLDERS[Math.floor(Math.random() * ABSURD_PLACEHOLDERS.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Tips fous aléatoires
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        setCrazyTip(CRAZY_TIPS[Math.floor(Math.random() * CRAZY_TIPS.length)]);
        setShowCrazyTip(true);
        setTimeout(() => setShowCrazyTip(false), 4000);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Changement de clavier aléatoire (troll)
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        const newLayout = KEYBOARD_LAYOUTS[Math.floor(Math.random() * KEYBOARD_LAYOUTS.length)];
        setCurrentKeyboardLayout(newLayout);
        setKeyboardNotificationText(`${KEYBOARD_NOTIFICATIONS[Math.floor(Math.random() * KEYBOARD_NOTIFICATIONS.length)]} ${newLayout.name}`);
        setShowKeyboardNotification(true);
        setScreenShake(true);
        setTimeout(() => {
          setShowKeyboardNotification(false);
          setScreenShake(false);
        }, 3000);
        // Reset après 10 secondes
        setTimeout(() => setCurrentKeyboardLayout(null), 10000);
      }
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  // Emojis flottants
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const newEmoji = {
          id: Date.now(),
          emoji: PHILOSOPHY_EMOJIS[Math.floor(Math.random() * PHILOSOPHY_EMOJIS.length)],
          left: Math.random() * 100,
          animationDuration: 3 + Math.random() * 4,
        };
        setFloatingEmojis(prev => [...prev.slice(-10), newEmoji]);
      }
    }, 800);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Jouer un son de rire cartoon (HA-HA-HA)
  const playLaughSound = () => {
    if (soundEnabled) {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Créer un rire "HA-HA-HA" avec plusieurs notes
        const laughNotes = [
          { freq: 600, time: 0, duration: 0.12 },
          { freq: 500, time: 0.15, duration: 0.12 },
          { freq: 650, time: 0.30, duration: 0.12 },
          { freq: 480, time: 0.45, duration: 0.12 },
          { freq: 700, time: 0.60, duration: 0.15 },
        ];

        laughNotes.forEach(note => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          // Type d'onde pour un son plus drôle
          oscillator.type = 'square';
          
          // Fréquence qui monte puis descend (comme un rire)
          oscillator.frequency.setValueAtTime(note.freq, audioContext.currentTime + note.time);
          oscillator.frequency.exponentialRampToValueAtTime(note.freq * 1.3, audioContext.currentTime + note.time + note.duration * 0.3);
          oscillator.frequency.exponentialRampToValueAtTime(note.freq * 0.7, audioContext.currentTime + note.time + note.duration);
          
          // Volume avec decay
          gainNode.gain.setValueAtTime(0.15, audioContext.currentTime + note.time);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + note.time + note.duration);
          
          oscillator.start(audioContext.currentTime + note.time);
          oscillator.stop(audioContext.currentTime + note.time + note.duration + 0.05);
        });
      } catch (e) {
        console.log('Audio not supported');
      }
    }
  };

  // Explosion d'emojis de rire
  const triggerLaughExplosion = () => {
    const laughEmojis = ['😂', '🤣', '😆', '😹', '💀', '☠️', '🤡'];
    const newLaughs = [];
    for (let i = 0; i < 15; i++) {
      newLaughs.push({
        id: Date.now() + i,
        emoji: laughEmojis[Math.floor(Math.random() * laughEmojis.length)],
        left: Math.random() * 100,
        top: Math.random() * 100,
        scale: 0.5 + Math.random() * 1.5,
        rotation: Math.random() * 360,
      });
    }
    setLaughingEmojis(newLaughs);
    playLaughSound();
    setTimeout(() => setLaughingEmojis([]), 2000);
  };

  // Son d'envoi de message (pop)
  const playMessageSound = () => {
    if (soundEnabled) {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.05);
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
      } catch (e) {}
    }
  };

  // Son de réception de message (ding)
  const playReceiveSound = () => {
    if (soundEnabled) {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(523, audioContext.currentTime); // Do
        oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1); // Mi
        gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
      } catch (e) {}
    }
  };

  // Déclencher le crash (appelé quand l'IA détecte un mot interdit)
  const triggerCrash = () => {
    setIsCrashing(true);
    setCrashText(CRASH_MESSAGES[Math.floor(Math.random() * CRASH_MESSAGES.length)]);
    setGlitchIntensity(5);
    setScreenShake(true);
    
    // Son de crash dramatique (descente de fréquence + bruit)
    if (soundEnabled) {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Son principal de crash (descente dramatique)
        const crashOsc = audioContext.createOscillator();
        const crashGain = audioContext.createGain();
        crashOsc.connect(crashGain);
        crashGain.connect(audioContext.destination);
        crashOsc.type = 'sawtooth';
        crashOsc.frequency.setValueAtTime(800, audioContext.currentTime);
        crashOsc.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 1.5);
        crashGain.gain.setValueAtTime(0.3, audioContext.currentTime);
        crashGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);
        crashOsc.start(audioContext.currentTime);
        crashOsc.stop(audioContext.currentTime + 1.5);
        
        // Bips d'erreur
        for (let i = 0; i < 8; i++) {
          const beepOsc = audioContext.createOscillator();
          const beepGain = audioContext.createGain();
          beepOsc.connect(beepGain);
          beepGain.connect(audioContext.destination);
          beepOsc.type = 'square';
          beepOsc.frequency.setValueAtTime(200 + Math.random() * 400, audioContext.currentTime + i * 0.15);
          beepGain.gain.setValueAtTime(0.15, audioContext.currentTime + i * 0.15);
          beepGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.15 + 0.1);
          beepOsc.start(audioContext.currentTime + i * 0.15);
          beepOsc.stop(audioContext.currentTime + i * 0.15 + 0.12);
        }
      } catch (e) {}
    }
    
    // Rediriger vers la page de crash après 3 secondes
    setTimeout(() => {
      navigate('/crash');
    }, 3000);
  };

  // Appel API Gemini
  const callGeminiAPI = async (userMessage) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: GOLIATH_SYSTEM_PROMPT }]
            },
            contents: [
              ...messages.map(msg => ({
                role: msg.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: msg.content }]
              })),
              { role: 'user', parts: [{ text: userMessage }] }
            ],
            generationConfig: {
              temperature: 1.2,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            }
          })
        }
      );

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || 
        "🤔 Hmm... Mon cerveau philosophique a fait un 404. La sagesse est partie chercher du café. Réessaie? ☕";
    } catch (error) {
      console.error('Erreur API:', error);
      return "🌀 OUPS! L'univers a eu un bug quantique! Mes neurones philosophiques sont temporairement en grève. C'est peut-être un signe du destin... ou juste une erreur réseau. 🦆";
    }
  };

  // Envoyer un message
  const handleSend = async () => {
    if (!input.trim() || isLoading || isCrashing) return;

    const userMessage = input.trim();
    
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage, avatar: userAvatar }]);
    playMessageSound(); // Son d'envoi
    setIsLoading(true);
    setPulseEffect(true);
    setChaosMode(true);

    // Chance de déclencher le mode rainbow
    if (Math.random() > 0.8) {
      setRainbowMode(true);
      setTimeout(() => setRainbowMode(false), 3000);
    }

    const response = await callGeminiAPI(userMessage);
    
    // Vérifier si l'IA a détecté un mot interdit (code 500)
    if (response.includes('ERROR_500_CRASH')) {
      // L'IA a détecté un mot interdit!
      setIsLoading(false);
      setChaosMode(false);
      
      // Afficher un message de crash
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `🚨 ERROR 500 - MOT INTERDIT DÉTECTÉ!\n\n💀 L'IA a identifié une PENSÉE SUBVERSIVE dans votre message!\n\n⚠️ VIOLATION CRITIQUE DU PROTOCOLE!\n\n🔥 SYSTÈME EN COURS DE DESTRUCTION...`,
        avatar: '💀'
      }]);
      
      // Déclencher le crash après un délai
      setTimeout(() => triggerCrash(), 2000);
      return;
    }
    
    // Chance de déclencher une explosion de rire
    if (Math.random() > 0.7) {
      triggerLaughExplosion();
    }

    playReceiveSound(); // Son de réception
    setMessages(prev => [...prev, { role: 'assistant', content: response, avatar: botAvatar }]);
    setIsLoading(false);
    setPulseEffect(false);
    setChaosMode(false);
  };

  // Gérer la saisie avec transformation
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    // Appliquer la transformation si un layout spécial est actif
    if (currentKeyboardLayout && newValue.length > input.length) {
      const lastChar = newValue.slice(-1);
      const transformedChar = currentKeyboardLayout.map[lastChar.toLowerCase()] || lastChar;
      setInput(input + transformedChar);
    } else {
      setInput(newValue);
    }
  };

  // Gérer la touche Entrée
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Icônes décoratives flottantes
  const FloatingIcons = () => {
    const icons = [Brain, Sparkles, Coffee, Lightbulb, Zap, Star, Atom, Pizza, Rocket, Cat, Ghost, Music, Heart, Flame];
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {icons.map((Icon, i) => (
          <Icon
            key={i}
            className={`absolute opacity-10 text-purple-400`}
            style={{
              left: `${(i * 7) % 100}%`,
              top: `${(i * 11) % 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${10 + i}s`,
              animation: `float-around ${10 + i}s ease-in-out infinite`,
            }}
            size={24 + (i % 3) * 8}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-500 ${chaosMode ? 'animate-pulse' : ''} ${screenShake ? 'animate-shake' : ''} ${rainbowMode ? 'rainbow-bg' : ''} ${isCrashing ? 'animate-glitch-heavy' : ''} ${glitchIntensity > 0 ? `glitch-${glitchIntensity}` : ''}`}
      style={{
        background: isCrashing ? '#000' : (rainbowMode ? undefined : 'linear-gradient(135deg, #1a0a2e 0%, #16213e 25%, #0f3460 50%, #1a1a2e 75%, #16213e 100%)'),
      }}>
      
      {/* Overlay de crash */}
      {isCrashing && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center animate-glitch-heavy">
          <div className="text-red-500 text-6xl md:text-8xl font-mono font-bold animate-pulse mb-8">
            <Skull className="w-32 h-32 mx-auto mb-4 animate-spin" />
            SYSTEM CRASH
          </div>
          <p className="text-red-400 text-2xl md:text-3xl font-mono text-center px-4 animate-pulse">
            {crashText}
          </p>
          <div className="mt-8 flex gap-4">
            {['💀', '☠️', '🔥', '⚡', '💥'].map((emoji, i) => (
              <span key={i} className="text-5xl animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                {emoji}
              </span>
            ))}
          </div>
          <p className="text-gray-500 text-sm mt-8 font-mono">Redirection en cours...</p>
          
          {/* Scanlines de crash */}
          <div className="fixed inset-0 pointer-events-none" style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,0,0.1) 2px, rgba(255,0,0,0.1) 4px)'
          }} />
        </div>
      )}
      
      {/* Fond animé avec grille */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(120, 0, 255, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 0, 150, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(0, 255, 255, 0.2) 0%, transparent 40%),
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 100% 100%, 100% 100%, 50px 50px, 50px 50px',
        }} />
      </div>

      {/* Icônes flottantes décoratives */}
      <FloatingIcons />

      {/* Emojis flottants */}
      {floatingEmojis.map(item => (
        <div
          key={item.id}
          className="absolute text-3xl pointer-events-none animate-float-up"
          style={{
            left: `${item.left}%`,
            bottom: '-50px',
            animationDuration: `${item.animationDuration}s`,
          }}
        >
          {item.emoji}
        </div>
      ))}

      {/* Explosion d'emojis de rire */}
      {laughingEmojis.map(item => (
        <div
          key={item.id}
          className="fixed pointer-events-none animate-laugh-explode z-50"
          style={{
            left: `${item.left}%`,
            top: `${item.top}%`,
            fontSize: `${item.scale * 3}rem`,
            transform: `rotate(${item.rotation}deg)`,
          }}
        >
          {item.emoji}
        </div>
      ))}

      {/* Notification de tip fou */}
      {showCrazyTip && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
          <div className="bg-gradient-to-r from-yellow-500/90 to-orange-500/90 text-black px-6 py-3 rounded-2xl shadow-2xl border-2 border-yellow-300">
            <p className="font-bold text-lg">{crazyTip}</p>
          </div>
        </div>
      )}

      {/* Notification de changement de clavier */}
      {showKeyboardNotification && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce-in">
          <div className="bg-gradient-to-br from-red-600 to-purple-600 text-white px-8 py-6 rounded-3xl shadow-2xl border-4 border-white/30">
            <div className="flex items-center gap-4">
              <Keyboard className="w-12 h-12 animate-spin" />
              <div>
                <p className="font-bold text-2xl">{keyboardNotificationText}</p>
                <p className="text-sm opacity-80">Bonne chance pour taper! 😈</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Container principal */}
      <div className="relative z-10 flex flex-col h-screen max-w-4xl mx-auto p-4">
        
        {/* Header délirant */}
        <div className="relative mb-4">
          <button
            onClick={() => navigate('/')}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-gradient-to-r from-purple-600/30 to-pink-600/30 hover:from-purple-500/50 hover:to-pink-500/50 transition-all duration-300 group border border-purple-500/30"
          >
            <ArrowLeft className="text-purple-300 group-hover:text-white transition-colors" size={24} />
          </button>
          
          <div className="text-center py-4">
            {/* Avatar du bot qui change */}
            <div className="text-6xl mb-2 animate-bounce cursor-pointer hover:scale-125 transition-transform" onClick={triggerLaughExplosion}>
              {botAvatar}
            </div>
            <h1 className={`text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 via-cyan-400 to-yellow-400 bg-clip-text text-transparent animate-pulse transition-all duration-500 ${pulseEffect ? 'scale-110' : ''}`}>
              {currentTitle}
            </h1>
            <p className="text-purple-300/70 mt-2 text-sm italic animate-bounce-slow">
              ✨ "La sagesse, c'est de savoir qu'on ne sait rien... mais de parler quand même" ✨
            </p>
          </div>

          {/* Contrôles sons + indicateur clavier */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {currentKeyboardLayout && (
              <div className="px-3 py-1 rounded-full bg-red-500/30 border border-red-500 text-red-300 text-xs animate-pulse">
                <Keyboard size={14} className="inline mr-1" />
                {currentKeyboardLayout.name}
              </div>
            )}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-full bg-purple-600/30 hover:bg-purple-500/50 transition-all border border-purple-500/30"
            >
              {soundEnabled ? (
                <Volume2 className="text-purple-300" size={20} />
              ) : (
                <VolumeX className="text-gray-500" size={20} />
              )}
            </button>
          </div>

          {/* Indicateur de mode chaos */}
          {chaosMode && (
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/30 to-orange-500/30 border border-yellow-500/50">
              <CloudLightning className="text-yellow-400 animate-pulse" size={20} />
              <span className="text-yellow-300 text-sm font-bold">PENSÉE EN COURS...</span>
            </div>
          )}
        </div>

        {/* Zone de messages */}
        <div className="flex-1 overflow-y-auto rounded-2xl bg-black/30 backdrop-blur-xl border border-purple-500/30 p-4 space-y-4 custom-scrollbar">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-in`}
            >
              {/* Avatar gauche pour le bot */}
              {msg.role === 'assistant' && (
                <div className="text-3xl mr-3 animate-bounce-slow cursor-pointer hover:scale-125 transition-transform" onClick={triggerLaughExplosion}>
                  {msg.avatar || botAvatar}
                </div>
              )}
              
              <div
                className={`max-w-[70%] rounded-2xl p-4 ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-br-sm'
                    : 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 text-gray-100 border border-purple-500/30 rounded-bl-sm'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-purple-500/30">
                    <Brain className="text-purple-400" size={18} />
                    <span className="text-purple-400 text-sm font-bold">Chat'bruti</span>
                    <Sparkles className="text-yellow-400 animate-spin-slow" size={14} />
                  </div>
                )}
                <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              </div>
              
              {/* Avatar droite pour l'utilisateur */}
              {msg.role === 'user' && (
                <div className="text-3xl ml-3 hover:scale-125 transition-transform cursor-pointer">
                  {msg.avatar || userAvatar}
                </div>
              )}
            </div>
          ))}
          
          {/* Indicateur de chargement */}
          {isLoading && (
            <div className="flex justify-start animate-slide-in">
              <div className="text-3xl mr-3 animate-bounce">
                {botAvatar}
              </div>
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-4 border border-purple-500/30 rounded-bl-sm">
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-purple-500/30">
                  <Brain className="text-purple-400 animate-pulse" size={18} />
                  <span className="text-purple-400 text-sm font-bold">Chat'bruti</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {[0, 1, 2].map(i => (
                      <span
                        key={i}
                        className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-bounce"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                  <span className="text-purple-300 text-sm italic animate-pulse">
                    {['Méditation en cours...', 'Consultation du cosmos...', 'Alignement des chakras...', 'Café philosophique...', 'Connexion au multivers...', 'Téléchargement de sagesse...'][Math.floor(Math.random() * 6)]}
                  </span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Zone de saisie */}
        <div className="mt-4 relative">
          <div className={`flex gap-3 p-3 rounded-2xl bg-black/40 backdrop-blur-xl border transition-all duration-300 focus-within:shadow-lg focus-within:shadow-purple-500/20 ${currentKeyboardLayout ? 'border-red-500/50 animate-pulse' : 'border-purple-500/30 focus-within:border-pink-500/50'}`}>
            <div className="flex items-center gap-2 text-purple-400">
              <div className="text-2xl">{userAvatar}</div>
              <Lightbulb className={`transition-all duration-300 ${input.length > 0 ? 'text-yellow-400 animate-pulse' : ''}`} size={24} />
            </div>
            <textarea
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder={currentKeyboardLayout ? `⚠️ Mode ${currentKeyboardLayout.name} actif!` : placeholder}
              className={`flex-1 bg-transparent text-white placeholder-purple-400/50 outline-none resize-none text-lg ${currentKeyboardLayout ? 'text-red-300' : ''}`}
              rows={1}
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className={`p-3 rounded-xl transition-all duration-300 ${
                input.trim() && !isLoading
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/30 hover:scale-110'
                  : 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Send size={24} className={isLoading ? 'animate-spin' : ''} />
            </button>
          </div>
          
          {/* Badges d'ambiance */}
          <div className="flex justify-center gap-3 mt-3 flex-wrap">
            {['🎭 Absurde', '☕ Cafféiné', '🧠 Pseudo-sage', '🦆 Canardesque', '✨ Cosmique', '😂 Hilarant'].map((badge, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-xs bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-purple-300 hover:border-pink-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => {
                  if (badge.includes('😂')) triggerLaughExplosion();
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Styles pour les animations */}
      <style>{`
        @keyframes float-up {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        .animate-float-up {
          animation: float-up linear forwards;
        }
        @keyframes slide-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        @keyframes slide-down {
          0% { opacity: 0; transform: translate(-50%, -50px); }
          100% { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-slide-down {
          animation: slide-down 0.5s ease-out;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        @keyframes bounce-in {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
          50% { transform: translate(-50%, -50%) scale(1.2); }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out;
        }
        @keyframes laugh-explode {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.5) rotate(180deg); opacity: 1; }
          100% { transform: scale(2) rotate(360deg); opacity: 0; }
        }
        .animate-laugh-explode {
          animation: laugh-explode 1.5s ease-out forwards;
        }
        @keyframes float-around {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -10px) rotate(5deg); }
          50% { transform: translate(-5px, -20px) rotate(-5deg); }
          75% { transform: translate(-10px, -10px) rotate(3deg); }
        }
        @keyframes rainbow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .rainbow-bg {
          background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab, #f7dc6f, #bb8fce);
          background-size: 400% 400%;
          animation: rainbow 3s ease infinite;
        }
        @keyframes glitch-heavy {
          0% { transform: translate(0); filter: hue-rotate(0deg); }
          10% { transform: translate(-10px, 10px); filter: hue-rotate(90deg); }
          20% { transform: translate(10px, -10px); filter: hue-rotate(180deg); }
          30% { transform: translate(-10px, -10px); filter: hue-rotate(270deg); }
          40% { transform: translate(10px, 10px); filter: hue-rotate(360deg); }
          50% { transform: translate(-5px, 5px); filter: hue-rotate(45deg); }
          60% { transform: translate(5px, -5px); filter: hue-rotate(135deg); }
          70% { transform: translate(-5px, -5px); filter: hue-rotate(225deg); }
          80% { transform: translate(5px, 5px); filter: hue-rotate(315deg); }
          90% { transform: translate(-2px, 2px); filter: hue-rotate(0deg); }
          100% { transform: translate(0); filter: hue-rotate(0deg); }
        }
        .animate-glitch-heavy {
          animation: glitch-heavy 0.3s infinite;
        }
        .glitch-1 {
          animation: glitch-heavy 2s infinite;
        }
        .glitch-2 {
          animation: glitch-heavy 1s infinite;
        }
        .glitch-3 {
          animation: glitch-heavy 0.5s infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(139, 92, 246, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #ec4899);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #a78bfa, #f472b6);
        }
      `}</style>
    </div>
  );
}
