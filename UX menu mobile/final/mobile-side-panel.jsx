// Mobile paysage · Side panel pleine hauteur
// Vidéo plein cadre, card de réponses sur la droite toute hauteur
// Plus de menu/barre en bas — contrôles audio en chips flottants

const MSP = {
  bg: "#F2F0EC",
  card: "#FAF8F4",
  ink: "#1A1A1A",
  inkSoft: "#5C5A55",
  inkDim: "#9E9B94",
  hair: "#DCD7CC",
  accent: "#B7553B",
  green: "#3F5E3A",
};

const MSP_QUESTIONS = [
  "Souhaitez-vous découvrir aujourd'hui quels parfums comptent parmi nos meilleures ventes ?",
  "Qu'est-ce qui vous attire dans notre univers parfum aujourd'hui ?",
  "Vous cherchez quelque chose de très féminin et plutôt populaire, c'est bien ça ?",
  "Avez-vous déjà senti auparavant certaines de nos fragrances que vous aimez particulièrement ?",
];

function MobileSidePanel({ src, demo }) {
  const [selected, setSelected] = React.useState(null);
  const correctIndex = 3;

  React.useEffect(() => {
    if (!demo) return;
    const t1 = setTimeout(() => setSelected(3), 2400);
    const t2 = setTimeout(() => setSelected(null), 5200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [demo]);

  return (
    <div style={{
      width: 844, height: 390,
      borderRadius: 36,
      overflow: "hidden",
      border: "8px solid #1a1a1a",
      boxSizing: "border-box",
      position: "relative",
      background: "#000",
      fontFamily: "'IBM Plex Sans', sans-serif",
    }}>
      <div style={{
        position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)",
        width: 110, height: 26, background: "#000", borderRadius: 14, zIndex: 50,
      }} />

      <div style={{ position: "absolute", inset: 0, background: "#1f1d1a", overflow: "hidden" }}>
        {src ? (
          <video src={src} autoPlay muted loop playsInline style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
          }} />
        ) : (
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `repeating-linear-gradient(135deg, rgba(255,255,255,0.02) 0 22px, rgba(255,255,255,0.05) 22px 44px)`,
          }} />
        )}
      </div>

      <div style={{
        position: "absolute", left: 0, right: 0, top: 0, height: 80,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)",
        zIndex: 4, pointerEvents: "none",
      }} />

      {/* TOP */}
      <div style={{
        position: "absolute", top: 14, left: 14, right: 360, zIndex: 10,
        display: "flex", alignItems: "center", gap: 12, color: "#fff",
      }}>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <MSPDot state="done" />
          <MSPLine done />
          <MSPDot state="current" />
          <MSPLine />
          <MSPDot />
          <MSPLine />
          <MSPDot />
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "4px 10px", background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(10px)", borderRadius: 999,
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 8, letterSpacing: "0.15em",
        }}>
          <span style={{
            width: 5, height: 5, borderRadius: "50%", background: MSP.accent,
            animation: "mspPulse 1.6s ease-in-out infinite",
          }} />
          LA CLIENTE VOUS PARLE
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 8, opacity: 0.75 }}>Q. 04/04</span>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 8, color: MSP.accent }}>· TENT. 04</span>
        </div>
      </div>

      {/* BOTTOM controls */}
      <div style={{
        position: "absolute", left: 14, bottom: 14, zIndex: 10,
        display: "flex", gap: 6,
      }}>
        <MSPChip icon="↻" label="Réécouter" />
        <MSPChip icon="CC" label="Sous-titres" />
        <MSPChip icon="🔇" label="Muet" />
      </div>

      {/* RIGHT SIDE PANEL pleine hauteur */}
      <div style={{
        position: "absolute",
        top: 0, bottom: 0, right: 0,
        width: 340,
        background: "rgba(250, 248, 244, 0.96)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderLeft: `1px solid rgba(255,255,255,0.4)`,
        boxShadow: "-12px 0 40px -8px rgba(0,0,0,0.35)",
        padding: "16px 14px 14px",
        zIndex: 20,
        display: "flex", flexDirection: "column",
        boxSizing: "border-box",
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 8.5,
          color: MSP.accent, letterSpacing: "0.18em", marginBottom: 6,
        }}>
          <span style={{ fontSize: 7 }}>◆</span>
          VOTRE TOUR
        </div>
        <h2 style={{
          margin: 0, marginBottom: 2,
          fontSize: 13, fontWeight: 500, lineHeight: 1.3,
          letterSpacing: "-0.01em", color: MSP.ink,
        }}>Quelle formulation est la plus juste ?</h2>
        <p style={{
          margin: 0, marginBottom: 10,
          fontSize: 9, color: MSP.inkSoft, lineHeight: 1.4,
        }}>Choisissez celle qui fait avancer la cliente.</p>

        <div style={{
          display: "flex", flexDirection: "column", gap: 5,
          flex: 1, minHeight: 0, overflow: "auto",
        }}>
          {MSP_QUESTIONS.map((q, i) => {
            const isCorrect = selected !== null && i === correctIndex;
            const isWrong = selected !== null && i === selected && i !== correctIndex;
            const isDim = selected !== null && i !== correctIndex && i !== selected;
            return (
              <button key={i} onClick={() => setSelected(i)} style={{
                textAlign: "left",
                background: isCorrect ? "rgba(63,94,58,0.10)" : isWrong ? "rgba(183,85,59,0.10)" : "#fff",
                border: `1px solid ${isCorrect ? MSP.green : isWrong ? MSP.accent : MSP.hair}`,
                borderLeft: `3px solid ${isCorrect ? MSP.green : isWrong ? MSP.accent : "transparent"}`,
                padding: "7px 9px",
                fontFamily: "inherit",
                display: "flex", gap: 8, alignItems: "flex-start",
                cursor: "pointer",
                opacity: isDim ? 0.4 : 1,
                borderRadius: 2,
                transition: "all 0.2s",
                minHeight: 38,
              }}>
                <span style={{
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: 8.5,
                  color: isCorrect ? MSP.green : isWrong ? MSP.accent : MSP.inkDim,
                  marginTop: 1, fontWeight: 500, flexShrink: 0,
                }}>{String.fromCharCode(65 + i)}</span>
                <span style={{
                  flex: 1, fontSize: 9, lineHeight: 1.35, color: MSP.ink,
                  textWrap: "pretty",
                }}>{q}</span>
              </button>
            );
          })}
        </div>

        <div style={{
          marginTop: 10, paddingTop: 8,
          borderTop: `1px solid ${MSP.hair}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <button style={{
            background: "transparent", border: "none", cursor: "pointer",
            color: MSP.inkSoft, fontSize: 9, fontFamily: "inherit", padding: 0,
          }}>← Préc.</button>
          <button style={{
            background: MSP.ink, color: "#fff", border: "none",
            padding: "6px 12px", fontSize: 9, fontWeight: 500,
            cursor: "pointer", borderRadius: 2, fontFamily: "inherit",
            letterSpacing: "0.02em",
          }}>Valider →</button>
        </div>
      </div>

      <style>{`
        @keyframes mspPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.4); }
        }
      `}</style>
    </div>
  );
}

function MSPChip({ icon, label }) {
  return (
    <button style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      height: 24, padding: "0 9px",
      borderRadius: 999,
      background: "rgba(0,0,0,0.5)",
      backdropFilter: "blur(10px)",
      border: `1px solid rgba(255,255,255,0.18)`,
      color: "#fff",
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 9, fontWeight: 500, cursor: "pointer",
    }}>
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: MSP.accent, fontSize: 8 }}>{icon}</span>
      {label}
    </button>
  );
}

function MSPDot({ state }) {
  const isDone = state === "done";
  const isCurrent = state === "current";
  return (
    <div style={{
      width: isCurrent ? 14 : 10, height: isCurrent ? 14 : 10,
      borderRadius: "50%",
      border: `1.5px solid ${isCurrent ? MSP.accent : isDone ? MSP.green : "rgba(255,255,255,0.6)"}`,
      background: isDone ? MSP.green : isCurrent ? MSP.accent : "transparent",
      display: "grid", placeItems: "center",
      color: "#fff", fontFamily: "'IBM Plex Mono', monospace",
      fontSize: 7, fontWeight: 600,
      boxShadow: isCurrent ? `0 0 0 3px rgba(183,85,59,0.2)` : "none",
    }}>{isDone ? "✓" : ""}</div>
  );
}

function MSPLine({ done }) {
  return (
    <div style={{
      width: 16, height: 1.5,
      background: done ? MSP.green : "rgba(255,255,255,0.4)",
    }} />
  );
}

window.MobileSidePanel = MobileSidePanel;
