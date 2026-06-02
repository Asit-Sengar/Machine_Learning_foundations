import pandas as pd
import numpy as np
countries = ["india", "germany", "spain", "mexico"]
temp = pd.Series(countries)
print(temp)

runs = [1, 2, 3, 4, 5]
a = pd.Series(runs, dtype="int32")
print(a)

marks = [34, 56, 78]
subjects = ["maths", "english", "science"]
# by this we can make the subjects array as index
b = pd.Series(marks, index=subjects, name="my marks", dtype="int8")
# and the marks array as answer
print(b)
