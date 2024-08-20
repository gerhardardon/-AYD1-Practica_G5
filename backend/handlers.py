import os
import pymysql.cursors
from flask import jsonify
from dotenv import load_dotenv
load_dotenv()

# Aca iran los db handlers (funciones para manejar la base de datos)
# Hacer uno por accion: agregar, eliminar, modificar, etc

# Configure MySQL connection
#LocalHost o nube
db_host = os.getenv('DB_HOST')
#Tu usuario de inicio de sesion
db_user = os.getenv('DB_USER')
#tu contraseña de mysql
db_password = os.getenv('DB_PASSWORD')
#AyD1
db_database = os.getenv('DB_DATABASE')

# Create MySQL connection
connection = pymysql.connect(host=db_host,
                             user=db_user,
                             password=db_password,
                             database=db_database,
                             cursorclass=pymysql.cursors.DictCursor)


def AgregarNotaHandler(titulo, descripcion, tag):
    try:
        with connection.cursor() as cursor:
            sql = "INSERT INTO Notas (Titulo, Descripcion, Etiqueta) VALUES (%s, %s, %s)"
            cursor.execute(sql, (titulo, descripcion, tag))
            connection.commit()  # Llamada correcta al método commit

        # Mensajes de depuración
        print("Nota agregada:")
        print(f"Título: {titulo}")
        print(f"Descripción: {descripcion}")
        print(f"Etiqueta: {tag}")

    except Exception as e:
        print(f"Error al agregar la nota: {e}")

def RecogerNotas():
    try:
        with connection.cursor() as cursor:
            query = "SELECT * FROM Notas"
            cursor.execute(query)
            result = cursor.fetchall()
            if not result:
                return jsonify({'mensaje': 'No se encontraron notas'}), 404
            
            # Retornar el resultado en formato JSON
            notas = [
                {
                    'Titulo': nota['Titulo'],
                    'Descripcion': nota['Descripcion'],
                    'Etiqueta': nota['Etiqueta']
                } for nota in result
            ]
            
            return notas  # Devuelve las notas en formato adecuado para jsonify

    except Exception as e:
        print(f"Error al recoger la nota: {e}")
        return None  # Devuelve None si ocurre un error