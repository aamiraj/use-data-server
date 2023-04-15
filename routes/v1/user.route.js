const express = require("express");
const userRouter = express.Router();
const userController = require("../../controllers/user.controller");

userRouter.get(
  "/all",
  /**
   * @api {get} /all All users
   * @apiDescription Get all users
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-10}}      [limit=2]  Users per page
   *
   * @apiSuccess {Object[]} all users
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  userController.getAllUsers
);

userRouter.post(
  "/save",
  /**
   * @api {post} /save All users
   * @apiDescription Save a user
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess {Object[]} User is added.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  userController.validate("saveAUser"),
  userController.saveAUser
);

userRouter.get(
  "/random",
  /**
   * @api {get} /random get a random user
   * @apiDescription find a random user with random id number
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess {Object[]} get a random user
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  userController.getARandomUser
);

userRouter.patch(
  "/bulk-update",
  /**
   * @api {patch} /bulk-update update multiple users
   * @apiDescription update multiple users' information
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess {Object[]} update users' information by id
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  userController.updateMultipleUsers
);

userRouter
  .route("/:id")
  .get(
    /**
     * @api {get} /:id get a user by id
     * @apiDescription find a user by id params
     * @apiPermission admin
     *
     * @apiHeader {String} Authorization   User's access token
     *
     * @apiSuccess {Object[]} get a user
     *
     * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
     * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
     */
    userController.getAUser
  )
  .patch(
    /**
     * @api {patch} /:id update a user's info by id
     * @apiDescription update a user's info by id
     * @apiPermission admin
     *
     * @apiHeader {String} Authorization   User's access token
     *
     * @apiSuccess {Object[]}  update a user's info by id and send it
     *
     * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
     * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
     */
    userController.updateAUser
  )
  .delete(
    /**
     * @api {patch} /:id delete a user
     * @apiDescription delete a user by id
     * @apiPermission admin
     *
     * @apiHeader {String} Authorization   User's access token
     *
     * @apiSuccess {Object[]}  delete a user, User deleted successfully.
     *
     * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
     * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
     */
    userController.deleteAUser
  );

module.exports = userRouter;
