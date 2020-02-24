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

let db = mongoose.connection;

function printSchema(obj) {
    for (var key in obj) {
        print(indent, key, typeof obj[key]) ;
    }
};

app.get('/', function(req,res) {
    var groupe = db.collection('LES_SEANCES').find({
        "LES_RESSOURCES.UNE_RESSOURCE.CODE_RESSOURCE" : "s"
    }).toArray(function (err, data) {
        res.send(data);
    });
})

app.get('/seance/:code', function(req,res) {
    var groupe = db.collection('LES_SEANCES').find({
        "LES_RESSOURCES.UNE_RESSOURCE.CODE_RESSOURCE" : req.params.code
    }).toArray(function (err, data) {

        var groupe = db.collection('LES_ENSEIGNEMENTS').find({
            "CODE" : "16101543"
        }).toArray(function (err, result) {

            var heure_string = data[0]["HEURE"][0];
            var date_start = new Date(data[0]["DATE"][0]);

            console.log("Lenght = " + heure_string.length);
            if(heure_string.length > 3){
                var heure_debut = heure_string.substring(0, 2);
                var minutes_debut = heure_string.substring(2, 4);
            }
            else {
                var heure_debut = heure_string.substring(0, 1);
                var minutes_debut = heure_string.substring(1, 3);
            }

            console.log(heure_debut + "h "+minutes_debut);
            date_start.setHours(heure_debut, minutes_debut);


            console.log(date_start);

            var reponse = {
                Id: 5,
                Subject: result[0]["NOM"][0],
                StartTime: new Date(),
                EndTime: new Date(),
                IsAllDay: false,
                Status: 'Completed',
                Priority: 'High',
                IsReadonly: true
            }

            console.log(reponse);
            res.send(data[0]);
        })
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
