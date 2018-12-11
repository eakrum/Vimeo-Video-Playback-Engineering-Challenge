//standard procedure to instantiate Vimeo API to make calls
const Vimeo = require("vimeo").Vimeo;
const credentials = require("./api-credentials.json");
const client = new Vimeo(
  credentials.clientID,
  credentials.clientSecret,
  credentials.clientAccess
);
//make each query into a promise so we can make sure we're getting our data back more organized in mainRoutes.js
const searchVimeo = search => {
  return new Promise((resolve, reject) => {
    //GET request to Vimeo API to get 10 videos based on query, then sort in relevance - as per docs.
    client.request(
      {
        method: "GET",
        path: "/videos",
        query: {
          page: 1,
          per_page: 10,
          fields: "uri,name",
          sort: "relevant",
          query: search
        }
      },
      (error, body) => {
        if (error) {
          reject(error); //reject the promise
        } else {
          resolve(body); //everything went well, send the data!
        }
      }
    );
  });
};
module.exports = {
  searchVimeo
};
