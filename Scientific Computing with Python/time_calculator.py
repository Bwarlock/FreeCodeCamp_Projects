def add_time(start, duration,day=None):
  Days = ["MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY","SUNDAY"]
  finalDay = ""
  finalDate = ""
  finalTime = ""
  sTime,sConv = start.split()
  sSplit = sTime.split(":")
  dSplit = duration.split(":")
  try:
    totalMin = int(sSplit[0])*60 + int(sSplit[1]) + int(dSplit[0])*60 + int(dSplit[1])
  except:
    return "ERROR : Non integer Value"
  if sConv.upper() == "PM":
    totalMin += 720
  totalHour = int(totalMin/60)
 
  newHour = int(totalHour%24)
  newMin = int(totalMin%60)
  newDate = int(totalHour/24)
 
  if day is not None:
    try:
      index = Days.index(day.upper())
    except:
      return "Day Not Written Correctly"
    finalDay =", " + Days[(index + newDate%7)%7].capitalize()
    print((index + newDate%7)%7)

  if newHour > 12:
    if newMin < 10:
      finalTime = str(newHour - 12) + ":0" + str(newMin) + " PM"
    else:
      finalTime = str(newHour - 12) + ":" + str(newMin) + " PM"
  elif newHour == 0:
    if newMin < 10:
      finalTime = "12:0" + str(newMin) + " AM"
    else:
      finalTime = "12:" + str(newMin) + " AM"
  elif newHour == 12:
    if newMin < 10:
      finalTime = str(newHour) + ":0" + str(newMin) + " PM"
    else:
      finalTime = str(newHour) + ":" + str(newMin) + " PM"
  elif newHour < 12:
    if newMin < 10:
      finalTime = str(newHour) + ":0" + str(newMin) + " AM"
    else:
      finalTime = str(newHour) + ":" + str(newMin) + " AM"

  if newDate > 0:
    if newDate == 1:
      finalDate = " (next day)"
    else:
      finalDate = " (" + str(newDate) + " days later)"
 

  new_time = finalTime + finalDay + finalDate
  return new_time