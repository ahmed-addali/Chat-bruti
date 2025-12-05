import React, { useState, useEffect, useRef, useCallback } from 'react';

// Messages moqueurs du bot
const MOCKING_MESSAGES = [
  "HAHA! J'ai volé ton bouton! 😈",
  "Ce mot est à moi maintenant!",
  "Tu tapes trop lentement! 🐌",
  "Essaie de m'attraper!",
  "Je suis plus rapide que toi!",
  "Miam miam, délicieux!",
  "Ta phrase m'appartient!",
  "GOLIATH-OS approuve ce vol!",
  "Tu voulais envoyer ça? NOPE!",
  "Je collectionne tes pensées!",
  "C'est MON interface maintenant!",
  "Trop lent, humain!",
  "*rire maléfique*",
  "Tu ne peux rien faire! MUHAHA!",
  "Je suis le maître ici!",
];

const IDLE_MESSAGES = [
  "Je m'ennuie... 😴",
  "Tu vas écrire ou quoi?",
  "Allez, tape quelque chose!",
  "Je guette ta prochaine erreur...",
  "Mon sac est presque vide...",
  "*bâillement*",
  "Tu as peur de moi? 😏",
  "Zzz... hein quoi?",
];

const RETURN_MESSAGES = [
  "Bon, je te rends ça... pour l'instant!",
  "Voilà, mais je reviendrai!",
  "Prends ça, ingrat!",
  "La prochaine fois, je garde tout!",
  "Cadeau! ...ou pas.",
];

const FLEE_MESSAGES = [
  "Tu ne m'attraperas pas! 🏃",
  "Raté! Haha!",
  "Trop lent!",
  "Nan nan nan! 😜",
  "Essaie encore!",
  "Je suis INVINCIBLE!",
  "Même pas en rêve!",
  "C'est tout ce que tu sais faire?",
];

const CAUGHT_MESSAGES = [
  "NOOON! Tu m'as eu! 😭",
  "OK OK! Je rends tout!",
  "Argh! Tu es trop fort!",
  "Pas juste! 😤",
  "Je reviendrai! 🔥",
];

export default function CrazyBot({ 
  onStealSendButton, 
  onStealMessage, 
  onReturnItems,
  messagesCount = 0,
  isActive = true 
}) {
  // Position et état du bot
  const [position, setPosition] = useState({ x: 15, y: 30 });
  const [direction, setDirection] = useState(1); // 1 = droite, -1 = gauche
  const [isRunning, setIsRunning] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [currentAction, setCurrentAction] = useState('idle');
  const [collectedItems, setCollectedItems] = useState([]);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  
  // Animation states
  const [walkFrame, setWalkFrame] = useState(0);
  const [eyeState, setEyeState] = useState('open'); // open, blink, happy, angry
  const [eyeLookDir, setEyeLookDir] = useState({ x: 0, y: 0 });
  const [mouthState, setMouthState] = useState('smile'); // smile, open, laugh, evil
  const [armState, setArmState] = useState('idle'); // idle, grabbing, holding, waving
  const [bodyBounce, setBodyBounce] = useState(0);
  const [bagShake, setBagShake] = useState(false);
  
  // Mouse interaction states
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isFleeing, setIsFleeing] = useState(false);
  const [isCaught, setIsCaught] = useState(false);
  const [fleeSpeed, setFleeSpeed] = useState(3);
  const [panicLevel, setPanicLevel] = useState(0); // 0-3, increases when mouse is close
  
  const moveIntervalRef = useRef(null);
  const fleeIntervalRef = useRef(null);
  const botRef = useRef(null);

  // Clignement automatique des yeux
  useEffect(() => {
    if (!isActive) return;
    
    const blinkInterval = setInterval(() => {
      if (Math.random() > 0.6 && eyeState === 'open') {
        setEyeState('blink');
        setTimeout(() => setEyeState('open'), 150);
      }
    }, 2500);
    
    return () => clearInterval(blinkInterval);
  }, [isActive, eyeState]);

  // Animation de marche
  useEffect(() => {
    if (!isActive) return;
    
    const walkInterval = setInterval(() => {
      if (isRunning || isFleeing) {
        setWalkFrame(prev => (prev + 1) % 8);
        setBodyBounce(prev => prev === 0 ? 3 : 0);
      } else {
        setBodyBounce(0);
      }
    }, isFleeing ? 50 : 100); // Plus rapide quand il fuit
    
    return () => clearInterval(walkInterval);
  }, [isRunning, isFleeing, isActive]);

  // Track mouse position
  useEffect(() => {
    if (!isActive) return;
    
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isActive]);

  // Flee from mouse when it gets close
  useEffect(() => {
    if (!isActive || isCaught || currentAction === 'hunting') return;
    
    const checkDistance = () => {
      const dx = mousePos.x - position.x;
      const dy = mousePos.y - position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Détection de proximité - différents niveaux de panique
      if (distance < 8) {
        setPanicLevel(3);
        setFleeSpeed(5);
      } else if (distance < 15) {
        setPanicLevel(2);
        setFleeSpeed(4);
      } else if (distance < 25) {
        setPanicLevel(1);
        setFleeSpeed(3);
      } else {
        setPanicLevel(0);
      }
      
      // Si la souris est proche, fuir!
      if (distance < 25 && !isFleeing && currentAction === 'idle') {
        fleeFromMouse(dx, dy, distance);
      }
    };
    
    const interval = setInterval(checkDistance, 50);
    return () => clearInterval(interval);
  }, [isActive, mousePos, position, isFleeing, isCaught, currentAction]);

  // Fuir la souris
  const fleeFromMouse = useCallback((dx, dy, distance) => {
    if (isCaught) return;
    
    setIsFleeing(true);
    setIsRunning(true);
    setEyeState('angry');
    setMouthState('open');
    
    // Direction opposée à la souris
    const fleeX = position.x - (dx / distance) * fleeSpeed * 5;
    const fleeY = position.y - (dy / distance) * fleeSpeed * 5;
    
    // Garder dans les limites de l'écran
    const boundedX = Math.max(5, Math.min(95, fleeX));
    const boundedY = Math.max(10, Math.min(85, fleeY));
    
    setDirection(dx > 0 ? -1 : 1); // Regarder dans la direction de fuite
    
    // Message moqueur occasionnel
    if (Math.random() > 0.7) {
      speak(FLEE_MESSAGES[Math.floor(Math.random() * FLEE_MESSAGES.length)], 'mock');
    }
    
    // Mouvement de fuite
    if (fleeIntervalRef.current) clearInterval(fleeIntervalRef.current);
    
    fleeIntervalRef.current = setInterval(() => {
      setPosition(prev => {
        const targetDx = boundedX - prev.x;
        const targetDy = boundedY - prev.y;
        const targetDist = Math.sqrt(targetDx * targetDx + targetDy * targetDy);
        
        if (targetDist < 2) {
          clearInterval(fleeIntervalRef.current);
          setIsFleeing(false);
          setIsRunning(false);
          setEyeState('open');
          setMouthState('smile');
          return prev;
        }
        
        return {
          x: prev.x + (targetDx / targetDist) * fleeSpeed,
          y: prev.y + (targetDy / targetDist) * fleeSpeed
        };
      });
    }, 20);
    
    // Timeout pour arrêter de fuir
    setTimeout(() => {
      if (fleeIntervalRef.current) clearInterval(fleeIntervalRef.current);
      setIsFleeing(false);
      setIsRunning(false);
    }, 800);
  }, [position, fleeSpeed, isCaught]);

  // Handle click on bot - CATCH HIM! (UN SEUL CLIC)
  const handleBotClick = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    
    // Empêcher les clics multiples
    if (isCaught) return;
    
    if (collectedItems.length === 0) {
      speak("Je n'ai rien volé! ...pour l'instant 😏", 'mock');
      return;
    }
    
    // ATTRAPÉ! Retourner IMMÉDIATEMENT tous les éléments
    setIsCaught(true);
    setIsFleeing(false);
    setIsRunning(false);
    setEyeState('happy');
    setMouthState('open');
    
    speak(CAUGHT_MESSAGES[Math.floor(Math.random() * CAUGHT_MESSAGES.length)], 'normal');
    
    // Rendre les objets IMMÉDIATEMENT
    if (onReturnItems) {
      onReturnItems([...collectedItems]);
    }
    setCollectedItems([]);
    
    // Animation de capture
    setIsJumping(true);
    setBagShake(true);
    
    setTimeout(() => {
      setIsJumping(false);
      setBagShake(false);
      
      // Reset après un moment
      setTimeout(() => {
        setIsCaught(false);
        setEyeState('open');
        setMouthState('smile');
        speak("Je reviendrai me venger! 😈", 'evil');
      }, 1500);
    }, 500);
  }, [collectedItems, onReturnItems, isCaught]);

  // Faire parler le bot
  const speak = (text, emotion = 'normal') => {
    setMessage(text);
    setShowMessage(true);
    
    // Changer l'expression selon l'émotion
    if (emotion === 'evil') {
      setEyeState('angry');
      setMouthState('evil');
    } else if (emotion === 'happy') {
      setEyeState('happy');
      setMouthState('laugh');
    } else if (emotion === 'mock') {
      setMouthState('open');
    }
    
    // Text-to-speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.1 + Math.random() * 0.4;
      utterance.pitch = 1.3 + Math.random() * 0.5;
      utterance.volume = 0.8;
      
      const voices = window.speechSynthesis.getVoices();
      const frenchVoices = voices.filter(v => v.lang.includes('fr'));
      if (frenchVoices.length > 0) {
        utterance.voice = frenchVoices[Math.floor(Math.random() * frenchVoices.length)];
      }
      
      window.speechSynthesis.speak(utterance);
    }
    
    setTimeout(() => {
      setShowMessage(false);
      setEyeState('open');
      setMouthState('smile');
    }, 3000);
  };

  // Mouvement fluide vers une cible
  const moveToTarget = (targetX, targetY, callback) => {
    if (moveIntervalRef.current) {
      clearInterval(moveIntervalRef.current);
    }
    
    setIsRunning(true);
    setDirection(targetX > position.x ? 1 : -1);
    
    moveIntervalRef.current = setInterval(() => {
      setPosition(prev => {
        const dx = targetX - prev.x;
        const dy = targetY - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 2) {
          clearInterval(moveIntervalRef.current);
          setIsRunning(false);
          if (callback) setTimeout(callback, 100);
          return { x: targetX, y: targetY };
        }
        
        const speed = 1.5;
        return {
          x: prev.x + (dx / distance) * speed,
          y: prev.y + (dy / distance) * speed
        };
      });
    }, 30);
  };

  // Voler le bouton d'envoi
  const stealSendButton = () => {
    if (currentAction !== 'idle') return;
    
    setCurrentAction('hunting');
    speak("Je vais voler ton bouton! 🎯", 'evil');
    setEyeLookDir({ x: 1, y: 1 });
    
    moveToTarget(85, 88, () => {
      setArmState('grabbing');
      setIsJumping(true);
      
      setTimeout(() => {
        setIsJumping(false);
        setArmState('holding');
        setCollectedItems(prev => [...prev, { type: 'button', icon: '📤', text: 'Envoyer' }]);
        setBagShake(true);
        setTimeout(() => setBagShake(false), 500);
        
        speak(MOCKING_MESSAGES[Math.floor(Math.random() * MOCKING_MESSAGES.length)], 'happy');
        if (onStealSendButton) onStealSendButton();
        
        setTimeout(() => {
          setArmState('idle');
          const escapeX = 10 + Math.random() * 30;
          moveToTarget(escapeX, 25 + Math.random() * 30, () => {
            setCurrentAction('idle');
            setEyeLookDir({ x: 0, y: 0 });
          });
        }, 800);
      }, 400);
    });
  };

  // Voler un message entier de la conversation
  const stealMessage = () => {
    if (currentAction !== 'idle' || messagesCount <= 1) return;
    
    setCurrentAction('hunting');
    speak("Je vais voler un de tes messages! 📦", 'evil');
    setEyeLookDir({ x: 0, y: -0.5 });
    
    // Aller vers la zone des messages (milieu de l'écran)
    const targetX = 30 + Math.random() * 40;
    const targetY = 40 + Math.random() * 20;
    
    moveToTarget(targetX, targetY, () => {
      setArmState('grabbing');
      setIsJumping(true);
      
      setTimeout(() => {
        setIsJumping(false);
        setArmState('holding');
        
        // Appeler le handler pour voler le message
        const stolenMsg = onStealMessage ? onStealMessage() : null;
        
        if (stolenMsg) {
          setCollectedItems(prev => [...prev, { 
            type: 'message', 
            icon: stolenMsg.role === 'user' ? '👤' : '🤖', 
            text: stolenMsg.content.substring(0, 20) + '...' 
          }]);
          setBagShake(true);
          setTimeout(() => setBagShake(false), 500);
          
          speak("MESSAGE VOLÉ! Ta conversation m'appartient! 😈", 'happy');
        } else {
          speak("Hmm, rien à voler ici...", 'normal');
        }
        
        setTimeout(() => {
          setArmState('idle');
          moveToTarget(70 + Math.random() * 20, 20 + Math.random() * 25, () => {
            setCurrentAction('idle');
            setEyeLookDir({ x: 0, y: 0 });
          });
        }, 600);
      }, 400);
    });
  };

  // Voler un élément décoratif
  const stealDecoration = () => {
    if (currentAction !== 'idle') return;
    
    const decorations = [
      { icon: '⭐', name: 'étoile' },
      { icon: '✨', name: 'étincelle' },
      { icon: '💡', name: 'ampoule' },
      { icon: '🎵', name: 'note' },
      { icon: '🌟', name: 'brillance' },
    ];
    const deco = decorations[Math.floor(Math.random() * decorations.length)];
    
    setCurrentAction('hunting');
    speak(`Oh! Une ${deco.name}! MINE!`, 'happy');
    
    const targetX = 20 + Math.random() * 60;
    const targetY = 15 + Math.random() * 40;
    
    moveToTarget(targetX, targetY, () => {
      setArmState('grabbing');
      setIsJumping(true);
      
      setTimeout(() => {
        setIsJumping(false);
        setArmState('holding');
        setCollectedItems(prev => [...prev, { type: 'deco', icon: deco.icon, text: deco.name }]);
        setBagShake(true);
        setTimeout(() => setBagShake(false), 400);
        
        speak('Dans ma collection!', 'happy');
        
        setTimeout(() => {
          setArmState('idle');
          wanderAround();
          setCurrentAction('idle');
        }, 500);
      }, 300);
    });
  };

  // Retourner les objets
  const returnItems = () => {
    if (collectedItems.length === 0 || currentAction !== 'idle') return;
    
    setCurrentAction('returning');
    speak(RETURN_MESSAGES[Math.floor(Math.random() * RETURN_MESSAGES.length)], 'mock');
    
    moveToTarget(50, 60, () => {
      setArmState('waving');
      setIsJumping(true);
      
      setTimeout(() => {
        setIsJumping(false);
        if (onReturnItems) onReturnItems(collectedItems);
        setCollectedItems([]);
        
        setTimeout(() => {
          setArmState('idle');
          speak("Je reviendrai! 😈", 'evil');
          wanderAround();
          setCurrentAction('idle');
        }, 500);
      }, 600);
    });
  };

  // Se balader
  const wanderAround = () => {
    const randomX = 10 + Math.random() * 80;
    const randomY = 15 + Math.random() * 60;
    moveToTarget(randomX, randomY, () => {});
  };

  // Regarder autour
  const lookAround = () => {
    const dirs = [
      { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 },
      { x: -1, y: -1 }, { x: 1, y: 1 }, { x: 0, y: 0 }
    ];
    let i = 0;
    const lookInterval = setInterval(() => {
      setEyeLookDir(dirs[i % dirs.length]);
      i++;
      if (i >= dirs.length) {
        clearInterval(lookInterval);
        setEyeLookDir({ x: 0, y: 0 });
      }
    }, 400);
  };

  // Danser
  const dance = () => {
    speak("💃 C'est l'heure de danser! 🕺", 'happy');
    setCurrentAction('dancing');
    
    let step = 0;
    const danceInterval = setInterval(() => {
      step++;
      setDirection(step % 2 === 0 ? 1 : -1);
      setPosition(prev => ({
        x: prev.x + (step % 2 === 0 ? 3 : -3),
        y: prev.y
      }));
      setWalkFrame(step % 8);
      
      if (step > 12) {
        clearInterval(danceInterval);
        setCurrentAction('idle');
      }
    }, 150);
  };

  // AI automatique
  useEffect(() => {
    if (!isActive || isCaught) return;
    
    const interval = setInterval(() => {
      if (currentAction !== 'idle' || isFleeing || isCaught) return;
      
      const rand = Math.random();
      
      // Ne plus retourner les objets automatiquement - il faut l'attraper!
      if (rand < 0.15) {
        stealSendButton();
      } else if (rand < 0.30 && messagesCount > 1) {
        stealMessage(); // Voler un message entier
      } else if (rand < 0.40) {
        stealDecoration();
      } else if (rand < 0.55) {
        speak(IDLE_MESSAGES[Math.floor(Math.random() * IDLE_MESSAGES.length)], 'normal');
        lookAround();
      } else if (rand < 0.65) {
        dance();
      } else {
        wanderAround();
      }
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isActive, currentAction, messagesCount, collectedItems.length, isFleeing, isCaught]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (moveIntervalRef.current) clearInterval(moveIntervalRef.current);
      if (fleeIntervalRef.current) clearInterval(fleeIntervalRef.current);
    };
  }, []);

  if (!isActive) return null;

  // Calcul des animations - plus rapide quand il fuit
  const animSpeed = isFleeing ? 2 : 1;
  const legAngle1 = (isRunning || isFleeing) ? Math.sin(walkFrame * Math.PI / 4 * animSpeed) * (isFleeing ? 45 : 30) : 0;
  const legAngle2 = (isRunning || isFleeing) ? Math.sin((walkFrame + 4) * Math.PI / 4 * animSpeed) * (isFleeing ? 45 : 30) : 0;
  const armAngle1 = (isRunning || isFleeing) ? Math.sin(walkFrame * Math.PI / 4 * animSpeed) * (isFleeing ? 40 : 25) : (armState === 'waving' ? Math.sin(Date.now() / 100) * 30 : 0);
  const armAngle2 = (isRunning || isFleeing) ? Math.sin((walkFrame + 4) * Math.PI / 4 * animSpeed) * (isFleeing ? 40 : 25) : (armState === 'grabbing' ? -45 : armState === 'holding' ? -30 : 0);
  const jumpOffset = isJumping ? -20 : 0;
  
  // Tremblement quand en panique
  const panicShake = panicLevel > 0 ? Math.sin(Date.now() / 50) * panicLevel * 2 : 0;

  return (
    <>
      {/* Le personnage - CLICKABLE pour l'attraper! Zone de clic agrandie */}
      <div
        ref={botRef}
        onClick={handleBotClick}
        className={`fixed z-[100] cursor-pointer select-none ${isCaught ? 'pointer-events-none' : 'pointer-events-auto'} ${panicLevel > 1 ? 'animate-pulse' : ''}`}
        style={{
          left: `${position.x}%`,
          top: `calc(${position.y}% + ${jumpOffset}px - ${bodyBounce}px + ${panicShake}px)`,
          transform: `translate(-50%, -50%) scaleX(${direction}) ${isCaught ? 'scale(1.2)' : ''}`,
          filter: isCaught ? 'brightness(1.5)' : (panicLevel > 2 ? 'hue-rotate(20deg)' : 'none'),
          padding: '20px', // Zone de clic plus grande
          margin: '-20px',
        }}
      >
        {/* Indicateur "Attrapez-moi!" quand il a des objets */}
        {collectedItems.length > 0 && !isCaught && (
          <div 
            className="absolute -top-20 left-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap animate-bounce shadow-lg"
            style={{ transform: `translateX(-50%) scaleX(${direction})` }}
          >
            🎯 Attrapez-moi pour récupérer vos trucs!
          </div>
        )}
        
        {/* Bulle de dialogue */}
        {showMessage && (
          <div 
            className="absolute -top-16 left-1/2 bg-white text-black px-3 py-2 rounded-xl shadow-lg text-sm font-bold whitespace-nowrap z-10 animate-bounce"
            style={{ transform: `translateX(-50%) scaleX(${direction})` }}
          >
            {message}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white" />
          </div>
        )}

        {/* SVG du personnage */}
        <svg width="70" height="90" viewBox="0 0 70 90">
          {/* Ombre */}
          <ellipse cx="35" cy="88" rx="20" ry="4" fill="rgba(0,0,0,0.2)" />
          
          {/* Jambe gauche */}
          <g style={{ transformOrigin: '25px 55px', transform: `rotate(${legAngle1}deg)` }}>
            <rect x="22" y="55" width="8" height="22" rx="4" fill="#3B82F6" />
            <ellipse cx="26" cy="80" rx="7" ry="4" fill="#1E40AF" />
          </g>
          
          {/* Jambe droite */}
          <g style={{ transformOrigin: '45px 55px', transform: `rotate(${legAngle2}deg)` }}>
            <rect x="40" y="55" width="8" height="22" rx="4" fill="#3B82F6" />
            <ellipse cx="44" cy="80" rx="7" ry="4" fill="#1E40AF" />
          </g>
          
          {/* Corps */}
          <ellipse cx="35" cy="45" rx="18" ry="15" fill="#8B5CF6" />
          <ellipse cx="35" cy="45" rx="14" ry="11" fill="#A78BFA" />
          
          {/* Boutons sur le corps */}
          <circle cx="35" cy="40" r="2" fill="#FCD34D" />
          <circle cx="35" cy="48" r="2" fill="#FCD34D" />
          
          {/* Bras gauche */}
          <g style={{ transformOrigin: '20px 38px', transform: `rotate(${armAngle1}deg)` }}>
            <rect x="8" y="38" width="6" height="18" rx="3" fill="#8B5CF6" />
            <circle cx="11" cy="58" r="5" fill="#FCD34D" />
          </g>
          
          {/* Bras droit */}
          <g style={{ transformOrigin: '50px 38px', transform: `rotate(${armAngle2}deg)` }}>
            <rect x="56" y="38" width="6" height="18" rx="3" fill="#8B5CF6" />
            <circle cx="59" cy="58" r="5" fill="#FCD34D" />
            {/* Objet tenu */}
            {armState === 'holding' && collectedItems.length > 0 && (
              <text x="59" y="65" fontSize="12" textAnchor="middle">{collectedItems[collectedItems.length - 1].icon}</text>
            )}
          </g>
          
          {/* Tête */}
          <circle cx="35" cy="18" r="16" fill="#FCD34D" />
          <circle cx="35" cy="18" r="14" fill="#FDE68A" />
          
          {/* Yeux */}
          <g style={{ transform: `translate(${eyeLookDir.x * 2}px, ${eyeLookDir.y * 2}px)` }}>
            {/* Oeil gauche */}
            {eyeState === 'blink' ? (
              <line x1="26" y1="16" x2="32" y2="16" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
            ) : eyeState === 'happy' ? (
              <path d="M26 17 Q29 14 32 17" stroke="#1F2937" strokeWidth="2" fill="none" />
            ) : eyeState === 'angry' ? (
              <>
                <ellipse cx="29" cy="16" rx="4" ry="5" fill="white" />
                <circle cx="29" cy="17" r="2.5" fill="#DC2626" />
                <line x1="25" y1="12" x2="33" y2="14" stroke="#1F2937" strokeWidth="2" />
              </>
            ) : (
              <>
                <ellipse cx="29" cy="16" rx="4" ry="5" fill="white" />
                <circle cx="29" cy="17" r="2.5" fill="#1F2937" />
                <circle cx="30" cy="16" r="1" fill="white" />
              </>
            )}
            
            {/* Oeil droit */}
            {eyeState === 'blink' ? (
              <line x1="38" y1="16" x2="44" y2="16" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
            ) : eyeState === 'happy' ? (
              <path d="M38 17 Q41 14 44 17" stroke="#1F2937" strokeWidth="2" fill="none" />
            ) : eyeState === 'angry' ? (
              <>
                <ellipse cx="41" cy="16" rx="4" ry="5" fill="white" />
                <circle cx="41" cy="17" r="2.5" fill="#DC2626" />
                <line x1="37" y1="14" x2="45" y2="12" stroke="#1F2937" strokeWidth="2" />
              </>
            ) : (
              <>
                <ellipse cx="41" cy="16" rx="4" ry="5" fill="white" />
                <circle cx="41" cy="17" r="2.5" fill="#1F2937" />
                <circle cx="42" cy="16" r="1" fill="white" />
              </>
            )}
          </g>
          
          {/* Bouche */}
          {mouthState === 'laugh' ? (
            <path d="M30 25 Q35 32 40 25" stroke="#1F2937" strokeWidth="2" fill="#DC2626" />
          ) : mouthState === 'evil' ? (
            <path d="M28 26 Q35 30 42 26" stroke="#1F2937" strokeWidth="2" fill="none" />
          ) : mouthState === 'open' ? (
            <ellipse cx="35" cy="26" rx="4" ry="3" fill="#1F2937" />
          ) : (
            <path d="M30 25 Q35 28 40 25" stroke="#1F2937" strokeWidth="2" fill="none" />
          )}
          
          {/* Joues roses */}
          <circle cx="22" cy="20" r="3" fill="#F9A8D4" opacity="0.5" />
          <circle cx="48" cy="20" r="3" fill="#F9A8D4" opacity="0.5" />
          
          {/* Petites cornes/antennes */}
          <path d="M25 5 Q23 0 27 3" stroke="#8B5CF6" strokeWidth="2" fill="none" />
          <path d="M45 5 Q47 0 43 3" stroke="#8B5CF6" strokeWidth="2" fill="none" />
        </svg>

        {/* Sac à dos avec objets volés */}
        <div 
          className={`absolute -right-6 top-8 w-10 h-12 bg-gradient-to-b from-amber-500 to-amber-700 rounded-lg border-2 border-amber-800 shadow-lg ${bagShake ? 'animate-shake' : ''}`}
          style={{ transform: `scaleX(${direction})` }}
        >
          {/* Objets dans le sac */}
          <div className="flex flex-wrap justify-center gap-0.5 p-1">
            {collectedItems.slice(-4).map((item, i) => (
              <span key={i} className="text-xs">{item.icon}</span>
            ))}
          </div>
          {/* Badge compteur */}
          {collectedItems.length > 0 && (
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold animate-pulse">
              {collectedItems.length}
            </div>
          )}
        </div>
        
        {/* Indicateur de panique (gouttes de sueur) */}
        {panicLevel > 0 && (
          <div className="absolute -top-2 -right-2">
            {[...Array(panicLevel)].map((_, i) => (
              <span key={i} className="text-lg animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>💧</span>
            ))}
          </div>
        )}
        
        {/* Effet de vitesse quand il fuit */}
        {isFleeing && (
          <div className="absolute left-full top-1/2 -translate-y-1/2 flex gap-1" style={{ transform: `scaleX(${-direction})` }}>
            {[...Array(3)].map((_, i) => (
              <div 
                key={i}
                className="w-4 h-1 bg-white/40 rounded-full animate-pulse"
                style={{ 
                  animationDelay: `${i * 0.1}s`,
                  opacity: 0.6 - i * 0.15
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Particules de capture */}
      {isJumping && (
        <div 
          className="fixed pointer-events-none z-[99]"
          style={{ left: `${position.x}%`, top: `${position.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-yellow-400 rounded-full animate-ping"
              style={{
                left: Math.cos(i * Math.PI / 3) * 40,
                top: Math.sin(i * Math.PI / 3) * 40,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '0.5s',
              }}
            />
          ))}
        </div>
      )}
      
      {/* Effet de capture réussie */}
      {isCaught && (
        <div 
          className="fixed pointer-events-none z-[99]"
          style={{ left: `${position.x}%`, top: `${position.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-ping"
              style={{
                left: Math.cos(i * Math.PI / 6) * 60,
                top: Math.sin(i * Math.PI / 6) * 60,
                animationDelay: `${i * 0.05}s`,
                animationDuration: '0.8s',
              }}
            >
              {['⭐', '✨', '💫', '🎉'][i % 4]}
            </div>
          ))}
        </div>
      )}

      {/* Style pour l'animation shake */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          75% { transform: rotate(10deg); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </>
  );
}