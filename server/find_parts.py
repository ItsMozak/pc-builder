from bs4 import BeautifulSoup

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
    # Read the entire content of the file
    
    # Split the content into individual entries based on blank lines
    entries = html_content.strip().split('\n\n')
    
    # Split the part name into words for matching
    part_words = part_name.lower().split()
    
    found = False
    
    list_of_parts = []
    # Iterate over each entry
    for entry_html in entries:
        # Skip empty entries
        if not entry_html.strip():
            continue
        
        # Parse the HTML of the entry
        soup = BeautifulSoup(entry_html, 'html.parser')
        
        # Extract all text from the parsed HTML
        entry_text = soup.get_text(separator=' ', strip=True).lower()
        
        # Check if all words in the part name are in the entry text
        if all(word in entry_text for word in part_words):
            # Find the product name and data-product-tag in the HTML
            name_tag = soup.find('td', class_='td__name')
            price_tag = soup.find('td', class_='td__price')
            
            if name_tag and price_tag:
                product_name = name_tag.find('p').get_text(strip=True)
                data_product_tag = price_tag.find('button', class_='td__add')['data-product-tag']
                print(f"Product Name: {product_name}")
                print(f"Data Product Tag: {data_product_tag}")
                list_of_parts.append(data_product_tag)
    
    if len(list_of_parts):
        return list_of_parts
    else:
        print("The part name does not match any entry.")


# html_content = readProductFile('data/cpu_products.html')
# find_part(html_content, 'Intel Core i9 13900K')