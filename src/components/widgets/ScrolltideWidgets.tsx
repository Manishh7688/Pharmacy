"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ThermometerSnowflake,
  Radar,
  ShieldCheck,
  Truck,
  Activity,
  FileCheck2,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  Layers,
  Clock,
  MapPin,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* 1. SCROLLTIDE HELIX + BILLET POINTER-REACTIVE 3D HERO STAGE                */
/* -------------------------------------------------------------------------- */
export function MolecularHeroStage() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [activeVial, setActiveVial] = useState<"emerald" | "helix" | "amber">("helix");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setPointer({ x: nx, y: ny });
  };

  const resetPointer = () => setPointer({ x: 0, y: 0 });

  const specs = {
    emerald: {
      code: "VIAL-CRYO // 01",
      title: "Biologics & Insulin Cold-Chain",
      metric: "+2.0°C to +8.0°C",
      sub: "Validated 72-hour thermal transit containers across Upper Assam & hill corridors.",
    },
    helix: {
      code: "HELIX-CORE // 02",
      title: "5,240+ Verified Formulations",
      metric: "100% Batch Traceable",
      sub: "Direct-from-manufacturer procurement from Cipla, Sun Pharma, Dr. Reddy's & Abbott.",
    },
    amber: {
      code: "VIAL-AMBER // 03",
      title: "Critical Care & Antibiotics",
      metric: "< 24h NE Dispatch",
      sub: "Priority hospital & ICU injectable stock held at Pan Bazaar central vault.",
    },
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPointer}
      className="relative w-full rounded-[28px] glass-panel overflow-hidden p-5 sm:p-7 lg:p-8 select-none"
    >
      {/* Top Figma / Scrolltide HUD Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-white/10 text-[11px] font-mono-tech text-[#94A39E]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
          <span>STAGE // HELIX-PHARMA-3D</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-white/50">26.1445° N, 91.7362° E</span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#10B981]/15 border border-[#34D399]/30 text-[#6EE7B7]">
            INTERACTIVE STAGE
          </span>
        </div>
      </div>

      {/* Main 3D-Styled Interactive Stage */}
      <div className="relative h-[290px] sm:h-[340px] w-full rounded-2xl bg-[#040907] border border-white/10 overflow-hidden flex items-center justify-center">
        {/* Ambient Volumetric Glow */}
        <motion.div
          animate={{
            x: pointer.x * -24,
            y: pointer.y * -24,
          }}
          transition={{ type: "spring", stiffness: 90, damping: 20 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 48%, rgba(16, 185, 129, 0.25) 0%, rgba(245, 158, 11, 0.08) 42%, transparent 72%)",
          }}
        />

        {/* Hairline Architectural Grid */}
        <div className="absolute inset-0 scrolltide-grid-overlay opacity-50 pointer-events-none" />

        {/* Interactive SVG Scene */}
        <motion.svg
          viewBox="0 0 720 420"
          className="w-full h-full max-h-[330px]"
          animate={{
            rotateX: pointer.y * -6,
            rotateY: pointer.x * 8,
            x: pointer.x * 12,
            y: pointer.y * 8,
          }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        >
          <defs>
            <linearGradient id="emeraldGlass" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6EE7B7" stopOpacity="0.7" />
              <stop offset="45%" stopColor="#10B981" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#064E3B" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="amberGlass" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#78350F" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="helixStrand" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A7F3D0" />
              <stop offset="50%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>

          {/* Pinned Hairline Callout Lines (Scrolltide Katana / Billet style) */}
          <g stroke="rgba(110, 231, 183, 0.35)" strokeWidth="1" strokeDasharray="3 3">
            <line x1="175" y1="180" x2="70" y2="110" />
            <line x1="360" y1="150" x2="360" y2="55" />
            <line x1="545" y1="200" x2="640" y2="120" />
          </g>

          {/* Left Emerald Cryo Vial */}
          <g
            onClick={() => setActiveVial("emerald")}
            onMouseEnter={() => setActiveVial("emerald")}
            className="cursor-pointer"
            transform="translate(130, 125)"
          >
            <ellipse cx="48" cy="215" rx="46" ry="10" fill="rgba(16, 185, 129, 0.22)" />
            <rect x="20" y="0" width="56" height="14" rx="4" fill="#334155" stroke="#94A3B8" strokeWidth="1" />
            <rect x="28" y="14" width="40" height="12" fill="#1E293B" />
            <rect
              x="6"
              y="26"
              width="84"
              height="176"
              rx="16"
              fill="url(#emeraldGlass)"
              stroke={activeVial === "emerald" ? "#BEF264" : "#6EE7B7"}
              strokeWidth={activeVial === "emerald" ? "2.5" : "1.2"}
            />
            <rect x="16" y="38" width="10" height="150" rx="5" fill="#ffffff" fillOpacity="0.24" />
            <line x1="6" y1="95" x2="90" y2="95" stroke="#A7F3D0" strokeOpacity="0.45" strokeDasharray="4 4" />
            <circle cx="48" cy="60" r="4" fill="#BEF264" />
          </g>

          {/* Center Double Helix */}
          <g
            onClick={() => setActiveVial("helix")}
            onMouseEnter={() => setActiveVial("helix")}
            className="cursor-pointer"
            transform="translate(300, 45)"
          >
            <path
              d="M15,15 C115,75 -15,155 105,225 C195,280 5,330 105,355"
              stroke="url(#helixStrand)"
              strokeWidth={activeVial === "helix" ? "6" : "4.5"}
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M105,15 C5,75 135,155 15,225 C-75,280 115,330 15,355"
              stroke="#34D399"
              strokeOpacity="0.65"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            {[45, 82, 122, 162, 198, 250, 290].map((y, idx) => (
              <g key={idx}>
                <line
                  x1="32"
                  y1={y}
                  x2="88"
                  y2={y}
                  stroke="#A7F3D0"
                  strokeOpacity="0.5"
                  strokeWidth="1.75"
                />
                <circle
                  cx={idx % 2 === 0 ? 32 : 88}
                  cy={y}
                  r="4"
                  fill={idx % 2 === 0 ? "#6EE7B7" : "#FBBF24"}
                />
              </g>
            ))}
          </g>

          {/* Right Amber Critical Care Vial */}
          <g
            onClick={() => setActiveVial("amber")}
            onMouseEnter={() => setActiveVial("amber")}
            className="cursor-pointer"
            transform="translate(495, 140)"
          >
            <ellipse cx="46" cy="198" rx="44" ry="10" fill="rgba(245, 158, 11, 0.2)" />
            <rect x="18" y="0" width="56" height="14" rx="4" fill="#475569" stroke="#CBD5E1" strokeWidth="1" />
            <rect x="26" y="14" width="40" height="12" fill="#1E293B" />
            <rect
              x="4"
              y="26"
              width="84"
              height="160"
              rx="16"
              fill="url(#amberGlass)"
              stroke={activeVial === "amber" ? "#FDE68A" : "#FBBF24"}
              strokeWidth={activeVial === "amber" ? "2.5" : "1.2"}
            />
            <rect x="14" y="38" width="10" height="134" rx="5" fill="#ffffff" fillOpacity="0.22" />
            <circle cx="46" cy="65" r="4" fill="#FDE68A" />
          </g>

          {/* Callout Labels inside SVG */}
          <g className="text-[10px]" fill="#A7F3D0" fontFamily="monospace">
            <rect x="18" y="84" width="118" height="24" rx="6" fill="rgba(5,11,9,0.85)" stroke="rgba(52,211,153,0.4)" />
            <text x="28" y="100">CRYO: +2°C TO +8°C</text>

            <rect x="292" y="26" width="136" height="24" rx="6" fill="rgba(5,11,9,0.85)" stroke="rgba(190,242,100,0.45)" />
            <text x="303" y="42" fill="#BEF264">5,240+ SKUS VERIFIED</text>

            <rect x="572" y="92" width="130" height="24" rx="6" fill="rgba(5,11,9,0.85)" stroke="rgba(251,191,36,0.45)" />
            <text x="582" y="108" fill="#FDE68A">BATCH TRACE: 100%</text>
          </g>
        </motion.svg>

        {/* Bottom Floating Selector Pills */}
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 bg-[#050B09]/90 border border-white/10 rounded-full p-1 backdrop-blur-md">
            {(["emerald", "helix", "amber"] as const).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveVial(key)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  activeVial === key
                    ? "bg-[#10B981] text-[#04100C] font-semibold"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {key === "emerald" ? "01 Cold-Chain" : key === "helix" ? "02 Molecular Core" : "03 ICU & Critical"}
              </button>
            ))}
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono-tech text-white/60">
            <Sparkles className="w-3 h-3 text-[#34D399]" /> HOVER OR CLICK NODES
          </span>
        </div>
      </div>

      {/* Live Selected Node Readout Bar */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeVial}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <div>
            <div className="text-[11px] font-mono-tech text-[#34D399]">{specs[activeVial].code}</div>
            <div className="text-base sm:text-lg font-semibold text-white mt-0.5">{specs[activeVial].title}</div>
            <p className="text-xs sm:text-sm text-[#94A39E] mt-0.5">{specs[activeVial].sub}</p>
          </div>
          <div className="shrink-0 px-4 py-2.5 rounded-2xl bg-[#10B981]/10 border border-[#34D399]/30 text-left sm:text-right">
            <div className="text-[10px] font-mono-tech text-white/60">ACTIVE TELEMETRY</div>
            <div className="text-lg font-semibold text-[#6EE7B7] tabular-nums">{specs[activeVial].metric}</div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. FIGMA LIVE COLD-CHAIN TEMPERATURE CURVE WIDGET (-20°C TO +8°C)          */
/* -------------------------------------------------------------------------- */
const coldZones = [
  {
    id: "biologics",
    label: "Vaccines & Insulins",
    range: "+2.0°C to +8.0°C",
    current: "+4.2°C",
    stability: "99.94%",
    alert: "OPTIMAL",
    points: "M 0,110 C 60,95 120,125 180,102 C 240,80 300,115 360,92 C 420,75 480,105 540,88",
    fillPoints: "M 0,110 C 60,95 120,125 180,102 C 240,80 300,115 360,92 C 420,75 480,105 540,88 L 540,170 L 0,170 Z",
    batches: "412 Active Batches",
  },
  {
    id: "cryo",
    label: "Deep Freeze Biologics",
    range: "-20.0°C to -10.0°C",
    current: "-15.4°C",
    stability: "99.89%",
    alert: "LOCKED",
    points: "M 0,135 C 60,142 120,128 180,138 C 240,145 300,130 360,136 C 420,125 480,140 540,132",
    fillPoints: "M 0,135 C 60,142 120,128 180,138 C 240,145 300,130 360,136 C 420,125 480,140 540,132 L 540,170 L 0,170 Z",
    batches: "96 Cryo Vials",
  },
  {
    id: "ambient",
    label: "Controlled Room Vault",
    range: "+15.0°C to +25.0°C",
    current: "+19.6°C",
    stability: "99.98%",
    alert: "STABLE",
    points: "M 0,68 C 60,62 120,74 180,65 C 240,58 300,70 360,64 C 420,60 480,72 540,62",
    fillPoints: "M 0,68 C 60,62 120,74 180,65 C 240,58 300,70 360,64 C 420,60 480,72 540,62 L 540,170 L 0,170 Z",
    batches: "4,730+ Standard SKUs",
  },
];

export function ColdChainTelemetryWidget() {
  const [selectedZone, setSelectedZone] = useState(0);
  const zone = coldZones[selectedZone];

  return (
    <div className="glass-panel rounded-[28px] p-6 sm:p-8 flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#10B981]/15 border border-[#34D399]/30 flex items-center justify-center">
              <ThermometerSnowflake className="w-4 h-4 text-[#34D399]" />
            </div>
            <div>
              <div className="text-[11px] font-mono-tech text-[#34D399]">COLD-CHAIN TELEMETRY (-20°C TO +25°C)</div>
              <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
                Live Vault Temperature Curve
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/15 border border-[#34D399]/30 text-[11px] font-mono-tech text-[#6EE7B7]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-ping" />
              LIVE SENSOR
            </span>
          </div>
        </div>

        {/* Zone Switcher Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
          {coldZones.map((z, idx) => (
            <button
              key={z.id}
              type="button"
              onClick={() => setSelectedZone(idx)}
              className={`text-left p-3 rounded-2xl border transition-all ${
                selectedZone === idx
                  ? "bg-[#10B981]/15 border-[#34D399]/50 text-white"
                  : "bg-white/[0.02] border-white/10 text-white/65 hover:text-white hover:border-white/20"
              }`}
            >
              <div className="text-[10px] font-mono-tech text-[#34D399]">{z.range}</div>
              <div className="text-xs sm:text-sm font-semibold mt-0.5 truncate">{z.label}</div>
            </button>
          ))}
        </div>

        {/* Interactive SVG Spline Curve */}
        <div className="relative rounded-2xl bg-[#040907] border border-white/10 p-4 overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-semibold text-[#6EE7B7] tabular-nums">{zone.current}</span>
              <span className="text-xs text-[#94A39E]">Current Core Temp</span>
            </div>
            <div className="text-right">
              <span className="px-2.5 py-1 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-[#FDE68A] text-[11px] font-mono-tech">
                {zone.alert} • {zone.stability}
              </span>
            </div>
          </div>

          <svg viewBox="0 0 540 175" className="w-full h-36 sm:h-40 overflow-visible">
            <defs>
              <linearGradient id="curveFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="curveStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="65%" stopColor="#BEF264" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>

            {/* Horizontal Reference Lines */}
            {[40, 85, 130].map((y, i) => (
              <g key={i}>
                <line
                  x1="0"
                  y1={y}
                  x2="540"
                  y2={y}
                  stroke="rgba(255,255,255,0.07)"
                  strokeDasharray="4 4"
                />
              </g>
            ))}

            {/* Animated Fill */}
            <motion.path
              d={zone.fillPoints}
              fill="url(#curveFill)"
              initial={false}
              animate={{ d: zone.fillPoints }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            />

            {/* Animated Line */}
            <motion.path
              d={zone.points}
              fill="none"
              stroke="url(#curveStroke)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={false}
              animate={{ d: zone.points }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            />

            {/* Glowing Data Nodes */}
            <circle cx="180" cy={selectedZone === 0 ? 102 : selectedZone === 1 ? 138 : 65} r="5" fill="#34D399" />
            <circle cx="360" cy={selectedZone === 0 ? 92 : selectedZone === 1 ? 136 : 64} r="5" fill="#BEF264" />
            <circle cx="540" cy={selectedZone === 0 ? 88 : selectedZone === 1 ? 132 : 62} r="6" fill="#F59E0B" />
          </svg>

          <div className="flex justify-between text-[10px] font-mono-tech text-white/40 pt-2 border-t border-white/10">
            <span>00:00 HRS</span>
            <span>06:00 HRS</span>
            <span>12:00 HRS</span>
            <span>18:00 HRS</span>
            <span>NOW (LIVE)</span>
          </div>
        </div>
      </div>

      {/* Footer Meta */}
      <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-[#94A39E]">
        <span>Pan Bazaar Automated IoT Telemetry</span>
        <span className="font-mono-tech text-[#6EE7B7]">{zone.batches}</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. FIGMA NORTHEAST INDIA DISTRIBUTION RADAR WIDGET                         */
/* -------------------------------------------------------------------------- */
const neRoutes = [
  {
    state: "Assam (Guwahati Hub)",
    city: "Pan Bazaar Central Vault",
    sla: "Same-Day (2–6 hrs)",
    clients: "145+ Pharmacies & Hospitals",
    cx: 150,
    cy: 135,
    primary: true,
  },
  {
    state: "Meghalaya",
    city: "Shillong & Tura Corridor",
    sla: "6–12 Hours Express",
    clients: "32+ Healthcare Units",
    cx: 135,
    cy: 162,
  },
  {
    state: "Arunachal Pradesh",
    city: "Itanagar & Tawang Line",
    sla: "18–24 Hours Cold-Van",
    clients: "24+ District Hospitals",
    cx: 195,
    cy: 78,
  },
  {
    state: "Nagaland",
    city: "Dimapur & Kohima Hub",
    sla: "12–18 Hours Express",
    clients: "19+ Medical Stores",
    cx: 215,
    cy: 142,
  },
  {
    state: "Manipur",
    city: "Imphal Supply Line",
    sla: "18–24 Hours Insulated",
    clients: "14+ Institutional Buyers",
    cx: 205,
    cy: 178,
  },
  {
    state: "Mizoram & Tripura",
    city: "Aizawl & Agartala",
    sla: "24–36 Hours Priority",
    clients: "22+ Partner Clinics",
    cx: 165,
    cy: 215,
  },
];

export function NortheastRadarWidget() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeRoute = neRoutes[activeIdx];

  return (
    <div className="glass-panel rounded-[28px] p-6 sm:p-8 flex flex-col justify-between h-full">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#10B981]/15 border border-[#34D399]/30 flex items-center justify-center">
              <Radar className="w-4 h-4 text-[#34D399]" />
            </div>
            <div>
              <div className="text-[11px] font-mono-tech text-[#34D399]">NE INDIA ROUTE RADAR • 8 STATES</div>
              <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
                Regional Supply Corridor Map
              </h3>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-[#10B981]/15 border border-[#34D399]/30 text-[11px] font-mono-tech text-[#6EE7B7]">
            12 ACTIVE ROUTES
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          {/* Radar Visualizer */}
          <div className="md:col-span-6 flex justify-center">
            <div className="relative w-60 h-60 sm:w-64 sm:h-64 rounded-full bg-[#040907] border border-[#34D399]/30 flex items-center justify-center overflow-hidden shadow-inner">
              {/* Rotating Radar Sweep */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background:
                    "conic-gradient(from 0deg, rgba(16, 185, 129, 0.28) 0deg, rgba(16, 185, 129, 0.02) 75deg, transparent 90deg)",
                }}
              />

              <svg viewBox="0 0 300 300" className="w-full h-full relative z-10">
                {/* Concentric Radar Rings */}
                <circle cx="150" cy="150" r="45" stroke="rgba(52,211,153,0.18)" fill="none" strokeDasharray="3 3" />
                <circle cx="150" cy="150" r="85" stroke="rgba(52,211,153,0.18)" fill="none" />
                <circle cx="150" cy="150" r="125" stroke="rgba(52,211,153,0.14)" fill="none" />
                <line x1="150" y1="10" x2="150" y2="290" stroke="rgba(52,211,153,0.12)" />
                <line x1="10" y1="150" x2="290" y2="150" stroke="rgba(52,211,153,0.12)" />

                {/* Route Connections from Guwahati Hub (150, 135) */}
                {neRoutes.slice(1).map((r, i) => (
                  <line
                    key={i}
                    x1="150"
                    y1="135"
                    x2={r.cx}
                    y2={r.cy}
                    stroke={activeIdx === i + 1 ? "#BEF264" : "rgba(52,211,153,0.35)"}
                    strokeWidth={activeIdx === i + 1 ? "2" : "1.2"}
                    strokeDasharray="4 3"
                  />
                ))}

                {/* Interactive State Nodes */}
                {neRoutes.map((r, idx) => {
                  const isSelected = activeIdx === idx;
                  return (
                    <g
                      key={r.state}
                      onClick={() => setActiveIdx(idx)}
                      className="cursor-pointer"
                    >
                      {isSelected && (
                        <circle
                          cx={r.cx}
                          cy={r.cy}
                          r="14"
                          fill="rgba(16, 185, 129, 0.25)"
                        />
                      )}
                      <circle
                        cx={r.cx}
                        cy={r.cy}
                        r={r.primary ? "7" : "5.5"}
                        fill={isSelected ? "#BEF264" : r.primary ? "#34D399" : "#F59E0B"}
                        stroke="#050B09"
                        strokeWidth="2"
                      />
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* State Selector & Telemetry Card */}
          <div className="md:col-span-6 space-y-2.5">
            <div className="text-[11px] font-mono-tech text-[#94A39E] mb-1">SELECT CORRIDOR NODE</div>
            <div className="grid grid-cols-2 gap-1.5">
              {neRoutes.map((r, idx) => (
                <button
                  key={r.state}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`px-3 py-2 rounded-xl text-left text-xs font-medium border transition-all truncate ${
                    activeIdx === idx
                      ? "bg-[#10B981]/20 border-[#34D399]/50 text-white"
                      : "bg-white/[0.02] border-white/10 text-white/65 hover:text-white"
                  }`}
                >
                  {r.state.replace(" (Guwahati Hub)", "")}
                </button>
              ))}
            </div>

            <div className="mt-3 p-4 rounded-2xl bg-[#040907] border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono-tech text-[#34D399]">{activeRoute.city}</span>
                <span className="text-[10px] font-mono-tech text-[#BEF264]">TRANSIT: SAFE</span>
              </div>
              <div className="text-base font-semibold text-white">{activeRoute.state}</div>
              <div className="flex items-center justify-between text-xs text-[#94A39E] pt-1 border-t border-white/10">
                <span>SLA: <strong className="text-white">{activeRoute.sla}</strong></span>
                <span>{activeRoute.clients}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-[#94A39E]">
        <span>GPS + Cold-Box Seal Verification</span>
        <span className="font-mono-tech text-[#6EE7B7]">GUWAHATI CENTRAL HUB</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. SCROLLTIDE STEP ACCORDION (SUPPLY CHAIN PROTOCOL)                       */
/* -------------------------------------------------------------------------- */
const supplySteps = [
  {
    num: "01",
    title: "Authorized Direct Procurement",
    tag: "ZERO MIDDLEMEN • 100% GENUINE",
    desc: "Every formulation is procured directly from C&F depots and top pharmaceutical manufacturers (Sun Pharma, Cipla, Abbott, Dr. Reddy's, Mankind) with digital batch certificates.",
    metrics: ["Batch & CoA Verified", "Direct Depot Pricing", "Zero Counterfeit Risk"],
    highlight: "5,240+ Active Formulations",
  },
  {
    num: "02",
    title: "ISO 9001:2015 Cold-Chain Vaulting",
    tag: "AUTOMATED THERMAL LOGGING",
    desc: "Temperature-sensitive vaccines, insulins, and critical care injectables are stored in 24/7 power-backed +2°C to +8°C and -20°C vaults in Pan Bazaar, Guwahati.",
    metrics: ["24/7 IoT Sensor Logs", "Dual Generator Backup", "FEFO Expiry Tracking"],
    highlight: "99.94% Thermal Stability",
  },
  {
    num: "03",
    title: "Instant GST Billing & Credit Line",
    tag: "FRICTIONLESS B2B SETTLEMENT",
    desc: "Computerized HSN-mapped GST invoicing, transparent trade margins, and flexible monthly credit lines for verified retail pharmacies, nursing homes, and hospitals.",
    metrics: ["Instant e-Way & GST", "30-Day Institutional Credit", "Real-Time Stock Alerts"],
    highlight: "< 15 Min Order Processing",
  },
  {
    num: "04",
    title: "Pan-Northeast Express Dispatch",
    tag: "8 STATES • INSULATED TRANSIT",
    desc: "Same-day dispatch across Guwahati and Lower Assam, and validated insulated transit boxes reaching Upper Assam, Meghalaya, Arunachal, Nagaland, and beyond.",
    metrics: ["Same-Day Guwahati Hub", "Insulated Vaccine Boxes", "Live WhatsApp Tracking"],
    highlight: "250+ Healthcare Partners",
  },
];

export function SupplyChainStepAccordion() {
  const [openStep, setOpenStep] = useState(0);

  return (
    <div className="grid lg:grid-cols-12 gap-6 items-stretch">
      {/* Left Accordion Steps */}
      <div className="lg:col-span-7 space-y-3">
        {supplySteps.map((s, idx) => {
          const isOpen = openStep === idx;
          return (
            <div
              key={s.num}
              onClick={() => setOpenStep(idx)}
              className={`cursor-pointer rounded-3xl border transition-all duration-300 p-5 sm:p-6 ${
                isOpen
                  ? "glass-panel border-[#34D399]/45 bg-[#10B981]/[0.07]"
                  : "bg-white/[0.02] border-white/10 hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-mono-tech text-xs font-semibold border ${
                      isOpen
                        ? "bg-[#10B981] text-[#04100C] border-[#A7F3D0]"
                        : "bg-white/5 text-white/60 border-white/10"
                    }`}
                  >
                    {s.num}
                  </span>
                  <div>
                    <div className="text-[10px] font-mono-tech text-[#34D399]">{s.tag}</div>
                    <h4 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
                      {s.title}
                    </h4>
                  </div>
                </div>
                <ArrowUpRight
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isOpen ? "rotate-45 text-[#34D399]" : "text-white/40"
                  }`}
                />
              </div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 text-sm sm:text-[15px] text-[#C8C6BD] leading-relaxed pl-0 sm:pl-14">
                      {s.desc}
                    </p>
                    <div className="mt-4 pl-0 sm:pl-14 flex flex-wrap gap-2">
                      {s.metrics.map((m) => (
                        <span
                          key={m}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#6EE7B7]"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399]" />
                          {m}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Right Pinned Visual Stage (Scrolltide Step Accordion Preview) */}
      <div className="lg:col-span-5">
        <div className="glass-panel rounded-3xl p-6 sm:p-8 h-full flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#10B981]/15 blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between text-xs font-mono-tech text-[#34D399] pb-4 border-b border-white/10">
              <span>PROTOCOL STEP // {supplySteps[openStep].num} OF 04</span>
              <span>VERIFIED PIPELINE</span>
            </div>

            <div className="my-6 rounded-2xl bg-[#040907] border border-white/10 p-6 relative overflow-hidden">
              <div className="text-[11px] font-mono-tech text-white/50 mb-1">ACTIVE BENCHMARK</div>
              <div className="text-3xl sm:text-4xl font-semibold text-[#6EE7B7] tracking-tight">
                {supplySteps[openStep].highlight}
              </div>
              <p className="mt-2 text-xs text-[#94A39E]">{supplySteps[openStep].title}</p>

              {/* Progress Rail */}
              <div className="mt-6 grid grid-cols-4 gap-2">
                {supplySteps.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i <= openStep ? "bg-[#34D399]" : "bg-white/10"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {supplySteps[openStep].metrics.map((metric, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/10"
                >
                  <span className="text-sm text-white font-medium">{metric}</span>
                  <span className="text-[11px] font-mono-tech text-[#34D399]">ACTIVE</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#94A39E]">
            <span>Drug Control Dept. Assam Licensed</span>
            <span className="font-mono-tech text-white/70">ISO 9001:2015</span>
          </div>
        </div>
      </div>
    </div>
  );
}
