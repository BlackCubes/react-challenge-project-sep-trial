const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    order_item: String,
    quantity: Number,
    ordered_by: String,
  },
  {
    timestamps: true,
    collection: "Orders",
  }
);

// STATIC METHODS
// --- find query in DB
OrderSchema.statics.valueExists = function (query) {
  return this.findOne(query).then((res) => res);
};

module.exports = mongoose.model("Order", OrderSchema);
