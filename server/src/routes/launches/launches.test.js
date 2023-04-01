const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("Test POST /launch", () => {
  const completeLaunchData = {
    mission: "ZTM315",
    rocket: "ZTM Experimental IS1",
    target: "Kepler-186 f",
    launchDate: "January 1, 2030",
  };
  const launchDataWithoutDate = {
    mission: "ZTM315",
    rocket: "ZTM Experimental IS1",
    target: "Kepler-186 f",
  };
  test("It should respond with 200 success", async () => {
    const response = await request(app)
      .post("/launches")
      .set("Content-type", "application/json")
      .send(completeLaunchData)
      .expect(201);

    requestDate = new Date(completeLaunchData.launchDate).valueOf();
    responseDate = new Date(response.body.launchDate).valueOf();

    expect(responseDate).toBe(requestDate);
    expect(response.body).toMatchObject(launchDataWithoutDate);
  });

  test("It should catch missing required properties", async () => {
    const body = launchDataWithoutDate;
    const response = await request(app)
      .post("/launches")
      .set("Content-type", "application/json")
      .send(body)
      .expect(400);
    expect(response.body.error).toBe("Missing required launch property");
  });
  test("It should catch invalid dates", async () => {
    const body = launchDataWithoutDate;
    body.launchDate = "Hello";
    const response = await request(app)
      .post("/launches")
      .set("Content-type", "application/json")
      .send(body)
      .expect(400);
    expect(response.body.error).toBe("Invalid launch date");
  });
});
