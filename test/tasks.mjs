import chai from "chai";
import chaiHttp from "chai-http";
import config from "../config/env/index.mjs";
import mongoose from "mongoose";
import Task from "../server/models/task.mjs";



const expect = chai.expect;

const url = `http://localhost:${config.default.port}/api`;

chai.use(chaiHttp);

describe("GET /api/tasks/", () => {
    it("should get all tasks", (done) => {
        chai.request(url)
        .get("/api/tasks/")
        .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                done();
            })
    });
});
