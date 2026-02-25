import Service from "../models/Service.js";

// Crear servicio
export const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todos los servicios
export const getServices = async (req, res) => {
  try {
    const services = await Service.find({ active: true });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
