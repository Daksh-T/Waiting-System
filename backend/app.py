from flask import Flask, request, jsonify
from werkzeug.urls import unquote

app = Flask(__name__)

# Route for handling requests from the front-end
@app.route('/request', methods=['POST'])
def handle_request():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Invalid JSON data'}), 400

        # Validate incoming data
        if 'name' not in data or not data['name']:
            return jsonify({'error': 'Name is required'}), 400

        # Implement logic for handling user requests and responses
        response = {
            'message': 'Request received',
            'data': data
        }
        return jsonify(response)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
