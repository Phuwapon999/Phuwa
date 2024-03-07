import express from "express";
import { router as movie } from "./api/movie";
import { router as person } from "./api/person";
import { router as star } from "./api/stars";
import { router as creators } from "./api/creators";
import { router as selecttitle } from "./api/selectTitle";




import bodyParser from "body-parser";

export const app = express();

app.use(bodyParser.text());
app.use(bodyParser.json());
app.use("/movie",movie);
app.use("/person",person);
app.use("/star",star);
app.use("/creators",creators);
app.use("/selecttitle",selecttitle);
