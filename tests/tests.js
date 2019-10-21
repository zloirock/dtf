var date = new Date(1, 2, 3, 4, 5, 6, 7);
function isFunction(it){
  return {}.toString.call(it).slice(8, -1) === 'Function';
}

QUnit.test('dtf.locale', function(assert){
  assert.ok(isFunction(dtf.locale), 'Is function');
  dtf.locale('en');
  assert.strictEqual(dtf.locale(), 'en', '.locale() is "en"');
  assert.strictEqual(dtf.locale('ru'), 'ru', '.locale("ru") is "ru"');
  assert.strictEqual(dtf.locale(), 'ru', '.locale() is "ru"');
  assert.strictEqual(dtf.locale('xx'), 'ru', '.locale("xx") is "ru"');
});

QUnit.test('dtf.addLocale', function(assert){
  assert.ok(isFunction(dtf.addLocale), 'Is function');
  assert.strictEqual(dtf.locale('en'), 'en');
  assert.strictEqual(dtf.locale('zz'), 'en');
  dtf.addLocale('zz', {
    weekdays: 'Воскресенье,Понедельник,Вторник,Среда,Четверг,Пятница,Суббота',
    months: 'Январ:я|ь,Феврал:я|ь,Март:а|,Апрел:я|ь,Ма:я|й,Июн:я|ь,Июл:я|ь,Август:а|,Сентябр:я|ь,Октябр:я|ь,Ноябр:я|ь,Декабр:я|ь'
  });
  assert.strictEqual(dtf.locale('zz'), 'zz');
  assert.strictEqual(dtf.format(new Date(1, 2, 3, 4, 5, 6, 7), 'W, D MM Y'), 'Воскресенье, 3 Марта 1901');
});

QUnit.test('dtf.format', function(assert){
  assert.ok(isFunction(dtf.format), 'Is function');
  assert.strictEqual(dtf.format(date, 'DD.NN.Y'), '03.03.1901', 'Works basic');
  dtf.locale('en');
  assert.strictEqual(dtf.format(date, 's ss m mm h hh D DD W N NN M MM YY foo Y'), '6 06 5 05 4 04 3 03 Sunday 3 03 March March 01 foo 1901', 'Works with defaut locale');
  dtf.locale('ru');
  assert.strictEqual(dtf.format(date, 's ss m mm h hh D DD W N NN M MM YY foo Y'), '6 06 5 05 4 04 3 03 Воскресенье 3 03 Март Марта 01 foo 1901', 'Works with set in Date.locale locale');
});

QUnit.test('dtf.formatUTC', function(assert){
  assert.ok(isFunction(dtf.formatUTC), 'Is function');
  assert.strictEqual(dtf.formatUTC(date, 'h'), '' + date.getUTCHours(), 'Works');
});

QUnit.test('dtf.extend', function(assert){
  assert.ok(isFunction(dtf.extend), 'Is function');
  assert.ok(!isFunction(Date.prototype.format), 'Before dtf.extend() Date.prototype.format is absent');
  assert.ok(!isFunction(Date.prototype.formatUTC), 'Before dtf.extend() Date.prototype.formatUTC is absent');
  dtf.extend();
  assert.ok(isFunction(Date.prototype.format), 'Before dtf.extend() Date.prototype.format is present');
  assert.ok(isFunction(Date.prototype.formatUTC), 'Before dtf.extend() Date.prototype.formatUTC is present');
});

QUnit.test('Date#format', function(assert){
  assert.ok(isFunction(Date.prototype.format), 'Is function');
  assert.strictEqual(date.format('DD.NN.Y'), '03.03.1901', 'Works basic');
  dtf.locale('en');
  assert.strictEqual(date.format('s ss m mm h hh D DD W N NN M MM YY foo Y'), '6 06 5 05 4 04 3 03 Sunday 3 03 March March 01 foo 1901', 'Works with defaut locale');
  dtf.locale('ru');
  assert.strictEqual(date.format('s ss m mm h hh D DD W N NN M MM YY foo Y'), '6 06 5 05 4 04 3 03 Воскресенье 3 03 Март Марта 01 foo 1901', 'Works with set in Date.locale locale');
});

QUnit.test('Date#formatUTC', function(assert){
  assert.ok(isFunction(Date.prototype.formatUTC), 'Is function');
  assert.strictEqual(date.formatUTC('h'), '' + date.getUTCHours(), 'Works');
});