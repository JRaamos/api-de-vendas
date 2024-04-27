import { Router } from "express";
import { ProductsController } from "../controllers/ProductController";
import { celebrate, Joi, Segments, errors } from "celebrate";


const productRouter = Router()

const productsController = new ProductsController()


productRouter.get("/", (req, res) => productsController.ProductList(req, res));

productRouter.get("/:id",
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() }
  }), (req, res) => productsController.ProductShow(req, res));

productRouter.post("/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required()
    }
  }),
  (req, res) => productsController.ProductCreate(req, res));

productRouter.put("/:id",
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() }
  }),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required()
    }
  }), (req, res) => productsController.ProductUpdate(req, res));

productRouter.delete("/:id",
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() }
  }), (req, res) => productsController.ProductDelete(req, res));

export default productRouter;
