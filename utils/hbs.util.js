import i18n from 'i18n';

export default (hbs) => {
  let blocks = {};

  hbs.registerHelper('extend', function (name, context) {
    let block = blocks[name];
    if (!block) {
      block = blocks[name] = [];
    }
    // for older versions of handlebars, use block.push(context(this))
    block.push(context.fn(this));
  });

  hbs.registerHelper('block', function (name) {
    let val = (blocks[name] || []).join('\n');
    // clear the block
    blocks[name] = [];
    return val;
  });

  hbs.registerHelper('toUpper', (text) => {
    return text.toUpperCase();
  });

  hbs.registerHelper('toLower', (text) => {
    return text.toLowerCase();
  });

  hbs.registerHelper('__', function (...args) {
    return i18n.__.apply(this, args);
  });

  hbs.registerHelper('__n', function (...args) {
    return i18n.__n.apply(this, args);
  });
};
