import Contact from "../models/model.contact.js";
import User from "../models/model.user.js";

/**
 * @route   POST /api/contacts
 * @desc    Create a new contact form submission
 * @access  Public
 */
export const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, topic, message } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !topic || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields except phone are required"
      });
    }

    // Create new contact
    const contact = await Contact.create({
      firstName,
      lastName,
      email,
      phone: phone || "",
      topic,
      message
    });

    res.status(201).json({
      success: true,
      message: "Your message has been received. We'll get back to you within 24 hours!",
      contact: {
        id: contact._id,
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        topic: contact.topic,
        status: contact.status,
        createdAt: contact.createdAt
      }
    });
  } catch (error) {
    console.error("Contact form error:", error);
    
    res.status(500).json({
      success: false,
      message: "Error submitting contact form",
      error: error.message
    });
  }
};

/**
 * @route   GET /api/contacts
 * @desc    Get all contact submissions (Admin only)
 * @access  Private/Admin
 */
export const getAllContacts = async (req, res) => {
  try {
    const { status, limit = 50, page = 1 } = req.query;

    // Build query
    const query = {};
    if (status) {
      query.status = status;
    }

    // Calculate skip for pagination
    const skip = (page - 1) * limit;

    // Get contacts with pagination
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip)
      .populate("respondedBy", "name email");

    // Get total count
    const total = await Contact.countDocuments(query);

    res.status(200).json({
      success: true,
      contacts,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Get contacts error:", error);
    
    res.status(500).json({
      success: false,
      message: "Error fetching contacts",
      error: error.message
    });
  }
};

/**
 * @route   GET /api/contacts/:id
 * @desc    Get single contact by ID (Admin only)
 * @access  Private/Admin
 */
export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id).populate("respondedBy", "name email");

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found"
      });
    }

    res.status(200).json({
      success: true,
      contact
    });
  } catch (error) {
    console.error("Get contact error:", error);
    
    res.status(500).json({
      success: false,
      message: "Error fetching contact",
      error: error.message
    });
  }
};

/**
 * @route   PATCH /api/contacts/:id/respond
 * @desc    Respond to a contact query (Admin only)
 * @access  Private/Admin
 */
export const respondToContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminResponse, status } = req.body;
    const adminId = req.user?._id; // Assumes auth middleware sets req.user

    if (!adminResponse) {
      return res.status(400).json({
        success: false,
        message: "Admin response is required"
      });
    }

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found"
      });
    }

    // Update contact with response
    contact.adminResponse = adminResponse;
    contact.status = status || "resolved";
    contact.respondedBy = adminId;
    contact.respondedAt = new Date();

    await contact.save();

    // Populate respondedBy before returning
    await contact.populate("respondedBy", "name email");

    res.status(200).json({
      success: true,
      message: "Response sent successfully",
      contact
    });
  } catch (error) {
    console.error("Respond to contact error:", error);
    
    res.status(500).json({
      success: false,
      message: "Error responding to contact",
      error: error.message
    });
  }
};

/**
 * @route   PATCH /api/contacts/:id/status
 * @desc    Update contact status (Admin only)
 * @access  Private/Admin
 */
export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "in-progress", "resolved"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be: pending, in-progress, or resolved"
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).populate("respondedBy", "name email");

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      contact
    });
  } catch (error) {
    console.error("Update contact status error:", error);
    
    res.status(500).json({
      success: false,
      message: "Error updating contact status",
      error: error.message
    });
  }
};

/**
 * @route   DELETE /api/contacts/:id
 * @desc    Delete a contact (Admin only)
 * @access  Private/Admin
 */
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully"
    });
  } catch (error) {
    console.error("Delete contact error:", error);
    
    res.status(500).json({
      success: false,
      message: "Error deleting contact",
      error: error.message
    });
  }
};

export default {
  createContact,
  getAllContacts,
  getContactById,
  respondToContact,
  updateContactStatus,
  deleteContact
};
