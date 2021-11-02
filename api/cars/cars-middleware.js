const Car = require("./cars-model");
const vinVal = require("vin-validator");

const checkCarId = (req, res, next) => {
  Car.getById(req.params.id)
    .then((car) => {
      if (car) {
        req.car = car;
        next();
      } else {
        next({ status: 404, message: "car with id <car id> is not found" });
      }
    })
    .catch(next);
};

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body;
  if (!vin || !make || !model || !mileage) {
    next({ status: 400, message: "<field name> is missing" });
  } else {
    next();
  }
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
  const cars = await cars.getAll();
  const vinMatches = cars.filter((car) => {
    return car.vin === req.body.vin.trim();
  });
  if (vinMatches.length >= 1) {
    next({ status: 400, message: "vin <vin number> already exists" });
  }
  next();
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
