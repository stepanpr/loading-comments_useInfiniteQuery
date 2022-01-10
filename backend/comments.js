import faker from "faker";

// export const CommentModel = {
//   id: () => faker.random.uuid(),
//   parentId: () => faker.random.uuid(),
//   user: (() => faker.name.firstName()) + " " + (() => faker.name.lastName()),
//   text: "hello1",
// };

export const array = [ {user: "sdsd"}]

/* для парентИД взять готовый ИД из базы данных ?*/

const CommentModel = {
    id: () => faker.random.uuid(),
    parentId: () => faker.random.uuid(),
    user: (() => faker.name.firstName()) + " " + (() => faker.name.lastName()),
    text: "hello1",
  };