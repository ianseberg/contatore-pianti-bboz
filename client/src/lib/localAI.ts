export type TeamScore = {
  id: number;
  name: string;
  short: string;
  score: number;
};

export type AIAnalysis = {
  summary: string;
  mood: string;
  favorite: string;
  warning?: string;
  recommendation: string;
};

export function analyzeLocalAI(teams: TeamScore[], totalCrying: number): AIAnalysis {
  if (teams.length === 0 || totalCrying === 0) {
    return {
      summary: "La stagione è ancora in fase di riscaldamento. Nessun pianto registrato finora.",
      mood: "Calma piatta / Tensione latente",
      favorite: "Nessuna squadra in fuga",
      recommendation: "Aggiungi il primo +1 per inaugurare ufficialmente i drammi della giornata.",
    };
  }

  const sorted = [...teams].sort((a, b) => b.score - a.score);
  const leader = sorted[0];
  const second = sorted[1];
  const diff = leader.score - (second ? second.score : 0);

  let mood = "Dramma agonistico moderato";
  if (totalCrying > 30) mood = "Crisi isterica collettiva in corso";
  else if (totalCrying > 15) mood = "Clima teso e lacrime frequenti";

  let summary = `Il vertice è saldamente occupato da ${leader.name} con ${leader.score} pianti accumulati.`;
  if (diff === 0 && second) {
    summary = `Perfetta parità in vetta tra ${leader.name} e ${second.name} a quota ${leader.score} pianti!`;
  } else if (diff <= 2 && second) {
    summary = `${leader.name} conduce per un soffio su ${second.name}, tallonata da vicino in questa fase calda della League Two.`;
  } else if (diff > 5) {
    summary = `${leader.name} ha preso il largo con una fuga solitaria, lasciando gli avversari a debita distanza.`;
  }

  let warning: string | undefined;
  const lowest = sorted[sorted.length - 1];
  if (lowest && lowest.score === 0 && totalCrying > 10) {
    warning = `${lowest.name} è ancora a zero pianti: o difendono benissimo o covano una bomba emotiva per la prossima giornata.`;
  }

  const recommendations = [
    "Verificare le condizioni psicologiche degli allenatori in panchina prima del prossimo turno.",
    "Si consiglia una sessione urgente di tisane rilassanti per tutto lo staff tecnico.",
    "Tenere d'occhio gli arbitri: la tensione accumulata rischia di esplodere nei minuti di recupero.",
    "Rafforzare la scorta di fazzoletti negli spogliatoi di League Two.",
  ];
  const recommendation = recommendations[Math.abs(leader.score + totalCrying) % recommendations.length];

  return {
    summary,
    mood,
    favorite: `${leader.name} (${leader.score} pianti)`,
    warning,
    recommendation,
  };
}
