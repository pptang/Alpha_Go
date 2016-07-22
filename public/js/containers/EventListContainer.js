import { connect } from 'react-redux'
import EventList from '../components/EventList';
import { getEvents, getEventsSuccess, getEventsFailure } from '../actions/events';

const mapStateToProps = (state) => {
  
  return {
    eventList: state.EventReducer.eventList,
    isAuthenticate: state.UserReducer.status === 'authenticated' ? true : false
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEvents: () => {
      let token = sessionStorage.getItem('jwtToken');
      dispatch(getEvents(token)).then((response) => {
        let data = response.payload.data
        if (response.payload.status != 200) {
          dispatch(getEventsFailure(response.payload));
          reject(data);
        } else {
          dispatch(getEventsSuccess(response.payload));
          resolve();
        }
      });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
