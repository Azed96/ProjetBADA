const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const matieres = require("./tools/Matieres");

const app = express();
app.use(bodyParser.json());

// Allow CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Connexion to mongoDb
mongoose
  .connect("mongodb://localhost:27017/BADA", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

let db = mongoose.connection;
// Routes
//require('./routes/Groupes')(app,db);

app.get("/", function(req, res) {
  var groupe = db
    .collection("LES_SEANCES")
    .find({
      "LES_RESSOURCES.UNE_RESSOURCE.CODE_RESSOURCE": "s"
    })
    .toArray(function(err, data) {
      res.send(data);
    });
});

app.get("/login/:code", function(req, res) {
  var groupes = [];
  db.collection("GROUPES")
    .find({
      "LES_ETUDIANTS_DU_GROUPE.UN_CODE_ETUDIANT": req.params.code
    })
    .toArray((err, data) => {
      data.forEach(element => {
        groupes.push(element.CODE);
        console.log(element.CODE);
      });

      if (groupes.length == data.length && data.length != 0) {
        console.log(data.length);
        res.send(groupes);
      } else {
        res.status(401).send('"message":"Nom de groupe invalide"');
      }
    });
});

app.get("/seance/:code", function(req, res) {
  var arrayFinal = [];
  var ressources = [];
  var enseignements = [];

  db.collection("LES_SEANCES")
    .find({
      "LES_RESSOURCES.UNE_RESSOURCE.CODE_RESSOURCE": req.params.code
    })
    .toArray((err, ressources) => {
      ressources.forEach(element => {
        db.collection("LES_ENSEIGNEMENTS")
          .find({
            CODE: element.ENSEIGNEMENT
          })
          .toArray(function(err, result) {
            var heure_string = element.HEURE[0];
            var date_start = new Date(element.DATE[0]);
            var duree_string = element.DUREE[0];

            if (heure_string.length > 3) {
              var heure_debut = heure_string.substring(0, 2);
              var minutes_debut = heure_string.substring(2, 4);
            } else {
              var heure_debut = heure_string.substring(0, 1);
              var minutes_debut = heure_string.substring(1, 3);
            }

            date_start.setHours(heure_debut, minutes_debut);

            if (duree_string.length > 3) {
              var duree_heure = duree_string.substring(0, 2);
              var duree_minutes = duree_string.substring(2, 4);
            } else {
              var duree_heure = duree_string.substring(0, 1);
              var duree_minutes = duree_string.substring(1, 3);
            }

            var date_fin = new Date(date_start);
            date_fin.setHours(date_fin.getHours() + parseInt(duree_heure));
            date_fin.setMinutes(
              date_fin.getMinutes() + parseInt(duree_minutes)
            );

            var salle = "Evry";

            if (element["LES_RESSOURCES"][0]["UNE_RESSOURCE"].length > 0) {
              if (
                element["LES_RESSOURCES"][0]["UNE_RESSOURCE"][0]["TYPE"] ==
                "SALLE"
              ) {
                salle =
                  element["LES_RESSOURCES"][0]["UNE_RESSOURCE"][0][
                    "CODE_RESSOURCE"
                  ][0];
              }
            }

            if (element["LES_RESSOURCES"][0]["UNE_RESSOURCE"].length > 1) {
              if (
                element["LES_RESSOURCES"][0]["UNE_RESSOURCE"][1]["TYPE"] ==
                "SALLE"
              ) {
                salle =
                  element["LES_RESSOURCES"][0]["UNE_RESSOURCE"][1][
                    "CODE_RESSOURCE"
                  ][0];
              }
            }

            if (element["LES_RESSOURCES"][0]["UNE_RESSOURCE"].length > 2) {
              if (
                element["LES_RESSOURCES"][0]["UNE_RESSOURCE"][2]["TYPE"] ==
                "SALLE"
              ) {
                salle =
                  element["LES_RESSOURCES"][0]["UNE_RESSOURCE"][2][
                    "CODE_RESSOURCE"
                  ][0];
              }
            }
            if (element["LES_RESSOURCES"][0]["UNE_RESSOURCE"].length > 3) {
              if (
                element["LES_RESSOURCES"][0]["UNE_RESSOURCE"][3]["TYPE"] ==
                "SALLE"
              ) {
                salle =
                  element["LES_RESSOURCES"][0]["UNE_RESSOURCE"][3][
                    "CODE_RESSOURCE"
                  ][0];
              }
            }
            if (element["LES_RESSOURCES"][0]["UNE_RESSOURCE"].length > 4) {
              if (
                element["LES_RESSOURCES"][0]["UNE_RESSOURCE"][4]["TYPE"] ==
                "SALLE"
              ) {
                salle =
                  element["LES_RESSOURCES"][0]["UNE_RESSOURCE"][4][
                    "CODE_RESSOURCE"
                  ][0];
              }
            }

            var reponse = {
              Id: 5,
              Subject: matieres.getCleanedMatiereValue(result[0]["NOM"][0]),
              StartTime: new Date(date_start),
              EndTime: new Date(date_fin),
              IsAllDay: false,
              Status: "Completed",
              Priority: "High",
              IsReadonly: true,
              Location: "Evry"
            };

            db.collection("SALLES")
              .find({ CODE: salle })
              .toArray((err, sallea) => {
                var location = "Evry";
                if (salle !== "Evry") {
                  location = sallea[0]["NOM"][0];
                  reponse["Location"] = location;
                }

                arrayFinal.push(reponse);
                if (arrayFinal.length == ressources.length)
                  res.send(arrayFinal);
              });
          });
      });
    });
});

app.use((req, res, next) => {
  res.json({ message: "Votre requête a bien été reçue !" });
  next();
});

app.listen(process.env.PORT || "3012", function() {
  console.log("Evry Calendrier 2019 !");
});
module.exports = app;
