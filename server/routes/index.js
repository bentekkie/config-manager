import { Router } from 'express';
import fs from 'fs'
import os from 'os'
import { join } from 'path';
var router = Router();

/* GET home page. */
router.route('/file')
      .get((req,res,next) => {
        let path = req.query.path
        if(path[0] !== "/")
          return next(new Error("Path must be absolute"))
        fs.readFile(path, 'utf8', function(err, contents) {
          if(err){
            return next(err)
          }
          res.send({
            path,
            contents})
        });
        
      })
      .post((req,res) => {
        console.log(req.body.file)
        res.status(200).send("recieved")
      })

router.route('/ls')
      .get((req,res,next) => {
        let path = req.query.path || os.homedir()
        console.log(path)
        fs.readdir(path,{withFileTypes:true},(err,items) => {
          if(err){
            return next(err)
          }
          res.send({
            path,
            files:items.map(item => {
            return {
              name:item,
              isDirectory:fs.statSync(join(path,item)).isDirectory()
            }
          })})
        })
      })
export default router;
