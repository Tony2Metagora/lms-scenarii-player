// Mobile landscape (844x390) versions: A1 welcome, C2 voice-off fullscreen, A3 ready, Tips C4 v3

const M_ONB = {
  bg: "#F2F0EC",
  card: "#FAF8F4",
  ink: "#1A1A1A",
  inkSoft: "#5C5A55",
  inkDim: "#9E9B94",
  hair: "#DCD7CC",
  accent: "#B7553B",
};

const M_PRENOMS = ["Camille", "Inès", "Léa", "Marc", "Sofia", "Thomas", "Zina"];

function MVideoBg({ src, blur, dark }) {
  return (
    <div style={{ position: "absolute", inset: 0, background: "#1f1d1a", overflow: "hidden" }}>
      <video src={src} autoPlay muted loop playsInline style={{
        position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
        filter: `${blur ? `blur(${blur}px)` : ""} ${dark ? "brightness(0.6)" : "brightness(0.85)"}`,
        transform: blur ? "scale(1.1)" : "none",
      }} />
    </div>
  );
}

// ── Mobile A1 — Welcome / prénom (paysage 844x390)
function MOnbA_Welcome() {
  const [name, setName] = React.useState("Zina");
  return (
    <div style={{
      width: "100%", height: "100%", background: M_ONB.bg, color: M_ONB.ink,
      fontFamily: "'IBM Plex Sans', sans-serif", position: "relative", overflow: "hidden",
      display: "flex", padding: "20px 32px", boxSizing: "border-box",
    }}>
      {/* Header */}
      <div style={{
        position: "absolute", top: 12, left: 24, right: 24,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 8,
        color: M_ONB.inkSoft, letterSpacing: "0.1em",
      }}>
        <span>METAGORA <span style={{ color: M_ONB.inkDim }}>/ FR-01</span></span>
        <span>SCÈNE 01 · ACCUEIL</span>
      </div>

      {/* Two columns layout for landscape */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32,
        width: "100%", height: "100%", alignItems: "center",
        paddingTop: 12,
      }}>
        {/* Left — title */}
        <div>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 8,
            letterSpacing: "0.25em", color: M_ONB.inkSoft, marginBottom: 14,
          }}>
            <div style={{ width: 24, height: 1, background: M_ONB.accent }} />
            BIENVENUE
          </div>
          <h1 style={{
            margin: 0, marginBottom: 10,
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic", fontWeight: 400,
            fontSize: 32, lineHeight: 1.05, color: M_ONB.ink, letterSpacing: "-0.01em",
          }}>
            Vous entrez dans un<br />moment Hermès.
          </h1>
          <p style={{
            margin: 0, fontSize: 11, lineHeight: 1.5, color: M_ONB.inkSoft, maxWidth: 320,
          }}>
            Avant de rencontrer la cliente, dites-nous comment vous appeler.
          </p>
        </div>

        {/* Right — input + CTA */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <label style={{
            display: "block", fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 8, letterSpacing: "0.2em", color: M_ONB.accent, marginBottom: 8,
          }}>VOTRE PRÉNOM</label>
          <select value={name} onChange={(e) => setName(e.target.value)} style={{
            width: "100%", padding: "8px 0", border: "none",
            borderBottom: `1.5px solid ${M_ONB.ink}`, background: "transparent",
            fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
            fontSize: 22, color: M_ONB.ink, outline: "none", appearance: "none",
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path d='M1 1l5 5 5-5' stroke='%231A1A1A' stroke-width='1.5' fill='none'/></svg>")`,
            backgroundRepeat: "no-repeat", backgroundPosition: "right 4px center",
            marginBottom: 22,
          }}>
            {M_PRENOMS.map((p) => <option key={p}>{p}</option>)}
          </select>

          <button style={{
            padding: "12px 0", background: M_ONB.ink, color: "#fff", border: "none",
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 10, fontWeight: 500, letterSpacing: "0.2em",
            cursor: "pointer", borderRadius: 2,
          }}>COMMENCER →</button>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: "absolute", bottom: 10, left: 24, right: 24,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 8,
        color: M_ONB.inkDim, letterSpacing: "0.15em",
      }}>
        <span>● ○ ○ ○</span>
        <span>≈ 8 MIN</span>
      </div>
    </div>
  );
}

// ── Mobile C2 — Voice-off fullscreen, lecture suivie + waveform
function MOnbC_VoiceOffFull() {
  const cues = [
    "Vous travaillez chez Hermès Parfum.",
    "Une cliente s'apprête à entrer dans la boutique.",
    "Votre rôle : la mettre à l'aise,",
    "comprendre ses envies, l'orienter avec justesse.",
  ];
  const words = React.useMemo(() => {
    const arr = [];
    cues.forEach((line, li) => {
      line.split(" ").forEach((w) => arr.push({ w, li }));
      arr[arr.length - 1].breakAfter = true;
    });
    return arr;
  }, []);
  const [read, setRead] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setRead((i) => (i + 1) % (words.length + 6)), 320);
    return () => clearInterval(t);
  }, [words.length]);
  const elapsed = Math.min(read, words.length);
  const pct = elapsed / words.length;

  return (
    <div style={{
      width: "100%", height: "100%", background: M_ONB.bg, color: M_ONB.ink,
      fontFamily: "'IBM Plex Sans', sans-serif", position: "relative", overflow: "hidden",
      padding: "20px 36px", boxSizing: "border-box",
      display: "flex", flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 8,
        color: M_ONB.inkSoft, letterSpacing: "0.15em",
      }}>
        <span>METAGORA <span style={{ color: M_ONB.inkDim }}>/ FR-01</span></span>
        <span>SCÈNE 01 · NARRATION</span>
      </div>

      {/* Waveform */}
      <div style={{
        marginTop: 14, display: "flex", alignItems: "center", gap: 12,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 2.5, height: 28 }}>
          {Array.from({ length: 32 }).map((_, i) => {
            const phase = i / 32;
            const active = phase < pct;
            return (
              <div key={i} style={{
                width: 2,
                background: active ? M_ONB.accent : M_ONB.hair,
                borderRadius: 2,
                height: 7 + Math.abs(Math.sin(i * 0.45 + read * 0.3)) * (active ? 18 : 9),
                transition: "background 0.3s, height 0.2s",
              }} />
            );
          })}
        </div>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 8,
          letterSpacing: "0.2em", color: M_ONB.inkSoft,
        }}>
          <span style={{ color: M_ONB.accent }}>● VOIX OFF</span>
          <span style={{ marginLeft: 8 }}>{String(Math.floor(pct * 32)).padStart(2, "0")}/32 SEC</span>
        </div>
      </div>

      {/* Big read-along text */}
      <div style={{
        flex: 1, display: "flex", alignItems: "center",
        marginTop: 14, marginBottom: 14,
      }}>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
          fontWeight: 400, fontSize: 24, lineHeight: 1.25,
          letterSpacing: "-0.005em", textWrap: "balance",
        }}>
          {words.map((wd, i) => (
            <React.Fragment key={i}>
              <span style={{
                color: i < elapsed ? M_ONB.ink : M_ONB.inkDim,
                opacity: i < elapsed ? 1 : 0.35,
                transition: "color 0.3s, opacity 0.3s",
              }}>{wd.w}</span>
              {wd.breakAfter ? <br /> : " "}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        paddingTop: 10, borderTop: `1px solid ${M_ONB.hair}`,
      }}>
        <div style={{
          flex: 1, marginRight: 18, height: 2, background: M_ONB.hair,
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0, width: `${pct * 100}%`,
            background: M_ONB.accent, transition: "width 0.2s",
          }} />
        </div>
        <button style={{
          background: "transparent", border: `1px solid ${M_ONB.hair}`,
          padding: "6px 12px", color: M_ONB.inkSoft,
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 8,
          letterSpacing: "0.2em", cursor: "pointer", borderRadius: 2,
        }}>PASSER →</button>
      </div>
    </div>
  );
}

// ── Mobile A3 — Ready (vidéo + card centrée)
function MOnbA_Ready({ src }) {
  return (
    <div style={{
      width: "100%", height: "100%", position: "relative", overflow: "hidden",
      background: "#000", fontFamily: "'IBM Plex Sans', sans-serif",
    }}>
      <MVideoBg src={src} blur={10} dark />

      {/* Header */}
      <div style={{
        position: "absolute", top: 12, left: 24, right: 24, zIndex: 10,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        color: "rgba(255,255,255,0.55)",
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 8, letterSpacing: "0.15em",
      }}>
        <span>METAGORA <span style={{ opacity: 0.5 }}>/ FR-01</span></span>
        <span>SCÈNE 01 · ACCUEIL</span>
      </div>

      <div style={{
        position: "absolute", inset: 0, display: "grid", placeItems: "center",
        padding: 24, zIndex: 5,
      }}>
        <div style={{
          width: "100%", maxWidth: 480,
          background: "rgba(250, 248, 244, 0.96)",
          backdropFilter: "blur(20px)",
          border: `1px solid rgba(255,255,255,0.4)`,
          borderRadius: 6, padding: "20px 28px",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
          boxShadow: "0 16px 40px -8px rgba(0,0,0,0.4)",
          textAlign: "center",
        }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 8,
            color: M_ONB.accent, letterSpacing: "0.25em",
          }}>◆ AVANT D'ENTRER</div>
          <h2 style={{
            margin: 0, fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic", fontWeight: 400,
            fontSize: 24, lineHeight: 1.15, color: M_ONB.ink, letterSpacing: "-0.01em",
            textWrap: "balance",
          }}>
            Êtes-vous prêt·e à<br />rencontrer la cliente ?
          </h2>
          <p style={{
            margin: 0, fontSize: 10, lineHeight: 1.5,
            color: M_ONB.inkSoft, maxWidth: 320,
          }}>
            La conversation se joue en temps réel. Prenez votre temps.
          </p>
          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            <button style={{
              padding: "9px 16px", background: "transparent",
              border: `1px solid ${M_ONB.hair}`, color: M_ONB.inkSoft,
              fontFamily: "inherit", fontSize: 10, fontWeight: 500,
              cursor: "pointer", borderRadius: 2,
            }}>Pas maintenant</button>
            <button style={{
              padding: "9px 18px", background: M_ONB.ink, color: "#fff",
              border: "none", fontFamily: "inherit", fontSize: 10, fontWeight: 500,
              cursor: "pointer", borderRadius: 2, letterSpacing: "0.05em",
            }}>Je suis prêt·e →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Mobile Tips C4 v3 — Editorial minimal, side panel droite
function MTipsC_v3({ src }) {
  return (
    <div style={{
      width: "100%", height: "100%", position: "relative", overflow: "hidden",
      background: "#000", display: "flex",
      fontFamily: "'IBM Plex Sans', sans-serif",
    }}>
      {/* Left — video */}
      <div style={{ flex: 1, position: "relative", minWidth: 0 }}>
        <MVideoBg src={src} dark />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, transparent 30%, rgba(0,0,0,0.55))",
        }} />
        <div style={{
          position: "absolute", top: 12, left: 16,
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 8,
          color: "rgba(255,255,255,0.55)", letterSpacing: "0.15em",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{ width: 6, height: 6, border: `1.5px solid ${M_ONB.accent}`, transform: "rotate(45deg)" }} />
          EN PAUSE
        </div>
        <div style={{
          position: "absolute", bottom: 14, left: 16,
          fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
          fontSize: 11, color: "rgba(255,255,255,0.7)",
          textShadow: "0 2px 12px rgba(0,0,0,0.6)",
          maxWidth: 220,
        }}>
          « La cliente attend votre prochaine question. »
        </div>
      </div>

      {/* Right — panel */}
      <div style={{
        flex: "0 0 360px", background: M_ONB.card,
        padding: "20px 24px", display: "flex", flexDirection: "column",
        justifyContent: "space-between",
      }}>
        <div>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 8,
            letterSpacing: "0.3em", color: M_ONB.accent, marginBottom: 12,
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <span>—</span>
            <span>CONSEIL · 02 / 05</span>
          </div>

          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 7,
            color: M_ONB.inkDim, letterSpacing: "0.25em", marginBottom: 4,
          }}>VOUS AVIEZ DIT</div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
            fontSize: 11, lineHeight: 1.45, color: M_ONB.inkSoft,
            marginBottom: 14, paddingLeft: 10, borderLeft: `1px solid ${M_ONB.hair}`,
          }}>
            Souhaitez-vous découvrir nos meilleures ventes&nbsp;?
          </div>

          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 7,
            color: M_ONB.accent, letterSpacing: "0.25em", marginBottom: 6,
          }}>◆ LE BON RÉFLEXE</div>
          <p style={{
            margin: 0,
            fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
            fontSize: 18, lineHeight: 1.18, color: M_ONB.ink, fontWeight: 400,
            letterSpacing: "-0.01em",
          }}>
            Partir de son <span style={{
              backgroundImage: `linear-gradient(180deg, transparent 65%, ${M_ONB.accent}30 65%)`,
            }}>envie du moment</span> avant les meilleures ventes.
          </p>
        </div>

        <div style={{
          display: "flex", flexDirection: "column",
          borderTop: `1px solid ${M_ONB.hair}`, marginTop: 10,
        }}>
          <button style={{
            padding: "10px 4px", background: "transparent", border: "none",
            borderBottom: `1px solid ${M_ONB.hair}`,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            fontFamily: "inherit", fontSize: 11, cursor: "pointer",
            color: M_ONB.ink, textAlign: "left",
          }}>
            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{
                width: 20, height: 20, borderRadius: "50%",
                background: M_ONB.ink, color: "#fff",
                display: "grid", placeItems: "center", fontSize: 9,
              }}>↻</span>
              Réessayer
            </span>
            <span style={{ color: M_ONB.inkDim }}>→</span>
          </button>
          <button style={{
            padding: "10px 4px", background: "transparent", border: "none",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            fontFamily: "inherit", fontSize: 11, cursor: "pointer",
            color: M_ONB.inkSoft, textAlign: "left",
          }}>
            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{
                width: 20, height: 20, borderRadius: "50%",
                border: `1px solid ${M_ONB.hair}`, color: M_ONB.inkSoft,
                display: "grid", placeItems: "center", fontSize: 9,
                fontFamily: "'IBM Plex Mono', monospace",
              }}>◆</span>
              Voir la bonne réponse
            </span>
            <span style={{ color: M_ONB.inkDim }}>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

window.MOnbA_Welcome = MOnbA_Welcome;
window.MOnbC_VoiceOffFull = MOnbC_VoiceOffFull;
window.MOnbA_Ready = MOnbA_Ready;
window.MTipsC_v3 = MTipsC_v3;
