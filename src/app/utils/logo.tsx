import nodemailer from "nodemailer";
import config from "../config";

const sendEmail = async () => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.NODE_ENV === "production" ? true : false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "rijwanjannat36@gmail.com",
      pass: "avdw rhan gfqo nmib",
    },
  });

  const mailOptions = {
    from: "rijwanjannat36@gmail.com", // sender address
    to: "mdrijwanjannat@gmail.com", // list of receivers
    subject: "Password Reset Request", // Subject line
    text: "You requested a password reset. Please use the link below to reset your password.", // plain text body
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              padding: 10px 0;
            }
            .content {
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              padding: 10px 0;
              color: #888888;
              font-size: 12px;
            }
            .logo {
              height: 4rem;
              display: flex;
              justify-content: center;
              align-items: center;
              text-align: center;
            }
            .logo img {
              margin-right: 10px;
              width: 1.5rem;
              border-radius: 50%;
              border: 2px solid #FFFFFF;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">
                <img src="https://i.ibb.co/TBtNvMX/letter-p.png" alt="PH University" />
                <img src="https://i.ibb.co/YZp5KR5/letter-h.png" alt="PH University" />
                <img src="https://i.ibb.co/Kj8LxC5/letter-u.png" alt="PH University" />
              </div>
              <h2>Password Reset Request</h2>
            </div>
            <div class="content">
              <p>Dear User, Reset your password within ten minutes</p>
              <p>You requested a password reset. Please use the button below to reset your password.</p>
              <p>
                <a 
                  href="https://example.com/reset-password" 
                  style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #ff4268; text-decoration: none; border-radius: 5px;"
                  onmouseover="this.style.backgroundColor='#b32e49';"
                  onmouseout="this.style.backgroundColor='#ff4268';"
                >
                  Reset Password
                </a>
              </p>
              <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
              <p>Thank you,</p>
              <p>Your Company Name</p>
            </div>
            <div class="footer">
              <p>&copy; 2024 Your Company Name. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const sEndEmail = sendEmail;
