import React, { useState } from 'react';
import './register.scss';
export const Register = () => {
  const [user, setUser] = useState(null);
  const username = user ? `User: ${ user }` : '';

  if (user) {
    return (
      <div className="register">
        {username}

        <button
          onClick={() => {
            gapi.auth2.getAuthInstance().signOut();
            setUser(null);
          }}
        >
          Logout
        </button>

      </div>
    )
  } else {
    return (
      <div className="register">
        {username}

        <button
          onClick={() => {
            gapi.auth2
              .getAuthInstance()
              .signIn()
              .then(() => {
                gapi.client.people.people
                  .get({
                    resourceName: 'people/me',
                    'requestMask.includeField': 'person.names'
                  })
                  .then(function (resp) {
                    setUser(resp.result.names[0].givenName);
                  });
              })
              .catch(err => {
                console.log(err);
              });
          }}
        >
          Register Now
        </button>

      </div>
    )
  }
};
