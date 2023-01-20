const express = require('express');
var escape = require('escape-html');
var { JsonDB, Config } = require('node-json-db');

const app = express();
app.use(express.json());
app.use(express.static('public'));

var db = new JsonDB(new Config("leaderboard", true, false, '/'));
db.getData('/scores').catch(()=>{
    db.push("/scores[]",{
        pseudo: 'eteck',
        score: 344
    });
})

const key = "0bfuScat3d_K3y"
function sign(score) {
    let s = String(score) + key
    let hash = 0,
    i, chr;
    if (s.length === 0) return hash;
    for (i = 0; i < s.length; i++) {
        chr = s.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0;
    }
    return hash;
}
  
app.post(`/scores`, async function (req, res) {
    const {score, signature, pseudo} = req.body

    if(sign(score) !== signature){
        return res.status(401).json({msg: `Invalid signature`});
    }

    const scores = await db.getData('/scores')
    let alreadyHere = scores.find(score => score.pseudo == escape(pseudo))
    if(alreadyHere){
        if(alreadyHere.score > score){
            return res.status(200).json({msg: `You already have a better score`});
        } else {
            let i = scores.findIndex(score => score.pseudo == escape(pseudo))
            await db.push(`/scores[${i}]`,{
                pseudo: escape(pseudo),
                score: score
            });
        }
    } else {
        await db.push("/scores[]",{
            pseudo: escape(pseudo),
            score: score
        });
    }

    res.status(200).json({msg: `Score added to the leaderboard`});
});

app.get(`/scores`, async function (req, res) {
    const scores = await db.getData('/scores')
	res.status(200).json(scores);
});

const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Listening on Port: ${port}`));