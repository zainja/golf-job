const {hashPassword} = require('../authHelpers/passwordManagement')
const CLIENT_ORIGIN = "localhost:3000/"
module.exports = {

    confirm: (id) => ({
        subject: 'Confirm Email',
        html: `
        <a href='http://localhost:3000/confirm/${id}'>
            click to confirm email
        </a>
        
    `,
        text: `Copy and paste this link: ${CLIENT_ORIGIN}/confirm/${id}`
  })

}