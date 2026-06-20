// 3 déclinaisons du "tap pour valider" sur la base A3 (barre 4 segments + Préc/Suiv)
// On varie uniquement la signalétique de validation sur la card de réponse

const TAP = {
  bg: "#F2F0EC", card: "#FAF8F4", ink: "#1A1A1A",
  inkSoft: "#5C5A55", inkDim: "#9E9B94", hair: "#DCD7CC",
  accent: "#B7553B", green: "#3F5E3A",
};

const TAP_QUESTIONS = [
  "Souhaitez-vous découvrir aujourd'hui quels parfums comptent parmi nos meilleures ventes ?",
  "Qu'est-ce qui vous attire dans notre univers parfum aujourd'hui ?",
  "Vous cherchez quelque chose de très féminin et plutôt populaire, c'est bien ça ?",
  "Avez-vous déjà senti auparavant certaines de nos fragrances que vous aimez particulièrement ?",
];

function TAPFrame({ src, children }) {
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
            width: 5, height: 5, borderRadius: "50%", background: TAP.accent,
            animation: "tapPulse 1.6s ease-in-out infinite",
          }} />
          LA CLIENTE VOUS PARLE
        </div>
        <div style={{ marginLeft: "auto", fontFamily: "'IBM Plex Mono', monospace", fontSize: 8, color: "#fff", opacity: 0.75 }}>
          Q. 04/04 · <span style={{ color: TAP.accent }}>TENT. 04</span>
        </div>
      </div>
      <div style={{ position: "absolute", left: 14, bottom: 14, zIndex: 10, display: "flex", gap: 6 }}>
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
        @keyframes tapPulse { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.4;transform:scale(1.4);} }
        @keyframes tapRipple {
          0%{transform:scale(0.4);opacity:0.6;}
          100%{transform:scale(2.2);opacity:0;}
        }
        @keyframes tapNudge {
          0%,100%{transform:translateY(0);}
          50%{transform:translateY(-3px);}
        }
        @keyframes tapBorderShimmer {
          0%,100%{box-shadow:0 0 0 0 rgba(183,85,59,0.5);}
          50%{box-shadow:0 0 0 4px rgba(183,85,59,0.18);}
        }
        @keyframes tapShimmerLine {
          0%{transform:translateX(-100%);} 100%{transform:translateX(200%);}
        }
        @keyframes tapHandFloat {
          0%,100%{transform:translate(0,0);}
          50%{transform:translate(-2px,-3px);}
        }
      `}</style>
    </div>
  );
}

function TAPNav({ i, setI, selected }) {
  return (
    <>
      <div style={{ display: "flex", gap: 3, marginBottom: 10 }}>
        {[0, 1, 2, 3].map(idx => {
          const isCurrent = idx === i;
          const isCorrect = selected === idx && idx === 3;
          const isWrong = selected === idx && idx !== 3;
          return (
            <button key={idx} onClick={() => setI(idx)} style={{
              flex: 1, height: 4,
              background: isCurrent ? TAP.accent : isCorrect ? TAP.green : isWrong ? TAP.accent : TAP.hair,
              opacity: isCurrent || isCorrect || isWrong ? 1 : 0.6,
              border: "none", cursor: "pointer", padding: 0,
              borderRadius: 2, transition: "all 0.25s",
            }} />
          );
        })}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={() => setI((i + 3) % 4)} style={{
          padding: "6px 12px", borderRadius: 2,
          background: "transparent", border: `1px solid ${TAP.hair}`,
          color: TAP.inkSoft, fontSize: 10, cursor: "pointer", fontFamily: "inherit",
        }}>‹ Préc.</button>
        <span style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
          color: TAP.ink, fontWeight: 500, letterSpacing: "0.1em",
        }}>
          <span style={{ color: TAP.accent }}>{String(i + 1).padStart(2, "0")}</span>
          <span style={{ color: TAP.inkDim, margin: "0 4px" }}>/</span>
          <span style={{ color: TAP.inkSoft }}>04</span>
        </span>
        <button onClick={() => setI((i + 1) % 4)} style={{
          padding: "6px 12px", borderRadius: 2,
          background: "transparent", border: `1px solid ${TAP.hair}`,
          color: TAP.inkSoft, fontSize: 10, cursor: "pointer", fontFamily: "inherit",
        }}>Suiv. ›</button>
      </div>
    </>
  );
}

function TAPEyebrow() {
  return (
    <div style={{
      fontFamily: "'IBM Plex Mono', monospace", fontSize: 8.5,
      color: TAP.accent, letterSpacing: "0.18em", marginBottom: 10,
    }}>◆ VOTRE TOUR, QUE RÉPONDEZ-VOUS ?</div>
  );
}

function TAPPanel({ children }) {
  return (
    <div style={{
      position: "absolute", top: 0, bottom: 0, right: 0, width: 340,
      background: "rgba(250, 248, 244, 0.96)", backdropFilter: "blur(24px)",
      borderLeft: "1px solid rgba(255,255,255,0.4)",
      boxShadow: "-12px 0 40px -8px rgba(0,0,0,0.35)",
      padding: "16px 14px 14px", zIndex: 20,
      display: "flex", flexDirection: "column", boxSizing: "border-box",
    }}>{children}</div>
  );
}

function TAPStatusBadge({ selected, i }) {
  if (selected !== i) return null;
  const correct = i === 3;
  return (
    <div style={{
      padding: "3px 8px",
      background: correct ? TAP.green : TAP.accent, color: "#fff",
      borderRadius: 999, fontSize: 8.5, fontWeight: 500,
      fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em",
    }}>{correct ? "✓ BONNE RÉPONSE" : "× ESSAYEZ ENCORE"}</div>
  );
}

// ─── V1 · Bouton "Tap pour valider" en bas de la card (pleine largeur) ───
function MobileTAP_V1Button({ src }) {
  const [i, setI] = React.useState(0);
  const [selected, setSelected] = React.useState(null);
  const isSelected = selected === i;
  return (
    <TAPFrame src={src}>
      <TAPPanel>
        <TAPEyebrow />
        <button onClick={() => setSelected(i)} style={{
          flex: 1, minHeight: 0, position: "relative",
          display: "flex", flexDirection: "column",
          padding: 0, overflow: "hidden",
          background: isSelected && i === 3 ? "rgba(63,94,58,0.10)" : isSelected ? "rgba(183,85,59,0.10)" : "#fff",
          border: `1px solid ${isSelected && i === 3 ? TAP.green : isSelected ? TAP.accent : TAP.hair}`,
          borderLeft: `3px solid ${isSelected && i === 3 ? TAP.green : isSelected ? TAP.accent : TAP.accent}`,
          borderRadius: 2, marginBottom: 10,
          textAlign: "left", cursor: "pointer", fontFamily: "inherit",
        }}>
          <div style={{ flex: 1, padding: "14px 16px 12px" }}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              marginBottom: 8,
            }}>
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace", fontSize: 9,
                color: TAP.accent, fontWeight: 500, letterSpacing: "0.1em",
              }}>RÉPONSE {String.fromCharCode(65 + i)}</div>
              <TAPStatusBadge selected={selected} i={i} />
            </div>
            <div style={{
              fontSize: 12, lineHeight: 1.5, color: TAP.ink, textWrap: "pretty",
            }}>{TAP_QUESTIONS[i]}</div>
          </div>
          {/* Bottom action bar */}
          <div style={{
            background: TAP.ink, color: "#fff",
            padding: "10px 14px",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
            letterSpacing: "0.18em", fontWeight: 500,
          }}>
            <span style={{ animation: "tapNudge 1.4s ease-in-out infinite" }}>👆</span>
            TAPPER ICI POUR VALIDER
            <span style={{ color: TAP.accent }}>→</span>
          </div>
        </button>
        <TAPNav i={i} setI={setI} selected={selected} />
      </TAPPanel>
    </TAPFrame>
  );
}

// ─── V2 · Card avec halo terracotta pulsé + ripple au tap ───
function MobileTAP_V2Halo({ src }) {
  const [i, setI] = React.useState(0);
  const [selected, setSelected] = React.useState(null);
  const [ripple, setRipple] = React.useState(0);
  const isSelected = selected === i;
  const handleTap = () => {
    setSelected(i);
    setRipple(r => r + 1);
  };
  return (
    <TAPFrame src={src}>
      <TAPPanel>
        <TAPEyebrow />
        <button onClick={handleTap} style={{
          flex: 1, minHeight: 0, position: "relative",
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "16px 16px",
          background: isSelected && i === 3 ? "rgba(63,94,58,0.10)" : isSelected ? "rgba(183,85,59,0.10)" : "#fff",
          border: `1.5px solid ${isSelected && i === 3 ? TAP.green : isSelected ? TAP.accent : TAP.accent}`,
          borderRadius: 4, marginBottom: 10,
          textAlign: "left", cursor: "pointer", fontFamily: "inherit",
          animation: !isSelected ? "tapBorderShimmer 1.8s ease-in-out infinite" : "none",
          overflow: "hidden",
        }}>
          {ripple > 0 && (
            <span key={ripple} style={{
              position: "absolute", top: "50%", left: "50%",
              width: 20, height: 20, borderRadius: "50%",
              background: i === 3 ? TAP.green : TAP.accent,
              transform: "translate(-50%, -50%)",
              animation: "tapRipple 0.6s ease-out forwards",
              pointerEvents: "none",
            }} />
          )}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: 8,
          }}>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 9,
              color: TAP.accent, fontWeight: 500, letterSpacing: "0.1em",
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: "50%", background: TAP.accent,
                animation: !isSelected ? "tapPulse 1.4s ease-in-out infinite" : "none",
              }} />
              RÉPONSE {String.fromCharCode(65 + i)}
            </div>
            <TAPStatusBadge selected={selected} i={i} />
          </div>
          <div style={{
            fontSize: 12, lineHeight: 1.5, color: TAP.ink, textWrap: "pretty",
            marginBottom: 10,
          }}>{TAP_QUESTIONS[i]}</div>
          {!isSelected && (
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 8.5,
              color: TAP.accent, letterSpacing: "0.18em",
              display: "flex", alignItems: "center", gap: 6,
              opacity: 0.85,
            }}>
              <span style={{ animation: "tapHandFloat 1.6s ease-in-out infinite" }}>👆</span>
              TAP N'IMPORTE OÙ POUR VALIDER
            </div>
          )}
        </button>
        <TAPNav i={i} setI={setI} selected={selected} />
      </TAPPanel>
    </TAPFrame>
  );
}

// ─── V3 · "Glissez vers la droite" : card avec poignée droite et chevron animé ───
function MobileTAP_V3Slide({ src }) {
  const [i, setI] = React.useState(0);
  const [selected, setSelected] = React.useState(null);
  const isSelected = selected === i;
  return (
    <TAPFrame src={src}>
      <TAPPanel>
        <TAPEyebrow />
        <button onClick={() => setSelected(i)} style={{
          flex: 1, minHeight: 0, position: "relative",
          display: "flex", padding: 0, overflow: "hidden",
          background: isSelected && i === 3 ? "rgba(63,94,58,0.10)" : isSelected ? "rgba(183,85,59,0.10)" : "#fff",
          border: `1px solid ${isSelected && i === 3 ? TAP.green : isSelected ? TAP.accent : TAP.hair}`,
          borderLeft: `3px solid ${isSelected && i === 3 ? TAP.green : isSelected ? TAP.accent : TAP.accent}`,
          borderRadius: 2, marginBottom: 10,
          textAlign: "left", cursor: "pointer", fontFamily: "inherit",
        }}>
          <div style={{ flex: 1, padding: "14px 14px 12px", minWidth: 0 }}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              marginBottom: 8,
            }}>
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace", fontSize: 9,
                color: TAP.accent, fontWeight: 500, letterSpacing: "0.1em",
              }}>RÉPONSE {String.fromCharCode(65 + i)}</div>
              <TAPStatusBadge selected={selected} i={i} />
            </div>
            <div style={{
              fontSize: 12, lineHeight: 1.5, color: TAP.ink, textWrap: "pretty",
            }}>{TAP_QUESTIONS[i]}</div>
            {!isSelected && (
              <div style={{
                marginTop: 10,
                fontFamily: "'IBM Plex Mono', monospace", fontSize: 8.5,
                color: TAP.inkSoft, letterSpacing: "0.15em",
              }}>TAPPER LA POIGNÉE →</div>
            )}
          </div>
          {/* Right handle */}
          <div style={{
            width: 56, flexShrink: 0,
            background: isSelected && i === 3 ? TAP.green : isSelected ? TAP.accent : TAP.ink,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 4,
            color: "#fff", position: "relative", overflow: "hidden",
          }}>
            {!isSelected && (
              <div style={{
                position: "absolute", top: 0, bottom: 0, width: 30,
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
                animation: "tapShimmerLine 2.2s linear infinite",
              }} />
            )}
            <div style={{
              fontSize: 22, lineHeight: 1, fontWeight: 300,
              animation: !isSelected ? "tapNudge 1.4s ease-in-out infinite" : "none",
              color: !isSelected ? TAP.accent : "#fff",
            }}>{isSelected ? (i === 3 ? "✓" : "×") : "›"}</div>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 8,
              letterSpacing: "0.12em", textAlign: "center", lineHeight: 1.1,
            }}>VALIDER</div>
          </div>
        </button>
        <TAPNav i={i} setI={setI} selected={selected} />
      </TAPPanel>
    </TAPFrame>
  );
}

window.MobileTAP_V1Button = MobileTAP_V1Button;
window.MobileTAP_V2Halo = MobileTAP_V2Halo;
window.MobileTAP_V3Slide = MobileTAP_V3Slide;
