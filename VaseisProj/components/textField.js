//import React from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'

const textField = ({label, name}) => (
  <Form.Field>
    <label>{label}</label>
    <input placeholder={label} name={name}/>
  </Form.Field>
);

export default textField;
