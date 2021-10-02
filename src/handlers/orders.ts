import { Express, Request, Response } from 'express';
import { PartialOrder, OrderStore } from '../models/order'
import jwt from 'jsonwebtoken';
import util from '../util/helpers'

const store = new OrderStore()

const index = async (_req: Request, res: Response) => {
    try {
        const orders = await store.index()
        res.json(orders)
    } catch (err) {
        res.status(400)
        res.json({"error":`${err}`})
    }
}

const show = async (req: Request, res: Response) => {
    try {
        jwt.verify(req.body.token, process.env.TOKEN_SECRET as string)
    } catch (err) {
        res.status(401)
        res.json(`Ivalid token. ${err}`)
        return
    }

    try {
        const order = await store.show(req.params.id)
        res.json(order)
    } catch (err) {
        res.status(400)
        res.json({"error":`${err}`})
    }
}

const create = async (req: Request, res: Response) => {
    const order: PartialOrder = {
        user_id: req.params.id || req.body.user_id,
        status: req.body.status
    }

    try {
        jwt.verify(req.body.token, process.env.TOKEN_SECRET as string)
    } catch (err) {
        res.status(401)
        res.json(`Ivalid token. ${err}`)
        return
    }

    if (order.user_id == "" || typeof order.user_id == 'undefined' ) {
        res.json("Invalid arguments. Requires id of user making order.")
        return 
    }

    try {
        const newOrder = await store.create(order)
        res.json(newOrder)
    } catch (err) {
        res.status(400)
        res.json({"error": `${err}`})
    }
}

const edit = async (req: Request, res: Response) => {
    const order: PartialOrder = {
        user_id: req.params.id || req.body.user_id,
        status: req.body.status
    }

    try {
        jwt.verify(req.body.token, process.env.TOKEN_SECRET as string)
    } catch (err) {
        res.status(401)
        res.json(`Ivalid token. ${err}`)
        return
    }

    try {
        const edited = await store.update(req.params.id, order)
        res.json(edited)
    } catch (err) {
        res.status(400)
        res.json(`Ivalid token. ${err}`)
    }
}

const destroy = async (req: Request, res: Response) => {
    try {
        jwt.verify(req.body.token, process.env.TOKEN_SECRET as string)
    } catch (err) {
        res.status(401)
        res.json(`Ivalid token. ${err}`)
        return
    }

    try {
        const deleted = await store.delete(req.params.id)
        res.json(deleted)
    } catch (err) {
        res.status(400)
        res.json(`Ivalid token. ${err}`)
    }
}

const addProduct = async (req: Request, res: Response) => {
    const orderId: string = req.params.id
    const productId: string = req.body.productId
    const quantity: number = parseInt(req.body.quantity as string) || 0

    try {
        jwt.verify(req.body.token, process.env.TOKEN_SECRET as string)
    } catch (err) {
        res.status(401)
        res.json(`Ivalid token. ${err}`)
        return
    }    

    // console.log(`order:, productId: , quantity: `)
    console.log(`order: ${orderId} ${util.isEmpty(orderId)}, 
    productId: ${productId} ${util.isEmpty(productId)}, 
    quantity: ${quantity} ${quantity == 0}`)
    
    if (util.isEmpty(orderId) || util.isEmpty(productId) || quantity == 0) {
        res.json("Invalid arguments. Requires order id, product id and product quantity.")
        return 
    }

    try {
        const addedProduct  = await store.addProduct(quantity, orderId, productId)
        res.json(addedProduct)
    } catch (err) {
        res.status(400)
        res.json({"error": `${err}`})
    }
}

const usersOrders = async (req: Request, res: Response) => {
    const userId: string = req.params.id

    try {
        jwt.verify(req.body.token, process.env.TOKEN_SECRET as string)
    } catch (err) {
        res.status(401)
        res.json(`Ivalid token. ${err}`)
        return
    }    

    try {
        const activeOrder  = await store.usersOrders(userId)
        res.json(activeOrder)
    } catch (err) {
        res.status(400)
        res.json({"error": `${err}`})
    }
} 

const userActiveOrder = async (req: Request, res: Response) => {
    const userId: string = req.params.id

    try {
        jwt.verify(req.body.token, process.env.TOKEN_SECRET as string)
    } catch (err) {
        res.status(401)
        res.json(`Ivalid token. ${err}`)
        return
    }    

    try {
        const activeOrder  = await store.userActiveOrder(userId)
        res.json(activeOrder)
    } catch (err) {
        res.status(400)
        res.json({"error": `${err}`})
    }
}

const userCompletedOrders = async (req: Request, res: Response) => {
    const userId: string = req.params.id

    try {
        jwt.verify(req.body.token, process.env.TOKEN_SECRET as string)
    } catch (err) {
        res.status(401)
        res.json(`Ivalid token. ${err}`)
        return
    }    

    try {
        const completedOrders  = await store.userCompletedOrders(userId)
        res.json(completedOrders)
    } catch (err) {
        res.status(400)
        res.json({"error": `${err}`})
    }
}

const ordersRoute = (app: Express) => {
    app.get('/orders', index)
    app.get('/orders/:id', show)
    app.post('/orders', create)
    app.put('/orders/:id', edit)
    app.delete('/orders/:id', destroy)

    app.post('/orders/:id/products', addProduct)

    app.get('/users/:id/orders', usersOrders)
    app.post('/users/:id/orders', create)
    app.get('/users/:id/orders/active', userActiveOrder)
    app.get('/users/:id/orders/completed', userCompletedOrders)
}



export default ordersRoute