const zod = require("zod")

const signup = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
})

const signin = zod.object({
  username: zod.string(),
  password: zod.string()
})

const updateUser = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional()
})

const transfer = zod.object({
  to: zod.string(),
  amount: zod.number()
})

module.exports = {
  signup,
  signin,
  updateUser,
  transfer
}
