import { eliminarPlantas, getDataPlantas, obtenerPlantas, savePlantas, updatePlantas, getDataCategoria, getDataProveedor } from "../modelo/firebase.js";

let id = 0;
let categoriasMap = new Map();
let proveedoresMap = new Map();

// Cargar categorías dinámicamente
const cargarCategorias = () => {
    getDataCategoria((collection) => {
        const select = document.getElementById('categoria');
        let options = '<option value="">Seleccione una categoría</option>';
        collection.forEach((doc) => {
            const categoria = doc.data();
            categoriasMap.set(doc.id, categoria.nombre); // Guardar en el mapa
            options += `<option value="${doc.id}">${categoria.nombre}</option>`;
        });
        select.innerHTML = options;
    });
};

// Cargar proveedores dinámicamente
const cargarProveedores = () => {
    getDataProveedor((collection) => {
        const select = document.getElementById('proveedor');
        let options = '<option value="">Seleccione un proveedor</option>';
        collection.forEach((doc) => {
            const proveedor = doc.data();
            proveedoresMap.set(doc.id, proveedor.nombre); // Guardar en el mapa
            options += `<option value="${doc.id}">${proveedor.nombre}</option>`;
        });
        select.innerHTML = options;
    });
};

// Mostrar datos de plantas
window.addEventListener('DOMContentLoaded', () => {
    cargarCategorias(); // Cargar opciones dinámicas
    cargarProveedores(); // Cargar opciones dinámicas

    getDataPlantas((collection) => {
        let tabla = '';
        collection.forEach((doc) => {
            const item = doc.data();
            const nombreCategoria = categoriasMap.get(item.categoria) || item.categoria;
            const nombreProveedor = proveedoresMap.get(item.proveedor) || item.proveedor;
            tabla += `<tr>
                <td>${item.codigo}</td>
                <td>${item.nombre}</td>
                <td>${nombreProveedor}</td>
                <td>${nombreCategoria}</td>
                <td>${item.descripcion}</td>
                <td>${item.stock}</td>
                <td>${item.precio}</td>
                <td><img src="${item.imagen}" alt="Imagen" width="50"></td>
                <td nowrap>
                    <button class="btn btn-warning" id="${doc.id}">Editar</button>
                    <button class="btn btn-danger" id="${doc.id}">Eliminar</button>
                </td>
            </tr>`;
        });
        document.getElementById('contenido').innerHTML = tabla;

        // Botones de eliminar
        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Estás seguro de eliminar la planta?",
                    text: "No podrás revertir los cambios",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar",
                    cancelButtonText: "Cancelar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        eliminarPlantas(btn.id);
                        Swal.fire({
                            title: "Eliminado",
                            text: "Su planta ha sido eliminada",
                            icon: "success"
                        });
                        document.getElementById('btnGuardar').value = 'Guardar';
                        limpiar();
                    }
                });
            });
        });

        // Botones de editar
        document.querySelectorAll('.btn-warning').forEach(btn => {
            btn.addEventListener('click', async () => {
                try {
                    const doc = await obtenerPlantas(btn.id);
                    const d = doc.data();

                    // Actualizar los valores de los campos del formulario
                    document.getElementById('codigo').value = d.codigo;
                    document.getElementById('nombre').value = d.nombre;
                    document.getElementById('proveedor').value = d.proveedor || "";
                    document.getElementById('categoria').value = d.categoria || "";
                    document.getElementById('descripcion').value = d.descripcion || ""; // Asegurarse de asignar la descripción
                    document.getElementById('stock').value = d.stock;
                    document.getElementById('precio').value = d.precio;
                    document.getElementById('imagen').value = d.imagen || "";

                    document.getElementById('btnGuardar').value = 'Modificar';
                    id = btn.id;
                } catch (error) {
                    console.error("Error al obtener la planta: ", error);
                }
            });
        });
    });
});

// Guardar y modificar plantas
document.getElementById('btnGuardar').addEventListener('click', () => {
    const planta = {
        codigo: document.getElementById('codigo').value,
        nombre: document.getElementById('nombre').value,
        proveedor: document.getElementById('proveedor').value,
        categoria: document.getElementById('categoria').value,
        descripcion: document.getElementById('descripcion').value, // Agregar descripción
        stock: document.getElementById('stock').value,
        precio: document.getElementById('precio').value,
        imagen: document.getElementById('imagen').value,
    };

    if (id === 0) {
        savePlantas(planta);
    } else {
        updatePlantas(id, planta);
    }

    limpiar(); // Llama siempre a limpiar después de guardar o editar
});

// Limpiar formulario
const limpiar = () => {
    document.querySelector('form').reset(); // Reinicia el formulario
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid');
        item.classList.remove('is-valid');
        const errorDiv = document.getElementById(`e-${item.id}`);
        if (errorDiv) errorDiv.innerHTML = ''; // Limpia el div de error
    });
    document.getElementById('codigo').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('proveedor').value = '';
    document.getElementById('categoria').value = '';
    document.getElementById('descripcion').value = ''; // Limpiar el campo descripción
    document.getElementById('stock').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('imagen').value = '';
    document.getElementById('btnGuardar').value = 'Guardar'; // Restablecer el valor del botón a 'Guardar'
    id = 0;  // Reiniciar el id
};
