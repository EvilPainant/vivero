import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { 
  addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, onSnapshot, query, updateDoc, where 
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyANERwSZvEoZh5M0m91GwmPw7llkZLksiI",
    authDomain: "vivelo-4c604.firebaseapp.com",
    projectId: "vivelo-4c604",
    storageBucket: "vivelo-4c604.firebasestorage.app",
    messagingSenderId: "419261307013",
    appId: "1:419261307013:web:59f5d082c4007e470df1ec",
    measurementId: "G-PE29ZG57HJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// Categoría

export const saveCategoria = async (categoria) => {
    const q = query(collection(db, 'Categorias'), where('nombre', '==', categoria.nombre));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        await addDoc(collection(db, 'Categorias'), categoria);
        Swal.fire({
            title: "Éxito",
            text: "Categoría guardada correctamente",
            icon: "success"
        });
    } else {
        Swal.fire({
            title: "Error",
            text: "Ya existe una categoría con ese nombre",
            icon: "error"
        });
    }
};

export const getDataCategoria = (data) => {
    onSnapshot(collection(db, 'Categorias'), data);
};

export const eliminarCategoria = (id) =>{
    deleteDoc(doc(db, 'Categorias', id));
};

export const obtenerCategoria = (id) => getDoc(doc(db, 'Categorias', id));

export const updateCategoria = (id, categoria) =>{
    updateDoc(doc(db, 'Categorias', id), categoria);
};


// Proveedores

export const saveProveedor = async (proveedor) => {
    const q = query(collection(db, 'Proveedores'), where('run', '==', proveedor.run));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        await addDoc(collection(db, 'Proveedores'), proveedor);
        Swal.fire({
            title: "Éxito",
            text: "Proveedor guardado correctamente",
            icon: "success"
        });
    } else {
        Swal.fire({
            title: "Error",
            text: "Ya existe un proveedor con ese run",
            icon: "error"
        });
    }
};

export const getDataProveedor = (data) => {
    onSnapshot(collection(db, 'Proveedores'), data);
};

export const eliminarProveedor = (id) =>{
    deleteDoc(doc(db, 'Proveedores', id));
};

export const obtenerProveedor = (id) => getDoc(doc(db, 'Proveedores', id));

export const updateProveedor = (id, proveedor) =>{
    updateDoc(doc(db, 'Proveedores', id), proveedor);
};





// Plantas

export const savePlantas = async (plantas) => {
    const q = query(collection(db, 'Plantas'), where('codigo', '==', plantas.codigo));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        await addDoc(collection(db, 'Plantas'), plantas);
        Swal.fire({
            title: "Éxito",
            text: "Planta guardada correctamente",
            icon: "success"
        });
    } else {
        Swal.fire({
            title: "Error",
            text: "Ya existe una planta con ese codigo",
            icon: "error"
        });
    }
};

export const getDataPlantas = (data) => {
    onSnapshot(collection(db, 'Plantas'), data);
};

export const eliminarPlantas = (id) =>{
    deleteDoc(doc(db, 'Plantas', id));
};

export const obtenerPlantas = (id) => getDoc(doc(db, 'Plantas', id));

export const updatePlantas = (id, plantas) =>{
    updateDoc(doc(db, 'Plantas', id), plantas);
};