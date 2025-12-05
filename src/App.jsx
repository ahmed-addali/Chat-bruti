import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Timer from './components/Timer';
import ChatBot from './components/ChatBot';
import CrashScene from './components/CrashScene';
import Utopia from './components/Utopia';

// Landing Page Component
function LandingPage() {
  const navigate = useNavigate();

  const handlePayClick = () => {
    navigate('/chatbot');
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <Timer
        duration={10}
        onComplete={() => {}}
        onPayClick={handlePayClick}
      />
    </div>
  );
}

// ChatBot Page Component
function ChatBotPage() {
  const navigate = useNavigate();

  const handleCrash = () => {
    navigate('/crash');
  };

  return <ChatBot onCrash={handleCrash} />;
}

// Crash Page Component
function CrashPage() {
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate('/utopia');
  };

  return <CrashScene onComplete={handleComplete} />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chatbot" element={<ChatBotPage />} />
        <Route path="/crash" element={<CrashPage />} />
        <Route path="/utopia" element={<Utopia />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
