import express from "express";
import { conn } from "../bdconnect";
import mysql from "mysql";
import { Stars } from "../model/stars";

export const router = express.Router();
  
  router.get("/", (req, res) => {
    conn.query('select * from stars', (err, result, fields)=>{
      res.json(result);
    });
  });

  router.post("/",(req,res)=>{
    let star : Stars = req.body;
    let sql =  "INSERT INTO `stars`(`s_mid`, `s_pid`) VALUES (?,?)";
    sql = mysql.format(sql,[ 
        star.s_mid,
        star.s_pid
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
    conn.query("delete from stars where sid = ?", [id], (err, result) => {
       if (err) throw err;
       res
         .status(200)
         .json({ affected_row: result.affectedRows });
    });
  });
