
import asyncio
from pyppeteer import launch
from pyppeteer_stealth import stealth
from bs4 import BeautifulSoup

# Proxy settings (optional)
proxy_username = 'd17ad62a208846d0a684318c7c7cc6cc'
proxy_password = ''
proxy_host = 'api.zyte.com'
proxy_port = '8011'
proxy_url = f'http://{proxy_host}:{proxy_port}'

async def setup_page(browser):
    # Open a new page
    page = await browser.newPage()
    # Authenticate to the proxy (if using one)
    await page.authenticate({
        'username': proxy_username,
        'password': proxy_password
    })

    # Apply stealth techniques to make the browser less detectable
    await stealth(page)

    # Set the User-Agent to mimic a real browser
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
                            'AppleWebKit/537.36 (KHTML, like Gecko) '
                            'Chrome/92.0.4515.159 Safari/537.36')

    # Set additional headers if necessary
    await page.setExtraHTTPHeaders({
        'Accept-Language': 'en-US,en;q=0.9',
    })

    # Set viewport size
    await page.setViewport({'width': 1920, 'height': 1080})

    return page

async def scrape_page(browser, url, output_filename):
    # Open a new page
    # page = await browser.newPage()

    # # Authenticate to the proxy (if using one)
    # await page.authenticate({
    #     'username': proxy_username,
    #     'password': proxy_password
    # })

    # # Apply stealth techniques to make the browser less detectable
    # await stealth(page)

    # # Set the User-Agent to mimic a real browser
    # await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
    #                         'AppleWebKit/537.36 (KHTML, like Gecko) '
    #                         'Chrome/92.0.4515.159 Safari/537.36')

    # # Set additional headers if necessary
    # await page.setExtraHTTPHeaders({
    #     'Accept-Language': 'en-US,en;q=0.9',
    # })

    # # Set viewport size
    # await page.setViewport({'width': 1920, 'height': 1080})

    # print(f"Starting to scrape: {url}")
    
    page = await setup_page(browser)
    
    print(f"Starting to scrape: {url}")
    
    try:
        # Navigate to the target page
        await page.goto(url, {'waitUntil': 'networkidle2'})
        
        # Wait for the '.pagination' selector to appear
        await page.waitForSelector('.pagination', {'timeout': 10000})
        
        # Extract the HTML content of the products
        productElsHtml = await page.evaluate('''() => {
            let elements = document.querySelectorAll('.tr__product');
            return Array.from(elements).map(element => element.innerHTML);
        }''')    

        # Write the extracted HTML to a file
        with open(output_filename, 'w', encoding='utf-8') as file:
            for product_html in productElsHtml:
                file.write(product_html + "\n\n")
        
        print(f"Finished scraping: {url} - Data saved to {output_filename}")
    except Exception as e:
        print(f"An error occurred while scraping {url}: {e}")
    finally:
        # Close the page
        await page.close()

async def main():
    # Launch the browser with additional arguments to reduce detection
    browser = await launch(args=[
        f'--proxy-server={proxy_url}',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-blink-features=AutomationControlled',
    ])

    # List of URLs to scrape
    urls = [
        'https://ca.pcpartpicker.com/products/cpu/',
        'https://ca.pcpartpicker.com/products/video-card/',
        'https://ca.pcpartpicker.com/products/motherboard/',
        'https://ca.pcpartpicker.com/products/memory/',
        'https://ca.pcpartpicker.com/products/power-supply/',
        'https://ca.pcpartpicker.com/products/cpu-cooler/',
        'https://ca.pcpartpicker.com/products/internal-hard-drive/',
        'https://ca.pcpartpicker.com/products/case/'
    ]

    # Corresponding output filenames
    output_files = [
        'cpu_products.html',
        'video_card_products.html',
        'motherboard_products.html',
        'memory_products.html',
        'power-supply_products.html',
        'cpu-cooler_products.html',
        'internal-hard-drive_products.html',
        'case_products.html'
    ]

    # Create scraping tasks
    tasks = []
    for url, output_file in zip(urls, output_files):
        task = asyncio.create_task(scrape_page(browser, url, output_file))
        tasks.append(task)

    # Run the tasks concurrently
    await asyncio.gather(*tasks)

    # Close the browser
    await browser.close()

# Run the asynchronous function
# asyncio.get_event_loop().run_until_complete(main())
