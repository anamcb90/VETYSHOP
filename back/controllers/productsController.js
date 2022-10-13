const producto=require("../models/productos")
const fetch =(url)=>import('node-fetch').then(({default:fetch})=>fetch(url));

//ver la lista de productos
exports.getProducts=async(req,res,next) =>{
    const productos=await producto.find();   
    res.status(200).json({
        sucess:true,
        cantidad: productos.length,
        productos
    })
}

//Ver un producto por ID
exports.getProductById= async (req, res, next)=>{
    const product= await producto.findById(req.params.id)
    if (!product){
            return res.status(404).json({
            success:false,
            message: "No encontramos ese producto"
        })
    }
    res.status(200).json({
        success:true,
        message:"Aqui debajo encuentras información sobre tu producto: ",
        product
    })
}

//Update un producto
exports.updateProduct= async (req,res,next) =>{
    let product= await producto.findById(req.params.id) //variable de tipo modificable
    if (!product){ //verifico que el objeto no existe para finalizar el proceso
        return res.status(404).json({
            success:false,
            message: 'No encontramos ese producto'
        })
    }
    
    //si el objeto si existia, entonces si ejecuto la actualización
    product= await producto.findByIdAndUpdate(req.params.id, req.body, {
        new:true, //valido solo los atributos nuevos o actualizados
        runValidators:true
    });
    //respondo OK si el producto si se actualizó
    res.status(200).json({
        success:true,
        message:"Producto actualizado correctamente",
        product
    })
}


//Eliminar producto
exports.deleteProduct= async (req,res,next) =>{
    const product= await producto.findById(req.params.id) 
    if (!product){ //Verifico que el objeto no existe para finalizar el proceso
        return res.status(404).json({ //Si el objeto no existe, return termina el metodo
            success:false,message: 'No encontramos ese producto'
        }
        )}
        await product.remove();//Eliminamos el producto
        res.status(200).json({
            success:true,
            message:"Producto eliminado correctamente",
    })
}



//crear nuevo producto /api/productos
exports.newProduct=async(req,res,next)=>{
    const product=await producto.create(req.body);
    res.status(201).json({
        sucess:true,
        product
    })
}

//HABLEMOS DE FETCH

//Ver todos los productos
function verProductos(){
    fetch('http://localhost:4000/api/productos')
    .then(res=>res.json())
    .then(res=>console.log(res))
    .catch(err=>console.error(err))
}
    //verProductos(); LLamamos al metodo creado para probar la consulta
    
    //Ver por id
    function verProductoPorID(id){
        fetch('http://localhost:4000/api/producto/'+id)
        .then(res=>res.json())
        .then(res=>console.log(res))
        .catch(err=>console.error(err))
    }
    //verProductoPorID('63475129c5c91b29d4525d26'); //Probamos el metodo con un id
