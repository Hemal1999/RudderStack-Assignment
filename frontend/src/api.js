import axios from "axios";

export const getAllTemplateTypeDetail = async () => {
  let res = await axios.get('http://localhost:8080/api/getAllTypes');
  console.log(res, "testin==response")
  let data = res.data;
  return data
}


export const getOneTemplate = async (type) => {

  let res = await axios.get(`http://localhost:8080/api/getOneTemplate/${type}`);
  console.log(res, "testin==response")
  let data = res.data;
  return data
}


//   {
//     "sourceType": "source7",
//     "payload": {
//         "apiKey": "bx",
//         "useHTTP": true
//         } }

export const createSource = async (body) => {
  const headers = {
    'Content-Type': 'application/json'
  };
  axios.post('http://localhost:8080/api/post-payload', body, headers)
    .then((response) => {
      console.log(response);
      return response.data;
    }, (error) => {
      console.log(error);
    });

  //   let res = await axios.post("http://localhost:8080/api/post-payload",body);

  //   console.log(res, "testin==response");
  //   let data = res.data;

};


axios.post('/login', {
  firstName: 'Finn',
  lastName: 'Williams'
})
  .then((response) => {
    console.log(response);
  }, (error) => {
    console.log(error);
  });