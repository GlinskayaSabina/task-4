const express = require("express");

const PORT = 5000;

const app = express();

app.listen(PORT, () => console.log(`Server starten on ${PORT}`));
