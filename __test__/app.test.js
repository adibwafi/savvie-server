const { server: app } = require("../app");
const io = require("socket.io-client");
const { io: server } = require("../app");

jest.setTimeout(20000);
describe("run socket", () => {
  server.attach(3005);
  let socket;
  let socketCustomer;

  beforeAll((done) => {
    socket = io("http://localhost:3005");
    socketCustomer = io("http://localhost:3005");

    socket.on("connect", function () {
      console.log("worked...");
      done();
    });
    socket.on("disconnect", function () {
      console.log("disconnected...");
    });
  });

  afterAll((done) => {
    socket.disconnect();
    socketCustomer.disconnect();
    server.close();
    done();
  });

  describe("Socket Routes Test", () => {
    test("Socket join-room", (done) => {
      socket.emit("join-room", 1);
      socket.on("success-join", (id) => {
        console.log("CALEED <---------");
        try {
          expect(id).toBe(1);
          done();
        } catch (error) {
          done(error);
        }
      });
    });

    test("Socket location", (done) => {
      const data = {
        id: 1,
        data: "lokasi",
      };

      socket.emit("join-room", data.id);
      socketCustomer.emit("join-room", data.id);

      socket.on("success-join", (id) => {
        socketCustomer.on("success-join", (id) => {
          socket.emit("location", data);

          console.log("HEREEE");
          socketCustomer.on("locationDriver", (result) => {
            try {
              expect(result).toEqual(data.data);
              done();
            } catch (error) {
              done(error);
            }
          });
        });
      });
    });
  });
});
