module.exports = function(app,db){

    app.get('/groupes', function(req, res){
        var groupes = db.collection('GROUPES').find({}).toArray(function(err, data){
            res.send(data);
        });
        console.log(groupes)
    });


    app.get('/groupes/:code', function(req, res){
        var groupes = db.collection('GROUPES').find({ALIAS:req.params.code}).toArray(function(err, data){
            res.send(data);
        });
        console.log(groupes)
    });
    //other routes..
}