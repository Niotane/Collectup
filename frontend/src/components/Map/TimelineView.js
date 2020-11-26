import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {
  Grid,
  Button,
  Box,
  FormField,
  Input,
  Text,
  List,
} from '@material-ui/core';

function TimelineView({ setQuery, midLocation }) {
  const [selectDate, SetSelectDate] = React.useState(
    new Date('2020-11-26-T17:00:00')
  );
  const handleDateChange = (date) => {
    SetSelectDate(date);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify='space-around'>
        <KeyboardDatePicker
          disableToolbar
          variant='inline'
          format='MM/dd/yyyy'
          margin='normal'
          id='date-picker-inline'
          label='Date picker inline'
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <Box
          flex
          direction='row'
          background='dark-2'
          align='baseline'
          justify='evenly'
          height={{ min: '30vw' }}
          pad='2em'
        >
          <Grid
            value={{}}
            onReset={() => setQuery({})}
            onSubmit={(evt) => {
              const data = new FormData(evt.target);
              setQuery(data.get('address'));
            }}
          >
            <FormField
              name='current-location'
              htmlfor='text-input-id'
              label='Enter your start and end address'
            >
              <Input id='text-input' name='address' />
            </FormField>

            <Box direction='row' gap='medium'>
              <Button type='submit' primary label='Submit' />
              <Button type='reset' label='Reset' />
            </Box>
          </Grid>
          <Box flex direction='row' justify='evenly' background='dark-2'>
            <Box gap='0.5vw'>
              <Text weight='bold' size='large' color='#6FFFB0'>
                TIMELINE
              </Text>
              <List
                primaryKey='location'
                secondaryKey='time'
                data={midLocation}
              />
            </Box>
            <Box direction='column' gap='2vw'>
              <Box gap='0.5vw'>
                <Text weight='bold' size='large' color='#6FFFB0'>
                  JOURNEY PROGRESS
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

export default TimelineView;
