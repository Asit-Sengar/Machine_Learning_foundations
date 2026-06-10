import pandas as pd  # importing

# Note: This script filters rows that match specific conditional criteria.

# Fixed: Used relative path and renamed 'file' to descriptive 'df_kohli'
file_path = "../datasets/kohli_ipl.csv"
df_kohli = pd.read_csv(file_path)

# Applying conditional masks
half_century = df_kohli[df_kohli["runs"] > 50]
century = df_kohli[df_kohli["runs"] > 100]

# Formatted console outputs using f-strings and clean dividers
print("=" * 50)
print(f"Matches with a Half-Century (> 50 runs):\n{half_century}")
print("=" * 50)
print(f"Matches with a Century (> 100 runs):\n{century}")
print("=" * 50)
