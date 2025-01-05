from flask import Flask, send_file, request, jsonify, session
import json
import os
import cssutils
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'  # Set a secret key for session management

EXPORT_FILE_PATH = 'login_customizer_settings.json'

def validate_json_data(data):
    return 'css_rules' in data

def update_login_customizer_settings(data):
    # Save the data to the database or a file
    print(data)

@app.route('/')
def index():
    return send_file('index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_file(filename)

@app.route('/login-customizer/export', methods=['GET'])
def export_settings():
    css_file = 'style.css'
    with open(css_file, 'r') as f:
        css_data = f.read()
    sheet = cssutils.parseString(css_data)
    css_rules = {}
    for rule in sheet:
        if isinstance(rule, cssutils.css.CSSStyleRule):
            selector = rule.selectorText
            properties = {}
            for prop in rule.style:
                properties[prop.name] = prop.propertyValue.cssText
            css_rules[selector] = properties
    data = {"css_rules": css_rules}
    return jsonify(data)

@app.route('/login-customizer/import', methods=['POST'])
def import_settings():
    try:
        if 'file' not in request.files:
            return jsonify({'success': False, 'message': 'No file part in the request.'})

        file = request.files['file']
        if file.filename == '':
            return jsonify({'success': False, 'message': 'No selected file.'})

        if file and file.filename.endswith('.json'):
            filename = secure_filename(file.filename)
            data = json.load(file)
            if validate_json_data(data):
                update_login_customizer_settings(data)
                return jsonify({'success': True, 'message': 'Settings imported successfully'})
            else:
                return jsonify({'success': False, 'message': 'Invalid data format'})
        else:
            return jsonify({'success': False, 'message': 'Invalid file format. Only JSON files are allowed.'})
    except Exception as e:
        return jsonify({'success': False, 'message': 'An error occurred: ' + str(e)})

if __name__ == "__main__":
    app.run(debug=True)
