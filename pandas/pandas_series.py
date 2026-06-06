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

# we can create pandas series from dict also
marks_dict = {
    "maths": 12,
    "english": 34,
    "science": 56
}
marks_series = pd.Series(marks_dict, dtype="int16")
print(marks_series)
# .isunique function tells if the series have all unique elements
print(pd.Series([1, 2, 3, 4, 5, 5]).is_unique)


# it will contain all important dataframes methods
print("the python version is: ", pd.__version__)
arr = [1, 2, 3, 4, 5, 444, 555]
indeces = ["maths", "phy", "chem", "hindi", "sans", "geo", "english"]
series = pd.Series(arr, index=indeces, dtype="int16")
print("the series object is: ", series)
print("the value at chem location is: ", series.loc["chem"])
series.loc["sst"] = 6  # here i am assigning the value of sst location
print("the value of sst is: ", series["sst"])
print(series[series > 100])


# now we will use dictionary

calories = {"day1": 1749, "day2": 3344, "day3": 5667}
series_dict = pd.Series(calories, dtype="int16")
print(series_dict)
print("the calories for day3 are: ", series_dict.loc["day3"])
print("days greater than 2000 calories: ", series_dict[series_dict > 2000])
