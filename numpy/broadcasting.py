# this file will have all the important methods of numpy broadcasting

import numpy as np

a = np.array([1, 2, 3, 4])  # scalar broadcasting
b = np.array([[1, 2, 3], [4, 5, 6]])  # 2D array
c = np.array([10, 20, 30])  # row broadcasting
d = np.array([[10], [20]])  # column broadcasting

e = np.array([[1, 2, 3]])
f = np.array([[10], [20], [30]])

# reshape can also make arrays ready for broadcasting
i = np.array([80, 90, 100]).reshape(3, 1)
j = np.array([1, 2, 3]).reshape(1, 3)

# numpy broadcasting helper methods
k = np.broadcast_to(c, (2, 3))
l, m = np.broadcast_arrays(d, c)
n = np.broadcast_shapes((2, 1), (1, 3))
o = np.broadcast(d, c)

print("Scalar broadcasting a + 10:", a + 10)
print("1D with 2D broadcasting b + c:")
print(b + c)
print("Column broadcasting b + d:")
print(b + d)
print("Row vector + column vector:")
print(e + f)
print("Broadcasting using reshape:")
print(i * j)
print("np.broadcast_to(c, (2, 3)):")
print(k)
print("np.broadcast_arrays(d, c):")
print(l)
print(m)
print("np.broadcast_shapes((2, 1), (1, 3)):", n)
print("np.broadcast shape:", o.shape)
print("np.broadcast size:", o.size)
