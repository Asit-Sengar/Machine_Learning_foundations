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
    r"C:\rough_folder\Machine_Learning_foundations\datasets\melb_data.csv", index_col="Price")
print(file)
# to print complete file use to_string method
# print(file.to_string())#otherwise dont use it

# selection by coloumn


# now we will select using rows
print(file.loc["0"])  # this prints the first row
# i can assign and index column to which ever column i want
print(file.columns)  # this is for printig the available columns
print(file.iloc[0:11])  # this prints the first 10 rows
