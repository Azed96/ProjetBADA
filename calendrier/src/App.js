import React from 'react';
import './App.css';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject} from '@syncfusion/ej2-react-schedule';

class App extends React.Component {

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
    return <ScheduleComponent height='550px' isReadOnly={true} selectedDate={new Date(2020, 1, 15)} eventSettings={{ dataSource: this.data,
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

export default App;
