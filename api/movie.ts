import express from "express";
import { conn } from "../bdconnect";
import { Movies } from "../model/movie";
import mysql from "mysql";

export const router = express.Router();
  
  router.get("/", (req, res) => {
    conn.query('select * from movie', (err, result, fields)=>{
      res.json(result);
    });
  });

  router.post("/",(req,res)=>{
    let movie : Movies = req.body;
    let sql =  "INSERT INTO `movie`(`name`, `type`, `detail`, `photo`, `video`) VALUES (?,?,?,?,?)";
    sql = mysql.format(sql,[ 
      movie.name,
      movie.type,
      movie.photo,
      movie.detail,
      movie.video
    ]);
    conn.query(sql,(err,result)=>{
      if (err) throw err;
    res
      .status(201)
      .json({ affected_row: result.affectedRows, last_idx: result.insertId });
    });
  });

  router.delete("/:id", (req, res) => {
    let id = +req.params.id;
    conn.query("delete from movie where mid = ?", [id], (err, result) => {
       if (err) throw err;
       res
         .status(200)
         .json({ affected_row: result.affectedRows });
    });
  });
