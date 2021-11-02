const Car = require("./cars-model");
const vinVal = require("vin-validator");

const checkCarId = (req, res, next) => {
  Car.getById(req.params.id)
    .then((car) => {
      if (car) {
        req.car = car;
        next();
      } else {
        next({
          status: 404,
          message: `car with id ${req.params.id} is not found`,
        });
      }
    })
    .catch(next);
};

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body;
  if (!vin) {
    next({ status: 400, message: "vin is missing" });
  }
  if (!make) {
    next({ status: 400, message: "make is missing" });
  }
  if (!model) {
    next({ status: 400, message: "model is missing" });
  }
  if (!mileage) {
    next({ status: 400, message: "mileage is missing" });
  }
  next();
};

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body;
  const valid = vinVal.validate(vin);
  if (!valid) {
    next({ status: 400, message: `vin ${vin} is invalid` });
  } else {
    next();
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  const cars = await Car.getAll();
  const vinMatches = cars.filter((car) => {
    return car.vin === req.body.vin.trim();
  });
  if (vinMatches.length >= 1) {
    next({ status: 400, message: `vin ${req.body.vin} already exists` });
  }
  next();
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
