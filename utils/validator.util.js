import validator from 'validator';
import i18n from 'i18n';

export default class Validator {
  constructor(__ = i18n.__) {
    this.__ = __;
    this.errors = {};
  }

  validate(data, rules) {
    this.data = data;
    this.rules = rules;
    return check.bind(this)().then((result) => {
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
    let error = {
      field
    };
    let message = this.__('validation.required %s', this.__(`model.${field}`));
    if (Array.isArray(ruleValues)) {
      message = ruleValues.pop();
    } else {
      if (ruleValues !== true) {
        message = ruleValues;
      }
    }
    if (data === undefined || data.length <= 0) {
      return new Promise((resolve, reject) => {
        error[field] = {
          message
        };
        resolve(error);
      });
    }
  }

  email(data, field, ruleValues) {
    let error = {
      field
    };
    if (data !== undefined) {
      let message = this.__('validation.email %s', this.__(`model.${field}`));
      if (Array.isArray(ruleValues)) {
        message = ruleValues.pop();
      } else {
        if (ruleValues !== true) {
          message = ruleValues;
        }
      }
      if (!validator.isEmail(data)) {
        return new Promise((resolve, reject) => {
          error[field] = {
            message
          };
          resolve(error);
        });
      }
    }
  }

  minlength(data, field, ruleValues) {
    let error = {
      field
    };
    if (data !== undefined) {
      let message = this.__('validation.minlength %s %s', this.__(`model.${field}`), ruleValues);
      let value = ruleValues;
      if (Array.isArray(ruleValues)) {
        message = ruleValues.pop();
        value = ruleValues[0];
      }
      if (data.length < value) {
        return new Promise((resolve, reject) => {
          error[field] = {
            message
          };
          resolve(error);
        });
      }
    }
  }

  maxlength(data, field, ruleValues) {
    let error = {
      field
    };
    if (data !== undefined) {
      let message = this.__('validation.maxlength %s %s', this.__(`model.${field}`), ruleValues);
      let value = ruleValues;
      if (Array.isArray(ruleValues)) {
        message = ruleValues.pop();
        value = ruleValues[0];
      }
      if (data.length > value) {
        return new Promise((resolve, reject) => {
          error[field] = {
            message
          };
          resolve(error);
        });
      }
    }
  }

  min(data, field, ruleValues) {
    let error = {
      field
    };
    if (data !== undefined) {
      let message = this.__('validation.min %s %s', this.__(`model.${field}`), ruleValues);
      let value = ruleValues;
      if (Array.isArray(ruleValues)) {
        message = ruleValues.pop();
        value = ruleValues[0];
      }
      if (data < value) {
        return new Promise((resolve, reject) => {
          error[field] = {
            message
          };
          resolve(error);
        });
      }
    }
  }

  max(data, field, ruleValues) {
    let error = {
      field
    };
    if (data !== undefined) {
      let message = this.__('validation.max %s %s', this.__(`model.${field}`), ruleValues);
      let value = ruleValues;
      if (Array.isArray(ruleValues)) {
        message = ruleValues.pop();
        value = ruleValues[0];
      }
      if (data > value) {
        return new Promise((resolve, reject) => {
          error[field] = {
            message
          };
          resolve(error);
        });
      }
    }
  }

  notIn(data, field, ruleValues) {
    let error = {
      field
    };
    if (data !== undefined) {
      let message = this.__('validation.notIn %s', this.__(`model.${field}`));
      let values = ruleValues;
      if (Array.isArray(ruleValues)) {
        if (ruleValues[ruleValues.length - 1]) {
          message = ruleValues.pop();
        }
        if (values.some((element, index, array) => element === data)) {
          return new Promise((resolve, reject) => {
            error[field] = {
              message
            };
            resolve(error);
          });
        }
      } else {
        if (data === values) {
          return new Promise((resolve, reject) => {
            error[field] = {
              message
            };
            resolve(error);
          });
        }
      }
    }
  }

  enum(data, field, ruleValues) {
    let error = {
      field
    };
    if (data !== undefined) {
      let message = this.__('validation.enum %s', this.__(`model.${field}`));
      let values = ruleValues;
      if (Array.isArray(ruleValues)) {
        if (ruleValues[ruleValues.length - 1]) {
          message = ruleValues.pop();
        }
        if (!values.includes(data)) {
          return new Promise((resolve, reject) => {
            error[field] = {
              message
            };
            resolve(error);
          });
        }
      } else {
        if (data !== values) {
          return new Promise((resolve, reject) => {
            error[field] = {
              message
            };
            resolve(error);
          });
        }
      }
    }
  }

  numeric(data, field, ruleValues) {
    let error = {
      field
    };
    if (data !== undefined) {
      let message = this.__('validation.numeric %s', this.__(`model.${field}`));
      if (Array.isArray(ruleValues)) {
        message = ruleValues.pop();
      } else {
        if (ruleValues !== true) {
          message = ruleValues;
        }
      }
      if (!validator.isNumeric(data)) {
        return new Promise((resolve, reject) => {
          error[field] = {
            message
          };
          resolve(error);
        });
      }
    }
  }

  decimal(data, field, ruleValues) {
    let error = {
      field
    };
    if (data !== undefined) {
      let message = this.__('validation.decimal %s', this.__(`model.${field}`));
      if (Array.isArray(ruleValues)) {
        message = ruleValues.pop();
      } else {
        if (ruleValues !== true) {
          message = ruleValues;
        }
      }
      if (!validator.isDecimal(data)) {
        return new Promise((resolve, reject) => {
          error[field] = {
            message
          };
          resolve(error);
        });
      }
    }
  }

  match(data, field, ruleValues) {
    let error = {
      field
    };
    if (data !== undefined) {
      let message = this.__('validation.match %s', this.__(`model.${field}`));
      let value = ruleValues;
      if (Array.isArray(ruleValues)) {
        message = ruleValues.pop();
        value = ruleValues[0];
      }
      if (!validator.matches(data, value)) {
        return new Promise((resolve, reject) => {
          error[field] = {
            message
          };
          resolve(error);
        });
      }
    }
  }

  unique(data, field, ruleValues) {
    let error = {
      field
    };
    if (data !== undefined && data !== '') {
      let message = this.__('validation.unique %s', this.__(`model.${field}`));
      let Model = ruleValues;
      let value;
      if (ruleValues.model !== undefined) {
        Model = ruleValues.model;
      }

      if (ruleValues.value !== undefined) {
        value = ruleValues.value;
      }

      if (ruleValues.message !== undefined) {
        message = ruleValues.message;
      }

      let obj = {};
      obj[field] = data;

      // Mongo
      // return Model.findOne(obj).then((model) => {
      //   if (model) {
      //     return new Promise((resolve, reject) => {
      //       error[field] = {
      //         message
      //       };
      //       resolve(error);
      //     });
      //   }
      // });

      // Bookshelf
      return Model.forge(obj).fetch().then((model) => {
        if (value !== undefined) {
          if (model && model.toJSON()[field] !== value) {
            return new Promise((resolve, reject) => {
              error[field] = {
                message
              };
              resolve(error);
            });
          }
        } else {
          if (model) {
            return new Promise((resolve, reject) => {
              error[field] = {
                message
              };
              resolve(error);
            });
          }
        }
      });
    }
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
