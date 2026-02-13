import Booking from "../models/model.booking.js";
import Service from "../models/model.service.js";
import { generateBookingId } from "../utils/generateBookingId.js";
import { generateETA } from "../services/eta.service.js";
import { assignRandomEmployee } from "../services/providermatcher.service.js";

/**
 * @route   POST /api/bookings
 * @desc    Create a new booking (user only)
 * @access  Private/User
 */
export const createBooking = async (req, res) => {
  try {
    const { serviceId, address, notes } = req.body;

    // Validate service ID
    if (!serviceId) {
      return res.status(400).json({
        success: false,
        message: "Service ID is required"
      });
    }

    // Check if service exists
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found"
      });
    }

    // Generate unique booking ID
    let bookingId;
    let isUnique = false;
    while (!isUnique) {
      bookingId = generateBookingId();
      const existingBooking = await Booking.findOne({ bookingId });
      if (!existingBooking) {
        isUnique = true;
      }
    }

    // Assign random employee
    const employee = await assignRandomEmployee();

    // Generate ETA
    const eta = generateETA();

    // Create booking
    const booking = await Booking.create({
      bookingId,
      user: req.user.id,
      service: serviceId,
      employee: employee?._id || null,
      status: "pending",
      eta,
      address,
      notes
    });

    // Populate booking details
    const populatedBooking = await Booking.findById(booking._id)
      .populate("user", "name email")
      .populate("service", "title description price")
      .populate("employee", "name email");

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking: populatedBooking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @route   GET /api/bookings/my
 * @desc    Get current user's bookings
 * @access  Private/User
 */
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("service", "title description price")
      .populate("employee", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @route   GET /api/bookings/:id
 * @desc    Get single booking by ID
 * @access  Private
 */
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("user", "name email")
      .populate("service", "title description price")
      .populate("employee", "name email");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    // Check authorization
    if (
      req.user.role !== "admin" &&
      req.user.role !== "employee" &&
      booking.user._id.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to access this booking"
      });
    }

    res.status(200).json({
      success: true,
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @route   GET /api/bookings
 * @desc    Get all bookings (admin only)
 * @access  Private/Admin
 */
export const getAllBookings = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const query = {};
    if (status) {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .populate("user", "name email")
      .populate("service", "title description price")
      .populate("employee", "name email")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Booking.countDocuments(query);

    res.status(200).json({
      success: true,
      count: bookings.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @route   GET /api/bookings/employee/assigned
 * @desc    Get bookings assigned to current employee
 * @access  Private/Employee
 */
export const getEmployeeBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ employee: req.user.id })
      .populate("user", "name email")
      .populate("service", "title description price")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @route   PATCH /api/bookings/:id/status
 * @desc    Update booking status (employee only)
 * @access  Private/Employee
 */
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Validate status
    const validStatuses = ["pending", "confirmed", "on_the_way", "completed", "cancelled"];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`
      });
    }

    // Find booking
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    // Check if employee is assigned to this booking or user is admin
    if (
      req.user.role !== "admin" &&
      booking.employee?.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this booking"
      });
    }

    // Update status
    booking.status = status;
    await booking.save();

    // Populate and return
    const updatedBooking = await Booking.findById(booking._id)
      .populate("user", "name email")
      .populate("service", "title description price")
      .populate("employee", "name email");

    res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      booking: updatedBooking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @route   DELETE /api/bookings/:id
 * @desc    Delete/Cancel booking
 * @access  Private
 */
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    // Check authorization
    if (
      req.user.role !== "admin" &&
      booking.user.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this booking"
      });
    }

    await Booking.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
