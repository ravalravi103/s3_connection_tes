var aws =require('aws-sdk');
var express=require('express');
var multer=require('multer');
var multerS3=require('multer-s3');
var bodyParser=require('body-parser');
var aws=require('aws-sdk');
var app=express();

aws.config.update({
  region:'xxxxx'
});

var app=express(),
    s3=new aws.S3();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('views',__dirname+'/views');

app.set('view engine','ejs')

var upload=multer({
    storage:multerS3({
	 s3:s3,
	 bucket:'s3trialfirstnode',
	 key:function(req,file,cb){
	  console.log(file);
	  cb(null,file.originalname);
	 }
	})
});

app.get('/',function(req,res){
   res.render('index.ejs');
});

app.post('/upload',upload.array('upl',1),function(req,res,next){
   res.send('fille uploaded');
});

app.listen(3000,function(){
   console.log('app started');
});