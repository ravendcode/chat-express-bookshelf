// class Cat {
//   static get tableName() {
//     return 'Person';
//   }
//   constructor() {
//     this.name = 'cat';
//     this._age = 6;
//   }

//   get age() {
//     return this._age;
//   }
//   set age(age) {
//     this._age = age;
//   }

//   @dec(1)
//   @dec(2)
//   meow() {
//     return `${this.name} meow`;
//   }

//   toJSON() {
//     return {
//       name: this.name,
//     };
//   }
// }

// function readonly(target, key, descriptor) {
//   descriptor.writable = false;
//   return descriptor;
// }

// function dec(id) {
//   console.log('evaluated', id);
//   return (target, property, descriptor) => {};
//   // return (target, property, descriptor) => {
//   //   console.log('executed', id);
//   //   console.log(target[property]());
//   // };
// }
// let cat = new Cat();
// console.log(cat.meow());
// // console.log(Cat.tableName);
// console.log(JSON.stringify(cat));

class Validator {
  constructor() {
    this.errors = {};
  }

  validate(data, rules) {
    this.data = data;
    this.rules = rules;
    return check.bind(this)().then((result) => {
      // console.log('result', result);
      let errors = result.filter((error) => {
        return error !== undefined;
      });
      if (errors.length !== 0) {
        errors.forEach((e) => {
          this.errors[e.field] = {
            message: e[e.field].message
          };
        });

        return Promise.reject({
          errors: this.errors
        });
      }
    });
  }

  required(data, field, ruleValues) {
    let message = 'Must required';

    if (ruleValues !== true) {
      message = ruleValues;
    }

    let error = {
      field
    };

    if (data === undefined || data.length <= 0) {
      return new Promise((resolve, reject) => {
        error[field] = {
          message
        };
        resolve(error);
      });
    }
  }

  minlength() {

  }

}

function check() {
  let promises = [];
  for (let field in this.rules) {
    for (let rule in this.rules[field]) {
      try {
        promises.push(this[rule](this.data[field], field, this.rules[field][rule]));
      } catch (e) {
        if (e instanceof TypeError) {
          let message = `Rule ${rule} for ${field} no implements in validation.`;
          return Promise.reject({
            error: {
              message,
            },
          });
        }
      }
    }
  }
  return Promise.all(promises);
}

let data = {
  name: 'a'
};
// let data = {
//   name: 'a',
//   email: 'a'
// };
// let data = {};
let rules = {
  name: {
    required: true,
    minlength: 3,
    // maxlength: 10
  },
  email: {
    required: true
  }
};

// new Validator().validate(data, rules);

new Validator().validate(data, rules).then(() => {
  console.log('good');
}).catch((e) => console.log(e));
