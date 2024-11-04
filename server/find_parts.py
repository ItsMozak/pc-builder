from bs4 import BeautifulSoup
import json
import re

def findProductNameAndTag(html_content):
    # Parse the HTML content
    soup = BeautifulSoup(html_content, 'html.parser')

    # Find all 'td' elements with class 'td__name' (product names)
    name_cells = soup.find_all('td', class_='td__name')

    products = []
    for name_cell in name_cells:
        product = {}
    
        # Extract the product name
        name_tag = name_cell.find('p')
        if name_tag:
            product_name = name_tag.get_text(strip=True)
            product['Name'] = product_name
        
        # Find the next 'td' sibling with class 'td__price' to get 'data-product-tag'
        # The 'data-product-tag' is within the 'button' element inside 'td__price'
        price_cell = name_cell.find_next_sibling('td', class_='td__price')
        if price_cell:
            button_tag = price_cell.find('button', class_='td__add')
            if button_tag and 'data-product-tag' in button_tag.attrs:
                product_tag = button_tag['data-product-tag']
                product['data-product-tag'] = product_tag
    
        products.append(product)
    return products

def readProductFile(file):
    with open(file, 'r', encoding='utf-8') as file:
        html_content = file.read()
    return html_content

def find_part(html_content, part_name):
    # Split the content into individual entries based on blank lines
    entries = html_content.strip().split('\n\n')

    # Function to remove special characters and keep letters, numbers, and spaces
    def clean_text(text):
        return re.sub(r'[^a-zA-Z0-9\s]', '', text)

    # Clean and lower the part_name
    clean_part_name = clean_text(part_name.lower())

    # Split the cleaned part name into words for matching
    part_words = clean_part_name.split()

    list_of_parts = []
    # Iterate over each entry
    for entry_html in entries:
        # Skip empty entries
        if not entry_html.strip():
            continue

        # Parse the HTML of the entry
        soup = BeautifulSoup(entry_html, 'html.parser')

        # Extract all text from the parsed HTML, clean it, and convert to lowercase
        entry_text = soup.get_text(separator=' ', strip=True).lower()
        clean_entry_text = clean_text(entry_text)

        # Check if all words in the part name are in the entry text
        if all(word in clean_entry_text for word in part_words):
            # Find the product name and data-product-tag in the HTML
            name_tag = soup.find('td', class_='td__name')
            price_tag = soup.find('td', class_='td__price')

            if name_tag and price_tag:
                product_name = name_tag.find('p').get_text(strip=True)
                data_product_tag = price_tag.find('button', class_='td__add')['data-product-tag']
                print(f"Product Name: {product_name}")
                print(f"Data Product Tag: {data_product_tag}")
                list_of_parts.append(data_product_tag)

    if list_of_parts:
        return list_of_parts
    else:
        print("The part name does not match any entry.")
        return None  # Optionally return None if no parts are found

# def find_part(html_content, part_name):
#     # Read the entire content of the file
    
#     # Split the content into individual entries based on blank lines
#     entries = html_content.strip().split('\n\n')
    
#     # Split the part name into words for matching
#     part_words = part_name.lower().split()
    
#     found = False
    
#     list_of_parts = []
#     # Iterate over each entry
#     for entry_html in entries:
#         # Skip empty entries
#         if not entry_html.strip():
#             continue
        
#         # Parse the HTML of the entry
#         soup = BeautifulSoup(entry_html, 'html.parser')
        
#         # Extract all text from the parsed HTML
#         entry_text = soup.get_text(separator=' ', strip=True).lower()
        
#         # Check if all words in the part name are in the entry text
#         if all(word in entry_text for word in part_words):
#             # Find the product name and data-product-tag in the HTML
#             name_tag = soup.find('td', class_='td__name')
#             price_tag = soup.find('td', class_='td__price')
            
#             if name_tag and price_tag:
#                 product_name = name_tag.find('p').get_text(strip=True)
#                 data_product_tag = price_tag.find('button', class_='td__add')['data-product-tag']
#                 print(f"Product Name: {product_name}")
#                 print(f"Data Product Tag: {data_product_tag}")
#                 list_of_parts.append(data_product_tag)
    
#     if len(list_of_parts):
#         return list_of_parts
#     else:
#         print("The part name does not match any entry.")

def gather_data(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')

    # Initialize an empty list to store product data
    products = []

    # Split the HTML by the product separator
    product_blocks = html_content.strip().split('<td class="td__checkbox">')
    for block in product_blocks[1:]:  # Skip the first element as it's before the first product
        block = '<td class="td__checkbox">' + block  # Re-add the starting tag for valid HTML
        product_soup = BeautifulSoup(block, 'html.parser')
        product = {}

        # Extract Product Name and URL
        name_tag = product_soup.find('td', class_='td__name')
        if name_tag:
            # Product Name
            product_name = name_tag.find('p').get_text(strip=True)
            product['Product Name'] = product_name

            # URL
            url = name_tag.find('a')['href']
            product['URL'] = url

        # Extract Specifications
        specs = {}
        for i in range(1, 7):
            spec_tag = product_soup.find('td', class_=f'td__spec td__spec--{i}')
            if spec_tag:
                label = spec_tag.find('h6', class_='specLabel').get_text(strip=True)
                value = spec_tag.get_text(strip=True).replace(label, '')
                specs[label] = value

        # Add specs to product dictionary
        product.update(specs)

        # Extract Rating and Number of Ratings
        rating_tag = product_soup.find('td', class_='td__rating')
        if rating_tag:
            full_stars = len(rating_tag.find_all('svg', class_='icon shape-star-full'))
            half_stars = len(rating_tag.find_all('svg', class_='icon shape-star-half'))
            rating = full_stars + 0.5 * half_stars
            product['Rating'] = rating

            # Number of Ratings
            num_ratings_text = rating_tag.get_text(strip=True)
            num_ratings_match = re.search(r'\((\d+)\)', num_ratings_text)
            if num_ratings_match:
                product['Number of Ratings'] = int(num_ratings_match.group(1))

        # Extract Price
        price_tag = product_soup.find('td', class_='td__price')
        if price_tag:
            price_match = re.search(r'\$\d+[\d,]*\.\d{2}', price_tag.get_text(strip=True))
            if price_match:
                product['Price'] = price_match.group(0)

        # Add the product to the list
        products.append(product)
    return products

# with open('./data/memory_products.html', 'r', encoding='utf-8') as file:
#     html_content = file.read()

# content = gather_data(html_content)
# json_string = json.dumps(content, indent=4)
# output_filename = './data/data_json/memory_products.json'
# with open(output_filename, 'w', encoding='utf-8') as file:
#     file.write(json_string + "\n\n")
    
# find_part(html_content, 'Corsair Dominator Platinum RGB 64 GB 2 x 32 GB DDR5-6000')