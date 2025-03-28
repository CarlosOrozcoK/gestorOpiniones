import { Router } from "express";
import { check } from "express-validator";
import { getPosts, createPost, updatePost, deletePost} from "./post.controller.js";
import { existePublicacionById} from "../helpers/db-validators-publi.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();


router.get("/", getPosts);

router.post(
  "/",
  [
      validarJWT,
      check("title", "The title is required").not().isEmpty(),
      check("category", "The category is required").not().isEmpty(),
      check("text", "The text is required").not().isEmpty(),
      validarCampos
  ],
  createPost
);

router.put(
  "/:id",
  [
      validarJWT,
      check('id', 'No es un ID válido').isMongoId(),
      check('id').custom(existePublicacionById),
      validarCampos
  ],
  updatePost
);

router.delete(
  "/:id",
  [
      validarJWT,
      check('id', 'No es un ID válido').isMongoId(),
      check('id').custom(existePublicacionById),
      validarCampos
  ],
  deletePost
);

export default router;
