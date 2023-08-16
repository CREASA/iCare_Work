import pandas as pd

# Read the CSV file into a DataFrame
df = pd.read_csv(r'./data/emotional-reactions-reddit.csv')

# Display the first few rows of the DataFrame
df.head()

def sp(n):
    """
    Retrieve the 'seeker_post' value from the DataFrame at the given index.
    
    Args:
        n (int): Index of the row in the DataFrame.
    
    Returns:
        str: The 'seeker_post' value at the given index.
    """
    n = n % len(df) # Adjust n to a valid index within the DataFrame
    print(df.iloc[n])
    sp = df.iloc[n]['seeker_post']
    return sp


# Uncomment the following lines to test the 'sp' function
# if __name__ == '__main__':
#     print(sp(2))
