import { BehaviorSubject } from 'rxjs';


import { handleResponse } from '../_helpers/handle-response';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('etudiant')));
const currentGroupesSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('groupes')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    groupes : currentGroupesSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value&&currentGroupesSubject }
};

function login(codeEtudiant) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`http://localhost:3012/login/`+codeEtudiant, requestOptions)
        .then(handleResponse)
        .then(groupes => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('groupes', JSON.stringify(groupes));
            localStorage.setItem('etudiant', JSON.stringify(codeEtudiant));

            currentUserSubject.next(codeEtudiant);
            currentGroupesSubject.next(groupes);
            return groupes;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('etudiant');
    localStorage.removeItem('groupes');
    localStorage.removeItem('seances');
    currentUserSubject.next(null);
    currentGroupesSubject.next(null);
}