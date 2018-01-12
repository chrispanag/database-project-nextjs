import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import Router from 'next/router';

class AddLease extends Component {
    _id = '';

    constructor(props) {
      super(props)
      this._id = props._id;
    }

  newLease = () => {
    const body = {
      query:
        `mutation {
          leaseCar (id: ${this._id}) {
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
      Router.push(`/leases`);
    })
  }

  render () {
    return (
      <Button onClick={this.newLease}>
        <i className="add icon"></i>
      </Button>
    )
  }
}

export default AddLease
