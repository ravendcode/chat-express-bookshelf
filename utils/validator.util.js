import validator from 'validator';
import i18n from 'i18n';

export default class Validator {
  constructor(__ = i18n.__) {
    this.__ = __;
    this.errors = {};
  }

  validate(rawData, rules) {
    this.rawData = rawData;
    this.rules = rules;
    return this.check().then((values) => {
      if (Object.keys(this.errors).length !== 0) {
        return Promise.reject({
          errors: this.errors,
        });
      }
    });
  }

  check() {
    let required;
    let email;
    let minlength;
    let maxlength;
    let min;
    let max;
    let notIn;
    let enums;
    let unique;
    let matches;
    let numeric;
    let decimal;
    let error;

    for (let field in this.rules) {
      for (let rule in this.rules[field]) {
        switch (rule) {
          case 'required': {
            required = this.required(field, this.rawData[field], this.rules[field][rule]);
            break;
          }
          case 'email': {
            email = this.email(field, this.rawData[field], this.rules[field][rule]);
            break;
          }
          case 'minlength': {
            minlength = this.minlength(field, this.rawData[field], this.rules[field][rule]);
            break;
          }
          case 'maxlength': {
            maxlength = this.maxlength(field, this.rawData[field], this.rules[field][rule]);
            break;
          }
          case 'min': {
            min = this.min(field, this.rawData[field], this.rules[field][rule]);
            break;
          }
          case 'max': {
            max = this.max(field, this.rawData[field], this.rules[field][rule]);
            break;
          }
          case 'notIn': {
            notIn = this.notIn(field, this.rawData[field], this.rules[field][rule]);
            break;
          }
          case 'enum': {
            enums = this.enum(field, this.rawData[field], this.rules[field][rule]);
            break;
          }
          case 'unique': {
            unique = this.unique(field, this.rawData[field], this.rules[field][rule]);
            break;
          }
          case 'match': {
            matches = this.match(field, this.rawData[field], this.rules[field][rule]);
            break;
          }
          case 'numeric': {
            numeric = this.numeric(field, this.rawData[field], this.rules[field][rule]);
            break;
          }
          case 'decimal': {
            decimal = this.decimal(field, this.rawData[field], this.rules[field][rule]);
            break;
          }
          default: {
            let message = `Rule ${rule} for ${field} no implements in validation`;
            error = Promise.reject({
              error: {
                message,
              },
            });
          }
        }
      }
    }
    return Promise.all([required, email, minlength, maxlength, min, max,
      notIn, enums, unique, matches, numeric, decimal, error,
    ]);
  }

  required(field, data, ruleValues) {
    let message = this.__('validation.required %s', this.__(`model.${field}`));
    if (Array.isArray(ruleValues)) {
      message = ruleValues.pop();
    } else {
      if (ruleValues !== true) {
        message = ruleValues;
      }
    }
    if (data === undefined || data.length <= 0) {
      this.errors[field] = {
        message: message,
      };
    }
  }

  email(field, data, ruleValues) {
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
        this.errors[field] = {
          message: message,
        };
      }
    }
  }

  minlength(field, data, ruleValues) {
    if (data !== undefined) {
      let message = this.__('validation.minlength %s %s', this.__(`model.${field}`), ruleValues);
      let value = ruleValues;
      if (Array.isArray(ruleValues)) {
        message = ruleValues.pop();
        value = ruleValues[0];
      }
      if (data.length < value) {
        this.errors[field] = {
          message: message,
        };
      }
    }
  }

  maxlength(field, data, ruleValues) {
    if (data !== undefined) {
      let message = this.__('validation.maxlength %s %s', this.__(`model.${field}`), ruleValues);
      let value = ruleValues;
      if (Array.isArray(ruleValues)) {
        message = ruleValues.pop();
        value = ruleValues[0];
      }
      if (data.length > value) {
        this.errors[field] = {
          message: message,
        };
      }
    }
  }

  min(field, data, ruleValues) {
    if (data !== undefined) {
      let message = this.__('validation.min %s %s', this.__(`model.${field}`), ruleValues);
      let value = ruleValues;
      if (Array.isArray(ruleValues)) {
        message = ruleValues.pop();
        value = ruleValues[0];
      }
      if (data < value) {
        this.errors[field] = {
          message: message,
        };
      }
    }
  }

  max(field, data, ruleValues) {
    if (data !== undefined) {
      let message = this.__('validation.max %s %s', this.__(`model.${field}`), ruleValues);
      let value = ruleValues;
      if (Array.isArray(ruleValues)) {
        message = ruleValues.pop();
        value = ruleValues[0];
      }
      if (data > value) {
        this.errors[field] = {
          message: message,
        };
      }
    }
  }

  notIn(field, data, ruleValues) {
    if (data !== undefined) {
      let message = this.__('validation.notIn %s', this.__(`model.${field}`));
      let values = ruleValues;
      if (Array.isArray(ruleValues)) {
        if (ruleValues[ruleValues.length - 1]) {
          message = ruleValues.pop();
        }
        if (values.some((element, index, array) => element === data)) {
          this.errors[field] = {
            message: message,
          };
        }
      } else {
        if (data === values) {
          this.errors[field] = {
            message: message,
          };
        }
      }
    }
  }

  enum(field, data, ruleValues) {
    if (data !== undefined) {
      let message = this.__('validation.enum %s', this.__(`model.${field}`));
      let values = ruleValues;
      if (Array.isArray(ruleValues)) {
        if (ruleValues[ruleValues.length - 1]) {
          message = ruleValues.pop();
        }
        if (!values.includes(data)) {
          this.errors[field] = {
            message: message,
          };
        }
      } else {
        if (data !== values) {
          this.errors[field] = {
            message: message,
          };
        }
      }
    }
  }

  numeric(field, data, ruleValues) {
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
        this.errors[field] = {
          message: message,
        };
      }
    }
  }

  decimal(field, data, ruleValues) {
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
        this.errors[field] = {
          message: message,
        };
      }
    }
  }

  match(field, data, ruleValues) {
    if (data !== undefined) {
      let message = this.__('validation.match %s', this.__(`model.${field}`));
      let value = ruleValues;
      if (Array.isArray(ruleValues)) {
        message = ruleValues.pop();
        value = ruleValues[0];
      }
      if (!validator.matches(data, value)) {
        this.errors[field] = {
          message: message,
        };
      }
    }
  }

  unique(field, data, ruleValues) {
    if (data !== undefined && data !== '') {
      let message = this.__('validation.unique %s', this.__(`model.${field}`));
      let Model = ruleValues;
      if (Array.isArray(ruleValues)) {
        message = ruleValues.pop();
        Model = ruleValues[0];
      }
      let obj = {};
      obj[field] = data;
      let self = this;

      return Model.findOne(obj).then((model) => {
        if (model) {
          self.errors[field] = {
            message: message,
          };
        }
      });
    }
  }
}
