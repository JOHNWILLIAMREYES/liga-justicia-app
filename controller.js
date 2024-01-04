const controller = module.exports;

controller.init = async (req, res) => {
  res.status(200).json({ msg: 'Hola mundo' });
};
