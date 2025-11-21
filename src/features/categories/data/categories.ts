import { faker } from '@faker-js/faker'

// Set a fixed seed for consistent data generation
faker.seed(67890)

export const categories = Array.from({ length: 500 }, () => {
  return {
    id: faker.string.uuid(),
    title: faker.commerce.department(),
    description: faker.lorem.sentence(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }
})
