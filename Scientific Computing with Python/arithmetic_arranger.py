def arithmetic_arranger(problems,boolAnswer=False):
  if len(problems) > 5:
    return "Error: Too many problems."
  s = list()
  retur1 = ""
  retur2 = ""
  retur3 = ""
  retur4 = ""
  for e in problems:
    eqlist = e.split()
    try:
      if eqlist[1] == "+":
        d = str(int(eqlist[0]) + int(eqlist[2]))
      elif eqlist[1] == "-":
        d = str(int(eqlist[0]) - int(eqlist[2]))
      else:
        return "Error: Operator must be '+' or '-'."
    except:
      return "Error: Numbers must only contain digits."
    a = len(eqlist[0])
    b = len(eqlist[2])
    if a > 4 or b > 4:
      return "Error: Numbers cannot be more than four digits."
    c = a - b
    if c > 0:
      s.append(eqlist[0])
      s.append(eqlist[1] + " ")
      s.append(" "*c + eqlist[2])
      s.append("-"*(a+2))
      s.append(" "*(a+2 - len(d)) + d)
    elif c < 0:
      s.append(" "*(-c) + eqlist[0])
      s.append(eqlist[1] + " ")
      s.append(eqlist[2])
      s.append("-"*(b+2))
      s.append(" "*(b+2 - len(d)) + d)
    else:
      s.append(eqlist[0])
      s.append(eqlist[1] + " ")
      s.append(eqlist[2])
      s.append("-"*(a+2))
      s.append(" "*(a+2 - len(d)) + d)
  for i in range(0,len(s),5):
    retur1 += " "*2 + s[i] + " "*4
    retur2 += s[i+1] + s[i+2] + " "*4
    retur3 += s[i+3] + " "*4
    retur4 += s[i+4] + " "*4
  if boolAnswer:
    arranged_problems = retur1.rstrip() + "\n" + retur2.rstrip() + "\n" + retur3.rstrip() + "\n" + retur4.rstrip()
  else:
    arranged_problems = retur1.rstrip() + "\n" + retur2.rstrip() + "\n" + retur3.rstrip()

  return arranged_problems
