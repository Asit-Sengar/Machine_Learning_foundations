# it will contain all important dataframes methods
import pandas as pd
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
