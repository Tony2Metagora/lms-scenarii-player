// Mobile paysage · Side panel — 1 seule réponse à l'écran + navigation
// 3 variantes de pagination : dots, lettres ABCD, flèches + index

const SA = {
  bg: "#F2F0EC",
  card: "#FAF8F4",
  ink: "#1A1A1A",
  inkSoft: "#5C5A55",
  inkDim: "#9E9B94",
  hair: "#DCD7CC",
  accent: "#B7553B",
  green: "#3F5E3A",
};

const SA_QUESTIONS = [
  "Souhaitez-vous découvrir aujourd'hui quels parfums comptent parmi nos meilleures ventes ?",
  "Qu'est-ce qui vous attire dans notre univers parfum aujourd'hui ?",
  "Vous cherchez quelque chose de très féminin et plutôt populaire, c'est bien ça ?",
  "Avez-vous déjà senti auparavant certaines de nos fragrances que vous aimez particulièrement ?",
];

// ─── Frame réutilisable : vidéo + header + chips audio ───
function SAFrame({ children, src }) {
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

      {/* Header */}
      <div style={{
        position: "absolute", top: 14, left: 14, right: 360, zIndex: 10,
        display: "flex", alignItems: "center", gap: 12, color: "#fff",
      }}>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <SADot state="done" />
          <SALine done />
          <SADot state="current" />
          <SALine />
          <SADot />
          <SALine />
          <SADot />
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "4px 10px", background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(10px)", borderRadius: 999,
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 8, letterSpacing: "0.15em",
        }}>
          <span style={{
            width: 5, height: 5, borderRadius: "50%", background: SA.accent,
            animation: "saPulse 1.6s ease-in-out infinite",
          }} />
          LA CLIENTE VOUS PARLE
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 8, opacity: 0.75 }}>Q. 04/04</span>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 8, color: SA.accent }}>· TENT. 04</span>
        </div>
      </div>

      {/* Audio chips */}
      <div style={{
        position: "absolute", left: 14, bottom: 14, zIndex: 10,
        display: "flex", gap: 6,
      }}>
        <SAChip icon="↻" label="Réécouter" />
        <SAChip icon="CC" label="Sous-titres" />
        <SAChip icon="🔇" label="Muet" />
      </div>

      {children}

      <style>{`
        @keyframes saPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.4); }
        }
        @keyframes saSlide {
          from { opacity: 0; transform: translateX(8px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

// ─── Variante A : Dots discrets sous la carte (sans bouton valider) ───
function MobileSingleAnswer_Dots({ src }) {
  const [i, setI] = React.useState(0);
  const [selected, setSelected] = React.useState(null);
  const correctIndex = 3;

  return (
    <SAFrame src={src}>
      <div style={{
        position: "absolute", top: 0, bottom: 0, right: 0, width: 340,
        background: "rgba(250, 248, 244, 0.96)",
        backdropFilter: "blur(24px)",
        borderLeft: `1px solid rgba(255,255,255,0.4)`,
        boxShadow: "-12px 0 40px -8px rgba(0,0,0,0.35)",
        padding: "16px 14px 12px",
        zIndex: 20,
        display: "flex", flexDirection: "column",
        boxSizing: "border-box",
      }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 8.5,
          color: SA.accent, letterSpacing: "0.18em", marginBottom: 8,
        }}>◆ VOTRE TOUR, QUE RÉPONDEZ-VOUS ?</div>

        {/* Single answer card — toute la hauteur */}
        <button
          key={i}
          onClick={() => setSelected(i)}
          style={{
            flex: 1, minHeight: 0,
            display: "flex", flexDirection: "column", justifyContent: "center",
            padding: "14px 14px",
            background: selected === i ? (i === correctIndex ? "rgba(63,94,58,0.10)" : "rgba(183,85,59,0.10)") : "#fff",
            border: `1px solid ${selected === i ? (i === correctIndex ? SA.green : SA.accent) : SA.hair}`,
            borderLeft: `3px solid ${selected === i ? (i === correctIndex ? SA.green : SA.accent) : SA.accent}`,
            borderRadius: 2,
            animation: "saSlide 0.28s ease-out",
            marginBottom: 12,
            textAlign: "left",
            cursor: "pointer",
            fontFamily: "inherit",
          }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 9,
            color: SA.accent, fontWeight: 500, marginBottom: 10,
            letterSpacing: "0.1em",
          }}>RÉPONSE {String.fromCharCode(65 + i)} — TAP POUR CHOISIR</div>
          <div style={{
            fontSize: 12, lineHeight: 1.5, color: SA.ink, textWrap: "pretty",
          }}>{SA_QUESTIONS[i]}</div>
        </button>

        {/* Dots pagination + flèches en bas */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "6px 4px",
        }}>
          <button onClick={() => setI((i - 1 + 4) % 4)} style={{
            background: "transparent", border: "none", cursor: "pointer",
            color: SA.inkSoft, fontSize: 18, padding: "4px 8px",
            fontFamily: "inherit",
          }}>‹</button>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {[0, 1, 2, 3].map(idx => (
              <button key={idx} onClick={() => setI(idx)} style={{
                width: idx === i ? 22 : 7, height: 7,
                borderRadius: 999,
                background: idx === i ? SA.accent : selected === idx ? SA.green : SA.inkDim,
                border: "none", cursor: "pointer", padding: 0,
                transition: "all 0.25s",
                opacity: idx === i ? 1 : 0.5,
              }} />
            ))}
          </div>
          <button onClick={() => setI((i + 1) % 4)} style={{
            background: "transparent", border: "none", cursor: "pointer",
            color: SA.inkSoft, fontSize: 18, padding: "4px 8px",
            fontFamily: "inherit",
          }}>›</button>
        </div>
      </div>
    </SAFrame>
  );
}

// ─── Variante D : Numéro segmenté (01·02·03·04) ───
function MobileSingleAnswer_Segmented({ src }) {
  const [i, setI] = React.useState(0);
  const [selected, setSelected] = React.useState(null);
  const correctIndex = 3;

  return (
    <SAFrame src={src}>
      <div style={{
        position: "absolute", top: 0, bottom: 0, right: 0, width: 340,
        background: "rgba(250, 248, 244, 0.96)",
        backdropFilter: "blur(24px)",
        borderLeft: `1px solid rgba(255,255,255,0.4)`,
        boxShadow: "-12px 0 40px -8px rgba(0,0,0,0.35)",
        padding: "16px 14px 12px",
        zIndex: 20,
        display: "flex", flexDirection: "column",
        boxSizing: "border-box",
      }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 8.5,
          color: SA.accent, letterSpacing: "0.18em", marginBottom: 8,
        }}>◆ VOTRE TOUR, QUE RÉPONDEZ-VOUS ?</div>

        {/* Card */}
        <button
          key={i}
          onClick={() => setSelected(i)}
          style={{
            flex: 1, minHeight: 0,
            display: "flex", flexDirection: "column", justifyContent: "center",
            padding: "14px 14px",
            background: selected === i ? (i === correctIndex ? "rgba(63,94,58,0.10)" : "rgba(183,85,59,0.10)") : "#fff",
            border: `1px solid ${selected === i ? (i === correctIndex ? SA.green : SA.accent) : SA.hair}`,
            borderTop: `3px solid ${selected === i ? (i === correctIndex ? SA.green : SA.accent) : SA.accent}`,
            borderRadius: 2,
            animation: "saSlide 0.28s ease-out",
            marginBottom: 10,
            textAlign: "left",
            cursor: "pointer",
            fontFamily: "inherit",
          }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic", fontWeight: 400,
            fontSize: 17, lineHeight: 1.35,
            color: SA.ink, textWrap: "pretty",
          }}>{SA_QUESTIONS[i]}</div>
        </button>

        {/* Segmented numbered nav */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          gap: 0, border: `1px solid ${SA.hair}`, borderRadius: 2, overflow: "hidden",
        }}>
          {[0, 1, 2, 3].map(idx => {
            const isCurrent = idx === i;
            const wasSelected = selected === idx;
            const isCorrect = wasSelected && idx === correctIndex;
            const isWrong = wasSelected && idx !== correctIndex;
            return (
              <button key={idx} onClick={() => setI(idx)} style={{
                padding: "8px 0",
                background: isCurrent ? SA.ink : isCorrect ? "rgba(63,94,58,0.15)" : isWrong ? "rgba(183,85,59,0.15)" : "transparent",
                color: isCurrent ? "#fff" : isCorrect ? SA.green : isWrong ? SA.accent : SA.inkSoft,
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 10, fontWeight: 500,
                letterSpacing: "0.05em",
                cursor: "pointer",
                border: "none",
                borderLeft: idx > 0 ? `1px solid ${SA.hair}` : "none",
                transition: "all 0.2s",
              }}>
                {String(idx + 1).padStart(2, "0")}
                {wasSelected && <span style={{ marginLeft: 4, fontSize: 8 }}>{isCorrect ? "✓" : "×"}</span>}
              </button>
            );
          })}
        </div>
      </div>
    </SAFrame>
  );
}

// ─── Variante B : Onglets ABCD en haut de la card ───
function MobileSingleAnswer_Tabs({ src }) {
  const [i, setI] = React.useState(0);
  const [selected, setSelected] = React.useState(null);
  const correctIndex = 3;

  return (
    <SAFrame src={src}>
      <div style={{
        position: "absolute", top: 0, bottom: 0, right: 0, width: 340,
        background: "rgba(250, 248, 244, 0.96)",
        backdropFilter: "blur(24px)",
        borderLeft: `1px solid rgba(255,255,255,0.4)`,
        boxShadow: "-12px 0 40px -8px rgba(0,0,0,0.35)",
        padding: "16px 14px 12px",
        zIndex: 20,
        display: "flex", flexDirection: "column",
        boxSizing: "border-box",
      }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 8.5,
          color: SA.accent, letterSpacing: "0.18em", marginBottom: 6,
        }}>◆ VOTRE TOUR</div>
        <h2 style={{
          margin: 0, marginBottom: 10,
          fontSize: 13, fontWeight: 500, lineHeight: 1.3,
          letterSpacing: "-0.01em", color: SA.ink,
        }}>Quelle formulation est la plus juste ?</h2>

        {/* ABCD tabs */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          gap: 4, marginBottom: 10,
        }}>
          {[0, 1, 2, 3].map(idx => {
            const isCurrent = idx === i;
            const wasSelected = selected === idx;
            const isCorrect = wasSelected && idx === correctIndex;
            const isWrong = wasSelected && idx !== correctIndex;
            return (
              <button key={idx} onClick={() => setI(idx)} style={{
                padding: "8px 0",
                background: isCurrent ? SA.ink : "#fff",
                border: `1px solid ${isCorrect ? SA.green : isWrong ? SA.accent : SA.hair}`,
                color: isCurrent ? "#fff" : isCorrect ? SA.green : isWrong ? SA.accent : SA.ink,
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11, fontWeight: 600,
                letterSpacing: "0.1em",
                cursor: "pointer", borderRadius: 2,
                transition: "all 0.2s",
                position: "relative",
              }}>
                {String.fromCharCode(65 + idx)}
                {wasSelected && (
                  <span style={{
                    position: "absolute", top: 2, right: 4,
                    fontSize: 7, color: isCorrect ? SA.green : SA.accent,
                  }}>{isCorrect ? "✓" : "×"}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Single answer card */}
        <div key={i} style={{
          flex: 1, minHeight: 0,
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "14px 14px",
          background: "#fff",
          border: `1px solid ${SA.hair}`,
          borderRadius: 2,
          animation: "saSlide 0.28s ease-out",
          marginBottom: 10,
        }}>
          <div style={{
            fontSize: 12, lineHeight: 1.5, color: SA.ink, textWrap: "pretty",
          }}>« {SA_QUESTIONS[i]} »</div>
        </div>

        {/* Footer */}
        <div style={{
          paddingTop: 8, borderTop: `1px solid ${SA.hair}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 8.5,
            color: SA.inkDim, letterSpacing: "0.1em",
          }}>RÉPONSE {String.fromCharCode(65 + i)}</span>
          <button onClick={() => setSelected(i)} style={{
            background: SA.ink, color: "#fff", border: "none",
            padding: "6px 14px", fontSize: 9, fontWeight: 500,
            cursor: "pointer", borderRadius: 2, fontFamily: "inherit",
            letterSpacing: "0.05em",
          }}>Valider →</button>
        </div>
      </div>
    </SAFrame>
  );
}

// ─── Variante C : Flèches + index 1/4 (style swipe) ───
function MobileSingleAnswer_Swipe({ src }) {
  const [i, setI] = React.useState(0);
  const [selected, setSelected] = React.useState(null);
  const correctIndex = 3;

  return (
    <SAFrame src={src}>
      <div style={{
        position: "absolute", top: 0, bottom: 0, right: 0, width: 340,
        background: "rgba(250, 248, 244, 0.96)",
        backdropFilter: "blur(24px)",
        borderLeft: `1px solid rgba(255,255,255,0.4)`,
        boxShadow: "-12px 0 40px -8px rgba(0,0,0,0.35)",
        padding: "16px 14px 12px",
        zIndex: 20,
        display: "flex", flexDirection: "column",
        boxSizing: "border-box",
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: 10,
        }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 8.5,
            color: SA.accent, letterSpacing: "0.18em",
          }}>◆ VOTRE TOUR</div>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 9,
            color: SA.inkSoft, letterSpacing: "0.05em",
          }}>
            <span style={{ color: SA.ink, fontWeight: 600 }}>{String(i + 1).padStart(2, "0")}</span>
            <span style={{ opacity: 0.5 }}> / 04</span>
          </div>
        </div>

        <h2 style={{
          margin: 0, marginBottom: 10,
          fontSize: 13, fontWeight: 500, lineHeight: 1.3,
          letterSpacing: "-0.01em", color: SA.ink,
        }}>Quelle formulation est la plus juste ?</h2>

        {/* Card with arrows on sides */}
        <div style={{
          flex: 1, minHeight: 0,
          display: "flex", alignItems: "stretch", gap: 6,
          marginBottom: 10,
        }}>
          <button
            onClick={() => setI((i - 1 + 4) % 4)}
            style={{
              width: 30, flexShrink: 0,
              background: "rgba(255,255,255,0.6)",
              border: `1px solid ${SA.hair}`,
              color: SA.inkSoft,
              cursor: "pointer", fontSize: 16,
              borderRadius: 2, fontFamily: "inherit",
              display: "grid", placeItems: "center",
            }}>‹</button>

          <div key={i} style={{
            flex: 1, minWidth: 0,
            display: "flex", flexDirection: "column", justifyContent: "center",
            padding: "12px 14px",
            background: selected === i && i === correctIndex ? "rgba(63,94,58,0.10)" :
                        selected === i ? "rgba(183,85,59,0.10)" : "#fff",
            border: `1px solid ${selected === i ? (i === correctIndex ? SA.green : SA.accent) : SA.hair}`,
            borderTop: `3px solid ${selected === i ? (i === correctIndex ? SA.green : SA.accent) : SA.accent}`,
            borderRadius: 2,
            animation: "saSlide 0.28s ease-out",
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic", fontWeight: 400,
              fontSize: 16, lineHeight: 1.35,
              color: SA.ink, textWrap: "pretty",
            }}>{SA_QUESTIONS[i]}</div>
          </div>

          <button
            onClick={() => setI((i + 1) % 4)}
            style={{
              width: 30, flexShrink: 0,
              background: "rgba(255,255,255,0.6)",
              border: `1px solid ${SA.hair}`,
              color: SA.inkSoft,
              cursor: "pointer", fontSize: 16,
              borderRadius: 2, fontFamily: "inherit",
              display: "grid", placeItems: "center",
            }}>›</button>
        </div>

        {/* Progress bar style mini-pagination */}
        <div style={{
          display: "flex", gap: 3, marginBottom: 10, height: 3,
        }}>
          {[0, 1, 2, 3].map(idx => (
            <button key={idx} onClick={() => setI(idx)} style={{
              flex: 1, height: 3, padding: 0,
              background: idx === i ? SA.accent : selected === idx ? SA.green : SA.hair,
              border: "none", cursor: "pointer", borderRadius: 999,
              transition: "all 0.25s",
            }} />
          ))}
        </div>

        <button onClick={() => setSelected(i)} style={{
          width: "100%",
          background: SA.ink, color: "#fff", border: "none",
          padding: "8px", fontSize: 10, fontWeight: 500,
          cursor: "pointer", borderRadius: 2, fontFamily: "inherit",
          letterSpacing: "0.1em",
        }}>VALIDER LA RÉPONSE {String.fromCharCode(65 + i)}</button>
      </div>
    </SAFrame>
  );
}

// ─── Helpers ───
function SAChip({ icon, label }) {
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
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: SA.accent, fontSize: 8 }}>{icon}</span>
      {label}
    </button>
  );
}

function SADot({ state }) {
  const isDone = state === "done";
  const isCurrent = state === "current";
  return (
    <div style={{
      width: isCurrent ? 14 : 10, height: isCurrent ? 14 : 10,
      borderRadius: "50%",
      border: `1.5px solid ${isCurrent ? SA.accent : isDone ? SA.green : "rgba(255,255,255,0.6)"}`,
      background: isDone ? SA.green : isCurrent ? SA.accent : "transparent",
      display: "grid", placeItems: "center",
      color: "#fff", fontFamily: "'IBM Plex Mono', monospace",
      fontSize: 7, fontWeight: 600,
      boxShadow: isCurrent ? `0 0 0 3px rgba(183,85,59,0.2)` : "none",
    }}>{isDone ? "✓" : ""}</div>
  );
}

function SALine({ done }) {
  return (
    <div style={{
      width: 16, height: 1.5,
      background: done ? SA.green : "rgba(255,255,255,0.4)",
    }} />
  );
}

window.MobileSingleAnswer_Dots = MobileSingleAnswer_Dots;
window.MobileSingleAnswer_Tabs = MobileSingleAnswer_Tabs;
window.MobileSingleAnswer_Swipe = MobileSingleAnswer_Swipe;
window.MobileSingleAnswer_Segmented = MobileSingleAnswer_Segmented;
