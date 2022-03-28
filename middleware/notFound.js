module.exports = (req, res, next) => {
  console.log("Not found");
  return res.status(404).json({ code: 404, message: "URL no encontrada"});
};