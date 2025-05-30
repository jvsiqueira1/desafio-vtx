const express = require("express");
const cors = require("cors");
const path = require("path")

const app = express();
app.use(cors());
app.use(express.json());

function formatOdds(odds) {
    return {
        winA: odds.winA.toFixed(1),
        winB: odds.winB.toFixed(1),
        draw: odds.draw.toFixed(1),
    }
}

const rawEvents = [
  {
    id: 1,
    teams: ["Flamengo", "Vasco"],
    odds: { winA: 2.3, winB: 3.1, draw: 3.0 }
  },
  {
    id: 2,
    teams: ["Corinthians", "Palmeiras"],
    odds: { winA: 1.9, winB: 3.5, draw: 3.3 }
  },
  {
    id: 3,
    teams: ["São Paulo", "Santos"],
    odds: { winA: 2.1, winB: 2.9, draw: 3.2 }
  },
  {
    id: 4,
    teams: ["Grêmio", "Internacional"],
    odds: { winA: 2.4, winB: 2.8, draw: 3.1 }
  },
  {
    id: 5,
    teams: ["Atlético-MG", "Cruzeiro"],
    odds: { winA: 1.7, winB: 4.0, draw: 3.6 }
  },
  {
    id: 6,
    teams: ["Botafogo", "Fluminense"],
    odds: { winA: 2.8, winB: 2.6, draw: 3.0 }
  },
  {
    id: 7,
    teams: ["Athletico-PR", "Coritiba"],
    odds: { winA: 1.8, winB: 3.9, draw: 3.4 }
  },
  {
    id: 8,
    teams: ["Bahia", "Vitória"],
    odds: { winA: 2.5, winB: 3.0, draw: 3.3 }
  }
];

const events = rawEvents.map(event => ({
    ...event,
    odds: formatOdds(event.odds)
}))

app.use(express.static(path.join(__dirname, "..", "frontend")))

app.get("/events", (req, res) => {
    res.json(events);
  });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"))
})

const PORT = 3333
app.listen(PORT, () => {
    console.log(`Backend rodando na porta ${PORT}`)
})