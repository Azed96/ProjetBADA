import React from 'react';
import './Home.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject} from '@syncfusion/ej2-react-schedule';
import { Router, Route, Link } from 'react-router-dom';
import { history } from '../_helpers/history';
import { authenticationService } from '../_services/authentication.service';
import  getSeances  from '../_services/seances.service';

class Home extends React.Component {

  constructor() {
    super(...arguments);

    this.state = {
      currentUser: null,
      seances: null,
      data : [{
        Id: 2,
        Subject: 'Meeting',
        StartTime: new Date(2020, 1, 15, 10, 0),
        EndTime: new Date(2020, 1, 15, 12, 30),
        IsAllDay: false,
        Status: 'Completed',
        Priority: 'High',
        IsReadonly: true
      }]
    }
  }
  getSeancesLocalStaorage = ()=> {
    var retrievedData = JSON.parse(localStorage.getItem("seances"));
    var oldData = this.state.data;
    retrievedData.forEach(element => {
      element["StartTime"] = new Date(element["StartTime"]);
      element["EndTime"] = new Date(element["EndTime"]);
      oldData.push(element)
    });
    this.setState({
      data: oldData
    })
  }
  componentDidMount() {
    authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
    authenticationService.groupes.subscribe(x => this.setState({ data: x }));
    this.getSeancesLocalStaorage();
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
  <ScheduleComponent height='100%' isReadOnly={true} selectedDate={new Date(2020, 1, 15)} eventSettings={{ dataSource: this.state.data,
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
