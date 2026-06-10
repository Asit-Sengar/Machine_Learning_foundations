import pandas as pd

# Note: Removed unused 'import numpy as np' to keep imports clean.

# --- 1. Creating Series from Lists ---
countries = ["india", "germany", "spain", "mexico"]
series_countries = pd.Series(countries)
print(f"Countries Series:\n{series_countries}\n")

runs = [1, 2, 3, 4, 5]
series_runs = pd.Series(runs, dtype="int32")
print(f"Runs Series:\n{series_runs}\n")

# Setting a descriptive custom index and Series name
marks = [34, 56, 78]
subjects = ["maths", "english", "science"]
series_marks = pd.Series(marks, index=subjects, name="my marks", dtype="int8")
print(f"Marks Series with Subject Index:\n{series_marks}\n")


# --- 2. Creating Series from Dictionaries ---
marks_dict = {
    "maths": 12,
    "english": 34,
    "science": 56
}
series_marks_dict = pd.Series(marks_dict, dtype="int16")
print(f"Marks Series from Dictionary:\n{series_marks_dict}\n")

# Verifying element uniqueness
is_unique_check = pd.Series([1, 2, 3, 4, 5, 5]).is_unique
print(f"Are all elements in the test series unique?: {is_unique_check}\n")


# --- 3. Series Operations and Index Manipulation ---
print(f"Current Pandas Version: {pd.__version__}\n")

arr = [1, 2, 3, 4, 5, 444, 555]
# Fixed typo: 'indeces' -> 'indices'
indices = ["maths", "phy", "chem", "hindi", "sans", "geo", "english"]
series_exam = pd.Series(arr, index=indices, dtype="int16")

print(f"Exam Scores Series:\n{series_exam}\n")
print(f"Value at 'chem' location: {series_exam.loc['chem']}\n")

# Dynamically assigning a value to a new index label
series_exam.loc["sst"] = 6
print(f"Updated value at 'sst': {series_exam['sst']}\n")

# Conditional filtering directly on the Series object
print(f"Scores strictly greater than 100:\n{series_exam[series_exam > 100]}\n")


# --- 4. Calorie Tracking Example ---
calories = {"day1": 1749, "day2": 3344, "day3": 5667}
series_calories = pd.Series(calories, dtype="int16")

print(f"Calories Tracking Series:\n{series_calories}\n")
print(f"Calories consumed on day3: {series_calories.loc['day3']}\n")
print(
    f"Days exceeding 2000 calories:\n{series_calories[series_calories > 2000]}")
