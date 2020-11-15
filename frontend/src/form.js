import { useEffect, useState, Suspense } from 'react';
import {
  Grommet,
  Button,
  Heading,
  Box,
  Form,
  FormField,
  TextInput,
  Text,
  Clock,
  Meter,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Footer,
  Anchor,
  Header,
  Image,
  Select,
} from 'grommet';
import ImageUpload from './util/ImageUpload';

function FormView({ formHandler, inputHandler }) {
  return (
    <Form value={{}} onReset={() => {}} onSubmit={(evt) => formHandler(evt)}>
      <FormField name='name' htmlfor='text-input-id' label='Name'>
        <TextInput id='text-input-id' name='name' />
      </FormField>
      <FormField name='phone' htmlfor='text-input-id' label='Phone No.'>
        <TextInput id='text-input-id2' name='phone' />
      </FormField>
      <FormField
        name='description'
        htmlfor='text-input-id'
        label='Item Description'
      >
        <TextInput id='text-input-id3' name='description' />
      </FormField>
      <FormField name='address' htmlfor='text-input-id' label='Address'>
        <TextInput id='text-input-id4' name='address' />
      </FormField>
      <FormField name='country' htmlfor='text-input-id' label='Country'>
        <TextInput id='text-input-id5' name='country' />
      </FormField>
      <FormField name='city' htmlfor='text-input-id' label='City'>
        <TextInput id='text-input-id6' name='city' />
      </FormField>
      <FormField name='category' htmlfor='text-input-id' label='Category'>
        <Select
          options={['household', 'electrical', 'metal']}
          name='category'
        />
      </FormField>
      <FormField name='category' htmlfor='text-input-id' label='Category'>
        <ImageUpload
          id='image'
          name='image'
          onInput={inputHandler}
          errorText='Please provide an image.'
        />
      </FormField>
      <Box direction='row' gap='medium'>
        <Button type='submit' primary label='Submit' />
        <Button type='reset' label='Reset' />
      </Box>
    </Form>
    // <Box key='input' gap='small'>
    //   <TextInput
    //     placeholder='Name'
    //     value={'textInput'}
    //     // onChange={event => setTextInput(event.target.value)}
    //   />
    //   <TextInput
    //     placeholder='Adress'
    //     value={'textInput'}
    //     // onChange={event => setTextInput(event.target.value)}
    //   />
    // </Box>
  );
}

export default FormView;
