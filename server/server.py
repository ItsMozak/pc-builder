import requests
import re
from flask import Flask, jsonify, request

from find_parts import find_part, readProductFile

app = Flask(__name__)

# A simple route to get data
@app.route('/api/data', methods=['POST'])
def get_data():
    request_data = request.json
    html_content = readProductFile('data/video_card_products.html')
    data_product_tag = find_part(html_content, request_data['videocard'])
    return data_product_tag

if __name__ == '__main__':
    app.run()

