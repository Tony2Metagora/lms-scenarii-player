// Onboarding — 3 variations × 3 écrans (welcome, voice-off, ready) + popup tips
// Tout en 1440x900 paysage, palette Quiet Material cohérente avec le dialogue final

const ONB = {
  bg: "#F2F0EC",
  card: "#FAF8F4",
  ink: "#1A1A1A",
  inkSoft: "#5C5A55",
  inkDim: "#9E9B94",
  hair: "#DCD7CC",
  accent: "#B7553B",
  green: "#3F5E3A",
};

const PRENOMS = ["Camille", "Inès", "Léa", "Marc", "Sofia", "Thomas", "Zina"];

// ════════════════════════════════════════════════════════════════
// SHARED — Vidéo de fond + voix off cue scroller
// ════════════════════════════════════════════════════════════════

function VideoBg({ src, blur, dark }) {
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

function VoiceOffWaveform({ playing }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3, height: 24 }}>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <div key={i} style={{
          width: 2, background: ONB.accent, borderRadius: 2,
          height: 8 + Math.abs(Math.sin(i * 0.7)) * 14,
          animation: playing ? `vobar 1.2s ${i * 0.1}s ease-in-out infinite` : "none",
        }} />
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// VARIATION A — EDITORIAL QUIET (cohérent direct avec le dialogue)
// ════════════════════════════════════════════════════════════════

function OnbA_Welcome() {
  const [name, setName] = React.useState("Zina");
  return (
    <div style={{
      width: "100%", height: "100%", background: ONB.bg, color: ONB.ink,
      fontFamily: "'IBM Plex Sans', sans-serif", position: "relative", overflow: "hidden",
      display: "grid", placeItems: "center", padding: 60, boxSizing: "border-box",
    }}>
      {/* Header */}
      <div style={{
        position: "absolute", top: 28, left: 40, right: 40,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
        color: ONB.inkSoft, letterSpacing: "0.1em",
      }}>
        <span>METAGORA <span style={{ color: ONB.inkDim }}>/ Hermès Parfum FR-01</span></span>
        <span>SCÈNE 01 · ACCUEIL</span>
      </div>

      <div style={{
        maxWidth: 640, width: "100%",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 32,
      }}>
        {/* Logotype mark */}
        <div style={{
          display: "flex", alignItems: "center", gap: 14,
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
          letterSpacing: "0.25em", color: ONB.inkSoft,
        }}>
          <div style={{ width: 40, height: 1, background: ONB.accent }} />
          BIENVENUE
          <div style={{ width: 40, height: 1, background: ONB.accent }} />
        </div>

        <h1 style={{
          margin: 0, textAlign: "center",
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic", fontWeight: 400,
          fontSize: 56, lineHeight: 1.1, color: ONB.ink,
          letterSpacing: "-0.01em",
        }}>
          Vous entrez dans un<br />moment Hermès.
        </h1>
        <p style={{
          margin: 0, textAlign: "center", maxWidth: 460,
          fontSize: 15, lineHeight: 1.6, color: ONB.inkSoft,
        }}>
          Avant de rencontrer la cliente, dites-nous comment vous appeler — pour qu'elle puisse s'adresser à vous.
        </p>

        {/* Field — underline style instead of boxed */}
        <div style={{ width: "100%", maxWidth: 420, marginTop: 8 }}>
          <label style={{
            display: "block", fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 10, letterSpacing: "0.2em", color: ONB.accent, marginBottom: 12,
          }}>VOTRE PRÉNOM</label>
          <select value={name} onChange={(e) => setName(e.target.value)} style={{
            width: "100%", padding: "12px 0", border: "none",
            borderBottom: `1.5px solid ${ONB.ink}`, background: "transparent",
            fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
            fontSize: 28, color: ONB.ink, outline: "none", appearance: "none",
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path d='M1 1l5 5 5-5' stroke='%231A1A1A' stroke-width='1.5' fill='none'/></svg>")`,
            backgroundRepeat: "no-repeat", backgroundPosition: "right 4px center",
          }}>
            {PRENOMS.map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>

        <button style={{
          marginTop: 16, padding: "16px 48px",
          background: ONB.ink, color: "#fff", border: "none",
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 12, fontWeight: 500, letterSpacing: "0.2em",
          cursor: "pointer", borderRadius: 2,
        }}>COMMENCER →</button>
      </div>

      {/* Footer */}
      <div style={{
        position: "absolute", bottom: 28, left: 40, right: 40,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
        color: ONB.inkDim, letterSpacing: "0.15em",
      }}>
        <span>● ○ ○ ○</span>
        <span>≈ 8 MIN</span>
      </div>
    </div>
  );
}

function OnbA_VoiceOff({ src }) {
  const [text, setText] = React.useState(0);
  const cues = [
    "Vous travaillez chez Hermès Parfum.",
    "Une cliente s'apprête à entrer dans la boutique.",
    "Votre rôle : la mettre à l'aise, comprendre ses envies,",
    "et l'orienter vers la fragrance qui lui correspond.",
  ];
  React.useEffect(() => {
    const t = setInterval(() => setText((i) => (i + 1) % cues.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{
      width: "100%", height: "100%", position: "relative", overflow: "hidden",
      background: "#000", fontFamily: "'IBM Plex Sans', sans-serif",
    }}>
      <VideoBg src={src} blur={20} dark />

      {/* Header */}
      <div style={{
        position: "absolute", top: 28, left: 40, right: 40, zIndex: 10,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        color: "rgba(255,255,255,0.55)",
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: "0.1em",
      }}>
        <span>METAGORA <span style={{ opacity: 0.5 }}>/ Hermès Parfum FR-01</span></span>
        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: ONB.accent }}>● VOIX OFF</span>
          <VoiceOffWaveform playing />
        </span>
      </div>

      {/* Main subtitle, italic, centered */}
      <div style={{
        position: "absolute", inset: 0, display: "grid", placeItems: "center",
        padding: 60, zIndex: 5,
      }}>
        <div style={{
          maxWidth: 900, textAlign: "center", color: "#fff",
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic", fontWeight: 400,
          fontSize: 44, lineHeight: 1.3, letterSpacing: "-0.005em",
          textShadow: "0 2px 24px rgba(0,0,0,0.6)",
        }}>
          « {cues[text]} »
        </div>
      </div>

      {/* Footer cue indicator */}
      <div style={{
        position: "absolute", bottom: 32, left: 0, right: 0,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
        zIndex: 10,
      }}>
        <div style={{ display: "flex", gap: 6 }}>
          {cues.map((_, i) => (
            <div key={i} style={{
              width: i === text ? 24 : 6, height: 2,
              background: i <= text ? ONB.accent : "rgba(255,255,255,0.25)",
              transition: "all 0.3s",
            }} />
          ))}
        </div>
        <button style={{
          background: "transparent", border: `1px solid rgba(255,255,255,0.3)`,
          color: "rgba(255,255,255,0.7)", padding: "8px 18px", borderRadius: 999,
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
          letterSpacing: "0.18em", cursor: "pointer",
        }}>PASSER L'INTRO →</button>
      </div>
    </div>
  );
}

function OnbA_Ready({ src }) {
  return (
    <div style={{
      width: "100%", height: "100%", position: "relative", overflow: "hidden",
      background: "#000", fontFamily: "'IBM Plex Sans', sans-serif",
    }}>
      <VideoBg src={src} blur={12} dark />

      {/* Header */}
      <div style={{
        position: "absolute", top: 28, left: 40, right: 40, zIndex: 10,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        color: "rgba(255,255,255,0.55)",
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: "0.1em",
      }}>
        <span>METAGORA <span style={{ opacity: 0.5 }}>/ Hermès Parfum FR-01</span></span>
        <span>SCÈNE 01 · ACCUEIL</span>
      </div>

      {/* Center card */}
      <div style={{
        position: "absolute", inset: 0, display: "grid", placeItems: "center",
        padding: 60, zIndex: 5,
      }}>
        <div style={{
          width: "100%", maxWidth: 600,
          background: "rgba(250, 248, 244, 0.96)",
          backdropFilter: "blur(28px)",
          border: `1px solid rgba(255,255,255,0.4)`,
          borderRadius: 6, padding: 48,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 28,
          boxShadow: "0 24px 60px -12px rgba(0,0,0,0.4)",
          textAlign: "center",
        }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
            color: ONB.accent, letterSpacing: "0.25em",
          }}>◆ AVANT D'ENTRER</div>
          <h2 style={{
            margin: 0, fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic", fontWeight: 400,
            fontSize: 38, lineHeight: 1.2, color: ONB.ink, letterSpacing: "-0.01em",
            textWrap: "balance",
          }}>
            Êtes-vous prêt·e à<br />rencontrer la cliente ?
          </h2>
          <p style={{
            margin: 0, fontSize: 14, lineHeight: 1.6,
            color: ONB.inkSoft, maxWidth: 380,
          }}>
            La conversation se joue en temps réel. Prenez votre temps, écoutez bien — vous pouvez toujours réécouter.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <button style={{
              padding: "14px 28px", background: "transparent",
              border: `1px solid ${ONB.hair}`, color: ONB.inkSoft,
              fontFamily: "inherit", fontSize: 13, fontWeight: 500,
              cursor: "pointer", borderRadius: 2,
            }}>Pas maintenant</button>
            <button style={{
              padding: "14px 32px", background: ONB.ink, color: "#fff",
              border: "none", fontFamily: "inherit", fontSize: 13, fontWeight: 500,
              cursor: "pointer", borderRadius: 2, letterSpacing: "0.05em",
            }}>Je suis prêt·e →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// VARIATION B — CINÉMA IMMERSIF (texte sur la vidéo, pas de card)
// ════════════════════════════════════════════════════════════════

function OnbB_Welcome({ src }) {
  const [name, setName] = React.useState("Zina");
  return (
    <div style={{
      width: "100%", height: "100%", position: "relative", overflow: "hidden",
      background: "#000", fontFamily: "'IBM Plex Sans', sans-serif", color: "#fff",
    }}>
      <VideoBg src={src} blur={28} dark />
      {/* vignette */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)",
        zIndex: 2,
      }} />

      {/* Header */}
      <div style={{
        position: "absolute", top: 28, left: 40, right: 40, zIndex: 10,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        color: "rgba(255,255,255,0.5)",
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: "0.15em",
      }}>
        <span>METAGORA</span>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#E55", animation: "vobar 1.6s ease-in-out infinite" }} />
          REC · 00:00
        </span>
        <span>FR-01</span>
      </div>

      {/* Main */}
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 24, zIndex: 5, padding: 60,
      }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
          letterSpacing: "0.3em", color: "rgba(255,255,255,0.55)",
        }}>HERMÈS · PARFUM · DÉCOUVERTE</div>

        <h1 style={{
          margin: 0, textAlign: "center",
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic", fontWeight: 400,
          fontSize: 54, lineHeight: 1.08,
          textShadow: "0 4px 32px rgba(0,0,0,0.6)",
          letterSpacing: "-0.01em",
        }}>
          La cliente arrive<br />dans un instant.
        </h1>
        <p style={{
          margin: 0, textAlign: "center", maxWidth: 540,
          fontSize: 16, lineHeight: 1.6,
          color: "rgba(255,255,255,0.75)",
        }}>
          Comment doit-elle vous appeler ?
        </p>

        {/* Chips of names */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", maxWidth: 700,
          marginTop: 8,
        }}>
          {PRENOMS.map((p) => (
            <button key={p} onClick={() => setName(p)} style={{
              padding: "10px 18px",
              background: name === p ? "#fff" : "rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              border: `1px solid ${name === p ? "#fff" : "rgba(255,255,255,0.25)"}`,
              color: name === p ? ONB.ink : "rgba(255,255,255,0.85)",
              fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
              fontSize: 18, cursor: "pointer", borderRadius: 999,
              transition: "all 0.2s",
            }}>{p}</button>
          ))}
          <button style={{
            padding: "10px 18px", background: "transparent",
            border: `1px dashed rgba(255,255,255,0.35)`,
            color: "rgba(255,255,255,0.6)",
            fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12,
            cursor: "pointer", borderRadius: 999,
          }}>+ Autre</button>
        </div>

        <button style={{
          marginTop: 24, padding: "16px 56px",
          background: "rgba(255,255,255,0.95)", color: ONB.ink, border: "none",
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 12, fontWeight: 600, letterSpacing: "0.25em",
          cursor: "pointer", borderRadius: 999,
        }}>COMMENCER →</button>
      </div>
    </div>
  );
}

function OnbB_VoiceOff({ src }) {
  const [idx, setIdx] = React.useState(0);
  const cues = [
    "Vous travaillez chez Hermès Parfum.",
    "Une cliente s'apprête à entrer dans la boutique.",
    "Votre rôle : comprendre ses envies,",
    "et l'orienter avec justesse.",
  ];
  React.useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % cues.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{
      width: "100%", height: "100%", position: "relative", overflow: "hidden",
      background: "#000", color: "#fff",
    }}>
      <VideoBg src={src} dark />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.85))",
        zIndex: 2,
      }} />

      {/* HUD top */}
      <div style={{
        position: "absolute", top: 28, left: 40, right: 40, zIndex: 10,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
        color: "rgba(255,255,255,0.55)", letterSpacing: "0.15em",
      }}>
        <span>METAGORA · FR-01</span>
        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: ONB.accent }}>● NARRATION</span>
          <VoiceOffWaveform playing />
        </span>
      </div>

      {/* Subtitle bottom — like film opening */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 80px 100px",
        zIndex: 10,
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto", textAlign: "center",
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic", fontWeight: 400,
          fontSize: 38, lineHeight: 1.3,
          textShadow: "0 2px 24px rgba(0,0,0,0.7)",
        }}>
          {cues[idx]}
        </div>
        <div style={{
          marginTop: 32, display: "flex", justifyContent: "center", gap: 6,
        }}>
          {cues.map((_, i) => (
            <div key={i} style={{
              width: i === idx ? 32 : 6, height: 2,
              background: i <= idx ? ONB.accent : "rgba(255,255,255,0.25)",
              transition: "all 0.4s",
            }} />
          ))}
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: 28, right: 40, zIndex: 10,
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
        color: "rgba(255,255,255,0.5)", letterSpacing: "0.2em", cursor: "pointer",
      }}>PASSER →</div>
    </div>
  );
}

function OnbB_Ready({ src }) {
  return (
    <div style={{
      width: "100%", height: "100%", position: "relative", overflow: "hidden",
      background: "#000", color: "#fff",
    }}>
      <VideoBg src={src} blur={4} dark />
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.7) 100%)",
        zIndex: 2,
      }} />

      {/* Header */}
      <div style={{
        position: "absolute", top: 28, left: 40, right: 40, zIndex: 10,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
        color: "rgba(255,255,255,0.55)", letterSpacing: "0.15em",
      }}>
        <span>METAGORA · FR-01</span>
        <span>SCÈNE 01 / 04</span>
      </div>

      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 32, zIndex: 5, padding: 60,
      }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
          letterSpacing: "0.3em", color: ONB.accent,
        }}>◆ ELLE ENTRE DANS UN INSTANT</div>

        <h1 style={{
          margin: 0, textAlign: "center",
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic", fontWeight: 400,
          fontSize: 64, lineHeight: 1.1,
          textShadow: "0 4px 32px rgba(0,0,0,0.6)", letterSpacing: "-0.01em",
        }}>
          Êtes-vous prêt·e ?
        </h1>

        <div style={{
          display: "flex", gap: 16, marginTop: 16,
        }}>
          <button style={{
            padding: "16px 32px", background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
            border: `1px solid rgba(255,255,255,0.3)`, color: "#fff",
            fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13,
            cursor: "pointer", borderRadius: 999,
          }}>Pas maintenant</button>
          <button style={{
            padding: "16px 40px", background: "#fff", color: ONB.ink, border: "none",
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 13, fontWeight: 600, letterSpacing: "0.15em",
            cursor: "pointer", borderRadius: 999,
          }}>OUI, JE SUIS PRÊT·E →</button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// VARIATION C — SPLIT ÉDITORIAL (script à gauche, action à droite)
// ════════════════════════════════════════════════════════════════

function OnbC_Welcome() {
  const [name, setName] = React.useState("Zina");
  return (
    <div style={{
      width: "100%", height: "100%", background: ONB.bg, color: ONB.ink,
      fontFamily: "'IBM Plex Sans', sans-serif", display: "flex",
      overflow: "hidden",
    }}>
      {/* Left — script panel */}
      <div style={{
        flex: 1, padding: "60px 60px",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        background: "#1A1A1A", color: "#fff",
        position: "relative", borderRight: `1px solid ${ONB.ink}`,
      }}>
        <div>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
            letterSpacing: "0.25em", color: ONB.accent, marginBottom: 32,
          }}>SCRIPT · CALL SHEET</div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20, fontFamily: "'IBM Plex Mono', monospace", fontSize: 12 }}>
            <Row label="MAISON" value="Hermès Parfum" />
            <Row label="LIEU" value="Boutique FR-01 · 24 Faubourg" />
            <Row label="RÔLE" value="Conseiller·ère de vente" />
            <Row label="OBJECTIF" value="Découvrir, recommander, conclure" />
            <Row label="DURÉE" value="≈ 8 minutes" />
          </div>
        </div>

        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic", fontSize: 24, lineHeight: 1.4,
          color: "rgba(255,255,255,0.7)", maxWidth: 380,
          borderLeft: `2px solid ${ONB.accent}`, paddingLeft: 18,
        }}>
          « L'écoute commence avant le premier mot. »
        </div>
      </div>

      {/* Right — input */}
      <div style={{
        flex: 1, padding: "60px 60px",
        display: "flex", flexDirection: "column", justifyContent: "center",
        position: "relative",
      }}>
        <div style={{
          position: "absolute", top: 28, right: 40,
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
          color: ONB.inkSoft, letterSpacing: "0.15em",
        }}>SCÈNE 01 / 04</div>

        <div style={{ maxWidth: 460 }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
            color: ONB.accent, letterSpacing: "0.25em", marginBottom: 14,
          }}>◆ AVANT DE COMMENCER</div>

          <h1 style={{
            margin: 0, marginBottom: 16,
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic", fontWeight: 400,
            fontSize: 48, lineHeight: 1.1, color: ONB.ink, letterSpacing: "-0.01em",
          }}>
            Comment vous appelez-vous ?
          </h1>
          <p style={{
            margin: 0, marginBottom: 40, fontSize: 14, lineHeight: 1.6,
            color: ONB.inkSoft, maxWidth: 380,
          }}>
            Votre prénom permettra à la cliente de s'adresser à vous personnellement pendant la simulation.
          </p>

          <label style={{
            display: "block", fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 10, letterSpacing: "0.2em", color: ONB.inkSoft, marginBottom: 12,
          }}>VOTRE PRÉNOM</label>
          <select value={name} onChange={(e) => setName(e.target.value)} style={{
            width: "100%", padding: "14px 16px",
            border: `1px solid ${ONB.ink}`,
            background: ONB.card,
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 16, color: ONB.ink, outline: "none", borderRadius: 2,
            marginBottom: 28,
          }}>
            {PRENOMS.map((p) => <option key={p}>{p}</option>)}
          </select>

          <button style={{
            width: "100%", padding: "16px 0",
            background: ONB.ink, color: "#fff", border: "none",
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 13, fontWeight: 500, letterSpacing: "0.2em",
            cursor: "pointer", borderRadius: 2,
          }}>COMMENCER LA SIMULATION →</button>

          <div style={{
            marginTop: 18, fontSize: 11, color: ONB.inkDim, textAlign: "center",
          }}>Vous pourrez revenir à cet écran à tout moment.</div>
        </div>
      </div>
    </div>
  );
}
function Row({ label, value }) {
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "baseline" }}>
      <span style={{ minWidth: 90, color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em" }}>{label}</span>
      <span style={{ color: "#fff", fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 14, fontWeight: 500 }}>{value}</span>
    </div>
  );
}

// C2 v2 — FULLSCREEN, pas de vidéo, texte qui se noircit au fil de la lecture
function OnbC_VoiceOffFull() {
  const cues = [
    "Vous travaillez chez Hermès Parfum.",
    "Une cliente s'apprête à entrer dans la boutique.",
    "Votre rôle : la mettre à l'aise,",
    "comprendre ses envies, l'orienter avec justesse.",
    "Écoutez bien — chaque mot compte.",
  ];
  // word-level reveal
  const words = React.useMemo(() => {
    const arr = [];
    cues.forEach((line, li) => {
      line.split(" ").forEach((w, wi) => arr.push({ w, li, last: false }));
      arr[arr.length - 1].breakAfter = true;
    });
    return arr;
  }, []);
  const [read, setRead] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => {
      setRead((i) => (i + 1) % (words.length + 8));
    }, 320);
    return () => clearInterval(t);
  }, [words.length]);
  const elapsed = Math.min(read, words.length);
  const total = words.length;
  const pct = elapsed / total;

  return (
    <div style={{
      width: "100%", height: "100%", background: ONB.bg, color: ONB.ink,
      fontFamily: "'IBM Plex Sans', sans-serif", position: "relative", overflow: "hidden",
      padding: "60px 80px", boxSizing: "border-box",
      display: "flex", flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
        color: ONB.inkSoft, letterSpacing: "0.15em",
      }}>
        <span>METAGORA <span style={{ color: ONB.inkDim }}>/ Hermès Parfum FR-01</span></span>
        <span>SCÈNE 01 · NARRATION</span>
      </div>

      {/* Waveform + status block */}
      <div style={{
        marginTop: 56, display: "flex", alignItems: "center", gap: 24,
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 4, height: 56,
        }}>
          {Array.from({ length: 40 }).map((_, i) => {
            const phase = (i / 40);
            const active = phase < pct;
            return (
              <div key={i} style={{
                width: 3,
                background: active ? ONB.accent : ONB.hair,
                borderRadius: 2,
                height: 14 + Math.abs(Math.sin(i * 0.45 + read * 0.3)) * (active ? 38 : 18),
                transition: "background 0.3s, height 0.2s",
              }} />
            );
          })}
        </div>
        <div style={{
          display: "flex", flexDirection: "column", gap: 4,
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
          letterSpacing: "0.2em", color: ONB.inkSoft,
        }}>
          <span style={{ color: ONB.accent }}>● VOIX OFF · NARRATION</span>
          <span>{String(Math.floor(pct * 32)).padStart(2, "0")} / 32 SEC</span>
        </div>
      </div>

      {/* Big read-along text */}
      <div style={{
        flex: 1, display: "flex", alignItems: "center",
        marginTop: 40, marginBottom: 40,
      }}>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
          fontWeight: 400, fontSize: 56, lineHeight: 1.25, fontFeatureSettings: "'liga'",
          letterSpacing: "-0.005em", textWrap: "balance",
          maxWidth: 1180,
        }}>
          {words.map((wd, i) => (
            <React.Fragment key={i}>
              <span style={{
                color: i < elapsed ? ONB.ink : ONB.inkDim,
                opacity: i < elapsed ? 1 : 0.35,
                transition: "color 0.3s, opacity 0.3s",
              }}>
                {wd.w}
              </span>
              {wd.breakAfter ? <br /> : " "}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Footer — progress + skip */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        paddingTop: 20, borderTop: `1px solid ${ONB.hair}`,
      }}>
        <div style={{
          flex: 1, marginRight: 32, height: 2, background: ONB.hair,
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0, width: `${pct * 100}%`,
            background: ONB.accent, transition: "width 0.2s",
          }} />
        </div>
        <button style={{
          background: "transparent", border: `1px solid ${ONB.hair}`,
          padding: "10px 18px", color: ONB.inkSoft,
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
          letterSpacing: "0.2em", cursor: "pointer", borderRadius: 2,
        }}>PASSER L'INTRO →</button>
      </div>
    </div>
  );
}

function OnbC_VoiceOff({ src }) {
  const [idx, setIdx] = React.useState(0);
  const cues = [
    "Vous travaillez chez Hermès Parfum.",
    "Une cliente s'apprête à entrer dans la boutique.",
    "Votre rôle : la mettre à l'aise et comprendre ses envies.",
    "Écoutez bien — chaque mot compte.",
  ];
  React.useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % cues.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{
      width: "100%", height: "100%", display: "flex", overflow: "hidden",
      fontFamily: "'IBM Plex Sans', sans-serif",
    }}>
      {/* Left — video preview */}
      <div style={{
        flex: 1, position: "relative", background: "#000",
      }}>
        <VideoBg src={src} dark />
        {/* corner mark */}
        <div style={{
          position: "absolute", top: 28, left: 40,
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
          color: "rgba(255,255,255,0.55)", letterSpacing: "0.15em",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <span style={{ color: ONB.accent }}>● PREVIEW</span>
          La cliente · Boutique FR-01
        </div>
      </div>

      {/* Right — narration script */}
      <div style={{
        flex: "0 0 560px", background: ONB.bg, color: ONB.ink,
        padding: "60px 50px", display: "flex", flexDirection: "column",
        position: "relative",
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: 48,
        }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
            color: ONB.accent, letterSpacing: "0.25em",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <VoiceOffWaveform playing />
            VOIX OFF
          </div>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
            color: ONB.inkSoft, letterSpacing: "0.15em",
          }}>00:{String(8 + idx * 6).padStart(2, "0")} / 00:32</div>
        </div>

        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic", fontWeight: 400,
            fontSize: 32, lineHeight: 1.3, color: ONB.ink,
            letterSpacing: "-0.005em",
          }}>
            {cues.map((c, i) => (
              <div key={i} style={{
                opacity: i === idx ? 1 : i < idx ? 0.25 : 0.12,
                transition: "opacity 0.4s",
                marginBottom: 14,
                color: i === idx ? ONB.ink : ONB.inkSoft,
              }}>
                {i === idx && <span style={{ color: ONB.accent, marginRight: 8 }}>—</span>}
                {c}
              </div>
            ))}
          </div>
        </div>

        {/* progress + skip */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          paddingTop: 24, borderTop: `1px solid ${ONB.hair}`,
        }}>
          <div style={{ display: "flex", gap: 6 }}>
            {cues.map((_, i) => (
              <div key={i} style={{
                width: i === idx ? 28 : 6, height: 2,
                background: i <= idx ? ONB.accent : ONB.hair,
                transition: "all 0.3s",
              }} />
            ))}
          </div>
          <button style={{
            background: "transparent", border: "none",
            color: ONB.inkSoft, fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 10, letterSpacing: "0.2em", cursor: "pointer",
          }}>PASSER →</button>
        </div>
      </div>
    </div>
  );
}

function OnbC_Ready({ src }) {
  return (
    <div style={{
      width: "100%", height: "100%", display: "flex", overflow: "hidden",
      fontFamily: "'IBM Plex Sans', sans-serif",
    }}>
      <div style={{ flex: 1, position: "relative", background: "#000" }}>
        <VideoBg src={src} dark />
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)",
        }} />
        <div style={{
          position: "absolute", bottom: 40, left: 40,
          fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
          fontSize: 22, color: "rgba(255,255,255,0.85)",
          textShadow: "0 2px 12px rgba(0,0,0,0.6)",
          maxWidth: 380,
        }}>
          « La cliente est devant la porte. »
        </div>
      </div>

      <div style={{
        flex: "0 0 560px", background: ONB.bg, color: ONB.ink,
        padding: "60px 50px", display: "flex", flexDirection: "column",
        justifyContent: "center", position: "relative",
      }}>
        <div style={{
          position: "absolute", top: 28, right: 50,
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
          color: ONB.inkSoft, letterSpacing: "0.15em",
        }}>SCÈNE 01 / 04</div>

        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
          color: ONB.accent, letterSpacing: "0.25em", marginBottom: 18,
        }}>◆ DERNIÈRE QUESTION</div>

        <h1 style={{
          margin: 0, marginBottom: 14,
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic", fontWeight: 400,
          fontSize: 44, lineHeight: 1.1, color: ONB.ink, letterSpacing: "-0.01em",
        }}>
          Prêt·e à<br />la rencontrer ?
        </h1>
        <p style={{
          margin: 0, marginBottom: 32, fontSize: 14, lineHeight: 1.6,
          color: ONB.inkSoft, maxWidth: 380,
        }}>
          La conversation se joue en temps réel. Vous pourrez réécouter chaque réplique si besoin.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 380 }}>
          <button style={{
            padding: "16px 24px", background: ONB.ink, color: "#fff", border: "none",
            fontFamily: "inherit", fontSize: 13, fontWeight: 500, letterSpacing: "0.15em",
            cursor: "pointer", borderRadius: 2, textAlign: "left",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span>OUI, JE SUIS PRÊT·E</span>
            <span style={{ color: ONB.accent }}>→</span>
          </button>
          <button style={{
            padding: "16px 24px", background: "transparent",
            border: `1px solid ${ONB.hair}`, color: ONB.inkSoft,
            fontFamily: "inherit", fontSize: 13, cursor: "pointer", borderRadius: 2,
            textAlign: "left",
          }}>Pas maintenant</button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// POPUP TIPS DE VENTE (mauvaise réponse) — 3 variations
// ════════════════════════════════════════════════════════════════

function TipsOverlay({ src, children }) {
  return (
    <div style={{
      width: "100%", height: "100%", position: "relative", overflow: "hidden",
      background: "#000", fontFamily: "'IBM Plex Sans', sans-serif",
    }}>
      <VideoBg src={src} blur={8} dark />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 2 }} />
      <div style={{
        position: "absolute", inset: 0, display: "grid", placeItems: "center",
        zIndex: 10, padding: 60,
      }}>
        {children}
      </div>
    </div>
  );
}

// Add "Voir la bonne réponse" footer button
function TipsA({ src }) {
  return (
    <TipsOverlay src={src}>
      <div style={{
        width: "100%", maxWidth: 680,
        background: ONB.card,
        border: `1px solid ${ONB.hair}`, borderRadius: 6,
        padding: "44px 48px",
        boxShadow: "0 24px 60px -12px rgba(0,0,0,0.45)",
        position: "relative",
      }}>
        <div style={{
          position: "absolute", top: -12, left: 32,
          padding: "6px 14px", background: ONB.accent, color: "#fff",
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
          letterSpacing: "0.25em",
        }}>CONSEIL · 02 / 05</div>

        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
          color: ONB.inkSoft, letterSpacing: "0.2em", marginBottom: 14,
        }}>VOUS AVIEZ CHOISI</div>

        <div style={{
          fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
          fontSize: 22, lineHeight: 1.45, color: ONB.ink,
          paddingLeft: 18, borderLeft: `2px solid ${ONB.accent}`,
          marginBottom: 28,
        }}>
          « Souhaitez-vous découvrir aujourd'hui quels parfums comptent parmi nos meilleures ventes ? »
        </div>

        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
          color: ONB.accent, letterSpacing: "0.2em", marginBottom: 8,
        }}>◆ LE BON RÉFLEXE</div>
        <p style={{
          margin: 0, marginBottom: 32, fontSize: 16, lineHeight: 1.55, color: ONB.ink,
          textWrap: "pretty",
        }}>
          On gagne souvent à <strong style={{ color: ONB.accent, fontWeight: 600 }}>partir de son envie du moment</strong> et de ses sensations avant d'évoquer les meilleures ventes.
        </p>

        <div style={{
          display: "flex", justifyContent: "flex-end", alignItems: "center",
          paddingTop: 20, borderTop: `1px solid ${ONB.hair}`,
        }}>
          <button style={{
            background: ONB.ink, color: "#fff", border: "none",
            padding: "12px 24px", fontSize: 12, fontWeight: 500,
            letterSpacing: "0.15em",
            cursor: "pointer", borderRadius: 2, fontFamily: "inherit",
          }}>RÉESSAYER ↻</button>
        </div>
      </div>
    </TipsOverlay>
  );
}
// (kept but excluded from canvas)
function TipsA_unused({ src }) {
  return (
    <TipsOverlay src={src}>
      <div style={{
        width: "100%", maxWidth: 680,
        background: ONB.card,
        border: `1px solid ${ONB.hair}`, borderRadius: 6,
        padding: "44px 48px",
        boxShadow: "0 24px 60px -12px rgba(0,0,0,0.45)",
        position: "relative",
      }}>
        {/* corner ribbon */}
        <div style={{
          position: "absolute", top: -12, left: 32,
          padding: "6px 14px", background: ONB.accent, color: "#fff",
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
          letterSpacing: "0.25em",
        }}>CONSEIL · 02 / 05</div>

        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
          color: ONB.inkSoft, letterSpacing: "0.2em", marginBottom: 14,
        }}>VOUS AVIEZ CHOISI</div>

        <div style={{
          fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
          fontSize: 22, lineHeight: 1.45, color: ONB.ink,
          paddingLeft: 18, borderLeft: `2px solid ${ONB.accent}`,
          marginBottom: 28,
        }}>
          « Souhaitez-vous découvrir aujourd'hui quels parfums comptent parmi nos meilleures ventes ? »
        </div>

        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
          color: ONB.accent, letterSpacing: "0.2em", marginBottom: 8,
        }}>◆ LE BON RÉFLEXE</div>
        <p style={{
          margin: 0, marginBottom: 32, fontSize: 16, lineHeight: 1.55, color: ONB.ink,
          textWrap: "pretty",
        }}>
          On gagne souvent à <strong style={{ color: ONB.accent, fontWeight: 600 }}>partir de son envie du moment</strong> et de ses sensations avant d'évoquer les meilleures ventes.
        </p>

        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          paddingTop: 20, borderTop: `1px solid ${ONB.hair}`,
        }}>
          <button style={{
            background: "transparent", border: "none", cursor: "pointer",
            color: ONB.inkSoft, fontSize: 13, fontFamily: "inherit",
          }}>Voir la bonne réponse</button>
          <button style={{
            background: ONB.ink, color: "#fff", border: "none",
            padding: "12px 24px", fontSize: 12, fontWeight: 500,
            letterSpacing: "0.15em",
            cursor: "pointer", borderRadius: 2, fontFamily: "inherit",
          }}>RÉESSAYER ↻</button>
        </div>
      </div>
    </TipsOverlay>
  );
}

// Tips B — Cinéma : lower-third style, pas de card centrée
function TipsB({ src }) {
  return (
    <div style={{
      width: "100%", height: "100%", position: "relative", overflow: "hidden",
      background: "#000", fontFamily: "'IBM Plex Sans', sans-serif",
    }}>
      <VideoBg src={src} dark />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.5) 100%)",
        zIndex: 2,
      }} />

      {/* Top — pause indicator */}
      <div style={{
        position: "absolute", top: 28, left: 40, right: 40, zIndex: 10,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        color: "rgba(255,255,255,0.65)",
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: "0.15em",
      }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 10, height: 10, border: `1.5px solid ${ONB.accent}`, transform: "rotate(45deg)" }} />
          PAUSE · CONSEIL · 02 / 05
        </span>
        <span>Q. 02/04</span>
      </div>

      {/* Lower third */}
      <div style={{
        position: "absolute", bottom: 60, left: 60, right: 60, zIndex: 10,
        color: "#fff",
      }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
          color: ONB.accent, letterSpacing: "0.3em", marginBottom: 18,
        }}>◆ LE BON RÉFLEXE</div>

        <h2 style={{
          margin: 0, marginBottom: 24,
          fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
          fontSize: 48, lineHeight: 1.15, fontWeight: 400, letterSpacing: "-0.01em",
          maxWidth: 1100, textShadow: "0 4px 24px rgba(0,0,0,0.6)",
        }}>
          On gagne souvent à partir de son envie du moment<br />avant d'évoquer les meilleures ventes.
        </h2>

        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          gap: 40,
        }}>
          <div style={{
            flex: 1, fontSize: 14, lineHeight: 1.55,
            color: "rgba(255,255,255,0.7)", maxWidth: 540,
            paddingLeft: 18, borderLeft: `2px solid rgba(255,255,255,0.25)`,
          }}>
            Vous aviez choisi : « Souhaitez-vous découvrir nos meilleures ventes ? »
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
              color: "rgba(255,255,255,0.5)", letterSpacing: "0.15em",
            }}>02 / 05</span>
            <button style={{
              padding: "14px 28px", background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)", border: `1px solid rgba(255,255,255,0.3)`,
              color: "#fff", fontFamily: "inherit", fontSize: 12,
              cursor: "pointer", borderRadius: 999, letterSpacing: "0.1em",
            }}>VOIR LA RÉPONSE</button>
            <button style={{
              padding: "14px 32px", background: "#fff", color: ONB.ink,
              border: "none", fontFamily: "inherit", fontSize: 12, fontWeight: 600,
              letterSpacing: "0.15em", cursor: "pointer", borderRadius: 999,
            }}>RÉESSAYER ↻</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// C4 VARIANTS — Side panel éditorial. Verbatim + bon réflexe (sans champ inventé)
// ════════════════════════════════════════════════════════════════

// C4-v1 — Side panel original, nettoyé : verbatim + tip + actions
function TipsC_v1({ src }) {
  return (
    <div style={{
      width: "100%", height: "100%", position: "relative", overflow: "hidden",
      background: "#000", display: "flex",
      fontFamily: "'IBM Plex Sans', sans-serif",
    }}>
      <div style={{ flex: 1, position: "relative" }}>
        <VideoBg src={src} dark />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, transparent, rgba(0,0,0,0.5))",
        }} />
        <div style={{
          position: "absolute", top: 28, left: 40,
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
          color: "rgba(255,255,255,0.55)", letterSpacing: "0.15em",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <span style={{ width: 8, height: 8, border: `1.5px solid ${ONB.accent}`, transform: "rotate(45deg)" }} />
          PAUSE
        </div>
      </div>

      <div style={{
        flex: "0 0 540px", background: ONB.card,
        padding: "60px 50px", display: "flex", flexDirection: "column",
        position: "relative", borderLeft: `1px solid ${ONB.hair}`,
        boxShadow: "-24px 0 60px -12px rgba(0,0,0,0.4)",
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: 36,
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
            color: ONB.accent, letterSpacing: "0.25em",
          }}>
            <div style={{ width: 24, height: 1.5, background: ONB.accent }} />
            CONSEIL
          </div>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
            color: ONB.inkSoft, letterSpacing: "0.15em",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <span>02</span>
            <div style={{ width: 80, height: 3, background: ONB.hair, borderRadius: 2, overflow: "hidden" }}>
              <div style={{ width: "40%", height: "100%", background: ONB.accent }} />
            </div>
            <span>05</span>
          </div>
        </div>

        <div style={{
          padding: "18px 20px", background: ONB.bg, borderLeft: `2px solid ${ONB.inkDim}`,
          marginBottom: 28, borderRadius: 2,
        }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 9,
            color: ONB.inkDim, letterSpacing: "0.2em", marginBottom: 8,
          }}>VOTRE RÉPONSE</div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
            fontSize: 16, lineHeight: 1.45, color: ONB.inkSoft,
          }}>
            « Souhaitez-vous découvrir nos meilleures ventes ? »
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
            color: ONB.accent, letterSpacing: "0.25em", marginBottom: 14,
          }}>◆ LE BON RÉFLEXE</div>
          <p style={{
            margin: 0,
            fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
            fontSize: 26, lineHeight: 1.3, color: ONB.ink, fontWeight: 400,
            letterSpacing: "-0.005em",
          }}>
            On gagne souvent à partir de son envie du moment et de ses sensations.
          </p>
          <p style={{
            margin: 0, marginTop: 20, fontSize: 14, lineHeight: 1.6, color: ONB.inkSoft,
          }}>
            Les meilleures ventes viennent <em>après</em>, une fois qu'on a cerné le territoire olfactif de la cliente.
          </p>
        </div>

        <div style={{
          paddingTop: 24, borderTop: `1px solid ${ONB.hair}`,
          display: "flex", flexDirection: "column", gap: 8,
        }}>
          <button style={{
            padding: "14px 20px", background: ONB.ink, color: "#fff", border: "none",
            fontFamily: "inherit", fontSize: 12, fontWeight: 500, letterSpacing: "0.15em",
            cursor: "pointer", borderRadius: 2, textAlign: "left",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span>RÉESSAYER</span>
            <span style={{ color: ONB.accent }}>↻</span>
          </button>
          <button style={{
            padding: "14px 20px", background: "transparent",
            border: `1px solid ${ONB.hair}`, color: ONB.inkSoft,
            fontFamily: "inherit", fontSize: 12, cursor: "pointer", borderRadius: 2,
            textAlign: "left",
          }}>Voir la bonne réponse</button>
        </div>
      </div>
    </div>
  );
}

// C4-v2 — Side panel inversé (panel à gauche), avec onglets visuels avant/après
function TipsC_v2({ src }) {
  return (
    <div style={{
      width: "100%", height: "100%", position: "relative", overflow: "hidden",
      background: "#000", display: "flex",
      fontFamily: "'IBM Plex Sans', sans-serif",
    }}>
      <div style={{
        flex: "0 0 580px", background: ONB.card,
        padding: "60px 56px", display: "flex", flexDirection: "column",
        position: "relative", borderRight: `1px solid ${ONB.hair}`,
      }}>
        {/* Header label */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: 44,
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 14,
            fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
            fontSize: 22, color: ONB.ink,
          }}>
            <span style={{
              width: 28, height: 28, borderRadius: "50%",
              border: `1.5px solid ${ONB.accent}`,
              display: "grid", placeItems: "center",
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
              fontStyle: "normal", color: ONB.accent,
            }}>i</span>
            Un instant —
          </div>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
            color: ONB.inkSoft, letterSpacing: "0.2em",
          }}>CONSEIL 02 / 05</div>
        </div>

        {/* Two stacked blocks: votre choix → bon réflexe, comme un avant/après */}
        <div style={{
          flex: 1, display: "flex", flexDirection: "column", gap: 0,
        }}>
          {/* Bloc votre choix */}
          <div style={{
            paddingBottom: 24, borderBottom: `1px dashed ${ONB.hair}`,
          }}>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
              color: ONB.inkSoft, letterSpacing: "0.2em", marginBottom: 10,
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <span style={{ width: 16, height: 1, background: ONB.inkSoft }} />
              VOTRE RÉPONSE
            </div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
              fontSize: 18, lineHeight: 1.45, color: ONB.inkSoft,
            }}>
              « Souhaitez-vous découvrir nos meilleures ventes ? »
            </div>
          </div>

          {/* Arrow connector */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "16px 0",
          }}>
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
              color: ONB.accent, letterSpacing: "0.25em",
            }}>↓ MIEUX ↓</span>
          </div>

          {/* Bloc bon réflexe */}
          <div style={{
            background: ONB.bg, padding: "28px 28px",
            borderLeft: `3px solid ${ONB.accent}`, borderRadius: 2,
          }}>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
              color: ONB.accent, letterSpacing: "0.25em", marginBottom: 12,
            }}>◆ LE BON RÉFLEXE</div>
            <p style={{
              margin: 0,
              fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
              fontSize: 24, lineHeight: 1.3, color: ONB.ink, fontWeight: 400,
            }}>
              Partir de son <span style={{ color: ONB.accent }}>envie du moment</span> et de ses sensations avant d'évoquer les meilleures ventes.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div style={{
          marginTop: 32, paddingTop: 24, borderTop: `1px solid ${ONB.hair}`,
          display: "flex", gap: 10, alignItems: "center",
        }}>
          <button style={{
            flex: 1, padding: "14px 20px", background: ONB.ink, color: "#fff", border: "none",
            fontFamily: "inherit", fontSize: 12, fontWeight: 500, letterSpacing: "0.15em",
            cursor: "pointer", borderRadius: 2,
          }}>RÉESSAYER ↻</button>
          <button style={{
            padding: "14px 20px", background: "transparent",
            border: `1px solid ${ONB.hair}`, color: ONB.inkSoft,
            fontFamily: "inherit", fontSize: 12, cursor: "pointer", borderRadius: 2,
            whiteSpace: "nowrap",
          }}>Voir la réponse</button>
        </div>
      </div>

      {/* Right — video preview */}
      <div style={{ flex: 1, position: "relative" }}>
        <VideoBg src={src} dark />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to left, transparent, rgba(0,0,0,0.4))",
        }} />
        <div style={{
          position: "absolute", top: 28, right: 40,
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
          color: "rgba(255,255,255,0.55)", letterSpacing: "0.15em",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <span style={{ width: 8, height: 8, border: `1.5px solid ${ONB.accent}`, transform: "rotate(45deg)" }} />
          PAUSE
        </div>
      </div>
    </div>
  );
}

// C4-v3 — Side panel minimaliste, full editorial : pas de bandeau, juste typographie
function TipsC_v3({ src }) {
  return (
    <div style={{
      width: "100%", height: "100%", position: "relative", overflow: "hidden",
      background: "#000", display: "flex",
      fontFamily: "'IBM Plex Sans', sans-serif",
    }}>
      <div style={{ flex: 1, position: "relative" }}>
        <VideoBg src={src} dark />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, transparent 40%, rgba(0,0,0,0.55))",
        }} />
        {/* Top label */}
        <div style={{
          position: "absolute", top: 28, left: 40,
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
          color: "rgba(255,255,255,0.55)", letterSpacing: "0.15em",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <span style={{ width: 8, height: 8, border: `1.5px solid ${ONB.accent}`, transform: "rotate(45deg)" }} />
          EN PAUSE
        </div>
        {/* Bottom whisper */}
        <div style={{
          position: "absolute", bottom: 40, left: 40,
          fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
          fontSize: 18, color: "rgba(255,255,255,0.7)",
          textShadow: "0 2px 12px rgba(0,0,0,0.6)",
          maxWidth: 340,
        }}>
          « La cliente attend votre prochaine question. »
        </div>
      </div>

      <div style={{
        flex: "0 0 560px", background: ONB.card,
        padding: "72px 60px", display: "flex", flexDirection: "column",
        position: "relative", justifyContent: "space-between",
      }}>
        {/* Top — chapter mark, no badge */}
        <div>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
            letterSpacing: "0.3em", color: ONB.accent, marginBottom: 28,
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <span>—</span>
            <span>CONSEIL · 02 / 05</span>
          </div>

          {/* Big quote, votre réponse */}
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 9,
            color: ONB.inkDim, letterSpacing: "0.25em", marginBottom: 8,
          }}>VOUS AVIEZ DIT</div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
            fontSize: 17, lineHeight: 1.5, color: ONB.inkSoft,
            marginBottom: 36, paddingLeft: 14, borderLeft: `1px solid ${ONB.hair}`,
          }}>
            Souhaitez-vous découvrir nos meilleures ventes&nbsp;?
          </div>

          {/* Big tip */}
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 9,
            color: ONB.accent, letterSpacing: "0.25em", marginBottom: 10,
          }}>◆ LE BON RÉFLEXE</div>
          <p style={{
            margin: 0,
            fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
            fontSize: 36, lineHeight: 1.18, color: ONB.ink, fontWeight: 400,
            letterSpacing: "-0.01em",
          }}>
            Partir de son <span style={{
              backgroundImage: `linear-gradient(180deg, transparent 65%, ${ONB.accent}30 65%)`,
            }}>envie du moment</span><br />avant les meilleures ventes.
          </p>
        </div>

        {/* Bottom — actions with icons */}
        <div style={{
          display: "flex", flexDirection: "column", gap: 0,
          borderTop: `1px solid ${ONB.hair}`,
        }}>
          <button style={{
            padding: "20px 4px", background: "transparent", border: "none",
            borderBottom: `1px solid ${ONB.hair}`,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            fontFamily: "inherit", fontSize: 14, cursor: "pointer",
            color: ONB.ink, textAlign: "left",
          }}>
            <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{
                width: 28, height: 28, borderRadius: "50%",
                background: ONB.ink, color: "#fff",
                display: "grid", placeItems: "center", fontSize: 12,
              }}>↻</span>
              Réessayer
            </span>
            <span style={{ color: ONB.inkDim }}>→</span>
          </button>
          <button style={{
            padding: "20px 4px", background: "transparent", border: "none",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            fontFamily: "inherit", fontSize: 14, cursor: "pointer",
            color: ONB.inkSoft, textAlign: "left",
          }}>
            <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{
                width: 28, height: 28, borderRadius: "50%",
                border: `1px solid ${ONB.hair}`, color: ONB.inkSoft,
                display: "grid", placeItems: "center", fontSize: 12,
                fontFamily: "'IBM Plex Mono', monospace",
              }}>◆</span>
              Voir la bonne réponse
            </span>
            <span style={{ color: ONB.inkDim }}>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// C4-v4 — Bottom sheet éditoriale, vidéo en grand au-dessus (style player + caption)
function TipsC_v4({ src }) {
  return (
    <div style={{
      width: "100%", height: "100%", position: "relative", overflow: "hidden",
      background: "#000", display: "flex", flexDirection: "column",
      fontFamily: "'IBM Plex Sans', sans-serif",
    }}>
      <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
        <VideoBg src={src} dark />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.6))",
        }} />
        <div style={{
          position: "absolute", top: 28, left: 40, right: 40,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
          color: "rgba(255,255,255,0.55)", letterSpacing: "0.15em",
        }}>
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 8, height: 8, border: `1.5px solid ${ONB.accent}`, transform: "rotate(45deg)" }} />
            PAUSE · CONSEIL 02 / 05
          </span>
          <span>HERMÈS PARFUM · FR-01</span>
        </div>
      </div>

      {/* Bottom sheet */}
      <div style={{
        background: ONB.card, borderTop: `1px solid ${ONB.hair}`,
        padding: "32px 60px 28px", display: "grid",
        gridTemplateColumns: "1fr 1.3fr auto", gap: 40, alignItems: "center",
      }}>
        {/* Verbatim votre réponse */}
        <div>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
            color: ONB.inkDim, letterSpacing: "0.2em", marginBottom: 8,
          }}>VOUS AVIEZ DIT</div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
            fontSize: 16, lineHeight: 1.45, color: ONB.inkSoft,
            paddingLeft: 14, borderLeft: `1px solid ${ONB.hair}`,
          }}>
            « Souhaitez-vous découvrir nos meilleures ventes ? »
          </div>
        </div>

        {/* Bon réflexe */}
        <div style={{ borderLeft: `1px solid ${ONB.hair}`, paddingLeft: 32 }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
            color: ONB.accent, letterSpacing: "0.25em", marginBottom: 8,
          }}>◆ LE BON RÉFLEXE</div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
            fontSize: 22, lineHeight: 1.3, color: ONB.ink, fontWeight: 400,
          }}>
            Partir de son <span style={{ color: ONB.accent }}>envie du moment</span> avant d'évoquer les meilleures ventes.
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 200 }}>
          <button style={{
            padding: "14px 24px", background: ONB.ink, color: "#fff", border: "none",
            fontFamily: "inherit", fontSize: 12, fontWeight: 500, letterSpacing: "0.15em",
            cursor: "pointer", borderRadius: 2, whiteSpace: "nowrap",
          }}>RÉESSAYER ↻</button>
          <button style={{
            padding: "10px 24px", background: "transparent", border: "none",
            color: ONB.inkSoft, fontFamily: "inherit", fontSize: 12,
            cursor: "pointer", textAlign: "center", textDecoration: "underline",
            textUnderlineOffset: 4, textDecorationColor: ONB.hair,
          }}>Voir la bonne réponse</button>
        </div>
      </div>
    </div>
  );
}

// kept as alias for backward compatibility (not used)
function TipsC({ src }) {
  return (
    <div style={{
      width: "100%", height: "100%", position: "relative", overflow: "hidden",
      background: "#000", display: "flex",
      fontFamily: "'IBM Plex Sans', sans-serif",
    }}>
      {/* Left — video kept visible */}
      <div style={{ flex: 1, position: "relative" }}>
        <VideoBg src={src} dark />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, transparent, rgba(0,0,0,0.5))",
        }} />
        <div style={{
          position: "absolute", top: 28, left: 40,
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
          color: "rgba(255,255,255,0.55)", letterSpacing: "0.15em",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <span style={{
            width: 8, height: 8, border: `1.5px solid ${ONB.accent}`, transform: "rotate(45deg)",
          }} />
          PAUSE
        </div>
      </div>

      {/* Right — tips panel */}
      <div style={{
        flex: "0 0 540px", background: ONB.card,
        padding: "60px 50px", display: "flex", flexDirection: "column",
        position: "relative", borderLeft: `1px solid ${ONB.hair}`,
        boxShadow: "-24px 0 60px -12px rgba(0,0,0,0.4)",
      }}>
        {/* Top */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: 36,
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
            color: ONB.accent, letterSpacing: "0.25em",
          }}>
            <div style={{ width: 24, height: 1.5, background: ONB.accent }} />
            CONSEIL
          </div>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
            color: ONB.inkSoft, letterSpacing: "0.15em",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <span>02</span>
            <div style={{
              width: 80, height: 3, background: ONB.hair, borderRadius: 2,
              position: "relative", overflow: "hidden",
            }}>
              <div style={{
                width: "40%", height: "100%", background: ONB.accent,
              }} />
            </div>
            <span>05</span>
          </div>
        </div>

        {/* Quote of wrong choice */}
        <div style={{
          padding: "18px 20px", background: ONB.bg, borderLeft: `2px solid ${ONB.inkDim}`,
          marginBottom: 32, borderRadius: 2,
        }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 9,
            color: ONB.inkDim, letterSpacing: "0.2em", marginBottom: 8,
          }}>VOTRE RÉPONSE</div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
            fontSize: 16, lineHeight: 1.45, color: ONB.inkSoft,
          }}>
            « Souhaitez-vous découvrir nos meilleures ventes ? »
          </div>
        </div>

        {/* Tip */}
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
            color: ONB.accent, letterSpacing: "0.25em", marginBottom: 14,
          }}>◆ LE BON RÉFLEXE</div>
          <p style={{
            margin: 0,
            fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
            fontSize: 26, lineHeight: 1.3, color: ONB.ink, fontWeight: 400,
            letterSpacing: "-0.005em",
          }}>
            On gagne souvent à partir de son envie du moment et de ses sensations.
          </p>
          <p style={{
            margin: 0, marginTop: 20, fontSize: 14, lineHeight: 1.6,
            color: ONB.inkSoft,
          }}>
            Les meilleures ventes viennent <em>après</em>, une fois qu'on a cerné le territoire olfactif de la cliente.
          </p>
        </div>

        {/* Actions */}
        <div style={{
          paddingTop: 24, borderTop: `1px solid ${ONB.hair}`,
          display: "flex", flexDirection: "column", gap: 8,
        }}>
          <button style={{
            padding: "14px 20px", background: ONB.ink, color: "#fff", border: "none",
            fontFamily: "inherit", fontSize: 12, fontWeight: 500, letterSpacing: "0.15em",
            cursor: "pointer", borderRadius: 2, textAlign: "left",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span>RÉESSAYER</span>
            <span style={{ color: ONB.accent }}>↻</span>
          </button>
          <button style={{
            padding: "14px 20px", background: "transparent",
            border: `1px solid ${ONB.hair}`, color: ONB.inkSoft,
            fontFamily: "inherit", fontSize: 12, cursor: "pointer", borderRadius: 2,
            textAlign: "left",
          }}>Voir la bonne réponse</button>
        </div>
      </div>

      <style>{`
        @keyframes vobar {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(2.2); }
        }
      `}</style>
    </div>
  );
}

window.OnbA_Welcome = OnbA_Welcome;
window.OnbA_VoiceOff = OnbA_VoiceOff;
window.OnbA_Ready = OnbA_Ready;
window.OnbB_Welcome = OnbB_Welcome;
window.OnbB_VoiceOff = OnbB_VoiceOff;
window.OnbB_Ready = OnbB_Ready;
window.OnbC_Welcome = OnbC_Welcome;
window.OnbC_VoiceOff = OnbC_VoiceOff;
window.OnbC_VoiceOffFull = OnbC_VoiceOffFull;
window.OnbC_Ready = OnbC_Ready;
window.TipsA = TipsA;
window.TipsB = TipsB;
window.TipsC = TipsC;
window.TipsC_v1 = TipsC_v1;
window.TipsC_v2 = TipsC_v2;
window.TipsC_v3 = TipsC_v3;
window.TipsC_v4 = TipsC_v4;
