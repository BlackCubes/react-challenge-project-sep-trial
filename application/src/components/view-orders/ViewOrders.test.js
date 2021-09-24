import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

import ViewOrders from "./ViewOrders";

describe("View Orders", () => {
  test("view orders renders", () => {
    render(
      <MemoryRouter>
        <ViewOrders />
      </MemoryRouter>
    );
  });
});
