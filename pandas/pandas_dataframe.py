# it will contain all important dataframes methods
import pandas as pd
print("the python version is: ", pd.__version__)
arr = [1, 2, 3, 4, 5]
indeces = ["maths", "phy", "chem", "hindi", "sans"]
series = pd.Series(arr, index=indeces)
print(series)
print(series.loc["chem"])
