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
        res.send(data);
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
