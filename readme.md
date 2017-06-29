# Chat Express Bookshelf

### Features
1. ES6
2. Validator
3. Handlebars
4. I18n
5. Tests
6. WebSocket
7. Bookshelf
8. Eslint best standart

### Usage
1. Edit `config.js` and `knexfile.js`
2. `openssl genrsa 1024 > ssl/private.key`
3. `openssl req -new -key ssl/private.key -out ssl/cert.csr`
4. `openssl x509 -req -in ssl/cert.csr -signkey ssl/private.key -out ssl/certificate.pem`
5. `npm i`
6. `npm i -g knex`
7. `knex migrate:latest`
8. `npm run dev`
