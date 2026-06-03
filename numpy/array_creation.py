# this file will have all the methods of array creation

import numpy as np

a = np.array([1, 2, 3, 4, 5])  # by passing python list
# we can create an array filled with ones
b = np.ones(4, dtype="int16")
# we can create an array filled with zeros
c = np.zeros(4, dtype="int8")
# we can create an array within a certain range using arange
d = np.arange(10, 20, 2)
# we can create an array with even spacing
e = np.linspace(10, 20, 2, dtype="int16")
# we can create an array with random numbers within a range and how many numbers
f = np.random.randint(100, 200, 5)
print(a)
print(b)
print(c)
print(d)
print(e)
print("the random array is", f)
