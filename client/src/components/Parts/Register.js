import React, { useState } from 'react';
import './register.scss';
export const Register = () => {
  const [user, setUser] = useState(null);

  return (
    <div className="register">
      User: {user}
      <div
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
                .then(function(resp) {
                  setUser(resp.result.names[0].givenName);
                });
            })
            .catch(err => {
              console.log(err);
            });
        }}
      >
        Register now
      </div>
      <div
        onClick={() => {
          gapi.auth2.getAuthInstance().signOut();
          setUser(null);
        }}
      >
        Sign out
      </div>
    </div>
  );
};
