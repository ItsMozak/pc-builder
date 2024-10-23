import requests
import re
from flask import Flask, jsonify, request
from asgiref.sync import async_to_sync
from flask_cors import CORS
from find_parts import find_part, readProductFile
from generate_pcpartpicker_link import add_all_parts

app = Flask(__name__)
CORS(app)

# A simple route to get data
@app.route('/api/data/getLink', methods=['POST'])
async def get_data():
    request_data = request.json
    
    memory_html = readProductFile('data/memory_products.html')
    memory_tag = find_part(memory_html, request_data['memory'])
    
    cpu_html = readProductFile('data/cpu_products.html')
    cpu_tag = find_part(cpu_html, request_data['cpu'])
    
    motherboard_html = readProductFile('data/motherboard_products.html')
    motherboard_tag = find_part(motherboard_html, request_data['motherboard'])
    
    video_card_html = readProductFile('data/video_card_products.html')
    video_card_tag = find_part(video_card_html, request_data['videocard'])
    
    storage_html = readProductFile('data/internal_hard_drive_products.html')
    storage_tag = find_part(storage_html, request_data['storage'])
    
    power_supply_html = readProductFile('data/power_supply_products.html')
    power_supply_tag = find_part(power_supply_html, request_data['power-supply'])
    
    case_html = readProductFile('data/case_products.html')
    case_tag = find_part(case_html, request_data['case'])
    
    cpu_cooler_html = readProductFile('data/cpu_cooler_products.html')
    cpu_cooler_tag = find_part(cpu_cooler_html, request_data['cpu-cooler'])
    
    # Quick fix just taking the first one...
    link = await add_all_parts(memory_tag[0], cpu_tag[0], motherboard_tag[0], video_card_tag[0], storage_tag[0], power_supply_tag[0], case_tag[0], cpu_cooler_tag[0])
    print(link)
    return link

if __name__ == '__main__':
    app.run()

