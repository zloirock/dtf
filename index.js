/**
 * dtf 1.0.0
 * https://github.com/zloirock/dtf
 * License: http://rock.mit-license.org
 * © 2015 Denis Pushkarev
 */
!function(){
  var global       = typeof self != 'undefined' ? self : Function('return this')()
    , DateProto    = Date.prototype
    , has          = {}.hasOwnProperty
    , formatRegExp = /\b\w\w?\b/g
    , flexioRegExp = /:(.*)\|(.*)$/
    , locales      = {}
    , current      = 'en'
    , SECONDS      = 'Seconds'
    , MINUTES      = 'Minutes'
    , HOURS        = 'Hours'
    , DATE         = 'Date'
    , MONTH        = 'Month'
    , YEAR         = 'FullYear';

  function $define(key, value){
    try {
      Object.defineProperty(DateProto, key, {configurable: true, writable: true, value: value});
    } catch(e){
      DateProto[key] = value;
    }
  }

  function lz(num){
    return num > 9 ? num : '0' + num;
  }

  function $format(date, prefix, template, locale /* = current */){
    var dict = locales[has.call(locales, locale) ? locale : current];
    function get(unit){
      return date[prefix + unit]();
    }
    return String(template).replace(formatRegExp, function(part){
      switch(part){
        case 's'  : return get(SECONDS);                    // Seconds : 0-59
        case 'ss' : return lz(get(SECONDS));                // Seconds : 00-59
        case 'm'  : return get(MINUTES);                    // Minutes : 0-59
        case 'mm' : return lz(get(MINUTES));                // Minutes : 00-59
        case 'h'  : return get(HOURS);                      // Hours   : 0-23
        case 'hh' : return lz(get(HOURS));                  // Hours   : 00-23
        case 'D'  : return get(DATE);                       // Date    : 1-31
        case 'DD' : return lz(get(DATE));                   // Date    : 01-31
        case 'W'  : return dict[0][get('Day')];             // Day     : Понедельник
        case 'N'  : return get(MONTH) + 1;                  // Month   : 1-12
        case 'NN' : return lz(get(MONTH) + 1);              // Month   : 01-12
        case 'M'  : return dict[2][get(MONTH)];             // Month   : Январь
        case 'MM' : return dict[1][get(MONTH)];             // Month   : Января
        case 'Y'  : return get(YEAR);                       // Year    : 2014
        case 'YY' : return lz(get(YEAR) % 100);             // Year    : 14
      } return part;
    });
  }

  function addLocale(lang, locale){
    function split(index){
      var result = Array(7)
        , months = locale.months.split(',')
        , i      = 0;
      while(i < 7)result[i] = months[i++].replace(flexioRegExp, '$' + index);
      return result;
    }
    locales[lang] = [locale.weekdays.split(','), split(1), split(2)];
    return dtf;
  }

  var dtf = {
    format: function(date, template, locale){
      return $format(date, 'get', template, locale);
    },
    formatUTC: function(date, template, locale){
      return $format(date, 'getUTC', template, locale);
    },
    addLocale: addLocale,
    locale: function(locale){
      return has.call(locales, locale) ? current = locale : current;
    },
    extend: function(){
      $define('format', function(template, locale){
        return $format(this, 'get', template, locale);
      });
      $define('formatUTC', function(template, locale){
        return $format(this, 'getUTC', template, locale);
      });
      return dtf;
    }
  };

  addLocale(current, {
    weekdays: 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday',
    months: 'January,February,March,April,May,June,July,August,September,October,November,December'
  });

  addLocale('ru', {
    weekdays: 'Воскресенье,Понедельник,Вторник,Среда,Четверг,Пятница,Суббота',
    months: 'Январ:я|ь,Феврал:я|ь,Март:а|,Апрел:я|ь,Ма:я|й,Июн:я|ь,' +
            'Июл:я|ь,Август:а|,Сентябр:я|ь,Октябр:я|ь,Ноябр:я|ь,Декабр:я|ь'
  });

  /* eslint-disable no-undef */
  // CommonJS export
  if(typeof module != 'undefined' && module.exports)module.exports = dtf;
  // RequireJS export
  else if(typeof define == 'function' && define.amd)define(function(){ return dtf; });
  // Export to global object
  else global.dtf = dtf;
}();