# Account Management Service
Account management server contains all the services which are able to administrate all the operations for authentication and authorization.

# Install dependencies
`npm install`
`npm run start:dev`

## Migrations
Migrations is a tool which allow us to manage the versions of our database for ACMA, with this tool we are able to update our database model and create versions of it.

### Create a new migration
`npm run migration:generate -- src/db/migrations/{migration_name}`
`npm run migration:run`