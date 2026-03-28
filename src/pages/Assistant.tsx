import FuturisticAssistant from '../components/FuturisticAssistant';
import '../styles/assistantFuturistic.css';

const Assistant = () => {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', minHeight: '100vh', minWidth: '100vw', overflow: 'hidden', fontFamily: "'Orbitron', sans-serif" }}>
      <div
        className="assistant-futuristic-bg"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          minWidth: '100vw',
          minHeight: '100vh',
          zIndex: 0,
          backgroundImage: "url('/BalonBackground.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Overlay Oscuro para profundidad */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(5, 10, 20, 0.75)',
        zIndex: 1,
        backdropFilter: 'blur(3px)'
      }} />

      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        pointerEvents: 'auto',
      }}>

        {/* Header 'Agencia' Style */}
        <div style={{
          position: 'absolute',
          top: '20px',
          width: '90%',
          maxWidth: '1200px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px',
          borderBottom: '1px solid rgba(0, 234, 255, 0.3)',
          color: '#00eaff',
          fontSize: '0.8rem',
          letterSpacing: '2px',
          zIndex: 20
        }}>
          <div>SYSTEM: <span style={{ color: '#fff', textShadow: '0 0 10px #00eaff' }}>ONLINE</span></div>
          <div style={{ fontWeight: 'bold' }}>BASKETBALL HOLISTICO <span style={{ opacity: 0.5 }}>//</span> AI CORE</div>
          <div>MODEL: GEMINI-2.5-FLASH</div>
        </div>

        <div className="assistant-futuristic-container" style={{ zIndex: 20, position: 'relative' }}>
          <FuturisticAssistant />
        </div>
      </div>
    </div>
  );
};

export default Assistant;
