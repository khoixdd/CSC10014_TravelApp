from flask import Flask, request, jsonify
from flask_cors import CORS
from googletrans import Translator

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

translator = Translator()

@app.route('/api/translate', methods=['POST'])
def translate():
    try:
        data = request.get_json()
        text = data.get('text', '')
        
        if not text.strip():
            return jsonify({'error': 'Vui lòng nhập văn bản cần dịch'}), 400
        
        # Translate from English to Vietnamese
        result = translator.translate(text, src='en', dest='vi')
        
        return jsonify({
            'original': text,
            'translated': result.text,
            'source_lang': 'en',
            'dest_lang': 'vi'
        })
    
    except Exception as e:
        return jsonify({'error': f'Lỗi dịch: {str(e)}'}), 500

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    print("🌐 Translation Server running on http://localhost:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)
