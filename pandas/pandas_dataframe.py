import pandas as pd

# --- Creating a DataFrame from Scratch ---
data = {
    "names": ["asit", "sakshi", "khushi"],
    "age": [23, 23, 56]
}

# Fixed typo: changed index strings from 'employe' to 'employee'
df = pd.DataFrame(data, index=["employee1", "employee2", "employee3"])
print(f"Initial DataFrame:\n{df}\n")

# Accessing a specific row location using .loc
print(f"Data for employee2:\n{df.loc['employee2']}\n")

# Adding a new column cleanly
df["job"] = ["software engineer", "student", "student"]

# Fixed logic: Properly appending a new row using .loc instead of an empty DataFrame
df.loc["employee4"] = ["rahul", 28, "data scientist"]
print(f"DataFrame after adding column and row:\n{df}\n")


# --- Importing and Inspecting External Datasets ---
file_path = "../datasets/melb_data.csv"  # defining the file path
df_melb = pd.read_csv(file_path, index_col="Price")
print(f"Melbourne Data Preview:\n{df_melb.head()}\n")

# printing all columns

print(f"Available columns:\n{df_melb.columns}\n")

# Row Selection: Safely using .iloc for position-based indexing (instead of .loc["0"])
print(f"First row of Melbourne data via position:\n{df_melb.iloc[0]}\n")
print(f"First 10 rows of Melbourne data:\n{df_melb.head(10)}")
