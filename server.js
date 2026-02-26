const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

const ASA_KEY = '9f8fdb4867c8aa2c4d319761d40e1cb33a1c6abd7517b4abec5b7a44ed302a40';
const ASA_URL = 'https://apiv2.allsportsapi.com/football';

app.get('/live', async (req, res) => {
  try {
    const r = await fetch(`${ASA_URL}/?met=Livescore&APIkey=${ASA_KEY}`);
    const data = await r.json();
    res.json(data);
  } catch(e) { res.json({ result: [] }); }
});

app.get('/fixtures', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const r = await fetch(`${ASA_URL}/?met=Fixtures&APIkey=${ASA_KEY}&from=${today}&to=${today}`);
    const data = await r.json();
    res.json(data);
  } catch(e) { res.json({ result: [] }); }
});

app.get('/h2h', async (req, res) => {
  try {
    const { t1, t2 } = req.query;
    const r = await fetch(`${ASA_URL}/?met=H2H&APIkey=${ASA_KEY}&firstTeamId=${t1}&secondTeamId=${t2}`);
    const data = await r.json();
    res.json(data);
  } catch(e) { res.json({ result: [] }); }
});

app.get('/teams', async (req, res) => {
  try {
    const { name } = req.query;
    const r = await fetch(`${ASA_URL}/?met=Teams&APIkey=${ASA_KEY}&teamName=${encodeURIComponent(name)}`);
    const data = await r.json();
    res.json(data);
  } catch(e) { res.json({ result: [] }); }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
