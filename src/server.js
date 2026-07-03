const app = require("./app");
const config = require("./config/env");

app.listen(config.port, () => {
    console.log(`Study Point Bot Running On following port:${config.port}`)
})