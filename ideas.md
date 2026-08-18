# Idee di design — Contatore di pianti della serie BBoz

## Approccio 1 — Refettorio della Domenica
**Very Brief Intro:** Un’estetica editoriale sportiva, calda e ironica, che sembra il tabellone ufficiale di un torneo amatoriale stampato su carta. Crema, blu inchiostro e dettagli rossi costruiscono un tono nostalgico ma leggibile.

**Probability:** 0.03

## Approccio 2 — Console del Pianto
**Very Brief Intro:** Un’interfaccia scura da sala controllo, con indicatori luminosi e micro-animazioni da dashboard. Il tono è più digitale e competitivo, quasi da telecronaca in tempo reale.

**Probability:** 0.07

## Approccio 3 — Albo d’Oro del Dramma
**Very Brief Intro:** Un minisito da archivio sportivo contemporaneo, con fondo blu notte, pannelli in avorio e accenti arancio-segnale. L’ironia vive nel contrasto tra linguaggio solenne e metrica assurda.

**Probability:** 0.05

# Approccio scelto — Albo d’Oro del Dramma

## Design Movement
Sporting editorial / neo-brutalismo raffinato: gerarchie forti, bordi netti, superfici materiche e un linguaggio da tabellone ufficiale reinterpretato in chiave pop.

## Core Principles
1. La classifica è il protagonista: ogni elemento deve aiutare a leggere rapidamente posizione, squadra e pianti.
2. Solennità visiva, contenuto ironico: il sito parla come un organismo ufficiale, ma il dato resta volutamente teatrale.
3. Contrasto e ritmo: blu notte, avorio e arancio-segnale sostituiscono i gradienti generici e danno una firma riconoscibile.
4. Ogni +1 deve sembrare un piccolo evento: feedback immediato, conteggio evidente e aggiornamento della posizione senza confusione.

## Color Philosophy
Il blu notte comunica autorevolezza e archivio; l’avorio evita l’aspetto freddo da app generica; l’arancio ruggine è la firma emotiva del “pianto” e appare solo dove serve a guidare l’azione o evidenziare un record.

## Layout Paradigm
Una composizione a “referto”: intestazione asimmetrica con titolo e metadati, fascia KPI laterale su desktop, classifica verticale ampia e una coda informativa discreta. Su mobile la fascia diventa una striscia orizzontale compatta e la classifica conserva la scansione per righe.

## Signature Elements
- Numeri di posizione grandi, allineati come in un tabellone cartaceo.
- Pulsante circolare “+1” color arancio-segnale con micro-rimbalzo al click.
- Etichette editoriali in maiuscolo con tracking ampio: “CLASSIFICA UFFICIALE”, “ULTIMO AGGIORNAMENTO”, “RECORD DELLA GIORNATA”.

## Interaction Philosophy
Le azioni sono dirette e reversibili: un tap aggiunge un pianto, il feedback mostra il nuovo totale e il pulsante resetta l’intera stagione solo dopo conferma. Il conteggio resta nel browser tramite localStorage, così il sito funziona anche senza backend.

## Animation
Entrata scaglionata delle righe con dissolvenza e lieve traslazione verticale. Il +1 usa una risposta di 140ms con scala 0.96 e un breve flash dell’accento; il numero aggiornato cambia senza spostamenti bruschi. Rispettiamo prefers-reduced-motion disattivando gli effetti non essenziali.

## Typography System
Titoli in **Space Grotesk** 700/800 per un tono sportivo-editoriale; testo e numeri di supporto in **DM Sans** 400/500/700 per leggibilità. Le etichette usano DM Sans 700 con maiuscole e tracking 0.12em.

## Brand Essence
Il tabellone ufficioso che misura con serietà assoluta i drammi della Serie BBoz, per chi vuole aggiornare la classifica un +1 alla volta. **Ironico, competitivo, rituale.**

## Brand Voice
Headline e CTA sono brevi, solenni e un po’ teatrali; niente filler promozionale.
- “Ogni lacrima fa classifica.”
- “Segna il prossimo dramma.”

## Wordmark & Logo
Un marchio simbolico composto da una lacrima geometrica inserita in un piccolo scudo da torneo, con una tacca laterale che richiama il pulsante +1. Il wordmark sarà tipografico in Space Grotesk con “BBoz” evidenziato, ma il simbolo resta autonomo per favicon e avatar.

## Signature Brand Color
**Ruggine del Dramma — #E65C3A**, un arancio-rosso caldo e riconoscibile, usato per il +1, i record e gli stati attivi.

## Regola di controllo
Prima di ogni scelta chiedersi: “Questa scelta rafforza o diluisce l’idea dell’Albo d’Oro del Dramma?”
