import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Grid, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  action: {
    marginBottom: theme.spacing(1),
    '& + &': {
      marginLeft: theme.spacing(1),
    },
  },
}));

const Header = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
<>
   
    </>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  onAddClick: PropTypes.func,
};

Header.defaultProps = {
  onAddClick: () => {},
};

export default Header;