// Final Mobile landscape screen — Variation 3B bottom sheet pattern + sous-titres italique
// Reprend le pattern: vidéo idle full-bleed + sheet bas pulsant + sous-titres serif italique

const FM = {
  bg: "#F2F0EC",
  card: "#FAF8F4",
  ink: "#1A1A1A",
  inkSoft: "#5C5A55",
  inkDim: "#9E9B94",
  hair: "#DCD7CC",
  accent: "#B7553B",
  green: "#3F5E3A",
};

const FM_QUESTIONS = [
  "Souhaitez-vous que je vous présente nos best-sellers de la saison ?",
  "Préférez-vous explorer notre univers olfactif par famille ?",
  "Aimeriez-vous découvrir une fragrance signature de la maison ?",
  "Souhaitez-vous que je sélectionne quelques fragrances similaires à celles que vous semblez apprécier en particulier ?",
];

const FM_CUES = [
  "Bonjour…",
  "Je cherche un parfum très féminin",
  "Quelque chose qui sorte de l'ordinaire",
  "Pas trop sucré, ni trop floral",
  "Plutôt une fragrance signature",
];

function FMSubtitle({ hidden }) {
  const [idx, setIdx] = React.useState(0);
  const [visible, setVisible] = React.useState(true);
  React.useEffect(() => {
    const fadeOut = setTimeout(() => setVisible(false), 2200);
    const next = setTimeout(() => {
      setIdx((i) => (i + 1) % FM_CUES.length);
      setVisible(true);
    }, 2600);
    return () => { clearTimeout(fadeOut); clearTimeout(next); };
  }, [idx]);
  return (
    <div style={{
      position: "absolute", left: 60, right: 60, bottom: 70,
      zIndex: 8, display: "flex", justifyContent: "center",
      pointerEvents: "none",
      opacity: hidden ? 0 : 1,
      transition: "opacity 0.3s",
    }}>
      <div style={{
        maxWidth: 520, textAlign: "center", color: "#fff",
        fontFamily: "'Cormorant Garamond', 'Instrument Serif', serif",
        fontStyle: "italic",
        fontSize: 18, lineHeight: 1.25, fontWeight: 400,
        textShadow: "0 2px 12px rgba(0,0,0,0.85), 0 0 24px rgba(0,0,0,0.5)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(4px)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
      }}>
        « {FM_CUES[idx]} »
      </div>
    </div>
  );
}

function FMPhaseDot({ state }) {
  const isDone = state === "done";
  const isCurrent = state === "current";
  return (
    <div style={{
      width: isCurrent ? 14 : 10, height: isCurrent ? 14 : 10,
      borderRadius: "50%",
      border: `1.5px solid ${isCurrent ? FM.accent : isDone ? FM.green : "rgba(255,255,255,0.55)"}`,
      background: isDone ? FM.green : isCurrent ? FM.accent : "transparent",
      display: "grid", placeItems: "center",
      color: "#fff", fontFamily: "'IBM Plex Mono', monospace",
      fontSize: 7, fontWeight: 600,
      boxShadow: isCurrent ? `0 0 0 3px rgba(183,85,59,0.18)` : "none",
    }}>{isDone ? "✓" : ""}</div>
  );
}

function FMConnector({ done }) {
  return (
    <div style={{
      width: 18, height: 1.5,
      background: done ? FM.green : "rgba(255,255,255,0.35)",
    }} />
  );
}

function FMFloatBtn({ children }) {
  return (
    <button style={{
      width: 28, height: 28, borderRadius: "50%",
      background: "rgba(0,0,0,0.5)", backdropFilter: "blur(10px)",
      border: `1px solid rgba(255,255,255,0.18)`, color: "#fff",
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: 9, fontWeight: 500, cursor: "pointer",
      display: "grid", placeItems: "center",
    }}>{children}</button>
  );
}

function MobileFinal({ src }) {
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const correctIndex = 3;

  const sheetHeight = sheetOpen ? 168 : 44;

  return (
    <div style={{
      width: "100%", height: "100%",
      position: "relative", background: "#000",
      fontFamily: "'IBM Plex Sans', sans-serif",
      overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, background: "#1f1d1a", overflow: "hidden" }}>
        <video src={src} autoPlay muted loop playsInline style={{
          position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
          filter: !sheetOpen ? "brightness(0.85)" : "none",
          transition: "filter 0.4s",
        }} />
      </div>

      {/* idle indicator */}
      {!sheetOpen && (
        <div style={{
          position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)",
          display: "flex", alignItems: "center", gap: 6,
          padding: "5px 10px", background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(10px)", borderRadius: 999,
          color: "#fff", fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 8, letterSpacing: "0.15em", zIndex: 9,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%", background: FM.accent,
            animation: "fmPulse 1.6s ease-in-out infinite",
          }} />
          LA CLIENTE VOUS PARLE
        </div>
      )}

      {/* gradient bottom */}
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0,
        height: sheetOpen ? 0 : 100,
        background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
        zIndex: 5, transition: "height 0.4s",
      }} />

      {/* TOP BAR */}
      <div style={{
        position: "absolute", top: 12, left: 14, right: 14, zIndex: 10,
        display: "flex", alignItems: "center", gap: 14, color: "#fff",
      }}>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <FMPhaseDot state="done" />
          <FMConnector done />
          <FMPhaseDot state="current" />
          <FMConnector />
          <FMPhaseDot state="" />
          <FMConnector />
          <FMPhaseDot state="" />
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 8, opacity: 0.7 }}>Q. 04/04</span>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 8, color: FM.accent }}>· TENT. 04</span>
        </div>
      </div>

      {/* Subtitle */}
      <FMSubtitle hidden={sheetOpen} />

      {/* Right controls */}
      <div style={{
        position: "absolute", right: 12,
        top: "50%", transform: `translateY(-50%) translateY(${sheetOpen ? "-30px" : "0"})`,
        zIndex: 10, display: "flex", flexDirection: "column", gap: 8,
        opacity: sheetOpen ? 0.35 : 1, transition: "all 0.4s",
      }}>
        <FMFloatBtn>↻</FMFloatBtn>
        <FMFloatBtn>CC</FMFloatBtn>
        <FMFloatBtn>🔇</FMFloatBtn>
      </div>

      {/* BOTTOM SHEET */}
      <div
        onClick={() => setSheetOpen(!sheetOpen)}
        style={{
          position: "absolute", left: 0, right: 0, bottom: 0,
          height: sheetHeight,
          background: "rgba(250, 248, 244, 0.94)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: `1px solid ${FM.hair}`,
          padding: "0 14px", zIndex: 20,
          transition: "height 0.45s cubic-bezier(0.32, 0.72, 0, 1)",
          cursor: "pointer", display: "flex", flexDirection: "column",
          overflow: "hidden",
        }}>
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          padding: "8px 0 4px", flexShrink: 0,
        }}>
          <div style={{
            width: 40, height: 4,
            background: sheetOpen ? FM.inkDim : FM.accent,
            borderRadius: 4,
            animation: !sheetOpen ? "fmHandlePulse 1.6s ease-in-out infinite" : "none",
          }} />
          {!sheetOpen && (
            <div style={{
              marginTop: 4, fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 8, letterSpacing: "0.18em",
              color: FM.accent, fontWeight: 500,
              display: "flex", alignItems: "center", gap: 6,
              animation: "fmHandleHint 1.6s ease-in-out infinite",
            }}>
              <span style={{ display: "inline-block", animation: "fmArrowUp 1.6s ease-in-out infinite" }}>↑</span>
              TIRER POUR RÉPONDRE
            </div>
          )}
        </div>

        <div style={{
          flex: 1, minHeight: 0,
          opacity: sheetOpen ? 1 : 0,
          transition: "opacity 0.25s",
          transitionDelay: sheetOpen ? "0.15s" : "0s",
          paddingBottom: 8,
        }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "baseline",
            marginBottom: 6, marginTop: 2,
          }}>
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 8,
              color: FM.accent, letterSpacing: "0.15em",
            }}>◆ VOTRE TOUR</span>
            <span style={{ fontSize: 9, color: FM.inkSoft, fontWeight: 500 }}>
              Quelle est la formulation la plus juste ?
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
            {FM_QUESTIONS.map((q, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setSelected(i); }}
                style={{
                  textAlign: "left",
                  background: selected === null ? "#fff" : i === correctIndex ? "rgba(63,94,58,0.12)" : i === selected ? "rgba(183,85,59,0.10)" : "#fff",
                  border: `1px solid ${selected === null ? FM.hair : i === correctIndex ? FM.green : i === selected ? FM.accent : FM.hair}`,
                  borderLeft: `3px solid ${selected === null ? "transparent" : i === correctIndex ? FM.green : i === selected ? FM.accent : "transparent"}`,
                  padding: "6px 8px",
                  fontFamily: "inherit",
                  display: "flex", gap: 6, alignItems: "flex-start", cursor: "pointer",
                  opacity: selected !== null && i !== correctIndex && i !== selected ? 0.4 : 1,
                  borderRadius: 1, transition: "all 0.2s",
                }}>
                <span style={{
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: 8,
                  color: selected !== null && i === correctIndex ? FM.green : selected !== null && i === selected ? FM.accent : FM.inkDim,
                  marginTop: 1, fontWeight: 500,
                }}>{String.fromCharCode(65 + i)}</span>
                <span style={{ flex: 1, fontSize: 8.5, lineHeight: 1.35, color: FM.ink }}>{q}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fmPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.4); }
        }
        @keyframes fmHandlePulse {
          0%, 100% { transform: translateY(0); width: 40px; opacity: 1; }
          50% { transform: translateY(-4px); width: 48px; opacity: 0.7; }
        }
        @keyframes fmHandleHint {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes fmArrowUp {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
      `}</style>
    </div>
  );
}

window.MobileFinal = MobileFinal;
