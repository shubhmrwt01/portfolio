import React, { useEffect, useRef, useState, useCallback } from "react";
import { FaMedal, FaTrophy, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { SiLeetcode, SiCodechef } from "react-icons/si";
import CountUpModule from "react-countup";
import { achievements } from "../constants";

const CountUp = CountUpModule.default ?? CountUpModule;

const LEETCODE_USERNAME = "shubhmrwt01";
const LEETCODE_URL = `https://leetcode.com/u/${LEETCODE_USERNAME}/`;
const CODECHEF_URL = `https://www.codechef.com/users/${LEETCODE_USERNAME}`;

// Primary: actively maintained, returns { totalSolved, easySolved,
// mediumSolved, hardSolved, ranking, ... }
const STATS_API_PRIMARY = `https://leetcode-stats.tashif.codes/${LEETCODE_USERNAME}`;
// Fallback: used only if the primary is unreachable. Different response
// shape, normalized in fetchLeetCodeStats() below.
const STATS_API_FALLBACK = `https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/solved`;

const CACHE_KEY = "leetcode-stats-cache";

// Cache is read regardless of age — if the live APIs are down, stale data
// beats no data. Freshness is only used to decide the "Live" vs "Cached"
// badge and the "updated Xh ago" captions, never to hide the numbers.
function readCache() {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
  } catch {
    return null;
  }
}

function writeCache(partial) {
  try {
    const existing = readCache() || {};
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ ...existing, ...partial }),
    );
  } catch {
    /* storage full or unavailable — fail silently, cache is best-effort */
  }
}

function formatRelativeTime(timestamp) {
  if (!timestamp) return null;
  const diffMs = Date.now() - timestamp;
  const minutes = Math.round(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}

async function fetchLeetCodeStats() {
  // Try the primary source first.
  try {
    const res = await fetch(STATS_API_PRIMARY);
    if (!res.ok) throw new Error("primary bad response");
    const data = await res.json();
    if (data.status && data.status !== "success")
      throw new Error("primary error status");
    return {
      totalSolved: data.totalSolved,
      easySolved: data.easySolved,
      mediumSolved: data.mediumSolved,
      hardSolved: data.hardSolved,
      ranking: data.ranking,
    };
  } catch {
    // Fall through to the backup source.
  }

  // Backup source, different field names — normalize them here.
  const res = await fetch(STATS_API_FALLBACK);
  if (!res.ok) throw new Error("fallback bad response");
  const data = await res.json();
  return {
    totalSolved: data.solvedProblem,
    easySolved: data.easySolved,
    mediumSolved: data.mediumSolved,
    hardSolved: data.hardSolved,
    ranking: undefined, // not provided by this endpoint
  };
}

// Contest rating + rating-over-time history. Only alfa-leetcode-api exposes
// this (LeetCode itself has no public contest API), so there's no fallback
// source here — if it's unreachable the graph just doesn't render.
const CONTEST_API = `https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/contest`;

async function fetchContestData() {
  const res = await fetch(CONTEST_API);
  if (!res.ok) throw new Error("contest bad response");
  const data = await res.json();

  // The field name has shifted between versions of this API over time,
  // so check both.
  const raw = data.contestParticipation || data.contestHistory || [];

  const history = raw
    .filter((c) => c && (c.attended === undefined || c.attended))
    .map((c) => ({
      title: c.contest?.title || c.title || "Contest",
      rating: Math.round(c.rating ?? 0),
      ranking: c.ranking,
    }))
    .filter((c) => c.rating > 0);

  return {
    currentRating: Math.round(
      data.contestRating ?? history[history.length - 1]?.rating ?? 0,
    ),
    globalRanking: data.contestGlobalRanking,
    topPercentage: data.contestTopPercentage,
    attended: data.contestAttend ?? history.length,
    history,
  };
}

/* ---------------------------------------------------------
   Pointer-driven 3D tilt (lightweight, no extra dependency)
--------------------------------------------------------- */
function useTilt(strength = 10) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const onMouseMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      setStyle({
        transform: `perspective(900px) rotateY(${px * strength}deg) rotateX(${
          -py * strength
        }deg) translateZ(10px)`,
      });
    },
    [strength],
  );

  const onMouseLeave = useCallback(() => {
    setStyle({
      transform:
        "perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0px)",
    });
  }, []);

  return { ref, style, onMouseMove, onMouseLeave };
}

/* ---------------------------------------------------------
   Achievement card
--------------------------------------------------------- */
function AchievementCard({ data }) {
  const { ref, style, onMouseMove, onMouseLeave } = useTilt(8);

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ ...style, "--accent": data.accent }}
      className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-transform duration-200 ease-out will-change-transform"
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at 50% 0%, ${data.accent}22, transparent 70%)`,
        }}
      />

      <span
        className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium tracking-wide"
        style={{ borderColor: `${data.accent}55`, color: data.accent }}
      >
        <FaMedal /> {data.eyebrow}
      </span>

      <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
        <img
          src={data.image}
          alt={data.title}
          className="aspect-[5/3] w-full object-cover"
          loading="lazy"
        />
      </div>

      <h3 className="mt-5 text-2xl font-semibold text-white">{data.title}</h3>
      <p className="text-sm font-medium" style={{ color: data.accent }}>
        {data.subtitle}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-white/60">
        {data.description}
      </p>

      <div className="mt-5 grid grid-cols-3 gap-3">
        {data.stats.map((s) => (
          <div
            key={s.label}
            className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-center"
          >
            <p className="text-lg font-semibold text-white">{s.value}</p>
            <p className="text-[10px] uppercase tracking-wide text-white/40">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   2D contest rating graph — smooth SVG curve with gradient
   fill, per-contest markers, and a hover tooltip. Pure SVG,
   no WebGL, so it stays light and crisp at any size.
--------------------------------------------------------- */
function ContestRatingGraph({ history }) {
  const svgRef = useRef(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(false);
    const id = requestAnimationFrame(() => setAnimated(true));
    return () => cancelAnimationFrame(id);
  }, [history]);

  if (!history || history.length < 2) return null;

  const width = 600;
  const height = 200;
  const padX = 20;
  const padTop = 22;
  const padBottom = 26;

  const ratings = history.map((h) => h.rating);
  const min = Math.min(...ratings);
  const max = Math.max(...ratings);
  const range = Math.max(max - min, 1);

  const points = history.map((h, i) => {
    const x =
      history.length === 1
        ? width / 2
        : padX + (i / (history.length - 1)) * (width - padX * 2);
    const y =
      padTop + (1 - (h.rating - min) / range) * (height - padTop - padBottom);
    return { x, y, ...h };
  });

  const linePath = points.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = points[i - 1];
    const midX = (prev.x + p.x) / 2;
    return `${acc} C ${midX} ${prev.y}, ${midX} ${p.y}, ${p.x} ${p.y}`;
  }, "");

  const floorY = height - padBottom;
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${floorY} L ${points[0].x} ${floorY} Z`;

  const hovered = hoverIndex != null ? points[hoverIndex] : null;

  const handleMove = (e) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * width;
    let closest = 0;
    let closestDist = Infinity;
    points.forEach((p, i) => {
      const d = Math.abs(p.x - relX);
      if (d < closestDist) {
        closestDist = d;
        closest = i;
      }
    });
    setHoverIndex(closest);
  };

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="h-48 w-full sm:h-56"
        onMouseMove={handleMove}
        onMouseLeave={() => setHoverIndex(null)}
      >
        <defs>
          <linearGradient id="ratingFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 0.5, 1].map((f) => (
          <line
            key={f}
            x1={padX}
            x2={width - padX}
            y1={padTop + f * (height - padTop - padBottom)}
            y2={padTop + f * (height - padTop - padBottom)}
            stroke="#ffffff"
            strokeOpacity="0.06"
          />
        ))}

        <path
          d={areaPath}
          fill="url(#ratingFill)"
          style={{
            opacity: animated ? 1 : 0,
            transition: "opacity 0.8s ease-out 0.3s",
          }}
        />

        <path
          d={linePath}
          fill="none"
          stroke="#a78bfa"
          strokeWidth="2.5"
          strokeLinecap="round"
          pathLength="1"
          style={{
            strokeDasharray: 1,
            strokeDashoffset: animated ? 0 : 1,
            transition: "stroke-dashoffset 1.1s ease-out",
          }}
        />

        {hovered && (
          <line
            x1={hovered.x}
            x2={hovered.x}
            y1={padTop}
            y2={floorY}
            stroke="#ffffff"
            strokeOpacity="0.15"
          />
        )}

        {points.map((p, i) => {
          const isLast = i === points.length - 1;
          const prev = points[i - 1];
          const rising = prev ? p.rating >= prev.rating : true;
          const color = isLast ? "#facc15" : rising ? "#4ade80" : "#f87171";
          return (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={hoverIndex === i ? 5.5 : isLast ? 4.5 : 3}
              fill={color}
              stroke="#05070c"
              strokeWidth="1.5"
              className="cursor-pointer transition-[r] duration-150"
            />
          );
        })}
      </svg>

      {hovered && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+10px)] whitespace-nowrap rounded-lg border border-white/10 bg-[#0b0e14] px-3 py-2 text-xs shadow-xl"
          style={{
            left: `${(hovered.x / width) * 100}%`,
            top: `${(hovered.y / height) * 100}%`,
          }}
        >
          <p className="max-w-[160px] truncate font-medium text-white/90">
            {hovered.title}
          </p>
          <p className="mt-0.5 font-mono text-[#a78bfa]">
            {hovered.rating} rating
          </p>
          {hovered.ranking && (
            <p className="text-white/40">Rank #{hovered.ranking}</p>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------
   Difficulty breakdown — segmented bar instead of four
   disconnected boxes, so the proportions read at a glance.
--------------------------------------------------------- */
function DifficultyBar({ stats }) {
  const segments = [
    { key: "easySolved", color: "#4ade80", label: "Easy" },
    { key: "mediumSolved", color: "#facc15", label: "Medium" },
    { key: "hardSolved", color: "#f87171", label: "Hard" },
  ];
  const total =
    stats.totalSolved ??
    segments.reduce((sum, s) => sum + (stats[s.key] || 0), 0) ??
    0;

  return (
    <div>
      <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-white/5">
        {segments.map((s) => {
          const value = stats[s.key] || 0;
          const pct = total > 0 ? (value / total) * 100 : 0;
          return (
            <div
              key={s.key}
              style={{ width: `${pct}%`, backgroundColor: s.color }}
              className="h-full transition-[width] duration-700 ease-out"
            />
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        {segments.map((s) => (
          <div key={s.key} className="flex items-center gap-1.5 text-xs">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: s.color }}
            />
            <span className="text-white/50">{s.label}</span>
            <span className="font-mono text-white/85">
              {stats[s.key] != null ? (
                <CountUp
                  key={`${s.key}-${stats[s.key]}`}
                  end={stats[s.key]}
                  duration={1}
                />
              ) : (
                "—"
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-2.5 w-full animate-pulse rounded-full bg-white/5" />
      <div className="flex gap-5">
        <div className="h-3 w-14 animate-pulse rounded bg-white/5" />
        <div className="h-3 w-16 animate-pulse rounded bg-white/5" />
        <div className="h-3 w-14 animate-pulse rounded bg-white/5" />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   LeetCode live stats panel
--------------------------------------------------------- */
function LeetCodeStats() {
  const [stats, setStats] = useState(null);
  const [statsUpdatedAt, setStatsUpdatedAt] = useState(null);
  const [statsStale, setStatsStale] = useState(false);
  const [status, setStatus] = useState("loading"); // loading | ok | error

  const [contest, setContest] = useState(null);
  const [contestUpdatedAt, setContestUpdatedAt] = useState(null);
  const [contestStale, setContestStale] = useState(false);
  const [contestStatus, setContestStatus] = useState("loading"); // loading | ok | error

  useEffect(() => {
    let cancelled = false;

    async function load() {
      // 1. Paint instantly from cache, whatever its age — better a stale
      // number than a blank card while we find out if the API is down.
      const cached = readCache();
      if (cached?.stats) {
        setStats(cached.stats);
        setStatsUpdatedAt(cached.statsSavedAt ?? null);
        setStatus("ok");
      }
      if (cached?.contest?.history?.length > 1) {
        setContest(cached.contest);
        setContestUpdatedAt(cached.contestSavedAt ?? null);
        setContestStatus("ok");
      }

      // 2. Try a fresh fetch. Success replaces the cache and clears the
      // stale flag; failure just leaves the cached values on screen and
      // marks them stale instead of wiping them out.
      const [statsResult, contestResult] = await Promise.allSettled([
        fetchLeetCodeStats(),
        fetchContestData(),
      ]);
      if (cancelled) return;

      if (statsResult.status === "fulfilled") {
        const now = Date.now();
        setStats(statsResult.value);
        setStatsUpdatedAt(now);
        setStatsStale(false);
        setStatus("ok");
        writeCache({ stats: statsResult.value, statsSavedAt: now });
      } else if (cached?.stats) {
        setStatsStale(true);
      } else {
        setStatus("error");
      }

      if (
        contestResult.status === "fulfilled" &&
        contestResult.value.history.length > 1
      ) {
        const now = Date.now();
        setContest(contestResult.value);
        setContestUpdatedAt(now);
        setContestStale(false);
        setContestStatus("ok");
        writeCache({ contest: contestResult.value, contestSavedAt: now });
      } else if (cached?.contest?.history?.length > 1) {
        setContestStale(true);
      } else {
        setContestStatus("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const history = contest?.history ?? [];
  const maxRating = history.length
    ? Math.max(...history.map((h) => h.rating))
    : null;
  const trend =
    history.length >= 2
      ? history[history.length - 1].rating - history[history.length - 2].rating
      : null;

  const isOffline =
    status === "error" && contestStatus === "error" && !stats && !contest;
  const isStale = !isOffline && (statsStale || contestStale);
  const lastUpdatedOverall = [statsUpdatedAt, contestUpdatedAt]
    .filter(Boolean)
    .sort((a, b) => b - a)[0];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6 sm:p-8">
      {/* ambient backdrop — quiet dot grid, no WebGL */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-[#a78bfa]/10 blur-3xl" />

      {/* Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
        {isOffline ? (
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-[11px] font-medium tracking-wide text-white/40">
            <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
            <SiLeetcode /> LEETCODE &middot; OFFLINE
          </span>
        ) : isStale ? (
          <span
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-[11px] font-medium tracking-wide text-white/50"
            title={
              lastUpdatedOverall
                ? `Last synced ${formatRelativeTime(lastUpdatedOverall)}`
                : undefined
            }
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
            <SiLeetcode /> LEETCODE &middot; CACHED
            {lastUpdatedOverall && (
              <span className="text-white/30">
                &middot; {formatRelativeTime(lastUpdatedOverall)}
              </span>
            )}
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-full border border-yellow-400/40 px-3 py-1 text-[11px] font-medium tracking-wide text-yellow-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-300 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-yellow-300" />
            </span>
            <SiLeetcode /> LEETCODE &middot; LIVE
          </span>
        )}
        <a
          href={LEETCODE_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs transition-all duration-300 hover:bg-white hover:text-black"
        >
          View Profile
        </a>
      </div>

      {/* Contest rating hero */}
      {contestStatus === "loading" && !contest && (
        <div className="relative z-10 mt-6 h-10 w-40 animate-pulse rounded bg-white/5" />
      )}

      {contest && (
        <div className="relative z-10 mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-white/40">
              Contest Rating
              {contestStale && contestUpdatedAt && (
                <span className="normal-case tracking-normal text-white/30">
                  &middot; as of {formatRelativeTime(contestUpdatedAt)}
                </span>
              )}
            </p>
            <div className="flex items-baseline gap-3">
              <p className="bg-gradient-to-r from-[#a78bfa] to-[#facc15] bg-clip-text font-mono text-4xl font-bold text-transparent">
                <CountUp
                  key={`rating-${contest.currentRating}`}
                  end={contest.currentRating}
                  duration={1.4}
                />
              </p>
              {trend !== null && trend !== 0 && (
                <span
                  className={`flex items-center gap-1 text-xs font-medium ${
                    trend > 0 ? "text-[#4ade80]" : "text-[#f87171]"
                  }`}
                >
                  {trend > 0 ? <FaArrowUp /> : <FaArrowDown />}
                  {Math.abs(trend)}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-5 text-center">
            {maxRating && (
              <div>
                <p className="font-mono text-sm text-white/70">
                  <CountUp
                    key={`peak-${maxRating}`}
                    end={maxRating}
                    duration={1.2}
                  />
                </p>
                <p className="text-[10px] uppercase tracking-wide text-white/40">
                  Peak
                </p>
              </div>
            )}
            {contest.attended != null && (
              <div>
                <p className="font-mono text-sm text-white/70">
                  <CountUp
                    key={`attended-${contest.attended}`}
                    end={contest.attended}
                    duration={1}
                  />
                </p>
                <p className="text-[10px] uppercase tracking-wide text-white/40">
                  Contests
                </p>
              </div>
            )}
            {contest.topPercentage != null && (
              <div>
                <p className="font-mono text-sm text-white/70">
                  <CountUp
                    key={`percentile-${contest.topPercentage}`}
                    prefix="Top "
                    end={contest.topPercentage}
                    decimals={1}
                    suffix="%"
                    duration={1.2}
                  />
                </p>
                <p className="text-[10px] uppercase tracking-wide text-white/40">
                  Percentile
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Contest rating graph (2D SVG, hover for details). Renders from
          cached history too — dimmed and labeled, rather than disappearing,
          if the contest API is currently unreachable. */}
      {contestStatus === "ok" && history.length > 1 && (
        <div
          className={`relative z-10 mt-5 rounded-xl border border-white/10 bg-black/30 p-3 transition-opacity duration-300 ${
            contestStale ? "opacity-60" : "opacity-100"
          }`}
        >
          {contestStale && (
            <p className="mb-2 text-center text-[10px] uppercase tracking-wide text-white/30">
              Showing cached data — live graph unavailable
            </p>
          )}
          <ContestRatingGraph history={history} />
        </div>
      )}
      {contestStatus === "error" && (
        <p className="relative z-10 mt-4 text-center text-xs text-white/30">
          Contest rating graph is temporarily unavailable.
        </p>
      )}

      {/* Divider */}
      <div className="relative z-10 my-7 h-px w-full bg-white/10" />

      {/* Problems solved */}
      <div className="relative z-10">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-white/40">
            Problems Solved
            {statsStale && statsUpdatedAt && (
              <span className="normal-case tracking-normal text-white/30">
                &middot; as of {formatRelativeTime(statsUpdatedAt)}
              </span>
            )}
          </p>
          {stats?.totalSolved != null && (
            <p className="font-mono text-2xl font-semibold text-white">
              <CountUp
                key={`total-${stats.totalSolved}`}
                end={stats.totalSolved}
                duration={1.4}
              />
            </p>
          )}
        </div>

        <div
          className={`mt-3 transition-opacity duration-300 ${
            statsStale ? "opacity-60" : "opacity-100"
          }`}
        >
          {status === "loading" && !stats && <StatsSkeleton />}

          {status === "error" && !stats && (
            <p className="text-sm text-white/40">
              Live stats are temporarily unavailable.{" "}
              <a
                href={LEETCODE_URL}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                View profile directly
              </a>
              .
            </p>
          )}

          {stats && <DifficultyBar stats={stats} />}
        </div>

        {stats?.ranking && (
          <p
            className={`mt-4 text-xs text-white/40 transition-opacity duration-300 ${
              statsStale ? "opacity-60" : "opacity-100"
            }`}
          >
            Global Ranking&nbsp;
            <span className="font-mono text-white/70">
              <CountUp
                key={`rank-${stats.ranking}`}
                prefix="#"
                end={stats.ranking}
                separator=","
                duration={1.4}
              />
            </span>
          </p>
        )}
      </div>

      {/* CodeChef — small inline note, no separate section */}
      <p className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-1.5 text-center text-lg text-yellow-400">
        <SiCodechef className="text-amber-400" />
        600+ DSA problems solved across LeetCode &amp;
        <a
          href={CODECHEF_URL}
          target="_blank"
          rel="noreferrer"
          className=" underline underline-offset-2 hover:text-white"
        >
          CodeChef
        </a>
      </p>
    </div>
  );
}

/* ---------------------------------------------------------
   Section
--------------------------------------------------------- */
const AchievementSection = () => {
  return (
    <section id="achievements" className="relative bg-[#05070c] px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-[11px] font-medium tracking-wide text-white/60">
          <FaTrophy /> ACHIEVEMENTS
        </span>
        <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
          Recognition & Milestones
        </h2>
        <p className="mt-2 max-w-xl text-sm text-white/50">
          Competitive results and open-source impact, verified end to end.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {achievements.map((item) => (
            <AchievementCard key={item.id} data={item} />
          ))}
        </div>

        <div className="mt-6">
          <LeetCodeStats />
        </div>
      </div>
    </section>
  );
};

export default AchievementSection;
