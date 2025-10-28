import { faker } from '@faker-js/faker'
import type { ComplaintItem } from './schema'

faker.seed(9012)

export const complaints: ComplaintItem[] = Array.from({ length: 80 }, () => {
  const statuses = ['baru', 'diproses', 'selesai', 'ditolak'] as const
  const priorities = ['rendah', 'sedang', 'tinggi'] as const

  return {
    id: `C-${faker.number.int({ min: 1000, max: 9999 })}`,
    title: faker.lorem.sentence({ min: 3, max: 8 }),
    status: faker.helpers.arrayElement(statuses),
    priority: faker.helpers.arrayElement(priorities),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    reporter: faker.person.fullName(),
    description: faker.lorem.paragraph(),
  }
})
