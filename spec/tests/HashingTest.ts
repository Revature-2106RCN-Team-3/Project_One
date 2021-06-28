import bcrypt from "bcrypt";

async function updatePassTest() {
    const saltRounds = 10;
    const password = "password123";
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      console.log(hash);
    });
  }

  updatePassTest();