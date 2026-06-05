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

arr2 = np.arange(1, 10).reshape(3, 3)
print("\n2D array for indexing examples:")
print(arr2)
print("Single element arr2[0, 1]:", arr2[0, 1])
print("First row arr2[0]:", arr2[0])
print("Last column arr2[:, 2]:", arr2[:, 2])
print("Submatrix arr2[0:2, 1:3]:")
print(arr2[0:2, 1:3])
print("Boolean indexing arr2[arr2 > 5]:", arr2[arr2 > 5])
print("Fancy indexing arr2[[0, 2], [1, 0]]:", arr2[[0, 2], [1, 0]])

print(a)
print(b)
print(c)
print(d)
print(e)
print("the random array is", f)
