import { Router } from "express";
import { ProductsController } from "../controllers/ProductController";


const productRouter = Router()

const productsController = new ProductsController()


productRouter.get("/", (req, res) => productsController.ProductList(req, res));
productRouter.get("/:id", (req, res) => productsController.ProductShow(req, res));
productRouter.post("/", (req, res) => productsController.ProductCreate(req, res));
productRouter.put("/:id", (req, res) => productsController.ProductUpdate(req, res));
productRouter.delete("/:id", (req, res) => productsController.ProductDelete(req, res));


export default productRouter;
