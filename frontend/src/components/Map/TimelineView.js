import {
  Button,
  Box,
  Form,
  FormField,
  TextInput,
  Text,
  Clock,
  Meter,
  Calendar,
  List,
} from 'grommet';

function TimelineView({ query, setQuery, midLocation }) {
  return (
    <Box
      flex
      direction='row'
      background='dark-2'
      align='baseline'
      justify='evenly'
      height={{ min: '30vw' }}
      pad='2em'
    >
      <Form
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
          <TextInput id='text-input' name='address' />
        </FormField>

        <Box direction='row' gap='medium'>
          <Button type='submit' primary label='Submit' />
          <Button type='reset' label='Reset' />
        </Box>
      </Form>
      <Box flex direction='row' justify='evenly' background='dark-2'>
        <Box gap='0.5vw'>
          <Text weight='bold' size='large' color='#6FFFB0'>
            TIMELINE
          </Text>
          <List primaryKey='location' secondaryKey='time' data={midLocation} />
        </Box>
        <Box direction='column' gap='2vw'>
          <Box gap='0.5vw' alignSelf='start'>
            <Text weight='bold' size='large' color='#6FFFB0'>
              CURRENT TIME
            </Text>
            <Clock type='digital' size='xxlarge' />
          </Box>
          <Box gap='0.5vw'>
            <Text weight='bold' size='large' color='#6FFFB0'>
              JOURNEY PROGRESS
            </Text>
            <Meter
              type='circle'
              values={[
                {
                  value: 60,
                  label: 'sixty',
                  onClick: () => {},
                },
              ]}
              aria-label='meter'
              size='xsmall'
            />
          </Box>
        </Box>
        <Box gap='0.5vw'>
          <Calendar
            size='medium'
            date={new Date().toISOString()}
            onSelect={(date) => {}}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default TimelineView;
