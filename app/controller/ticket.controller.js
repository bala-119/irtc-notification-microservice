// controllers/sendTicket.controller.js

const TicketService = require("../service/ticket.service");

class SendTicketController {

  async sendTicket(req, res) {
    try {
      const {
        email,
        pnr,
        train_number,
        train_name,
        from,
        to,
        journey_date,
        class_type,
        passengers,
        seat_details,
        total_fare,
        status
      } = req.body;

      // 🔥 Validation
      if (!email || !pnr) {
        return res.status(400).json({
          success: false,
          message: "Email and PNR are required"
        });
      }

      // 🔥 Call service
      await TicketService.sendTicketMail({
        email,
        pnr,
        train_number,
        train_name,
        from,
        to,
        journey_date,
        class_type,
        passengers,
        seat_details,
        total_fare,
        status
      });

      return res.status(200).json({
        success: true,
        message: "Ticket sent successfully"
      });

    } catch (error) {
      console.error("SEND TICKET ERROR:", error);

      return res.status(500).json({
        success: false,
        message: error.message || "Failed to send ticket"
      });
    }
  }
}

module.exports = new SendTicketController();