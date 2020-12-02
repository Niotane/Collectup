import React from 'react';
import {
  FormControl,
  TextField,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
  Button as MuiButton,
  makeStyles,
} from '@material-ui/core';
import ImageUploadView from './ImageUploadView';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
  },
  label: {
    textTransform: 'none',
  },
}));

export function Input(props) {
  const { name, id, label, value, error = null, disabled, onChange } = props;
  return (
    <TextField
      variant='outlined'
      label={label}
      id={id}
      name={name}
      value={value}
      disabled={disabled}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
    />
  );
}

export function ImageUpload(props) {
  return <ImageUploadView {...props} />;
}

export function Select(props) {
  const { name, id, label, value, defaultValue, error = null, onChange, options } = props;

  return (
    <FormControl variant='outlined' {...(error && { error: true })}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        id={id}
        label={label}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
      >
        <MenuItem value=''>None</MenuItem>
        {options.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.title}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}

export function Button(props) {
  const { text, size, color, variant, onClick, ...other } = props;
  const classes = useStyles();

  return (
    <MuiButton
      variant={variant || 'contained'}
      size={size || 'large'}
      color={color || 'primary'}
      onClick={onClick}
      {...other}
      classes={{ root: classes.root, label: classes.label }}
    >
      {text}
    </MuiButton>
  );
}

const Controls = {
  Input,
  ImageUpload,
  Select,
  Button,
};

export default Controls;
