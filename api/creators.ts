import express from "express";
import { conn } from "../bdconnect";
import mysql from "mysql";
import { Creators } from "../model/creators";

export const router = express.Router();
  
  router.get("/", (req, res) => {
    conn.query('select * from creators', (err, result, fields)=>{
      res.json(result);
    });
  });

  router.post("/",(req,res)=>{
    let creator : Creators = req.body;
    let sql =  "INSERT INTO `creators`(`c_mid`, `c_pid`) VALUES (?,?)";
    sql = mysql.format(sql,[ 
        creator.c_mid,
        creator.c_pid
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
    conn.query("delete from creators where cid = ?", [id], (err, result) => {
       if (err) throw err;
       res
         .status(200)
         .json({ affected_row: result.affectedRows });
    });
  });
