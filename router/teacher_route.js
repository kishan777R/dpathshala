const express = require('express');
const http = require('http');
const https = require('https');
const qs = require('querystring');
const fs = require('fs')


const router = express.Router();
const teacher = require('../model/teacher');

const teacher_course = require('../model/teacher_course');
const Course = require('../model/course');
const teacher_Topics = require('../model/teacher_topic');
const teacher_Videos = require('../model/teacher_video');
const Orders = require('../model/orders');
const Videos = require('../model/video');

const Topics = require('../model/topic');


var nodemailer = require('nodemailer');

const logopath='http://lessons.co.in/images/logo.png';
const allconst = require('./contants');

created_by_admin = 1;

const adminemail= 'kishanrock777@gmail.com';

const myemail = "kishanrock777@gmail.com";
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: myemail,
    pass: 'abcdefghijk987654321'
  }
});
const multipart = require('connect-multiparty');


const multipartMiddleware_course = multipart({
  uploadDir: './public/uploads/course'
});

const multipartMiddleware_video = multipart({
  uploadDir: './public/uploads/video'
});
const server_version_app = allconst.server_version_app;

const serverpath = allconst.serverpath;
const appname = "DPATHSHALA";
mwUnique = {
  prevTimeId: 0,
  prevUniqueId: 0,
  getUniqueID: function () {
    try {
      var d = new Date();
      var newUniqueId = d.getTime();
      if (newUniqueId == mwUnique.prevTimeId)
        mwUnique.prevUniqueId = mwUnique.prevUniqueId + 1;
      else {
        mwUnique.prevTimeId = newUniqueId;
        mwUnique.prevUniqueId = 0;
      }
      newUniqueId = newUniqueId + '' + mwUnique.prevUniqueId;
      return newUniqueId;
    }
    catch (e) {
      console.log('mwUnique.getUniqueID error:' + e.message + '.');
    }
  }
};

var request = require("request");


function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return (true)
  }

  return (false)
}

function Pincodenumber(inputtxt) {
  var phoneno = /^\d{10}$/;
  if ((inputtxt.match(phoneno))) {
    return true;
  }
  else {

    return false;
  }
}
function phonenumber(inputtxt) {
  var phoneno = /^\d{10}$/;
  if ((inputtxt.match(phoneno))) {
    return true;
  }
  else {

    return false;
  }
}
function sendEmailAfterRegistration(newteacherObject) {
  var mailOptions = {
    from: myemail,
    to: newteacherObject.email,
    subject: "Welcome to " + appname + " || Email verification !!",
    html: ' Dear ' + newteacherObject.first_name + ' ' + newteacherObject.last_name + ' <p> Your Email verification code is ' + newteacherObject.verificationcode + '. </p><br/><br/><br/><b>Team '+appname+'</b><br/><br/>' + "<img src="+logopath+">"
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}


function passwordvalidation(inputtxt) {
  //https://www.w3resource.com/javascript/form/password-validation.php
  //To check a password between 7 to 16 characters which contain only characters, numeric digits, underscore and first character must be a letter
  var passw = /^[A-Za-z]\w{7,14}$/;
  if (inputtxt.match(passw)) {

    return true;
  }
  else {

    return false;
  }
}


///TEACHER Video ///////////////////////////////////////////////////
router.get('/teacherVideoDetailbyid/:_id', (req, res, next) => {

  var _id = req.params._id;

  teacher_Videos.findOne({ "_id": _id }, function (err, teachervideodetail) {
    res.json(teachervideodetail);

  }).sort({ "_id": -1 });

});
router.get('/getTeacherVideoById/:table_id_for_query', (req, res, next) => {

  var table_id_for_query = +req.params.table_id_for_query;

  teacher_Videos.find({ "created_by": table_id_for_query, "tablestatus": 'TRUE' }, function (err, Teacher_v) {
    res.json(Teacher_v);

  }).sort({ "_id": -1 });

});


router.get('/teacherlecturedelete/:id/:table_id_for_query', (req, res, next) => {



  var deleted_by = req.params.table_id_for_query;
  teacher_Videos.updateOne({ '_id': req.params.id }, { $set: { 'tablestatus': 'FALSE', 'deleted_by': deleted_by, 'deleted_on': new Date() } }, (err, v) => {
    if (err) {
      res.json({ message: "Something is wrong", status: "ERROR" });
    } else {
      res.json({ message: "Lecture Deleted Successfully !!", status: "SUCCESS" });

    }
  });




});



router.post('/uploadfileAPI_for_lecture_module_teacher', multipartMiddleware_video, (req, res, next) => {
  var originalpathoffile = req.files.profile.path;
  var filetype = req.files.profile.type;
  var uploadingwhat = req.body.uploadingwhat;
  console.log(uploadingwhat);
  var isallok = false;
  if (uploadingwhat == "video" && (req.files.profile.type == 'video/mp4')) {
    isallok = true;
  } else if (uploadingwhat == "image" && (req.files.profile.type == 'image/png' || req.files.profile.type == 'image/jpeg' || req.files.profile.type == 'image/jpg' || req.files.profile.type == 'image/PNG' || req.files.profile.type == 'image/JPG' || req.files.profile.type == 'image/JPEG')) {
    isallok = true;
  } else if (uploadingwhat == "pdf" && (req.files.profile.type == 'application/pdf')) {
    isallok = true;
  } else if (uploadingwhat == "support") {
    var n = req.files.profile.type.includes('video');
    if (n) {
      isallok = false;

    } else {
      isallok = true;
    }
  }



  if (isallok) {
    var video_image_path = req.files.profile.path.replace("\\", "/");
    var video_image_path = video_image_path.replace("\\", "/");
    var video_image_path = video_image_path.replace("\\", "/");
    var video_image_path = video_image_path.replace("public/", "");


    res.json({ message: "File uploaded succesfully !!", status: "success", filePath: serverpath + '' + video_image_path, serverpath: serverpath, video_image_path: video_image_path, filetype: filetype });



  } else {
    try {
      fs.unlinkSync(originalpathoffile)
      res.json({
        'message': 'Upload correct file format !! Your file format is ' + req.files.profile.type,
        'status': 'error', filePath: ''

      });
    } catch (err) {
      res.json({
        'message': 'Upload correct file format !! Your file format is ' + req.files.profile.type + ".",
        'status': 'error', filePath: ''

      });
    }
  }


});

router.post('/savevideoofteacher', (req, res, next) => {

  var created_by = +req.body.created_by;

  teacher_Videos.find({ $and: [{ "sub_course_id": req.body.sub_course_id }, { "created_by": req.body.created_by }, { "title": req.body.title }, { "tablestatus": "TRUE" }] }, function (err, Videolist) {
    if (Videolist.length > 0) {
      res.json({ message: "Title Already Exists !!", status: "ERROR", newvideo: {} });

    } else {


      let newVideoOBJ = new teacher_Videos({
        title: req.body.title,
        details: req.body.details,
        course_id: req.body.course_id,
        sub_course_id: req.body.sub_course_id,
        videopath: req.body.videopath,

        pdfpath: req.body.pdfpath,
        supportpath: req.body.supportpath,
        supportfiletype: req.body.supportfiletype,

        original_video_id: "",
        topic_id: req.body.topic_id,
        topic_name: req.body.topic_name,
        imagepath: req.body.imagepath,
        serverpath: serverpath,
        active_status: 'Publish',
        videoduration: req.body.videoduration,
        videodurationHMS: req.body.videodurationHMS,

        adding_date: new Date(),
        created_on: new Date(),
        created_by: created_by,
        tablestatus: 'TRUE',
        video_review_status: "PENDING"
      });
      newVideoOBJ.save((err, newvideo) => {
        if (err) {
          res.json({ message: "Something is wrong " + err, status: "ERROR", newvideo: {} });
        } else {


          var mailOptions = {
            from: myemail,
            to: 'kishanrock777@gmail.com',
            subject: "New Lecture from Teacher is waiting for approval !!",
            html: ' <p> Please Approve Pending Lecture from teacher</p> '
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              res.json({ message: "Lecture Added Successfully !!", status: "SUCCESS", newvideo: newvideo });
            } else {
              res.json({ message: "Lecture Added Successfully !!", status: "SUCCESS", newvideo: newvideo });
            }
          });

        }
      });
    }
  });

});

router.post('/savevideoofteacherupdate', (req, res, next) => {
  var created_by = +req.body.created_by;

  teacher_Videos.find({ $and: [{ "_id": { $ne: req.body._id } }, { "sub_course_id": req.body.sub_course_id }, { "created_by": req.body.created_by }, { "title": req.body.title }, { "tablestatus": "TRUE" }] }, function (err, Videolist) {
    if (Videolist.length > 0) {
      res.json({ message: "Title Already Exists !!", status: "ERROR", newvideo: {} });

    } else {


      let updateVideoOBJ = {
        title: req.body.title,
        details: req.body.details,
        course_id: req.body.course_id,

        sub_course_id: req.body.sub_course_id,
        videopath: req.body.videopath,

        pdfpath: req.body.pdfpath,
        supportpath: req.body.supportpath,
        supportfiletype: req.body.supportfiletype,


        topic_id: req.body.topic_id,
        topic_name: req.body.topic_name,
        imagepath: req.body.imagepath,
        serverpath: serverpath,
        active_status: 'Publish',
        videoduration: req.body.videoduration,
        videodurationHMS: req.body.videodurationHMS,


        updated_on: new Date(),
        updated_by: created_by,
        tablestatus: 'TRUE',
        video_review_status: "PENDING"
      };
      teacher_Videos.updateOne({ '_id': req.body._id }, { $set: updateVideoOBJ }, (er1r, vide) => {
        if (er1r) {
          res.json({ message: "Something is wrong in updated video table " + er1r, status: "ERROR" });
        } else {

          var mailOptions = {
            from: myemail,
            to: adminemail,
            subject: "New Lecture from Teacher is waiting for approval !!",
            html: ' <p> Please Approve Pending Lecture from teacher</p> '
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              res.json({ message: "Lecture Updated Successfully !!", status: "SUCCESS" });
            } else {
              res.json({ message: "Lecture Updated Successfully !!", status: "SUCCESS" });
            }
          });
        }
      });
    }
  });

});


//admin

router.post('/updateLectureStatus', (req, res, next) => {
  var action = req.body.action;

  var reason = req.body.reason;
  var videoobj = req.body.videoobj;
  var courseobj = req.body.courseobj;
  teacher_Videos.updateOne({ '_id': videoobj._id }, { $set: { "rejection_reason": reason, "video_review_status": action } }, (err, teacherCourseUpdated) => {
    if (err) {
      res.json({ message: "Something is wrong!", status: "ERROR" });
    } else {
      if (action == "APPROVED" && courseobj.course_publish_status == 'PUBLISHED' && videoobj.original_video_id != '') {
        //   UPDATE video DETAILS IN MAIN video,  video list me se topic name bhi change karna h ,kya pta topic chage kiya ho


        ///  pahle ye check kro k jo new topic change kiya h video me vo pahle se main topic me h ya nahi...agar nahi h to use aadd karo.. fir uski original id niche topic id me use karo 
        // jab main video me update kar rahe h...agar pahle se hi h to direct oritnal topic id nikal k use karlo
        teacher_Topics.findOne({ $and: [{ "tablestatus": "TRUE" }, { "_id": videoobj.topic_id }] }, function (err, TopicOne) {
          if (TopicOne) {
            if (TopicOne.original_topic_id != '') {
              let orifibaltopicidforvideoupdateObj = TopicOne.original_topic_id;

              //   make object for update in main video  ************  COMMON 1
              var updateobjinmainvideo = {

                "title": videoobj.title,
                "details": videoobj.details,
                "course_id": videoobj.course_id,
                "sub_course_id": videoobj.sub_course_id,

                "topic_id": orifibaltopicidforvideoupdateObj,
                "topic_name": videoobj.topic_name,
                "videopath": videoobj.videopath,

                "pdfpath": videoobj.pdfpath,
                "supportpath": videoobj.supportpath,

                "supportfiletype": videoobj.supportfiletype,
                "videoduration": videoobj.videoduration,
                "videodurationHMS": videoobj.videodurationHMS,
                "imagepath": videoobj.imagepath,
                "serverpath": videoobj.serverpath,
                "active_status": videoobj.active_status,
                "tablestatus": "TRUE",


              };
              Videos.updateOne({ '_id': videoobj.original_video_id }, { $set: updateobjinmainvideo }, (er1r, vide) => {
                if (er1r) {
                  res.json({ message: "Lecture " + action + " Successfully ! but error in pushing video in main stream", status: "SUCCESS" });

                } else {
                  res.json({ message: "Lecture " + action + " Successfully !", status: "SUCCESS" });


                }
              });
              //make object for update in main video end  ************  COMMON  1 END
            } else {
              let objForMianTopicSave = {
                "course_id": TopicOne.course_id,
                "sub_course_id": TopicOne.sub_course_id,
                "topic_name": TopicOne.topic_name,
                "adding_date": new Date(),
                "created_on": new Date(),
                "created_by": created_by_admin,
                "tablestatus": "TRUE",
                "created_by_name": "TEACHER"
              };


              let newTopicOBJ = new Topics(objForMianTopicSave);
              newTopicOBJ.save((err, newtopic) => {
                if (err) {
                  res.json({ message: "Lecture " + action + " Successfully but there is error in updating main topic table !", status: "SUCCESS" });
                } else {
                  let orifibaltopicidforvideoupdateObj = newtopic._id;



                  //   make object for update in main video  ************  COMMON 1
                  var updateobjinmainvideo = {

                    "title": videoobj.title,
                    "details": videoobj.details,
                    "course_id": videoobj.course_id,
                    "sub_course_id": videoobj.sub_course_id,

                    "topic_id": orifibaltopicidforvideoupdateObj,
                    "topic_name": videoobj.topic_name,
                    "videopath": videoobj.videopath,

                    "pdfpath": videoobj.pdfpath,
                    "supportpath": videoobj.supportpath,

                    "supportfiletype": videoobj.supportfiletype,
                    "videoduration": videoobj.videoduration,
                    "videodurationHMS": videoobj.videodurationHMS,
                    "imagepath": videoobj.imagepath,
                    "serverpath": videoobj.serverpath,
                    "active_status": videoobj.active_status,
                    "tablestatus": "TRUE",


                  };
                  Videos.updateOne({ '_id': videoobj.original_video_id }, { $set: updateobjinmainvideo }, (er1r, vide) => {
                    if (er1r) {
                      res.json({ message: "Lecture " + action + " Successfully ! but error in pushing video in main stream", status: "SUCCESS" });

                    } else {

                      teacher_Topics.updateOne({ '_id': videoobj.topic_id }, { $set: { "original_topic_id": orifibaltopicidforvideoupdateObj } }, (er1r, vide) => {
                        if (er1r) {
                          res.json({ message: "Lecture " + action + " Successfully ! but error in pushing video in main stream", status: "SUCCESS" });

                        } else {
                          sendEmailToteacherAboutLectureStatusUpdate(res,courseobj.created_by,videoobj.title,action,reason);

                        }
                      });
                     


                    }
                  });
                  //make object for update in main video end  ************  COMMON  1 END

                }
              });


            }
          } else {

            res.json({ message: "Lecture " + action + " Successfully but Something is wrong.. topic does not exists !", status: "SUCCESS" });

            console.log("Something is wrong.. topic does not exists");

          }
        });



      } else {
       

        sendEmailToteacherAboutLectureStatusUpdate(res,courseobj.created_by,videoobj.title,action,reason);
      }


    }
  });
});

function sendEmailToteacherAboutLectureStatusUpdate(res, teacher_id_to_send_email, lecture_name,action,reason) {



  teacher.findOne({ $and: [{ "table_id_for_query": teacher_id_to_send_email }] }, function (err, Teacher) {
    if (Teacher) {
      if(action=='PENDING'){
        var html= ' Dear ' + Teacher.first_name + ' ' + Teacher.last_name + ' <p>Status of your Lecture '+lecture_name+' has been changed to PENDING ! </p><br/><br/><br/><b>Team '+appname+'</b><br/><br/>' +   "<img src="+logopath+">"
        ;
      }else   if(action=='APPROVED'){
        var html=   ' Dear ' + Teacher.first_name + ' ' + Teacher.last_name + ' <p> New Lecture '+lecture_name+' added by you has been approved ! </p><br/><br/><br/><b>Team '+appname+'</b><br/><br/>' + "<img src="+logopath+">"
        ;
      }else   if(action=='REJECTED'){
        var html=   ' Dear ' + Teacher.first_name + ' ' + Teacher.last_name + ' <p> New Lecture '+lecture_name+' added by you has been rejected because of the following reason-<br/><br/><b>'+reason+' </b></p><br/><br/><br/><b>Team '+appname+'</b><br/><br/>'+ "<img src="+logopath+">"
        ;
      }


     
      var mailOptions = {
        from: myemail,
        to: Teacher.email,
        subject:   appname + " | "+lecture_name+' has been '+action+' !',
        html:  html
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.json({ message: "Lecture " + action + " Successfully !", status: "SUCCESS" });
        } else {
          res.json({ message: "Lecture " + action + " Successfully !", status: "SUCCESS" });
        }
      });

    } else {
      res.json({ message: "Something is wrong. teacher not found", status: "ERROR" });
    }


  });

 

}
router.get('/getLectureListTeacher/:limitInOneTime/:skipDocument/:totalRecord/:lecturestatus', (req, res, next) => {

  var lecturestatus = req.params.lecturestatus;

  var limitInOneTime = +req.params.limitInOneTime;
  var skipDocument = +req.params.skipDocument;
  var totalRecord = +req.params.totalRecord;
  var count = +req.params.totalRecord;
  let searchArr = [];
  if (lecturestatus == 'ALL') {

  } else if (lecturestatus == 'pendingforapproval') {
    searchArr.push({ "video_review_status": { '$regex': 'PENDING', '$options': 'i' } });
  } else if (lecturestatus == 'approved') {
    searchArr.push({ "video_review_status": { '$regex': 'APPROVED', '$options': 'i' } });
  } else if (lecturestatus == 'rejected') {
    searchArr.push({ "video_review_status": { '$regex': 'REJECTED', '$options': 'i' } });
  }



  searchArr.push({ "tablestatus": 'TRUE' });
  if (totalRecord == 0) {


    teacher_Videos.countDocuments({ $and: searchArr }, function (err, count) {
      //

      teacher_Videos.find({ $and: searchArr }, function (err, lectureList) {
        res.json({ "lectureList": lectureList, "totalRecord": count });

      }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);

      //
    }).count();


  } else {

    teacher_Videos.find({ $and: searchArr }, function (err, lectureList) {

      res.json({ "lectureList": lectureList, "totalRecord": count });


    }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);
  }
});

router.post('/searchLectureTeacher', (req, res, next) => {

  var lecturestatus = req.body.lecturestatus;
  var limitInOneTime = +req.body.limitInOneTime;
  var skipDocument = +req.body.skipDocument;
  var totalRecord = +req.body.totalRecord;
  var count = +req.body.totalRecord;
  let searchArr = [];

  if (lecturestatus == 'ALL') {

  } else if (lecturestatus == 'pendingforapproval') {
    searchArr.push({ "video_review_status": { '$regex': 'PENDING', '$options': 'i' } });
  } else if (lecturestatus == 'approved') {
    searchArr.push({ "video_review_status": { '$regex': 'APPROVED', '$options': 'i' } });
  } else if (lecturestatus == 'rejected') {
    searchArr.push({ "video_review_status": { '$regex': 'REJECTED', '$options': 'i' } });
  }



  if (req.body.title) {
    searchArr.push({ "title": { '$regex': req.body.title.trim(), '$options': 'i' } });
  }
  if (req.body.created_by) {
    searchArr.push({ "created_by": + req.body.created_by });
  }
  if (req.body.sub_course_id) {
    searchArr.push({ "sub_course_id": req.body.sub_course_id });
  }
  if (req.body.topic_id) {
    searchArr.push({ "topic_id": req.body.topic_id });
  }
  if (req.body.from_reg_date) {
    searchArr.push({ adding_date: { $gte: covertGivenDateWithTime(req.body.from_reg_date) } });
  }
  if (req.body.to_reg_date) {
    searchArr.push({ adding_date: { $lte: covertGivenDateWithTimeMax(req.body.to_reg_date) } });
  }


  searchArr.push({ "tablestatus": 'TRUE' });

  if (totalRecord == 0) {


    teacher_Videos.countDocuments({ $and: searchArr }, function (err, count) {
      //
      teacher_Videos.find({ $and: searchArr }, function (err, lectureList) {



        res.json({ "lectureList": lectureList, "totalRecord": count });




      }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);

      //
    }).count();

  } else {

    teacher_Videos.find({ $and: searchArr }, function (err, lectureList) {
      res.json({ "lectureList": lectureList, "totalRecord": count });

    }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);
  }


});



// admin end


///TEACHER Video end ///////////////////////////////////////////////////

///TEACHER topic ///////////////////////////////////////////////////

router.get('/getTeacherTopicById/:table_id_for_query', (req, res, next) => {

  var table_id_for_query = +req.params.table_id_for_query;

  teacher_Topics.find({ "created_by": table_id_for_query, "tablestatus": 'TRUE' }, function (err, Teacher_topic) {
    res.json(Teacher_topic);

  }).sort({ "_id": -1 });

});

router.get('/getTopicListByTeacher', (req, res, next) => {


  teacher_Topics.find({ "tablestatus": 'TRUE' }, function (err, Teacher_topic) {
    res.json(Teacher_topic);

  }).sort({ "_id": -1 });

});


router.get('/teachertopicbyid/:id', (req, res, next) => {
  teacher_Topics.findOne({ $and: [{ "tablestatus": "TRUE" }, { "_id": req.params.id }] }, function (err, TopicOne) {
    res.json(TopicOne);
  });
});

router.post('/teachertopic', (req, res, next) => {

  var created_by = +req.body.created_by;
  teacher_Topics.find({ $and: [{ "sub_course_id": req.body.sub_course_id }, { "created_by": created_by }, { "topic_name": req.body.topic_name }, { "tablestatus": "TRUE" }] }, function (err, tlist) {
    if (tlist.length > 0) {
      res.json({ message: "Topic Already Exists !!", status: "ERROR", newtopic: {} });

    } else {


      let newTopicOBJ = new teacher_Topics({

        sub_course_id: req.body.sub_course_id,
        original_topic_id: "",


        topic_name: req.body.topic_name,

        adding_date: new Date(),
        created_on: new Date(),
        created_by: created_by,
        tablestatus: 'TRUE'
      });
      newTopicOBJ.save((err, newtopic) => {
        if (err) {
          res.json({ message: "Something is wrong " + err, status: "ERROR", newtopic: {} });
        } else {
          res.json({ message: "Topic Added Successfully !!", status: "SUCCESS", newtopic: newtopic });

        }
      });
    }
  });

});


router.post('/teachertopicupdate', (req, res, next) => {

  var created_by = +req.body.created_by;
  teacher_Topics.find({ $and: [{ "sub_course_id": req.body.sub_course_id }, { "created_by": created_by }, { "topic_name": req.body.topic_name }, { "tablestatus": "TRUE" }, { "_id": { $ne: req.body._id } }] }, function (err, Videolist) {
    if (Videolist.length > 0) {
      res.json({ message: "Topic Already Exists !!", status: "ERROR" });

    } else {


      let updatedobj = {


        sub_course_id: req.body.sub_course_id,


        topic_name: req.body.topic_name,

        'updated_by': created_by,
        'updated_on': new Date()
      };
      teacher_Topics.updateOne({ '_id': req.body._id }, { $set: updatedobj }, (err, topic) => {
        if (err) {
          res.json({ message: "Something is wrong " + err, status: "ERROR" });
        } else {



          let updatedobj_topicrelatedthingsAlsoInVideoTable = {

            course_id: req.body.course_id,
            sub_course_id: req.body.sub_course_id,
            video_review_status: 'PENDING',

            topic_name: req.body.topic_name,

          };
          teacher_Videos.updateMany({ 'topic_id': req.body._id }, { $set: updatedobj_topicrelatedthingsAlsoInVideoTable }, (er1r, vide) => {
            if (er1r) {
              res.json({ message: "Something is wrong in updated lecture table " + er1r, status: "ERROR" });
            } else {
              res.json({ message: "Topic Updated Successfully !!", status: "SUCCESS" });

            }
          });



        }
      });
    }
  });

});



router.get('/teachertopicdelete/:id/:table_id_for_query', (req, res, next) => {



  var deleted_by = req.params.table_id_for_query;
  teacher_Videos.find({ "tablestatus": "TRUE", "topic_id": req.params.id }, function (err, Videolist) {

    if (Videolist.length > 0) {
      res.json({ message: "First  delete lecture under this topic ", status: "ERROR" });
    } else {
      teacher_Topics.updateOne({ '_id': req.params.id }, { $set: { 'tablestatus': 'FALSE', 'deleted_by': deleted_by, 'deleted_on': new Date() } }, (err, v) => {
        if (err) {
          res.json({ message: "Something is wrong", status: "ERROR" });
        } else {
          res.json({ message: "Topic Deleted Successfully !!", status: "SUCCESS" });

        }
      });
    }

  });





});


/////////////////////// TEACHER topic end//////////////////////////////////////////

///TEACHER COURSE///////////////////////////////////////////////////



router.get('/sendRequestToPublish/:_id', (req, res, next) => {
  var _id = req.params._id;

  teacher_Videos.find({ "sub_course_id": _id, "tablestatus": 'TRUE' }, function (err, Teacher_v) {
    if (Teacher_v.length > 0) {
      var pendingv = 0;
      for (var f = 0; f < Teacher_v.length; f++) {
        if (Teacher_v[f].video_review_status !== 'APPROVED') {
          pendingv++;
        }
      }
      if (pendingv > 0) {
        res.json({ message: "Your " + pendingv + " lectures are under review or rejected. Before their approval you can not request to publish this course !", status: "ERROR" });
      } else {
        teacher_course.updateOne({ '_id': _id }, { $set: { "course_publish_status": 'SUBMITTED' } }, (err, teacherUpdated) => {
          if (err) {
            res.json({ message: "Something is wrong!", status: "ERROR" });
          } else {
            var mailOptions = {
              from: myemail,
              to: adminemail,
              subject: "New Request For Course Publish from Teacher is waiting for approval !!",
              html: ' <p> Please Publish Pending Courses from teacher</p> '
            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                res.json({ message: "Request Sent Successfully !!", status: "SUCCESS" });
              } else {
                res.json({ message: "Request Sent Successfully !!", status: "SUCCESS" });
              }
            });

          }
        });
      }
    } else {
      res.json({ message: "You have not uploaded lectures in this course. Please upload lectures before request to publish !", status: "ERROR" });
    }
  }).sort({ "_id": -1 });







});



router.post('/uploadfileAPI_for_course_module_teacher', multipartMiddleware_course, (req, res, next) => {
  var originalpathoffile = req.files.profile.path;


  if (((req.files.profile.type == 'image/png' || req.files.profile.type == 'image/jpeg' || req.files.profile.type == 'image/jpg' || req.files.profile.type == 'image/PNG' || req.files.profile.type == 'image/JPG' || req.files.profile.type == 'image/JPEG'))) {

    var imagepath = req.files.profile.path.replace("\\", "/");
    var imagepath = imagepath.replace("\\", "/");
    var imagepath = imagepath.replace("\\", "/");
    var imagepath = imagepath.replace("public/", "");
    res.send({ "status": 'success', "message": "file uploaded successfully!", "imagepath": imagepath });




  } else {
    try {
      fs.unlinkSync(originalpathoffile)
      res.json({
        'message': 'Upload correct file format !! Your file format is ' + req.files.profile.type,
        'status': 'error', filePath: ''

      });
    } catch (err) {
      res.json({
        'message': 'Upload correct file format !! Your file format is ' + req.files.profile.type + ".",
        'status': 'error', filePath: ''

      });
    }
  }

});


router.get('/getTeacherCoursesById/:table_id_for_query', (req, res, next) => {

  var table_id_for_query = +req.params.table_id_for_query;

  teacher_course.find({ "created_by": table_id_for_query, "tablestatus": 'TRUE' }, function (err, Teacher_course) {
    //order_of_this_course

    var corseIdArr = [];
    for (var t = 0; t < Teacher_course.length; t++) {
      if (Teacher_course[t].original_course_id && Teacher_course[t].original_course_id != '') {


        corseIdArr.push(Teacher_course[t].original_course_id);
      }
    }
    if (corseIdArr.length > 0) {
      var searchArr = [];

      searchArr.push({ "order_status": 'SUCCESS' });
      searchArr.push({ "sub_course_id": { $in: corseIdArr } });
      Orders.find({ $and: searchArr }, function (err, orderList) {


        if (orderList.length > 0) {

          for (let c = 0; c < orderList.length; c++) {
            if (orderList[c].bank_array[0].TXNID != 'ADMINPURCHASE') {
              totalSaleAmount = totalSaleAmount + orderList[c].paid_amount;
              c_id_intArr.push(orderList[c].c_id_int);
              totalOrder = totalOrder + 1;
            }

          }


          for (var t = 0; t < Teacher_course.length; t++) {
            if (Teacher_course[t].original_course_id && Teacher_course[t].original_course_id != '') {
              for (let c = 0; c < orderList.length; c++) {
                if (orderList[c].bank_array[0].TXNID != 'ADMINPURCHASE') {
                  if (orderList[c].sub_course_id == Teacher_course[t].original_course_id) {
                    Teacher_course[t].order_count_of_this_course++;
                    Teacher_course[t].order_amount_of_this_course = Teacher_course[t].order_amount_of_this_course + orderList[c].paid_amount;
                  }

                }
              }

            }


          }
        }
        else {
          res.json(Teacher_course);
        }




      });

    } else {
      res.json(Teacher_course);
    }


  }).sort({ "_id": -1 });

});
router.get('/deleteteacherCourse/:_id', (req, res, next) => {

  var _id = req.params._id;

  teacher_course.updateOne({ '_id': _id }, { $set: { "tablestatus": 'FALSE' } }, (err, teacherUpdated) => {
    if (err) {
      res.json({ message: "Something is wrong!", status: "ERROR" });
    } else {

      res.json({ message: "  Course Deleted Successfully !!", status: "SUCCESS" });
    }
  });

});


router.get('/getCourseDetailsOfTeacher/:_id', (req, res, next) => {

  var _id = req.params._id;

  teacher_course.findOne({ "_id": _id }, function (err, Teacher_course) {
    res.json(Teacher_course);

  });

});
router.post('/savecourseofteacher', (req, res, next) => {

  var course_name = req.body.course_name;
  var created_by = req.body.created_by;

  var amount = +req.body.amount;

  var imagepath = req.body.imagepath;
  var duration = +req.body.duration;

  var instructor = req.body.instructor;
  var is_self_paced = req.body.is_self_paced;
  var course_review_status = req.body.course_review_status;
  var _id = req.body._id;
  var describeArr = req.body.describeArr;
  console.log(req.body);


  teacher_course.findOne({ $and: [{ "course_name": course_name.trim() }, { "tablestatus": "TRUE" }] }, function (err, TeacherC) {
    if (TeacherC) {
      if (TeacherC._id != _id) {
        res.json({ message: "Course Name already exists. Please try other name !", status: "WARNING", error_reason: 'course_name' });
        return false;
      }

    }
    var validation = true;






    //course_name
    if (!course_name || course_name == undefined || course_name == '') {
      validation = false;
      res.json({ message: "Course name is required !", status: "WARNING", error_reason: 'course_name' });
      return false;
    }

    //course_name end

    //duration
    if (!duration || duration == undefined || duration == '') {
      validation = false;
      res.json({ message: "Course Duration is required !", status: "WARNING", error_reason: 'duration' });
      return false;
    } else {

      if (!Number.isInteger(duration)) {

        validation = false;
        res.json({ message: "Course Duration should be a integer number and greater than 0 !", status: "WARNING", error_reason: 'duration' });
        return false;
      }
      else if (duration < 1) {

        validation = false;
        res.json({ message: "Course Duration should be a integer number and greater than 0 !", status: "WARNING", error_reason: 'duration' });
        return false;
      }
    }

    // duration end


    //is_self_paced
    if (is_self_paced == null) {
      validation = false;
      res.json({ message: "Please select is it a  self paced course or not !", status: "WARNING", error_reason: 'is_self_paced' });
      return false;
    }

    //is_self_paced end

    //amount
    if (!amount || amount == undefined || amount == '') {
      validation = false;
      res.json({ message: "Course Fee is required !", status: "WARNING", error_reason: 'amount' });
      return false;
    } else {

      if (isNaN(amount)) {
        validation = false;
        res.json({ message: "Course Fee must be a number", status: "WARNING", error_reason: 'amount' });
        return false;
      }
    }

    //amount end

    //amount
    if (!imagepath || imagepath == undefined || imagepath == '') {
      validation = false;
      res.json({ message: "Thumbnail Image is required !", status: "WARNING", error_reason: 'image' });
      return false;
    }

    //amount end

    if (validation) {
      var cobj = {
        course_name: course_name,
        adding_date: new Date(),

        created_on: new Date(),
        created_by: created_by,
        describeArr: describeArr,
        parent_course: req.body.parent_course,
        amount: amount,

        imagepath: imagepath,
        backgroundimagepath: '',
        yourcourse_imagepath: imagepath,
        instructor: instructor,

        serverpath: serverpath,
        duration: duration,
        duration_type: 'Day',
        is_self_paced: is_self_paced,

        course_review_status: 'PENDING',
        updated_by: 0,
        updated_on: '',
        deleted_by: 0,
        deleted_on: "",
        tablestatus: 'TRUE'
      };
      if (_id !== 0) {
        teacher_course.updateOne({ '_id': _id }, { $set: cobj }, (err, teacherUpdated) => {
          if (err) {
            res.json({ message: "Something is wrong!", status: "ERROR" });
          } else {
            var mailOptions = {
              from: myemail,
              to: adminemail,
              subject: "New Course from Teacher is waiting for approval !!",
              html: ' <p> Please Approve Pending Courses from teacher</p> '
            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                res.json({ message: "  Course Updated Successfully !!", status: "SUCCESS" });
              } else {
                res.json({ message: "  Course Updated Successfully !!", status: "SUCCESS" });
              }
            });

          }
        });
      } else {
        let newCourse = new teacher_course(cobj);
        newCourse.save((err, newcourse) => {
          if (err) {
            res.json({ message: "Something is wrong" + err, status: "ERROR", newcourse: {} });
          } else {

            var mailOptions = {
              from: myemail,
            to: adminemail,
              subject: "New Course from Teacher is waiting for approval !!",
              html: ' <p> Please Approve Pending Courses from teacher</p> '
            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                res.json({ message: "  Course Added Successfully !!", status: "SUCCESS", course_id: newcourse._id });
              } else {
                res.json({ message: "  Course Added Successfully !!", status: "SUCCESS", course_id: newcourse._id });
              }
            });





          }
        });
      }

    }


  });


});
//admin
router.post('/updateCousrsepublishStatus', (req, res, next) => {
  var action = req.body.action;
  var reason = req.body.reason;
  var courseobj = req.body.courseobj;

  teacher_course.updateOne({ '_id': courseobj._id }, { $set: { "course_publish_status": action } }, (err, teacherCourseUpdated) => {
    if (err) {
      res.json({ message: "Something is wrong!", status: "ERROR" });
    } else {
      // TO DO... UPDATE COUSE DETAILS IN MAIN COURSE AND LECTURES DETAIL IN MAIN LECTURES AND TOPICS IN MAIN TOPICS



      Course.findOne({ $and: [{ "tablestatus": "TRUE" }, { "parent_course": { $ne: "0" } }] }, function (err, CourselistForInt) {
        if (CourselistForInt) {


          var course_int = CourselistForInt['course_int'] + 1;
        } else {
          var course_int = 0;

        }
        var cardArr = ["video"];
        var describeArr = [];
        if (courseobj.describeArr) {

          var describeArr = [];
          var perHeadingObj = { "headingvalue": courseobj.course_name + " with " + courseobj.instructor, "accordian": false, "checkbox": "", "card": false, "showingpoint": false, pointsArr: [{ "pointvalue": "4", "pointvalueArr": ["4"], "ischip": true, "iconApply": 'star' }, { "pointvalue": "975", "pointvalueArr": ["975"], "ischip": true, "iconApply": 'person' }, { "pointvalue": "Self Paced", "pointvalueArr": ["Self", "Paced"], "ischip": true, "iconApply": 'time' }] };
          describeArr.push(perHeadingObj);
          for (var d = 0; d < courseobj.describeArr.length; d++) {
            describeArr.push(courseobj.describeArr[d]);
          }
        }


        let newCourse = new Course({

          course_name: courseobj.course_name,
          adding_date: new Date(),
          course_int: course_int,
          created_on: new Date(),
          created_by: created_by_admin,
          describeArr: describeArr,
          parent_course: courseobj.parent_course,
          amount: courseobj.amount, rating: 4.5,
          showbackground: false,
          imagepath: courseobj.imagepath,
          yourcourse_imagepath: courseobj.yourcourse_imagepath,
          backgroundimagepath: courseobj.backgroundimagepath,
          instructor: courseobj.instructor,
          cardArr: cardArr,
          serverpath: courseobj.serverpath,
          duration: courseobj.duration,
          duration_type: courseobj.duration_type,
          is_self_paced: courseobj.is_self_paced,

          subjectcode: 'TODO',
          "subjectstatus": 'TRUE',
          "certificate_type": 'After_Course_Completion',

          updated_by: 0,
          updated_on: '',
          deleted_by: 0,
          deleted_on: "",
          tablestatus: 'TRUE',
          created_by_name: 'TEACHER'
        });
        newCourse.save((err, course) => {
          if (err) {
            res.json({ message: "Published Successfully, but some error in save course to main  stream course  !" + err, status: "SUCCESS" });
          } else {
            teacher_course.updateOne({ '_id': courseobj._id }, { $set: { "original_course_id": course._id } }, (err, teacherCourseUpdated) => {
              if (err) {
                res.json({ message: "Published Successfully, but Something is wrong when updating orginal course id!", status: "SUCCESS" });
              } else {


                performInsertTopic(course._id, courseobj.parent_course, courseobj._id, res);



              }
            });

          }
        });

      }).sort({ course_int: -1 });




    }
  });
});

function performInsertTopic(sub_course_id, course_id, teacher_sub_course_id, res) {
  teacher_Topics.findOne({ $and: [{ "tablestatus": "TRUE" }, { "original_topic_id": '' }, { "sub_course_id": teacher_sub_course_id }] }, function (err, TeacherTopicOne) {
    if (TeacherTopicOne) {


      let newTopicOBJ = new Topics({
        course_id: course_id,
        sub_course_id: sub_course_id,


        topic_name: TeacherTopicOne.topic_name,

        adding_date: new Date(),
        created_on: new Date(),
        created_by: created_by_admin,
        tablestatus: 'TRUE',
        created_by_name: "TEACHER"
      });

      console.log("Indise topic");
      newTopicOBJ.save((err, topicOr) => {
        if (err) {
          res.json({ message: "Published Successfully, but some error in save topic to main  stream topic  !" + err, status: "SUCCESS" });
        } else {
          teacher_Topics.updateOne({ '_id': TeacherTopicOne._id }, { $set: { "original_topic_id": topicOr._id } }, (err, TeachertopicUpdated) => {
            if (err) {
              res.json({ message: "Published Successfully, but Something is wrong when updating orginal topic id in teacher topic id!", status: "SUCCESS" });
            } else {

              teacher_Topics.findOne({ $and: [{ "tablestatus": "TRUE" }, { "original_topic_id": '' }, { "sub_course_id": sub_course_id }] }, function (err, TeacherTopicOne_2) {
                if (TeacherTopicOne_2) {
                  console.log("Topic recursive");

                  performInsertTopic(sub_course_id, course_id, teacher_sub_course_id, res);
                } else {
                  console.log("calling lecture");

                  performInsertLectureAction(sub_course_id, course_id, teacher_sub_course_id, res);
                }
              });



            }
          });

        }
      });


    } else {
      console.log("calling lecture below");

      performInsertLectureAction(sub_course_id, course_id, teacher_sub_course_id, res);
    }

  });
}
function performInsertLectureAction(sub_course_id, course_id, teacher_sub_course_id, res) {
  teacher_Videos.findOne({ $and: [{ "tablestatus": "TRUE" }, { "original_video_id": '' }, { "sub_course_id": teacher_sub_course_id }] }, function (err, TeacherVideoOne) {
    if (TeacherVideoOne) {



      console.log("insode lecture");


      //


      teacher_Topics.findOne({ $and: [{ "tablestatus": "TRUE" }, { "_id": TeacherVideoOne.topic_id }] }, function (err, TopicOne) {

        let orifibaltopicidforvideoupdateObj = TopicOne.original_topic_id;

        var teacher_id_to_send_email = TopicOne.created_by;




        let newVideoOBJ = new Videos({

          "title": TeacherVideoOne.title,
          "details": TeacherVideoOne.details,
          "course_id": TeacherVideoOne.course_id,
          "sub_course_id": sub_course_id,

          "topic_id": orifibaltopicidforvideoupdateObj,
          "topic_name": TeacherVideoOne.topic_name,
          "adding_date": new Date(),
          "videopath": TeacherVideoOne.videopath,

          "pdfpath": TeacherVideoOne.pdfpath,
          "supportpath": TeacherVideoOne.supportpath,

          "supportfiletype": TeacherVideoOne.supportfiletype,
          "videoduration": TeacherVideoOne.videoduration,
          "videodurationHMS": TeacherVideoOne.videodurationHMS,
          "imagepath": TeacherVideoOne.imagepath,
          "serverpath": TeacherVideoOne.serverpath,
          "active_status": TeacherVideoOne.active_status,
          "tablestatus": "TRUE",
          "created_by_name": "TEACHER",
          "created_by": created_by_admin,
          "created_on": new Date(),


        });
        newVideoOBJ.save((err, videocOr) => {
          if (err) {
            res.json({ message: "Published Successfully, but some error in save lecture to main  stream lecture  !" + err, status: "SUCCESS" });
          } else {
            teacher_Videos.updateOne({ '_id': TeacherVideoOne._id }, { $set: { "original_video_id": videocOr._id } }, (err, TeacherVideoUpdated) => {
              if (err) {
                res.json({ message: "Published Successfully, but Something is wrong when updating original_video_id in teacher video id!", status: "SUCCESS" });
              } else {

                teacher_Videos.findOne({ $and: [{ "tablestatus": "TRUE" }, { "original_video_id": '' }, { "sub_course_id": sub_course_id }] }, function (err, TeacherVideoOne_2) {
                  if (TeacherVideoOne_2) {
                    console.log("lecture recursive");

                    performInsertLectureAction(sub_course_id, course_id, teacher_sub_course_id, res);
                  } else {

                    // here
                    sendEmailToteacherAboutPublish(res, teacher_id_to_send_email, sub_course_id);
                  }
                });



              }
            });

          }
        });
      });
      //

    } else {



      sendEmailToteacherAboutPublish(res, teacher_id_to_send_email, sub_course_id);

    }

  });
}

function sendEmailToteacherAboutPublish(res, teacher_id_to_send_email, sub_course_id) {



  teacher.findOne({ $and: [{ "table_id_for_query": teacher_id_to_send_email }] }, function (err, Teacher) {
    if (Teacher) {


      Course.findOne({ $and: [{ "_id": sub_course_id }] }, function (err, CourseForEmail) {
        if (CourseForEmail) {


          var mailOptions = {
            from: myemail,
            to: Teacher.email,
            subject:   appname + " | "+CourseForEmail.course_name+' has been published !',
            html: ' Dear ' + Teacher.first_name + ' ' + Teacher.last_name + ' <p> Your request to publish course '+CourseForEmail.course_name+' has been approved ! </p><br/><br/><br/><b>Team '+appname+'</b><br/><br/>' + "<img src="+logopath+">"
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              res.json({ message: "Published Successfully.....  ", status: "SUCCESS" });
            } else {
              res.json({ message: "Published Successfully.....  ", status: "SUCCESS" });
            }
          });


        } else {

          res.json({ message: "Something is wrong. Course not found", status: "ERROR" });
        }





      });




    } else {
      res.json({ message: "Something is wrong. teacher not found", status: "ERROR" });
    }


  });

 

}
router.post('/updateCousrseStatus', (req, res, next) => {
  var action = req.body.action;

  var reason = req.body.reason;
  var courseobj = req.body.courseobj;
  teacher_course.updateOne({ '_id': courseobj._id }, { $set: { "rejection_reason": reason, "course_review_status": action } }, (err, teacherCourseUpdated) => {
    if (err) {
      res.json({ message: "Something is wrong!", status: "ERROR" });
    } else {
      if (action == "APPROVED" && courseobj.course_publish_status == 'PUBLISHED') {
         

        //   make update object for main stram course
        var describeArr = [];
        if (courseobj.describeArr) {

          var describeArr = [];
          var perHeadingObj = { "headingvalue": courseobj.course_name + " with " + courseobj.instructor, "accordian": false, "checkbox": "", "card": false, "showingpoint": false, pointsArr: [{ "pointvalue": "4", "pointvalueArr": ["4"], "ischip": true, "iconApply": 'star' }, { "pointvalue": "975", "pointvalueArr": ["975"], "ischip": true, "iconApply": 'person' }, { "pointvalue": "Self Paced", "pointvalueArr": ["Self", "Paced"], "ischip": true, "iconApply": 'time' }] };
          describeArr.push(perHeadingObj);
          for (var d = 0; d < courseobj.describeArr.length; d++) {
            describeArr.push(courseobj.describeArr[d]);
          }
        }
        var updateobjinmainCourse = {

          "course_name": courseobj.course_name,
          "imagepath": courseobj.imagepath,
          "yourcourse_imagepath": courseobj.yourcourse_imagepath,
          "backgroundimagepath": courseobj.backgroundimagepath,
          "serverpath": courseobj.serverpath,
          "parent_course": courseobj.parent_course,
          "subjectstatus": 'TRUE',
          "certificate_type": 'After_Course_Completion',
          "amount": courseobj.amount,
          "duration": courseobj.duration,
          "duration_type": courseobj.duration_type,
          "is_self_paced": courseobj.is_self_paced,
          "describeArr": describeArr,

          "updated_on": new Date(),
          "updated_by": created_by_admin,






        };
        Course.updateOne({ '_id': courseobj.original_course_id }, { $set: updateobjinmainCourse }, (er1r, vide) => {
          if (er1r) {
            res.json({ message: "Status Updated Successfully but error in updating main stream course !", status: "SUCCESS" });
          } else {
         
            sendEmailToteacherAboutCourseStatusUpdate(res, courseobj.created_by, courseobj.course_name,action,reason);
          }
        });
        //   make update object for main stram course end

      } else {
        sendEmailToteacherAboutCourseStatusUpdate(res, courseobj.created_by, courseobj.course_name,action,reason);
      }


    }
  });
});

function sendEmailToteacherAboutCourseStatusUpdate(res, teacher_id_to_send_email, course_name,action,reason) {



  teacher.findOne({ $and: [{ "table_id_for_query": teacher_id_to_send_email }] }, function (err, Teacher) {
    if (Teacher) {
      if(action=='PENDING'){
        var html= ' Dear ' + Teacher.first_name + ' ' + Teacher.last_name + ' <p>Status of your course '+course_name+' has been changed to PENDING ! </p><br/><br/><br/><b>Team '+appname+'</b><br/><br/>' + "<img src="+logopath+">"
        ;
      }else   if(action=='APPROVED'){
        var html=   ' Dear ' + Teacher.first_name + ' ' + Teacher.last_name + ' <p> New course '+course_name+' added by you has been approved ! </p><br/><br/><br/><b>Team '+appname+'</b><br/><br/>'+ "<img src="+logopath+">"
        ;
      }else   if(action=='REJECTED'){
        var html=   ' Dear ' + Teacher.first_name + ' ' + Teacher.last_name + ' <p> New course '+course_name+' added by you has been rejected because of the following reason-<br/><br/><b>'+reason+' </b></p><br/><br/><br/><b>Team '+appname+'</b><br/><br/>' + "<img src="+logopath+">"
        ;
      }


     
      var mailOptions = {
        from: myemail,
        to: Teacher.email,
        subject:   appname + " | "+course_name+' has been '+action+' !',
        html:  html
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.json({ message: "Status Updated Successfully !", status: "SUCCESS" });
        } else {
          res.json({ message: "Status Updated Successfully !", status: "SUCCESS" });
        }
      });




    } else {
      res.json({ message: "Something is wrong. teacher not found", status: "ERROR" });
    }


  });

 

}
router.get('/getCourseListTeacher/:limitInOneTime/:skipDocument/:totalRecord/:coursestatus', (req, res, next) => {

  var coursestatus = req.params.coursestatus;

  var limitInOneTime = +req.params.limitInOneTime;
  var skipDocument = +req.params.skipDocument;
  var totalRecord = +req.params.totalRecord;
  var count = +req.params.totalRecord;
  let searchArr = [];
  if (coursestatus == 'ALL') {

  } else if (coursestatus == 'pendingforapproval') {
    searchArr.push({ "course_review_status": { '$regex': 'PENDING', '$options': 'i' } });
  } else if (coursestatus == 'approved') {
    searchArr.push({ "course_review_status": { '$regex': 'APPROVED', '$options': 'i' } });
  } else if (coursestatus == 'pendingforpublish') {
    searchArr.push({ "course_publish_status": { '$regex': 'SUBMITTED', '$options': 'i' } });
  } else if (coursestatus == 'published') {
    searchArr.push({ "course_publish_status": { '$regex': 'PUBLISHED', '$options': 'i' } });
  } else if (coursestatus == 'rejected') {
    searchArr.push({ "course_review_status": { '$regex': 'REJECTED', '$options': 'i' } });
  }



  searchArr.push({ "tablestatus": 'TRUE' });
  if (totalRecord == 0) {


    teacher_course.countDocuments({ $and: searchArr }, function (err, count) {
      //

      teacher_course.find({ $and: searchArr }, function (err, teacher_courselistSearched) {
        res.json({ "courseList": teacher_courselistSearched, "totalRecord": count });

      }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);

      //
    }).count();


  } else {

    teacher_course.find({ $and: searchArr }, function (err, teacher_courselistSearched) {

      res.json({ "courseList": teacher_courselistSearched, "totalRecord": count });


    }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);
  }
});

router.post('/searchCoursesTeacher', (req, res, next) => {

  var coursestatus = req.body.coursestatus;
  var limitInOneTime = +req.body.limitInOneTime;
  var skipDocument = +req.body.skipDocument;
  var totalRecord = +req.body.totalRecord;
  var count = +req.body.totalRecord;
  let searchArr = [];
  if (coursestatus == 'ALL') {

  } else if (coursestatus == 'pendingforapproval') {
    searchArr.push({ "course_review_status": { '$regex': 'PENDING', '$options': 'i' } });
  } else if (coursestatus == 'rejected') {
    searchArr.push({ "course_review_status": { '$regex': 'REJECTED', '$options': 'i' } });
  } else if (coursestatus == 'approved') {
    searchArr.push({ "course_review_status": { '$regex': 'APPROVED', '$options': 'i' } });
  } else if (coursestatus == 'pendingforpublish') {
    searchArr.push({ "course_publish_status": { '$regex': 'SUBMITTED', '$options': 'i' } });
  } else if (coursestatus == 'published') {
    searchArr.push({ "course_publish_status": { '$regex': 'PUBLISHED', '$options': 'i' } });
  }
  if (req.body.course_name) {
    searchArr.push({ "course_name": { '$regex': req.body.course_name.trim(), '$options': 'i' } });
  }
  if (req.body.created_by) {
    searchArr.push({ "created_by": + req.body.created_by });
  }

  if (req.body.from_reg_date) {
    searchArr.push({ adding_date: { $gte: covertGivenDateWithTime(req.body.from_reg_date) } });
  }
  if (req.body.to_reg_date) {
    searchArr.push({ adding_date: { $lte: covertGivenDateWithTimeMax(req.body.to_reg_date) } });
  }


  searchArr.push({ "tablestatus": 'TRUE' });

  if (totalRecord == 0) {


    teacher_course.countDocuments({ $and: searchArr }, function (err, count) {
      //
      teacher_course.find({ $and: searchArr }, function (err, teacher_courselistSearched) {



        res.json({ "courseList": teacher_courselistSearched, "totalRecord": count });




      }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);

      //
    }).count();

  } else {

    teacher_course.find({ $and: searchArr }, function (err, teacher_courselistSearched) {
      res.json({ "courseList": teacher_courselistSearched, "totalRecord": count });

    }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);
  }


});



// admin end
///TEACHER COURSE end///////////////////////////////////////////////////



///TEACHER///////////////////////////////////////////////////


router.get('/getTeacherDetailsById/:table_id_for_query', (req, res, next) => {

  var table_id_for_query = +req.params.table_id_for_query;

  teacher.findOne({ "table_id_for_query": table_id_for_query }, function (err, Teacher) {
    res.json(Teacher);

  });

});
router.post('/match_verification_code', (req, res, next) => {
  teacher.findOne({ $and: [{ "verificationcode": req.body.verificationcode }, { "table_id_for_query": req.body.table_id_for_query }, { "tablestatus": "TRUE" }] }, function (err, Teacher) {
    if (Teacher) {

      teacher.updateOne({ 'table_id_for_query': req.body.table_id_for_query }, { $set: { "email_verification": true } }, (err, teacherUpdated) => {
        if (err) {
          res.json({ message: "Something is wrong!", status: "ERROR" });
        } else {


          res.json({ message: "Email Id Verified Successfully !", status: "SUCCESS" });
        }
      });




    } else {
      res.json({ message: "Verification Code is wrong !", status: "WARNING", error_reason: 'verificationcode' });
    }


  });
});


router.post('/teacher_update_password', (req, res, next) => {
  teacher.findOne({ $and: [{ "table_id_for_query": req.body.table_id_for_query }, { "tablestatus": "TRUE" }] }, function (err, Teacher) {
    if (Teacher) {
      var validation = true;
      if (!req.body.old_password || req.body.old_password == undefined || req.body.old_password == '') {
        validation = false;
        res.json({ message: "Old Password is required !", status: "WARNING", error_reason: 'old_password' });
      }



      //password
      if (!req.body.new_password || req.body.new_password == undefined || req.body.new_password == '') {
        validation = false;
        res.json({ message: "Password is required !", status: "WARNING", error_reason: 'new_password' });
      } else {

        if (!passwordvalidation(req.body.new_password)) {
          validation = false;
          res.json({ message: "Password is not valid ! Password must be between 7 to 16 characters which contain only characters, numeric digits, underscore and first character must be a letter", status: "WARNING", error_reason: 'new_password' });
        }
      }

      //password end

      //c_password
      if (!req.body.c_password || req.body.c_password == undefined || req.body.c_password == '') {
        validation = false;
        res.json({ message: "Confirm Password is required !", status: "WARNING", error_reason: 'c_password' });
      } else {

        if (!passwordvalidation(req.body.c_password)) {
          validation = false;
          res.json({ message: "Confirm Password is not valid ! Password must be between 7 to 16 characters which contain only characters, numeric digits, underscore and first character must be a letter", status: "WARNING", error_reason: 'c_password' });
        }
      }

      //c_password end

      if (validation) {


        if (Teacher.password == req.body.old_password.trim()) {
          if (req.body.new_password.trim() == req.body.c_password.trim()) {
            teacher.updateOne({ 'table_id_for_query': req.body.table_id_for_query }, { $set: { "password": req.body.new_password } }, (err, teacherUpdated) => {
              if (err) {
                res.json({ message: "Something is wrong!", status: "ERROR" });
              } else {


                res.json({ message: "Password updated Successfully !!", status: "SUCCESS" });
              }
            });
          } else {
            res.json({ message: "Please Confirm password  !", status: "WARNING" });
          }

        } else {
          res.json({ message: "Old password is not correct !", status: "WARNING" });
        }
      }
      else {
        res.json({ message: "Something is wrong in validation !", status: "ERROR" });
      }



    } else {
      res.json({ message: "Something is wrong!", status: "ERROR" });
    }
  });
});

router.post('/teacher_forget_password', (req, res, next) => {
  teacher.findOne({ $and: [{ "email": req.body.email.trim() }, { "tablestatus": "TRUE" }] }, function (err, newteacherObject) {
    if (newteacherObject) {

      var mailOptions = {
        from: myemail,
        to: newteacherObject.email,
        subject: "Forget password " + appname + "  !!",
        html: ' Dear ' + newteacherObject.first_name + ' ' + newteacherObject.last_name + ' <p> Your Password to login in ' + appname + ' is ' + newteacherObject.password + '. </p><br/><br/><br/><b>Team '+appname+'</b><br/><br/>'+ "<img src="+logopath+">"
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.json({ message: "Something is wrong in sending email !", status: "ERROR" });
        } else {
          res.json({ message: "Password has been sent successfully to your Email Id !", status: "SUCCESS" });
        }
      });





    } else {
      res.json({ message: "Email Id does not exists !", status: "WARNING" });
    }
  });
});




router.post('/teacher_login', (req, res, next) => {
  teacher.findOne({ $and: [{ "email": req.body.email.trim() }, { "password": req.body.password.trim() }, { "tablestatus": "TRUE" }] }, function (err, Teacher) {
    if (Teacher) {
      if (Teacher.email_verification == true) {
        var Teacherobj = Teacher;
      } else {
        var Teacherobj = { "table_id_for_query": Teacher.table_id_for_query };
      }

      if (Teacher.profile_status !== "ACTIVATED") {
        var redirect = "profilecomplete"
        var redirect2 = "profilecomplete"
      }
      else {
        var redirect = "dashboard"; var redirect2 = "dashboard"
      }
      if (Teacher.email_verification == false) {
        var redirect = "emailverify"
        sendEmailAfterRegistration(Teacher);

      }
      res.json({ message: "Logged In Successfully !", status: "SUCCESS", redirect2: redirect2, redirect: redirect, Teacherobj: Teacherobj });


    } else {
      res.json({ message: "Email Id or Password is wrong !", status: "WARNING" });
    }
  });
});


router.post('/teacher_registration', (req, res, next) => {


  teacher.findOne({ $and: [{ "email": req.body.email.trim() }, { "tablestatus": "TRUE" }] }, function (err, Teacher) {
    if (Teacher) {

      res.json({ message: "Email Id already exists !", status: "WARNING", error_reason: 'email' });
      return false;

    } else {
      var validation = true;

      //first name
      if (!req.body.first_name || req.body.first_name == undefined || req.body.first_name == '') {
        validation = false;
        res.json({ message: "First name is required !", status: "WARNING", error_reason: 'first_name' });
        return false;
      } else {

        if (!isNaN(req.body.first_name)) {
          validation = false;
          res.json({ message: "First name is not valid !", status: "WARNING", error_reason: 'first_name' });
          return false;
        }
      }

      //first name end


      //last name
      if (!req.body.last_name || req.body.last_name == undefined || req.body.last_name == '') {
        validation = false;
        res.json({ message: "Last name is required !", status: "WARNING", error_reason: 'last_name' });
        return false;
      } else {

        if (!isNaN(req.body.last_name)) {
          validation = false;
          res.json({ message: "Last name is not valid !", status: "WARNING", error_reason: 'last_name' });
          return false;
        }
      }

      //last name end


      //email
      if (!req.body.email || req.body.email == undefined || req.body.email == '') {
        validation = false;
        res.json({ message: "Email is required !", status: "WARNING", error_reason: 'email' });
        return false;
      } else {

        if (!ValidateEmail(req.body.email)) {
          validation = false;
          res.json({ message: "Email is not valid !", status: "WARNING", error_reason: 'email' });
          return false;
        }
      }

      //email end

      //mobile
      if (!req.body.mobile || req.body.mobile == undefined || req.body.mobile == '') {
        validation = false;
        res.json({ message: "Mobile Number is required !", status: "WARNING", error_reason: 'mobile' });
        return false;
      } else {

        if (!phonenumber(req.body.mobile)) {
          validation = false;
          res.json({ message: "Mobile Number is not valid !", status: "WARNING", error_reason: 'mobile' });
          return false;
        }
      }

      // mobile end
      //password
      if (!req.body.password || req.body.password == undefined || req.body.password == '') {
        validation = false;
        res.json({ message: "Password is required !", status: "WARNING", error_reason: 'password' });
        return false;
      } else {

        if (!passwordvalidation(req.body.password)) {
          validation = false;
          res.json({ message: "Password is not valid ! Password must be between 7 to 16 characters which contain only characters, numeric digits, underscore and first character must be a letter", status: "WARNING", error_reason: 'password' });
          return false;
        }
      }

      //password end

      //c_password
      if (!req.body.c_password || req.body.c_password == undefined || req.body.c_password == '') {
        validation = false;
        res.json({ message: "Confirm Password is required !", status: "WARNING", error_reason: 'c_password' });
        return false;
      } else {

        if (!passwordvalidation(req.body.c_password)) {
          validation = false;
          res.json({ message: "Confirm Password is not valid ! Password must be between 7 to 16 characters which contain only characters, numeric digits, underscore and first character must be a letter", status: "WARNING", error_reason: 'c_password' });
          return false;
        }
      }

      //c_password end

      if (req.body.c_password.trim() !== req.body.password.trim()) {
        validation = false;
        res.json({ message: "Please Confirm Password !", status: "WARNING", error_reason: 'c_password' });
        return false;
      }

      if (validation) {
        teacher.findOne({}, function (err, lastTeacher) {



          ////
          if (lastTeacher) {
            var table_id_for_query = lastTeacher.table_id_for_query + 1;
          } else {
            var table_id_for_query = 1;
          }

          var verificationcode = Math.floor(1000 + Math.random() * 9000);
          let newteacherOBJ = new teacher({
            table_id_for_query: table_id_for_query,

            first_name: req.body.first_name.trim(),
            last_name: req.body.last_name.trim(),
            email: req.body.email.trim(),
            mobile: req.body.mobile.trim(),
            password: req.body.password.trim(),
            profile_status: 'ACTIVATED',
            verificationcode: verificationcode,
            created_on: new Date(),
            email_verification: false,
            created_by: -1,
            tablestatus: 'TRUE'
          });
          newteacherOBJ.save((err, newTeacher) => {
            if (err) {
              res.json({ message: "Something is wrong !", status: "ERROR", newTeacher: {}, error_reason: '' }); return false;
            } else {
              sendEmailAfterRegistration(newTeacher);
              res.json({ message: "Registration is successfull !", status: "SUCCESS", newTeacher: newTeacher }); return false;
            }
          });
        }).sort({ table_id_for_query: -1 });

      }

    }
  });


});


router.put('/teacher_profile_update', (req, res, next) => {


  teacher.findOne({ $and: [{ "email": req.body.email.trim() }, { "tablestatus": "TRUE" }] }, function (err, Teacher) {
    if (Teacher) {
      if (Teacher.table_id_for_query != req.body.table_id_for_query) {

        res.json({ message: "Email Id already exists !", status: "WARNING", error_reason: 'email' });

      } else {
        var validation = true;


        //first name
        if (!req.body.first_name || req.body.first_name == undefined || req.body.first_name == '') {
          validation = false;
          res.json({ message: "First name is required !", status: "WARNING", error_reason: 'first_name' });
        } else {

          if (!isNaN(req.body.first_name)) {
            validation = false;
            res.json({ message: "First name is not valid !", status: "WARNING", error_reason: 'first_name' });
          }
        }

        //first name end


        //last name
        if (!req.body.last_name || req.body.last_name == undefined || req.body.last_name == '') {
          validation = false;
          res.json({ message: "Last name is required !", status: "WARNING", error_reason: 'last_name' });
        } else {

          if (!isNaN(req.body.last_name)) {
            validation = false;
            res.json({ message: "Last name is not valid !", status: "WARNING", error_reason: 'last_name' });
          }
        }

        //last name end


        //email
        if (!req.body.email || req.body.email == undefined || req.body.email == '') {
          validation = false;
          res.json({ message: "Email is required !", status: "WARNING", error_reason: 'email' });
        } else {

          if (!ValidateEmail(req.body.email)) {
            validation = false;
            res.json({ message: "Email is not valid !", status: "WARNING", error_reason: 'email' });
          }
        }

        //email end

        //mobile
        if (!req.body.mobile || req.body.mobile == undefined || req.body.mobile == '') {
          validation = false;
          res.json({ message: "Mobile Number is required !", status: "WARNING", error_reason: 'mobile' });
        } else {

          if (!phonenumber(req.body.mobile)) {
            validation = false;
            res.json({ message: "Mobile Number is not valid !", status: "WARNING", error_reason: 'mobile' });
          }
        }

        // mobile end










        var created_by = req.body.table_id_for_query;






        req.body.profile_status = 'ACTIVATED';

        req.body.updated_on = new Date();

        req.body.updated_by = created_by;
        if (validation) {

          ////
          teacher.updateOne({ 'table_id_for_query': req.body.table_id_for_query }, { $set: req.body }, (err, teacherUpdated) => {
            if (err) {
              res.json({ message: "Something is wrong!", status: "ERROR" });
            } else {


              res.json({ message: "Profile updated Successfully !!", status: "SUCCESS", teacherUpdated: teacherUpdated });
            }
          });

        }
        else {
          res.json({ message: "Something is wrong in validation ", status: "ERROR", newTeacher: {}, error_reason: '' });
        }
      }
    } else {
      res.json({ message: "Something is wrong ! User not found", status: "ERROR", newTeacher: {}, error_reason: '' });
    }
  });


});

//admin

router.get('/teachers/:limitInOneTime/:skipDocument/:totalRecord', (req, res, next) => {


  var limitInOneTime = +req.params.limitInOneTime;
  var skipDocument = +req.params.skipDocument;
  var totalRecord = +req.body.totalRecord;
  var count = +req.body.totalRecord;

  if (totalRecord == 0) {


    teacher.countDocuments({ "tablestatus": "TRUE" }, function (err, count) {
      //

      teacher.find({ "tablestatus": "TRUE" }, function (err, teacherlistSearched) {
        //// coommon
        if (teacherlistSearched.length > 0) {
          var teacheridArr = [];
          for (let i = 0; i < teacherlistSearched.length; i++) {
            teacheridArr.push(teacherlistSearched[i].table_id_for_query);



          }

          teacher_course.find({ $and: [{ "created_by": { $in: teacheridArr } }, { "tablestatus": "TRUE" }] }, function (err, teacherCourseslist) {

            if (teacherCourseslist.length > 0) {
              for (let i = 0; i < teacherlistSearched.length; i++) {
                for (let x = 0; x < teacherCourseslist.length; x++) {
                  if (teacherCourseslist[x].created_by == teacherlistSearched[i].table_id_for_query) {
                    teacherlistSearched[i].teachercourse.push(teacherCourseslist[x]);
                  }

                }


              }
              res.json({ "teacherList": teacherlistSearched, "totalRecord": count });
            } else {
              res.json({ "teacherList": teacherlistSearched, "totalRecord": count });
            }


          });
        } else {
          res.json({ "teacherList": teacherlistSearched, "totalRecord": count });
        }
        //// coommon end
      }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);

      //
    }).count();


  } else {

    teacher.find({ "tablestatus": "TRUE" }, function (err, teacherlistSearched) {

      //// coommon
      if (teacherlistSearched.length > 0) {
        var teacheridArr = [];
        for (let i = 0; i < teacherlistSearched.length; i++) {
          teacheridArr.push(teacherlistSearched[i].table_id_for_query);



        }

        teacher_course.find({ $and: [{ "created_by": { $in: teacheridArr } }, { "tablestatus": "TRUE" }] }, function (err, teacherCourseslist) {

          if (teacherCourseslist.length > 0) {
            for (let i = 0; i < teacherlistSearched.length; i++) {
              for (let x = 0; x < teacherCourseslist.length; x++) {
                if (teacherCourseslist[x].created_by == teacherlistSearched[i].table_id_for_query) {
                  teacherlistSearched[i].teachercourse.push(teacherCourseslist[x]);
                }

              }


            }
            res.json({ "teacherList": teacherlistSearched, "totalRecord": count });
          } else {
            res.json({ "teacherList": teacherlistSearched, "totalRecord": count });
          }


        });
      } else {
        res.json({ "teacherList": teacherlistSearched, "totalRecord": count });
      }
      //// coommon end

    }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);
  }
});

router.post('/searchTeachers', (req, res, next) => {


  var limitInOneTime = +req.body.limitInOneTime;
  var skipDocument = +req.body.skipDocument;
  var totalRecord = +req.body.totalRecord;
  var count = +req.body.totalRecord;
  let searchArr = [];

  if (req.body.first_name) {
    searchArr.push({ "first_name": { '$regex': req.body.first_name.trim(), '$options': 'i' } });
  }
  if (req.body.last_name) {
    searchArr.push({ "last_name": { '$regex': req.body.last_name.trim(), '$options': 'i' } });
  }
  if (req.body.teacher_id) {

    searchArr.push({ "teacher_id": { '$regex': req.body.teacher_id.trim(), '$options': 'i' } });
  }

  if (req.body.education) {

    searchArr.push({ "education": { '$regex': req.body.education.trim(), '$options': 'i' } });
  }
  if (req.body.skill) {

    searchArr.push({ "skill": { '$regex': req.body.skill.trim(), '$options': 'i' } });
  }

  if (req.body.pincode) {

    searchArr.push({ "pincode": { '$regex': req.body.pincode.trim(), '$options': 'i' } });
  }
  if (req.body.country) {

    searchArr.push({ "country": { '$regex': req.body.country.trim(), '$options': 'i' } });
  }
  if (req.body.state) {

    searchArr.push({ "state": { '$regex': req.body.state.trim(), '$options': 'i' } });
  }
  if (req.body.city) {

    searchArr.push({ "city": { '$regex': req.body.city.trim(), '$options': 'i' } });
  }
  if (req.body.dob) {

    searchArr.push({ "dob": { '$regex': req.body.dob.trim(), '$options': 'i' } });
  }
  if (req.body.profile_status) {

    searchArr.push({ "profile_status": { '$regex': req.body.profile_status.trim(), '$options': 'i' } });
  }
  if (req.body.email) {
    searchArr.push({ "email": { '$regex': req.body.email.trim(), '$options': 'i' } });

  }
  if (req.body.table_id_for_query) {
    searchArr.push({ "table_id_for_query": req.body.table_id_for_query });
  }
  if (req.body.mobile) {
    searchArr.push({ "mobile": { '$regex': req.body.mobile.trim(), '$options': 'i' } });

  }
  if (req.body.phone) {
    searchArr.push({ "phone": { '$regex': req.body.phone.trim(), '$options': 'i' } });


  }
  if (req.body.from_reg_date) {
    searchArr.push({ created_on: { $gte: covertGivenDateWithTime(req.body.from_reg_date) } });
  }
  if (req.body.to_reg_date) {
    searchArr.push({ created_on: { $lte: covertGivenDateWithTimeMax(req.body.to_reg_date) } });
  }


  searchArr.push({ "tablestatus": 'TRUE' });
  console.log(searchArr);

  if (totalRecord == 0) {


    teacher.countDocuments({ $and: searchArr }, function (err, count) {
      //
      teacher.find({ $and: searchArr }, function (err, teacherlistSearched) {



        //// coommon
        if (teacherlistSearched.length > 0) {
          var teacheridArr = [];
          for (let i = 0; i < teacherlistSearched.length; i++) {
            teacheridArr.push(teacherlistSearched[i].table_id_for_query);



          }

          teacher_course.find({ $and: [{ "created_by": { $in: teacheridArr } }, { "tablestatus": "TRUE" }] }, function (err, teacherCourseslist) {

            if (teacherCourseslist.length > 0) {
              for (let i = 0; i < teacherlistSearched.length; i++) {
                for (let x = 0; x < teacherCourseslist.length; x++) {
                  if (teacherCourseslist[x].created_by == teacherlistSearched[i].table_id_for_query) {
                    teacherlistSearched[i].teachercourse.push(teacherCourseslist[x]);
                  }

                }


              }
              res.json({ "teacherList": teacherlistSearched, "totalRecord": count });
            } else {
              res.json({ "teacherList": teacherlistSearched, "totalRecord": count });
            }


          });
        } else {
          res.json({ "teacherList": teacherlistSearched, "totalRecord": count });
        }
        //// coommon end



      }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);

      //
    }).count();

  } else {

    teacher.find({ $and: searchArr }, function (err, teacherlistSearched) {
      //// coommon
      if (teacherlistSearched.length > 0) {
        var teacheridArr = [];
        for (let i = 0; i < teacherlistSearched.length; i++) {
          teacheridArr.push(teacherlistSearched[i].table_id_for_query);



        }

        teacher_course.find({ $and: [{ "created_by": { $in: teacheridArr } }, { "tablestatus": "TRUE" }] }, function (err, teacherCourseslist) {

          if (teacherCourseslist.length > 0) {
            for (let i = 0; i < teacherlistSearched.length; i++) {
              for (let x = 0; x < teacherCourseslist.length; x++) {
                if (teacherCourseslist[x].created_by == teacherlistSearched[i].table_id_for_query) {
                  teacherlistSearched[i].teachercourse.push(teacherCourseslist[x]);
                }

              }


            }
            res.json({ "teacherList": teacherlistSearched, "totalRecord": count });
          } else {
            res.json({ "teacherList": teacherlistSearched, "totalRecord": count });
          }


        });
      } else {
        res.json({ "teacherList": teacherlistSearched, "totalRecord": count });
      }
      //// coommon end
    }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);
  }


});

router.delete('/teacher/:id', (req, res, next) => {

  teacher.updateOne({ '_id': req.params.id }, { $set: { 'tablestatus': 'FALSE', 'deleted_by': created_by_admin, 'deleted_on': new Date() } }, (err, v) => {
    if (err) {
      res.json({ message: "Something is wrong", status: "ERROR" });
    } else {
      res.json({ message: "Teacher's Details Deleted Successfully !!", status: "SUCCESS" });

    }
  });
});

router.post('/profile_status_change/:id', (req, res, next) => {

  teacher.updateOne({ '_id': req.body._id }, { $set: { 'profile_rejection_reason': req.body.profile_rejection_reason, 'profile_status': req.body.profile_status, 'profile_status_changed_by': created_by, 'profile_status_changed_on': new Date() } }, (err, v) => {
    if (err) {
      res.json({ message: "Something is wrong", status: "ERROR" });
    } else {
      res.json({ message: "Teacher's Profile Status Updated Successfully !!", status: "SUCCESS" });

    }
  });
});
// admin end

///TEACHER  END///////////////////////////////////////////////////


///category ///////////////////////////////////////////////////
//admin

router.get('/getCategorylist', (req, res, next) => {


  category.find({ "tablestatus": "TRUE" }, function (err, categoryList) {
    res.json({ "categoryList": categoryList });
  }).sort({ _id: -1 });



});

router.put('/category', (req, res, next) => {
  if (req.body.category_name == '' || req.body.category_name == undefined) {
    res.json({ message: "Category name is required !", status: "ERROR", newCategory: {}, error_reason: 'category_name' });
  } else {
    category.findOne({ "tablestatus": "TRUE", "category_name": req.body.category_name, "_id": { $ne: req.body._id }, }, function (err, alreadycategory) {
      if (alreadycategory) {
        res.json({ message: "Category Already Exists !", status: "ERROR", newCategory: {}, error_reason: '' });
      } else {

        if (req.body.parent_id == '0') {
          var level = 0;
          let newcategoryOBJUpdate = {
            level: level,
            parent_id: req.body.parent_id,

            category_name: req.body.category_name.trim(),

            updated_on: new Date(),

            updated_by: created_by_admin,
            tablestatus: 'TRUE'
          };
          category.updateOne({ '_id': req.body._id }, { $set: newcategoryOBJUpdate }, (err, categoryUpdated) => {
            if (err) {
              res.json({ message: "Something is wrong!", status: "ERROR" });
            } else {


              res.json({ message: "Category updated Successfully !!", status: "SUCCESS" });
            }
          });
        } else {
          var parent_id = req.body.parent_id;
          category.findOne({ "tablestatus": "TRUE", "_id": parent_id }, function (err, parent_category) {
            var level = parent_category.level + 1;
            let newcategoryOBJUpdate = {
              level: level,
              parent_id: req.body.parent_id,

              category_name: req.body.category_name.trim(),

              updated_on: new Date(),

              updated_by: created_by_admin,
              tablestatus: 'TRUE'
            };
            category.updateOne({ '_id': req.body._id }, { $set: newcategoryOBJUpdate }, (err, categoryUpdated) => {
              if (err) {
                res.json({ message: "Something is wrong!", status: "ERROR" });
              } else {


                res.json({ message: "Category updated Successfully !!", status: "SUCCESS" });
              }
            });
          }).sort({ _id: -1 });
        }
      }
    });
  }
});


router.post('/category', (req, res, next) => {
  if (req.body.category_name == '' || req.body.category_name == undefined) {
    res.json({ message: "Category name is required !", status: "ERROR", newCategory: {}, error_reason: 'category_name' });
  } else {
    category.findOne({ "tablestatus": "TRUE", "category_name": req.body.category_name }, function (err, alreadycategory) {
      if (alreadycategory) {
        res.json({ message: "Category Already Exists !", status: "ERROR", newCategory: {}, error_reason: '' });
      } else {
        if (req.body.parent_id == '0') {
          var level = 0;
          let newcategoryOBJ = new category({
            level: level,
            parent_id: req.body.parent_id,

            category_name: req.body.category_name.trim(),

            created_on: new Date(),

            created_by: created_by_admin,
            tablestatus: 'TRUE'
          });
          newcategoryOBJ.save((err, newCategory) => {
            if (err) {
              res.json({ message: "Something is wrong !", status: "ERROR", newCategory: {}, error_reason: '' });
            } else {

              res.json({ message: "Category Added Successfully !", status: "SUCCESS", newCategory: newCategory });
            }
          });
        } else {
          var parent_id = req.body.parent_id;
          category.findOne({ "tablestatus": "TRUE", "_id": parent_id }, function (err, parent_category) {
            var level = parent_category.level + 1;
            let newcategoryOBJ = new category({
              level: level,
              parent_id: req.body.parent_id,

              category_name: req.body.category_name.trim(),

              created_on: new Date(),

              created_by: created_by_admin,
              tablestatus: 'TRUE'
            });
            newcategoryOBJ.save((err, newCategory) => {
              if (err) {
                res.json({ message: "Something is wrong !", status: "ERROR", newCategory: {}, error_reason: '' });
              } else {

                res.json({ message: "Category Added Successfully !", status: "SUCCESS", newCategory: newCategory });
              }
            });
          }).sort({ _id: -1 });
        }
      }
    });
  }



});
router.delete('/category/:id', (req, res, next) => {

  category.updateOne({ '_id': req.params.id }, { $set: { 'tablestatus': 'FALSE', 'deleted_by': created_by + admin, 'deleted_on': new Date() } }, (err, v) => {
    if (err) {
      res.json({ message: "Something is wrong", status: "ERROR" });
    } else {
      res.json({ message: "Category Deleted Successfully !!", status: "SUCCESS" });

    }
  });
});
// admin end
///category  END///////////////////////////////////////////////////



function covertGivenDateWithTime(dt) {
  var d = new Date(dt);
  d.setHours(0);
  d.setMinutes(0); d.setSeconds(0);
  return d;
}

function covertGivenDateNoTimeInvolved(dt) {
  var d = new Date(dt);

  return d;
}
function covertGivenDateWithTimeMax(dt) {
  var d = new Date(dt);
  d.setHours(23);
  d.setMinutes(59); d.setSeconds(0);
  return d;
}

module.exports = router;