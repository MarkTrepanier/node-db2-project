const router = require("express").Router();
const Car = require("./cars-model");
const {
  //eslint-disable-next-line
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require("./cars-middleware");

router.get("/", async (req, res, next) => {
  try {
    const cars = await Car.getAll();
    res.status(200).json(cars);
  } catch (er) {
    next(er);
  }
});

router.get("/:id", checkCarId, (req, res) => {
  res.status(200).json(req.car);
});

router.post(
  "/",
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  async (req, res, next) => {
    console.log("ham");
    try {
      const newCar = await Car.create(req.body);
      res.status(200).json(newCar);
    } catch (er) {
      next(er);
    }
  }
);

//eslint-disable-next-line
router.use((err, req, res, next) => {
  console.log(err.message);
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = router;
