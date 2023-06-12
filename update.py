import os

folder_path = 'images'
filenames = os.listdir(folder_path)
js_file_path = 'files.js'

with open(js_file_path, 'w') as js_file:
    js_file.write('const filenames = [\n')
    for filename in filenames:
        js_file.write(f'  "{filename}",\n')
    js_file.write('];')

print('JavaScript file created / updated successfully! 👍')