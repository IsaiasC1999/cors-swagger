const {Router} = require('express');
const personaControllers = Router();


 const personas = [{
    _id : 1,
    name: "Isaias",
    lastname : "Romano",
    age: 23
},
{
  _id : 2,
  name: "Pedro",
  lastname : "Pablo",
  age: 40
},
{
  _id : 3,
  name : "juan",
  lastname : "Roma",
  age : 43
}
]

/**
 * 
 * @swagger
 *  components:
 *    schemas:
 *       Personas:
 *         type: object        
 *         properties:
 *            name:
 *               type: string
 *               description: El nombre del usuario  
 *            messgge:
 *               type: string
 *               description: Ingrese un texto cualquiera 
 *         required:
 *            - name
 *            - messgge
 *         example:
 *           name: Isaias
 *           messgge: Cualquiero cosa 
 *              
 *          
 */


// End Point obtener una personas
/**
 *  @swagger
 *  /recursos/personas:
 *   post:
 *     summary: Crear una nueva persona
 *     tags: [Personas]
 *     requestBody:
 *        required: true
 *        content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Personas'
 *     responses:
 *        200:
 *            description: Se creo un nueva persona    
 */
personaControllers.post('/personas',(req,res)=>{

    console.log("Entro aqui")
    console.log("-----------------------------------------------")
    console.log(req.body);
    console.log("-----------------------------------------------")

    let p1 = req.body;
    personas.push(p1);
      res.status(200).send("Existos");

})

//End Point obtener listado de personas
/**
 *  @swagger
 *  /recursos/personas:
 *  get: 
 *     summary: Lista de personas
 *     tags: [Personas]
 *     responses:
 *        200:
 *            description: todos los usuarios
 *            content:
 *              application/json:
 *                schema: 
 *                 type: array 
 *                 items:
 *                    $ref: '#/components/schemas/Personas'  
 */
personaControllers.get('/personas', (req,res)=>{
     console.log("End point personas get") 
     res.status(200).send(personas)
})



// buscar por id 

/**
 * 
 * @swagger
 *  /recursos/personas/{id}:
 *  get: 
 *     summary: Buscar personas por id
 *     tags: [Personas]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: el id del usuario       
 *     responses:
 *        200:
 *            description: usuario existente 
 *            content:
 *              application/json:
 *                schema: 
 *                 type: object 
 *                 $ref: '#/components/schemas/Personas'  
 *        404:
 *          description: usuario no encontrado
 * 
 */
personaControllers.get('/personas/:id',(req,res)=>{

    const {id} = req.params
    let p1 = personas.find(p=> p._id == req.params.id)
    if(p1 === undefined) res.status(404).send("usuario no encontrado");
    
    res.status(200).send(p1);

})

// Borrar por Id
/**
 * 
 * @swagger
 *  /recursos/personas/{id}:
 *  delete: 
 *     summary: Borrar personas por id
 *     tags: [Personas]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: el id del usuario       
 *     responses:
 *        200:
 *            description: borrado con exito 
 *             
 *        404:
 *          description:  usuario no encontrado
 * 
 */
personaControllers.delete('/personas/:id',(req,res)=>{

    const p1 =  personas.find(p => p._id == req.params.id)
    if(p1 === undefined) res.status(404).send("usuario no encontrado") 
})


//Update por Id 
/**
 * 
 * @swagger
 *  /recursos/personas/{id}:
 *  put: 
 *     summary: actualizar persona por id
 *     tags: [Personas]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: el id del usuario       
 *     responses:
 *        200:
 *            description: borrado con exito 
 *             
 *        404:
 *          description:  usuario no encontrado
 * 
 *  
 * 
 */

  personaControllers.put('')

module.exports = {personaControllers}