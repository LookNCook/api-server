/* istanbul ignore file */

// Sets up the routes.
module.exports.setup = (app, dishStore) => {
    /**
     * @openapi
     * /dishes:
     *   get:
     *     tags:
     *      - dishes
     *     summary: List of the Dishes
     *     description: Get the List of all Dishes and their Prices
     *     operationId: getDishes
     *     responses:
     *       '200':
     *         description: successful operation
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Dish'
     */
    app.get('/dishes', (req, res) => {
        res.send(Object.values(dishStore))
    })

    /**
     * @openapi
     * components:
     *   schemas:
     *     Dish:
     *       type: object
     *       properties:
     *         id:
     *           type: integer
     *           format: int64
     *           example: 15
     *         name:
     *           type: string
     *           example: 'Schnitzel mit Pommes'
     *         price:
     *           type: integer
     *           format: int64
     *           example: 750
     */
}