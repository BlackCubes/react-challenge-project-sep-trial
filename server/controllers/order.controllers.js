const { Order } = require("../models");
const { AppError } = require("../errors");
const { catchAsync, filterObject, sanitize } = require("../utils");

exports.getCurrentOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find();

  res.status(200).json({
    success: true,
    orders,
  });
});

exports.addOrder = catchAsync(async (req, res, next) => {
  const filteredBody = sanitize(
    filterObject(req.body, "order_item", "quantity", "ordered_by")
  );

  const orderData = await Order.create(filteredBody);

  if (!orderData || !orderData._id) {
    return next(new AppError("Database error.", 400));
  }

  res.status(200).json({
    success: true,
    insertedId: orderData._id,
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  // make sure an order exists in the DB with that id.
  const { id } = sanitize(filterObject(req.params, "id"));

  const { order_item, quantity, ordered_by } = sanitize(
    filterObject(req.body, "order_item", "quantity", "ordered_by")
  );

  const findOrder = await Order.valueExists({ _id: id });

  if (!findOrder) {
    return next(new AppError("No order exists with that id!", 400));
  }

  const chosenUpdates = {};

  if (order_item) chosenUpdates.order_item = order_item;
  if (quantity) chosenUpdates.quantity = quantity;
  if (ordered_by) chosenUpdates.ordered_by = ordered_by;

  const updatedOrder = await Order.findByIdAndUpdate(id, chosenUpdates, {
    new: true,
    runValidators: true,
  });

  if (!updatedOrder) {
    return next(new AppError("Error in database while updating.", 400));
  }

  res.status(200).json({ success: true });
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  const { id } = sanitize(filterObject(req.params, "id"));

  const findOrder = await Order.valueExists({ _id: id });

  if (!findOrder) {
    return next(new AppError("No order exists with that id!", 400));
  }

  const deletedOrder = await Order.findByIdAndDelete(id);

  if (!deletedOrder) {
    return next(new AppError("Unable to delete from database.", 400));
  }

  res.status(200).json({ success: true });
});

exports.deleteAllOrders = catchAsync(async (req, res, next) => {
  // HITTING THIS ENDPOINT DELETES ALL ORDERS
  const deletedOrders = await Order.deleteMany({});

  if (!deletedOrders) {
    return next(new AppError("Error on deleting all orders.", 400));
  }

  res.status(200).json({ success: true, deleted: deletedOrders.n });
});

const liveUpdate = (index, limit) => async (req, res, next) => {
  const items = ["Live Soup", "Live Pasta", "Live Steak"];
  const rand = Math.random();
  const orders = await Order.find();

  const addRandom = async () => {
    const order_item = items[Math.floor(Math.random() * 3)];
    const quantity = Math.floor(Math.random() * 5);
    const ordered_by = "Live Updater";

    const orderData = await Order.create({
      order_item,
      quantity,
      ordered_by,
    });

    const message = `Added Order - Step ${index + 1} of ${limit}`;

    console.log(message);

    req.io.emit("event://order-add", {
      success: true,
      order: orderData,
    });
    req.io.emit("event://socket-message", { message });
  };

  const deleteRandom = async () => {
    const sorted = orders.sort((a, b) => {
      const aDate = new Date(a.createdAt);
      const bDate = new Date(b.createdAt);

      return aDate.getTime() - bDate.getTime();
    });

    const target = sorted[0]._id;

    if (!target && target !== 0) return;

    const deletedOrder = await Order.findByIdAndDelete(target);

    const message = `Deleted Order - Step ${index + 1} of ${limit}`;

    console.log(message);

    req.io.emit("event://order-delete", {
      success: true,
      deletedId: target,
    });
    req.io.emit("event://socket-message", { message });
  };

  if (orders.length < 3) {
    addRandom();
  } else if (orders.length > 5) {
    deleteRandom();
  } else {
    rand > 0.5 ? addRandom() : deleteRandom();
  }
};

exports.liveModeOrder = catchAsync(async (req, res, next) => {
  const { time } = sanitize(filterObject(req.body, "time"));

  const secsPerUpdate = !req.body || isNaN(time) ? 5 : time;

  res.status(200).json({ success: true });

  const limit = 12;
  let count = 0;

  for (let i = 0; i < limit; i++) {
    setTimeout(() => {
      liveUpdate(count, limit)(req, res, next);
      count++;
    }, i * secsPerUpdate * 1000);

    if (i === limit - 1) {
      setTimeout(() => {
        const message = "Live mode ending after the next step...";
        console.log(message);
        req.io.emit("event://socket-message", { message });
      }, i * secsPerUpdate * 1000);
    }
  }
});
