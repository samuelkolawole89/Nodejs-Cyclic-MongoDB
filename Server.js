 //console.log("Hello");

 //let's create our express/nodejs application 

 const express = require('express')
 const mongoose = require('mongoose')
 const Product = require('./models/productModel')
 const app = express()

 //we need to specify middleware for us to use json to add
 //via insomnia
 app.use(express.json())

 //to also use urlencoded via insomnia
 app.use(express.urlencoded({extended: false})) 

 //how to access it through the web browser, you
 //have to declare route
 //req is the request made by client
 //res is the response by the Node App
 app.get('/', (req, res) => {
	 res.send('Hello NODE API')
 })

 app.get('/blog', (req, res) => {
	 res.send('Hello blog')
 })

 app.get('/reco', (req, res) => {
	 res.send('Hello reco')
 })

 app.get('/site', (req, res) => {
	 res.send('Hello site')
 })

//get all products
 app.get('/products', async(req, res) => {
	 try {
		const products = await Product.find({});
		res.status(200).json(products);

	} catch (error) {
		//console.log(error.message);
		res.status(500).json({message: error.message})
	}
 })

 //get a single product from id or using id
 app.get('/products/:id', async(req, res) => {
	 try {
		const {id} = req.params;
		const product = await Product.findById(id);
		res.status(200).json(product);

	} catch (error) {
		//console.log(error.message);
		res.status(500).json({message: error.message})
	}
 })

 //update a product
 app.put('/products/:id', async(req, res) => {
	 try {
		const {id} = req.params;
		const product = await Product.findByIdAndUpdate(id, req.body);
		//res.status(200).json(product);
		//we cannot find any
		if(!product){
			return res.status(404).json({message: `cannot find any product with ID ${id}`})
		}
		const updatedproduct = await Product.findById(id);
		res.status(200).json(updatedproduct);

	} catch (error) {
		//console.log(error.message);
		res.status(500).json({message: error.message})
	}
 })

 //delete a product
 app.delete('/products/:id', async(req, res) => {
	 try {
		const {id} = req.params;
		const product = await Product.findByIdAndDelete(id);
		if(!product){
			return res.status(404).json({message: `cannot find any product with ID ${id}`})
		}
		res.status(200).json(product);

	} catch (error) {
		//console.log(error.message);
		res.status(500).json({message: error.message})
	}
 })
 
app.post('/products', async(req, res) => {
	//console.log(req.body);
	//res.send(req.body)

	//data gotten from the client need to be saved to the database
	try {
		const product = await Product.create(req.body)
		res.status(200).json(product);

	} catch (error) {
		console.log(error.message);
		res.status(500).json({message: error.message})
	}
})

 //the connection string to connect to mongodb database
 //remember to put connection name after "mongodb.net/"
 //e.g our connection name is "Node-API"
 mongoose.
 connect('mongodb+srv://admin:administrator@cluster0.o0mfdno.mongodb.net/Node-API?retryWrites=true&w=majority')
 .then(()=> {
	 console.log('connected to MongoDB')
	 app.listen(3000, ()=> {
		console.log("Node API app is running on port 3000")
	 });
	 
 }).catch((error)=> {
	 console.log(error)
 })
