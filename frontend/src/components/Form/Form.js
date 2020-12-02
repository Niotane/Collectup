import { Box, Grid } from '@material-ui/core';

import useForm from './utils/useForm';
import Form from './utils/Form';
import Controls from './utils/Controls';
import formHandler from './formHandler';

function Main() {
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
      city: {
        value: '',
        isValid: false,
      },
      coordinates: {
        value: '',
        isValid: false,
      },
      category: {
        value: '',
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  return (
    <Form onSubmit={(evt) => formHandler(evt, formState)}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input id='name' name='name' label='My Name' />
          <Controls.Input id='title' name='title' label='Title' />
          <Controls.Input
            id='description'
            name='description'
            label='Description'
          />
          <Controls.Input id='address' name='address' label='Address' />
          <Controls.Input id='city' name='city' label='City' />
          <Controls.Input
            id='coordinates'
            name='coordinates'
            label='Co-ordinates'
            value='50.9375,6.9603'
            disabled
          />
          <Controls.Select
            id='category'
            name='category'
            label='Item category'
            options={[
              { id: 'household', title: 'household' },
              { id: 'electrical', title: 'electrical' },
              { id: 'metal', title: 'metal' },
            ]}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.ImageUpload
            id='image'
            name='image'
            label='Image'
            onInput={inputHandler}
            errorText='Please provide an image.'
          />
          <Box m={10} />
          <div>
            <Controls.Button type='submit' text='Submit' />
            <Controls.Button text='Reset' color='default' onClick={() => {}} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}

export default Main;
