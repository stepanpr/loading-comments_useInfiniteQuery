// import { array } from 'commentModel.js'
// import * as express from 'express';

function generateComments() {

/* для парентИД взять готовый ИД из базы данных ?*/

  return ({ comments: [
    {
      id: faker.datatype.uuid(),
      parentId: faker.datatype.uuid(),
      user: faker.name.findName(),
      text: faker.lorem.text(),
    },
    {
      id: faker.datatype.uuid(),
      parentId: faker.datatype.uuid(),
      user: faker.name.findName(),
      text: faker.lorem.text(),
    },
    {
      id: faker.datatype.uuid(),
      parentId: faker.datatype.uuid(),
      user: faker.name.findName(),
      text: faker.lorem.text(),
    },
    {
      id: faker.datatype.uuid(),
      parentId: faker.datatype.uuid(),
      user: faker.name.findName(),
      text: faker.lorem.text(),
    },
    
  ]});
}

const express = require("express");
const faker = require("faker");

const port = process.env.PORT || 3001;

const app = express();

var id = faker.datatype.uuid();

// app.use(express.json())

// var allowCrossDomain = function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', "*");
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// };

// app.use(allowCrossDomain);

app.get("/comments", (req, res) => {

  res.json(generateComments())
  // res.json(data)
  // res.header("Access-Control-Allow-Origin", "*");
  // res.send(generateComments());
});

app.listen(port, () => {
  console.log(`Server is starting on port ${port}`);
});
