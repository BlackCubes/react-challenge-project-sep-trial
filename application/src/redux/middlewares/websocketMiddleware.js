const websocketMiddleware = (socket) => {
  return ({ dispatch, getState }) =>
    (next) =>
    (action) => {
      if (typeof action === "function") return action(dispatch, getState);

      const { promise, type, types, ...rest } = action;

      // Not a socket request.
      if (type !== "socket" || !promise) return next(action);

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({ ...rest, type: REQUEST });

      return promise(socket)
        .then((result) => next({ ...rest, result, type: SUCCESS }))
        .catch((error) => next({ ...rest, error, type: FAILURE }));
    };
};

export default websocketMiddleware;
