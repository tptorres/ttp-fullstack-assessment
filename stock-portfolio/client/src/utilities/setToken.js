import axios from 'axios';

// @info Assigns the token into the headers file to validate user
const setToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setToken;
