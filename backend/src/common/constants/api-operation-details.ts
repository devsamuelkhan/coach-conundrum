export const API_OPERATIONS = {
  USER:{
    SIGNUP: {
      summary: 'SignUp',
      description: 'Create a new user',
    },
    LOGIN: {
      summary: 'Login',
      description: 'login user account',
    },
  },
  DEFAULT :{
    CREATE: {
      summary: 'Create a new record',
      description: 'Endpoint to create a new record in the database',
    },
    FIND_ALL: {
      summary: 'Retrieve all records',
      description: 'Endpoint to retrieve all records from the database',
    },
    FIND_ONE: {
      summary: 'Retrieve a single record by ID',
      description: 'Endpoint to retrieve a single record by its unique identifier',
    },
    UPDATE: {
      summary: 'Update a record by ID',
      description: 'Endpoint to update an existing record in the database',
    },
    REMOVE: {
      summary: 'Delete a record by ID',
      description: 'Endpoint to delete a record from the database',
    },
    SOFT_REMOVE: {
      summary: 'Soft delete a record by ID',
      description: 'Endpoint to soft delete a record from the database',
    },
  }
  };
  