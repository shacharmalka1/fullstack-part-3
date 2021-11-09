import axios from 'axios';

const baseURL = 'http://localHost:3001';
// const baseURL = 'https://phonebookamir.herokuapp.com';

const niceAlert = (textVal) => {
  Swal.fire({
    title: textVal,
    width: 600,
    padding: '3em',
  });
};

export async function getPersons() {
  try {
    const res = axios.get(`${baseURL}/api/persons`);
    return res;
  } catch (error) {
    if (error.response) niceAlert(error.response.data.error);
    else niceAlert(error);
  }
}

export async function deletePerson(id) {
  try {
    const res = axios.delete(`${baseURL}/api/persons/${id}`);
    return res;
  } catch (error) {
    if (error.response) niceAlert(error.response.data.error);
    else niceAlert(error);
  }
}

export async function addPerson(name, number) {
  try {
    const res = await axios.post(`${baseURL}/api/persons/`, { name, number });
    return res;
  } catch (error) {
    if (error.response) niceAlert(error.response.data.error);
    else niceAlert(error);
  }
}
