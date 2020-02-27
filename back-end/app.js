const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

// Allow CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


// Connexion to mongoDb
mongoose.connect('mongodb://localhost:27017/BADA',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
var db = mongoose.connection;

// Routes
require('./routes/Groupes')(app,db);

let db = mongoose.connection;

app.get('/', function(req,res) {
    var groupe = db.collection('LES_SEANCES').find({
        "LES_RESSOURCES.UNE_RESSOURCE.CODE_RESSOURCE" : "s"
    }).toArray(function (err, data) {
        res.send(data);
    });
})

async function formatData(id, sujet, date, dateFin){
    var reponse = {
        Id: 5,
        Subject: sujet,
        StartTime: new Date(date),
        EndTime: new Date(dateFin),
        IsAllDay: false,
        Status: 'Completed',
        Priority: 'High',
        IsReadonly: true
    }

    return reponse
}

app.get('/seance/:code', async function(req,res) {
    var groupe = db.collection('LES_SEANCES').find({
        "LES_RESSOURCES.UNE_RESSOURCE.CODE_RESSOURCE" : req.params.code
    }).toArray(async function (err, data) {

        let arrayFinal = await Promise.all(
            data.map(async element => {
                console.log(element["ENSEIGNEMENT"][0]);
                var groupe = db.collection('LES_ENSEIGNEMENTS').find({
                    "CODE" : element["ENSEIGNEMENT"][0]
                }).toArray(async function (err, result) {

                    var heure_string = element["HEURE"][0];
                    var date_start = new Date(element["DATE"][0]);
                    var duree_string = element["DUREE"][0];

                    if(heure_string.length > 3){
                        var heure_debut = heure_string.substring(0, 2);
                        var minutes_debut = heure_string.substring(2, 4);
                    }
                    else {
                        var heure_debut = heure_string.substring(0, 1);
                        var minutes_debut = heure_string.substring(1, 3);
                    }

                    date_start.setHours(heure_debut, minutes_debut);

                    if(duree_string.length > 3){
                        var duree_heure = duree_string.substring(0, 2);
                        var duree_minutes = duree_string.substring(2, 4);
                    }
                    else {
                        var duree_heure = duree_string.substring(0, 1);
                        var duree_minutes = duree_string.substring(1, 3);
                    }

                    var date_fin = new Date(date_start);
                    date_fin.setHours(date_start.getHours() + duree_heure);
                    date_fin.setMinutes(date_start.getMinutes() + duree_minutes);

                    var reponse = {
                        Id: 5,
                        Subject: result[0]["NOM"][0],
                        StartTime: new Date(date_start),
                        EndTime: new Date(date_fin),
                        IsAllDay: false,
                        Status: 'Completed',
                        Priority: 'High',
                        IsReadonly: true
                    }

                    reponse = await formatData(5, result[0]["NOM"][0], date_start, date_fin);
                    console.log(reponse);
                    return reponse;
                });
            })
        );

        console.log("Check check")
        res.send(arrayFinal);

    });
})

app.use((req, res, next) => {
    res.json({ message: 'Votre requête a bien été reçue !' });
    next();
});

app.listen(process.env.PORT || '3012', function () {
    console.log('Example app listening on port 3012 !')
})

module.exports = app;
