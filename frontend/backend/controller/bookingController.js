const Booking = require("../models/bookingModel");
const User = require("../models/userModel");
const mailVerification = require("./mailVerification");
const Tour= require("../models/tourModel")

// Create a new booking
exports.createBooking = async (req, res) => {
  const newBooking = new Booking(req.body);
  try {
    const savedBooking = await newBooking.save();

    return res.status(201).json({
      success: true,
      message: "Booked Successful",
      data: savedBooking,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();

    return res.status(200).json({
      success: true,
      message: "Booking Found successfully",
      data: bookings,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get a single booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: booking,
      message: "Booking found",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete a booking by ID
exports.deleteBooking = async (req, res) => {
  const id = req.params.id;
  try {
    await Booking.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

//for approving booking//

exports.approveBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Update the booking status to 'approved'
    booking.status = "approved";
    await booking.save();

    // Send email verification
    await mailVerification.ApprovedBookingEmailSent(booking.userEmail);

    // Send a single response indicating success
    return res.status(200).json({
      success: true,
      message: "Booking approved successfully and Email sent",
      data: booking,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes

    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your request",
    });
  }
};

//for approving payment//
exports.approvePayment = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "booking not found",
      });
    }

    //update the payment status to "paid"//
    booking.paymentStatus = "paid";
    await booking.save();
    return res.json({
      success: true,
      message: "Payment approved successfully",
      data: booking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//booking history  by user id//

exports.getBookingHistory = async (req, res) => {
  // Check if user is logged in
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  }

  const userEmail = req.user.email; // Assuming the user email is stored in the 'email' field of the authenticated user object

  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const bookings = await Booking.find({ userEmail });

    if (!bookings || bookings.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No bookings found for the user",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      data: bookings,
      message: "Booking history found",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//update booking status//

exports.updateBooking = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getMostBookedDestinations = async (req, res) => {
  try {
    const mostBooked = await Booking.aggregate([
      { $group: { _id: "$destination", count: { $sum: 1 } } }, // Group by destination and count bookings
      { $sort: { count: -1 } }, // Sort by count in descending order
      { $limit: 5 }, // Limit to top 5 most booked destinations
    ]);

    return res.status(200).json({
      success: true,
      message: "Most booked destinations fetched successfully",
      data: mostBooked,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// Get most-booked tours
// Get most-booked tours with full tour data for the client side
// Get most-booked tours with full tour data for the client side
exports.getMostBookedTours = async (req, res) => {
  try {
    // Aggregation pipeline to group bookings by tour and count them
    const mostBookedTours = await Booking.aggregate([
      {
        $group: {
          _id: "$tour", // Group by tour ID
          bookingCount: { $sum: 1 }, // Count the number of bookings for each tour
        },
      },
      {
        $sort: { bookingCount: -1 }, // Sort by booking count in descending order
      },
      {
        $limit: 5, // Limit to the top 5 most booked tours
      },
    ]);

    // Populate the tour details along with category and other relevant information
    const populatedTours = await Promise.all(
      mostBookedTours.map(async (item) => {
        // Find the tour by ID and populate necessary fields
        const tour = await Tour.findById(item._id)
          .populate("category", "name") // Populate the category name (or any other fields you need)
          .populate("days", "title description"); // Populate the days (if relevant)

        // Check if the tour exists
        if (!tour) {
          return null; // If tour does not exist, return null
        }

        return {
          tour,
          bookingCount: item.bookingCount,
        };
      })
    );

    // Filter out null entries (in case some tours were not found)
    const validTours = populatedTours.filter((item) => item !== null);

    if (validTours.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No most booked tours available",
      });
    }

    // Return the tour data for the client side
    res.status(200).json({
      success: true,
      message: "Most booked tours found",
      data: validTours.map((item) => ({
        title: item.tour.title,
        city: item.tour.city,
        price: item.tour.price,
        maxGroupSize: item.tour.maxGroupSize,
        category: item.tour.category ? item.tour.category.name : "N/A",
        bookingCount: item.bookingCount,
        photo: item.tour.photo ? item.tour.photo.url : "default.png",
        days: item.tour.days,
      })),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching most booked tours",
      error: error.message,
    });
  }
};


