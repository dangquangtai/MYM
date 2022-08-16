import React from 'react';
import useBooking from '../../../hooks/useBooking';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import moment from 'moment';
import { DOCUMENT_CHANGE, FLOATING_MENU_CHANGE } from '../../../store/actions';
import { useDispatch } from 'react-redux';
import { makeStyles, useTheme, useMediaQuery, Grid, Card, CardContent } from '@material-ui/core';
import { Tooltip } from "bootstrap";

import Header from './Header';
import Toolbar from './Toolbar';

let tooltipInstance = null;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  calendar: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    '& .fc-unthemed .fc-head': {
      backgroundColor: theme.palette.background.dark
    },
    '& .fc-unthemed .fc-body': {
      backgroundColor: theme.palette.background.default
    },
    '& .fc-unthemed .fc-row': {
      borderColor: theme.palette.divider
    },
    '& .fc-unthemed .fc-axis': {
      ...theme.typography.body2
    },
    '& .fc-unthemed .fc-divider': {
      backgroundColor: theme.palette.background.dark,
      borderColor: theme.palette.divider
    },
    '& .fc-unthemed th': {
      borderColor: theme.palette.divider
    },
    '& .fc-unthemed td': {
      borderColor: theme.palette.divider
    },
    '& .fc-unthemed td.fc-today': {
      backgroundColor: theme.palette.background.dark
    },
    '& .fc-unthemed .fc-highlight': {
      backgroundColor: theme.palette.background.dark
    },
    '& .fc-unthemed .fc-event': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      borderWidth: 2,
      opacity: 0.9,
      '& .fc-time': {
        ...theme.typography.h6,
        color: 'inherit'
      },
      '& .fc-title': {
        ...theme.typography.body1,
        color: 'inherit'
      }
    },
    '& .fc-unthemed .fc-day-top': {
      ...theme.typography.body2
    },
    '& .fc-unthemed .fc-day-header': {
      ...theme.typography.subtitle2,
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.text.secondary,
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.dark
    },
    '& .fc-unthemed .fc-list-view': {
      borderColor: theme.palette.divider
    },
    '& .fc-unthemed .fc-list-empty': {
      ...theme.typography.subtitle1
    },
    '& .fc-unthemed .fc-list-heading td': {
      backgroundColor: theme.palette.background.dark,
      borderColor: theme.palette.divider
    },
    '& .fc-unthemed .fc-list-heading-main': {
      ...theme.typography.h6
    },
    '& .fc-unthemed .fc-list-heading-alt': {
      ...theme.typography.h6
    },
    '& .fc-unthemed .fc-list-item:hover td': {
      backgroundColor: theme.palette.background.dark,
    },
    '& .fc-unthemed .fc-list-item-title': {
      ...theme.typography.body1
    },
    '& .fc-unthemed .fc-list-item-time': {
      ...theme.typography.body2
    },
  },
  tooltip: {
    background: '#151515',
    color: '#FFF',
    minWidth: '150px',
    padding: '4px 8px',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }
}));

const Calendar = () => {
  const { getFullCalendar, getBookingDetail } = useBooking();

  const dispatch = useDispatch();

  const classes = useStyles();
  const calendarRef = React.useRef(null);

  const theme = useTheme();
  const matchSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [view, setView] = React.useState(matchSmDown ? 'listWeek' : 'dayGridMonth');

  const [date, setDate] = React.useState(moment().toDate());

  const [events, setEvents] = React.useState([]);

  const formatDateTime = (datetime) => {
    if (datetime) {
      const date = new Date(datetime);
      return (
        date.getDate() +
        '/' +
        (date.getMonth() + 1) +
        '/' +
        date.getFullYear() +
        ' ' +
        (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
        ':' +
        (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
      );
    }
    return '';
  };

  const getEvents = async () => {
    const calendarList = await getFullCalendar();
    const formatCalendarList = calendarList.map(calendar => {
      const { url, ...rest } = calendar;
      return ({ ...rest, link: url })
    })
    setEvents(formatCalendarList)
  };

  React.useEffect(() => {
    getEvents();
  }, []);

  React.useEffect(() => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = matchSmDown ? 'listWeek' : 'dayGridMonth';

      calendarApi.changeView(newView);
      setView(newView);
    }
  }, [matchSmDown]);

  const handleEventSelect = async (arg) => {
    const detailDocument = await getBookingDetail(arg.event.id);
    dispatch({ type: DOCUMENT_CHANGE, selectedDocument: detailDocument, documentType: 'booking' });
    dispatch({ type: FLOATING_MENU_CHANGE, detailDocument: true });
  };

  const handleEventUpdate = async ({ event }) => {

  };

  const handleDateToday = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  };

  const handleViewChange = (newView) => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.changeView(newView);
      setView(newView);
    }
  };

  const handleDatePrev = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const handleDateNext = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };

  const handleMouseEnter = (info) => {
    const { mentee, mentor } = info.event.extendedProps;
    const html = `
      <div>Mentor: ${mentor}</div>
      <div>Khách hàng: ${mentee}</div>
      <div>Thời gian: ${formatDateTime(info.event.start)}</div>
    `;

    tooltipInstance = new Tooltip(info.el, {
      title: html,
      html: true,
      placement: "top",
      trigger: "hover",
      container: "body",
      customClass: classes.tooltip,
      offset: [0, 4]
    });

    tooltipInstance.show();
  };

  const handleMouseLeave = (info) => {
    if (tooltipInstance) {
      tooltipInstance.dispose();
      tooltipInstance = null;
    }
  };

  return (
    <React.Fragment>
      <Grid container style={{ padding: '12px' }}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Header />
              <Toolbar
                date={date}
                onDateNext={handleDateNext}
                onDatePrev={handleDatePrev}
                onDateToday={handleDateToday}
                onViewChange={handleViewChange}
                view={view}
              />
              <div className={classes.calendar}>
                <FullCalendar
                  allDayMaintainDuration
                  defaultDate={date}
                  defaultView={view}
                  themeSystem='materia'
                  droppable
                  editable
                  events={events}
                  eventClick={handleEventSelect}
                  eventDrop={handleEventUpdate}
                  eventMouseEnter={handleMouseEnter}
                  eventMouseLeave={handleMouseLeave}
                  eventLimit
                  eventResizableFromStart
                  eventResize={handleEventUpdate}
                  header={false}
                  headerToolbar={false}
                  height={800}
                  ref={calendarRef}
                  rerenderDelay={10}
                  locale={"vi"}
                  weekends
                  plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                    listPlugin
                  ]}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Calendar;