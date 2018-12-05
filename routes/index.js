var express = require('express');
var router = express.Router();
const infomgr = require('infomgr')
const message = require('../node_modules/infomgr/lib/message');

// handle uncaughtExpection
const Layer = require('express/lib/router/layer');

Object.defineProperty(Layer.prototype, 'handle', {
  enumerable: true,
  get() {
    return this.__handle;
  },
  set(fn) {
    if (fn.length === 4) {
      this.__handle = fn;
    } else {
      this.__handle = (req, res, next) =>
        Promise.resolve(fn(req, res, next)).catch(next);
    }
  },
});

/* ADD INFO TO THE DATABASE */
router.post('/info/addInfo', async function (req, res) {
  let year = req.body.data.year,
      month = req.body.data.month,
      day = req.body.data.day, 
      source = req.body.data.source, 
      category = req.body.data.category, 
      subcategory = req.body.data.subcategory, 
      title = req.body.data.title, 
      subtitle = req.body.data.subtitle, 
      content = req.body.data.content, 
      remark = req.body.data.remark, 
      level = req.body.data.level;
  
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

router.post('/delete' ,async function(req, res){
  let id = req.body.data.remove_id;
  
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

router.post('/query', async function(){
  let id = req.body.data.id,
      source = req.body.data.source,
      category = req.body.data.category;


  let result,catch_err;
  try{
    result = infomgr.queryInfo(id, source, category);
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

router.post('/modify', async function(req, res){
  let id = req.body.data.modify_id,
      year = req.body.data.year,
      month = req.body.data.month,
      day = req.body.data.day, 
      source = req.body.data.source, 
      category = req.body.data.category, 
      subcategory = req.body.data.subcategory, 
      title = req.body.data.title, 
      subtitle = req.body.data.subtitle, 
      content = req.body.data.content, 
      remark = req.body.data.remark, 
      level = req.body.data.level;

  let result,catch_err;
  try{
    result = await infomgr.updateInfo(id, year, month, day, source, category, subcategory, title, subtitle, content, remark, level, option = {});
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

router.get('/alldata', async function(req, res){
  
  let result,catch_err;
  try{
    result = await infomgr.queryInfo();
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
})

router.get('/source/:source', async function(req, res){
  let source = decodeURI(req.params.source);

  let result, catch_err;
  try{
    result = await infomgr.find(source);
  }catch(err){
    catch_err = err;
  }

  if(result == "OK"){
    let senddata = {
      "message" : result
    };
    res.status(200).jsonp(senddata);
  }else if(catch_err.message == message.database_error){
    let err_message = {
      "message" : catch_err.message
    };
    res.status(422).jsonp(err_message);
  }
});

router.get('/category/:category', async function(req, res){
  let category = decodeURI(req.params.category);

  let result, catch_err;
  try{
    result = await infomgr.find(category);
  }catch(err){
    catch_err = err;
  }

  if(result == "OK"){
    let senddata = {
      "message" : result
    };
    res.status(200).jsonp(senddata);
  }else if(catch_err.message == message.database_error){
    let err_message = {
      "message" : catch_err.message
    };
    res.status(422).jsonp(err_message);
  } 
})

module.exports = router;
