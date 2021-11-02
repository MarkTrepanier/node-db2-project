const db = require("../../data/db-config.js");

const getAll = async () => {
  const result = await db("cars");
  return result;
};

const getById = async (id) => {
  const result = await db("cars").where("id", id).first();
  return result;
};

const create = async (car) => {
  const [id] = await db("cars").insert(car);
  const newCar = await getById(id);
  return newCar;
};

module.exports = {
  getAll,
  getById,
  create,
};
