# Aca ira la api REST hecha en flask
from flask import Flask, request, jsonify
from flask_cors import CORS
from handlers import *

app = Flask(__name__)
CORS(app)

@app.route('/',methods=['GET'])
def index():
    return 'Hello world'

if __name__ == '__main__':
    app.run(debug=True)