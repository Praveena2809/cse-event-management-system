export const registrationEmailTemplate = ({
    name,
    eventName,
    date,
    time,
    venue,
  }) => {
    return `
    <div style="font-family: Arial; padding:20px;">
      <h2>🎉 Event Registration Successful</h2>
  
      <p>Hello <b>${name}</b>,</p>
  
      <p>You have successfully registered for:</p>
  
      <div style="
        border:1px solid #ddd;
        padding:15px;
        border-radius:10px;
        background:#f9f9f9;
      ">
        <h3>${eventName}</h3>
  
        <p><b>📅 Date:</b> ${date}</p>
        <p><b>⏰ Time:</b> ${time}</p>
        <p><b>📍 Venue:</b> ${venue}</p>
      </div>
  
      <p>
        Please use the attached QR image for attendance.
      </p>
  
      <br>
  
      <p>
        Regards,<br>
        <b>CSEA Event Management Team</b>
      </p>
    </div>
    `;
  };