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
                    {currentUser &&
                        <nav className="navbar navbar-expand navbar-dark bg-dark">
                            <div className="navbar-nav">
                                <Link to="/" className="nav-item nav-link">Home</Link>
                                <a onClick={this.logout} className="nav-item nav-link">Logout</a>
                            </div>
                        </nav>
                    }
                    <div className="jumbotron h-100">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 offset-md-3">
                                    <PrivateRoute exact path="/" component={Home} />
                                    <Route path="/login" component={Login} />
                                </div>
                            </div>
                        </div>
                    </div>
            </Router>
        );
    }
}

export default App ;