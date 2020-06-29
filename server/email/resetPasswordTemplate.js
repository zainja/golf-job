const CLIENT_ORIGIN = "localhost:3000/"
module.exports = {

    reset: (id) => ({
        subject: 'Reset Password',
        html: `
        <p> Please go to the link to reset your password</p>
        <a href='http://localhost:3000/reset/${id}'>
            click to reset password
        </a>
        
    `,
        text: `Copy and paste this link: ${CLIENT_ORIGIN}/confirm/${id}`
  })

}