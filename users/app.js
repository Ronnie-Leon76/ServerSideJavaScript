const http = require("http");
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  const users = [];
  const usersList = users.map((user) => (
    <ul>
      <li>{user}</li>
    </ul>
  ));
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Welcome</title></head>");
    res.write(
      "<body><p>Hello there. Welcome to Server Side JavaScript</p><form action='/create-user' method='POST'><input name='username' type='text'><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/users") {
    res.write("<html>");
    res.write("<head><title>Nodejs Developers</title></head>");
    res.write("<body>");
    res.write(`${usersList}`);
    res.write("</html>");
    return res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const newUser = parsedBody.split("=")[1];
      users = [...users, newUser];
      res.statusCode = 302;
      res.setHeader("Location", "/users");
      return res.end();
    });
  }
});
server.listen(3000,"localhost")
