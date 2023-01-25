/* istanbul ignore file */

// Sets up the routes.
module.exports.setup = (app, orderStore, dishStore, chefStore) => {
    /**
     * @openapi
     * /order:
     *   get:
     *    tags:
     *      - order
     *    summary: Get all Orders
     *    description: Multiple Orders can be provided with comma separated strings
     *    operationId: getOrders
     *    responses:
     *      '200':
     *        description: successful operation
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: '#/components/schemas/Order'          
     */
    app.get('/order', (req, res) => {
        let orders = Object.values(orderStore)
        if (req.query.chefID) {
            console.log('orders assigned to chef with ID ' + req.query.chefID + ' have been requested')
            let filteredOrders = []
            for (let order of orders) {
                if (order.chefID.toString() === req.query.chefID) {
                    filteredOrders.push(order)
                }
            }
            res.send(filteredOrders)
        } else {
            console.log('all orders have been requested')
            res.send(orders)
        }
    });

    /**
     * @openapi
     * /order:
     *   post:
     *     tags:
     *       - order
     *     summary: Add a new Order
     *     description: The waiter can place an order via the app. The order is assigned to a seat (customer), contains the ordered dish and the price
     *     operationId: addOrder
     *     requestBody:
     *       description: Create a new Order
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/OrderPlacement'
     *         application/xml:
     *           schema:
     *             $ref: '#/components/schemas/OrderPlacement'
     *         application/x-www-form-urlencoded:
     *           schema:
     *             $ref: '#/components/schemas/OrderPlacement'
     *       required: true
     *     responses:
     *       '200':
     *         description: Successful operation
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Order'          
     *           application/xml:
     *             schema:
     *               $ref: '#/components/schemas/Order'
     *       '405':
     *         description: Invalid input
     */
    app.post('/order', (req, res) => {

        console.log('Seat ' + req.body.seatID + ' from table ' + req.body.tableID + ' wants to order dish ' + req.body.dishID)

        // Get new OrderId
        const orderId = ++Object.keys(orderStore).length

        let dishes = Object.values(dishStore)
        let dish = dishes.find(dish => dish.dishID === req.body.dishID)

        let leastBusiestChef = findLeastBusiestChef()

        if (dish === undefined) {
            res.sendStatus(500)
            console.log('The requested dish is not available')
        } else {
            // Create Order Object
            const newOrder = {
                orderID: orderId,
                tableID: req.body.tableID,
                seatID: req.body.seatID,
                dish: dish,
                status: 'PLACED',
                chefID: leastBusiestChef
            }

            // Store Order
            orderStore[orderId] = newOrder

            // Return response
            res.send(newOrder)

            console.log('A new order with ID ' + newOrder.orderID + ' has been placed')
            console.log(newOrder)
        }
    });

    function findLeastBusiestChef() {
        let chefForEveryOrder = []

        let chefs = Object.values(chefStore)
        for (let chef of chefs) {
            chefForEveryOrder.push(chef.chefID)
        }

        console.log(chefForEveryOrder)

        let orders = Object.values(orderStore)
        for (let order of orders) {
            chefForEveryOrder.push(order.chefID)
        }

        console.log(chefForEveryOrder)

        const leastBusiestChef = [...chefForEveryOrder.reduce((r, n) => r.set(n, (r.get(n) || 0) + 1), new Map())]
            .reduce((r, v) => v[1] < r[1] ? v : r)[0];

        return leastBusiestChef
    }

     /**
      * @openapi
      * /order:
      *   put:
      *     tags:
      *       - order
      *     summary: Update the order status
      *     description: The status of the order can be modified by waiter and chef
      *     operationId: updateOrder
      *     requestBody:
      *       description: Update an existent order
      *       content:
      *         application/json:
      *           schema:
      *             $ref: '#/components/schemas/Order'
      *         application/xml:
      *             schema:
      *             $ref: '#/components/schemas/Order'
      *         application/x-www-form-urlencoded:
      *           schema:
      *             $ref: '#/components/schemas/Order'
      *     required: true
      *     responses:
      *       '200':
      *         description: Successful operation
      *         content:
      *           application/json:
      *             schema:
      *               $ref: '#/components/schemas/Order'          
      *       '400':
      *         description: Invalid ID supplied
      *       '404':
      *         description: Order not found
      *       '405':
      *         description: Validation exception
      */
    app.put('/order', (req, res) => {
        const orderId = req.body.orderID

        if (orderStore[orderId]) {
            orderStore[orderId] = {
                orderID: orderId,
                tableID: req.body.tableID,
                seatID: req.body.seatID,
                dishID: req.body.dishID,
                status: req.body.status,
                cost: req.body.cost
            }
            res.send(orderStore[orderId])
        } else {
            res.sendStatus(404)
        }
    })

    /**
     * @openapi
     * components:
     *   schemas:
     *     OrderPlacement:
     *       type: object
     *       properties:
     *          tableID:
     *            type: integer
     *            format: int64
     *            example: 10
     *          seatID:
     *            type: integer
     *            format: int64
     *            example: 11
     *          dishID:
     *            type: integer
     *            format: int64
     *            example: 12
     *     Order:
     *       type: object
     *       properties:
     *         orderID:
     *           type: integer
     *           format: int64
     *           example: 9
     *         tableID:
     *           type: integer
     *           format: int64
     *           example: 10
     *         seatID:
     *           type: integer
     *           format: int64
     *           example: 11
     *         dishID:
     *           type: integer
     *           format: int64
     *           example: 12
     *         cost:
     *           type: integer
     *           format: int64
     *           example: 750
     *         status:
     *           type: string
     *           example: placed
     *           enum:
     *             - placed
     *             - in progress
     *             - ready
     *             - served
     *             - paid
     */
}