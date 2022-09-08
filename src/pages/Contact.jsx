import React from "react";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function Contact() {
  const a = true;

  return (
    <div className="Contact">
      <Zoom in={a}>
        <form action="https://formsubmit.co/linronj@gmail.com" method="POST">
          <h1>How can we help?</h1>
          <input type="text" name="name" placeholder="Your Name" required />
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            required
          />
          <input type="text" name="title" placeholder="Subject" required />
          <textarea
            rows="6"
            placeholder="Your Message"
            name="message"
            required
          />

          <Fab id="fab1" className="fab-but" type="submit" variant="extended">
            submit
          </Fab>
        </form>
      </Zoom>
    </div>
  );
}

export default Contact;
