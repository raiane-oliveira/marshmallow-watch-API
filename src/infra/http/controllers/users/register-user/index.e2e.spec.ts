import { app } from "@/infra/app"
import { database } from "@/infra/database"
import request from "supertest"

describe("Register User [E2E]", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test("POST /users/register", async () => {
    await request(app.server)
      .post("/users/register")
      .send({
        name: "User 01",
        email: "user01@example.com",
        password: "123456",
      })
      .expect(201)

    const userDb = await database("users").first()

    expect(userDb).toEqual(
      expect.objectContaining({
        name: "User 01",
        email: "user01@example.com",
      })
    )
  })

  test("POST /users/register with duplicate email", async () => {
    await request(app.server)
      .post("/users/register")
      .send({
        name: "User 02",
        email: "user01@example.com",
        password: "123456",
      })
      .expect(409)

    const userDb = await database("users").select("*")

    expect(userDb).toHaveLength(1)
  })
})
