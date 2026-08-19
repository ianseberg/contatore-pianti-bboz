import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Bot, ChevronDown, Copy, RotateCcw, Share2, Sparkles, Trophy, Waves, AlertCircle } from "lucide-react";
import { analyzeLocalAI } from "@/lib/localAI";

/**
 * Design: Albo d’Oro del Dramma — sporting editorial / neo-brutalismo raffinato.
 * Questo file mantiene la classifica come protagonista: tipografia forte, dati leggibili,
 * accento Ruggine del Dramma e interazioni brevi ma rituali.
 */

type Team = { id: number; name: string; short: string };
type Scores = Record<number, number>;

const teams: Team[] = [
  { id: 1, name: "AC BILAN", short: "AB" },
  { id: 2, name: "Livercul", short: "LI" },
  { id: 3, name: "PIERO GORNA FC", short: "PG" },
  { id: 4, name: "DivinCodindio United", short: "DU" },
  { id: 5, name: "Unione Sportiva Triestezza Calcio 2021", short: "UT" },
  { id: 6, name: "Crociati Operai", short: "CO" },
  { id: 7, name: "LaDrogaDaLaDrogaDaje", short: "LD" },
  { id: 8, name: "Sturm Garpez", short: "SG" },
];

const STORAGE_KEY = "bboz-crying-counter-v1";
const REMOTE_SCORES_URL = "https://raw.githubusercontent.com/ianseberg/contatore-pianti-bboz/main/scores.json";

function readScores(): Scores {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

export default function Home() {
  const [scores, setScores] = useState<Scores>(() => readScores());
  const [lastUpdated, setLastUpdated] = useState<string>("Mai");
  const [showReset, setShowReset] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [pulseId, setPulseId] = useState<number | null>(null);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  }, [scores]);

  useEffect(() => {
    let active = true;
    fetch(`${REMOTE_SCORES_URL}?v=${Date.now()}`, { cache: "no-store" })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("scores.json non disponibile")))
      .then((remote) => {
        if (!active || !remote?.teams) return;
        const nextScores = Object.fromEntries(Object.entries(remote.teams).map(([id, team]) => [Number(id), Number((team as { score?: number }).score ?? 0)]));
        setScores(nextScores);
        setLastUpdated(remote.updatedAt ? new Intl.DateTimeFormat("it-IT", { hour: "2-digit", minute: "2-digit" }).format(new Date(remote.updatedAt)) : "Archivio GitHub");
      })
      .catch(() => undefined);
    return () => { active = false; };
  }, []);

  const rankedTeams = useMemo(
    () => [...teams].sort((a, b) => (scores[b.id] ?? 0) - (scores[a.id] ?? 0) || a.id - b.id),
    [scores],
  );
  const totalCrying = Object.values(scores).reduce((total, score) => total + score, 0);
  const leader = rankedTeams[0];
  const leaderScore = scores[leader.id] ?? 0;

  const adjustScore = (id: number, amount: number) => {
    setScores((current) => ({ ...current, [id]: Math.max(0, (current[id] ?? 0) + amount) }));
    setLastUpdated(new Intl.DateTimeFormat("it-IT", { hour: "2-digit", minute: "2-digit" }).format(new Date()));
    setPulseId(id);
    window.setTimeout(() => setPulseId(null), 180);
  };

  const resetScores = () => {
    setScores({});
    setLastUpdated("Mai");
    setShowReset(false);
  };

  const shareText = `CONTATORE DI PIANTI · SERIE BBOZ · LEAGUE TWO\n\n${rankedTeams.map((team, index) => `${index + 1}. ${team.name} — ${scores[team.id] ?? 0} pianti`).join("\n")}\n\nTotale pianti: ${totalCrying}\nOgni lacrima fa classifica.`;
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareEncoded = encodeURIComponent(`${shareText}\n\n${shareUrl}`);

  const copyRanking = async () => {
    await navigator.clipboard?.writeText(shareText);
    setShowShare(false);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#101924] text-[#f4efe5]">
      <div className="relative mx-auto min-h-screen max-w-[1440px] px-5 pb-10 sm:px-8 lg:px-12">
        <div className="pointer-events-none absolute -right-20 top-28 h-80 w-80 rounded-full bg-[#e65c3a]/10 blur-3xl" />
        <header className="relative flex items-center justify-between border-b border-white/15 py-6 lg:py-8">
          <div className="flex items-center gap-3">
            <div className="brand-mark flex h-11 w-11 items-center justify-center rounded-[14px] border border-[#f4efe5]/20 bg-[#e65c3a] shadow-[5px_5px_0_#071019]">
              <div className="relative h-6 w-5 rotate-45 rounded-[55%_55%_55%_0] border-2 border-[#101924] bg-[#f4efe5] after:absolute after:-bottom-1 after:-right-1 after:h-2 after:w-2 after:rounded-full after:bg-[#101924]" />
            </div>
            <div>
              <p className="font-display text-lg font-black tracking-[-0.05em]">BBoz</p>
              <p className="eyebrow text-[#b1bac2]">Lega dei drammi</p>
            </div>
          </div>
          <div className="flex items-center gap-2"><button onClick={() => setShowShare(true)} className="utility-button utility-share" aria-label="Condividi la classifica"><Share2 size={15} /> <span className="hidden sm:inline">Condividi</span></button><button onClick={() => setShowReset(true)} className="utility-button" aria-label="Azzera la classifica"><RotateCcw size={15} /> <span className="hidden sm:inline">Azzera stagione</span></button></div>
        </header>

        <section className="relative grid gap-10 pb-10 pt-14 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16 lg:pb-16 lg:pt-20">
          <div className="max-w-3xl">
            <p className="eyebrow mb-5 flex items-center gap-2 text-[#e65c3a]"><span className="inline-block h-2 w-2 rounded-full bg-[#e65c3a]" /> Classifica ufficiale · League Two</p>
            <h1 className="font-display text-[clamp(3.2rem,9vw,8rem)] font-black leading-[0.86] tracking-[-0.085em] text-[#f4efe5]">Contatore<br /><span className="text-[#e65c3a]">di pianti.</span></h1>
            <p className="mt-8 max-w-xl text-base leading-7 text-[#b1bac2] sm:text-lg">Ogni lacrima fa classifica. Segna il prossimo dramma della Serie BBoz con un semplice <strong className="text-[#f4efe5]">+1</strong>.</p>
          </div>
          <aside className="relative self-end border-l border-[#e65c3a]/60 pl-5 lg:mb-1">
            <p className="eyebrow text-[#b1bac2]">Record della giornata</p>
            <p className="mt-3 font-display text-6xl font-black tracking-[-0.08em] text-[#f4efe5]">{String(totalCrying).padStart(2, "0")}</p>
            <p className="mt-1 text-sm text-[#b1bac2]">pianti registrati in totale</p>
            <div className="mt-7 flex items-center gap-2 text-xs text-[#b1bac2]"><Waves size={15} className="text-[#e65c3a]" /> Ultimo aggiornamento: {lastUpdated}</div>
          </aside>
        </section>

        {/* AI Locale Insights Panel */}
        {(() => {
          const teamsForAI = teams.map(t => ({ ...t, score: scores[t.id] ?? 0 }));
          const ai = analyzeLocalAI(teamsForAI, totalCrying);
          return (
            <section className="mb-12 rounded-[20px] border border-white/15 bg-[#172230] p-6 text-[#f4efe5] shadow-[8px_8px_0_rgba(230,92,58,0.25)]">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e65c3a] text-white shadow">
                    <Bot size={20} />
                  </div>
                  <div>
                    <h2 className="font-display text-lg font-black tracking-[-0.03em]">BBoz Local AI Analyst</h2>
                    <p className="text-xs text-[#b1bac2]">Analisi algoritmica istantanea in tempo reale</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-xs font-semibold text-[#e65c3a]">
                  <Sparkles size={14} /> Stato: {ai.mood}
                </div>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#b1bac2]">Lettura Tattica</p>
                  <p className="mt-2 text-sm leading-6 text-[#f4efe5]">{ai.summary}</p>
                </div>
                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#b1bac2]">Consiglio Tecnico</p>
                  <p className="mt-2 text-sm leading-6 text-[#f4efe5]">{ai.recommendation}</p>
                </div>
                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#b1bac2]">Leader in Fuga</p>
                  <p className="mt-2 font-display text-xl font-black text-[#e65c3a]">{ai.favorite}</p>
                  {ai.warning && (
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-[#f6ad55]">
                      <AlertCircle size={13} /> {ai.warning}
                    </p>
                  )}
                </div>
              </div>
            </section>
          );
        })()}

        <section className="relative overflow-hidden rounded-[24px] bg-[#f4efe5] text-[#101924] shadow-[10px_10px_0_#071019]">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#101924]/15 px-5 pb-5 pt-6 sm:px-8">
            <div><p className="eyebrow text-[#e65c3a]">Il tabellone</p><h2 className="mt-2 font-display text-2xl font-black tracking-[-0.05em] sm:text-3xl">La classifica dei drammi</h2></div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#65707b]"><Trophy size={16} className="text-[#e65c3a]" /> {leader.name} guida con {leaderScore}</div>
          </div>
          <div className="grid grid-cols-[40px_minmax(0,1fr)_76px_78px] items-center gap-3 border-b border-[#101924]/15 bg-[#e6e0d5] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#65707b] sm:grid-cols-[56px_minmax(0,1fr)_100px_94px] sm:px-8">
            <span>#</span><span>Squadra</span><span className="text-right">Pianti</span><span className="text-right">Azione</span>
          </div>
          <div>{rankedTeams.map((team, index) => { const score = scores[team.id] ?? 0; const isLeader = index === 0 && score > 0; return (
            <div key={team.id} className={`team-row grid grid-cols-[40px_minmax(0,1fr)_76px_78px] items-center gap-3 px-5 py-4 sm:grid-cols-[56px_minmax(0,1fr)_100px_94px] sm:px-8 ${isLeader ? "bg-[#fffaf2]" : ""}`}>
              <span className={`font-display text-xl font-black tracking-[-0.06em] ${index < 3 ? "text-[#e65c3a]" : "text-[#9aa1a3]"}`}>{String(index + 1).padStart(2, "0")}</span>
              <div className="min-w-0"><div className="flex items-center gap-2"><span className="team-initial">{team.short}</span><span className="truncate font-display text-[15px] font-bold tracking-[-0.03em] sm:text-lg">{team.name}</span></div>{isLeader && <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.13em] text-[#e65c3a]">In fuga</span>}</div>
              <span className="text-right font-display text-3xl font-black tracking-[-0.07em] text-[#101924]">{score}</span>
              <div className="score-actions"><button onClick={() => adjustScore(team.id, -1)} className="minus-button" aria-label={`Diminuisci di uno i pianti di ${team.name}`} disabled={score === 0}>−1</button><button onClick={() => adjustScore(team.id, 1)} className={`plus-button ${pulseId === team.id ? "plus-button-pulse" : ""}`} aria-label={`Aggiungi un pianto a ${team.name}`}><span>+1</span><ArrowUpRight size={15} /></button></div>
            </div>
          ); })}</div>
          <div className="flex items-center justify-between border-t border-[#101924]/15 px-5 py-4 text-xs text-[#65707b] sm:px-8"><span>Più e meno, si aggiungono +1 ogni volta.</span><ChevronDown size={17} /></div>
        </section>

        <footer className="flex flex-col gap-3 py-8 text-xs text-[#75808a] sm:flex-row sm:items-center sm:justify-between"><span>© BBoz · Comitato scientifico del pianto</span><span className="font-bold uppercase tracking-[0.12em]">Classifica condivisa · GitHub</span></footer>
      </div>

      {showShare && <div className="fixed inset-0 z-20 grid place-items-center bg-[#071019]/70 p-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="share-title"><div className="w-full max-w-md rounded-[20px] bg-[#f4efe5] p-7 text-[#101924] shadow-[10px_10px_0_#e65c3a]"><p className="eyebrow text-[#e65c3a]">Diffondi il tabellone</p><h2 id="share-title" className="mt-3 font-display text-3xl font-black tracking-[-0.06em]">Condividi la classifica</h2><pre className="mt-5 max-h-44 overflow-auto whitespace-pre-wrap rounded-xl bg-[#e6e0d5] p-4 font-sans text-xs leading-5 text-[#65707b]">{shareText}</pre><div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4"><a className="share-option" href={`https://wa.me/?text=${shareEncoded}`} target="_blank" rel="noreferrer">WhatsApp</a><a className="share-option" href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`} target="_blank" rel="noreferrer">Telegram</a><button className="share-option" onClick={async () => { if (navigator.share) await navigator.share({ title: "Classifica BBoz", text: shareText, url: shareUrl }); else await copyRanking(); }}><Share2 size={14} /> Altro</button><button className="share-option" onClick={copyRanking}><Copy size={14} /> Copia</button></div><button className="cancel-button mt-5 w-full" onClick={() => setShowShare(false)}>Chiudi</button></div></div>}

      {showReset && <div className="fixed inset-0 z-20 grid place-items-center bg-[#071019]/70 p-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="reset-title"><div className="w-full max-w-md rounded-[20px] bg-[#f4efe5] p-7 text-[#101924] shadow-[10px_10px_0_#e65c3a]"><p className="eyebrow text-[#e65c3a]">Attenzione, gesto irreversibile</p><h2 id="reset-title" className="mt-3 font-display text-3xl font-black tracking-[-0.06em]">Azzera tutto il dramma?</h2><p className="mt-3 text-sm leading-6 text-[#65707b]">La classifica tornerà a zero su questo dispositivo. I pianti già segnati non potranno essere recuperati.</p><div className="mt-7 flex justify-end gap-3"><button className="cancel-button" onClick={() => setShowReset(false)}>Annulla</button><button className="confirm-button" onClick={resetScores}>Azzera classifica</button></div></div></div>}
    </main>
  );
}
