// services/ticket.service.js

const nodemailer = require("nodemailer");

class TicketService {

  async sendTicketMail(data) {

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
    } = data;

    // 🔥 Mail Transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // 🔥 Passenger HTML
    const passengerHtml = passengers.map((p, i) => `
      <tr>
        <td>${p.name}</td>
        <td>${p.age}</td>
        <td>${p.status}</td>
        <td>${seat_details[i]?.coach || "-"}</td>
        <td>${seat_details[i]?.seat_number || "-"}</td>
      </tr>
    `).join("");

    // 🔥 Email Template
    const html = `
      <h2>🚆 Railway Ticket Confirmation</h2>

      <p><b>PNR:</b> ${pnr}</p>
      <p><b>Train:</b> ${train_number} - ${train_name}</p>
      <p><b>From:</b> ${from} → <b>To:</b> ${to}</p>
      <p><b>Date:</b> ${new Date(journey_date).toDateString()}</p>
      <p><b>Class:</b> ${class_type}</p>
      <p><b>Status:</b> ${status}</p>

      <h3>Passengers</h3>
      <table border="1" cellpadding="5">
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Coach</th>
          <th>Seat</th>
        </tr>
        ${passengerHtml}
      </table>

      <h3>Total Fare: ₹${total_fare}</h3>
    `;

    // 🔥 Send Mail
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: `Ticket Confirmation - ${pnr}`,
      html
    });

    console.log("✅ Ticket email sent");
  }
}

module.exports = new TicketService();