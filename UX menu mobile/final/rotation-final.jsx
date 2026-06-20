// Final rotation prompt — Mobile portrait → asks user to rotate to landscape
// Cohérent avec la palette Quiet Material du desktop/mobile final

function RotationFinal() {
  const p = {
    bg: "#F2F0EC", ink: "#1A1A1A", inkSoft: "#5C5A55",
    accent: "#B7553B", hair: "#DCD7CC",
  };
  return (
    <div style={{
      width: "100%", height: "100%",
      background: p.bg, color: p.ink,
      fontFamily: "'IBM Plex Sans', sans-serif",
      position: "relative", overflow: "hidden",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: 32, boxSizing: "border-box",
    }}>
      {/* small header */}
      <div style={{
        position: "absolute", top: 28, left: 0, right: 0,
        textAlign: "center",
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 10, letterSpacing: "0.2em", color: p.inkSoft,
      }}>
        METAGORA · HERMÈS PARFUM · FR-01
      </div>

      {/* Animated rotating phone */}
      <div style={{
        position: "relative",
        width: 200, height: 200,
        marginBottom: 40,
        display: "grid", placeItems: "center",
      }}>
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          border: `1px dashed ${p.hair}`,
        }} />
        <div style={{
          width: 70, height: 130,
          border: `2px solid ${p.accent}`,
          borderRadius: 14, position: "relative",
          animation: "rotPhoneRotate 2.4s ease-in-out infinite",
          transformOrigin: "center",
        }}>
          <div style={{
            position: "absolute", top: 6, left: "50%", transform: "translateX(-50%)",
            width: 24, height: 4, background: p.accent, borderRadius: 2, opacity: 0.5,
          }} />
          <div style={{
            position: "absolute", inset: "16px 8px 16px 8px",
            background: `linear-gradient(180deg, ${p.accent}33, ${p.accent}11)`,
            borderRadius: 4,
          }} />
        </div>
        <svg width="60" height="60" viewBox="0 0 60 60" style={{
          position: "absolute", top: -4, right: -4, color: p.accent,
        }}>
          <path d="M 10 30 A 20 20 0 0 1 50 30" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M 46 22 L 50 30 L 42 30" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div style={{
        fontFamily: "'Cormorant Garamond', 'Instrument Serif', serif",
        fontSize: 28, lineHeight: 1.2,
        color: p.ink, fontWeight: 400,
        textAlign: "center", fontStyle: "italic",
        marginBottom: 12, textWrap: "balance",
      }}>
        Tournez votre écran
      </div>
      <div style={{
        fontSize: 13, lineHeight: 1.55,
        color: p.inkSoft, textAlign: "center",
        maxWidth: 280, textWrap: "pretty",
      }}>
        Le roleplay se joue en mode paysage — pour mieux voir la cliente et lire vos options.
      </div>

      <div style={{
        marginTop: 36, padding: "10px 16px",
        border: `1px solid ${p.hair}`, borderRadius: 999,
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 9, letterSpacing: "0.18em", color: p.inkSoft,
      }}>
        ◢ ROTATION DÉTECTÉE EN 0.0s
      </div>

      <style>{`
        @keyframes rotPhoneRotate {
          0%, 25% { transform: rotate(0deg); }
          50%, 75% { transform: rotate(-90deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  );
}

window.RotationFinal = RotationFinal;
