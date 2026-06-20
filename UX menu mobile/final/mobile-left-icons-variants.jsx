// V2 banner avec contrôles audio à GAUCHE en colonne verticale
// 3 déclinaisons d'icônes audio (Réécouter / CC / Muet)

const TLI = {
  bg: "#F2F0EC", card: "#FAF8F4", ink: "#1A1A1A",
  inkSoft: "#5C5A55", inkDim: "#9E9B94", hair: "#DCD7CC",
  accent: "#B7553B", green: "#3F5E3A",
};

const TLI_QUESTIONS = [
  "Souhaitez-vous découvrir aujourd'hui quels parfums comptent parmi nos meilleures ventes ?",
  "Qu'est-ce qui vous attire dans notre univers parfum aujourd'hui ?",
  "Vous cherchez quelque chose de très féminin et plutôt populaire, c'est bien ça ?",
  "Avez-vous déjà senti auparavant certaines de nos fragrances que vous aimez particulièrement ?",
];

// ─── 3 styles d'icônes audio à gauche ───

// Style A — disques sombres remplis avec icônes terracotta (proche du screen WhatsApp)
function TLI_IconsA() {
  return (
    <div style={{
      position: "absolute", left: 16,
      top: "50%", transform: "translateY(-50%)",
      zIndex: 10, display: "flex", flexDirection: "column", gap: 10,
    }}>
      {[
        { svg: <path d="M14 4 a8 8 0 1 0 7 4.5" stroke="#B7553B" strokeWidth="2" fill="none" strokeLinecap="round" />, extra: <polyline points="14,1 14,5 18,5" stroke="#B7553B" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /> },
        { text: "CC" },
        { svg: <><path d="M5 10 v8 h4 l5 4 V6 l-5 4 H5z" fill="#B7553B" /><path d="M17 10 q3 4 0 8" stroke="#B7553B" strokeWidth="1.8" fill="none" strokeLinecap="round" /><path d="M19 7 q5 7 0 14" stroke="#B7553B" strokeWidth="1.8" fill="none" strokeLinecap="round" /></> },
      ].map((it, i) => (
        <button key={i} style={{
          width: 48, height: 48, borderRadius: "50%",
          background: "rgba(20,18,15,0.78)",
          backdropFilter: "blur(8px)",
          border: "none", cursor: "pointer",
          display: "grid", placeItems: "center",
          boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
        }}>
          {it.text ? (
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 14,
              color: TLI.accent, fontWeight: 600, letterSpacing: "0.05em",
            }}>{it.text}</span>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24">{it.svg}{it.extra}</svg>
          )}
        </button>
      ))}
    </div>
  );
}

// Style B — anneaux fins translucides, icônes blanches, accent par dot
function TLI_IconsB({ replayVariant = 1 }) {
  const items = [
    { kind: "replay" },
    { kind: "cc" },
    { kind: "speaker" },
  ];
  return (
    <div style={{
      position: "absolute", left: 14,
      top: "50%", transform: "translateY(-50%)",
      zIndex: 10, display: "flex", flexDirection: "column", gap: 8,
    }}>
      {items.map((it, i) => (
        <button key={i} style={{
          width: 44, height: 44, borderRadius: "50%",
          background: "rgba(0,0,0,0.4)", backdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.32)",
          cursor: "pointer", position: "relative",
          display: "grid", placeItems: "center",
        }}>
          {it.kind === "cc" && (
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 14,
              color: "#fff", fontWeight: 700, letterSpacing: "0.04em",
            }}>CC</span>
          )}
          {it.kind === "replay" && replayVariant === 1 && (
            // V1 — flèche circulaire complète (counter-clockwise)
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M20 12 a8 8 0 1 1-2.34-5.66" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              <polyline points="20,3 20,8 15,8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          )}
          {it.kind === "replay" && replayVariant === 2 && (
            // V2 — double triangle rewind (style media player)
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <polygon points="11,6 11,18 3,12" fill="#fff" />
              <polygon points="21,6 21,18 13,12" fill="#fff" />
              <line x1="2" y1="6" x2="2" y2="18" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
          {it.kind === "replay" && replayVariant === 3 && (
            // V3 — circulaire avec chiffre "10" (replay 10s)
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19 12 a7 7 0 1 1-2-4.9" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
              <polyline points="19,3.5 19,7.5 15,7.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <text x="12" y="15.5" textAnchor="middle" fill="#fff"
                fontFamily="'IBM Plex Mono', monospace" fontSize="7" fontWeight="700">10</text>
            </svg>
          )}
          {it.kind === "speaker" && (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M5 10 v4 h3 l4 3 V7 l-4 3 H5z" fill="#fff" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M16 9 q2.5 3 0 6" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              <path d="M18.5 7 q4 5 0 10" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            </svg>
          )}
          <span style={{
            position: "absolute", top: 2, right: 2,
            width: 5, height: 5, borderRadius: "50%",
            background: TLI.accent,
          }} />
        </button>
      ))}
    </div>
  );
}

// Style C — pills horizontales empilées avec label texte (très éditorial Quiet Material)
function TLI_IconsC() {
  const items = [
    { label: "Réécouter", icon: "↻" },
    { label: "Sous-titres", icon: "CC" },
    { label: "Muet", icon: "✕" },
  ];
  return (
    <div style={{
      position: "absolute", left: 14,
      top: "50%", transform: "translateY(-50%)",
      zIndex: 10, display: "flex", flexDirection: "column", gap: 6,
    }}>
      {items.map((it, i) => (
        <button key={i} style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          height: 30, padding: "0 12px 0 10px",
          borderRadius: 999,
          background: "rgba(20,18,15,0.72)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "#fff", cursor: "pointer",
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 10, fontWeight: 500,
        }}>
          <span style={{
            width: 18, height: 18, borderRadius: "50%",
            background: "rgba(183,85,59,0.22)",
            border: `1px solid ${TLI.accent}`,
            color: TLI.accent,
            display: "grid", placeItems: "center",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 9, fontWeight: 600,
          }}>{it.icon}</span>
          {it.label}
        </button>
      ))}
    </div>
  );
}

// ─── Frame réutilisable avec banner V2 ───

function TLIFrame({ src, controls }) {
  const [i, setI] = React.useState(0);
  const [selected, setSelected] = React.useState(null);
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
      {/* gradient gauche pour les icônes */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 120,
        background: "linear-gradient(to right, rgba(0,0,0,0.45), transparent)",
        zIndex: 4, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", left: 0, right: 0, top: 0, height: 80,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)",
        zIndex: 4, pointerEvents: "none",
      }} />

      {/* Top header */}
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
            width: 5, height: 5, borderRadius: "50%", background: TLI.accent,
            animation: "tliPulse 1.6s ease-in-out infinite",
          }} />
          LA CLIENTE VOUS PARLE
        </div>
        <div style={{ marginLeft: "auto", fontFamily: "'IBM Plex Mono', monospace", fontSize: 8, opacity: 0.75 }}>
          Q. 04/04 · <span style={{ color: TLI.accent }}>TENT. 04</span>
        </div>
      </div>

      {/* Audio controls — LEFT vertical */}
      {controls}

      {/* Languette / drag handle — debord à gauche du panel */}
      <div style={{
        position: "absolute", right: 340, top: "50%",
        transform: "translateY(-50%)",
        width: 22, height: 64,
        background: "rgba(250, 248, 244, 0.96)",
        backdropFilter: "blur(24px)",
        borderTopLeftRadius: 6, borderBottomLeftRadius: 6,
        boxShadow: "-4px 0 12px -2px rgba(0,0,0,0.25)",
        zIndex: 21,
        display: "grid", placeItems: "center",
        cursor: "grab",
      }}>
        <div style={{
          width: 3, height: 28, borderRadius: 2,
          background: TLI.accent,
          animation: "tliHandle 1.8s ease-in-out infinite",
        }} />
      </div>

      {/* Right Panel */}
      <div style={{
        position: "absolute", top: 0, bottom: 0, right: 0, width: 340,
        background: "rgba(250, 248, 244, 0.96)", backdropFilter: "blur(24px)",
        borderLeft: "1px solid rgba(255,255,255,0.4)",
        boxShadow: "-12px 0 40px -8px rgba(0,0,0,0.35)",
        padding: "16px 14px 14px", zIndex: 20,
        display: "flex", flexDirection: "column", boxSizing: "border-box",
      }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 8.5,
          color: TLI.accent, letterSpacing: "0.18em", marginBottom: 6,
          fontWeight: 500,
        }}>VOTRE TOUR, QUE RÉPONDEZ-VOUS ?</div>

        {/* Banner V2 — Cliquez sur la réponse pour valider */}
        <div style={{
          position: "relative", overflow: "hidden",
          background: TLI.ink, color: "#fff",
          padding: "7px 12px", marginBottom: 8,
          borderRadius: 2,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 9,
          letterSpacing: "0.18em", fontWeight: 500,
        }}>
          <div style={{
            position: "absolute", top: 0, bottom: 0, width: 60,
            background: "linear-gradient(90deg, transparent, rgba(183,85,59,0.5), transparent)",
            animation: "tliShimmer 2.4s linear infinite",
          }} />
          <span style={{ display: "flex", alignItems: "center", gap: 8, position: "relative" }}>
            <span style={{
              width: 5, height: 5, borderRadius: "50%", background: TLI.accent,
              animation: "tliPulse 1.4s ease-in-out infinite",
            }} />
            CLIQUEZ SUR LA RÉPONSE POUR VALIDER
          </span>
          <span style={{
            color: TLI.accent, position: "relative",
            animation: "tliArrow 1.4s ease-in-out infinite",
          }}>↓</span>
        </div>

        {/* Card courante */}
        <button onClick={() => setSelected(i)} style={{
          flex: 1, minHeight: 0, position: "relative",
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "16px",
          background: selected === i ? (i === 3 ? "rgba(63,94,58,0.10)" : "rgba(183,85,59,0.10)") : "#fff",
          border: `1px solid ${selected === i ? (i === 3 ? TLI.green : TLI.accent) : TLI.hair}`,
          borderLeft: `3px solid ${selected === i ? (i === 3 ? TLI.green : TLI.accent) : TLI.accent}`,
          borderRadius: 2, marginBottom: 10,
          textAlign: "left", cursor: "pointer", fontFamily: "inherit",
        }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: 8,
          }}>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 9,
              color: TLI.accent, fontWeight: 500, letterSpacing: "0.1em",
            }}>RÉPONSE {String.fromCharCode(65 + i)}</div>
            {selected === i && (
              <div style={{
                padding: "3px 8px",
                background: i === 3 ? TLI.green : TLI.accent, color: "#fff",
                borderRadius: 999, fontSize: 8.5, fontWeight: 500,
                fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em",
              }}>{i === 3 ? "✓ BONNE RÉPONSE" : "× ESSAYEZ ENCORE"}</div>
            )}
          </div>
          <div style={{ fontSize: 12, lineHeight: 1.5, color: TLI.ink, textWrap: "pretty" }}>
            {TLI_QUESTIONS[i]}
          </div>
        </button>

        {/* Nav */}
        <div style={{ display: "flex", gap: 3, marginBottom: 10 }}>
          {[0, 1, 2, 3].map(idx => (
            <button key={idx} onClick={() => setI(idx)} style={{
              flex: 1, height: 4,
              background: idx === i ? TLI.accent : TLI.hair,
              border: "none", cursor: "pointer", padding: 0,
              borderRadius: 2, transition: "all 0.25s",
            }} />
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={() => setI((i + 3) % 4)} style={{
            padding: "6px 12px", borderRadius: 2,
            background: "transparent", border: `1px solid ${TLI.hair}`,
            color: TLI.inkSoft, fontSize: 10, cursor: "pointer", fontFamily: "inherit",
          }}>‹ Préc.</button>
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
            color: TLI.ink, fontWeight: 500, letterSpacing: "0.1em",
          }}>
            <span style={{ color: TLI.accent }}>{String(i + 1).padStart(2, "0")}</span>
            <span style={{ color: TLI.inkDim, margin: "0 4px" }}>/</span>
            <span style={{ color: TLI.inkSoft }}>04</span>
          </span>
          <button onClick={() => setI((i + 1) % 4)} style={{
            padding: "6px 12px", borderRadius: 2,
            background: "transparent", border: `1px solid ${TLI.hair}`,
            color: TLI.inkSoft, fontSize: 10, cursor: "pointer", fontFamily: "inherit",
          }}>Suiv. ›</button>
        </div>
      </div>

      <style>{`
        @keyframes tliPulse { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.4;transform:scale(1.4);} }
        @keyframes tliShimmer { 0%{transform:translateX(-100%);} 100%{transform:translateX(800%);} }
        @keyframes tliArrow { 0%,100%{transform:translateY(0);opacity:0.6;} 50%{transform:translateY(4px);opacity:1;} }
        @keyframes tliHandle { 0%,100%{opacity:1;height:28px;} 50%{opacity:0.55;height:20px;} }
      `}</style>
    </div>
  );
}

function MobileTLI_VarA({ src }) { return <TLIFrame src={src} controls={<TLI_IconsA />} />; }
function MobileTLI_VarB({ src }) { return <TLIFrame src={src} controls={<TLI_IconsB replayVariant={1} />} />; }
function MobileTLI_VarB2({ src }) { return <TLIFrame src={src} controls={<TLI_IconsB replayVariant={2} />} />; }
function MobileTLI_VarB3({ src }) { return <TLIFrame src={src} controls={<TLI_IconsB replayVariant={3} />} />; }
function MobileTLI_VarC({ src }) { return <TLIFrame src={src} controls={<TLI_IconsC />} />; }

window.MobileTLI_VarA = MobileTLI_VarA;
window.MobileTLI_VarB = MobileTLI_VarB;
window.MobileTLI_VarB2 = MobileTLI_VarB2;
window.MobileTLI_VarB3 = MobileTLI_VarB3;
window.MobileTLI_VarC = MobileTLI_VarC;
