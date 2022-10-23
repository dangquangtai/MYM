import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Grid, Hidden, IconButton, Tooltip, Typography, makeStyles } from '@material-ui/core';
import ViewConfigIcon from '@material-ui/icons/ViewComfyOutlined';
import ViewWeekIcon from '@material-ui/icons/ViewWeekOutlined';
import ViewDayIcon from '@material-ui/icons/ViewDayOutlined';
import ViewAgendaIcon from '@material-ui/icons/ViewAgendaOutlined';
import 'moment/locale/vi';

const viewOptions = [
  {
    label: 'Month',
    value: 'dayGridMonth',
    icon: ViewConfigIcon,
  },
  {
    label: 'Week',
    value: 'timeGridWeek',
    icon: ViewWeekIcon,
  },
  {
    label: 'Day',
    value: 'timeGridDay',
    icon: ViewDayIcon,
  },
  {
    label: 'Agenda',
    value: 'listWeek',
    icon: ViewAgendaIcon,
  },
];

const useStyles = makeStyles(() => ({
  root: {},
}));

const Toolbar = ({ className, date, onDateNext, onDatePrev, onDateToday, onAddClick, onViewChange, view, ...rest }) => {
  const classes = useStyles();

  return (
    <Grid
      className={clsx(classes.root, className)}
      alignItems="center"
      container
      justifyContent="space-between"
      spacing={3}
      {...rest}
    >
      <Grid item>
        <ButtonGroup size="small">
          <Button onClick={onDatePrev}>Trước</Button>
          <Button onClick={onDateToday}>Hôm nay</Button>
          <Button onClick={onDateNext}>Tiếp</Button>
        </ButtonGroup>
      </Grid>
      <Hidden smDown>
        <Grid item>
          <Typography variant="h3" color="textPrimary" style={{ textTransform: 'capitalize' }}>
            {moment(date).locale('vi').format('MMMM YYYY')}
          </Typography>
        </Grid>
        <Grid item>
          {viewOptions.map((viewOption) => {
            const Icon = viewOption.icon;

            return (
              <Tooltip key={viewOption.value} title={viewOption.label}>
                <IconButton
                  color={viewOption.value === view ? 'secondary' : 'default'}
                  onClick={() => onViewChange(viewOption.value)}
                >
                  <Icon />
                </IconButton>
              </Tooltip>
            );
          })}
        </Grid>
      </Hidden>
    </Grid>
  );
};

Toolbar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired,
  onDateNext: PropTypes.func,
  onDatePrev: PropTypes.func,
  onDateToday: PropTypes.func,
  onAddClick: PropTypes.func,
  onViewChange: PropTypes.func,
  view: PropTypes.oneOf(['dayGridMonth', 'timeGridWeek', 'timeGridDay', 'listWeek']),
};

Toolbar.defaultProps = {
  onDateNext: () => {},
  onDatePrev: () => {},
  onDateToday: () => {},
  onAddClick: () => {},
  onViewChange: () => {},
};

export default Toolbar;
