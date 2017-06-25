
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name: 'root', email: 'root@email.com', password: 'qwerty', is_staff: true},
        {id: 2, name: 'vova', email: 'vova@email.com', password: 'qwerty'},
        {id: 3, name: 'bob', email: 'bob@email.com', password: 'qwerty'},
        {id: 4, name: 'fox', email: 'fox@email.com', password: 'qwerty'},
      ]);
    });
};

// let users = [];
// for (let i = 1; i <= 4; i++) {
//   if (i === 1) {
//     users.push({id: i, name: 'root', email: 'root@email.com', password: 'qwerty', is_staff: true});
//   }

// }
