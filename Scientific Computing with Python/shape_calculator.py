class Rectangle:
  width = 0
  height = 0
  finalPic = ""
  def __str__(self):
    return "Rectangle(width={}, height={})".format(self.width,self.height)
  def __init__(self,w=0,h=0):
    self.width = w
    self.height = h
  def set_width(self,w):
    self.width = w
  def set_height(self,h):
    self.height = h
  def get_area(self):
    return self.width*self.height
  def get_perimeter(self):
    return 2*self.width + 2*self.height
  def get_diagonal(self):
    return (self.width ** 2 + self.height ** 2) ** .5
  def get_picture(self):
    if self.width > 50 or self.height > 50:
      return "Too big for picture."
    else:
      for i in range(self.height):
        self.finalPic += "*"*self.width + "\n"
    return self.finalPic
  def get_amount_inside(self,shape):
    if shape.width <= self.width and shape.height <= self.height:
      return int(int(self.width/shape.width)*int(self.height/shape.height))
    else:
      return 0




class Square(Rectangle):
  def __str__(self):
    return "Square(side={})".format(self.width)
  def __init__(self,s=0):
    self.width = s
    self.height = s
  def set_side(self,s):
    self.width = s
    self.height = s
  def set_width(self,w):
    self.width = w
    self.height = w
  def set_height(self,h):
    self.width = h
    self.height = h  
