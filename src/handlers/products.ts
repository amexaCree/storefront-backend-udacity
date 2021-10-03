import { Express, Request, Response } from 'express';
import { PartialProduct, ProductStore } from '../models/product'
import jwt from 'jsonwebtoken';
import util from '../util/helpers'
import auth from '../middleware/authorize'


const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
    try {
        const products = await store.index()
        res.json(products)
    } catch (err) {
        res.status(400)
        res.json({"error":`${err}`})
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const product = await store.show(req.params.id)
        res.json(product)
    } catch (err) {
        res.status(400)
        res.json({"error":`${err}`})
    }
}

const create = async (req: Request, res: Response) => {
    const product: PartialProduct = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    }

    if (util.isEmpty(product.name) || product.price == 0) {
        res.json("Invalid arguments. Requires product name and price")
        return 
    }

    try {
        const newProduct = await store.create(product)
        res.json(newProduct)
    } catch (err) {
        res.status(400)
        res.json({"error":`${err}`})
    }
}

const edit = async (req: Request, res: Response) => {
    const product: PartialProduct = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    }

    try {
        const edited = await store.update(req.params.id, product)
        res.json(edited)
    } catch (err) {
        res.status(400)
        res.json(`Ivalid token. ${err}`)
    }
}

const destroy = async (req: Request, res: Response) => {

    try {
        const deleted = await store.delete(req.params.id)
        res.json(deleted)
    } catch (err) {
        res.status(400)
        res.json(`Ivalid token. ${err}`)
    }
}

const categoryIndex = async (req: Request, res: Response) => {
    const category = util.deserialiseCategory(req.params.category)
    console.log("category", category)
    try {
        const products = await store.categoryIndex(category)
        res.json(products)
    } catch (err) {
        res.status(400)
        res.json({"error":`${err}`})
    }

}

const topFiveProducts = async (req: Request, res: Response) => {
    try {
        const products = await store.topFiveProducts()
        res.json(products)
        // res.send("TOP FIVE!")
    } catch (err) {
        res.status(400)
        res.json({"error":`${err}`})
    }

}

const showOrderProducts = async (req: Request, res: Response) => {
    const orderId: string = req.params.id

    try {
        const orderProducts  = await store.showOrderProducts(orderId)
        res.json(orderProducts)
    } catch (err) {
        res.status(400)
        res.json({"error": `${err}`})
    }
}

const productsRoute = (app: Express) => {
    app.get('/products', index)
    app.get('/products/top_five', topFiveProducts)
    
    app.get('/products/:id', show)
    app.post('/products', auth, create)
    app.put('/products/:id', auth, edit)
    app.delete('/products/:id', auth, destroy)

    app.get('/orders/:id/products', auth, showOrderProducts)
    
    app.get('/products/categories/:category', categoryIndex)
}



export default productsRoute