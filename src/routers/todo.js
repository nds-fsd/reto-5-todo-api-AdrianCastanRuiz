const express = require('express');


const {todos} = require('../data/index');


/*

Un Router de express es como un switch case de Javascript. Simplemente redirige las peticiones hacia la ruta correcta, si esta existe.

En una aplicacion de express podemos tener tantos Routers como queramos/sean necesarios. Lo habitual cuando se implementa una API REST
es tener un Router por cada "recurso" de la api. Si imaginamos una aplicacion que tiene 3 recursos (User, Todo, Category), deberiamos
tener 3 routers diferentes: userRouter, todoRouter y categoryRouter.
*/

const todoRouter = express.Router();

todoRouter.get('/', (req, res)=>{
  
})

todoRouter.get('/todo', (req, res) => {
  //devolver todos los "todos" que hay en el array con formato JSON.

   res.json(todos)


});

todoRouter.post('/todo', (req, res) => {
  let nuevaTarea = req.body;
  console.log(req.body)
  todos.push(nuevaTarea)
  nuevaTarea.id = todos.length 
  res.json(todos)
  
  //crear un nuevo objeto con estructura {id, text, fecha, done} con los datos que vienen en el BODY de la Request y meterlos dentro de el array.
  //el nuevo objeto debe tener como id un numero mas que el numero actual de elementos guardados en el array.

});


/*
En este endpoint, el path contiene una variable llamada id. La syntaxis que utiliza express para estos casos es el simbolo :

Una variable en un path, significa que express recoge el valor que va justo después de /todo/ y lo guarda en una variable dentro del objeto "req"
con el mismo nombre que hemos utilizado en el path.

Ejemplo:

Si con Insomnia o Postman hicisemos una peticion GET a la ruta /todo/12, está será dirigida directamente hasta este endpoint.


*/
todoRouter.get('/todo/:id',  (req, res) => {
  let id = req.params.id
  let index = todos.findIndex(element => element.id == id)

  if (index == -1) return res.status(404).send('Sorry, we cannot find the task')

  res.json(todos[index])

  //recogemos el valor de la variable del path llamada "id" y lo transformarlo a un numero (todos nuestros ids son numericos).
  //cualquier valor que recogemos de req.params será siempre un String. Por eso lo debemos convertir a numero.

  //buscar dentro del array "todos" aquel elemento que coincide con el id recibido por parametro de la ruta en la request.
  //si existe, devolverlo como formato JSON y codigo de status 200.

  //Si no hemos econtrado un TODO o no nos han pasado un id en la ruta, devolvemos un 404.
});


// MISSING '/todo/:id' PATCH

todoRouter.patch('/todo/:id',  (req, res) => {
  
  let updates = req.body;
  let id = req.params.id;
  let index = todos.findIndex(element => element.id == id);

  if(index == -1) return res.status(404).send('Sorry, we cannot find the task')

  Object.assign(todos[index], updates)


  res.json(todos)
  
  
  
  
  
  //recogemos el valor de la variable del path llamada "id" y lo transformarlo a un numero (todos nuestros ids son numericos).
  //cualquier valor que recogemos de req.params será siempre un String. Por eso lo debemos convertir a numero.
  
  //buscar dentro del array "todos" aquel elemento que coincide con el id recibido por parametro de la ruta en la request.
  //si existe, lo ACTUALIZAMOS con los datos del BODY de la Request y lo devolvemos como formato JSON y codigo de status 200.
  
  //Si no hemos econtrado un TODO o no nos han pasado un id en la ruta, devolvemos un 404.
  
});

// MISSING '/todo/:id' DELETE


todoRouter.delete('/todo/:id',  (req, res) => {
  
  let id = req.params.id;
  let index = todos.findIndex(element => element.id == id);

  if(index == -1) return res.status(404).send('Sorry, we cannot find the task that you want to delete');

  todos.splice(+index, 1);

  res.send(todos)

  
  
  
  //recogemos el valor de la variable del path llamada "id" y lo transformarlo a un numero (todos nuestros ids son numericos).
  //cualquier valor que recogemos de req.params será siempre un String. Por eso lo debemos convertir a numero.
  
  //buscar dentro del array "todos" aquel elemento que coincide con el id recibido por parametro de la ruta en la request.
  //si existe, lo BORRAMOS y devolvemos un codigo de status 204.
  
  //Si no hemos econtrado un TODO o no nos han pasado un id en la ruta, devolvemos un 404.
  
});


//exportamos el router para poder 'usarlo' en nuestra app.
module.exports = todoRouter;


