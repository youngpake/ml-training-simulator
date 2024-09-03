import os
import glob
import pyperclip

# Set the file extension for your React components
component_extension = ".js"  # or ".jsx" if using JSX

# Function to read the contents of a file
def read_file_contents(file_path):
    with open(file_path, "r") as file:
        return file.read()

# Get the list of component files in the src/components directory
component_files = glob.glob(os.path.join("src", "components", f"*{component_extension}"))

# Read the contents of App.js
app_file = os.path.join("src", "App.js")
app_contents = read_file_contents(app_file)

# Initialize an empty string to store the code
code = ""

# Append the code from App.js
code += "// Code from: App.js\n"
code += app_contents + "\n\n"

# Append the code from each component file
for component_file in component_files:
    component_contents = read_file_contents(component_file)
    code += f"// Code from: {os.path.basename(component_file)}\n"
    code += component_contents + "\n\n"

# Print the code
print(code)

# Copy the code to the clipboard
pyperclip.copy(code)
print("Code copied to clipboard!")