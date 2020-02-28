import React from 'react';
import './Home.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject} from '@syncfusion/ej2-react-schedule';
import { Router, Route, Link } from 'react-router-dom';
import { history } from '../_helpers/history';
import { authenticationService } from '../_services/authentication.service';

class Home extends React.Component {

  constructor() {
    super(...arguments);
    this.data = [{
      Id: 2,
      Subject: 'Meeting',
      StartTime: new Date(2020, 1, 15, 10, 0),
      EndTime: new Date(2020, 1, 15, 12, 30),
      IsAllDay: false,
      Status: 'Completed',
      Priority: 'High',
      IsReadonly: true
    }];
    this.state = {
      currentUser: null
    }
  }
  componentDidMount() {
    authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
  }
  logout() {
      authenticationService.logout();
      history.push('/login');
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">
          <img src={require('./Universite_Evry.png')} width="200" height="80" />
          </a>
          <div className="ml-auto navbar-nav">
            <a onClick={this.logout} id="logout-button" className="nav-item nav-link"><button class="btn btn-outline-danger" type="button">Se déconnecter</button></a>
          </div>
      </nav>
  <ScheduleComponent height='100%' isReadOnly={true} selectedDate={new Date(2020, 1, 15)} eventSettings={{ dataSource: this.data,
      fields: {
        id: 'Id',
        subject: { name: 'Subject' },
        isAllDay: { name: 'IsAllDay' },
        startTime: { name: 'StartTime' },
        endTime: { name: 'EndTime' },
        isReadOnly: {name: 'IsReadOnly'}
      }
    }}>

    <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
    </ScheduleComponent>
    </div>)
  }
}

export default Home;
