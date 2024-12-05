import { getDataPlantas, getDataCategoria, getDataProveedor } from "../modelo/firebase.js";

let categoriasMap = new Map();
let proveedoresMap = new Map();

// Cargar categorías dinámicamente y almacenarlas en un mapa
const cargarCategorias = () => {
    getDataCategoria((collection) => {
        collection.forEach((doc) => {
            const categoria = doc.data();
            categoriasMap.set(doc.id, categoria.nombre); // Guardar en el mapa
        });
    });
};

// Cargar proveedores dinámicamente y almacenarlos en un mapa
const cargarProveedores = () => {
    getDataProveedor((collection) => {
        collection.forEach((doc) => {
            const proveedor = doc.data();
            proveedoresMap.set(doc.id, proveedor.nombre); // Guardar en el mapa
        });
    });
};

window.addEventListener('DOMContentLoaded', () => {
    // Cargar las categorías y proveedores antes de cargar las plantas
    cargarCategorias();
    cargarProveedores();

    getDataPlantas((collection) => {
        let cartas = '';
        collection.forEach((doc) => {
            const item = doc.data();

            // Obtener el nombre de la categoría y el proveedor usando el ID
            const nombreCategoria = categoriasMap.get(item.categoria) || item.categoria;
            const nombreProveedor = proveedoresMap.get(item.proveedor) || item.proveedor;

            cartas += `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <img src="${item.imagen}" class="card-img-top" alt="${item.nombre}">
                        <div class="card-body">
                            <h5 class="card-title">${item.nombre}</h5>
                            <p class="card-text"><strong>Código:</strong> ${item.codigo}</p>
                            <p class="card-text"><strong>Proveedor:</strong> ${nombreProveedor}</p>
                            <p class="card-text"><strong>Categoría:</strong> ${nombreCategoria}</p>
                            <p class="card-text"><strong>Stock:</strong> ${item.stock}</p>
                            <p class="card-text"><strong>Precio:</strong> $${item.precio}</p>
                            <p class="card-text"><strong>Descripción:</strong> ${item.descripcion}</p>
                        </div>
                    </div>
                </div>
            `;
        });
        document.getElementById('contenido').innerHTML = cartas;
    });
});
