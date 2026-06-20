// Mobile paysage · 3 approches pour gérer la barre Chrome en haut
// A — Fullscreen API : CTA + bandeau d'invitation
// B — Layout adapté : on assume la barre, on cadre la vidéo + chips à gauche
// C — PWA : install banner pour passer en standalone

const CHR = {
  bg: "#F2F0EC",
  card: "#FAF8F4",
  ink: "#1A1A1A",
  inkSoft: "#5C5A55",
  inkDim: "#9E9B94",
  hair: "#DCD7CC",
  accent: "#B7553B",
  green: "#3F5E3A",
};

// Frame helper : barre Chrome simulée en haut (110px) + zone iframe
function ChromeFrame({ children, hideBar }) {
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
        width: 110, height: 26, background: "#000", borderRadius: 14, zIndex: 60,
      }} />

      {/* Chrome bar */}
      {!hideBar && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 70,
          background: "#1f1f1f", zIndex: 40,
          display: "flex", alignItems: "center", padding: "0 16px 0 60px",
          gap: 10, color: "#aaa", fontSize: 11,
        }}>
          <div style={{ marginLeft: 24 }}>20:11</div>
          <div style={{
            flex: 1, height: 32, background: "#2c2c2c", borderRadius: 999,
            display: "flex", alignItems: "center", padding: "0 14px",
            gap: 8, fontSize: 11, color: "#bbb",
          }}>
            <span>🏠</span>
            <span style={{ opacity: 0.7 }}>lms-scenarii-viewer.vercel.app/play</span>
          </div>
          <span>+</span>
          <span>4</span>
          <span>⋮</span>
        </div>
      )}

      <div style={{
        position: "absolute", left: 0, right: 0,
        top: hideBar ? 0 : 70, bottom: 0,
        overflow: "hidden",
      }}>
        {children}
      </div>
    </div>
  );
}

function VideoBackdrop({ src, position = "center 30%" }) {
  return (
    <div style={{ position: "absolute", inset: 0, background: "#1f1d1a", overflow: "hidden" }}>
      {src ? (
        <video src={src} autoPlay muted loop playsInline style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", objectPosition: position,
        }} />
      ) : (
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `repeating-linear-gradient(135deg, rgba(255,255,255,0.02) 0 22px, rgba(255,255,255,0.05) 22px 44px)`,
        }} />
      )}
    </div>
  );
}

// ──────────────────────────────────────────
// A — Fullscreen API : CTA proéminent + bandeau
// ──────────────────────────────────────────
function ChromeA_Fullscreen({ src }) {
  const [dismissed, setDismissed] = React.useState(false);
  return (
    <ChromeFrame>
      <VideoBackdrop src={src} position="center 35%" />

      {/* Top — banner d'invitation */}
      {!dismissed && (
        <div style={{
          position: "absolute", top: 12, left: 14, right: 14, zIndex: 30,
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px 14px",
          background: "rgba(26,26,26,0.92)",
          backdropFilter: "blur(14px)",
          borderRadius: 14,
          border: `1px solid rgba(183,85,59,0.4)`,
          boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: CHR.accent, display: "grid", placeItems: "center",
            flexShrink: 0,
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 5V2h3M9 2h3v3M2 9v3h3M9 12h3V9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div style={{ flex: 1, color: "#fff" }}>
            <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 1 }}>Passez en plein écran</div>
            <div style={{ fontSize: 9, opacity: 0.7, fontFamily: "'IBM Plex Mono', monospace" }}>
              POUR UNE EXPÉRIENCE OPTIMALE · MASQUE LA BARRE CHROME
            </div>
          </div>
          <button style={{
            background: CHR.accent, color: "#fff", border: "none",
            padding: "8px 14px", borderRadius: 999,
            fontFamily: "inherit", fontSize: 10, fontWeight: 600,
            letterSpacing: "0.1em", cursor: "pointer",
          }}>ACTIVER</button>
          <button onClick={() => setDismissed(true)} style={{
            background: "transparent", border: "none",
            color: "rgba(255,255,255,0.5)", fontSize: 16, cursor: "pointer",
            padding: 4, lineHeight: 1,
          }}>×</button>
        </div>
      )}

      {/* FAB plein écran toujours visible */}
      <button style={{
        position: "absolute", top: dismissed ? 12 : 76, right: 14, zIndex: 28,
        width: 38, height: 38, borderRadius: 999,
        background: CHR.accent, border: "none", cursor: "pointer",
        boxShadow: "0 6px 18px -4px rgba(183,85,59,0.6)",
        display: "grid", placeItems: "center",
        animation: dismissed ? "chrAPulse 2s ease-in-out infinite" : "none",
      }}>
        <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
          <path d="M2 5V2h3M9 2h3v3M2 9v3h3M9 12h3V9" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Phase mini-stepper en haut à gauche */}
      <div style={{
        position: "absolute", top: dismissed ? 14 : 76, left: 14, zIndex: 28,
        display: "flex", alignItems: "center", gap: 4,
        padding: "5px 10px", background: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(10px)", borderRadius: 999,
        color: "#fff", fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 8, letterSpacing: "0.15em",
      }}>
        ACCUEIL · 1/4
      </div>

      {/* Chips audio en bas */}
      <div style={{
        position: "absolute", left: 14, bottom: 14, zIndex: 10,
        display: "flex", gap: 6,
      }}>
        <Chip icon="↻" label="Réécouter" />
        <Chip icon="CC" label="Sous-titres" />
        <Chip icon="🔇" label="Muet" />
      </div>

      <style>{`
        @keyframes chrAPulse {
          0%, 100% { box-shadow: 0 6px 18px -4px rgba(183,85,59,0.6), 0 0 0 0 rgba(183,85,59,0.5); }
          50% { box-shadow: 0 6px 18px -4px rgba(183,85,59,0.8), 0 0 0 8px rgba(183,85,59,0); }
        }
      `}</style>
    </ChromeFrame>
  );
}

// ──────────────────────────────────────────
// B — Layout adapté : barre Chrome présente, on cadre + chips à gauche
// ──────────────────────────────────────────
function ChromeB_Adapted({ src }) {
  return (
    <ChromeFrame>
      {/* Vidéo cadrée pour montrer le visage */}
      <VideoBackdrop src={src} position="center 22%" />

      {/* Stepper horizontal très discret en haut */}
      <div style={{
        position: "absolute", top: 10, left: 14, right: 14, zIndex: 10,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          <Dot state="current" />
          <Line />
          <Dot />
          <Line />
          <Dot />
          <Line />
          <Dot />
        </div>
        <span style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 8,
          color: "#fff", letterSpacing: "0.15em",
          padding: "3px 8px", background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(10px)", borderRadius: 999,
        }}>ACCUEIL · 1/4</span>
      </div>

      {/* Chips audio en COLONNE à GAUCHE — libère le bas et le centre */}
      <div style={{
        position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
        zIndex: 10, display: "flex", flexDirection: "column", gap: 6,
      }}>
        <ChipIcon icon="↻" />
        <ChipIcon icon="CC" />
        <ChipIcon icon="🔇" />
      </div>

      {/* Bandeau bas — speaker + verbatim live */}
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 10,
        padding: "12px 14px 14px 60px",
        background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "4px 9px", background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(10px)", borderRadius: 999,
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 8, color: "#fff", letterSpacing: "0.12em",
          flexShrink: 0,
        }}>
          <span style={{
            width: 5, height: 5, borderRadius: "50%", background: CHR.accent,
            animation: "chrPulse 1.6s ease-in-out infinite",
          }} />
          ELLE PARLE
        </div>
        <div style={{
          flex: 1, color: "#fff",
          fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
          fontSize: 14, lineHeight: 1.3, textShadow: "0 1px 8px rgba(0,0,0,0.7)",
        }}>
          « Bonjour, je cherche quelque chose de très féminin… »
        </div>
      </div>

      <style>{`
        @keyframes chrPulse { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.4;transform:scale(1.4);} }
      `}</style>
    </ChromeFrame>
  );
}

// ──────────────────────────────────────────
// C — PWA install banner
// ──────────────────────────────────────────
function ChromeC_PWA({ src }) {
  const [step, setStep] = React.useState(0);
  // step 0 = banner visible, step 1 = installé (frame sans Chrome)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* État avant install */}
      <div>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 9,
          color: CHR.accent, letterSpacing: "0.18em", marginBottom: 6,
        }}>① AVANT — BANNIÈRE D'INSTALL</div>
        <ChromeFrame>
          <VideoBackdrop src={src} position="center 35%" />

          {/* Banner PWA install */}
          <div style={{
            position: "absolute", left: 14, right: 14, top: 12, zIndex: 30,
            padding: "12px 14px",
            background: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(14px)",
            borderRadius: 14,
            display: "flex", alignItems: "center", gap: 12,
            boxShadow: "0 10px 30px -8px rgba(0,0,0,0.4)",
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: `linear-gradient(135deg, ${CHR.accent}, #d97757)`,
              display: "grid", placeItems: "center",
              color: "#fff", fontSize: 16, fontWeight: 700,
              fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
              flexShrink: 0,
            }}>M</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: CHR.ink, marginBottom: 1 }}>
                Installer Metagora
              </div>
              <div style={{ fontSize: 9, color: CHR.inkSoft, lineHeight: 1.4 }}>
                Pour un plein écran sans barre, ajoutez à l'écran d'accueil
              </div>
            </div>
            <button style={{
              background: CHR.ink, color: "#fff", border: "none",
              padding: "7px 12px", borderRadius: 999,
              fontFamily: "inherit", fontSize: 10, fontWeight: 600,
              letterSpacing: "0.1em", cursor: "pointer", flexShrink: 0,
            }}>INSTALLER</button>
            <button style={{
              background: "transparent", border: "none",
              color: CHR.inkDim, fontSize: 16, cursor: "pointer",
              padding: 0, lineHeight: 1, flexShrink: 0,
            }}>×</button>
          </div>

          {/* Stepper */}
          <div style={{
            position: "absolute", top: 76, left: 14, zIndex: 10,
            display: "flex", alignItems: "center", gap: 4,
            padding: "5px 10px", background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(10px)", borderRadius: 999,
            color: "#fff", fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 8, letterSpacing: "0.15em",
          }}>ACCUEIL · 1/4</div>

          <div style={{
            position: "absolute", left: 14, bottom: 14, zIndex: 10,
            display: "flex", gap: 6,
          }}>
            <Chip icon="↻" label="Réécouter" />
            <Chip icon="CC" label="Sous-titres" />
            <Chip icon="🔇" label="Muet" />
          </div>
        </ChromeFrame>
      </div>

      {/* État après install — plus de barre Chrome */}
      <div>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 9,
          color: CHR.green, letterSpacing: "0.18em", marginBottom: 6,
        }}>② APRÈS — STANDALONE, PLUS DE BARRE</div>
        <ChromeFrame hideBar>
          <VideoBackdrop src={src} position="center 30%" />

          {/* Stepper */}
          <div style={{
            position: "absolute", top: 14, left: 14, zIndex: 10,
            display: "flex", alignItems: "center", gap: 5,
          }}>
            <Dot state="current" />
            <Line />
            <Dot />
            <Line />
            <Dot />
            <Line />
            <Dot />
          </div>
          <div style={{
            position: "absolute", top: 14, right: 14, zIndex: 10,
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 8,
            color: "#fff", letterSpacing: "0.15em",
            padding: "4px 9px", background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(10px)", borderRadius: 999,
          }}>ACCUEIL · 1/4</div>

          <div style={{
            position: "absolute", left: 14, bottom: 14, zIndex: 10,
            display: "flex", gap: 6,
          }}>
            <Chip icon="↻" label="Réécouter" />
            <Chip icon="CC" label="Sous-titres" />
            <Chip icon="🔇" label="Muet" />
          </div>
        </ChromeFrame>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────
// Sous-composants
// ──────────────────────────────────────────
function Chip({ icon, label }) {
  return (
    <button style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      height: 24, padding: "0 9px", borderRadius: 999,
      background: "rgba(0,0,0,0.55)", backdropFilter: "blur(10px)",
      border: `1px solid rgba(255,255,255,0.18)`,
      color: "#fff", fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 9, fontWeight: 500, cursor: "pointer",
    }}>
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: CHR.accent, fontSize: 8 }}>{icon}</span>
      {label}
    </button>
  );
}

function ChipIcon({ icon }) {
  return (
    <button style={{
      width: 32, height: 32, borderRadius: "50%",
      background: "rgba(0,0,0,0.55)", backdropFilter: "blur(10px)",
      border: `1px solid rgba(255,255,255,0.18)`,
      color: "#fff", fontFamily: "'IBM Plex Mono', monospace",
      fontSize: 10, fontWeight: 500, cursor: "pointer",
      display: "grid", placeItems: "center",
    }}>{icon}</button>
  );
}

function Dot({ state }) {
  const isCurrent = state === "current";
  return (
    <div style={{
      width: isCurrent ? 12 : 8, height: isCurrent ? 12 : 8,
      borderRadius: "50%",
      border: `1.5px solid ${isCurrent ? CHR.accent : "rgba(255,255,255,0.55)"}`,
      background: isCurrent ? CHR.accent : "transparent",
      boxShadow: isCurrent ? `0 0 0 3px rgba(183,85,59,0.2)` : "none",
    }} />
  );
}
function Line() {
  return <div style={{ width: 14, height: 1.5, background: "rgba(255,255,255,0.4)" }} />;
}

window.ChromeA_Fullscreen = ChromeA_Fullscreen;
window.ChromeB_Adapted = ChromeB_Adapted;
window.ChromeC_PWA = ChromeC_PWA;
