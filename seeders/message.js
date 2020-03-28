const faker = require('faker')

const messages = []

for (i = 0; i < 10; i++) {
  messages.push({
    message: faker.lorem.sentence(),
  })
}

module.exports = messages
