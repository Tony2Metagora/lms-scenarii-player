// 3 déclinaisons : indicateur "tap pour valider" placé ENTRE l'eyebrow et la card
// La card reste sobre — c'est l'indicateur intermédiaire qui guide l'œil

const TAPI = {
  bg: "#F2F0EC", card: "#FAF8F4", ink: "#1A1A1A",
  inkSoft: "#5C5A55", inkDim: "#9E9B94", hair: "#DCD7CC",
  accent: "#B7553B", green: "#3F5E3A",
};

const TAPI_QUESTIONS = [
  "Souhaitez-vous découvrir aujourd'hui quels parfums comptent parmi nos meilleures ventes ?",
  "Qu'est-ce qui vous attire dans notre univers parfum aujourd'hui ?",
  "Vous cherchez quelque chose de très féminin et plutôt populaire, c'est bien ça ?",
  "Avez-vous déjà senti auparavant certaines de nos fragrances que vous aimez particulièrement ?",
];

function TAPIFrame({ src, children }) {
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
            width: 5, height: 5, borderRadius: "50%", background: TAPI.accent,
            animation: "tapiPulse 1.6s ease-in-out infinite",
          }} />
          LA CLIENTE VOUS PARLE
        </div>
        <div style={{ marginLeft: "auto", fontFamily: "'IBM Plex Mono', monospace", fontSize: 8, color: "#fff", opacity: 0.75 }}>
          Q. 04/04 · <span style={{ color: TAPI.accent }}>TENT. 04</span>
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
        @keyframes tapiPulse { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.4;transform:scale(1.4);} }
        @keyframes tapiNudge { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-3px);} }
        @keyframes tapiArrow { 0%,100%{transform:translateY(0);opacity:0.6;} 50%{transform:translateY(4px);opacity:1;} }
        @keyframes tapiShimmer { 0%{transform:translateX(-100%);} 100%{transform:translateX(200%);} }
        @keyframes tapiDots { 0%,80%,100%{opacity:0.3;} 40%{opacity:1;} }
        @keyframes tapiBadge { 0%,100%{box-shadow:0 0 0 0 rgba(183,85,59,0.4);} 50%{box-shadow:0 0 0 6px rgba(183,85,59,0);} }
      `}</style>
    </div>
  );
}

function TAPINav({ i, setI, selected }) {
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
              background: isCurrent ? TAPI.accent : isCorrect ? TAPI.green : isWrong ? TAPI.accent : TAPI.hair,
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
          background: "transparent", border: `1px solid ${TAPI.hair}`,
          color: TAPI.inkSoft, fontSize: 10, cursor: "pointer", fontFamily: "inherit",
        }}>‹ Préc.</button>
        <span style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
          color: TAPI.ink, fontWeight: 500, letterSpacing: "0.1em",
        }}>
          <span style={{ color: TAPI.accent }}>{String(i + 1).padStart(2, "0")}</span>
          <span style={{ color: TAPI.inkDim, margin: "0 4px" }}>/</span>
          <span style={{ color: TAPI.inkSoft }}>04</span>
        </span>
        <button onClick={() => setI((i + 1) % 4)} style={{
          padding: "6px 12px", borderRadius: 2,
          background: "transparent", border: `1px solid ${TAPI.hair}`,
          color: TAPI.inkSoft, fontSize: 10, cursor: "pointer", fontFamily: "inherit",
        }}>Suiv. ›</button>
      </div>
    </>
  );
}

function TAPIPanel({ children }) {
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

function TAPICard({ i, selected, onTap }) {
  const isSelected = selected === i;
  const correct = isSelected && i === 3;
  const wrong = isSelected && i !== 3;
  return (
    <button onClick={onTap} style={{
      flex: 1, minHeight: 0, position: "relative",
      display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "16px 16px",
      background: correct ? "rgba(63,94,58,0.10)" : wrong ? "rgba(183,85,59,0.10)" : "#fff",
      border: `1px solid ${correct ? TAPI.green : wrong ? TAPI.accent : TAPI.hair}`,
      borderLeft: `3px solid ${correct ? TAPI.green : wrong ? TAPI.accent : TAPI.accent}`,
      borderRadius: 2, marginBottom: 10,
      textAlign: "left", cursor: "pointer", fontFamily: "inherit",
    }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: 8,
      }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 9,
          color: TAPI.accent, fontWeight: 500, letterSpacing: "0.1em",
        }}>RÉPONSE {String.fromCharCode(65 + i)}</div>
        {isSelected && (
          <div style={{
            padding: "3px 8px",
            background: correct ? TAPI.green : TAPI.accent, color: "#fff",
            borderRadius: 999, fontSize: 8.5, fontWeight: 500,
            fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em",
          }}>{correct ? "✓ BONNE RÉPONSE" : "× ESSAYEZ ENCORE"}</div>
        )}
      </div>
      <div style={{ fontSize: 12, lineHeight: 1.5, color: TAPI.ink, textWrap: "pretty" }}>
        {TAPI_QUESTIONS[i]}
      </div>
    </button>
  );
}

// ─── V1 · Pill discret avec chevron ↓ animé ───
function MobileTAPI_V1Pill({ src }) {
  const [i, setI] = React.useState(0);
  const [selected, setSelected] = React.useState(null);
  return (
    <TAPIFrame src={src}>
      <TAPIPanel>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 8.5,
          color: TAPI.accent, letterSpacing: "0.18em", marginBottom: 6,
        }}>◆ VOTRE TOUR, QUE RÉPONDEZ-VOUS ?</div>

        {/* Indicator pill — sous l'eyebrow, avant la card */}
        <div style={{
          display: "inline-flex", alignSelf: "flex-start",
          alignItems: "center", gap: 6,
          padding: "4px 10px",
          background: "rgba(183,85,59,0.10)",
          border: `1px solid rgba(183,85,59,0.25)`,
          borderRadius: 999, marginBottom: 8,
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 8.5,
          color: TAPI.accent, letterSpacing: "0.15em", fontWeight: 500,
        }}>
          TAP LA CARTE POUR VALIDER
          <span style={{
            display: "inline-block", fontSize: 11, lineHeight: 1,
            animation: "tapiArrow 1.4s ease-in-out infinite",
          }}>↓</span>
        </div>

        <TAPICard i={i} selected={selected} onTap={() => setSelected(i)} />
        <TAPINav i={i} setI={setI} selected={selected} />
      </TAPIPanel>
    </TAPIFrame>
  );
}

// ─── V2 · Bandeau lumineux pleine largeur avec shimmer ───
function MobileTAPI_V2Banner({ src }) {
  const [i, setI] = React.useState(0);
  const [selected, setSelected] = React.useState(null);
  return (
    <TAPIFrame src={src}>
      <TAPIPanel>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 8.5,
          color: TAPI.accent, letterSpacing: "0.18em", marginBottom: 6,
        }}>◆ VOTRE TOUR, QUE RÉPONDEZ-VOUS ?</div>

        {/* Banner shimmer */}
        <div style={{
          position: "relative", overflow: "hidden",
          background: TAPI.ink, color: "#fff",
          padding: "7px 12px", marginBottom: 8,
          borderRadius: 2,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 9,
          letterSpacing: "0.18em", fontWeight: 500,
        }}>
          <div style={{
            position: "absolute", top: 0, bottom: 0, width: 60,
            background: "linear-gradient(90deg, transparent, rgba(183,85,59,0.5), transparent)",
            animation: "tapiShimmer 2.4s linear infinite",
          }} />
          <span style={{ display: "flex", alignItems: "center", gap: 8, position: "relative" }}>
            <span style={{
              width: 5, height: 5, borderRadius: "50%", background: TAPI.accent,
              animation: "tapiPulse 1.4s ease-in-out infinite",
            }} />
            TAPPEZ POUR VALIDER
          </span>
          <span style={{
            color: TAPI.accent, position: "relative",
            animation: "tapiArrow 1.4s ease-in-out infinite",
          }}>↓</span>
        </div>

        <TAPICard i={i} selected={selected} onTap={() => setSelected(i)} />
        <TAPINav i={i} setI={setI} selected={selected} />
      </TAPIPanel>
    </TAPIFrame>
  );
}

// ─── V3 · Texte minimal italique + 3 dots ondulés ───
function MobileTAPI_V3Quiet({ src }) {
  const [i, setI] = React.useState(0);
  const [selected, setSelected] = React.useState(null);
  return (
    <TAPIFrame src={src}>
      <TAPIPanel>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 8.5,
          color: TAPI.accent, letterSpacing: "0.18em", marginBottom: 6,
        }}>◆ VOTRE TOUR, QUE RÉPONDEZ-VOUS ?</div>

        {/* Quiet helper */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "0 0 8px",
          borderBottom: `1px dashed ${TAPI.hair}`,
          marginBottom: 10,
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic", fontSize: 12,
          color: TAPI.inkSoft,
        }}>
          <span>Tappez sur la réponse de votre choix pour valider</span>
          <span style={{ display: "inline-flex", gap: 3, marginLeft: "auto" }}>
            {[0, 1, 2].map(d => (
              <span key={d} style={{
                width: 4, height: 4, borderRadius: "50%",
                background: TAPI.accent,
                animation: `tapiDots 1.4s ${d * 0.15}s ease-in-out infinite`,
              }} />
            ))}
          </span>
        </div>

        <TAPICard i={i} selected={selected} onTap={() => setSelected(i)} />
        <TAPINav i={i} setI={setI} selected={selected} />
      </TAPIPanel>
    </TAPIFrame>
  );
}

window.MobileTAPI_V1Pill = MobileTAPI_V1Pill;
window.MobileTAPI_V2Banner = MobileTAPI_V2Banner;
window.MobileTAPI_V3Quiet = MobileTAPI_V3Quiet;
