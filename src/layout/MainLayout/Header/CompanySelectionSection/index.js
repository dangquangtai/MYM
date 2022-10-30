import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useTheme,
  useMediaQuery,
  Box,
  makeStyles,
  Tooltip,
  TextField,
  MenuItem,
  InputAdornment,
  Hidden,
  Button,
  Typography,
} from '@material-ui/core';
import useProject from '../../../../hooks/useProject';
import { PROJECT_CHANGE } from '../../../../store/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '350px',
    minWidth: '250px',
    backgroundColor: theme.palette.background.paper,
    paddingBottom: 0,
    borderRadius: '10px',
  },
  subHeader: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.common.white,
    padding: '5px 15px',
  },
  menuIcon: {
    fontSize: '1.5rem',
  },
  gridContainer: {
    padding: '10px',
  },
  formContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  menuButton: {
    [theme.breakpoints.down('sm')]: {
      minWidth: '50px',
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: '35px',
    },
  },
  iconSelect: {
    color: '#fff',
    fontSize: '1.4rem',
  },
  selectColor: {
    color: '#fff',
    //padding: '0 !important',
    fontSize: '1rem',
    marginTop: '4px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.875rem',
    },
  },
  underlineSelect: {
    ':before': {
      display: 'none',
    },
  },
  project: {
    display: 'flex',
    alignItems: 'center',

    '& button': {
      color: '#fff',
      padding: '0',
      marginRight: '20px',
      borderRadius: 0,
      maxWidth: '150px',

      '& .MuiButton-label': {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textAlign: 'left',
        display: 'block',
      },
    },
  },
}));

const CompanySelectionSection = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { getProjects } = useProject();

  const { projects } = useSelector((state) => state.project);
  const selectedProject = projects.find((project) => project.selected);
  const { selectedApp } = useSelector((state) => state.app);

  useEffect(() => {
    setTimeout(() => {
      getProjects(selectedApp?.id || '');
    }, 0);
  }, [selectedApp]);

  const theme = useTheme();
  const matchDownSm = useMediaQuery(theme.breakpoints.down('xs'));

  const handleChange = (event) => {
    const newSelectedProjects = projects.map((project) => {
      return {
        ...project,
        selected: project.id === event.target.value ? true : false,
      };
    });
    dispatch({
      type: PROJECT_CHANGE,
      projects: newSelectedProjects,
    });
  };

  const handleClickProject = (id) => {
    const newSelectedProjects = projects.map((project) => {
      return {
        ...project,
        selected: project.id === id ? true : false,
      };
    });
    dispatch({
      type: PROJECT_CHANGE,
      projects: newSelectedProjects,
    });
  };

  return (
    <React.Fragment>
      {projects.length > 0 && (
        <Tooltip title="">
          <Box className={classes.project} ml={matchDownSm ? '8px' : '24px'} mr={matchDownSm ? '8px' : '24px'}>
            {/* <TextField
              id="outlined-select-currency"
              select
              value={selectedProject ? selectedProject.id : ''}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <Hidden smDown>
                    <InputAdornment position="start" className={classes.selectIcon}>
                      <span></span>
                    </InputAdornment>
                  </Hidden>
                ),
                disableUnderline: true,
              }}
              SelectProps={{
                classes: {
                  select: classes.selectColor,
                  icon: classes.iconSelect,
                },
              }}
            >
              {projects.map((project) => (
                <MenuItem key={project.id} value={project.id}>
                  {project.project_name}
                </MenuItem>
              ))}
            </TextField> */}
            {projects.map((project) => (
              <Tooltip title={<Typography fontSize={18}>{project.project_name}</Typography>} key={project.id} arrow>
                <Button
                  onClick={(e) => handleClickProject(project.id)}
                  style={{ borderBottom: project.id === selectedProject.id ? 'solid 1px' : 'none' }}
                >
                  {project.project_name}
                </Button>
              </Tooltip>
            ))}
          </Box>
        </Tooltip>
      )}
      {/* <Tooltip title={open ? 'Dark Layout' : 'Light Layout'}>
                <Button className={classes.menuButton} onClick={handleToggle} color="inherit">
                    {!open && <Brightness6Icon className={classes.menuIcon} />}
                    {open && <Brightness6OutlinedIcon className={classes.menuIcon} />}
                </Button>
            </Tooltip> */}
    </React.Fragment>
  );
};

export default CompanySelectionSection;
