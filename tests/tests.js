var date = new Date(1, 2, 3, 4, 5, 6, 7);
function isFunction(it){
  return {}.toString.call(it).slice(8, -1) === 'Function';
}

test('dtf.locale', function(){
  ok(isFunction(dtf.locale), 'Is function');
  dtf.locale('en');
  strictEqual(dtf.locale(), 'en', '.locale() is "en"');
  strictEqual(dtf.locale('ru'), 'ru', '.locale("ru") is "ru"');
  strictEqual(dtf.locale(), 'ru', '.locale() is "ru"');
  strictEqual(dtf.locale('xx'), 'ru', '.locale("xx") is "ru"');
});

test('dtf.addLocale', function(){
  ok(isFunction(dtf.addLocale), 'Is function');
  strictEqual(dtf.locale('en'), 'en');
  strictEqual(dtf.locale('zz'), 'en');
  dtf.addLocale('zz', {
    weekdays: 'Воскресенье,Понедельник,Вторник,Среда,Четверг,Пятница,Суббота',
    months: 'Январ:я|ь,Феврал:я|ь,Март:а|,Апрел:я|ь,Ма:я|й,Июн:я|ь,Июл:я|ь,Август:а|,Сентябр:я|ь,Октябр:я|ь,Ноябр:я|ь,Декабр:я|ь'
  });
  strictEqual(dtf.locale('zz'), 'zz');
  strictEqual(dtf.format(new Date(1, 2, 3, 4, 5, 6, 7), 'W, D MM Y'), 'Воскресенье, 3 Марта 1901');
});

test('dtf.format', function(){
  ok(isFunction(dtf.format), 'Is function');
  strictEqual(dtf.format(date, 'DD.NN.Y'), '03.03.1901', 'Works basic');
  dtf.locale('en');
  strictEqual(dtf.format(date, 's ss m mm h hh D DD W N NN M MM YY foo Y'), '6 06 5 05 4 04 3 03 Sunday 3 03 March March 01 foo 1901', 'Works with defaut locale');
  dtf.locale('ru');
  strictEqual(dtf.format(date, 's ss m mm h hh D DD W N NN M MM YY foo Y'), '6 06 5 05 4 04 3 03 Воскресенье 3 03 Март Марта 01 foo 1901', 'Works with set in Date.locale locale');
});

test('dtf.formatUTC', function(){
  ok(isFunction(dtf.formatUTC), 'Is function');
  strictEqual(dtf.formatUTC(date, 'h'), '' + date.getUTCHours(), 'Works');
});

test('dtf.extend', function(){
  ok(isFunction(dtf.extend), 'Is function');
  ok(!isFunction(Date.prototype.format), 'Before dtf.extend() Date.prototype.format is absent');
  ok(!isFunction(Date.prototype.formatUTC), 'Before dtf.extend() Date.prototype.formatUTC is absent');
  dtf.extend();
  ok(isFunction(Date.prototype.format), 'Before dtf.extend() Date.prototype.format is present');
  ok(isFunction(Date.prototype.formatUTC), 'Before dtf.extend() Date.prototype.formatUTC is present');
});

test('Date#format', function(){
  ok(isFunction(Date.prototype.format), 'Is function');
  strictEqual(date.format('DD.NN.Y'), '03.03.1901', 'Works basic');
  dtf.locale('en');
  strictEqual(date.format('s ss m mm h hh D DD W N NN M MM YY foo Y'), '6 06 5 05 4 04 3 03 Sunday 3 03 March March 01 foo 1901', 'Works with defaut locale');
  dtf.locale('ru');
  strictEqual(date.format('s ss m mm h hh D DD W N NN M MM YY foo Y'), '6 06 5 05 4 04 3 03 Воскресенье 3 03 Март Марта 01 foo 1901', 'Works with set in Date.locale locale');
});

test('Date#formatUTC', function(){
  ok(isFunction(Date.prototype.formatUTC), 'Is function');
  strictEqual(date.formatUTC('h'), '' + date.getUTCHours(), 'Works');
});