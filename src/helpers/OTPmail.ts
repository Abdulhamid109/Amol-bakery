import User from '@/models/usermodal';
import nodemailer from 'nodemailer';
import { OTPGenerator } from './OTP_generator';

interface SendEmailParams {
  email: string; 
}

export const sendEmail = async ({email}: SendEmailParams) => {
  try {
    // Convert userid to string before hashing
    // const verificationToken = await bcrypt.hash(userid.toString(), 10);
    const OTP = OTPGenerator();
    const db = await User.findOne({email});
    console.log(OTP);
    db.forgotPasswordToken = OTP;
    await db.save();

    // Update the user depending on the email type
    // if (emailType === "RESET") {
    //   await User.findByIdAndUpdate(userid, {
    //     forgotPasswordToken: verificationToken,
    //     forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour expiration
    //   });
    // }

    // Configure nodemailer
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "870a46b658c123",
        pass: "8c0eb8d04caba1",
      },
    });

    // Define email options
    const mailOptions = {
      from: 'abdulhamidpatel109@gmail.com',
      to: email,
      subject: "Reset your password",
      html: `
        <title>Hello ${db.name},</title><br>
        <p>OTP verification for reseting the password</p>
        <br>
        <p>OTP:${OTP}</p>
      `,
    };

    // Send email
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;

  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email sending failed.");
  }
};
