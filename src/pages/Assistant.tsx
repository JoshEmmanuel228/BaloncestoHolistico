import FuturisticAssistant from '../components/FuturisticAssistant';
import '../styles/assistantFuturistic.css';

const Assistant = () => {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', minHeight: '100vh', minWidth: '100vw', overflow: 'hidden' }}>
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
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        pointerEvents: 'auto',
      }}>
        <div className="assistant-futuristic-container" style={{ zIndex: 20, position: 'relative' }}>
          <FuturisticAssistant />
        </div>
      </div>
    </div>
  );
};

export default Assistant;
