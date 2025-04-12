from flask import Flask, request, jsonify
from flask_cors import CORS
from utils import handle_chat
import os

app = Flask(__name__)
CORS(app)

@app.route("/chat", methods=["POST"])
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
    port = int(os.environ.get("PORT", 5001))
    # For production deployment use 0.0.0.0 instead of localhost
    # This allows the app to be accessible from outside the container
    app.run(host="0.0.0.0", port=port, debug=False)