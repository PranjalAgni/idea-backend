// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv-safe").config({
  allowEmptyValues: true
});
import supertest from "supertest";
import initalizeApp from "../src/app";

let app: Express.Application | null = null;

beforeAll(async () => {
  app = await initalizeApp();
});

describe("Test the endpoints", () => {
  it("check the health endpoint", async () => {
    const request = supertest(app);
    const response = await request.get("/");
    expect(response.status).toBe(200);
  }, 30000);
});
