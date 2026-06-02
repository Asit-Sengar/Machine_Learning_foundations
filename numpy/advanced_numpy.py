# this covers some advanced topics
import matplotlib.pyplot as plt
import numpy as np
# working with missing values
a = np.array([1, 2, 3, 4, np.nan, 6])
print(np.isnan(a))  # this prints the boolean indexing array
print(a[~np.isnan(a)])
# nan function is for making a missing value
# and we have to remove missing values for operation


# now we will plot graphs
# lets plot for sigmoid
x = np.linspace(-10, 10, 100)
y = 1/(1+(1/np.exp(x)))
plt.plot(x, y)
plt.show()
