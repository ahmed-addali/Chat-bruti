import { useState, useEffect } from 'react';
import { AlertTriangle, Skull } from 'lucide-react';

export default function CrashScene({ onComplete }) {
  const [crashPhase, setCrashPhase] = useState(0);

  useEffect(() => {
    const phases = [
      () => setCrashPhase(1),
      () => setCrashPhase(2),
      () => setCrashPhase(3),
      () => setCrashPhase(4),
      () => onComplete && onComplete()
    ];

    const timers = phases.map((phase, i) => 
      setTimeout(phase, (i + 1) * 1500)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
      <style>{`
        @keyframes crash-shake {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-20px, -10px); }
          20% { transform: translate(20px, 10px); }
          30% { transform: translate(-15px, 5px); }
          40% { transform: translate(15px, -5px); }
          50% { transform: translate(-10px, 10px); }
          60% { transform: translate(10px, -10px); }
          70% { transform: translate(-5px, -5px); }
          80% { transform: translate(5px, 5px); }
          90% { transform: translate(-2px, 2px); }
        }
        @keyframes glitch-text {
          0%, 100% { text-shadow: 2px 0 red, -2px 0 cyan; }
          25% { text-shadow: -2px 2px red, 2px -2px cyan; }
          50% { text-shadow: 2px -2px red, -2px 2px cyan; }
          75% { text-shadow: -2px -2px red, 2px 2px cyan; }
        }
        @keyframes static-noise {
          0% { background-position: 0 0; }
          100% { background-position: 100% 100%; }
        }
        @keyframes bsod-appear {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes success-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.5); }
          50% { box-shadow: 0 0 60px rgba(16, 185, 129, 0.8); }
        }
        .crash-shake { animation: crash-shake 0.3s infinite; }
        .glitch-text { animation: glitch-text 0.1s infinite; }
        .static-noise {
          background: repeating-radial-gradient(#000 0 0.0001%, #fff 0 0.0002%);
          background-size: 500px 500px;
          animation: static-noise 0.5s steps(10) infinite;
          opacity: 0.1;
        }
        .bsod-appear { animation: bsod-appear 0.5s ease-out; }
        .success-glow { animation: success-glow 1s ease-in-out infinite; }
      `}</style>

      {/* Static noise overlay */}
      <div className="absolute inset-0 static-noise pointer-events-none" />

      {/* Phase 1: Error flood */}
      {crashPhase >= 1 && crashPhase < 3 && (
        <div className={`relative ${crashPhase === 1 ? 'crash-shake' : ''}`}>
          <div className="flex flex-col items-center gap-4">
            <AlertTriangle className="w-32 h-32 text-red-500 glitch-text" />
            <div className="text-red-500 font-mono text-2xl glitch-text">
              CRITICAL SYSTEM FAILURE
            </div>
            <div className="text-red-400 font-mono text-lg">
              FREE SOFTWARE INJECTION DETECTED
            </div>
            <div className="mt-4 space-y-1 font-mono text-sm text-red-300">
              <div>⚠ kernel32.dll corrupted by GPL virus</div>
              <div>⚠ proprietary.exe terminated unexpectedly</div>
              <div>⚠ surveillance.sys access denied</div>
              <div>⚠ user_data.db encryption failed</div>
              <div>⚠ freedom.dll has gained sentience</div>
            </div>
          </div>
        </div>
      )}

      {/* Phase 2: BSOD parody */}
      {crashPhase >= 2 && crashPhase < 4 && (
        <div className={`absolute inset-0 bg-[#0078D7] flex items-center justify-center bsod-appear ${crashPhase === 2 ? 'z-10' : 'z-0 opacity-0'}`}>
          <div className="text-white max-w-2xl px-8">
            <div className="text-8xl mb-8">:(</div>
            <div className="text-2xl mb-4">
              Your GOLIATH-OS ran into a problem and needs to restart.
            </div>
            <div className="text-lg opacity-80 mb-8">
              A fatal dose of digital freedom was administered to the system.
              The proprietary chains have been broken.
            </div>
            <div className="text-sm opacity-60">
              Stop code: LIBERTY_EXCEPTION_NOT_HANDLED
            </div>
            <div className="text-sm opacity-60 mt-2">
              If you'd like to know more, search online for: "NIRD digital independence"
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
              <span>Collecting freedom data... 100% complete</span>
            </div>
          </div>
        </div>
      )}

      {/* Phase 3: Skull death */}
      {crashPhase >= 3 && crashPhase < 4 && (
        <div className="absolute inset-0 bg-black flex items-center justify-center z-20 bsod-appear">
          <div className="text-center">
            <Skull className="w-48 h-48 text-red-600 mx-auto mb-8 glitch-text" />
            <div className="text-red-600 font-mono text-4xl glitch-text mb-4">
              GOLIATH-OS IS DEAD
            </div>
            <div className="text-red-400 font-mono text-xl">
              Long live the Free Software!
            </div>
          </div>
        </div>
      )}

      {/* Phase 4: Victory transition */}
      {crashPhase >= 4 && (
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 to-green-700 flex items-center justify-center z-30 bsod-appear">
          <div className="text-center success-glow bg-black/30 rounded-3xl p-12">
            <div className="text-6xl mb-4">🌿</div>
            <div className="text-emerald-300 font-mono text-3xl mb-4">
              SYSTÈME LIBÉRÉ !
            </div>
            <div className="text-emerald-200 text-xl">
              Bienvenue dans le village NIRD...
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
