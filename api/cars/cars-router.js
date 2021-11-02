const router = require("express").Router();
const Car = require("./cars-model");
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require("./cars-middleware");

router.get("/", async (req, res, next) => {
  try {
    const cars = Car.getAll();
    res.status(200).json({ cars });
  } catch (er) {
    next();
  }
});

router.post(
  "/",
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  async (req, res, next) => {
    try {
      const newCar = await Car.create();
      res.status(200).json(newCar);
    } catch (er) {
      next();
    }
  }
);

router.use((err, req, res, next) => {
  console.log(err.message);
  res.status(err.status || 500).json(err);
});

module.exports = router;
