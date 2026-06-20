// Final Desktop screen — Variation 3B + sous-titres éditorial italique
// Reprend le pattern "fullscreen vidéo + card flottante à droite + sous-titres serif italique"

const FD = {
  ink: "#1A1A1A",
  inkSoft: "#5C5A55",
  inkDim: "#9E9B94",
  hair: "#DCD7CC",
  card: "#FAF8F4",
  accent: "#B7553B",
  green: "#3F5E3A",
};

const FD_QUESTIONS = [
  "Souhaitez-vous que je vous présente nos best-sellers de la saison ?",
  "Préférez-vous explorer notre univers olfactif par famille ?",
  "Aimeriez-vous découvrir une fragrance signature de la maison ?",
  "Souhaitez-vous que je sélectionne quelques fragrances similaires à celles que vous semblez apprécier en particulier ?",
];

const FD_PHASES = [
  { key: "accueil", label: "Accueil", state: "done" },
  { key: "decouverte", label: "Découverte", state: "current" },
  { key: "reco", label: "Recommandation", state: "" },
  { key: "conclusion", label: "Conclusion", state: "" },
];

const FD_CUES = [
  "Bonjour…",
  "Je cherche un parfum très féminin",
  "Quelque chose qui sorte de l'ordinaire",
  "Pas trop sucré, ni trop floral",
  "Plutôt une fragrance signature",
  "Que je puisse porter au quotidien",
];

function FDSubtitle() {
  const [idx, setIdx] = React.useState(0);
  const [visible, setVisible] = React.useState(true);
  React.useEffect(() => {
    const fadeOut = setTimeout(() => setVisible(false), 2400);
    const next = setTimeout(() => {
      setIdx((i) => (i + 1) % FD_CUES.length);
      setVisible(true);
    }, 2800);
    return () => { clearTimeout(fadeOut); clearTimeout(next); };
  }, [idx]);
  return (
    <div style={{
      position: "absolute", bottom: 110, left: 40, right: 440,
      zIndex: 10, display: "flex", justifyContent: "center",
      pointerEvents: "none",
    }}>
      <div style={{
        maxWidth: 760, textAlign: "center",
        color: "#fff",
        fontFamily: "'Cormorant Garamond', 'Instrument Serif', serif",
        fontStyle: "italic",
        fontSize: 32, lineHeight: 1.25, fontWeight: 400,
        textShadow: "0 2px 16px rgba(0,0,0,0.85), 0 0 40px rgba(0,0,0,0.5)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(6px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}>
        « {FD_CUES[idx]} »
      </div>
    </div>
  );
}

function FDStepperDark() {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 0,
      padding: "10px 24px",
      background: "rgba(0,0,0,0.4)",
      backdropFilter: "blur(12px)",
      borderRadius: 999, color: "#fff",
    }}>
      {FD_PHASES.map((p, i) => {
        const done = p.state === "done";
        const cur = p.state === "current";
        return (
          <React.Fragment key={p.key}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: cur ? 16 : 12, height: cur ? 16 : 12, borderRadius: "50%",
                border: `1.5px solid ${cur ? FD.accent : done ? FD.green : "rgba(255,255,255,0.55)"}`,
                background: done ? FD.green : cur ? FD.accent : "transparent",
                display: "grid", placeItems: "center",
                color: "#fff", fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 8, fontWeight: 600,
                boxShadow: cur ? `0 0 0 4px rgba(183,85,59,0.18)` : "none",
              }}>{done ? "✓" : ""}</div>
              <span style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: 12, fontWeight: cur ? 600 : 400,
                color: cur ? FD.accent : "#fff",
                opacity: done || cur ? 1 : 0.7,
                whiteSpace: "nowrap",
              }}>{p.label}</span>
            </div>
            {i < FD_PHASES.length - 1 && (
              <div style={{
                width: 24, height: 1.5,
                background: done ? FD.green : "rgba(255,255,255,0.35)",
                margin: "0 12px",
              }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function FDCtrlBtn({ icon, label }) {
  return (
    <button style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      height: 36, padding: "0 14px", borderRadius: 999,
      background: "rgba(0,0,0,0.55)", backdropFilter: "blur(14px)",
      border: `1px solid rgba(255,255,255,0.18)`, color: "#fff",
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 12, fontWeight: 500, cursor: "pointer",
    }}>
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: FD.accent, fontSize: 11 }}>{icon}</span>
      {label}
    </button>
  );
}

function FDAnswer({ letter, text, status, onClick }) {
  const isCorrect = status === "correct";
  const isWrong = status === "wrong";
  const isDim = status === "dim";
  return (
    <button onClick={onClick} style={{
      width: "100%", textAlign: "left",
      background: isCorrect ? "rgba(63,94,58,0.08)" : isWrong ? "rgba(183,85,59,0.08)" : FD.card,
      border: `1px solid ${isCorrect ? FD.green : isWrong ? FD.accent : FD.hair}`,
      borderLeft: `3px solid ${isCorrect ? FD.green : isWrong ? FD.accent : "transparent"}`,
      padding: "14px 18px",
      cursor: "pointer", fontFamily: "'IBM Plex Sans', sans-serif",
      display: "flex", gap: 14, alignItems: "flex-start",
      transition: "all 0.2s", opacity: isDim ? 0.4 : 1,
      borderRadius: 2,
    }}
    onMouseEnter={(e) => { if (!status) e.currentTarget.style.borderLeftColor = FD.accent; }}
    onMouseLeave={(e) => { if (!status) e.currentTarget.style.borderLeftColor = "transparent"; }}
    >
      <span style={{
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
        color: isCorrect ? FD.green : isWrong ? FD.accent : FD.inkDim,
        marginTop: 2, fontWeight: 500, flexShrink: 0,
      }}>{letter}</span>
      <span style={{ flex: 1, fontSize: 13, lineHeight: 1.5, color: FD.ink, textWrap: "pretty" }}>{text}</span>
    </button>
  );
}

function DesktopFinal({ src }) {
  const [selected, setSelected] = React.useState(null);
  const correctIndex = 3;
  return (
    <div style={{
      width: "100%", height: "100%", position: "relative",
      overflow: "hidden", background: "#000",
      fontFamily: "'IBM Plex Sans', sans-serif",
    }}>
      <div style={{
        position: "absolute", inset: 0, background: "#1f1d1a", overflow: "hidden",
      }}>
        <video src={src} autoPlay muted loop playsInline style={{
          position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
        }} />
      </div>

      {/* gradients */}
      <div style={{
        position: "absolute", left: 0, right: 0, top: 0, height: 140,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.55), transparent)", zIndex: 4,
      }} />
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: 480,
        background: "linear-gradient(to right, transparent, rgba(0,0,0,0.4))", zIndex: 4,
      }} />

      {/* Header */}
      <div style={{
        position: "absolute", top: 28, left: 40, right: 40, zIndex: 10,
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "8px 14px", background: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(12px)", borderRadius: 999,
          color: "#fff", fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11, letterSpacing: "0.15em",
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: "50%", background: FD.accent,
            animation: "fdPulse 1.6s ease-in-out infinite",
          }} />
          LA CLIENTE VOUS PARLE
        </div>
        <FDStepperDark />
        <div style={{
          padding: "8px 14px", background: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(12px)", borderRadius: 999,
          color: "#fff", fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11, letterSpacing: "0.1em",
        }}>Q. 04/04 · <span style={{ color: FD.accent, fontWeight: 600 }}>TENT. 04</span></div>
      </div>

      <FDSubtitle />

      {/* Audio controls bottom-left */}
      <div style={{
        position: "absolute", bottom: 36, left: 40, zIndex: 10,
        display: "flex", gap: 10,
      }}>
        <FDCtrlBtn icon="↻" label="Réécouter" />
        <FDCtrlBtn icon="CC" label="Sous-titres" />
        <FDCtrlBtn icon="🔇" label="Muet" />
      </div>

      {/* Right floating card */}
      <div style={{
        position: "absolute", right: 32, top: 110, bottom: 32, width: 400,
        background: "rgba(250, 248, 244, 0.96)",
        backdropFilter: "blur(28px)",
        border: `1px solid rgba(255,255,255,0.4)`,
        borderRadius: 6,
        padding: "28px 28px",
        display: "flex", flexDirection: "column",
        zIndex: 20,
        boxShadow: "0 24px 60px -12px rgba(0,0,0,0.4)",
      }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
          color: FD.accent, letterSpacing: "0.15em", marginBottom: 6,
        }}>◆ VOTRE TOUR</div>
        <h2 style={{
          margin: 0, marginBottom: 4,
          fontSize: 20, fontWeight: 500, lineHeight: 1.25,
          letterSpacing: "-0.01em", color: FD.ink,
        }}>Quelle formulation est la plus juste ?</h2>
        <p style={{ margin: 0, marginBottom: 18, fontSize: 12, color: FD.inkSoft, lineHeight: 1.5 }}>
          Choisissez celle qui fait avancer la cliente.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, minHeight: 0, overflow: "auto" }}>
          {FD_QUESTIONS.map((q, i) => (
            <FDAnswer key={i} letter={String.fromCharCode(65+i)} text={q}
              status={selected === null ? null : i === correctIndex ? "correct" : i === selected ? "wrong" : "dim"}
              onClick={() => setSelected(i)} />
          ))}
        </div>
        <div style={{
          marginTop: 16, paddingTop: 14, borderTop: `1px solid ${FD.hair}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <button style={{
            background: "transparent", border: "none", cursor: "pointer",
            color: FD.inkSoft, fontSize: 12, fontFamily: "inherit",
          }}>← Précédente</button>
          <button style={{
            background: FD.ink, color: "#fff", border: "none",
            padding: "10px 18px", fontSize: 12, fontWeight: 500,
            cursor: "pointer", borderRadius: 2, fontFamily: "inherit",
          }}>Valider →</button>
        </div>
      </div>

      <style>{`
        @keyframes fdPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.4); }
        }
      `}</style>
    </div>
  );
}

window.DesktopFinal = DesktopFinal;
