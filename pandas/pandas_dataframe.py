import pandas as pd

data = {"names": ["asit", "sakshi", "khushi"],
        "age": [23, 23, 56]}
df = pd.DataFrame(data, index=["employe1", "employe2", "employe3"])
print("the data frame is: ", df)
# to print something at specific location
print(df.loc["employe2"])
df["job"] = ["software engineer", "housewife", "housewife"]
print(df)
