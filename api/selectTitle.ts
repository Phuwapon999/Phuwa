import express from "express";
import { conn } from "../bdconnect";
import { QueryOptions } from "mysql";

export const router = express.Router();
  
router.get("/searchmovie", async (req, res) => {
  try {
    const name = req.query.name + "%";
    
    const movieQuery = "SELECT * FROM movie WHERE name LIKE ?";
    const starsQuery = "SELECT *  FROM person JOIN stars ON person.pid = stars.s_pid WHERE stars.s_mid IN (SELECT mid FROM movie WHERE name LIKE ?)";
    const creatorsQuery = "SELECT * FROM person JOIN creators ON person.pid = creators.c_pid WHERE creators.c_mid IN (SELECT mid FROM movie WHERE name LIKE ?)";

    const movieResult = await queryAsync(movieQuery, [name]);
    const starsResult = await queryAsync(starsQuery, [name]);
    const creatorsResult = await queryAsync(creatorsQuery, [name]);

    res.json({ movie: movieResult, stars: starsResult, creators: creatorsResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

function queryAsync(sql: string | QueryOptions, values: string[]) {
  return new Promise((resolve, reject) => {
    conn.query(sql, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}


// router.get("/search", (req, res) => {
//   conn.query(
//     "SELECT * FROM stars INNER JOIN person ON person.pid = stars.s_pid WHERE (movie.name IS NULL OR movie.name LIKE ?)",
//     [req.query.name + "%"],
//     (err, result,) => {
//     if (err) throw err;
//       res.json(result);
//     }
//   );
// });



// router.get("/searchmovie", (req, res) => {
//   const name = req.query.name;

//   const query = `
//     SELECT movie.*, stars.*, creators.*, person.*
//     FROM movie
//     LEFT JOIN stars ON stars.s_mid = movie.mid
//     LEFT JOIN creators ON creators.c_mid = movie.mid
//     LEFT JOIN person ON stars.s_pid = person.pid
//     LEFT JOIN person AS person_creators ON creators.c_pid = person_creators.pid
//     WHERE movie.name LIKE ?
//   `;

//   conn.query(query, [name + "%"], (err, result) => {
//     if (err) {
//       console.error(err);
//       res.status(500).json({ error: "Internal server error" });
//       return;
//     }
//     res.json(result);
//   });
// });

