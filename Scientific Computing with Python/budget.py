class Category:

  def __str__(self):
    length = len(self.budgetCat[:30])
    Pic = "*"*(int((30 - length)/2)) + self.budgetCat[:30] + "*"*(round((30 - length)/2)) + "\n"
    for i in self.ledger:
      toLeft = i["description"][:23]
      toRight = "%.2f"%(i["amount"])
      Pic +=  toLeft + " "*(30 - len(toLeft) - len(toRight[:7])) + toRight[:7] + "\n"
    Pic += "Total: %.2f"%(self.dep - self.withd)
    return Pic.rstrip()
    
  def __init__(self,ctype=""):
    self.ledger = []
    self.dep = 0
    self.withd = 0
    self.budgetCat = ctype
  def deposit(self,amount,description=""):
    self.ledger.append({"amount": amount, "description": description})
    self.dep += amount

  def withdraw(self,amount,description=""):
    if self.check_funds(amount):
      self.ledger.append({"amount": -abs(amount), "description": description})
      self.withd += amount
      return True
    else:
      return False

  def get_balance(self):
    return self.dep - self.withd
  def transfer(self,amount,other):
    if self.check_funds(amount):
      self.withdraw(amount,"Transfer to {}".format(other.budgetCat))
      other.deposit(amount,"Transfer from {}".format(self.budgetCat))
      return True
    else:
      return False
            
  def check_funds(self,amount):
    if amount <= self.dep - self.withd:
      return True
    else:
      return False


def create_spend_chart(categories):
  bar = "Percentage spent by category\n"

  percent = list()
  name = list()
  for i in categories:
    if i.dep != 0:
      percent.append(100*(i.withd/i.dep))
      name.append(i.budgetCat)
  for j in range(100,-10,-10):
    jStr = str(j)
    bar += " "*(3-len(jStr)) + jStr + "|"
    for k in percent:
      if round(k,-1) >= j:
        bar += " o "
      else:
        bar += " "*3
    bar += " \n"
  bar += " "*4 + "-"*(3*len(percent)) + "-"

  for j in range(len(max(name, key=len))):
    bar += "\n" + " "*4
    for i in name:
      bar += " " + (i[j] if len(i) >= j+1 else " ") + " "
    bar += " "
  return bar