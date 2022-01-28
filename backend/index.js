const AMOUNT_OF_COMMENTS = 10

const faker = require('faker')

function generateComments(amount, cursor) {
  const generateIdArray = (len) => {
    const arr = []
    for (let i = 0; i < len; i++) {
      arr.push(faker.datatype.uuid())
    }
    return arr
  }
  const idArray = generateIdArray(amount) /* генерация массива id */

  const getRandomParentId = (index) => {
    const randomId = Math.floor(Math.random() * amount)
    const parentId = idArray[randomId]
    if (index < randomId) {
      //если индекс родительского комментария в массиве больше чем индекс дочернего комментария, то return null
      return null
    }
    if (idArray[index] === parentId) {
      //если ID комментария равен рандомно выбранному комментарию, то возвразщаем null, так как комментарий не может быть родителем самого себя
      return null
    }
    return parentId
  }

  const commentsMaker = () => {
    const result = []
    for (let i = 0; i < amount; ++i) {
      result.push({
        id: idArray[i],
        parentId: getRandomParentId(i),
        user: faker.name.findName(),
        text: faker.lorem.text(),
      })
    }
    return result
  }

  return commentsMaker()
}

const express = require('express')
const port = process.env.PORT || 3001
const app = express()
// app.use(express.json())
// var allowCrossDomain = function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', "*");
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// };

// app.use(allowCrossDomain);

app.get('/comments', (req, res) => {
  // res.header("Access-Control-Allow-Origin", "*");
  // const { cursor } = req.query
  // const pageNum = Number(cursor);
  const cursor = parseInt(req.query.cursor) || 0
  console.log('page: ', cursor)
  res.json({
    comments: generateComments(AMOUNT_OF_COMMENTS, cursor),
    nextCursor: cursor + 1,
  })
  // res.send(generateComments());
})

app.listen(port, () => {
  console.log(`Server is starting on port ${port}`)
})
