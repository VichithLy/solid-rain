var request = require("request");

var base_url = "http://localhost:3000";

describe("Users form", function () {
  describe("GET /admin/players (get all players)", function () {
    it("should return status code 200", function (done) {
      request.get(
        base_url + "/admin/players",
        function (error, response, body) {
          expect(response.statusCode).toBe(200);
          done();
        }
      );
    });
    it("should return valid json", function (done) {
      request.get(
        base_url + "/admin/players",
        function (error, response, body) {
          expect(() => {
            JSON.parse(body);
          }).not.toThrow();
          done();
        }
      );
    });
  });

  describe("POST /admin/player (create new player)", function () {
    it("should return status code 201", function (done) {
      var user = { id: "test" };
      request(
        {
          url: base_url + "/admin/player",
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: user,
          json: true,
        },
        function (error, response, body) {
          expect(response.statusCode).toBe(201);
          done();
        }
      );
    });

    it("should return status code 409", function (done) {
      var user2 = { id: "test" };
      request(
        {
          url: base_url + "/admin/player",
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: user2,
          json: true,
        },
        function (error, response, body) {
          expect(response.statusCode).toBe(409);
          done();
        }
      );
    });
  });
});

describe("ZRR form", function () {
  describe("PUT /admin/zrr (update ZRR)", function () {
    it("should return status code 204", function (done) {
      var zrr = {
        point_a: [10, 15],
        point_b: [20, 35],
      };
      request(
        {
          url: base_url + "/admin/zrr",
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: zrr,
          json: true,
        },
        function (error, response, body) {
          expect(response.statusCode).toBe(204);
          done();
        }
      );
    });

    it("should return status code 400", function (done) {
      var zrr = {
        point_a: [],
        point_b: [],
      };
      request(
        {
          url: base_url + "/admin/zrr",
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: zrr,
          json: true,
        },
        function (error, response, body) {
          expect(response.statusCode).toBe(400);
          done();
        }
      );
    });
  });
});
describe("Start Game", function () {
  describe("POST /admin/start", function () {
    it("should return status code 204", function (done) {
      request.post(base_url + "/admin/start", function (error, response, body) {
        expect(response.statusCode).toBe(204);
        done();
      });
    });
  });
});

describe("TLL form", function () {
  describe("PUT /admin/ttl", function () {
    it("should return status code 204 ", function () {
      request(
        {
          url: base_url + "/admin/ttl",
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: {
            initalTTL: 100,
          },
          json: true,
        },
        function (error, response, body) {
          expect(response.statusCode).toBe(204);
        }
      );
    });
    it("should return status code 204 ", function () {
      request(
        {
          url: base_url + "/admin/ttl",
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: {
            initalTTL: null,
          },
          json: true,
        },
        function (error, response, body) {
          expect(response.statusCode).toBe(400);
        }
      );
    });
  });
});
describe("Meteorite form", function () {
  describe("POST /admin/meteorite", function () {
    it("should return status code 204", function () {
      request(
        {
          url: base_url + "/admin/meteorite",
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: {
            id: "meteorite5",
            impact: [1, 5],
            type: "Astra-X",
          },
          json: true,
        },
        function (error, response, body) {
          expect(response.statusCode).toBe(204);
        }
      );
    });
    it("should return status code 400 (impact missing) ", function () {
      request(
        {
          url: base_url + "/admin/meteorite",
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: {
            id: "meteorite5",
            impact: [],
            type: "Astra-X",
          },
          json: true,
        },
        function (error, response, body) {
          expect(response.statusCode).toBe(400);
        }
      );
    });
    it("should return status code 400 (type missing) ", function () {
      request(
        {
          url: base_url + "/admin/meteorite",
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: {
            id: "meteorite5",
            impact: [5, 9],
            type: "",
          },
          json: true,
        },
        function (error, response, body) {
          expect(response.statusCode).toBe(400);
        }
      );
    });
  });
});
