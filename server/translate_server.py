from flask import Flask, request, jsonify
from flask_cors import CORS
from googletrans import Translator
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

translator = Translator()

# Replace with your actual ngrok URL from Colab
OLLAMA_API_URL = "http://ayytx-34-187-190-15.a.free.pinggy.link/api/generate"

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

@app.route('/api/generate', methods=['POST'])
def generate():
    try:
        data = request.get_json()
        prompt = data.get('prompt', '')
        
        if not prompt.strip():
            return jsonify({'error': 'Vui lòng nhập prompt'}), 400
        
        # Call Ollama API via ngrok
        response = requests.post(OLLAMA_API_URL, json={
            "model": "gpt-oss:20b",
            "prompt": prompt,
            "stream": False
        })
        
        if response.status_code == 200:
            result = response.json()
            generated_text = result.get('response', '').strip()
            
            
            return jsonify({
                'prompt': prompt,
                'generated': generated_text
            })
        else:
            return jsonify({'error': f'AI API error: {response.status_code}'}), 500
    
    except Exception as e:
        return jsonify({'error': f'Lỗi AI: {str(e)}'}), 500

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    print("🌐 Translation Server running on http://localhost:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)
