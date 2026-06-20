// Bilan final · Quiet Material — même ADN que les autres screens
// Palette : F2F0EC (bg), FAF8F4 (card), B7553B (accent terracotta),
// 3F5E3A (vert succès), 1A1A1A (ink), IBM Plex Sans + Mono, Cormorant italique pour titres

const RES = {
  bg: "#F2F0EC",
  card: "#FAF8F4",
  cardSoft: "#FFFFFF",
  ink: "#1A1A1A",
  inkSoft: "#5C5A55",
  inkDim: "#9E9B94",
  hair: "#DCD7CC",
  hairSoft: "#EDE8DD",
  accent: "#B7553B",
  accentSoft: "rgba(183,85,59,0.08)",
  green: "#3F5E3A",
  greenSoft: "rgba(63,94,58,0.10)",
};

const STATS = [
  { v: "13", l: "TENTATIVES" },
  { v: "10", l: "ERREURS" },
  { v: "20", l: "SCORE" },
  { v: "4m48s", l: "DURÉE" },
];

const PHASES = [
  { name: "Accueil", attempts: "2 tentatives · 1 erreur", stars: 3, badge: "Maître d'hôte", state: "done" },
  { name: "Découverte", attempts: "11 tentatives · 9 erreurs", stars: 2, badge: "Profileur", state: "done" },
];

const TIPS = [
  { txt: "Mieux vaut approfondir les critères de choix avant de proposer une sélection, pour que l'essai paraisse évident.", phase: "Phase Découverte · choix au score 0/5" },
  { txt: "On gagne souvent à partir de son envie du moment et de ses sensations avant d'évoquer les meilleures ventes.", phase: "Phase Accueil · choix au score 2/5" },
  { txt: "Avant de nommer des familles, on gagne souvent à partir d'images, de souvenirs ou d'ambiances qu'elle recherche.", phase: "Phase Découverte · choix au score 0/5" },
];

const MISSING = [
  { name: "Connaisseur le produit", req: "< 10 erreurs", stars: 2 },
  { name: "Signature d'accueil (Accueil)", req: "phase parfaite (0 erreur)", stars: 1 },
  { name: "Sourcier (Découverte)", req: "< 5 erreurs sur cette phase", stars: 3 },
];

function Stars({ n, dim }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {[1, 2, 3].map(i => (
        <svg key={i} width="11" height="11" viewBox="0 0 12 12" style={{
          fill: i <= n ? (dim ? "rgba(183,85,59,0.35)" : RES.accent) : "rgba(0,0,0,0.12)",
        }}>
          <path d="M6 0.5l1.65 3.34 3.69.54-2.67 2.6.63 3.67L6 8.92l-3.3 1.74.63-3.67-2.67-2.6 3.69-.54L6 0.5z"/>
        </svg>
      ))}
    </span>
  );
}

function ResultsContent({ s = 1 }) {
  const [showMissing, setShowMissing] = React.useState(false);
  const px = (v) => v * s;
  return (
    <div style={{
      width: "100%",
      background: RES.bg,
      fontFamily: "'IBM Plex Sans', sans-serif",
      color: RES.ink,
      padding: `${px(48)}px ${px(48)}px ${px(56)}px`,
      boxSizing: "border-box",
    }}>
      {/* Header eyebrow */}
      <div style={{
        textAlign: "center",
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: px(10), letterSpacing: "0.25em",
        color: RES.accent, fontWeight: 500,
        marginBottom: px(20),
      }}>◆ BILAN · FIN DE PARCOURS</div>

      {/* Hero — italique éditorial cohérent */}
      <div style={{ textAlign: "center", marginBottom: px(40) }}>
        <h1 style={{
          margin: 0, marginBottom: px(14),
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic", fontWeight: 400,
          fontSize: px(46), lineHeight: 1.1,
          color: RES.ink, letterSpacing: "-0.01em",
        }}>
          Bravo Zina,<br/>tu as terminé la démo.
        </h1>
        <p style={{
          margin: 0, fontSize: px(13), lineHeight: 1.6,
          color: RES.inkSoft, maxWidth: px(440), marginInline: "auto",
          textWrap: "pretty",
        }}>
          Tu as accompli le parcours avec Sophie. Voici ton bilan détaillé et tes badges débloqués.
        </p>
      </div>

      {/* Stats — ligne sobre */}
      <div style={{
        background: RES.card, border: `1px solid ${RES.hair}`,
        padding: `${px(22)}px ${px(28)}px`, marginBottom: px(16),
        borderRadius: px(2),
      }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: px(10),
          color: RES.accent, letterSpacing: "0.18em", marginBottom: px(16),
          fontWeight: 500,
        }}>STATS GLOBALES</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: px(8) }}>
          {STATS.map((st, i) => (
            <div key={st.l} style={{
              textAlign: "left",
              borderLeft: i > 0 ? `1px solid ${RES.hair}` : "none",
              paddingLeft: i > 0 ? px(20) : 0,
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic", fontWeight: 400,
                fontSize: px(36), color: RES.ink,
                lineHeight: 1, marginBottom: px(6),
                letterSpacing: "-0.01em",
              }}>{st.v}</div>
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace", fontSize: px(9),
                color: RES.inkDim, letterSpacing: "0.15em",
              }}>{st.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured badge */}
      <div style={{
        background: RES.card, border: `1px solid ${RES.hair}`,
        borderLeft: `3px solid ${RES.accent}`,
        padding: `${px(28)}px`, marginBottom: px(16),
        textAlign: "center",
        borderRadius: px(2),
      }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: px(9),
          color: RES.accent, letterSpacing: "0.2em", marginBottom: px(10),
          fontWeight: 500,
        }}>★ BADGE PRINCIPAL · NIVEAU 1</div>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic", fontWeight: 400,
          fontSize: px(30), color: RES.ink,
          letterSpacing: "-0.01em", marginBottom: px(6),
        }}>« Initié le produit »</div>
        <div style={{ fontSize: px(11), color: RES.inkSoft }}>10 erreurs au total · obtenu</div>
      </div>

      {/* Phases — maîtrise par phase */}
      <div style={{
        background: RES.card, border: `1px solid ${RES.hair}`,
        padding: `${px(22)}px ${px(24)}px`, marginBottom: px(16),
        borderRadius: px(2),
      }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: px(10),
          color: RES.accent, letterSpacing: "0.18em", marginBottom: px(14),
          fontWeight: 500,
        }}>MAÎTRISE PAR PHASE</div>
        <div style={{ display: "flex", flexDirection: "column", gap: px(6) }}>
          {PHASES.map(p => (
            <div key={p.name} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: `${px(12)}px ${px(14)}px`,
              background: RES.cardSoft,
              border: `1px solid ${RES.hair}`,
              borderLeft: `3px solid ${RES.green}`,
              borderRadius: px(2),
              gap: px(12),
            }}>
              <div style={{ minWidth: px(110), display: "flex", alignItems: "center", gap: px(8) }}>
                <div style={{
                  width: px(14), height: px(14), borderRadius: "50%",
                  background: RES.green, display: "grid", placeItems: "center",
                  color: "#fff", fontSize: px(8), fontWeight: 600,
                }}>✓</div>
                <span style={{ fontWeight: 500, fontSize: px(13) }}>{p.name}</span>
              </div>
              <div style={{
                flex: 1, fontSize: px(11), color: RES.inkSoft,
                fontFamily: "'IBM Plex Mono', monospace",
              }}>{p.attempts}</div>
              <div style={{ display: "flex", alignItems: "center", gap: px(10) }}>
                <Stars n={p.stars} />
                <span style={{
                  fontSize: px(11), fontWeight: 500, color: RES.accent,
                  fontStyle: "italic",
                  fontFamily: "'Cormorant Garamond', serif",
                }}>{p.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips de vente */}
      <div style={{
        background: RES.card, border: `1px solid ${RES.hair}`,
        padding: `${px(22)}px ${px(24)}px`, marginBottom: px(16),
        borderRadius: px(2),
      }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: px(10),
          color: RES.accent, letterSpacing: "0.18em", marginBottom: px(14),
          fontWeight: 500,
        }}>3 TIPS DE VENTE À RETENIR</div>
        <div style={{ display: "flex", flexDirection: "column", gap: px(8) }}>
          {TIPS.map((t, i) => (
            <div key={i} style={{
              display: "flex", gap: px(14),
              padding: `${px(14)}px ${px(16)}px`,
              background: RES.cardSoft,
              border: `1px solid ${RES.hair}`,
              borderLeft: `3px solid ${RES.accent}`,
              borderRadius: px(2),
            }}>
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: px(11), color: RES.accent,
                fontWeight: 500, flexShrink: 0, marginTop: px(2),
              }}>{String(i + 1).padStart(2, "0")}</div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic", fontSize: px(15), lineHeight: 1.45,
                  color: RES.ink, textWrap: "pretty", marginBottom: px(6),
                }}>« {t.txt} »</div>
                <div style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: px(10), color: RES.inkDim, letterSpacing: "0.05em",
                }}>{t.phase}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Missing badges */}
      <div style={{
        background: RES.card,
        border: `1px dashed ${RES.hair}`,
        padding: `${px(14)}px ${px(20)}px`, marginBottom: px(16),
        borderRadius: px(2),
      }}>
        <button onClick={() => setShowMissing(!showMissing)} style={{
          width: "100%", background: "transparent", border: "none",
          color: RES.accent, fontWeight: 500, fontSize: px(11),
          cursor: "pointer", padding: px(6), fontFamily: "'IBM Plex Mono', monospace",
          letterSpacing: "0.18em",
          display: "flex", alignItems: "center", justifyContent: "center", gap: px(8),
        }}>
          {showMissing ? "MASQUER" : "VOIR"} LES BADGES MANQUANTS
          <span style={{ transform: showMissing ? "rotate(180deg)" : "none", transition: "transform 0.3s" }}>▾</span>
        </button>
        {showMissing && (
          <div style={{ marginTop: px(12), display: "flex", flexDirection: "column", gap: px(6) }}>
            {MISSING.map(m => (
              <div key={m.name} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: `${px(10)}px ${px(14)}px`,
                background: RES.cardSoft, borderRadius: px(2),
                border: `1px solid ${RES.hairSoft}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: px(10) }}>
                  <Stars n={m.stars} dim />
                  <span style={{ fontSize: px(12), color: RES.inkSoft }}>{m.name}</span>
                </div>
                <span style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: px(10), color: RES.inkDim, letterSpacing: "0.05em",
                }}>{m.req}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Comment */}
      <div style={{
        background: RES.card, border: `1px solid ${RES.hair}`,
        padding: `${px(22)}px ${px(24)}px`, marginBottom: px(24),
        borderRadius: px(2),
      }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: px(10),
          color: RES.accent, letterSpacing: "0.18em", marginBottom: px(8),
          fontWeight: 500,
        }}>VOTRE COMMENTAIRE</div>
        <p style={{
          margin: 0, marginBottom: px(12), fontSize: px(12),
          color: RES.inkSoft, lineHeight: 1.55,
        }}>
          Un retour sur votre expérience ? Au plaisir de vous lire pour améliorer votre immersion dans notre univers.
        </p>
        <textarea
          placeholder="Ce qui vous a marqué, ce qui a manqué, une suggestion…"
          style={{
            width: "100%", height: px(80),
            border: `1px solid ${RES.hair}`, borderRadius: px(2),
            padding: px(12), fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: px(12), background: RES.cardSoft,
            boxSizing: "border-box", resize: "vertical",
            color: RES.ink, outline: "none",
          }}
        />
        <button style={{
          marginTop: px(12),
          background: RES.ink, color: "#fff", border: "none",
          padding: `${px(11)}px ${px(22)}px`, borderRadius: px(2),
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontWeight: 500, fontSize: px(12),
          letterSpacing: "0.05em", cursor: "pointer",
        }}>Envoyer mon commentaire →</button>
      </div>

      {/* Recommencer */}
      <div style={{ textAlign: "center", paddingTop: px(8) }}>
        <button style={{
          background: "transparent", color: RES.ink,
          border: `1px solid ${RES.ink}`,
          padding: `${px(14)}px ${px(36)}px`, borderRadius: px(2),
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontWeight: 500, fontSize: px(13),
          letterSpacing: "0.15em", cursor: "pointer",
          display: "inline-flex", alignItems: "center", gap: px(10),
        }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: RES.accent }}>↻</span>
          RECOMMENCER
        </button>
      </div>
    </div>
  );
}

function ResultsDesktop() {
  return (
    <div style={{
      width: 1440, height: 900,
      background: RES.bg,
      overflow: "auto",
      fontFamily: "'IBM Plex Sans', sans-serif",
    }}>
      {/* Top mono header — pour rester dans l'ADN */}
      <div style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(242,240,236,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${RES.hair}`,
        padding: "16px 40px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
        color: RES.inkSoft, letterSpacing: "0.05em",
      }}>
        <span>METAGORA <span style={{ color: RES.inkDim }}>/ Hermès Parfum FR-01</span></span>
        <span style={{ color: RES.green, fontWeight: 500 }}>● PARCOURS TERMINÉ</span>
      </div>
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <ResultsContent s={1} />
      </div>
    </div>
  );
}

function ResultsMobile() {
  return (
    <div style={{
      width: 844, height: 390,
      borderRadius: 36,
      overflow: "hidden",
      border: "8px solid #1a1a1a",
      boxSizing: "border-box",
      position: "relative",
      background: RES.bg,
    }}>
      <div style={{
        position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)",
        width: 110, height: 26, background: "#000", borderRadius: 14, zIndex: 50,
      }} />
      <div style={{ position: "absolute", inset: 0, overflow: "auto" }}>
        {/* Mini sticky header */}
        <div style={{
          position: "sticky", top: 0, zIndex: 40,
          background: "rgba(242,240,236,0.94)",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${RES.hair}`,
          padding: "10px 18px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 8,
          color: RES.inkSoft, letterSpacing: "0.1em",
        }}>
          <span>METAGORA / Hermès FR-01</span>
          <span style={{ color: RES.green, fontWeight: 500 }}>● TERMINÉ</span>
        </div>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <ResultsContent s={0.62} />
        </div>
      </div>
      {/* Scroll indicator */}
      <div style={{
        position: "absolute", right: 10, top: 50, bottom: 14,
        width: 2, background: RES.hair, borderRadius: 999, zIndex: 30,
      }}>
        <div style={{
          width: "100%", height: 60, background: RES.accent,
          borderRadius: 999, animation: "resScroll 3s ease-in-out infinite",
        }} />
      </div>
      <style>{`
        @keyframes resScroll {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(180px); }
        }
      `}</style>
    </div>
  );
}

function ResultsRotation() {
  return (
    <div style={{
      width: 390, height: 844,
      borderRadius: 44,
      overflow: "hidden",
      border: "8px solid #1a1a1a",
      boxSizing: "border-box",
      position: "relative",
      background: RES.bg,
      fontFamily: "'IBM Plex Sans', sans-serif",
      color: RES.ink,
    }}>
      <div style={{
        position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)",
        width: 110, height: 26, background: "#000", borderRadius: 14, zIndex: 50,
      }} />

      {/* Top mono header */}
      <div style={{
        position: "absolute", top: 50, left: 24, right: 24,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 9,
        color: RES.inkSoft, letterSpacing: "0.1em",
      }}>
        <span>METAGORA</span>
        <span style={{ color: RES.green, fontWeight: 500 }}>● TERMINÉ</span>
      </div>

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "0 36px", textAlign: "center",
      }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
          color: RES.accent, letterSpacing: "0.25em", marginBottom: 22,
          fontWeight: 500,
        }}>◆ DERNIÈRE ÉTAPE</div>

        {/* Phone rotating icon */}
        <div style={{ marginBottom: 36, position: "relative", width: 130, height: 130 }}>
          <svg viewBox="0 0 130 130" width="130" height="130" style={{
            animation: "rotateHint 2.6s ease-in-out infinite",
          }}>
            <rect x="48" y="14" width="36" height="102" rx="6" ry="6"
              fill="none" stroke={RES.ink} strokeWidth="2" />
            <rect x="52" y="22" width="28" height="80" rx="2" ry="2"
              fill="none" stroke={RES.hair} strokeWidth="1" />
            <line x1="58" y1="110" x2="74" y2="110" stroke={RES.accent} strokeWidth="2" strokeLinecap="round" />
          </svg>
          <svg viewBox="0 0 60 60" width="48" height="48" style={{
            position: "absolute", right: -12, top: 42, color: RES.accent,
          }}>
            <path d="M10 30 Q 30 5, 50 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M44 22 L 50 30 L 42 34" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 style={{
          margin: 0, marginBottom: 16,
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic", fontWeight: 400,
          fontSize: 32, lineHeight: 1.15,
          color: RES.ink, letterSpacing: "-0.01em",
        }}>
          Tournez<br/>votre téléphone
        </h1>

        <p style={{
          margin: 0, fontSize: 14, lineHeight: 1.6,
          color: RES.inkSoft, maxWidth: 280, textWrap: "pretty",
        }}>
          Le bilan est plus lisible en paysage. Pivotez votre appareil pour découvrir vos badges, vos stats et les conseils à retenir.
        </p>

        <div style={{
          marginTop: 32, padding: "10px 16px",
          border: `1px solid ${RES.hair}`,
          borderRadius: 999,
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 10, fontWeight: 500, color: RES.inkSoft,
          letterSpacing: "0.18em",
          display: "inline-flex", alignItems: "center", gap: 8,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%", background: RES.accent,
            animation: "rotateBlink 1.4s ease-in-out infinite",
          }} />
          DÉTECTION AUTO
        </div>
      </div>

      <style>{`
        @keyframes rotateHint {
          0%, 30% { transform: rotate(0deg); }
          50%, 80% { transform: rotate(-90deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes rotateBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}

window.ResultsDesktop = ResultsDesktop;
window.ResultsMobile = ResultsMobile;
window.ResultsRotation = ResultsRotation;
