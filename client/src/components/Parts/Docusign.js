import React from 'react';
import axios from 'axios';
class Docusign extends React.Component {
  // constructor() {
  //   this.state = {};
  // }
  componentDidMount() {}

  handleClick = () => {
    axios({
      method: 'get',
      // url: 'http://localhost:3000/',
      url: '/docusign',
      data: {
        email: 'mario@email.com',
        name: 'John Doe',
        recipientId: '20',
        clientUserId: '1214'
      }
    }).then(res => {
      console.log(res);
    });
  };
  render() {
    return <button onClick={this.handleClick}>Click me</button>;
  }
}

export { Docusign };
