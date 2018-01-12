import React, { Component } from 'react'
import Router from 'next/router';
import * as _ from 'lodash';

import Layout from '../components/MyLayout.js'
import App from '../components/App.js'

import fetch from 'isomorphic-unfetch'
import { Form } from 'semantic-ui-react'

import Schema from 'form-schema-validation';

import textField from '../components/textField.js'

class FormVehicle extends Component {
  state = {
    license_plate: '',
    year_bought: '',
    damages: '',
    ins_expiration: '',
    brand: '',
    type: '',
    model: '',
    hp: '',
    cubism: '',
    km: '',
    service_date: '',
    department_id: ''
  };

  constructor(props) {
    super(props);
  }

  handleChange = (e, {name, value}) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { license_plate, year_bought, damages, ins_expiration, brand, type, model, hp, cubism, km, service_date, department_id } = this.state;

    const body = {
      query:
        `mutation {
          createVehicle (input: {
            license_plate: "${license_plate}",
            year_bought: "${year_bought}",
            damages: "${damages}",
            ins_expiration: "${ins_expiration}",
            brand: "${brand}",
            type: "${type}",
            model: "${model}",
            hp: ${hp},
            cubism: ${cubism},
            km: ${km},
            service_date: "${service_date}",
            department_id: ${department_id}
          }) {
            id
          }
        }`
    }
    fetch('http://localhost:4000/graphql', {
  	  method: 'POST',
  	  body: JSON.stringify(body),
  	  headers: { 'Content-Type': 'application/json'}
    }).then(res => {
      const data = res.json()
      Router.push(`/vehicles`);
    })
  }

  render () {
     const {
       license_plate,
       year_bought,
       damages,
       ins_expiration,
       brand,
       type,
       model,
       hp,
       cubism,
       km,
       service_date,
       department_id
     } = this.state

    return (
      <Form onSubmit={this.handleSubmit}>
      <Form.Group widths='equal'>
    <Form.Input label="Brand" name="brand" onChange={this.handleChange} fluid/>
    <Form.Input label="Model" name="model" onChange={this.handleChange} fluid/>
    <Form.Input label="Type" name="type" onChange={this.handleChange} fluid/>
    <Form.Input label="License Plate" name="license_plate" onChange={this.handleChange} fluid/>
    </Form.Group>
    <Form.Group widths='equal'>
    <Form.Input label="HP" name="hp" onChange={this.handleChange} fluid/>
    <Form.Input label="Cubism" name="cubism" onChange={this.handleChange} fluid/>
    <Form.Input label="Kilometers" name="km" onChange={this.handleChange} fluid/>
    </Form.Group>
    <Form.Group widths='equal'>
    <Form.Input label="Insurance Expiration" name="ins_expiration" onChange={this.handleChange} fluid/>
    <Form.Input label="Next Service" name="service_date" onChange={this.handleChange} fluid/>
    <Form.Input label="Year Bought" name="year_bought" onChange={this.handleChange} fluid/>
    </Form.Group>
    <Form.Select name="department_id" placeholder="Department" label="Department"
      options= {this.props.departments.map(d => {return {key: d.id, text: d.id, value: d.id}})} onChange={this.handleChange} fluid
    />

    <Form.Button content="Submit"/>
    </Form>

    )
  }
}

const addVehicle = (props) => (
 <App>
   <Layout>
   <div className="ui left aligned container">
      <h1 className="ui header">Add Vehicle</h1>
      <FormVehicle departments={props.departments}/>
    </div>
   </Layout>
  </App>
)

addVehicle.getInitialProps = async function() {
  var body = {query:
    `query {
      departments {
        id
      }
    }`
  }
  const res = await fetch('http://localhost:4000/graphql', {
	  method: 'POST',
	  body: JSON.stringify(body),
	  headers: { 'Content-Type': 'application/json'}
  })
  const data = await res.json()
  console.log(data);
  console.log(`Show data fetched. Count: ${data.length}`)

  return {departments: data.data.departments}
}

export default addVehicle
