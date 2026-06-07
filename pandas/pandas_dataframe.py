import pandas as pd

data = {"names": ["asit", "sakshi", "khushi"],
        "age": [23, 23, 56]}
df = pd.DataFrame(data, index=["employe1", "employe2", "employe3"])
print("the data frame is: ", df)
# to print something at specific location
print(df.loc["employe2"])
# for adding a new coloumn
df["job"] = ["software engineer", "housewife", "housewife"]
# for adding a new row
new_row = pd.DataFrame([])
print(df)

# now i want to import some files
file = pd.read_csv(
    r"C:\rough_folder\Machine_Learning_foundations\datasets\subs.csv")
print(file)
