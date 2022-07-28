import {
  createServer,
  Factory,
  Model,
  Response,
  ActiveModelSerializer,
} from 'miragejs'
import { faker } from '@faker-js/faker'

import { User } from '../../@types/UserType'

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      user: Model.extend<Partial<User>>({}),
    },

    factories: {
      user: Factory.extend({
        name(i: number) {
          return faker.name.findName()
        },
        email() {
          return faker.internet.email().toLowerCase()
        },
        createdAt() {
          return faker.date.recent(5)
        },
      }),
    },

    seeds(server) {
      server.createList('user', 100)
    },

    routes() {
      this.namespace = 'api'
      this.timing = 750

      this.get('/users', function (schema, request) {
        const { page = 1, perPage = 5 } = request.queryParams

        const total = schema.all('user').length

        const pageStart = (Number(page) - 1) * Number(perPage)
        const pageEnd = pageStart + Number(perPage)

        const users = this.serialize(schema.all('user'))
          .users.sort(
            (a: User, b: User) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime(),
          )
          .slice(pageStart, pageEnd)

        return new Response(200, { 'x-total-count': String(total) }, { users })
      })

      this.get('/users/:id')
      this.post('/users')

      this.namespace = ''
      this.passthrough()
    },
  })

  return server
}
