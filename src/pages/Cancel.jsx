import React from "react";
import { Link } from "react-router-dom";

function Cancel() {
  return (
    <div className="page-wrapper" style={{ padding: "3rem 1.5rem" }}>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4">Checkout canceled</h1>
        <p className="mb-4">
          No worries—your card has not been charged. You can update your plan or
          try again at any time.
        </p>
        <Link
          to="/services"
          className="inline-block px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Back to Services
        </Link>
      </div>
    </div>
  );
}

export default Cancel;
