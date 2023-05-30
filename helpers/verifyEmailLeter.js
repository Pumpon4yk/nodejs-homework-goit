const {BASE_URL} = process.env

const verifyEmailLeter = (name, verificationToken) => {
  return ` <h4>Dear "${name}",</h4>
  
  <p>Thank you for registering an account on our website. We are excited to have you as a new member of our community. To complete the registration process and ensure the security of your account, we kindly request that you verify your email address.</p>
  
  <p style=" margin-bottom: 20px;">Please click on the following link to confirm your email:</p>

  <a target="_blank" href="${BASE_URL}/api/auth/users/verify/${verificationToken}">Confirm Email</a> 
  
  <p style="margin-top: 20px;">By confirming your email, you will gain full access to all the features and benefits of our platform. This step also helps us maintain a safe and trustworthy environment for all our users.</p>
  
  <p>If you did not create an account on our website, please disregard this email. However, if you believe this email was sent to you in error, kindly reach out to our support team immediately for assistance.</p>
  
  <p>Thank you for choosing our platform. We look forward to serving you and providing a seamless experience.</p>
  
  <br>
  <p>Best regards,</p>
  <p>"Pumpon"</p>

`
}

module.exports = verifyEmailLeter;