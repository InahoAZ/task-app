import chai from "chai";
import chaiHttp from "chai-http";
import config from "../config/env/index.mjs";
import mongoose from "mongoose";

const expect = chai.expect;

chai.use(chaiHttp);
const url = `http://localhost:${config.default.port}/api`;

var mockObjectId = new mongoose.Types.ObjectId();

describe("Insert an user: ", () => {
    it("should insert an user", (done) => {
        chai.request(url)
            .post("/users")
            .send({
                _id: mockObjectId,
                username: "Marcin Jankowski",
                password: "Spear",
            })
            .end(function (err, res) {
                console.log(res.body);
                expect(res).to.have.status(200);
                done();
            });
    });
});

describe("Insert a user with format error: ", () => {
    it("should receive an validation error", (done) => {
        chai.request(url)
            .post("/users")
            .send({ _id: 1, username: 155, password:true })
            .end(function (err, res) {
                console.log(res.body);
                expect(res).to.have.status(400);
                done();
            });
    });
});
