import numpy as np
a = np.random.randint(1, 10, 5)
b = np.random.randint(1, 10, 5)
c = a + b

print(a)
print(b)
print(c)

# we can create an array from a number to a number with equal spacing by using linspace function
d = np.linspace(10, 20, 5, dtype="int8")
print("the array is : ", d)
