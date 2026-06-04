import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// Sponsor data from the Think Sprint poster
const SPONSORS = [
  {
    id: 1,
    name: "Shri Ram Janaki Sewa Trust",
    tier: "gold",
    logo: null,
    initials: "SRJST",
    description: "Community Welfare",
  },
  {
    id: 2,
    name: "Shri Ram Janki netralay",
    tier: "gold",
    logo: null,
    initials: "MRJ",
    description: "Hospitality Partner",
  },
  {
    id: 3,
    name: "BBD Gorakhpur",
    tier: "title",
    logo: null,
    initials: "BBD",
    description: "Technology Partner",
  },
  {
    id: 4,
    name: "Campusdunia",
    tier: "silver",
    logo: null,
    initials: "CD",
    description: "Education Platform",
  },
  {
    id: 5,
    name: "OpenSky Resorts",
    tier: "silver",
    logo: null,
    initials: "OS",
    description: "Social Welfare",
  },
];

const TIER_CONFIG = {
  title: {
    label: "Title Sponsor",
    color: "#FF6B00",
    glow: "rgba(255,107,0,0.5)",
    size: "large",
    order: 0,
  },
  gold: {
    label: "Gold Sponsor",
    color: "#FFB830",
    glow: "rgba(255,184,48,0.4)",
    size: "medium",
    order: 1,
  },
  silver: {
    label: "Silver Sponsor",
    color: "#C0C0C0",
    glow: "rgba(192,192,192,0.3)",
    size: "small",
    order: 2,
  },
};

// Animated circuit node
function CircuitDot({ x, y, delay }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: "#FF6B00",
        opacity: 0,
        animation: `pulseDot 3s ease-in-out ${delay}s infinite`,
      }}
    />
  );
}

// Individual sponsor card
function SponsorCard({ sponsor, index }) {
  const [hovered, setHovered] = useState(false);
  const tier = TIER_CONFIG[sponsor.tier];
  const isTitle = sponsor.tier === "title";
  const isMedium = sponsor.tier === "gold";

  const cardWidth = isTitle ? 260 : isMedium ? 200 : 170;
  const logoSize = isTitle ? 80 : isMedium ? 64 : 52;
  const fontSize = isTitle ? 15 : isMedium ? 13 : 12;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: cardWidth,
        background: hovered
          ? "rgba(255,107,0,0.07)"
          : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? tier.color : "rgba(255,255,255,0.1)"}`,
        borderRadius: 16,
        padding: isTitle ? "32px 24px" : "24px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        cursor: "default",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: hovered ? `0 12px 40px ${tier.glow}` : "none",
        position: "relative",
        overflow: "hidden",
        animation: `fadeSlideUp 0.6s ease ${index * 0.1}s both`,
      }}
    >
      {/* Corner accent lines */}
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: 20, height: 20,
        borderTop: `2px solid ${tier.color}`,
        borderLeft: `2px solid ${tier.color}`,
        borderRadius: "4px 0 0 0",
        opacity: hovered ? 1 : 0.4,
        transition: "opacity 0.3s",
      }} />
      <div style={{
        position: "absolute", bottom: 0, right: 0,
        width: 20, height: 20,
        borderBottom: `2px solid ${tier.color}`,
        borderRight: `2px solid ${tier.color}`,
        borderRadius: "0 0 4px 0",
        opacity: hovered ? 1 : 0.4,
        transition: "opacity 0.3s",
      }} />

      {/* Tier badge */}
      <div style={{
        background: `${tier.color}20`,
        border: `1px solid ${tier.color}50`,
        borderRadius: 20,
        padding: "3px 12px",
        fontSize: 10,
        fontWeight: 600,
        color: tier.color,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}>
        {tier.label}
      </div>

      {/* Logo circle */}
      <div style={{
        width: logoSize,
        height: logoSize,
        borderRadius: "50%",
        background: `radial-gradient(circle at 35% 35%, ${tier.color}30, ${tier.color}10)`,
        border: `2px solid ${tier.color}60`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: isTitle ? 20 : isMedium ? 16 : 14,
        fontWeight: 700,
        color: tier.color,
        boxShadow: hovered ? `0 0 20px ${tier.glow}` : "none",
        transition: "box-shadow 0.3s",
        fontFamily: "'Orbitron', monospace",
        letterSpacing: "0.05em",
      }}>
        {sponsor.initials}
      </div>

      {/* Name */}
      <div style={{
        fontSize: fontSize,
        fontWeight: 600,
        color: "#FFFFFF",
        textAlign: "center",
        lineHeight: 1.4,
        letterSpacing: "0.02em",
      }}>
        {sponsor.name}
      </div>

      {/* Description */}
      <div style={{
        fontSize: 11,
        color: "rgba(255,255,255,0.45)",
        textAlign: "center",
        letterSpacing: "0.04em",
      }}>
        {sponsor.description}
      </div>
    </div>
  );
}

export default function SponsorsSection() {
  const canvasRef = useRef(null);

  // Draw animated circuit background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let frame = 0;
    let raf;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const lines = Array.from({ length: 18 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      angle: (Math.floor(Math.random() * 4) * 90 * Math.PI) / 180,
      length: 60 + Math.random() * 120,
      speed: 0.3 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame += 0.008;

      lines.forEach((line) => {
        const alpha = 0.04 + 0.04 * Math.sin(frame * line.speed + line.phase);
        ctx.strokeStyle = `rgba(255, 107, 0, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(
          line.x + Math.cos(line.angle) * line.length,
          line.y + Math.sin(line.angle) * line.length
        );
        ctx.stroke();

        // dot at end
        const dotAlpha = 0.08 + 0.08 * Math.sin(frame * line.speed + line.phase);
        ctx.fillStyle = `rgba(255, 107, 0, ${dotAlpha})`;
        ctx.beginPath();
        ctx.arc(
          line.x + Math.cos(line.angle) * line.length,
          line.y + Math.sin(line.angle) * line.length,
          2, 0, Math.PI * 2
        );
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const titleSponsors = SPONSORS.filter((s) => s.tier === "title");
  const goldSponsors = SPONSORS.filter((s) => s.tier === "gold");
  const silverSponsors = SPONSORS.filter((s) => s.tier === "silver");

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;900&family=Rajdhani:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes scanLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes titleGlow {
          0%, 100% { text-shadow: 0 0 20px rgba(255,107,0,0.4), 0 0 40px rgba(255,107,0,0.2); }
          50% { text-shadow: 0 0 30px rgba(255,107,0,0.7), 0 0 60px rgba(255,107,0,0.4); }
        }
        @keyframes borderPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        .sponsor-section * { box-sizing: border-box; }
      `}</style>

      <section
        className="sponsor-section"
        style={{
          background: "#0A0A0A",
          minHeight: "100vh",
          padding: "80px 20px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Rajdhani', sans-serif",
        }}
      >
        {/* Animated circuit canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        />

        {/* Scan line effect */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: 2,
          background: "linear-gradient(90deg, transparent, rgba(255,107,0,0.15), transparent)",
          animation: "scanLine 8s linear infinite",
          pointerEvents: "none",
        }} />

        {/* Radial glow center */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: 600, height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,107,0,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(255,107,0,0.08)",
              border: "1px solid rgba(255,107,0,0.3)",
              borderRadius: 30,
              padding: "6px 20px",
              marginBottom: 20,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF6B00", animation: "pulseDot 2s infinite" }} />
              <span style={{ fontSize: 12, color: "#FF6B00", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}>
                Our Valued Partners
              </span>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF6B00", animation: "pulseDot 2s 1s infinite" }} />
            </div>

            <h2 style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "clamp(28px, 5vw, 52px)",
              fontWeight: 900,
              color: "#FFFFFF",
              margin: "0 0 8px",
              letterSpacing: "0.05em",
              animation: "titleGlow 3s ease-in-out infinite",
            }}>
              OUR <span style={{ color: "#FF6B00" }}>SPONSORS</span>
            </h2>

            <p style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: 15,
              maxWidth: 480,
              margin: "0 auto",
              lineHeight: 1.6,
              letterSpacing: "0.03em",
            }}>
              Powering innovation at Think Sprint — KIPM Innovators Foundation, Gorakhpur
            </p>

            {/* Decorative line */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px auto 0", maxWidth: 300 }}>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,107,0,0.5))" }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", border: "2px solid #FF6B00", animation: "borderPulse 2s infinite" }} />
              <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(255,107,0,0.5), transparent)" }} />
            </div>
          </div>

          {/* Title Sponsor row */}
          {titleSponsors.length > 0 && (
            <div style={{ marginBottom: 48 }}>
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <span style={{
                  fontSize: 11,
                  color: "rgba(255,107,0,0.6)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}>
                  ── Title Sponsor ──
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
                {titleSponsors.map((s, i) => <SponsorCard key={s.id} sponsor={s} index={i} />)}
              </div>
            </div>
          )}

          {/* Gold Sponsors row */}
          {goldSponsors.length > 0 && (
            <div style={{ marginBottom: 48 }}>
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <span style={{
                  fontSize: 11,
                  color: "rgba(255,184,48,0.6)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}>
                  ── Gold Sponsors ──
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
                {goldSponsors.map((s, i) => <SponsorCard key={s.id} sponsor={s} index={i + titleSponsors.length} />)}
              </div>
            </div>
          )}

          {/* Silver Sponsors row */}
          {silverSponsors.length > 0 && (
            <div style={{ marginBottom: 64 }}>
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <span style={{
                  fontSize: 11,
                  color: "rgba(192,192,192,0.5)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}>
                  ── Silver Sponsors ──
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
                {silverSponsors.map((s, i) => (
                  <SponsorCard key={s.id} sponsor={s} index={i + titleSponsors.length + goldSponsors.length} />
                ))}
              </div>
            </div>
          )}

          {/* CTA Banner */}
          <div style={{
            background: "rgba(255,107,0,0.05)",
            border: "1px solid rgba(255,107,0,0.2)",
            borderRadius: 16,
            padding: "32px 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 20,
          }}>
            <div>
              <h3 style={{
                fontFamily: "'Orbitron', monospace",
                color: "#FFFFFF",
                margin: "0 0 6px",
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: "0.04em",
              }}>
                Become a Sponsor
              </h3>
              <p style={{ color: "rgba(255,255,255,0.45)", margin: 0, fontSize: 14 }}>
                Partner with Evolvera Club and connect with the next generation of innovators.
              </p>
            </div>
            <Link
              to="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#FF6B00",
                color: "#000000",
                padding: "12px 28px",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 14,
                textDecoration: "none",
                letterSpacing: "0.05em",
                fontFamily: "'Rajdhani', sans-serif",
                transition: "background 0.2s, transform 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => { e.target.style.background = "#FF8C00"; e.target.style.transform = "scale(1.04)"; }}
              onMouseLeave={e => { e.target.style.background = "#FF6B00"; e.target.style.transform = "scale(1)"; }}
            >
              GET IN TOUCH →
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}