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
        res.send(chefsStore)
    });

    /**
     * @openapi
     * /chefs:
     *   put:
     *     tags:
     *       - chefs
     *     summary: Update the task status in the chefs task list
     *     description: The status of the task will be modified if the chef has completed all necessary steps
     *     operationId: updateTask
     *     requestBody:
     *       description: Update an existent Task
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Chef'
     *         application/xml:
     *           schema:
     *             $ref: '#/components/schemas/Chef'
     *         application/x-www-form-urlencoded:
     *           schema:
     *             $ref: '#/components/schemas/Chef'
     *       required: true
     *     responses:
     *       '200':
     *         description: Successful operation
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Chef'          
     *           application/xml:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/TaskStatus'
     *       '400':
     *         description: Invalid ID supplied
     *       '404':
     *         description: Task not found
     *       '405':
     *         description: Validation exception
     */
    app.put('/chefs', (req, res) => {
        chefsStore = req.body;
        res.send(chefsStore)
    })

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