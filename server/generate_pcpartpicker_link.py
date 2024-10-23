import asyncio
from pyppeteer import launch
from pyppeteer_stealth import stealth
from bs4 import BeautifulSoup
import requests

from scraper import setup_page

#CPU: AMD Ryzen 7 7800X3D 4.2 GHz 8-Core Processor

proxy_username = 'd17ad62a208846d0a684318c7c7cc6cc'
proxy_password = ''
proxy_host = 'api.zyte.com'
proxy_port = '8011'
proxy_url = f'http://{proxy_host}:{proxy_port}'

async def generate_fake_session():
    browser = await launch(
        handleSIGINT=False,
        handleSIGTERM=False,
        handleSIGHUP=False,
        args=[
        f'--proxy-server={proxy_url}',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-blink-features=AutomationControlled',
    ])
    page = await setup_page(browser)
    #Use the products link to retreive the xsessionid and the xcsrftoken
    max_retries = 5
    retry_count = 0
    while retry_count < max_retries:
        await page.goto('https://ca.pcpartpicker.com/products/cpu/', {'waitUntil': 'networkidle2'},  timeout=0)

        cookies = await page.cookies()
        xsessionid = next((cookie['value'] for cookie in cookies if cookie['name'] == 'xsessionid'), None)
        xcsrftoken = next((cookie['value'] for cookie in cookies if cookie['name'] == 'xcsrftoken'), None)
        if not (xsessionid == None):
            print(xsessionid)
            print(xcsrftoken)
            return xsessionid, xcsrftoken
        print("No xsessionid retrying....")
        await asyncio.sleep(2)

async def add_part(type_part, tag, xsessionid, xcsrftoken):
  
    # xsessionid, xcsrftoken = 'gbdn15ck1ykc985x49bycmj64d2zdht3', 'WoGWkUCdNJ8ysflEGFi66InMXn4fMh5y'
    if xsessionid is None:
        print("No xsessionid please retry")
        return
    url_add = 'https://pcpartpicker.com/qapi/partlist/add/'
    
    headers = {
        'Referer': 'https://pcpartpicker.com/products/' + type_part + '/',
        'Origin': 'https://pcpartpicker.com',
        'x-csrftoken': xcsrftoken,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
    cookies = {
        'xsessionid': xsessionid,
        'xcsrftoken': xcsrftoken
    }
    payload = {
        'href': 'https://pcpartpicker.com/products/' + type_part + '/',
        'quantity': '1',  # Example: Adding one unit of the product
        'tag': tag
    }
    proxies = {
        "http": "http://d17ad62a208846d0a684318c7c7cc6cc:@api.zyte.com:8011",
        "https": "http://d17ad62a208846d0a684318c7c7cc6cc:@api.zyte.com:8011"
    }
    max_retries = 5
    retry_count = 0
    while retry_count < max_retries:
        try:
            response = requests.post(url_add, headers=headers, cookies=cookies, data=payload, proxies=proxies, verify='./zyte-ca.crt')
            # Check if the request was successful
            if response.status_code == 200:
                print(f"Request successful: {response.json()}")
                break
            elif response.status_code == 520:
                print(f"520 error encountered: {response.text}")
                retry_after = response.headers.get('Retry-After')
                if retry_after:
                    wait_time = int(retry_after)
                    print(f"Waiting for {wait_time} seconds before retrying...")
                    await asyncio.sleep(2)
            else:
                print(f"Failed to generate link. Status code: {response.status_code}")
                print(f"Response content: {response.text}")
                break
        except requests.RequestException as e:
            print(f"An error occurred while making the request: {e}")

async def add_all_parts(memory_tag, cpu_tag, motherboard_tag, video_card_tag, storage_tag, power_supply_tag, case_tag, cpu_cooler_tag):
    xsessionid, xcsrftoken = await generate_fake_session()
    # Create an empty list to hold tasks
    tasks = []

    # Define all parts and tags
    parts = [
        ('cpu', cpu_tag),
        ('video-card', video_card_tag),
        ('memory', memory_tag),
        ('motherboard', motherboard_tag),
        ('storage', storage_tag),
        ('power-supply', power_supply_tag),
        ('case', case_tag),
        ('cpu-cooler', cpu_cooler_tag),
    ]

    # Create tasks for each part and append them to the tasks list
    for part_name, part_tag in parts:
        task = asyncio.create_task(add_part(part_name, part_tag, xsessionid, xcsrftoken))
        tasks.append(task)

    # Use asyncio.gather to run all tasks concurrently
    await asyncio.gather(*tasks)

    # #TO CHANGE
    # await add_part('cpu', cpu_tag, xsessionid, xcsrftoken)
    # await asyncio.sleep(5)  # Delay for 2 seconds
    # await add_part('video-card', video_card_tag, xsessionid, xcsrftoken)
    # await asyncio.sleep(5)  # Delay for 2 seconds
    # await add_part('memory', memory_tag, xsessionid, xcsrftoken)
    # await asyncio.sleep(5)  # Delay for 2 seconds
    # await add_part('motherboard', motherboard_tag, xsessionid, xcsrftoken)
    # await asyncio.sleep(5)  # Delay for 2 seconds
    # await add_part('storage', storage_tag, xsessionid, xcsrftoken)  
    # await asyncio.sleep(5)  # Delay for 2 seconds
    # await add_part('power-supply', power_supply_tag, xsessionid, xcsrftoken)
    # await asyncio.sleep(5)  # Delay for 2 seconds
    # await add_part('case', case_tag, xsessionid, xcsrftoken)
    # await asyncio.sleep(5)  # Delay for 2 seconds
    # await add_part('cpu-cooler', cpu_cooler_tag, xsessionid, xcsrftoken)
    
    return await generate_pcpartpicker_link(xsessionid)

async def generate_pcpartpicker_link(xsessionid):
    browser = await launch(
        handleSIGINT=False,
        handleSIGTERM=False,
        handleSIGHUP=False,
        args=[
        f'--proxy-server={proxy_url}',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-blink-features=AutomationControlled',
    ])
    page = await setup_page(browser)
    
    url = 'https://ca.pcpartpicker.com/list/'
    
    
    cookies = [
        {
            'name': 'xsessionid',
            'value': xsessionid,
            'domain': 'ca.pcpartpicker.com',
            'path': '/',
            'httpOnly': True,
            'secure': True
        }
    ]
    
    await page.setCookie(*cookies)
    await page.goto(url, {'waitUntil': 'networkidle2'})
    
    # await page.screenshot({'path': 'screenshot.png'})

    input_value = await page.evaluate('''() => {
        // Find all input elements with type 'text'
        const inputElements = document.querySelectorAll('input[type="text"]');

        // Iterate over the input elements and find the one with the desired pattern in its value
        for (const input of inputElements) {
            if (input.value && input.value.startsWith('https://ca.pcpartpicker.com/list/')) {
                return input.value;  // Return the value of the matching input
            }
        }
        return null;  // Return null if no match is found
    }''')
    return input_value

    
# asyncio.get_event_loop().run_until_complete(add_all_parts())
# asyncio.get_event_loop().run_until_complete(generate_fake_session())
    