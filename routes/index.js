var express = require('express');
var router = express.Router();
const infomgr = require('infomgr')
const message = require('../node_modules/infomgr/lib/message');

/* ADD INFO TO THE DATABASE */
router.post('/info/addInfo', async function (req, res) {
  let year = req.body.year,
      month = req.body.month,
      day = req.body.day, 
      source = req.body.source, 
      category = req.body.category, 
      subcategory = req.body.subcategory, 
      title = req.body.title, 
      subtitle = req.body.subtitle, 
      content = req.body.content, 
      remark = req.body.remark, 
      level = req.body.level;
  
  let result,catch_err; 
  try{
    result = await infomgr.addInfo(year, month, day, source, category ,subcategory, title, subtitle, content, remark , level);
  }catch(err){
    catch_err = err;
  }

  if(result == "OK"){
    let senddata = {
      "message" : result
    }
    res.status(200).jsonp(senddata);
  }else if(catch_err.message == message.date_illegal){
    let err_message = {
      "message" : catch_err.message
    }
    res.status(422).jsonp(err_message);
  }
});

router.post('/info/deleteInfo' ,async function(req, res){
  let id = req.body.id;
  
  let result,catch_err;
  try{
    result = await infomgr.deleteInfoByid(id);
  }catch(err){
    catch_err = err;
  }

  if(result == "OK"){
    let senddata = {
      "message" : result
    }
    res.status(200).jsonp(senddata);
  }else if(catch_err.message == message.database_error){
    let err_message = {
      "message" : catch_err.message
    }
    res.status(422).jsonp(err_message);
  }
});

router.post('/info/queryInfo', async function(){
  let id = req.body.id;

  let result,catch_err;
  try{
    result = infomgr.queryInfo(id);
  }catch(err){
    catch_err = err;
  }

  if(result == "OK"){
    let senddata = {
      "message" : result
    }
    res.status(200).jsonp(senddata);
  }else if(catch_err.message == message.database_error){
    let err_message = {
      "message" : catch_err.message
    }
    res.status(422).jsonp(err_message);  
  }
});

router.post('/info/updataInfo', async function(req, res){
  let query_json = req.body.query_json;
  let update_json =req.body.update_json;
  let option = req.body.option;

  let result,catch_err;
  try{
    result = await infomgr.updateInfo(query_json, update_json, option);
  }catch(err){
    catch_err = err;
  }

  if(result == "OK"){
    let senddata = {
      "message" : result
    }
    res.status(200).jsonp(senddata);
  }else if(catch_err.message == message.database_error){
    let err_message = {
      "message" : catch_err.message
    }
    res.status(422).jsonp(err_message);  
  }
});

module.exports = router;
