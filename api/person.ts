import express from "express";
import { conn } from "../bdconnect";
import mysql from "mysql";
import { Person } from "../model/person";

export const router = express.Router();
  
  router.get("/", (req, res) => {
    conn.query('select * from person', (err, result, fields)=>{
      res.json(result);
    });
  });

  router.post("/",(req,res)=>{
    let person : Person = req.body;
    let sql =  "INSERT INTO `person`(`name`, `birthday`, `detail`, `photo`, `video`) VALUES (?,?,?,?,?)";
    sql = mysql.format(sql,[ 
      person.name,
      person.birthday,
      person.photo,
      person.detail,
      person.video
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
    conn.query("delete from person where pid = ?", [id], (err, result) => {
       if (err) throw err;
       res
         .status(200)
         .json({ affected_row: result.affectedRows });
    });
  });