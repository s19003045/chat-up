const faker = require('faker')
const uuid = require('uuid')
const uuidv4 = uuid.v4
const rooms = []

for (i = 0; i < 20; i++) {
  rooms.push({
    uuid: uuidv4(),
    name: faker.lorem.word(),
  })
}

console.log(rooms)

module.exports = rooms