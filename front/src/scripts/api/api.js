import axios from 'axios';

const baseURL = 'http://localHost:3001';

export async function getPersons() {
  try {
    const res = axios.get(`${baseURL}/api/persons`);
    return res;
  } catch (error) {
    alert(error);
  }
}

export async function deletePerson(id) {
  try {
    const res = axios.delete(`${baseURL}/api/persons/${id}`);
    return res;
  } catch (error) {
    alert(error);
  }
}
