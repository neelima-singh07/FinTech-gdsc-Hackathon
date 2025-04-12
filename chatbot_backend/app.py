from flask import Flask, request, jsonify
from flask_cors import CORS
from utils import handle_chat
import os

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "API is running", "message": "Welcome to the FinTech API"})

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.json
    user_query = data.get("message", "")
    
    if not user_query.strip():
        return jsonify({"response": "Please enter a valid query."}), 400
    
    response = handle_chat(user_query)
    return jsonify({"response": response})

@app.route("/test", methods=["GET"])
def test():
    return jsonify({"status": "working"})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port, debug=False)
