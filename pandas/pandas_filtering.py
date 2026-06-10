# it means keeping the rows that match the certain conditions
import pandas as pd
# importing the file
file = pd.read_csv(
    r"C:\rough_folder\Machine_Learning_foundations\datasets\kohli_ipl.csv")
half_century = file[file["runs"] > 50]
century = file[file["runs"] > 100]

print("matches with half century", half_century)
print(".............")
print("matches with century", century)
