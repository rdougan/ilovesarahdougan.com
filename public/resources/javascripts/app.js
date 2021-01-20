function formatDate(date) {
  return date.getMonthName() + ' ' + date.getDate() + daySuffix(date.getDate()) + ', ' + date.getFullYear();
}

function daySuffix(d) {
  d = String(d);
  return d.substr(-(Math.min(d.length, 2))) > 3 && d.substr(-(Math.min(d.length, 2))) < 21 ? "th" : ["th", "st", "nd", "rd", "th"][Math.min(Number(d)%10, 4)];
}

function getDays(days) {
  return (days > 1) ? "days" : "day";
}

function getExplainedDate(seconds) {
  var secondsInDay = 86400000,
      result = "";

  //years
  var years = Math.floor(seconds / (secondsInDay * 365));
  if (years > 0) {
    result += years + ' ';
    result += (years > 1) ? 'years' : 'year';

    seconds = seconds - ((secondsInDay * 366) * years);
  }

  //months
  var months = Math.floor(seconds / (secondsInDay * 31));
  if (months > 0) {
    result += ', ';

    result += Math.floor(months) + ' ';
    result += (months > 1) ? 'months' : 'month';

    seconds = seconds - ((secondsInDay * 31) * months);
  }

  //days
  var days = Math.floor(seconds / secondsInDay);
  if (days > 0) {
    result += ' and ';
    result += days + ' ';
    result += (days > 1) ? 'days' : 'day';

    seconds = seconds - secondsInDay;
  }

  return result;
}

function days_between(date1, date2) {
    // The number of milliseconds in one day
    var ONE_DAY = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = Math.abs(date1_ms - date2_ms);

    // Convert back to days and return
    return Math.round(difference_ms/ONE_DAY);
}

/* Define the number of snowflakes to be used in the animation */
var HEARTS = 30;

function init() {

  /* Fill the empty container with freshly driven snow */
  var first = true;
  for (var i = 0; i < HEARTS; i++) {
    document.body.appendChild(createASnowflake(first));
    first = false;
  }
}

/*
  Receives the lowest and highest values of a range and
  returns a random integer that falls within that range.
*/
function randomInteger(low, high) {
  return low + Math.floor(Math.random() * (high - low));
}

/*
   Receives the lowest and highest values of a range and
   returns a random float that falls within that range.
*/
function randomFloat(low, high) {
  return low + Math.random() * (high - low);
}

function randomItem(items) {
  return items[randomInteger(0, items.length - 1)];
}

/* Returns a duration value for the falling animation.*/
function durationValue(value) {
  return value + 's';
}

function createASnowflake(is_first) {
  var sizes = ['tiny', 'tiny', 'tiny', 'small', 'small', 'small', 'small', 'medium', 'medium', 'medium', 'medium', 'medium', 'medium', 'large', 'massive'];

  /* Start by creating a wrapper div, and an empty span  */
  var snowflakeElement = document.createElement('div');
  snowflakeElement.className = 'heart ' + randomItem(sizes);

  var snowflake = document.createElement('span');
  snowflake.innerHTML = '&hearts;';

  snowflakeElement.appendChild(snowflake);

  /* Randomly choose a spin animation */
  var spinAnimationName = (Math.random() < 0.5) ? 'clockwiseSpin' : 'counterclockwiseSpin';

   /* Randomly choose a side to anchor to, keeps the middle more dense and fits liquid layout */
   var anchorSide = (Math.random() < 0.5) ? 'left' : 'right';

  /* Figure out a random duration for the fade and drop animations */
  var fadeAndDropDuration = durationValue(randomFloat(5, 11));

  /* Figure out another random duration for the spin animation */
  var spinDuration = durationValue(randomFloat(4, 8));

  // how long to wait before the flakes arrive
  var flakeDelay = is_first ? 0 : durationValue(randomFloat(0, 10));

  snowflakeElement.style.webkitAnimationName = 'fade, drop';
  snowflakeElement.style.webkitAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;
  snowflakeElement.style.webkitAnimationDelay = flakeDelay;

  /* Position the snowflake at a random location along the screen, anchored to either the left or the right*/
  snowflakeElement.style[anchorSide] = randomInteger(0, 60) + '%';

  snowflake.style.webkitAnimationName = spinAnimationName;
  snowflake.style.webkitAnimationDuration = spinDuration;


  /* Return this snowflake element so it can be added to the document */
  return snowflakeElement;
}


Ext.onReady(function() {
  //get the dates
  var todayDate = Date.today(), //Date.parse('February 23rd, 2013'),
      firstMetDate = Date.parse('October 18th, 2009'),
      marriageDate = Date.parse('January 22th, 2011'),
      nextMarriageDate = Date.parse('January 22th, ' + todayDate.getFullYear());


  if (todayDate.getMonth() > 0 || (todayDate.getDate() > 22 && todayDate.getMonth() === 0)) {
    nextMarriageDate = Date.parse('January 22th, ' + (todayDate.getFullYear() + 1));

  }

  //time together/married
  var timeTogether = ((todayDate - firstMetDate) / 86400000),
      timeMarried  = ((todayDate - marriageDate) / 86400000);

  Ext.get('time_together').update(Math.floor(timeTogether) + ' days');
  Ext.get('time_together_full').update(getExplainedDate(todayDate - firstMetDate));
  Ext.get('time_married').update(Math.floor(timeMarried) + ' days');
  Ext.get('time_married_full').update(getExplainedDate(todayDate - marriageDate));

  //anniversaries
  var nextMonthlyAnniversay, nextMonthlyAnniversayDays,
      nextYearlyAnniversay, nextYearlyAnniversayDays,
      date;

  //monthly
  if (todayDate.getDate() == 22) {
    nextMonthlyAnniversay = "Today!";
    nextMonthlyAnniversayDays = "";
  } else if (todayDate.getDate() > 22) {
    nextMonthlyAnniversay = "";
    days = (todayDate.getDaysInMonth() - todayDate.getDate()) + marriageDate.getDate();
    nextMonthlyAnniversay = formatDate(todayDate);
    nextMonthlyAnniversayDays = "<em>" + days + " " + getDays(days) + "</em> to go";
  } else {
    date = Date.parse(todayDate.getMonthName() + ' ' + marriageDate.getDate() + ', ' + todayDate.getFullYear());
    nextMonthlyAnniversay = formatDate(date);
    date = days_between(date, todayDate);
    nextMonthlyAnniversayDays = "<em>" + date + " " + getDays(date) + "</em> to go";
  }

  //yearly
  if (formatDate(todayDate) == formatDate(nextMarriageDate)) {
    nextYearlyAnniversay = "Today!";
    nextYearlyAnniversayDays = "";
  } else {
    date = nextMarriageDate;
    nextYearlyAnniversay = formatDate(nextMarriageDate);
    nextYearlyAnniversayDays = "<em>" + days_between(date, todayDate) + " " + getDays(days_between(date, todayDate)) + "</em> to go";
  }

  Ext.get('next_monthly_anniversary').update(nextMonthlyAnniversay);
  Ext.get('next_monthly_anniversary_days').update(nextMonthlyAnniversayDays);
  Ext.get('next_yearly_anniversary').update(nextYearlyAnniversay);
  Ext.get('next_yearly_anniversary_days').update(nextYearlyAnniversayDays);

  var riverAge = moment().diff(moment('September 7 2017'), 'years');
  var thomasAge = moment().diff(moment('December 23 2019'), 'years');
  Ext.get('river_age').update(`<em>${riverAge}</em> ${riverAge > 1 ? 'years' : 'year'} old`);
  Ext.get('thomas_age').update(`<em>${thomasAge}</em> ${thomasAge > 1 ? 'years' : 'year'} old`);

  init();
});
