const { pactWith } = require('jest-pact')
const axios = require('axios')

pactWith(
  { consumer: 'Pact demo consumer', provider: 'Pact demo provider' },
  (provider) => {
    let client

    beforeEach(() => {
      client = axios.create({
        baseURL: provider.mockService.baseUrl,
      })
    })

    describe('some endpoint', () => {
      beforeEach(() =>
        provider.addInteraction({
          uponReceiving: 'A request',
          withRequest: {
            method: 'GET',
            path: '/',
          },
          willRespondWith: {
            status: 200,
            body: {
              status: 'ok',
            },
          },
        })
      )

      it('returns data', () =>
        client
          .get('/')
          .then((response) => expect(response.data.status).toEqual('ok')))
    })
  }
)
