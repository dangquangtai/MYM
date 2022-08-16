import React from 'react';
import { Formik } from 'formik';

import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  FormHelperText,
} from '@material-ui/core';


const getInitialValues = (event) => {
  return ({
    allDay: false,
    ...event
  });
};

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

const ModalEventFrom = props => {
  const { event, onCancel } = props;

  return (
    <React.Fragment>
      <Formik
        initialValues={getInitialValues(event)}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          touched,
          values
        }) => (
          <form>
            <Box p={3}>
              <Typography
                align="center"
                gutterBottom
                variant="h3"
                color="textPrimary"
              >
                Booking
              </Typography>
            </Box>
            <Box p={3}>
              <TextField
                disabled
                fullWidth
                label="ID"
                name="ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.id}
                variant="outlined"
              />
              <Box mt={2}>
                <TextField
                  disabled
                  error={Boolean(touched.title && errors.title)}
                  fullWidth
                  helperText={touched.title && errors.title}
                  label="Tiêu đề"
                  name="title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.title}
                  variant="outlined"
                />
              </Box>
              <Box mt={2}>
                <TextField
                  disabled
                  fullWidth
                  label="Lịch tư vấn"
                  name="start"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={formatDateTime(values.start)}
                  variant="outlined"
                />
              </Box>
              <Box mt={2}>
                <TextField
                  disabled
                  fullWidth
                  label="Link"
                  name="url"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.link}
                  variant="outlined"
                />
              </Box>
              {Boolean(touched.end && errors.end) && (
                <Box mt={2}>
                  <FormHelperText error>
                    {errors.end}
                  </FormHelperText>
                </Box>
              )}
            </Box>
            <Divider />
            <Box
              p={2}
              display="flex"
              alignItems="center"
            >
              <Box flexGrow={1} />
              <Button onClick={onCancel}>
                Close
              </Button>
            </Box>
          </form>
        )
        }
      </Formik>
    </React.Fragment>
  );
}

export default ModalEventFrom;