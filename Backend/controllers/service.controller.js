import Service from "../models/model.service.js";

/**
 * @route   GET /api/services
 * @desc    Get all services
 * @access  Public
 */
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: services.length,
      services
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @route   GET /api/services/:id
 * @desc    Get single service by ID
 * @access  Public
 */
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found"
      });
    }

    res.status(200).json({
      success: true,
      service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @route   POST /api/services
 * @desc    Create new service (admin only)
 * @access  Private/Admin
 */
export const createService = async (req, res) => {
  try {
    const { title, description, price } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Service title is required"
      });
    }

    const service = await Service.create({
      title,
      description,
      price
    });

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @route   PUT /api/services/:id
 * @desc    Update service (admin only)
 * @access  Private/Admin
 */
export const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @route   DELETE /api/services/:id
 * @desc    Delete service (admin only)
 * @access  Private/Admin
 */
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Service deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
