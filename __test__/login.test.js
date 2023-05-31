const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const User = require("../models/user");
const { TEST_DB_HOST } = process.env;

const user = {
  email: "testJest@mail.com",
  password: "123456",
};

const responseLogin = async () => await request(app).post("/api/auth/users/login").send(user);

describe("User login", () => {
  beforeAll(async () => {
    await mongoose.connect(TEST_DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await request(app)
      .post("/api/auth/users/register")
      .send({ name: "testJest", ...user });
  });

  afterAll(async () => {
    await User.findOneAndRemove({ email: user.email });
    await mongoose.disconnect();
  });

  test("response stutus code 200", async () => {
    const res = await responseLogin();

    expect(res.status).toBe(200);
  });

  test("respons token is string", async () => {
    const res = await responseLogin();

    const { token } = res.body;

    expect(res.body.hasOwnProperty("token")).toBe(true);
    expect(typeof token).toBe("string");
  });

  test("respons obj user is valid", async () => {
    const res = await responseLogin();

    const { user: userRes } = res.body;

    expect(Object.getOwnPropertyNames(userRes)).toEqual([
      "email",
      "subscription",
    ]);
    expect(typeof userRes.email).toBe("string");
    expect(typeof userRes.subscription).toBe("string");
  });
});
