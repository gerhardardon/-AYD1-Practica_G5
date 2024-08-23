

// Función para eliminar una nota
export const onEliminar = async (id) => {
  if (window.confirm('¿Estás seguro de que quieres eliminar esta nota?')) {
    try {
      const response = await fetch('http://localhost:4000/EliminarNota', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log(result.mensaje);
        // Aquí puedes agregar lógica para actualizar las notas, por ejemplo, llamando a una función de actualización
      } else {
        console.error(result.mensaje);
      }
    } catch (error) {
      console.error('Error al eliminar la nota:', id);
      console.error('Error al eliminar la nota:', error);
    }
  }
};
