// Matieres.js
// ========
module.exports = {

    getCleanedMatiereValue: function (nomMatiere) {
        var split =  nomMatiere.split(" ");
        var result = "";

        console.log(split[0]);
        for(let i = 0; i < split.length; i++){
            console.log("Split " + split[i]);
            if(split[i].charAt(0) !== "_") result += (" " + split[i]);
        }

        return result;
    },

};