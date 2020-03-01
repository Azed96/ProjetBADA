import React from 'react';
import './Home.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject} from '@syncfusion/ej2-react-schedule';
import { Router, Route, Link } from 'react-router-dom';
import { history } from '../_helpers/history';
import { authenticationService } from '../_services/authentication.service';
import  getSeances  from '../_services/seances.service';
import { handleResponse } from '../_helpers/handle-response';

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
  getSeancesLocalStorage = ()=> {
    var groupes = JSON.parse(localStorage.getItem("groupes")).flat();
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    groupes.forEach(groupe => {
      console.log("getSeances called !");
      console.log(groupe);
      return fetch(`http://localhost:3012/seance/`+groupe, requestOptions)
          .then(handleResponse)
          .then(seances => {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              console.log(seances);
              localStorage.setItem('seances', JSON.stringify(seances));
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
          });
  });

  }
  componentDidMount() {
    authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
    authenticationService.groupes.subscribe(x => this.setState({ data: x }));
    this.getSeancesLocalStorage();
  }
  logout() {
      authenticationService.logout();
      history.push('/login');
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">
          <img src={require('./Universite_Evry.png')} width="200" height="80" />
          </a>
          <div className="ml-auto navbar-nav">
            <a onClick={this.logout} id="logout-button" className="nav-item nav-link"><button className="btn btn-outline-danger" type="button">Se déconnecter</button></a>
          </div>
      </nav>
  <ScheduleComponent height='100%' isReadOnly={true} selectedDate={new Date(2013, 9, 1)} eventSettings={{ dataSource: this.state.data,
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
