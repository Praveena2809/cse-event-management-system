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
  export const coordinatorApprovalTemplate = ({
    name,
  }) => {
    return `
    <div style="font-family: Arial; padding:20px;">
      <h2>✅ Coordinator Application Approved</h2>
  
      <p>Hello <b>${name}</b>,</p>
  
      <p>
        Congratulations! Your application to become a
        <b>Coordinator</b> has been approved by the HOD.
      </p>
  
      <div style="
        border:1px solid #ddd;
        padding:15px;
        border-radius:10px;
        background:#f9f9f9;
      ">
        <p>
          You can now access the
          <b>Coordinator Dashboard</b>
          using your existing login credentials.
        </p>
      </div>
  
      <br/>
  
      <p>
        Regards,<br/>
        <b>CSEA Event Management Team</b>
      </p>
    </div>
    `;
  };
  
  export const coordinatorRejectionTemplate = ({
    name,
    reason,
  }) => {
    return `
    <div style="font-family: Arial; padding:20px;">
      <h2>❌ Coordinator Application Rejected</h2>
  
      <p>Hello <b>${name}</b>,</p>
  
      <p>
        Your Coordinator application has been reviewed
        by the HOD and was not approved.
      </p>
  
      <div style="
        border:1px solid #ddd;
        padding:15px;
        border-radius:10px;
        background:#fff3f3;
      ">
        <p>
          <b>Reason:</b> ${reason}
        </p>
      </div>
  
      <p>
        You may improve your profile and apply again later.
      </p>
  
      <br/>
  
      <p>
        Regards,<br/>
        <b>CSEA Event Management Team</b>
      </p>
    </div>
    `;
  };
  export const eventApprovalTemplate = ({
    coordinatorName,
    eventName,
    eventType,
    date,
    venue,
  }) => {
    return `
    <div style="font-family: Arial; padding:20px;">
      <h2>✅ Event Proposal Approved</h2>
  
      <p>Hello <b>${coordinatorName}</b>,</p>
  
      <p>
        Your event proposal has been
        <b>approved by the HOD</b>.
      </p>
  
      <div style="
        border:1px solid #ddd;
        padding:15px;
        border-radius:10px;
        background:#f9f9f9;
      ">
        <h3>${eventName}</h3>
  
        <p>
          <b>Type:</b> ${eventType}
        </p>
  
        <p>
          <b>Date:</b> ${date}
        </p>
  
        <p>
          <b>Venue:</b> ${venue}
        </p>
      </div>
  
      <br/>
  
      <p>
        You may now begin managing registrations
        and participants for the event.
      </p>
  
      <br/>
  
      <p>
        Regards,<br/>
        <b>CSEA Event Management Team</b>
      </p>
    </div>
    `;
  };
  
  export const eventRejectionTemplate = ({
    coordinatorName,
    eventName,
    reason,
  }) => {
    return `
    <div style="font-family: Arial; padding:20px;">
      <h2>❌ Event Proposal Rejected</h2>
  
      <p>Hello <b>${coordinatorName}</b>,</p>
  
      <p>
        Your event proposal for
        <b>${eventName}</b>
        was not approved by the HOD.
      </p>
  
      <div style="
        border:1px solid #ddd;
        padding:15px;
        border-radius:10px;
        background:#fff3f3;
      ">
        <p>
          <b>Reason:</b> ${reason}
        </p>
      </div>
  
      <br/>
  
      <p>
        Please review the feedback and
        resubmit if necessary.
      </p>
  
      <br/>
  
      <p>
        Regards,<br/>
        <b>CSEA Event Management Team</b>
      </p>
    </div>
    `;
  };