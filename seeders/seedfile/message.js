const faker = require('faker')

const messages = []

for (i = 0; i < 40; i++) {
  messages.push({
    message: faker.lorem.sentence(),
  })
}

module.exports = messages
