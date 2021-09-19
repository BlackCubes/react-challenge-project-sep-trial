const express = require("express");
const { orderController } = require("../controllers");
const { orderValidation } = require("../validations");

const router = express.Router();

router.get("/current-orders", orderController.getCurrentOrders);
router.post("/add-order", orderValidation.addOrder, orderController.addOrder);
router.post("/live-mode", orderController.liveModeOrder);
router.patch(
  "/edit-order",
  orderValidation.updateOrder,
  orderController.updateOrder
);
router.delete(
  "/delete-order",
  orderValidation.deleteOrder,
  orderController.deleteOrder
);
router.delete("/delete-all", orderController.deleteAllOrders);

module.exports = router;
