# GLAnalyticsServer contains the server functionality for the Game Learning Analytics App (GLAnalyticsApp).

How to run:

First step, add three enviroments variables called:
* DB_USERNAME, database username
* DB_PASSWORD, database password
* DB_NAME, database name

Second step, excute command to install dependences: ``` npm install ```

Third step, execute the commands to create table and add some register in tables ```npx sequelize-cli db:migrate``` and ```npx sequelize-cli db:seed:all```

The final step, to run the server in development enviroment, run ```npm run dev``` command.

## Tips

Create new migrations:
```
npx sequelize-cli migration:generate --name MIGRATION_NAME
```

Execute migrations
```
npx sequelize-cli db:migrate
```

Create new seeds
```
npx sequelize-cli seed:generate --name SEED_NAME
```

Execute seed
```
npx sequelize-cli db:seed:all
```
# Copy-GLAnaliticsServer
#   C o p y - G L A n a l y t i c s S e r v e r  
 #   C o p y - G L A n a l y t i c s S e r v e r  
 # Copy-GLAnalyticsServer
