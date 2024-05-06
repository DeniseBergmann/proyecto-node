const crypto = require("crypto")

const secret = crypto.randomBytes(32).toString("hex")

console.log(secret) //0ac76df0addc73fe822f2a1035dbd218167660cc15e235a55f3d580905361c74
