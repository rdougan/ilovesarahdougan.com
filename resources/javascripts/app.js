var formatDate = function(date) {
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
    result += ', ';
    
     seconds = seconds - ((secondsInDay * 365) * years);
  }
  
  //months
  var months = Math.floor(seconds / (secondsInDay * 31));
  if (months > 0) {
    result += Math.floor(months) + ' ';
    result += (months > 1) ? 'months' : 'months';
    result += ' and ';
    
    seconds = seconds - ((secondsInDay * 31) * months);
  }
  
  //days
  var days = Math.floor(seconds / secondsInDay);
  if (days > 0) {
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

Ext.onReady(function() {
  //get the dates
  var firstMetDate     = Date.parse('October 18th, 2009'),
      marriageDate     = Date.parse('January 22th, 2011'),
      nextMarriageDate = Date.parse('January 22th, ' + (marriageDate.getFullYear() + 1)),
      todayDate        = Date.today();

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
    nextMonthlyAnniversayDays = "<em>" + ((todayDate.getDaysInMonth() - todayDate.getDate()) + marriageDate.getDate()) + " " + getDays(date) + "</em> to go";
  } else {
    date = Date.parse(todayDate.getMonthName() + ' ' + marriageDate.getDate() + ', ' + todayDate.getFullYear());
    nextMonthlyAnniversay = formatDate(date);
    nextMonthlyAnniversayDays = "<em>" + days_between(marriageDate, todayDate) + " " + getDays(date) + "</em> to go";
  }


  
  //yearly
  if (formatDate(todayDate) == formatDate(nextMarriageDate)) {
    nextYearlyAnniversay = "Today!";
    nextYearlyAnniversayDays = "";
  } else {
    date = ((nextMarriageDate - todayDate) / 86400000);
    nextYearlyAnniversay = formatDate(nextMarriageDate);
    nextYearlyAnniversayDays = "<em>" + date + " " + getDays(date) + "</em> to go";
  }
  
  Ext.get('next_monthly_anniversary').update(nextMonthlyAnniversay);
  Ext.get('next_monthly_anniversary_days').update(nextMonthlyAnniversayDays);
  Ext.get('next_yearly_anniversary').update(nextYearlyAnniversay);
  Ext.get('next_yearly_anniversary_days').update(nextYearlyAnniversayDays);
});