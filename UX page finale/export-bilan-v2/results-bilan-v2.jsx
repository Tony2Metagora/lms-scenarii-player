// Bilan final — 3 versions desktop + 3 versions mobile paysage
// Style aligné Quiet Material : sans-serif uniquement (pas d'italique), beige clair, accent terracotta

const BIL = {
  bg: "#F2F0EC",
  bgSoft: "#E8E5DF",
  card: "#FAF8F4",
  cardHi: "#FFFFFF",
  ink: "#1A1A1A",
  inkSoft: "#5C5A55",
  inkDim: "#9E9B94",
  hair: "#DCD7CC",
  accent: "#B7553B",
  accentSoft: "#EFE0DA",
  green: "#3F5E3A",
  greenSoft: "#E5ECDF",
};

const STATS = [
  { v: "13", l: "TENTATIVES" },
  { v: "10", l: "ERREURS" },
  { v: "20", l: "SCORE" },
  { v: "4'48\"", l: "DURÉE" },
];

const PHASES = [
  { name: "Accueil", attempts: "2 tentatives · 1 erreur", stars: 3, badge: "Maître d'hôte" },
  { name: "Découverte", attempts: "11 tentatives · 9 erreurs", stars: 2, badge: "Profileur" },
];

const TIPS = [
  { txt: "Mieux vaut approfondir les critères de choix avant de proposer une sélection, pour que l'essai paraisse évident.", phase: "Phase Découverte · choix au score 0/5" },
  { txt: "On gagne souvent à partir de son envie du moment et de ses sensations avant d'évoquer les meilleures ventes.", phase: "Phase Accueil · choix au score 2/5" },
  { txt: "Trop rapide, saute des étapes importantes de découverte.", phase: "Phase Découverte · choix au score 0/5" },
];

const MISSING_BADGES = [
  { name: "Ambassadeur le produit", req: "< 5 erreurs", stars: 3 },
  { name: "Signature d'accueil (Accueil)", req: "phase parfaite (0 erreur)", stars: 3 },
  { name: "Sourcier (Découverte)", req: "< 5 erreurs sur cette phase", stars: 3 },
];

function Stars({ n, total = 3, size = 14, color }) {
  const c = color || BIL.accent;
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {Array.from({ length: total }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i < n ? c : "none"} stroke={c} strokeWidth="1.5">
          <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9" />
        </svg>
      ))}
    </span>
  );
}

// ─── COMMON HEADER ───
function BilHeader({ scale = 1, name = "Zina" }) {
  const s = (v) => v * scale;
  return (
    <div style={{
      textAlign: "center",
      paddingTop: s(40), paddingBottom: s(28),
    }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: s(10),
        fontFamily: "'IBM Plex Mono', monospace", fontSize: s(11),
        color: BIL.accent, letterSpacing: "0.22em", marginBottom: s(14),
      }}>
        <span style={{ width: s(28), height: 1, background: BIL.accent }} />
        DÉMO TERMINÉE
        <span style={{ width: s(28), height: 1, background: BIL.accent }} />
      </div>
      <h1 style={{
        margin: 0, marginBottom: s(8),
        fontFamily: "'IBM Plex Sans', sans-serif",
        fontWeight: 600, fontSize: s(38), lineHeight: 1.1,
        letterSpacing: "-0.015em", color: BIL.ink,
      }}>
        Bravo {name}.
      </h1>
      <p style={{
        margin: 0, fontSize: s(14), lineHeight: 1.55,
        color: BIL.inkSoft, maxWidth: s(520), marginInline: "auto",
      }}>
        Vous avez accompli le parcours avec Sophie. Voici votre bilan.
      </p>
    </div>
  );
}

// ─── DESKTOP V1 — Éditorial / colonne unique ───
function ResultsDesktopV1() {
  const [showMissing, setShowMissing] = React.useState(false);
  return (
    <div style={{
      width: 1440, height: 900, background: BIL.bg,
      overflow: "auto", fontFamily: "'IBM Plex Sans', sans-serif",
      color: BIL.ink,
    }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 40px 60px" }}>
        <BilHeader />

        {/* Stats hairline row */}
        <div style={{
          background: BIL.card, padding: "22px 28px", marginBottom: 14,
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          borderTop: `1px solid ${BIL.hair}`, borderBottom: `1px solid ${BIL.hair}`,
        }}>
          {STATS.map((st, i) => (
            <div key={st.l} style={{
              textAlign: "center",
              borderLeft: i > 0 ? `1px solid ${BIL.hair}` : "none",
            }}>
              <div style={{ fontSize: 30, fontWeight: 600, lineHeight: 1, marginBottom: 6, letterSpacing: "-0.02em" }}>{st.v}</div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: BIL.inkDim, letterSpacing: "0.18em" }}>{st.l}</div>
            </div>
          ))}
        </div>

        {/* Featured badge — minimal card */}
        <div style={{
          background: BIL.card, padding: "32px 36px", marginBottom: 14,
          display: "flex", alignItems: "center", gap: 28,
          border: `1px solid ${BIL.hair}`,
        }}>
          <div style={{
            width: 84, height: 84, borderRadius: "50%",
            background: BIL.accent, display: "grid", placeItems: "center",
            color: "#fff", flexShrink: 0,
          }}>
            <svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9" />
            </svg>
          </div>
          <div>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
              color: BIL.accent, letterSpacing: "0.2em", marginBottom: 6,
            }}>BADGE DÉBLOQUÉ · NIVEAU 1</div>
            <div style={{ fontSize: 26, fontWeight: 600, marginBottom: 4, letterSpacing: "-0.01em" }}>Initié le produit</div>
            <div style={{ fontSize: 13, color: BIL.inkSoft }}>10 erreurs au total — palier suivant à 5 erreurs.</div>
          </div>
        </div>

        {/* Maîtrise par phase */}
        <SectionHead title="Maîtrise par phase" eyebrow="MAÎTRISE" />
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 22 }}>
          {PHASES.map(p => (
            <div key={p.name} style={{
              background: BIL.card, padding: "18px 24px",
              border: `1px solid ${BIL.hair}`,
              display: "flex", alignItems: "center", gap: 20,
            }}>
              <div style={{ minWidth: 130 }}>
                <div style={{ fontSize: 16, fontWeight: 500 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: BIL.inkDim, marginTop: 2 }}>{p.attempts}</div>
              </div>
              <div style={{ flex: 1 }} />
              <Stars n={p.stars} size={16} />
              <div style={{
                fontSize: 12, fontWeight: 500, color: BIL.accent,
                padding: "5px 12px", background: BIL.accentSoft,
                fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.08em",
              }}>{p.badge.toUpperCase()}</div>
            </div>
          ))}
        </div>

        {/* Tips */}
        <SectionHead title="3 tips de vente à retenir" eyebrow="À RETENIR" />
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 22 }}>
          {TIPS.map((t, i) => (
            <div key={i} style={{
              background: BIL.card, padding: "16px 20px",
              borderLeft: `2px solid ${BIL.accent}`,
              display: "flex", gap: 16,
            }}>
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
                color: BIL.accent, fontWeight: 600, minWidth: 24,
              }}>0{i+1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, lineHeight: 1.55, color: BIL.ink, textWrap: "pretty", marginBottom: 6 }}>{t.txt}</div>
                <div style={{ fontSize: 11, color: BIL.inkDim, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em" }}>{t.phase.toUpperCase()}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Missing badges (collapsable) */}
        <button onClick={() => setShowMissing(!showMissing)} style={{
          width: "100%", padding: "14px 20px",
          background: "transparent", border: `1px dashed ${BIL.inkDim}`,
          color: BIL.inkSoft, fontSize: 13, fontWeight: 500,
          cursor: "pointer", fontFamily: "inherit", marginBottom: showMissing ? 8 : 22,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          {showMissing ? "Masquer" : "Voir"} les badges à débloquer
          <span style={{ transform: showMissing ? "rotate(180deg)" : "none", transition: "transform 0.3s", display: "inline-block" }}>▾</span>
        </button>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: 8 }}>
          <button style={{
            padding: "16px 56px", background: BIL.ink, color: "#fff",
            border: "none", fontSize: 13, fontWeight: 500, letterSpacing: "0.18em",
            cursor: "pointer", fontFamily: "inherit",
          }}>RECOMMENCER LA DÉMO</button>
        </div>
      </div>
    </div>
  );
}

function SectionHead({ title, eyebrow }) {
  return (
    <div style={{ marginBottom: 12, marginTop: 8 }}>
      <div style={{
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
        color: BIL.accent, letterSpacing: "0.22em", marginBottom: 4,
      }}>{eyebrow}</div>
      <h2 style={{ margin: 0, fontSize: 18, fontWeight: 500, letterSpacing: "-0.01em" }}>{title}</h2>
    </div>
  );
}

// ─── DESKTOP V2 — Dashboard 2 colonnes ───
function ResultsDesktopV2() {
  return (
    <div style={{
      width: 1440, height: 900, background: BIL.bg,
      overflow: "auto", fontFamily: "'IBM Plex Sans', sans-serif",
      color: BIL.ink,
    }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 40px 60px" }}>
        <BilHeader />

        {/* Stats top */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 18,
        }}>
          {STATS.map((st) => (
            <div key={st.l} style={{
              background: BIL.card, padding: "20px 24px",
              border: `1px solid ${BIL.hair}`,
            }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: BIL.inkDim, letterSpacing: "0.18em", marginBottom: 8 }}>{st.l}</div>
              <div style={{ fontSize: 32, fontWeight: 600, lineHeight: 1, letterSpacing: "-0.02em" }}>{st.v}</div>
            </div>
          ))}
        </div>

        {/* Two-column: badge + phases */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 8, marginBottom: 18 }}>
          {/* Badge featured */}
          <div style={{
            background: BIL.accent, color: "#fff",
            padding: "32px 32px",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            minHeight: 280,
          }}>
            <div>
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
                letterSpacing: "0.22em", opacity: 0.85, marginBottom: 8,
              }}>BADGE · NIVEAU 1</div>
              <div style={{ fontSize: 30, fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.015em", marginBottom: 12 }}>
                Initié le produit
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.55, opacity: 0.92 }}>
                10 erreurs au total. Palier suivant à 5 erreurs pour devenir <em style={{ fontStyle: "normal", fontWeight: 600 }}>Connaisseur</em>.
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 24 }}>
              <Stars n={3} size={20} color="#fff" />
              <svg width="56" height="56" viewBox="0 0 24 24" fill="rgba(255,255,255,0.95)">
                <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9" />
              </svg>
            </div>
          </div>

          {/* Phases */}
          <div style={{ background: BIL.card, padding: "24px 28px", border: `1px solid ${BIL.hair}` }}>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
              color: BIL.accent, letterSpacing: "0.22em", marginBottom: 4,
            }}>MAÎTRISE</div>
            <h2 style={{ margin: 0, marginBottom: 18, fontSize: 18, fontWeight: 500, letterSpacing: "-0.01em" }}>Par phase</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {PHASES.map(p => (
                <div key={p.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                    <div style={{ fontSize: 15, fontWeight: 500 }}>{p.name}</div>
                    <Stars n={p.stars} size={13} />
                  </div>
                  {/* progress bar */}
                  <div style={{ height: 4, background: BIL.bgSoft, marginBottom: 6 }}>
                    <div style={{ height: 4, width: `${(p.stars / 3) * 100}%`, background: BIL.accent }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 11, color: BIL.inkDim, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.08em" }}>{p.attempts}</span>
                    <span style={{ fontSize: 11, color: BIL.accent, fontWeight: 500 }}>{p.badge}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tips — l'un en dessous de l'autre */}
        <div style={{ background: BIL.card, padding: "28px 32px", border: `1px solid ${BIL.hair}`, marginBottom: 18 }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: BIL.accent, letterSpacing: "0.22em", marginBottom: 4 }}>À RETENIR</div>
          <h2 style={{ margin: 0, marginBottom: 18, fontSize: 18, fontWeight: 500, letterSpacing: "-0.01em" }}>3 tips de vente</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {TIPS.map((t, i) => (
              <div key={i} style={{ background: "#fff", padding: "16px 22px", borderLeft: `3px solid ${BIL.accent}`, display: "flex", gap: 18 }}>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: BIL.accent, fontWeight: 600, minWidth: 26 }}>0{i+1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, lineHeight: 1.55, color: BIL.ink, textWrap: "pretty", marginBottom: 6 }}>« {t.txt} »</div>
                  <div style={{ fontSize: 11, color: BIL.inkDim, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em" }}>{t.phase.toUpperCase()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges manquants — toggle */}
        <MissingBadgesBlock />

        {/* Commentaire */}
        <CommentaireBlock />

        {/* Recommencer */}
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <button style={{
            padding: "16px 44px", background: "transparent", border: `1px solid ${BIL.ink}`,
            color: BIL.ink, fontSize: 13, fontWeight: 500, letterSpacing: "0.2em",
            cursor: "pointer", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 12,
          }}>↻  RECOMMENCER</button>
        </div>
      </div>
    </div>
  );
}

function MissingBadgesBlock() {
  const [open, setOpen] = React.useState(true);
  return (
    <div style={{ background: BIL.card, border: `1px dashed ${BIL.inkDim}`, padding: "16px 24px", marginBottom: 18 }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", background: "transparent", border: "none", cursor: "pointer",
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: BIL.accent,
        letterSpacing: "0.22em", padding: "6px 0", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
      }}>
        {open ? "MASQUER LES BADGES MANQUANTS" : "VOIR LES BADGES MANQUANTS"}
        <span style={{ display: "inline-block", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.3s" }}>▾</span>
      </button>
      {open && (
        <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 6 }}>
          {MISSING_BADGES.map(b => (
            <div key={b.name} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "12px 18px", background: "#fff",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <Stars n={0} total={3} size={14} color={BIL.inkDim} />
                <span style={{ fontSize: 14, color: BIL.ink }}>{b.name}</span>
              </div>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: BIL.inkDim, letterSpacing: "0.06em" }}>{b.req}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CommentaireBlock() {
  return (
    <div style={{ background: BIL.card, border: `1px solid ${BIL.hair}`, padding: "22px 26px", marginBottom: 4 }}>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: BIL.accent, letterSpacing: "0.22em", marginBottom: 10 }}>VOTRE COMMENTAIRE</div>
      <p style={{ margin: 0, marginBottom: 14, fontSize: 13, color: BIL.inkSoft, lineHeight: 1.5 }}>
        Un retour sur votre expérience ? Au plaisir de vous lire pour améliorer votre immersion dans notre univers.
      </p>
      <textarea
        placeholder="Ce qui vous a marqué, ce qui a manqué, une suggestion…"
        style={{
          width: "100%", height: 96, padding: 14,
          border: `1px solid ${BIL.hair}`, background: "#fff",
          fontFamily: "inherit", fontSize: 13, color: BIL.ink,
          boxSizing: "border-box", resize: "vertical", marginBottom: 12,
        }}
      />
      <button style={{
        background: BIL.ink, color: "#fff", border: "none",
        padding: "12px 22px", fontFamily: "inherit", fontSize: 13, fontWeight: 500,
        cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 10,
      }}>Envoyer mon commentaire →</button>
    </div>
  );
}

function MissingBadgesBlockMini({ scale = 0.5 }) {
  const s = (v) => v * scale;
  const [open, setOpen] = React.useState(true);
  return (
    <div style={{ background: BIL.card, border: `1px dashed ${BIL.inkDim}`, padding: `${s(16)}px ${s(20)}px`, marginBottom: s(16) }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", background: "transparent", border: "none", cursor: "pointer",
        fontFamily: "'IBM Plex Mono', monospace", fontSize: s(13), color: BIL.accent,
        letterSpacing: "0.22em", padding: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: s(10),
      }}>
        {open ? "MASQUER LES BADGES MANQUANTS" : "VOIR LES BADGES MANQUANTS"}
        <span style={{ display: "inline-block", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.3s" }}>▾</span>
      </button>
      {open && (
        <div style={{ marginTop: s(12), display: "flex", flexDirection: "column", gap: s(6) }}>
          {MISSING_BADGES.map(b => (
            <div key={b.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: `${s(10)}px ${s(14)}px`, background: "#fff" }}>
              <div style={{ display: "flex", alignItems: "center", gap: s(10) }}>
                <Stars n={0} total={3} size={s(14)} color={BIL.inkDim} />
                <span style={{ fontSize: s(13), color: BIL.ink }}>{b.name}</span>
              </div>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: s(10), color: BIL.inkDim, letterSpacing: "0.06em" }}>{b.req}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CommentaireBlockMini({ scale = 0.5 }) {
  const s = (v) => v * scale;
  return (
    <div style={{ background: BIL.card, border: `1px solid ${BIL.hair}`, padding: `${s(20)}px ${s(24)}px`, marginBottom: s(8) }}>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: s(10), color: BIL.accent, letterSpacing: "0.22em", marginBottom: s(8) }}>VOTRE COMMENTAIRE</div>
      <p style={{ margin: 0, marginBottom: s(12), fontSize: s(12), color: BIL.inkSoft, lineHeight: 1.5 }}>
        Un retour sur votre expérience ?
      </p>
      <textarea placeholder="Ce qui vous a marqué…" style={{
        width: "100%", height: s(64), padding: s(12),
        border: `1px solid ${BIL.hair}`, background: "#fff",
        fontFamily: "inherit", fontSize: s(11), color: BIL.ink,
        boxSizing: "border-box", resize: "none", marginBottom: s(10),
      }} />
      <button style={{
        background: BIL.ink, color: "#fff", border: "none",
        padding: `${s(10)}px ${s(18)}px`, fontFamily: "inherit", fontSize: s(11), fontWeight: 500,
        cursor: "pointer",
      }}>Envoyer mon commentaire →</button>
    </div>
  );
}

// ─── DESKTOP V3 — Receipt / ticket éditorial ───
function ResultsDesktopV3() {
  return (
    <div style={{
      width: 1440, height: 900,
      background: `linear-gradient(180deg, ${BIL.bg} 0%, ${BIL.bgSoft} 100%)`,
      overflow: "auto", fontFamily: "'IBM Plex Sans', sans-serif",
      color: BIL.ink,
      padding: "60px 0",
      boxSizing: "border-box",
    }}>
      <div style={{
        maxWidth: 580, margin: "0 auto",
        background: BIL.cardHi,
        boxShadow: "0 30px 80px -20px rgba(0,0,0,0.18)",
        padding: "44px 56px 36px",
        position: "relative",
      }}>
        {/* Top deco */}
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 9,
          color: BIL.inkDim, letterSpacing: "0.25em",
          textAlign: "center", marginBottom: 4,
        }}>METAGORA · HERMÈS PARFUM FR-01</div>
        <div style={{ borderTop: `1px solid ${BIL.hair}`, margin: "12px 0 28px" }} />

        <h1 style={{
          margin: 0, marginBottom: 8, textAlign: "center",
          fontWeight: 600, fontSize: 34, letterSpacing: "-0.02em",
        }}>Bravo Zina.</h1>
        <p style={{
          margin: 0, marginBottom: 28, textAlign: "center",
          fontSize: 13, color: BIL.inkSoft,
        }}>Démo terminée le 15 janvier 2025 · 18:42</p>

        {/* Stats grid */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18,
          paddingBottom: 22, marginBottom: 22,
          borderBottom: `1px dashed ${BIL.hair}`,
        }}>
          {STATS.map(st => (
            <div key={st.l} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: BIL.inkSoft, letterSpacing: "0.15em" }}>{st.l}</span>
              <span style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em" }}>{st.v}</span>
            </div>
          ))}
        </div>

        {/* Phase rows */}
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
          color: BIL.accent, letterSpacing: "0.2em", marginBottom: 14,
        }}>MAÎTRISE PAR PHASE</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 22, paddingBottom: 22, borderBottom: `1px dashed ${BIL.hair}` }}>
          {PHASES.map(p => (
            <div key={p.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{p.name}</div>
                <div style={{ fontSize: 10, color: BIL.inkDim, marginTop: 2, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.08em" }}>{p.attempts.toUpperCase()}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Stars n={p.stars} size={13} />
                <span style={{ fontSize: 11, color: BIL.accent, fontWeight: 500, minWidth: 96, textAlign: "right" }}>{p.badge}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Featured badge */}
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
          color: BIL.accent, letterSpacing: "0.2em", marginBottom: 12,
        }}>BADGE DÉBLOQUÉ</div>
        <div style={{
          background: BIL.bg, padding: "20px 22px", marginBottom: 22,
          display: "flex", alignItems: "center", gap: 18,
          paddingBottom: 22,
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            background: BIL.accent, display: "grid", placeItems: "center",
            color: "#fff", flexShrink: 0,
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: "-0.01em" }}>Initié le produit</div>
            <div style={{ fontSize: 11, color: BIL.inkDim, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em", marginTop: 2 }}>NIVEAU 1 · 10 ERREURS</div>
          </div>
        </div>

        {/* Tips */}
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
          color: BIL.accent, letterSpacing: "0.2em", marginBottom: 12,
        }}>3 TIPS À RETENIR</div>
        <ol style={{ margin: 0, padding: 0, listStyle: "none", marginBottom: 28 }}>
          {TIPS.map((t, i) => (
            <li key={i} style={{
              display: "flex", gap: 14, padding: "10px 0",
              borderBottom: i < TIPS.length - 1 ? `1px dashed ${BIL.hair}` : "none",
            }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: BIL.accent, fontWeight: 600, minWidth: 18 }}>0{i+1}</span>
              <span style={{ fontSize: 13, lineHeight: 1.55, color: BIL.ink, textWrap: "pretty" }}>{t.txt}</span>
            </li>
          ))}
        </ol>

        <button style={{
          width: "100%", padding: "16px",
          background: BIL.ink, color: "#fff", border: "none",
          fontSize: 13, fontWeight: 500, letterSpacing: "0.2em",
          cursor: "pointer", fontFamily: "inherit",
        }}>RECOMMENCER LA DÉMO →</button>

        <div style={{ borderTop: `1px solid ${BIL.hair}`, margin: "24px 0 12px" }} />
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 9,
          color: BIL.inkDim, letterSpacing: "0.2em",
          textAlign: "center",
        }}>FIN DU PARCOURS · 15.01.2025</div>
      </div>
    </div>
  );
}

// ─── MOBILE V1 — Liste sobre scrollable ───
function ResultsMobileV1() {
  return (
    <PhoneFrame>
      <div style={{ padding: "20px 18px 32px" }}>
        <BilHeader scale={0.7} />
        <div style={{
          background: BIL.card, padding: "12px 14px", marginBottom: 8,
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          border: `1px solid ${BIL.hair}`,
        }}>
          {STATS.map((st, i) => (
            <div key={st.l} style={{
              textAlign: "center",
              borderLeft: i > 0 ? `1px solid ${BIL.hair}` : "none",
            }}>
              <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em" }}>{st.v}</div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 7, color: BIL.inkDim, letterSpacing: "0.15em" }}>{st.l}</div>
            </div>
          ))}
        </div>

        {/* Badge */}
        <div style={{ background: BIL.card, padding: "14px 16px", marginBottom: 8, border: `1px solid ${BIL.hair}`, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: BIL.accent, display: "grid", placeItems: "center", color: "#fff", flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9" /></svg>
          </div>
          <div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 7, color: BIL.accent, letterSpacing: "0.18em", marginBottom: 1 }}>BADGE · NIV. 1</div>
            <div style={{ fontSize: 13, fontWeight: 500 }}>Initié le produit</div>
          </div>
        </div>

        <MobileSectionHead title="Maîtrise par phase" />
        <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 12 }}>
          {PHASES.map(p => (
            <div key={p.name} style={{ background: BIL.card, padding: "10px 14px", border: `1px solid ${BIL.hair}`, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 500 }}>{p.name}</div>
                <div style={{ fontSize: 9, color: BIL.inkDim, marginTop: 1, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.08em" }}>{p.attempts}</div>
              </div>
              <Stars n={p.stars} size={11} />
              <div style={{ fontSize: 9, color: BIL.accent, fontWeight: 500, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.06em" }}>{p.badge}</div>
            </div>
          ))}
        </div>

        <MobileSectionHead title="3 tips à retenir" />
        <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 14 }}>
          {TIPS.map((t, i) => (
            <div key={i} style={{ background: BIL.card, padding: "10px 14px", borderLeft: `2px solid ${BIL.accent}` }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 8, color: BIL.accent, fontWeight: 600 }}>0{i+1}</span>
                <span style={{ fontSize: 10, lineHeight: 1.5, color: BIL.ink, textWrap: "pretty" }}>{t.txt}</span>
              </div>
            </div>
          ))}
        </div>

        <button style={{
          width: "100%", padding: "12px",
          background: BIL.ink, color: "#fff", border: "none",
          fontSize: 10, fontWeight: 500, letterSpacing: "0.18em",
          cursor: "pointer", fontFamily: "inherit",
        }}>RECOMMENCER →</button>
      </div>
    </PhoneFrame>
  );
}

// ─── MOBILE V2 — Stats premium côte à côte ───
function ResultsMobileV2() {
  return (
    <PhoneFrame>
      <div style={{ padding: "20px 16px 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 16, paddingTop: 12 }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 8, color: BIL.accent, letterSpacing: "0.22em", marginBottom: 6 }}>DÉMO TERMINÉE</div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em" }}>Bravo Zina.</h1>
        </div>

        {/* Hero badge */}
        <div style={{
          background: BIL.accent, color: "#fff", padding: "16px 18px", marginBottom: 8,
          display: "flex", alignItems: "center", gap: 14,
        }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.16)", display: "grid", placeItems: "center", flexShrink: 0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9" /></svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 8, opacity: 0.85, letterSpacing: "0.18em", marginBottom: 2 }}>BADGE · NIVEAU 1</div>
            <div style={{ fontSize: 16, fontWeight: 500, letterSpacing: "-0.01em" }}>Initié le produit</div>
          </div>
          <Stars n={3} size={11} color="#fff" />
        </div>

        {/* Stats 2x2 grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, marginBottom: 8 }}>
          {STATS.map(st => (
            <div key={st.l} style={{ background: BIL.card, padding: "12px 14px", border: `1px solid ${BIL.hair}` }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 7, color: BIL.inkDim, letterSpacing: "0.18em", marginBottom: 4 }}>{st.l}</div>
              <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>{st.v}</div>
            </div>
          ))}
        </div>

        {/* Phases with bars */}
        <div style={{ background: BIL.card, padding: "14px 16px", marginBottom: 8, border: `1px solid ${BIL.hair}` }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 7, color: BIL.accent, letterSpacing: "0.2em", marginBottom: 10 }}>MAÎTRISE</div>
          {PHASES.map((p, i) => (
            <div key={p.name} style={{ marginBottom: i < PHASES.length - 1 ? 10 : 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 500 }}>{p.name}</span>
                <Stars n={p.stars} size={10} />
              </div>
              <div style={{ height: 3, background: BIL.bgSoft, marginBottom: 3 }}>
                <div style={{ height: 3, width: `${(p.stars/3)*100}%`, background: BIL.accent }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 8, color: BIL.inkDim, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.06em" }}>{p.attempts}</span>
                <span style={{ fontSize: 8, color: BIL.accent, fontWeight: 500 }}>{p.badge}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Tips l'un en dessous de l'autre */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 7, color: BIL.accent, letterSpacing: "0.2em", marginBottom: 6 }}>3 TIPS À RETENIR</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {TIPS.map((t, i) => (
              <div key={i} style={{ background: BIL.card, padding: "10px 12px", borderLeft: `2px solid ${BIL.accent}`, display: "flex", gap: 10 }}>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: BIL.accent, fontWeight: 600, minWidth: 16 }}>0{i+1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, lineHeight: 1.5, color: BIL.ink, textWrap: "pretty", marginBottom: 3 }}>« {t.txt} »</div>
                  <div style={{ fontSize: 7.5, color: BIL.inkDim, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em" }}>{t.phase.toUpperCase()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges manquants */}
        <MissingBadgesBlockMini scale={0.55} />

        {/* Commentaire */}
        <CommentaireBlockMini scale={0.55} />

        {/* Recommencer */}
        <div style={{ textAlign: "center", marginTop: 14 }}>
          <button style={{
            padding: "10px 30px", background: "transparent", border: `1px solid ${BIL.ink}`, color: BIL.ink,
            fontSize: 9, fontWeight: 500, letterSpacing: "0.2em",
            cursor: "pointer", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 8,
          }}>↻  RECOMMENCER</button>
        </div>
      </div>
    </PhoneFrame>
  );
}

// ─── MOBILE V3 — Receipt minimal ───
function ResultsMobileV3() {
  return (
    <PhoneFrame>
      <div style={{
        padding: "32px 24px 28px",
        background: BIL.cardHi,
        margin: "20px 30px",
        boxShadow: "0 8px 24px -8px rgba(0,0,0,0.15)",
      }}>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 7, color: BIL.inkDim, letterSpacing: "0.25em", textAlign: "center", marginBottom: 4 }}>METAGORA · HERMÈS</div>
        <div style={{ borderTop: `1px solid ${BIL.hair}`, margin: "8px 0 16px" }} />

        <h1 style={{ margin: 0, marginBottom: 4, textAlign: "center", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>Bravo Zina.</h1>
        <p style={{ margin: 0, marginBottom: 18, textAlign: "center", fontSize: 9, color: BIL.inkSoft, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.12em" }}>15.01.2025 · 18:42</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingBottom: 14, marginBottom: 14, borderBottom: `1px dashed ${BIL.hair}` }}>
          {STATS.map(st => (
            <div key={st.l} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 8, color: BIL.inkSoft, letterSpacing: "0.14em" }}>{st.l}</span>
              <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em" }}>{st.v}</span>
            </div>
          ))}
        </div>

        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 7, color: BIL.accent, letterSpacing: "0.2em", marginBottom: 8 }}>MAÎTRISE</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingBottom: 14, marginBottom: 14, borderBottom: `1px dashed ${BIL.hair}` }}>
          {PHASES.map(p => (
            <div key={p.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 11, fontWeight: 500 }}>{p.name}</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <Stars n={p.stars} size={10} />
                <span style={{ fontSize: 9, color: BIL.accent, fontWeight: 500, minWidth: 70, textAlign: "right" }}>{p.badge}</span>
              </span>
            </div>
          ))}
        </div>

        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 7, color: BIL.accent, letterSpacing: "0.2em", marginBottom: 8 }}>BADGE · NIV. 1</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 14, marginBottom: 14, borderBottom: `1px dashed ${BIL.hair}` }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: BIL.accent, display: "grid", placeItems: "center", color: "#fff", flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9" /></svg>
          </div>
          <div style={{ fontSize: 12, fontWeight: 500 }}>Initié le produit</div>
        </div>

        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 7, color: BIL.accent, letterSpacing: "0.2em", marginBottom: 8 }}>3 TIPS</div>
        <ol style={{ margin: 0, padding: 0, listStyle: "none", marginBottom: 18 }}>
          {TIPS.map((t, i) => (
            <li key={i} style={{ display: "flex", gap: 8, padding: "6px 0", borderBottom: i < TIPS.length - 1 ? `1px dashed ${BIL.hair}` : "none" }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 8, color: BIL.accent, fontWeight: 600, minWidth: 14 }}>0{i+1}</span>
              <span style={{ fontSize: 10, lineHeight: 1.45, color: BIL.ink, textWrap: "pretty" }}>{t.txt}</span>
            </li>
          ))}
        </ol>

        <button style={{ width: "100%", padding: "10px", background: BIL.ink, color: "#fff", border: "none", fontSize: 9, fontWeight: 500, letterSpacing: "0.2em", cursor: "pointer", fontFamily: "inherit" }}>RECOMMENCER →</button>
      </div>
    </PhoneFrame>
  );
}

function MobileSectionHead({ title }) {
  return (
    <h2 style={{ margin: "12px 0 6px", fontSize: 12, fontWeight: 500, letterSpacing: "-0.01em", color: BIL.ink }}>{title}</h2>
  );
}

function PhoneFrame({ children }) {
  return (
    <div style={{
      width: 844, height: 390, borderRadius: 36, overflow: "hidden",
      border: "8px solid #1a1a1a", boxSizing: "border-box",
      position: "relative", background: BIL.bg,
    }}>
      <div style={{
        position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)",
        width: 110, height: 26, background: "#000", borderRadius: 14, zIndex: 50,
      }} />
      <div style={{ position: "absolute", inset: 0, overflow: "auto", fontFamily: "'IBM Plex Sans', sans-serif", color: BIL.ink }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

window.ResultsDesktopV1 = ResultsDesktopV1;
window.ResultsDesktopV2 = ResultsDesktopV2;
window.ResultsDesktopV3 = ResultsDesktopV3;
window.ResultsMobileV1 = ResultsMobileV1;
window.ResultsMobileV2 = ResultsMobileV2;
window.ResultsMobileV3 = ResultsMobileV3;
