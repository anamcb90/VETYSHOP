const express=require("express")
const router=express.Router();
const {getProducts, newProduct, getProductById, updateProduct, deleteProduct} = require("../controllers/productsController")

    //Traemos la respuesta json desde el controlador
router.route('/productos').get(getProducts) //Establecemos desde que ruta queremos ver el getProducts
router.route('/producto/nuevo').post(newProduct);//Establecemos la ruta
router.route('/producto/:id').get(getProductById); //ruta para consultar por id
router.route('/producto/:id').put(updateProduct); //creacion de la ruta de actualizacion
router.route('/producto/:id').delete(deleteProduct); //creación de la ruta de eliminación por id


module.exports=router;