import React from 'react';
import './Home.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject} from '@syncfusion/ej2-react-schedule';

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
  }

  render() {
    return <ScheduleComponent height='100%' isReadOnly={true} selectedDate={new Date(2020, 1, 15)} eventSettings={{ dataSource: this.data,
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
    </ScheduleComponent>;
  }
}

export default Home;
