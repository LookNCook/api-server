/* istanbul ignore file */

// Sets up the routes.
module.exports.setup = (app, chefsStore) => {
    /**
     * @openapi
     * /chefs:
     *   get:
     *     tags:
     *       - chefs
     *     summary: List of the Chefs
     *     description: Get the List of all Chefs and their assigned tasks
     *     operationId: getChefs
     *     responses:
     *       '200':
     *         description: successful operation
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Chef'
     */
    app.get('/chefs', (req, res) => {
        res.send(Object.values(chefsStore))
    });

    /**
     * @openapi
     * components:
     *   schemas:
     *     Task:
     *       type: object
     *       properties:
     *         id:
     *           type: integer
     *           format: int64
     *           example: 16
     *         status:
     *           type: string
     *           example: done
     *           enum:
     *             - in progress
     *             - done
     *         task:
     *           type: string
     *           example: peele potatos
     *     TaskStatus:
     *       type: object
     *       properties:
     *         id:
     *           type: integer
     *           format: int64
     *           example: 13
     *         status:
     *           type: string
     *           example: done
     *           enum:
     *             - in progress
     *             - done
     *     Chef:
     *       type: object
     *       properties:
     *         id:
     *           type: integer
     *           format: int64
     *           example: 14
     *         forename:
     *           type: string
     *           example: 'Thomas'
     *         lastname:
     *           type: string
     *           example: 'Cook'
     *         tasks:
     *           type: array
     *           xml:
     *             name: task
     *             wrapped: true
     *           items:
     *             $ref: '#/components/schemas/Task'
     */
}