const express = require("express");
const borrowerController = require("../controllers/borrower_controller");

const borrowerRoutes = express.Router();

borrowerRoutes.get("/borrowers", borrowerController.getAllBorrowers);
borrowerRoutes.get("/borrower/:id", borrowerController.getBorrowerById);
borrowerRoutes.post("/borrower", borrowerController.createBorrower);
borrowerRoutes.put("/borrower/:id", borrowerController.updateBorrower);
borrowerRoutes.delete("/borrower/:id", borrowerController.deleteBorrower);

module.exports = borrowerRoutes;
