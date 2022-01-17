// import { array } from 'commentModel.js'
// import * as express from 'express';

function generateComments() {

/* для парентИД взять готовый ИД из базы данных ?*/
/* создать массивы для ID */
  // const parentId
  const idObj = {one: faker.datatype.uuid(), two:faker.datatype.uuid(), three:faker.datatype.uuid(), four:faker.datatype.uuid()}
  const arrID = [faker.datatype.uuid(), faker.datatype.uuid(), faker.datatype.uuid(), faker.datatype.uuid(), faker.datatype.uuid(), faker.datatype.uuid(), faker.datatype.uuid(), faker.datatype.uuid(),  null]

  randFunc = (key) => {
    // arrFunc[Math.floor(Math.random() * arrFunc.length)]();
    const keyRand = Math.floor(Math.random() * arrID.length)
    const id = arrID[keyRand]
    // if (key < keyRand) { //если индекс родительского комментария в масииве больше чем индекс дочернего комментария, то return null
    //   // console.log(key, ' : ' , keyRandom )
    //   return null
    // }
    if(arrID[key] === id) { //если ID комментария равен рандомно выбранному комментарию, то возвразщаем null, так как комментарий не может быть родителем самого себя 
      // console.log(id, ' : ' , arrID[key] )
      return null
    }
    return id
  }

  // console.log(arrID.one)

  return ({ comments: [
    {
      id: arrID[0],
      parentId: randFunc(0),
      user: faker.name.findName(),
      text: faker.lorem.text(),
    },
    {
      id: arrID[1],
      parentId: randFunc(1),
      user: faker.name.findName(),
      text: faker.lorem.text(),
    },
    {
      id: arrID[2],
      parentId: randFunc(2),
      user: faker.name.findName(),
      text: faker.lorem.text(),
    },
    {
      id: arrID[3],
      parentId: randFunc(3),
      user: faker.name.findName(),
      text: faker.lorem.text(),
    },
    {
      id: arrID[4],
      parentId: randFunc(0),
      user: faker.name.findName(),
      text: faker.lorem.text(),
    },
    {
      id: arrID[5],
      parentId: randFunc(1),
      user: faker.name.findName(),
      text: faker.lorem.text(),
    },
    {
      id: arrID[6],
      parentId: randFunc(2),
      user: faker.name.findName(),
      text: faker.lorem.text(),
    },
    {
      id: arrID[7],
      parentId: randFunc(3),
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


