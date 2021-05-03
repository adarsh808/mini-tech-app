const axios = require("axios").create({
  headers: {
    "Content-Type": "application/json"
  },
});

export default axios;
