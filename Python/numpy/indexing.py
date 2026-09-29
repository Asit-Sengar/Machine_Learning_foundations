import numpy as np

# basic indexing examples
arr = np.arange(1, 10).reshape(3, 3)
print("Original 2D array:")
print(arr)
print("Single element arr[0, 1]:", arr[0, 1])
print("First row arr[0]:", arr[0])
print("Last column arr[:, 2]:", arr[:, 2])
print("Submatrix arr[0:2, 1:3]:")
print(arr[0:2, 1:3])

# boolean indexing
print("Boolean indexing arr[arr > 5]:", arr[arr > 5])

# fancy indexing
print("Fancy indexing arr[[0, 2], [1, 0]]:", arr[[0, 2], [1, 0]])

# negative indexing and step slices
print("Last row arr[-1]:", arr[-1])
print("Every other element in first row arr[0, ::2]:", arr[0, ::2])
print("Reverse each row arr[:, ::-1]:")
print(arr[:, ::-1])

# flattened indexing
flat = arr.flatten()
print("Flattened array:", flat)
print("Element arr.flat[5]:", arr.flat[5])
