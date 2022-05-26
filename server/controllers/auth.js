const bcrypt = require('bcryptjs')
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        const existing = bcrypt.compareSync(password,users[i].passwordHash)
        if (existing === true){
          let userReturn = {...users[i]}
          delete userReturn.passwordHash
          res.status(200).send(userReturn)
        }
        if (users[i].username === username && users[i].password === password) {
          res.status(200).send(users[i])
        }
      }

      res.status(400).send("User not found.")
      return
    },

    register: (req, res) => {
        console.log('Registering User')
        console.log(req.body)
        const {username, email, firstName, lastName, password} = req.body
        const salt = bcrypt.genSaltSync(5)
        const passwordHash = bcrypt.hashSync(password,salt)

        let userObj = {
          username,
          email,
          firstName,
          lastName,
          passwordHash
        }


        users.push(userObj)
        let passwordReturn = {...userObj}
        delete passwordReturn.passwordHash
        res.status(200).send(passwordReturn)
    }
}