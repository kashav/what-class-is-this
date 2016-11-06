import axios from 'axios';

function fetch(url, setState) {
  return axios.get(url)
}

export default fetch
