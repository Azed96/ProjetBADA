import { BehaviorSubject } from 'rxjs';


import { handleResponse } from '../_helpers/handle-response';

export default function getSeances(groupes) {
    
    groupes.forEach(groupe => {
        console.log("getSeances called !");
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
    
        return fetch(`http://localhost:3012/seance/`+groupe, requestOptions)
            .then(handleResponse)
            .then(seances => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('seances', JSON.stringify(seances));

                return seances;
            });
    });
}