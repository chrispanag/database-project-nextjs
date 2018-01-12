import Router from 'next/router';

import * as _ from 'lodash';

const Del = (_id, Entity) => async function () {
  const body = {
    query:
      `mutation {
        delete${Entity}(id: ${_id}) {
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
  Router.push(`/${_.lowerCase(Entity)}s`);
}

const Actions = ({_id, Entity}) => (
  <div className="ui icon buttons">
    <button className="ui button" onClick={Del(_id, Entity)} ><i className="trash icon"></i></button>
    <button className="ui button"><i className="edit icon"></i></button>
    <button className="ui button"><i className="external icon"></i></button>
  </div>
)

export default Actions
