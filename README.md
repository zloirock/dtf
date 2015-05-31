# dtf<sup>[![version](http://vb.teelaun.ch/zloirock/dtf.svg)](https://www.npmjs.org/package/dtf/)</sup>
Simple and compact `Date` formatting. Extracted from [core-js](https://github.com/zloirock/core-js). By default available english (`en`) and russian (`ru`) locales.

[development version](https://raw.githack.com/zloirock/dtf/master/index.js), [production version](https://raw.githack.com/zloirock/dtf/master/dtf.min.js)

[![NPM](https://nodei.co/npm/dtf.png?downloads=true)](https://www.npmjs.org/package/dtf/)

```javascript
dtf
  .format(date, format, locale?) -> str
  .formatUTC(date, format, locale?) -> str
  .locale(locale?) -> locale
  .addLocale(locale, object) -> dtf
  .extend() -> dtf
Date
  #format(format, locale?) -> str, available after dtf.extend()
  #formatUTC(format, locale?) -> str, available after dtf.extend()
```

Token | Unit | Sample
------|----- | ------
s  | Seconds           | 0-59
ss | Seconds, 2 digits | 00-59
m  | Minutes           | 0-59
mm | Minutes, 2 digits | 00-59
h  | Hours             | 0-23
hh | Hours, 2 digits   | 00-23
D  | Date              | 1-31
DD | Date, 2 digits    | 01-31
W  | Weekday, string   | Вторник
N  | Month             | 1-12
NN | Month, 2 digits   | 01-12
M  | Month, string     | Ноябрь
MM | Of month, string  | Ноября
Y  | Year, full        | 2014
YY | Year, 2 digits    | 14

[Examples](http://goo.gl/zBaEQt):
```javascript
var dtf = require('dtf'); // w/o modular system available as global `dtf`

dtf.format(new Date(), 'W, MM D, YY, h:mm:ss');        // => 'Friday, November 28, 14, 18:47:05'
dtf.formatUTC(new Date(), 'W, MM D, YY, h:mm:ss');     // => 'Friday, November 28, 14, 12:47:05'

dtf.format(new Date(), 'W, D MM Y г., h:mm:ss', 'ru'); // => 'Пятница, 28 Ноября 2014 г., 18:07:25'

// set default locale
dtf.locale('ru');
dtf.format(new Date(), 'W, D MM Y г., h:mm:ss');       // => 'Пятница, 28 Ноября 2014 г., 18:07:25'

dtf.format(new Date(), 'DD.NN.YY');         // => '28.11.14'
dtf.format(new Date(), 'hh:mm:ss');         // => '18:47:05'
dtf.format(new Date(), 'DD.NN.Y hh:mm:ss'); // => '28.11.2014 18:47:05'
dtf.format(new Date(), 'W, D MM Y года');   // => 'Пятница, 28 Ноября 2014 года'
dtf.format(new Date(), 'D MM, h:mm');       // => '28 Ноября, 16:47'
dtf.format(new Date(), 'M Y');              // => 'Ноябрь 2014'

dtf.locale('en');

// adds Date#format and Date#formatUTC methods to Date.prototype:
dtf.extend();

new Date().format('W, MM D, YY, h:mm:ss');        // => 'Friday, November 28, 14, 18:47:05'
new Date().formatUTC('W, MM D, YY, h:mm:ss');     // => 'Friday, November 28, 14, 12:47:05'

new Date().format('W, D MM Y г., h:mm:ss', 'ru'); // => 'Пятница, 28 Ноября 2014 г., 18:07:25'

dtf.locale('ru');
new Date().format('W, D MM Y г., h:mm:ss');       // => 'Пятница, 28 Ноября 2014 г., 18:07:25'

new Date().format('DD.NN.YY');         // => '28.11.14'
new Date().format('hh:mm:ss');         // => '18:47:05'
new Date().format('DD.NN.Y hh:mm:ss'); // => '28.11.2014 18:47:05'
new Date().format('W, D MM Y года');   // => 'Пятница, 28 Ноября 2014 года'
new Date().format('D MM, h:mm');       // => '28 Ноября, 16:47'
new Date().format('M Y');              // => 'Ноябрь 2014'

// example adding new locale:
dtf.addLocale('ru', {
  weekdays: 'Воскресенье,Понедельник,Вторник,Среда,Четверг,Пятница,Суббота',
  months: 'Январ:я|ь,Феврал:я|ь,Март:а|,Апрел:я|ь,Ма:я|й,Июн:я|ь,Июл:я|ь,Август:а|,Сентябр:я|ь,Октябр:я|ь,Ноябр:я|ь,Декабр:я|ь'
});
```
## Changelog
##### 1.0.0 - 2015.05.31
  * publish