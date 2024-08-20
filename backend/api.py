# Aca ira la api REST hecha en flask
from flask import Flask, request, jsonify
from flask_cors import CORS
from handlers import *
import handlers as base
# Load environment variables
from dotenv import load_dotenv
load_dotenv()



app = Flask(__name__)
CORS(app)

@app.route('/',methods=['GET'])
def index():
    
    return 'Hello world'


@app.route('/Agregar_Nota',methods=['POST'])
def Agregar_Nota():
    try:
        data = request.json
        titulo = data['titulo']
        descripcion = data['descripcion']
        tag = data['etiqueta']
        base.AgregarNotaHandler(titulo, descripcion, tag)
        return jsonify({'mensaje': 'Nota agregada'}), 201
    except Exception as e:
        print('Error:', e)
        return jsonify({'mensaje': 'Error interno del servidor en usuarios crear'}), 500


@app.route('/Recuperar_Notas', methods=['GET'])
def Recuperar_Notas():
    try:
        notas = base.RecogerNotas()
        if notas is None:
            return jsonify({'mensaje': 'Error al obtener las notas'}), 500
        return jsonify({'notas': notas}), 200
    except Exception as e:
        print(f"Error al obtener las notas: {e}")
        return jsonify({'mensaje': 'Error interno del servidor'}), 500



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=4000)