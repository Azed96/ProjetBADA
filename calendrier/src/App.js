import React from 'react';
import { Router, Route, Link } from 'react-router-dom';

import { history } from './_helpers/history';
import { authenticationService } from './_services/authentication.service';
import { PrivateRoute } from './_components/PrivateRoute';
import  Home  from './Home/Home';
import  Login  from './Login/Auth';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        const { currentUser } = this.state;
        return (
            <Router history={history}>
                <PrivateRoute exact path="/" component={Home} />
                <Route path="/login" component={Login} />
            </Router>
        );
    }
}

export default App ;