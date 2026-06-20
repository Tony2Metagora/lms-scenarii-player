// 3 variantes du menu BAS de l'Option A (mobile paysage · single answer)
// Toutes : eyebrow "VOTRE TOUR, QUE RÉPONDEZ-VOUS ?", card cliquable = validation
// On varie uniquement le menu de navigation entre les 4 réponses

const SAB = {
  bg: "#F2F0EC", card: "#FAF8F4", ink: "#1A1A1A",
  inkSoft: "#5C5A55", inkDim: "#9E9B94", hair: "#DCD7CC",
  accent: "#B7553B", green: "#3F5E3A",
};

const SAB_QUESTIONS = [
  "Souhaitez-vous découvrir aujourd'hui quels parfums comptent parmi nos meilleures ventes ?",
  "Qu'est-ce qui vous attire dans notre univers parfum aujourd'hui ?",
  "Vous cherchez quelque chose de très féminin et plutôt populaire, c'est bien ça ?",
  "Avez-vous déjà senti auparavant certaines de nos fragrances que vous aimez particulièrement ?",
];

function SABFrame({ src, children }) {
  return (
    <div style={{
      width: 844, height: 390, borderRadius: 36, overflow: "hidden",
      border: "8px solid #1a1a1a", boxSizing: "border-box",
      position: "relative", background: "#000",
      fontFamily: "'IBM Plex Sans', sans-serif",
    }}>
      <div style={{
        position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)",
        width: 110, height: 26, background: "#000", borderRadius: 14, zIndex: 50,
      }} />
      <div style={{ position: "absolute", inset: 0, background: "#1f1d1a", overflow: "hidden" }}>
        {src && <video src={src} autoPlay muted loop playsInline style={{
          position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
        }} />}
      </div>
      <div style={{
        position: "absolute", left: 0, right: 0, top: 0, height: 80,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)",
        zIndex: 4, pointerEvents: "none",
      }} />
      {/* Header phase + cliente */}
      <div style={{
        position: "absolute", top: 14, left: 14, right: 360, zIndex: 10,
        display: "flex", alignItems: "center", gap: 10, color: "#fff",
      }}>
        <div style={{
          padding: "4px 10px", background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(10px)", borderRadius: 999,
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 8, letterSpacing: "0.15em",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <span style={{
            width: 5, height: 5, borderRadius: "50%", background: SAB.accent,
            animation: "sabPulse 1.6s ease-in-out infinite",
          }} />
          LA CLIENTE VOUS PARLE
        </div>
        <div style={{ marginLeft: "auto", fontFamily: "'IBM Plex Mono', monospace", fontSize: 8, color: "#fff", opacity: 0.75 }}>
          Q. 04/04 · <span style={{ color: SAB.accent }}>TENT. 04</span>
        </div>
      </div>
      {/* Audio chips */}
      <div style={{
        position: "absolute", left: 14, bottom: 14, zIndex: 10, display: "flex", gap: 6,
      }}>
        {["↻ Réécouter", "CC Sous-titres", "🔇 Muet"].map(l => (
          <button key={l} style={{
            height: 24, padding: "0 9px", borderRadius: 999,
            background: "rgba(0,0,0,0.5)", backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.18)", color: "#fff",
            fontFamily: "inherit", fontSize: 9, fontWeight: 500, cursor: "pointer",
          }}>{l}</button>
        ))}
      </div>
      {children}
      <style>{`
        @keyframes sabPulse { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.4;transform:scale(1.4);} }
        @keyframes sabTapHint { 0%,100%{opacity:0.5;} 50%{opacity:1;} }
        @keyframes sabFingerTap {
          0%,70%{transform:translate(0,0) scale(1);opacity:0.9;}
          80%{transform:translate(2px,2px) scale(0.9);opacity:1;}
          100%{transform:translate(0,0) scale(1);opacity:0.9;}
        }
        @keyframes sabRipple {
          0%{transform:scale(0.6);opacity:0.5;}
          100%{transform:scale(1.6);opacity:0;}
        }
        @keyframes sabSlide { from{opacity:0;transform:translateX(8px);} to{opacity:1;transform:translateX(0);} }
      `}</style>
    </div>
  );
}

// ── shared answer card with strong tap affordance ──
function SABAnswerCard({ i, selected, onTap, big, accentTop }) {
  const isSelected = selected === i;
  const isCorrect = isSelected && i === 3;
  const isWrong = isSelected && i !== 3;
  return (
    <button
      key={i}
      onClick={() => onTap(i)}
      style={{
        flex: 1, minHeight: 0, position: "relative",
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "16px 16px",
        background: isCorrect ? "rgba(63,94,58,0.10)" : isWrong ? "rgba(183,85,59,0.10)" : "#fff",
        border: `1px solid ${isCorrect ? SAB.green : isWrong ? SAB.accent : SAB.hair}`,
        [accentTop ? "borderTop" : "borderLeft"]: `3px solid ${isCorrect ? SAB.green : isWrong ? SAB.accent : SAB.accent}`,
        borderRadius: 2, marginBottom: 10,
        textAlign: "left", cursor: "pointer", fontFamily: "inherit",
        animation: "sabSlide 0.28s ease-out",
        boxShadow: !isSelected ? "0 2px 0 rgba(183,85,59,0.18)" : "none",
        transition: "all 0.2s",
      }}
      onMouseDown={(e) => e.currentTarget.style.transform = "translateY(1px)"}
      onMouseUp={(e) => e.currentTarget.style.transform = "translateY(0)"}
    >
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: 8,
      }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 9,
          color: SAB.accent, fontWeight: 500, letterSpacing: "0.1em",
        }}>RÉPONSE {String.fromCharCode(65 + i)}</div>
        {!isSelected && (
          <div style={{
            display: "flex", alignItems: "center", gap: 4,
            padding: "3px 8px", background: SAB.ink, color: "#fff",
            borderRadius: 999, fontSize: 8.5, fontWeight: 500,
            fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em",
          }}>
            <span style={{ display: "inline-block", animation: "sabFingerTap 1.4s ease-in-out infinite" }}>👆</span>
            TAP POUR VALIDER
          </div>
        )}
        {isCorrect && (
          <div style={{
            padding: "3px 8px", background: SAB.green, color: "#fff",
            borderRadius: 999, fontSize: 8.5, fontWeight: 500,
            fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em",
          }}>✓ BONNE RÉPONSE</div>
        )}
        {isWrong && (
          <div style={{
            padding: "3px 8px", background: SAB.accent, color: "#fff",
            borderRadius: 999, fontSize: 8.5, fontWeight: 500,
            fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em",
          }}>× ESSAYEZ ENCORE</div>
        )}
      </div>
      <div style={{
        fontSize: big ? 13 : 12, lineHeight: 1.5,
        color: SAB.ink, textWrap: "pretty",
        fontFamily: big ? "'Cormorant Garamond', serif" : "inherit",
        fontStyle: big ? "italic" : "normal",
        fontWeight: big ? 400 : 400,
      }}>{SAB_QUESTIONS[i]}</div>
    </button>
  );
}

function SABEyebrow() {
  return (
    <div style={{
      fontFamily: "'IBM Plex Mono', monospace", fontSize: 8.5,
      color: SAB.accent, letterSpacing: "0.18em", marginBottom: 10,
    }}>◆ VOTRE TOUR, QUE RÉPONDEZ-VOUS ?</div>
  );
}

// ─── A1 · Dots minimaliste + flèches en bordure ───
function MobileSA_A1Dots({ src }) {
  const [i, setI] = React.useState(0);
  const [selected, setSelected] = React.useState(null);
  return (
    <SABFrame src={src}>
      <div style={{
        position: "absolute", top: 0, bottom: 0, right: 0, width: 340,
        background: "rgba(250, 248, 244, 0.96)", backdropFilter: "blur(24px)",
        borderLeft: "1px solid rgba(255,255,255,0.4)",
        boxShadow: "-12px 0 40px -8px rgba(0,0,0,0.35)",
        padding: "16px 14px 14px", zIndex: 20,
        display: "flex", flexDirection: "column", boxSizing: "border-box",
      }}>
        <SABEyebrow />
        <SABAnswerCard i={i} selected={selected} onTap={setSelected} />
        {/* Dots + arrows */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 4px",
        }}>
          <button onClick={() => setI((i + 3) % 4)} style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "transparent", border: `1px solid ${SAB.hair}`,
            color: SAB.ink, fontSize: 16, cursor: "pointer",
            fontFamily: "inherit",
          }}>‹</button>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {[0, 1, 2, 3].map(idx => (
              <button key={idx} onClick={() => setI(idx)} style={{
                width: idx === i ? 24 : 8, height: 8, borderRadius: 999,
                background: idx === i ? SAB.accent : selected === idx ? SAB.green : SAB.inkDim,
                opacity: idx === i ? 1 : 0.45,
                border: "none", cursor: "pointer", padding: 0,
                transition: "all 0.25s",
              }} />
            ))}
          </div>
          <button onClick={() => setI((i + 1) % 4)} style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "transparent", border: `1px solid ${SAB.hair}`,
            color: SAB.ink, fontSize: 16, cursor: "pointer",
            fontFamily: "inherit",
          }}>›</button>
        </div>
      </div>
    </SABFrame>
  );
}

// ─── A2 · Mini-thumbs des 4 réponses (preview du texte) ───
function MobileSA_A2Thumbs({ src }) {
  const [i, setI] = React.useState(0);
  const [selected, setSelected] = React.useState(null);
  return (
    <SABFrame src={src}>
      <div style={{
        position: "absolute", top: 0, bottom: 0, right: 0, width: 340,
        background: "rgba(250, 248, 244, 0.96)", backdropFilter: "blur(24px)",
        borderLeft: "1px solid rgba(255,255,255,0.4)",
        boxShadow: "-12px 0 40px -8px rgba(0,0,0,0.35)",
        padding: "16px 14px 12px", zIndex: 20,
        display: "flex", flexDirection: "column", boxSizing: "border-box",
      }}>
        <SABEyebrow />
        <SABAnswerCard i={i} selected={selected} onTap={setSelected} big accentTop />
        {/* 4 mini-thumbs avec début du texte */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4 }}>
          {[0, 1, 2, 3].map(idx => {
            const isCurrent = idx === i;
            const isCorrect = selected === idx && idx === 3;
            const isWrong = selected === idx && idx !== 3;
            return (
              <button key={idx} onClick={() => setI(idx)} style={{
                padding: "5px 5px 6px", textAlign: "left",
                background: isCurrent ? SAB.ink : isCorrect ? "rgba(63,94,58,0.18)" : isWrong ? "rgba(183,85,59,0.18)" : "#fff",
                color: isCurrent ? "#fff" : SAB.ink,
                border: `1px solid ${isCurrent ? SAB.ink : isCorrect ? SAB.green : isWrong ? SAB.accent : SAB.hair}`,
                borderRadius: 2, cursor: "pointer", fontFamily: "inherit",
                display: "flex", flexDirection: "column", gap: 2, minHeight: 36,
              }}>
                <span style={{
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: 8,
                  color: isCurrent ? SAB.accent : isCorrect ? SAB.green : isWrong ? SAB.accent : SAB.inkDim,
                  fontWeight: 500, letterSpacing: "0.08em",
                }}>{String.fromCharCode(65 + idx)} {isCorrect ? "✓" : isWrong ? "×" : ""}</span>
                <span style={{
                  fontSize: 7.5, lineHeight: 1.25,
                  color: isCurrent ? "rgba(255,255,255,0.85)" : SAB.inkSoft,
                  overflow: "hidden", display: "-webkit-box",
                  WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                }}>{SAB_QUESTIONS[idx].slice(0, 40)}…</span>
              </button>
            );
          })}
        </div>
      </div>
    </SABFrame>
  );
}

// ─── A3 · Stepper barre avec fractions + flèches grosses ───
function MobileSA_A3Bar({ src }) {
  const [i, setI] = React.useState(0);
  const [selected, setSelected] = React.useState(null);
  return (
    <SABFrame src={src}>
      <div style={{
        position: "absolute", top: 0, bottom: 0, right: 0, width: 340,
        background: "rgba(250, 248, 244, 0.96)", backdropFilter: "blur(24px)",
        borderLeft: "1px solid rgba(255,255,255,0.4)",
        boxShadow: "-12px 0 40px -8px rgba(0,0,0,0.35)",
        padding: "16px 14px 14px", zIndex: 20,
        display: "flex", flexDirection: "column", boxSizing: "border-box",
      }}>
        <SABEyebrow />
        <SABAnswerCard i={i} selected={selected} onTap={setSelected} />
        {/* Barre 4 segments */}
        <div style={{ display: "flex", gap: 3, marginBottom: 10 }}>
          {[0, 1, 2, 3].map(idx => {
            const isCurrent = idx === i;
            const isCorrect = selected === idx && idx === 3;
            const isWrong = selected === idx && idx !== 3;
            return (
              <button key={idx} onClick={() => setI(idx)} style={{
                flex: 1, height: 4,
                background: isCurrent ? SAB.accent : isCorrect ? SAB.green : isWrong ? SAB.accent : SAB.hair,
                opacity: isCurrent ? 1 : isCorrect || isWrong ? 1 : 0.6,
                border: "none", cursor: "pointer", padding: 0,
                borderRadius: 2, transition: "all 0.25s",
              }} />
            );
          })}
        </div>
        {/* Bottom row : flèches + index/4 */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <button onClick={() => setI((i + 3) % 4)} style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "6px 12px", borderRadius: 2,
            background: "transparent", border: `1px solid ${SAB.hair}`,
            color: SAB.inkSoft, fontSize: 10, cursor: "pointer",
            fontFamily: "inherit",
          }}>‹ Préc.</button>
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
            color: SAB.ink, fontWeight: 500, letterSpacing: "0.1em",
          }}>
            <span style={{ color: SAB.accent }}>{String(i + 1).padStart(2, "0")}</span>
            <span style={{ color: SAB.inkDim, margin: "0 4px" }}>/</span>
            <span style={{ color: SAB.inkSoft }}>04</span>
          </span>
          <button onClick={() => setI((i + 1) % 4)} style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "6px 12px", borderRadius: 2,
            background: "transparent", border: `1px solid ${SAB.hair}`,
            color: SAB.inkSoft, fontSize: 10, cursor: "pointer",
            fontFamily: "inherit",
          }}>Suiv. ›</button>
        </div>
      </div>
    </SABFrame>
  );
}

window.MobileSA_A1Dots = MobileSA_A1Dots;
window.MobileSA_A2Thumbs = MobileSA_A2Thumbs;
window.MobileSA_A3Bar = MobileSA_A3Bar;
