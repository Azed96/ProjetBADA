
  module.exports = function(app){
    

    app.post('/login', function(req,res){
        var groupe = db.collection('GROUPES').find({
            "NOM" : req.body.nom,
            "GROUPES.LES_ETUDIANTS_DU_GROUPE.UN_CODE_ETUDIANT" : req.body.codeEtudiant
        },function (err,data){
            if(err){
                console.log("ERREUR");
                return res.status(500).send();
            }else{
                console.log("Connected");
                res.redirect('/seance/');// rajouter le code
                return res.status(200).send(data);
                }
        });

    });

    app.get('/logout', (req, res) => {
        req.logout();
        
        res.redirect('/login');
      });
  }
