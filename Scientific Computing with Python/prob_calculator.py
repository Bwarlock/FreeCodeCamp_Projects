import copy
import random
# Consider using the modules imported above.

class Hat:
  def __init__(self,**kwargs):
    self.contents = []
    for k,v in kwargs.items():  
      for i in range(int(v)):
        self.contents.append(k)

  def draw(self,n):
    #cop = copy.deepcopy(self.contents)
    chois = []
    if n < len(self.contents):
      for i in range(n):
        intChoice = random.randint(0,len(self.contents)-1)
        chois.append(self.contents.pop(intChoice))
      return chois
    else:
      return self.contents
    
        

def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
  M = 0
  copHat = copy.deepcopy(hat)
  for j in range(num_experiments):
    hat = copy.deepcopy(copHat)
    save = hat.draw(num_balls_drawn)
    saveDict = dict()
    flag = True
    for i in save:
      saveDict[i] = saveDict.get(i,0) + 1

    for k,v in expected_balls.items():
      if saveDict.get(k,0) < v:
        flag = False
        break
    if flag:
      M += 1
  return M/num_experiments
