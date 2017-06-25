class Cat {
  static get tableName() {
    return 'Person';
  }
  constructor() {
    this.name = 'cat';
    this._age = 6;
  }

  get age() {
    return this._age;
  }
  set age(age) {
    this._age = age;
  }

  @dec(1)
  @dec(2)
  meow() {
    return `${this.name} meow`;
  }
}

// function readonly(target, key, descriptor) {
//   descriptor.writable = false;
//   return descriptor;
// }

function dec(id) {
  console.log('evaluated', id);
  return (target, property, descriptor) => {};
  // return (target, property, descriptor) => {
  //   console.log('executed', id);
  //   console.log(target[property]());
  // };
}
let cat = new Cat();
console.log(cat.meow());
// console.log(Cat.tableName);

