import { BehaviorSubject } from 'rxjs';


import { handleResponse } from '../_helpers/handle-response';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(codeEtudiant) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codeEtudiant })
    };

    return fetch(`http://localhost:3012/seance/`+codeEtudiant, requestOptions)
        .then(handleResponse)
        .then(seances => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('seances', JSON.stringify(seances));
            localStorage.setItem('currentUser', JSON.stringify(codeEtudiant));

            currentUserSubject.next(seances);

            return seances;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('seances');
    currentUserSubject.next(null);
}