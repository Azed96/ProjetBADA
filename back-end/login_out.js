
  module.exports = function(app){
    

    app.post('/login', function(req,res){
        var groupe = db.collection('GROUPES').find({
            "NOM" : req.body.nom,
            "GROUPES.LES_ETUDIANTS_DU_GROUPE.UN_CODE_ETUDIANT" : req.body.codeEtudiant
        },function (err,data){
            if(err){
                res.json({
                    status: 0,
                    message: err
                });
            }
                if(!data){
                    res.json({
                        status: 0,
                        msg: "not found"
                    });

                }
            
                console.log("Connected");
                res.redirect('/seance/');// rajouter le code

                res.json({
                    status: 1,
                    id: data._id,
                    message: " success"
                });
                
        });

    });

    

    app.get('/logout', (req, res) => {
        req.logout();
        
        res.redirect('/login');
      });
  }
