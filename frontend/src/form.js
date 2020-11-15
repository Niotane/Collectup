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
} from 'grommet';


function FormView(props){

return(
<Box key="input" gap="small">
      <TextInput
        placeholder="Name"
        value={"textInput"}
        // onChange={event => setTextInput(event.target.value)} 
      />
      <TextInput
        placeholder="Adress"
        value={"textInput"}
        // onChange={event => setTextInput(event.target.value)}
      />
</Box>
)
}

export default FormView