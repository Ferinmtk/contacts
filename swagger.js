// swagger.js
module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Contacts API',
    version: '1.0.0',
    description: 'A simple Express Contacts API'
  },
  servers: [
    {
      url: 'http://localhost:3000', // replace with Render URL on deploy
      description: 'Local server'
    }
  ],
  paths: {
    '/contacts': {
      get: {
        summary: 'Get all contacts',
        responses: {
          200: {
            description: 'List of all contacts'
          }
        }
      },
      post: {
        summary: 'Create a new contact',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Contact'
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Contact created'
          }
        }
      }
    },
    '/contacts/{id}': {
      get: {
        summary: 'Get contact by ID',
        parameters: [{
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' }
        }],
        responses: {
          200: { description: 'Contact found' },
          404: { description: 'Contact not found' }
        }
      },
      put: {
        summary: 'Update a contact',
        parameters: [{
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' }
        }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Contact'
              }
            }
          }
        },
        responses: {
          204: { description: 'Contact updated successfully' },
          404: { description: 'Contact not found' }
        }
      },
      delete: {
        summary: 'Delete a contact',
        parameters: [{
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' }
        }],
        responses: {
          204: { description: 'Contact deleted successfully' },
          404: { description: 'Contact not found' }
        }
      }
    }
  },
  components: {
    schemas: {
      Contact: {
        type: 'object',
        required: ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'],
        properties: {
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          email: { type: 'string', format: 'email' },
          favoriteColor: { type: 'string' },
          birthday: { type: 'string', format: 'date' }
        }
      }
    }
  }
};
