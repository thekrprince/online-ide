const express = require("express");
const cors = require("cors");
const Axios = require("axios");
const app = express();
const PORT = 9000;

app.use(cors());
app.use(express.json());

app.post("/compile", (req, res) => {
    let code = req.body.code;
    let language = req.body.language;
    let input = req.body.input;

    console.log("code:", code);
    console.log("language:", language);
    console.log("input:", input);

    let languageMap = {
        "javascript": { language: "javascript", id: "97" },
        "c": { language: "c", id: "75" },
        "cpp": { language: "c++", id: "15" },
        "python": { language: "python", id: "34" },
        "java": { language: "java", id: "26" },
    };

    if (!languageMap[language]) {
        return res.status(400).send({ error: "Unsupported language" });
    }

    let data = {
        "language_id": languageMap[language].id,
        "source_code": code,
        "stdin": input
    };

    let config = {
        method: 'post',
        url: 'https://ce.judge0.com/submissions?wait=true',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    Axios(config).then((response) => {
        res.json(response.data.stdout);
        console.log(response.data);
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ error: "Something went wrong" });
    });

});

app.listen(process.env.port || PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});