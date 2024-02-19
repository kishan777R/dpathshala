const express = require('express');
const http = require('http');
const https = require('https');
const qs = require('querystring');
const fs = require('fs')
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
const TempOrders = require('../model/temp_order');
const router = express.Router();
const Course = require('../model/course');
const Questions = require('../model/questions');
const Videos = require('../model/video');
const Videoscompletedstatus = require('../model/videoscompletedstatus');
const Topics = require('../model/topic');
const Asked = require('../model/asked_questions');
const Asked_Chat = require('../model/asked_questions_chat');
const Tutorials = require('../model/tutorial');
const Clients = require('../model/clients');
const AfVisits = require('../model/affiliatesvisit');
const path = require('path');
const multer = require('multer');
const Razorpay = require('razorpay');


const Orders = require('../model/orders');
const Coupons = require('../model/coupon');
const OTP = require('../model/otp');
const contact = require('../model/contact');
var nodemailer = require('nodemailer');
const notify = require('../model/notify');

const assigned_questions = require('../model/assigned_questions');
const submitted_answer = require('../model/submitted_answer');
const Notifications = require('../model/notifications');

const urltocheckordertatus = "https://xcellinsindiapro.com/sale/TxnStatus.php?order_id=";

const allconst = require('./contants');
const adminemail = 'contact@dpathshala.live';

const myemail = "contact@dpathshala.live";
 
let transporter = nodemailer.createTransport({
  host: 'dpathshala.live',
  port: 465,
  auth: {
    user: myemail,
    pass: '!T(AqGG*ymhF'
  }
});
const multipart = require('connect-multiparty');

// const multipartMiddleware_video = multipart({
//   uploadDir: './public/uploads/video'
// });
const multipartMiddleware_video = multer({ dest: './public/uploads/video' }).single("profile");




// const multipartMiddleware_tutorial = multipart({
//   uploadDir: './public/uploads/tutorial'
// });
const multipartMiddleware_tutorial = multer({ dest: './public/uploads/tutorial' }).single("profile");




// const multipartMiddleware_course = multipart({
//   uploadDir: './public/uploads/course'
// });
const multipartMiddleware_course = multer({ dest: './public/uploads/course' }).single("profile");



// const multipartMiddleware_ask = multipart({
//   uploadDir: './public/uploads/ask'
// });
const multipartMiddleware_ask = multer({ dest: './public/uploads/ask' }).single("profile");

// const multipartMiddleware = multipart({
//   uploadDir: './public/uploads'
// });
const multipartMiddleware = multer({ dest: './public/uploads' }).single("profile");

// const multipartMiddleware_profilepic = multipart({
//   uploadDir: './public/uploads/profile'
// });
const multipartMiddleware_profilepic = multer({ dest: './public/uploads/profile' }).single("profile");



// const multipartMiddleware_questionfile = multipart({
//   uploadDir: './public/questionfilefolder'
// });
const multipartMiddleware_questionfile = multer({ dest: './public/questionfilefolder' }).single("profile");

// const multipartMiddleware_audio_from_app = multipart({
//   uploadDir: './public/questionfilefolder'
// });
const multipartMiddleware_audio_from_app = multer({ dest: './public/questionfilefolder' }).single("profile");


var created_by = 1;
const server_version_app = allconst.server_version_app;
const dashboardpath = allconst.dashboardpath;

const serverpath = allconst.serverpath;
console.log(serverpath);
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



const appname = "DPathshala";
const logopath = allconst.websitepath + '/logo.png';

const pdfurl_sub = "http://api.pdflayer.com/api/convert?access_key=16556adb1e8e4eaf6b62e8e570cf3ed3&document_url=";
const invoice_url = "https://xcellinsindia.com/lesson/invoice_lesson.php";
const email_url = allconst.websitepath + "/email/email.php";

const certificate_url = "http://lessons.co.in/lesson/certificate_lesson.php";
const certificate_url_making = "http://xcellinsindia.com/lesson/certificate_lesson.php";
const externalserverURL = allconst.websitepath;
const externalserverURLforcertificate = allconst.websitepath;
const certificate_extension = "html";
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function new_Date() {
  var d = new Date();
  // d.setHours(d.getHours() + 5);
  // d.setMinutes(d.getMinutes() + 30);
  return d;
}
function new_Date_time_not_required() {
  var d = new Date();

}

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
function sendEmailAfterRegistrationStudent(newClientObject) {
  var mailOptions = {
    from: myemail,
    to: newClientObject.email,
    subject: "Welcome to " + appname + " || Email verification !!",
    html: ' Dear ' + newClientObject.first_name + ' ' + newClientObject.last_name + ' <p> Your Email verification code is ' + newClientObject.profile_verify_otp + '. </p><br/><br/><br/><b>Team ' + appname + '</b><br/><br/>' + "<img src=" + logopath + ">"
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
  return true;
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


var request = require("request");


router.get('/mobilenumbers', (req1, res1, next) => {

  res1.json({ "mobilearray": ['+918802010213'] });



});


router.post('/uploadfileAPI_audio_from_app', multipartMiddleware_audio_from_app, (req, res, next) => {
  var originalpathoffile = req.files.file.path;

  var image_path = req.files.file.path.replace("\\", "/");
  var image_path = image_path.replace("public/", "");
  res.json({ message: "File uploaded succesfully !!", status: "success", filePath: serverpath + '' + image_path, serverpath: serverpath, image_path: image_path });





});

router.post('/deletefilefromserver', (req, res, next) => {
  var serverpathC = req.body.server.trim();

  var filepath = req.body.filepath.trim();


  if (serverpath == serverpathC) {


    fs.unlink(path.join('public', filepath), err => {
      if (err) {
        res.json({
          'message': "Something wrong ",
          'status': 'ERROR',
          'status': err

        });
      } else {
        res.json({
          'message': 'File Deleted SUCCESSFULLY ',
          'status': 'SUCCESS'

        });
      }
    });


  } else {
    res.json({ message: "File does not belong to our server  !!", status: "ERROR" });

  }




});

router.post('/notify', (req, res, next) => {
  req.body.email = req.body.email.trim();
  if (!ValidateEmail(req.body.email)) {
    validation = false;
    res.json({ message: "Please enter a valid Email Id !", status: "ERROR" });
    return false;
  }


  notify.find({ $and: [{ "sub_course_id": req.body.sub_course_id }, { "email": req.body.email }] }, function (err, NotifyList) {
    if (NotifyList.length > 0) {
      res.json({ message: "We already have your concern, we will notify you whenever this course is released.", status: "SUCCESS" });

    } else {


      let newnotifyBJ = new notify({

        sub_course_id: req.body.sub_course_id,


        email: req.body.email,


        created_on: new Date(),

      });
      newnotifyBJ.save((err, newnot) => {
        if (err) {
          res.json({ message: "Something is wrong " + err, status: "ERROR" });
        } else {
          res.json({ message: "We will notify you whenever this course is released.", status: "SUCCESS" });

        }
      });
    }
  });




});



router.post('/saveUniqueVisitorOfAffilator', (req, res, next) => {
  let newAfVisitsBJ = new AfVisits({

    course_id: req.body.course_id,


    c_id_int: req.body.aff_id,


    created_on: new Date(),

  });
  newAfVisitsBJ.save((err, newnot) => {
    if (err) {
      res.json({ message: "Something is wrong " + err, status: "ERROR" });
    } else {
      res.json({ message: "Saved visitor.", status: "SUCCESS" });

    }
  });






});

router.get('/getwordmeaning', (req1, res1, next) => {

  const options = {
    hostname: 'xcellinsindia.com',
    port: 443,
    path: '/lesson/word.php?word=NA',
    method: 'GET'
  }
  request("https://xcellinsindia.com/lesson/word.php?word=NA", function (error, response, body) {
    res1.send(body);
  });


});




router.get('/invoice_url', (req, res, next) => {
  res.json({ "certificate_extension": certificate_extension, "certificate_url_making": certificate_url_making, "externalserverURLforcertificate": externalserverURLforcertificate, "pdfurl_sub": pdfurl_sub, "invoice_url": invoice_url, "email_url": email_url, "certificate_url": certificate_url, "externalserverURL": externalserverURL });


});
//  asked start


//// admin asked start

router.get('/askedQuestionForAdmin/:limitInOneTime/:skipDocument/:totalRecord/:askedquestionType', (req, res, next) => {


  var limitInOneTime = +req.params.limitInOneTime;
  var skipDocument = +req.params.skipDocument;
  var totalRecord = +req.params.totalRecord;
  var askedquestionType = req.params.askedquestionType;

  let searchArr = [];


  if (askedquestionType == 'ALL') {

  } else if (askedquestionType == 'UNSEEN') {
    searchArr.push({ "seen_by_admin": false });
  } else if (askedquestionType == 'SEEN') {
    searchArr.push({ "seen_by_admin": true });
  }
  searchArr.push({ "tablestatus": 'TRUE' });
  if (totalRecord == 0) {


    Asked.countDocuments({ $and: searchArr }, function (err, count) {
      //

      Asked.find({ $and: searchArr }, function (err, askedQuestionList) {
        res.json({ "askedQuestionList": askedQuestionList, "totalRecord": count });
      }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);

      //
    }).count();


  } else {

    Asked.find({ $and: searchArr }, function (err, askedQuestionList) {
      res.json({ "askedQuestionList": askedQuestionList, "totalRecord": totalRecord });
    }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);
  }
});


router.get('/updateSeenByUsertrueAskedQuestion/:refid', (req, res, next) => {

  var refid = req.params.refid;
  var updatedobj = {


    'answer_seen_by_user': true,

  };
  Asked.updateOne({ '_id': refid }, { $set: updatedobj }, (err, AskedQ) => {
    if (err) {
      res.json({ message: "Something is wrong " + err, status: "ERROR" });
    } else {


      res.json({ message: "Status updated Successfully !!", status: "SUCCESS" });
    }
  });

});

router.get('/getaskQuestionListForFrontEnd/:c_id_int', (req, res, next) => {

  var c_id_int = +req.params.c_id_int;
  let searchArr = [];


  searchArr.push({ "c_id_int": c_id_int });


  searchArr.push({ "tablestatus": 'TRUE' });
  Asked.find({ $and: searchArr }, function (err, askedQuestionList) {
    var idArr = [];
    for (let y = 0; y < askedQuestionList.length; y++) {
      idArr.push(askedQuestionList[y]['_id']);
    }

    Asked_Chat.find({ $and: [{ "referenceid": { $in: idArr } }, { "tablestatus": "TRUE" }] }, function (err, askedQuestionListchat) {
      for (let y = 0; y < askedQuestionList.length; y++) {
        var newchatcount = 0;
        for (let r = 0; r < askedQuestionListchat.length; r++) {
          if (askedQuestionList[y]['_id'] == askedQuestionListchat[r]['referenceid']) {


            if (askedQuestionListchat[r]['by'] == 'Admin' && askedQuestionListchat[r]['seen_by_respective'] == false) {
              newchatcount++;
            }
          }


        }
        askedQuestionList[y].chatnumber = newchatcount;

      }
      res.json({ 'askedQuestionList': askedQuestionList });
    }).sort({ _id: 1 });
  }).sort({ _id: -1 });



});

router.get('/getaskQuestionListForFrontEneed/:c_id_int', (req, res, next) => {

  var c_id_int = +req.params.c_id_int;
  let searchArr = [];


  searchArr.push({ "c_id_int": c_id_int });


  searchArr.push({ "tablestatus": 'TRUE' });

  Asked.aggregate([

    { $match: { $and: searchArr } },

    {
      $lookup: {
        from: "asked_chat",
        localField: "_id",
        foreignField: "referenceid",
        as: "chat"
      }
    },
    { $sort: { _id: -1 } }
  ], function (err, askedQuestionList) {
    var askedquetionArr = [];
    if (askedQuestionList.length > 0) {

      for (let y = 0; y < askedQuestionList.length; y++) {
        var newchatcount = 0;
        for (let t = 0; t < askedQuestionList[y].chat.length; t++) {

          if (askedQuestionList[y].chat[t]['by'] == 'Admin' && askedQuestionList[y].chat[t]['seen_by_respective'] == false) {
            newchatcount++;
          }


        }
        askedQuestionList[y].chat = newchatcount;
        askedquetionArr.push(askedQuestionList[y]);
      }
    }
    res.json({ 'askedQuestionList': askedquetionArr });

  });



});

router.post('/searchaskedQuestionForAdmin/:askedquestionType', (req, res, next) => {


  var limitInOneTime = +req.body.limitInOneTime;
  var skipDocument = +req.body.skipDocument;
  var totalRecord = +req.body.totalRecord;
  var askedquestionType = req.params.askedquestionType;
  let searchArr = [];
  if (askedquestionType == 'ALL') {

  } else if (askedquestionType == 'UNSEEN') {
    searchArr.push({ "seen_by_admin": false });
  } else if (askedquestionType == 'SEEN') {
    searchArr.push({ "seen_by_admin": true });
  }

  if (req.body.c_id_int) {
    searchArr.push({ "c_id_int": req.body.c_id_int });
  }

  if (req.body.from_asked_date) {
    searchArr.push({ created_on: { $gte: covertGivenDateWithTime(req.body.from_asked_date) } });
  }
  if (req.body.to_asked_date) {
    searchArr.push({ created_on: { $lte: covertGivenDateWithTimeMax(req.body.to_asked_date) } });
  }





  searchArr.push({ "tablestatus": 'TRUE' });


  if (totalRecord == 0) {


    Asked.countDocuments({ $and: searchArr }, function (err, count) {
      //
      Asked.find({ $and: searchArr }, function (err, askedQuestionList) {
        res.json({ "askedQuestionList": askedQuestionList, "totalRecord": count });
      }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);
      //
    }).count();

  } else {

    Asked.find({ $and: searchArr }, function (err, askedQuestionList) {
      res.json({ "askedQuestionList": askedQuestionList, "totalRecord": totalRecord });
    }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);
  }


});


router.put('/giveanswer', (req, res, next) => {





  let updatedobj = {

    'answer': req.body.answer,
    'filePath': req.body.filePath,
    'serverpath': req.body.serverpath,
    'filetype': req.body.filetype,
    'answergivenon': new Date(),
    'answergiven_by': created_by,
    'updated_by': created_by,
    'updated_on': new Date(),
    'answer_seen_by_user': false,
    'seen_by_admin': true,
  };
  Asked.updateOne({ '_id': req.body._id }, { $set: updatedobj }, (err, AskedQ) => {
    if (err) {
      res.json({ message: "Something is wrong " + err, status: "ERROR" });
    } else {

      Clients.findOne({ "c_id_int": req.body.c_id_int }, function (err, ClientPBJ) {

        var message = " Answer for your question " + req.body.asked_question + " is available now !! ";
        var link = "account/askquestion";
        var insertArrForNotification = [];

        insertArrForNotification.push({
          'to_be_sent_on': new Date(),
          'message': message,
          "test_for_today_always": true,
          "link": link, "websitelink": req.body.websitelinkofquestionforuser,
          "send_after_hour": 12,
          "category": "ask",
          "day_number": -1,
          "created_on": new Date(),
          "created_by": created_by,
          "generated_type": 'AUTOMATIC',
          "c_id_int": req.body.c_id_int,

          'notificationType': "ASK",
          "sent_status": false,
          'tablestatus': "TRUE",
          "seen_status": false
        });


        if (insertArrForNotification.length > 0) {
          Notifications.insertMany(insertArrForNotification);

        }
        res.json({ message: "Answer Saved Successfully !!", status: "SUCCESS" });
        var mailOptions = {
          from: myemail,
          to: ClientPBJ.email,
          subject: message,
          html: '<h1>Dear ' + ClientPBJ.first_name + '' + ClientPBJ.last_name + '<br/>New Message for asked question : ' + req.body.asked_question + '</h1><p><a href=' + req.body.websitelinkofquestionforuser + '>Click this link to see answer</a></p><br/><br/><br/><b>Team ' + appname + '</b><br/><br/>' + "<img src=" + logopath + ">"
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });



      });
    }
  });


});

router.delete('/deletemessageofchat/:id/:refid', (req, res, next) => {





  Asked_Chat.updateOne({ '_id': req.params.id }, { $set: { 'tablestatus': 'FALSE', 'deleted_by': created_by, 'deleted_on': new Date() } }, (err, v) => {
    if (err) {
      res.json({ message: "Something is wrong", status: "ERROR" });
    } else {




      Asked_Chat.find({ "tablestatus": "TRUE", "referenceid": req.params.refid }, function (err, Chatlist) {

        if (Chatlist.length > 0) {

          if (Chatlist[0].by == 'Admin') {
            if (Chatlist[0].seen_by_respective == false) {
              res.json({ message: "Message Deleted Successfully !!", status: "SUCCESS" });
            } else {

              var updatedobj = {

                'answer_seen_by_user': true,

              };


              Asked.updateOne({ '_id': req.body.refid }, { $set: updatedobj }, (errss, AskedQ) => {
                if (errss) {
                  res.json({ message: "Something is wrong " + errss, status: "ERROR" });
                } else {
                  res.json({ message: "Message Deleted Successfully !!", status: "SUCCESS" });

                }
              });

            }
          }
          else {

            var updatedobj = {

              'answer_seen_by_user': true,

            };


            Asked.updateOne({ '_id': req.body.refid }, { $set: updatedobj }, (errss, AskedQ) => {
              if (errss) {
                res.json({ message: "Something is wrong " + errss, status: "ERROR" });
              } else {
                res.json({ message: "Message Deleted Successfully !!", status: "SUCCESS" });

              }
            });

          }


        } else {

          var updatedobj = {

            'answer_seen_by_user': true,

          };


          Asked.updateOne({ '_id': req.body.refid }, { $set: updatedobj }, (errss, AskedQ) => {
            if (errss) {
              res.json({ message: "Something is wrong " + errss, status: "ERROR" });
            } else {
              res.json({ message: "Message Deleted Successfully !!", status: "SUCCESS" });

            }
          });

        }

      }).sort({ 'date': -1 }).limit(1);
    }
  });




});

/////  admin asked endend



router.post('/askedQuestionByOBJ', (req, res, next) => {

  var searchArr = [];
  if (req.body._id) {
    searchArr.push({ "_id": req.body._id });
  }

  if (req.body.tutorial_id) {
    searchArr.push({ "tutorial_id": req.body.tutorial_id });
  }
  if (req.body.question_id) {
    searchArr.push({ "question_id": req.body.question_id });
  }
  if (req.body.video_id) {
    searchArr.push({ "video_id": req.body.video_id });
  }
  if (req.body.c_id_int) {
    searchArr.push({ "c_id_int": req.body.c_id_int });
  }

  searchArr.push({ "tablestatus": 'TRUE' });






  Asked.findOne({ $and: searchArr }, function (err, AskedOne) {
    res.json(AskedOne);
  });
});
router.get('/askedQuestionById/:id', (req, res, next) => {
  Asked.findOne({ $and: [{ "tablestatus": "TRUE" }, { "_id": req.params.id }] }, function (err, AskedOne) {
    res.json(AskedOne);
  });
});
router.get('/askedQuestion_chatByRId/:rid', (req, res, next) => {
  Asked_Chat.find({ $and: [{ "tablestatus": "TRUE" }, { "referenceid": req.params.rid }] }, function (err, chats) {
    res.json(chats);
  });
});

router.get('/updatereadStatus/:rid', (req, res, next) => {


  let updatedobj = {


    seen_by_respective: true,
  };
  Asked_Chat.updateMany({ 'referenceid': req.params.rid, 'by': 'Admin' }, { $set: updatedobj }, (err, as) => {
    if (err) {
      res.json({ message: "Something is wrong " + err, status: "ERROR" });
    } else {


      res.json({ message: "Chat Status Updated Successfully !!", status: "SUCCESS" });



    }
  });
});



router.post('/updayteAskedQuestion', (req, res, next) => {




  let updatedobj = {

    asked_question: req.body.message,
    seen_by_admin: false,
    'updated_by': req.body.updated_by,
    'updated_on': new Date()
  };
  Asked.updateOne({ '_id': req.body.referenceid }, { $set: updatedobj }, (err, as) => {
    if (err) {
      res.json({ message: "Something is wrong " + err, status: "ERROR" });
    } else {


      res.json({ message: "Question Updated Successfully !!", status: "SUCCESS" });



    }
  });


});


router.post('/saveAskedQuestion_website', (req, res, next) => {

  var qdetils = JSON.parse(req.body.qdetils);

  console.log(qdetils);


  let newAskedOBJ = new Asked(qdetils);
  newAskedOBJ.save((err, newAsked) => {
    if (err) {
      res.json({ message: "Something is wrong " + err, status: "ERROR", askedquestionrow: {} });
    } else {

      var mailOptions = {
        from: myemail,
        to: adminemail,
        subject: "New question from " + appname + " user !!",
        html: '<h1>Question : ' + newAsked.asked_question + '</h1><p><a href=' + dashboardpath + 'askedquestionlist_form/' + newAsked._id + '>Click this link to answer</a></p>'
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });



      res.json({ message: "Question Asked Successfully !!", status: "SUCCESS", askedquestionrow: newAsked });

    }
  });


});


router.post('/saveAskedQuestion', (req, res, next) => {





  let newAskedOBJ = new Asked(req.body);
  newAskedOBJ.save((err, newAsked) => {
    if (err) {
      res.json({ message: "Something is wrong " + err, status: "ERROR", askedquestionrow: {} });
    } else {

      var mailOptions = {
        from: myemail,
        to: adminemail,
        subject: "New question from  " + appname + " user !!",
        html: '<h1>Question : ' + req.body.asked_question + '</h1><p><a href=' + dashboardpath + 'askedquestionlist_form/' + newAsked._id + '>Click this link to answer</a></p>'
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });



      res.json({ message: "Question Asked Successfully !!", status: "SUCCESS", askedquestionrow: newAsked });

    }
  });


});
router.post('/saveAskedQuestion_chat', (req, res, next) => {
  if (req.body.by == "Admin") {
    var created_byS = created_by;
  } else {
    var created_byS = -1;
  }
  let newAskedOBJ = new Asked_Chat({ "created_on": new Date(), "created_by": created_byS, "tablestatus": "TRUE", "seen_by_respective": false, "referenceid": req.body.referenceid, "message": req.body.message, "by": req.body.by, "date": new Date() });
  newAskedOBJ.save((err, newAskedchat) => {
    if (err) {
      res.json({ message: "Something is wrong " + err, status: "ERROR", newAskedchat: {} });
    } else {


      if (req.body.by == 'user') {
        var updatedobj = {

          'seen_by_admin': false,

        };
      } else {
        var updatedobj = {

          'answer_seen_by_user': false,
          'seen_by_admin': true
        };
      }

      Asked.updateOne({ '_id': req.body.referenceid }, { $set: updatedobj }, (err, AskedQ) => {
        if (err) {
          res.json({ message: "Something is wrong " + err, status: "ERROR" });
        } else {

          if (req.body.by == 'Admin') {

            Asked.findOne({ "_id": req.body.referenceid }, function (err, askedQuestionOBJ) {
              Clients.findOne({ "c_id_int": req.body.c_id_int }, function (err, ClientPBJ) {
                var message = "New message for " + req.body.asked_question;
                var link = "account/askquestion";
                var insertArrForNotification = [];

                insertArrForNotification.push({
                  'to_be_sent_on': new Date(),
                  'message': message,
                  "test_for_today_always": true,
                  "link": link,
                  "websitelink": askedQuestionOBJ.websitelinkofquestionforuser,
                  "send_after_hour": 12,
                  "category": "ask",
                  "day_number": -1,
                  "created_on": new Date(),
                  "created_by": created_by,
                  "generated_type": 'AUTOMATIC',
                  "c_id_int": req.body.c_id_int,

                  'notificationType': "ASK_CHAT",
                  "sent_status": false,
                  'tablestatus': "TRUE",
                  "seen_status": false
                });

                if (insertArrForNotification.length > 0) {
                  Notifications.insertMany(insertArrForNotification);

                }
                res.json({ message: "Message Saved Successfully !!", status: "SUCCESS", newAskedchat: newAskedchat });
                var mailOptions = {
                  from: myemail,
                  to: ClientPBJ.email,
                  subject: "New message for " + req.body.asked_question,
                  html: '<h1>Dear ' + ClientPBJ.first_name + '' + ClientPBJ.last_name + '<br/>New Message for asked question : ' + req.body.asked_question + '</h1><p><a href=' + askedQuestionOBJ.websitelinkofquestionforuser + '>Click this link to see answer</a></p><br/><br/><br/><b>Team ' + appname + '</b><br/><br/>' + "<img src=" + logopath + ">"
                };

                transporter.sendMail(mailOptions, function (error, info) {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log('Email sent: ' + info.response);
                  }
                });
              });



            });

            //
          } else {
            res.json({ message: "Message Saved Successfully !!", status: "SUCCESS", newAskedchat: newAskedchat });
            var mailOptions = {
              from: myemail,
              to: adminemail,
              subject: "New message from " + appname + " user !!",
              html: '<h1>Message : ' + req.body.message + '</h1><p><a href=' + dashboardpath + 'askedquestionlist_form/' + req.body.referenceid + '>Click this link to message</a></p>'
            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
          }



        }
      });







    }
  });




});

//  asked end


//  order start



router.get('/listoforders/:c_id_int', (req, res, next) => {

  var c_id_int = +req.params.c_id_int;

  Orders.find({
    "order_no": { $ne: "" }, 'c_id_int': c_id_int
  }, function (err, orderList) {
    var orderListF = [];
    var courseidsubcourseidArr = [];
    for (var d = 0; d < orderList.length; d++) {
      var n = courseidsubcourseidArr.includes(orderList[d].course_id + "-" + orderList[d].sub_course_id);
      if (n) {

      } else {
        courseidsubcourseidArr.push(orderList[d].course_id + "-" + orderList[d].sub_course_id);
        orderListF.push(orderList[d]);
      }

    }

    res.json({ "orderList": orderListF });

  }).sort({ 'created_on': -1 });




});

//  order end




/////////////////////// topic start//////////////////////////////////////////


router.get('/topic/:limitInOneTime/:skipDocument/:totalRecord', (req, res, next) => {


  var limitInOneTime = +req.params.limitInOneTime;
  var skipDocument = +req.params.skipDocument;
  var totalRecord = +req.params.totalRecord;


  if (totalRecord == 0) {


    Topics.countDocuments({ "tablestatus": "TRUE" }, function (err, count) {
      //

      Topics.find({ "tablestatus": "TRUE" }, function (err, topicList) {
        res.json({ "topicList": topicList, "totalRecord": count });
      }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);

      //
    }).count();


  } else {

    Topics.find({ "tablestatus": "TRUE" }, function (err, topicList) {
      res.json({ "topicList": topicList, "totalRecord": totalRecord });
    }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);
  }








});

router.get('/topicbyid/:id', (req, res, next) => {
  Topics.findOne({ $and: [{ "tablestatus": "TRUE" }, { "_id": req.params.id }] }, function (err, TopicOne) {
    res.json(TopicOne);
  });
});
router.post('/searchTopics', (req, res, next) => {


  var limitInOneTime = +req.body.limitInOneTime;
  var skipDocument = +req.body.skipDocument;
  var totalRecord = +req.body.totalRecord;
  let searchArr = [];

  if (req.body.topic_name) {
    searchArr.push({ "topic_name": { '$regex': req.body.topic_name.trim(), '$options': 'i' } });
  }

  if (req.body.course_id) {
    searchArr.push({ "course_id": req.body.course_id });
  }
  if (req.body.sub_course_id) {
    searchArr.push({ "sub_course_id": req.body.sub_course_id });
  }




  searchArr.push({ "tablestatus": 'TRUE' });


  if (totalRecord == 0) {


    Topics.countDocuments({ $and: searchArr }, function (err, count) {
      //

      Topics.find({ $and: searchArr }, function (err, topicList) {
        res.json({ "topicList": topicList, "totalRecord": count });
      }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);

      //
    }).count();


  } else {

    Topics.find({ $and: searchArr }, function (err, topicList) {
      res.json({ "topicList": topicList, "totalRecord": totalRecord });
    }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);
  }


});
router.post('/topic', (req, res, next) => {


  Topics.find({ $and: [{ "sub_course_id": req.body.sub_course_id }, { "course_id": req.body.course_id }, { "topic_name": req.body.topic_name }, { "tablestatus": "TRUE" }] }, function (err, Videolist) {
    if (Videolist.length > 0) {
      res.json({ message: "Topic Already Exists !!", status: "ERROR", newtopic: {} });

    } else {


      let newTopicOBJ = new Topics({
        course_id: req.body.course_id,
        sub_course_id: req.body.sub_course_id,


        topic_name: req.body.topic_name,

        adding_date: new_Date(),
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


router.put('/topic', (req, res, next) => {


  Topics.find({ $and: [{ "sub_course_id": req.body.sub_course_id }, { "course_id": req.body.course_id }, { "topic_name": req.body.topic_name }, { "tablestatus": "TRUE" }, { "_id": { $ne: req.body._id } }] }, function (err, Videolist) {
    if (Videolist.length > 0) {
      res.json({ message: "Topic Already Exists !!", status: "ERROR" });

    } else {


      let updatedobj = {

        course_id: req.body.course_id,
        sub_course_id: req.body.sub_course_id,


        topic_name: req.body.topic_name,

        'updated_by': created_by,
        'updated_on': new Date()
      };
      Topics.updateOne({ '_id': req.body._id }, { $set: updatedobj }, (err, topic) => {
        if (err) {
          res.json({ message: "Something is wrong " + err, status: "ERROR" });
        } else {



          let updatedobj_topicrelatedthingsAlsoInVideoTable = {

            course_id: req.body.course_id,
            sub_course_id: req.body.sub_course_id,


            topic_name: req.body.topic_name,

          };
          Videos.updateMany({ 'topic_id': req.body._id }, { $set: updatedobj_topicrelatedthingsAlsoInVideoTable }, (er1r, vide) => {
            if (er1r) {
              res.json({ message: "Something is wrong in updated video table " + er1r, status: "ERROR" });
            } else {
              res.json({ message: "Topic Updated Successfully !!", status: "SUCCESS" });

            }
          });



        }
      });
    }
  });

});



router.delete('/topic/:id', (req, res, next) => {


  Videos.find({ "tablestatus": "TRUE", "topic_id": req.params.id }, function (err, Videolist) {

    if (Videolist.length > 0) {
      res.json({ message: "First  delete videos under this topic ", status: "ERROR" });
    } else {
      Topics.updateOne({ '_id': req.params.id }, { $set: { 'tablestatus': 'FALSE', 'deleted_by': created_by, 'deleted_on': new Date() } }, (err, v) => {
        if (err) {
          res.json({ message: "Something is wrong", status: "ERROR" });
        } else {
          res.json({ message: "Topic Deleted Successfully !!", status: "SUCCESS" });

        }
      });
    }

  });





});


/////////////////////// topic end//////////////////////////////////////////




/////////////////////// video start//////////////////////////////////////////



router.post('/certificateGenerated', (req, res, next) => {

  var c_id_int = req.body.c_id_int;
  var courseobj = req.body.courseobj;



  update = { "$set": {} };


  update["$set"]["course." + req.body.course_index + ".generated"] = true;

  Clients.updateOne({ 'c_id_int': c_id_int }, update, (err, client) => {
    if (err) {
      res.json({ message: "Something is wrong " + err, status: "ERROR" });
    } else {
      res.json({ message: "Certificate generated successfully !!", status: "SUCCESS", client: client });
    }
  });



});



router.post('/updatethisCoursetoCompleteBecauseAllVideoOrPdfSeen', (req, res, next) => {

  var c_id_int = req.body.c_id_int;
  var courseobj = req.body.courseobj;
  var _id = req.body._id;

  //when giving certificayte for course completion then updting course completed or not and issue certificate and updating final_status   pass forcefully





  update = { "$set": {} };

  if (courseobj.certificate_type == 'After_Course_Completion') {
    update["$set"]["course." + req.body.course_index + ".certificate_issued"] = 'YES';
    update["$set"]["course." + req.body.course_index + ".certificate_issued_date"] = changedateformat(new_Date());
    update["$set"]["course." + req.body.course_index + ".final_status"] = 'Pass';
    update["$set"]["course." + req.body.course_index + ".course_status"] = 'Completed';
  } else {
    // when case is self paced and gining after exam only then  update course_status and then is course_status in  but final_status is penin  then take exam
    update["$set"]["course." + req.body.course_index + ".course_status"] = 'Completed';

    var ending_date = new Date();

    ending_date = changedateformat(ending_date);

    update["$set"]["course." + req.body.course_index + ".ending_date"] = ending_date; // according to this ending date question will be assigned automticaaly
  }



  Clients.updateOne({ 'c_id_int': c_id_int }, update, (err, client) => {
    if (err) {
      res.json({ message: "Something is wrong " + err, status: "ERROR" });
    } else {

      if (courseobj.certificate_type == 'After_Test') {
        let Date1 = new Date();
        let Date_justdate = covertGivenDateWithTime(Date1);
        assignQuestionAutomatciWorking(_id, {}, Date1, Date_justdate, false);
      }
      res.json({ message: "Course status updated successfully !!", status: "SUCCESS", client: client });
    }
  });



});



router.get('/allvideolistofparticularcourse/:sub_course_id', (req, res, next) => {



  Videos.find({ "tablestatus": "TRUE", "active_status": "Publish", "sub_course_id": req.params.sub_course_id }, function (err, Videolist) {

    res.json(Videolist);

  });
});
router.get('/getFromDatabaseThatVideoIsComplete/:c_id_int', (req, res, next) => {
  var c_id_int = +req.params.c_id_int;


  Videoscompletedstatus.find({ $and: [{ "c_id_int": c_id_int }] }, function (err, alreadycompltedVideo) {

    res.json({ 'alreadycompltedVideo': alreadycompltedVideo });


  });
});
router.post('/updateInDatabaseThatVideoIsComplete', (req, res, next) => {


  Videoscompletedstatus.findOne({ $and: [{ "c_id_int": req.body.c_id_int }, { "video_id": req.body.video_id }] }, function (err, alreadyEnteredVideo) {

    if (alreadyEnteredVideo) {
      if (alreadyEnteredVideo.is_completed == 'NO') {

        if (req.body.lasttimetillwatched < alreadyEnteredVideo.lasttimetillwatched && req.body.lasttimetillwatched == 'NO') {
          res.json({ message: "Less time sended ", status: "SUCCESS" });
        } else {




          let updatedobj = {

            lasttimetillwatched: req.body.lasttimetillwatched,
            is_completed: req.body.is_completed,
            'updated_on': new Date()
          };
          Videoscompletedstatus.updateOne({ $and: [{ "c_id_int": req.body.c_id_int }, { "video_id": req.body.video_id }] }, { $set: updatedobj }, (err, video) => {
            if (err) {
              res.json({ message: "Something is wrong " + err, status: "ERROR" });
            } else {
              res.json({ message: "Video Completing Updated Successfully !!", status: "SUCCESS", "updatedobj": updatedobj });

            }
          });
        }
      } else {
        res.json({ message: "Already completed ", status: "SUCCESS" });
      }
    } else {

      let newVideoCompletedOBJ = new Videoscompletedstatus({
        c_id_int: req.body.c_id_int,
        video_id: req.body.video_id,
        lasttimetillwatched: req.body.lasttimetillwatched,
        is_completed: req.body.is_completed,
        created_on: new Date(),

      });
      newVideoCompletedOBJ.save((err, newvideoC) => {
        if (err) {
          res.json({ message: "Something is wrong " + err, status: "ERROR", newvideoC: {} });
        } else {
          res.json({ message: "Video Completing Time Added Successfully !!", status: "SUCCESS", newvideoC: newvideoC });

        }
      });
    }
  });
});

router.post('/updateVideoorder', (req, res, next) => {


  Videos.find({ $and: [{ "order_number": req.body.order_number }, { "sub_course_id": req.body.sub_course_id }, { "course_id": req.body.course_id }, { "topic_id": req.body.topic_id }, { "tablestatus": "TRUE" }, { "_id": { $ne: req.body._id } }] }, function (err, Videolist) {
    if (Videolist.length > 0) {
      res.json({ message: "Order number Already Exists !!", status: "ERROR" });

    } else {


      let updatedobj = {

        order_number: req.body.order_number,
        'updated_by': created_by,
        'updated_on': new Date()
      };
      Videos.updateOne({ '_id': req.body._id }, { $set: updatedobj }, (err, video) => {
        if (err) {
          res.json({ message: "Something is wrong " + err, status: "ERROR" });
        } else {
          res.json({ message: "Video Order Updated Successfully !!", status: "SUCCESS" });

        }
      });
    }
  });
});

router.post('/updateImagePath', (req, res, next) => {


  let updatedobj = {

    imagepath: req.body.imagepath,
    'updated_by': created_by,
    'updated_on': new Date()
  };
  Videos.updateOne({ '_id': req.body._id }, { $set: updatedobj }, (err, video) => {
    if (err) {
      res.json({ message: "Something is wrong " + err, status: "ERROR" });
    } else {
      res.json({ message: "Video Thumbnail Path Updated Successfully !!", status: "SUCCESS" });

    }
  });


});

router.post('/videobygroubbytopic', (req, res, next) => {


  var topicArrtogetInfo = req.body.topicArrtogetInfo;

  var course_id = req.body.course_id;
  var sub_course_id = req.body.sub_course_id;// todo

  var howmanytopicInOneTime = 30;

  if (topicArrtogetInfo.length == 0) {

    Videos.find({ "tablestatus": "TRUE", "active_status": "Publish", "sub_course_id": sub_course_id, "course_id": course_id }, function (err, VideoListFortopicList) {


      var topicArrtogetInfo = [];
      var topicList = [];

      for (let r = 0; r < VideoListFortopicList.length; r++) {

        var a = topicList.indexOf(VideoListFortopicList[r].topic_id);
        if (a == -1) {
          topicList.push(VideoListFortopicList[r].topic_id);

        }
      }

      for (let r = 0; r < topicList.length; r++) {
        if (r < howmanytopicInOneTime) {
          topicArrtogetInfo.push(topicList[r]);

        }
      }


      Videos.find({ $and: [{ "topic_id": { $in: topicArrtogetInfo } }, { "active_status": "Publish" }, { "tablestatus": "TRUE" }] }, function (err, Videolist) {
        var VideolistArr = [];

        var grid = {};
        for (let r = 0; r < Videolist.length; r++) {
          // if(VideolistArr[Videolist[r].topic_id]==undefined){
          var topic_id = Videolist[r].topic_id;
          if (topic_id in grid == false) {
            grid[topic_id] = [];
            grid[topic_id].push(Videolist[r]);
          } else {
            grid[topic_id].push(Videolist[r]);

          }



        }

        res.json({ "VideolistArr": grid, "howmanytopicInOneTime": howmanytopicInOneTime, "topicList": topicList, "topicArrtogetInfo": topicArrtogetInfo });
      }).sort({ order_number: 1 });





    }).sort({ topic_id: 1 });
  } else {
    Videos.find({ $and: [{ "topic_id": { $in: topicArrtogetInfo } }, { "active_status": "Publish" }, { "tablestatus": "TRUE" }] }, function (err, Videolist) {
      var VideolistArr = [];
      var grid = {};
      for (let r = 0; r < Videolist.length; r++) {
        // if(VideolistArr[Videolist[r].topic_id]==undefined){
        var topic_id = Videolist[r].topic_id;
        if (topic_id in grid == false) {
          grid[topic_id] = [];
          grid[topic_id].push(Videolist[r]);
        } else {
          grid[topic_id].push(Videolist[r]);

        }



      }
      res.json({ "VideolistArr": grid });
    }).sort({ order_number: 1 });
  }
});






router.get('/video/:limitInOneTime/:skipDocument/:totalRecord', (req, res, next) => {


  var limitInOneTime = +req.params.limitInOneTime;
  var skipDocument = +req.params.skipDocument;
  var totalRecord = +req.params.totalRecord;


  if (totalRecord == 0) {


    Videos.countDocuments({ "tablestatus": "TRUE" }, function (err, count) {
      //

      Videos.find({ "tablestatus": "TRUE" }, function (err, Videolist) {
        res.json({ "videoList": Videolist, "totalRecord": count });
      }).sort({ order_number: 1 }).limit(limitInOneTime).skip(skipDocument);

      //
    }).count();


  } else {

    Videos.find({ "tablestatus": "TRUE" }, function (err, Videolist) {
      res.json({ "videoList": Videolist, "totalRecord": totalRecord });
    }).sort({ order_number: 1 }).limit(limitInOneTime).skip(skipDocument);
  }








});

router.get('/videobyid/:id', (req, res, next) => {
  Videos.findOne({ $and: [{ "tablestatus": "TRUE" }, { "_id": req.params.id }] }, function (err, VideoOne) {
    res.json(VideoOne);
  });
});
router.post('/searchVideos', (req, res, next) => {


  var limitInOneTime = +req.body.limitInOneTime;
  var skipDocument = +req.body.skipDocument;
  var totalRecord = +req.body.totalRecord;
  let searchArr = [];

  if (req.body.title) {
    searchArr.push({ "title": { '$regex': req.body.title.trim(), '$options': 'i' } });
  }

  if (req.body.course_id) {
    searchArr.push({ "course_id": req.body.course_id });
  }
  if (req.body.sub_course_id) {
    searchArr.push({ "sub_course_id": req.body.sub_course_id });
  }
  if (req.body.details) {
    searchArr.push({ "details": req.body.details.trim() });
  }
  if (req.body.active_status) {
    searchArr.push({ "active_status": req.body.active_status });
  }
  if (req.body.topic_id) {
    searchArr.push({ "topic_id": req.body.topic_id });
  }



  searchArr.push({ "tablestatus": 'TRUE' });


  if (totalRecord == 0) {


    Videos.countDocuments({ $and: searchArr }, function (err, count) {
      //

      Videos.find({ $and: searchArr }, function (err, VideoListSearched) {
        res.json({ "videoList": VideoListSearched, "totalRecord": count });
      }).sort({ order_number: -1 }).limit(10000).skip(skipDocument);

      //
    }).count();


  } else {

    Videos.find({ $and: searchArr }, function (err, VideoListSearched) {
      res.json({ "videoList": VideoListSearched, "totalRecord": totalRecord });
    }).sort({ order_number: -1 }).limit(10000).skip(skipDocument);
  }


});

router.post('/searchVideosAdmin', (req, res, next) => {
  //app me reverse function lgya h isliye admin k liye alag search

  var limitInOneTime = +req.body.limitInOneTime;
  var skipDocument = +req.body.skipDocument;
  var totalRecord = +req.body.totalRecord;
  let searchArr = [];

  if (req.body.title) {
    searchArr.push({ "title": { '$regex': req.body.title.trim(), '$options': 'i' } });
  }

  if (req.body.course_id) {
    searchArr.push({ "course_id": req.body.course_id });
  }
  if (req.body.sub_course_id) {
    searchArr.push({ "sub_course_id": req.body.sub_course_id });
  }
  if (req.body.details) {
    searchArr.push({ "details": req.body.details.trim() });
  }
  if (req.body.active_status) {
    searchArr.push({ "active_status": req.body.active_status });
  }
  if (req.body.topic_id) {
    searchArr.push({ "topic_id": req.body.topic_id });
  }



  searchArr.push({ "tablestatus": 'TRUE' });


  if (totalRecord == 0) {


    Videos.countDocuments({ $and: searchArr }, function (err, count) {
      //

      Videos.find({ $and: searchArr }, function (err, VideoListSearched) {
        res.json({ "videoList": VideoListSearched, "totalRecord": count });
      }).sort({ order_number: 1 }).limit(limitInOneTime).skip(skipDocument);

      //
    }).count();


  } else {

    Videos.find({ $and: searchArr }, function (err, VideoListSearched) {
      res.json({ "videoList": VideoListSearched, "totalRecord": totalRecord });
    }).sort({ order_number: 1 }).limit(limitInOneTime).skip(skipDocument);
  }


});
router.post('/video', (req, res, next) => {


  Videos.find({ $and: [{ "title": req.body.title }, { "tablestatus": "TRUE" }] }, function (err, Videolist) {
    if (Videolist.length > 0) {
      res.json({ message: "Title Already Exists !!", status: "ERROR", newvideo: {} });

    } else {


      let newVideoOBJ = new Videos({
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
        active_status: req.body.active_status,
        videoduration: req.body.videoduration,
        videodurationHMS: req.body.videodurationHMS,

        adding_date: new_Date(),
        created_on: new Date(),
        created_by: created_by,
        tablestatus: 'TRUE'
      });
      newVideoOBJ.save((err, newvideo) => {
        if (err) {
          res.json({ message: "Something is wrong " + err, status: "ERROR", newvideo: {} });
        } else {
          res.json({ message: "Video Added Successfully !!", status: "SUCCESS", newvideo: newvideo });

        }
      });
    }
  });

});


router.put('/video', (req, res, next) => {


  Videos.find({ $and: [{ "title": req.body.title }, { "tablestatus": "TRUE" }, { "_id": { $ne: req.body._id } }] }, function (err, Videolist) {
    if (Videolist.length > 0) {
      res.json({ message: "Title Already Exists !!", status: "ERROR" });

    } else {


      let updatedobj = {
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
        active_status: req.body.active_status,
        videoduration: req.body.videoduration,
        videodurationHMS: req.body.videodurationHMS,
        'updated_by': created_by,
        'updated_on': new Date()
      };
      Videos.updateOne({ '_id': req.body._id }, { $set: updatedobj }, (err, video) => {
        if (err) {
          res.json({ message: "Something is wrong " + err, status: "ERROR" });
        } else {
          res.json({ message: "Video Updated Successfully !!", status: "SUCCESS" });

        }
      });
    }
  });

});



router.delete('/video/:id', (req, res, next) => {
  Videos.updateOne({ '_id': req.params.id }, { $set: { 'tablestatus': 'FALSE', 'deleted_by': created_by, 'deleted_on': new Date() } }, (err, v) => {
    if (err) {
      res.json({ message: "Something is wrong", status: "ERROR" });
    } else {
      res.json({ message: "Video Deleted Successfully !!", status: "SUCCESS" });

    }
  });
});


/////////////////////// video end//////////////////////////////////////////



/// Notifications start
router.get('/deleteAllNotifications', (req, res, next) => {

  Notifications.deleteMany({}, function (err, deletedRes) {
    if (err) {
      res.json({ message: "Something is wrong " + err, status: "ERROR" });
    } else {

      res.json({ message: "Deleted Successfully !!", status: "SUCCESS" });


    }
  });
});

router.get('/updateNotificationStatusToSeenPlusSent_of_today/:c_id_int', (req, res, next) => {

  var c_id_int = req.params.c_id_int;
  let todaysDate = new Date();
  let todaysDate_justdate = changedateformat(todaysDate);

  Notifications.updateMany({ 'to_be_sent_on': { $lte: todaysDate }, 'c_id_int': c_id_int }, { $set: { 'sent_status': true, 'seen_status': true } }, (err, Qr) => {
    if (err) {
      res.json({ message: "Something is wrong", status: "ERROR" });
    } else {




      //  find those notification who were for all so that in front of those notification we can insert c_id_int

      Notifications.find({
        'to_be_sent_on': { $lte: todaysDate }, 'c_id_int': -1, 'tablestatus': 'TRUE'
      }, function (err, Notificationslist_for_all) {

        if (Notificationslist_for_all.length > 0) {
          var error = 0;
          for (let t = 0; t < Notificationslist_for_all.length; t++) {
            let seenbytillnow_c_id_int = Notificationslist_for_all[t].seenbytillnow_c_id_int;
            let sentbytillnow_c_id_int = Notificationslist_for_all[t].sentbytillnow_c_id_int;
            let notifyidInner = Notificationslist_for_all[t]._id;
            seenbytillnow_c_id_int.push(c_id_int);
            sentbytillnow_c_id_int.push(c_id_int);

            // usage example:

            seenbytillnow_c_id_int = seenbytillnow_c_id_int.filter(onlyUnique);
            sentbytillnow_c_id_int = sentbytillnow_c_id_int.filter(onlyUnique);


            Notifications.update({ '_id': notifyidInner }, { $set: { 'seenbytillnow_c_id_int': seenbytillnow_c_id_int, 'sentbytillnow_c_id_int': sentbytillnow_c_id_int } }, (err, updatedN) => {
              if (err) {
                error++;
              } else {

              }
            });



          }
          if (error == 0) {
            res.json({ message: "Notification Status Updated Successfully !!", status: "SUCCESS" });
          } else {
            res.json({ message: "Something is wrong for all", status: "ERROR" });
          }
        } else {
          res.json({ message: "Notification Status Updated Successfully !!", status: "SUCCESS" });
        }




      });
      //  find those notification who were for all so that in front of those notification we can insert c_id_int end














    }
  });



});

router.post('/updateNotificationStatusToSeenPlusSent_by_websitelink', (req, res, next) => {

  var websitelink = req.body.websitelink;
  var c_id_int = req.body.c_id_int;


  Notifications.updateMany({ 'websitelink': websitelink, 'c_id_int': c_id_int }, { $set: { 'sent_status': true, 'seen_status': true } }, (err, Qr) => {
    if (err) {
      res.json({ message: "Something is wrong", status: "ERROR" });
    } else {

      res.json({ message: "Notification Status Updated Successfully !!", status: "SUCCESS" });
    }
  });

});

router.get('/updateNotificationStatusToSeenPlusSent_by_notify_id/:notifyid/:c_id_int', (req, res, next) => {

  var notifyid = req.params.notifyid;
  var c_id_int = req.params.c_id_int;


  Notifications.updateMany({ '_id': notifyid }, { $set: { 'sent_status': true, 'seen_status': true } }, (err, Qr) => {
    if (err) {
      res.json({ message: "Something is wrong", status: "ERROR" });
    } else {


      //  find those notification who were for all so that in front of those notification we can insert c_id_int

      Notifications.find({ 'c_id_int': -1, '_id': notifyid }, function (err, Notificationslist_for_all) {

        if (Notificationslist_for_all.length > 0) {
          var error = 0;
          for (let t = 0; t < Notificationslist_for_all.length; t++) {
            let seenbytillnow_c_id_int = Notificationslist_for_all[t].seenbytillnow_c_id_int;
            let sentbytillnow_c_id_int = Notificationslist_for_all[t].sentbytillnow_c_id_int;
            let notifyidInner = Notificationslist_for_all[t]._id;
            seenbytillnow_c_id_int.push(c_id_int);
            sentbytillnow_c_id_int.push(c_id_int);
            seenbytillnow_c_id_int = seenbytillnow_c_id_int.filter(onlyUnique);
            sentbytillnow_c_id_int = sentbytillnow_c_id_int.filter(onlyUnique);
            Notifications.update({ '_id': notifyidInner }, { $set: { 'seenbytillnow_c_id_int': seenbytillnow_c_id_int, 'sentbytillnow_c_id_int': sentbytillnow_c_id_int } }, (err, updatedN) => {
              if (err) {
                error++;
              } else {

              }
            });



          }
          if (error == 0) {
            res.json({ message: "Notification Status Updated Successfully !!", status: "SUCCESS" });
          } else {
            res.json({ message: "Something is wrong for all", status: "ERROR" });
          }
        } else {
          res.json({ message: "Notification Status Updated Successfully !!", status: "SUCCESS" });
        }




      });
      //  find those notification who were for all so that in front of those notification we can insert c_id_int end
    }
  });

});

router.get('/updateNotificationStatusToSeenPlusSent/:c_id_int/:category', (req, res, next) => {

  var c_id_int = +req.params.c_id_int;
  var category = req.params.category;

  let todaysDate = new Date();
  let todaysDate_justdate = changedateformat(todaysDate);
  Notifications.updateMany({ 'to_be_sent_on': { $lte: todaysDate }, 'category': category, 'c_id_int': c_id_int }, { $set: { 'sent_status': true, 'seen_status': true } }, (err, Qr) => {
    if (err) {
      res.json({ message: "Something is wrong", status: "ERROR" });
    } else {




      //  find those notification who were for all so that in front of those notification we can insert c_id_int

      Notifications.find({ 'to_be_sent_on': { $lte: todaysDate }, 'category': category, 'c_id_int': -1 }, function (err, Notificationslist_for_all) {

        if (Notificationslist_for_all.length > 0) {
          var error = 0;
          for (let t = 0; t < Notificationslist_for_all.length; t++) {
            let seenbytillnow_c_id_int = Notificationslist_for_all[t].seenbytillnow_c_id_int;
            let sentbytillnow_c_id_int = Notificationslist_for_all[t].sentbytillnow_c_id_int;
            let notifyidInner = Notificationslist_for_all[t]._id;
            seenbytillnow_c_id_int.push(c_id_int);
            sentbytillnow_c_id_int.push(c_id_int);
            seenbytillnow_c_id_int = seenbytillnow_c_id_int.filter(onlyUnique);
            sentbytillnow_c_id_int = sentbytillnow_c_id_int.filter(onlyUnique);
            Notifications.update({ '_id': notifyidInner }, { $set: { 'seenbytillnow_c_id_int': seenbytillnow_c_id_int, 'sentbytillnow_c_id_int': sentbytillnow_c_id_int } }, (err, updatedN) => {
              if (err) {
                error++;
              } else {

              }
            });



          }
          if (error == 0) {
            res.json({ message: "Notification Status Updated Successfully !!", status: "SUCCESS" });
          } else {
            res.json({ message: "Something is wrong for all", status: "ERROR" });
          }
        } else {
          res.json({ message: "Notification Status Updated Successfully !!", status: "SUCCESS" });
        }




      });
      //  find those notification who were for all so that in front of those notification we can insert c_id_int end

    }
  });

});


router.get('/listofnotifications/:c_id_int', (req, res, next) => {
  var c_id_int = +req.params.c_id_int;
  let todaysDate = new Date();
  let todaysDate_justdate = changedateformat(todaysDate);
  notificationlistworking(c_id_int, todaysDate_justdate, res);


});


function notificationlistworking(c_id_int, todaysDate_justdate, res) {



  Notifications.find({
    'to_be_sent_on': { $lte: covertGivenDateWithTimeMax(todaysDate_justdate) }, $or: [{ "c_id_int": c_id_int },
    { "c_id_int": -1 }], 'tablestatus': 'TRUE'
  }, function (err, Notificationslist) {
    if (Notificationslist) {

      res.json({ "Notificationslist": Notificationslist, "todays_date": todaysDate_justdate });
    } else {

      res.json({ "Notificationslist": [], "todays_date": todaysDate_justdate });
    }




  }).sort({ 'to_be_sent_on': -1, 'created_on': -1 });


}


router.get('/listofnotificationsSchedule/:c_id_int', (req, res, next) => {
  let todaysDate = new Date();
  let todaysDate_justdate = changedateformat(todaysDate);
  var c_id_int = +req.params.c_id_int;



  Notifications.find({
    'to_be_sent_on': { $gte: covertGivenDateWithTime(todaysDate_justdate) }, $or: [{ "c_id_int": c_id_int },
    { "c_id_int": -1 }], 'tablestatus': 'TRUE'
  }, function (err, Notificationslist) {



    Notifications.find({
      'to_be_sent_on': { $lte: covertGivenDateWithTimeMax(todaysDate_justdate) }, $or: [{ "c_id_int": c_id_int },
      { "c_id_int": -1 }], 'tablestatus': 'TRUE'
    }, function (err, NotificationslistToShowInModule) {
      if (NotificationslistToShowInModule) {

        if (Notificationslist) {
          res.json({ "Notificationslist": Notificationslist, "NotificationslistToShowInModule": NotificationslistToShowInModule, "todays_date": todaysDate_justdate, "server_version_app": server_version_app });
        } else {
          res.json({ "Notificationslist": [], "NotificationslistToShowInModule": NotificationslistToShowInModule, "todays_date": todaysDate_justdate, "server_version_app": server_version_app });
        }
      } else {
        if (Notificationslist) {
          res.json({ "Notificationslist": Notificationslist, "NotificationslistToShowInModule": [], "todays_date": todaysDate_justdate, "server_version_app": server_version_app });
        } else {
          res.json({ "Notificationslist": [], "NotificationslistToShowInModule": [], "todays_date": todaysDate_justdate, "server_version_app": server_version_app });
        }
      }




    }).sort({ 'to_be_sent_on': -1, 'created_on': -1 });







  }).sort({ 'to_be_sent_on': -1, 'created_on': -1 });




});
router.get('/updateNotificationStatusToSent/:c_id_int', (req, res, next) => {
  let todaysDate = new Date();
  let todaysDate_justdate = changedateformat(todaysDate);
  var c_id_int = +req.params.c_id_int;

  Notifications.updateMany({ 'to_be_sent_on': { $lte: todaysDate }, 'c_id_int': c_id_int }, { $set: { 'sent_status': true } }, (err, Qr) => {
    if (err) {
      res.json({ message: "Something is wrong", status: "ERROR" });
    } else {




      //  find those notification who were for all so that in front of those notification we can insert c_id_int

      Notifications.find({ 'to_be_sent_on': { $lte: todaysDate }, 'c_id_int': -1 }, function (err, Notificationslist_for_all) {

        if (Notificationslist_for_all.length > 0) {
          var error = 0;
          for (let t = 0; t < Notificationslist_for_all.length; t++) {

            let sentbytillnow_c_id_int = Notificationslist_for_all[t].sentbytillnow_c_id_int;
            let notifyidInner = Notificationslist_for_all[t]._id;

            sentbytillnow_c_id_int.push(c_id_int);

            sentbytillnow_c_id_int = sentbytillnow_c_id_int.filter(onlyUnique);
            Notifications.update({ '_id': notifyidInner }, { $set: { 'sentbytillnow_c_id_int': sentbytillnow_c_id_int } }, (err, updatedN) => {
              if (err) {
                error++;
              } else {

              }
            });



          }
          if (error == 0) {
            res.json({ message: "Notification Status Updated Successfully !!", status: "SUCCESS" });
          } else {
            res.json({ message: "Something is wrong for all", status: "ERROR" });
          }
        } else {
          res.json({ message: "Notification Status Updated Successfully !!", status: "SUCCESS" });
        }




      });
      //  find those notification who were for all so that in front of those notification we can insert c_id_int end

    }
  });

});

router.get('/generatenotification', (req, res, next) => {


  Clients.find({ "tablestatus": "TRUE" }, function (err, ClientList) {

    if (ClientList.length > 0) {

      for (let t = 0; t < ClientList.length; t++) {

        if (ClientList[t]['course'].length > 0) {
          for (let t_course = 0; t_course < ClientList[t]['course'].length; t_course++) {

            generateAutomoticnotificatios(ClientList[t]['c_id_int'], ClientList[t]['course'][t_course], t_course, "generatenotification-get");

          }
        }
      }
    }

  });
});

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
function generateAutomoticnotificatios(c_id_int, course_obj, course_index, where) {
  console.log(where)
  //notify_about_practice_set_or_test,certificate,next_practice_round
  let searchArr = [{ "course_id": course_obj.course_id }, { "sub_course_id": course_obj.sub_course_id }, { "c_id_int": c_id_int }, { "tablestatus": 'TRUE' }, { generated_type: 'AUTOMATIC' }];

  Course.findOne({ $and: [{ "tablestatus": "TRUE" }, { "_id": course_obj.sub_course_id }] }, function (err, CourseObj) {
    var course_name = "";

    if (CourseObj) {
      if (CourseObj['course_name'] != null) {
        course_name = " for " + CourseObj['course_name'];
      } else {
        course_name = "";
      }

      if (CourseObj['subjectcode'] == "ENGLISH" || CourseObj['subjectcode'] == "ENGLISH1") {
        Notifications.find({ $and: searchArr }, function (err, notificationlist) {
          if (notificationlist.length == 0) {
            var starting_date = course_obj.starting_date;
            var ending_date = course_obj.ending_date;
            var insertArrForNotification = [];

            //////////  practice set and exam
            for (let arr = [], dt = new Date(starting_date); dt <= new Date(ending_date); dt.setDate(dt.getDate() + 1)) {


              var dateDetails = breakDate2(starting_date, ending_date, new Date(dt));

              if (dateDetails.weekOrday == 'Daily') {
                var message = " Practice set" + course_name + " for " + changedateformat_for_string(new Date(dt)) + " is available now !! ";
                var link = "account/examlist/Daily/" + course_index;
              } else if (dateDetails.weekOrday == 'Week') {
                var message = " Week test" + course_name + " for " + changedateformat_for_string(new Date(dt)) + " is available now !! ";
                var link = "account/examlist/Week/" + course_index;
              } else if (dateDetails.weekOrday == 'Final') {
                var message = " Final Test" + course_name + " for " + changedateformat_for_string(new Date(dt)) + " is available now !! ";
                var link = "account/examlist/Final/" + course_index;
              }


              insertArrForNotification.push({
                'to_be_sent_on': covertGivenDateNoTimeInvolved(dt),
                'message': message,
                "test_for_today_always": true,
                "link": link,
                "send_after_hour": 12,
                "category": "exam",
                "day_number": dateDetails.which_day,
                "created_on": new Date(),
                "created_by": created_by,
                "generated_type": 'AUTOMATIC',
                "c_id_int": c_id_int,
                "course_id": course_obj.course_id,
                "sub_course_id": course_obj.sub_course_id,
                'notificationType': "PRACTICE_SET_AND_EXAM",
                "sent_status": false,
                'tablestatus': "TRUE",
                "seen_status": false
              });
            }

            if (insertArrForNotification.length > 0) {
              try {
                Notifications.insertMany(insertArrForNotification);
                console.log({
                  'message': 'Notification inserted Successfully ',
                  'status': 'success'

                });
              } catch (e) {


                console.log({
                  'message': e,
                  'status': 'error'

                });
              }
            } else {

              console.log({
                'message': 'No data found   !!',
                'status': 'error'

              });
            }
            //////////  practice set and exam  end

          }
        });
      }

    }
  });
}
router.post('/updateNotificationStatusToSent', (req, res, next) => {
  var idToUpdateToSentTrueFromFalse = req.body.idToUpdateToSentTrueFromFalse;
  var c_id_int = req.body.c_id_int;
  var updateArr = [];
  updateArr.push({ "_id": { $in: idToUpdateToSentTrueFromFalse } });

  Notifications.updateMany({ $and: updateArr }, { $set: { 'sent_status': true } }, (err, Qr) => {

    if (err) {
      res.json({ message: "Something is wrong " + err, status: "ERROR" });
    } else {


      updateArr.push({ "c_id_int": -1 });
      //  find those notification who were for all so that in front of those notification we can insert c_id_int

      Notifications.find({ $and: updateArr }, function (err, Notificationslist_for_all) {

        if (Notificationslist_for_all.length > 0) {
          var error = 0;
          for (let t = 0; t < Notificationslist_for_all.length; t++) {

            let sentbytillnow_c_id_int = Notificationslist_for_all[t].sentbytillnow_c_id_int;
            let notifyidInner = Notificationslist_for_all[t]._id;

            sentbytillnow_c_id_int.push(c_id_int);
            sentbytillnow_c_id_int = sentbytillnow_c_id_int.filter(onlyUnique);
            Notifications.update({ '_id': notifyidInner }, { $set: { 'sentbytillnow_c_id_int': sentbytillnow_c_id_int } }, (err, updatedN) => {
              if (err) {
                error++;
              } else {

              }
            });
            if (error == 0) {
              res.json({ message: "Notification Status Updated Successfully !!", status: "SUCCESS" });
            } else {
              res.json({ message: "Something is wrong for all", status: "ERROR" });
            }


          }
        } else {
          res.json({ message: "Notification Status Updated Successfully !!", status: "SUCCESS" });
        }




      });
      //  find those notification who were for all so that in front of those notification we can insert c_id_int end

    }
  });
});





//////  notification admin start
router.get('/notificationlistAdmin/:limitInOneTime/:skipDocument/:totalRecord', (req, res, next) => {

  let todaysDate = new_Date();
  var limitInOneTime = +req.params.limitInOneTime;
  var skipDocument = +req.params.skipDocument;
  var totalRecord = +req.params.totalRecord;
  var searchArr = [];
  //searchArr.push({ to_be_sent_on: { $lte:  changedateformat(todaysDate)  } });

  searchArr.push({ "tablestatus": 'TRUE' });

  if (totalRecord == 0) {



    Notifications.countDocuments({ $and: searchArr }, function (err, count) {

      //

      Notifications.find({ $and: searchArr }, function (err, notificationList) {
        res.json({ "notificationList": notificationList, "totalRecord": count });
      }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);

      //
    }).count();


  } else {

    Notifications.find({ $and: searchArr }, function (err, notificationList) {
      res.json({ "notificationList": notificationList, "totalRecord": totalRecord });
    }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);
  }








});

router.get('/getNotifications_byid/:id', (req, res, next) => {
  Notifications.findOne({ $and: [{ "tablestatus": "TRUE" }, { "_id": req.params.id }] }, function (err, NotificationOne) {
    res.json(NotificationOne);
  });
});
router.post('/searchNotifications', (req, res, next) => {

  let todaysDate = new_Date();
  var limitInOneTime = +req.body.limitInOneTime;
  var skipDocument = +req.body.skipDocument;
  var totalRecord = +req.body.totalRecord;
  let searchArr = [];

  if (req.body.message) {
    searchArr.push({ "message": { '$regex': req.body.message.trim(), '$options': 'i' } });
  }
  if (req.body.category) {
    searchArr.push({ "category": req.body.category });
  }
  if (req.body.c_id_int) {
    searchArr.push({ "c_id_int": +req.body.c_id_int });
  }

  if (req.body.from_to_be_sent_on) {
    searchArr.push({ to_be_sent_on: { $gte: covertGivenDateWithTime(req.body.from_to_be_sent_on) } });
  }
  if (req.body.to_to_be_sent_on) {
    searchArr.push({ to_be_sent_on: { $lte: covertGivenDateWithTimeMax(req.body.to_to_be_sent_on) } });
  }


  if (req.body.sent_status) {
    if (req.body.sent_status == 'TRUE') {
      searchArr.push({ "sent_status": true });
    } else {
      searchArr.push({ "sent_status": false });
    }

  } if (req.body.seen_status) {
    if (req.body.seen_status == 'TRUE') {
      searchArr.push({ "seen_status": true });
    } else {
      searchArr.push({ "seen_status": false });
    }

  }

  //searchArr.push({ to_be_sent_on: { $lte:  changedateformat(todaysDate)  } });

  searchArr.push({ "tablestatus": 'TRUE' });


  if (totalRecord == 0) {


    Notifications.countDocuments({ $and: searchArr }, function (err, count) {
      //

      Notifications.find({ $and: searchArr }, function (err, NotificationsListSearched) {
        res.json({ "notificationList": NotificationsListSearched, "totalRecord": count });
      }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);

      //
    }).count();


  } else {

    Notifications.find({ $and: searchArr }, function (err, NotificationsListSearched) {
      res.json({ "notificationList": NotificationsListSearched, "totalRecord": totalRecord });
    }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);
  }


});
router.post('/saveNotifications', (req, res, next) => {





  let newNotificationsOBJ = new Notifications({

    'to_be_sent_on': covertGivenDateNoTimeInvolved(req.body.to_be_sent_on),
    'message': req.body.message.trim(),
    "test_for_today_always": false,
    "link": "",
    "send_after_hour": +req.body.send_after_hour,
    "category": "",
    "day_number": -1,
    "created_on": new Date(),
    "created_by": created_by,
    "generated_type": 'MANUAL',
    "c_id_int": +req.body.c_id_int,
    "course_id": "-1",
    "sub_course_id": "-1",
    'notificationType': "",
    "sent_status": false,
    'tablestatus': "TRUE",
    "seen_status": false
  });
  newNotificationsOBJ.save((err, newNotifications) => {
    if (err) {
      res.json({ message: "Something is wrong " + err, status: "ERROR", newNotifications: {} });
    } else {
      res.json({ message: " Notification submitted successfully  !!", status: "SUCCESS", newNotifications: newNotifications });

    }
  });


});


router.put('/saveNotifications', (req, res, next) => {



  let updatedobj = {
    'to_be_sent_on': req.body.to_be_sent_on,
    'message': req.body.message.trim(),
    "test_for_today_always": false,
    "link": "",
    "send_after_hour": +req.body.send_after_hour,
    "category": "",
    "day_number": -1,

    "generated_type": 'MANUAL',
    "c_id_int": +req.body.c_id_int,
    "course_id": "-1",
    "sub_course_id": "-1",
    'notificationType': "",
    "sent_status": false,
    'tablestatus': "TRUE",
    "seen_status": false,
    'updated_by': created_by,
    'updated_on': new Date()
  };
  Notifications.updateOne({ '_id': req.body._id }, { $set: updatedobj }, (err, notification) => {
    if (err) {
      res.json({ message: "Something is wrong " + err, status: "ERROR" });
    } else {
      res.json({ message: "Notification Updated Successfully !!", status: "SUCCESS" });

    }
  });

});



router.delete('/deleteNotification/:id', (req, res, next) => {
  Notifications.updateOne({ '_id': req.params.id }, { $set: { 'tablestatus': 'FALSE', 'deleted_by': created_by, 'deleted_on': new Date() } }, (err, notification) => {
    if (err) {
      res.json({ message: "Something is wrong", status: "ERROR" });
    } else {
      res.json({ message: "Notification Deleted Successfully !!", status: "SUCCESS" });

    }
  });
});



/////   notification  admin end
// Notifications end











//contact start
router.get('/contact/:limitInOneTime/:skipDocument/:totalRecord', (req, res, next) => {


  var limitInOneTime = +req.params.limitInOneTime;
  var skipDocument = +req.params.skipDocument;
  var totalRecord = +req.params.totalRecord;


  if (totalRecord == 0) {


    contact.countDocuments({ "tablestatus": "TRUE" }, function (err, count) {
      //

      contact.find({ "tablestatus": "TRUE" }, function (err, contactlist) {
        res.json({ "contactlist": contactlist, "totalRecord": count });
      }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);

      //
    }).count();


  } else {

    contact.find({ "tablestatus": "TRUE" }, function (err, contactlist) {
      res.json({ "contactlist": contactlist, "totalRecord": totalRecord });
    }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);
  }








});

router.post('/searchContact', (req, res, next) => {


  var limitInOneTime = +req.body.limitInOneTime;
  var skipDocument = +req.body.skipDocument;
  var totalRecord = +req.body.totalRecord;
  let searchArr = [];

  if (req.body.first_name) {
    searchArr.push({ "first_name": { '$regex': req.body.first_name.trim(), '$options': 'i' } });
  }
  if (req.body.last_name) {
    searchArr.push({ "last_name": { '$regex': req.body.last_name.trim(), '$options': 'i' } });
  }

  if (req.body.email) {
    searchArr.push({ "email": req.body.email.trim() });
  }

  if (req.body.mobile) {
    searchArr.push({ "mobile": req.body.mobile.trim() });
  }

  if (req.body.from_contact_date) {
    searchArr.push({ created_on: { $gte: covertGivenDateWithTime(req.body.from_contact_date) } });
  }
  if (req.body.to_contact_date) {
    searchArr.push({ created_on: { $lte: covertGivenDateWithTimeMax(req.body.to_contact_date) } });
  }




  searchArr.push({ "tablestatus": 'TRUE' });


  if (totalRecord == 0) {


    contact.countDocuments({ $and: searchArr }, function (err, count) {
      //
      contact.find({ $and: searchArr }, function (err, contactlistSearched) {
        res.json({ "contactlist": contactlistSearched, "totalRecord": count });
      }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);
      //
    }).count();

  } else {

    contact.find({ $and: searchArr }, function (err, contactlistSearched) {
      res.json({ "contactlist": contactlistSearched, "totalRecord": totalRecord });
    }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);
  }


});
router.post('/savecontact', (req, res, next) => {

  let newcontactOBJ = new contact(req.body.contact);
  newcontactOBJ.save((err, contatcnew) => {
    if (err) {
      res.json({ message: "Something is wrong " + err, status: "ERROR" });
    } else {

      res.json({ message: " Message submitted successfully !!", status: "success" });

    }
  });
});

// contact end



///website student registartion
router.post('/student_forget_password', (req, res, next) => {
  Clients.findOne({ $and: [{ "email": req.body.email.trim() }, { "tablestatus": "TRUE" }] }, function (err, newStudentObject) {
    if (newStudentObject) {
      var mailOptions = {
        from: myemail,
        to: newStudentObject.email,
        subject: "Forget password " + appname + "  !!",
        html: ' Dear ' + newStudentObject.first_name + ' ' + newStudentObject.last_name + ' <p> Your Password to login in ' + appname + ' is ' + newStudentObject.password + '. </p><br/><br/><br/><b>Team ' + appname + '</b><br/><br/>' + "<img src=" + logopath + ">"
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
router.post('/student_login_from_website', (req, res, next) => {

  Clients.findOne({
    "email": req.body.email.trim(), "password": req.body.password.trim(), 'tablestatus': 'TRUE'
  }, function (err, Client) {
    if (Client) {

      res.json({ message: "Logged In successfully !", status: "SUCCESS", newclient: Client });


    } else {


      res.json({ message: "Email Id or Password is wrong !", status: "ERROR", newclient: {} });

    }
  });

});
router.post('/student_registartion_from_website', (req, res, next) => {

  Clients.findOne({ $and: [{ "email": req.body.email.trim() }, { 'tablestatus': 'TRUE' }] }, function (err, Client) {

    if (Client) {
      res.json({ message: "Email Id already exists !", status: "WARNING", error_reason: 'email' });


    } else {
      var validation = true;

      //first name
      if (!req.body.first_name || req.body.first_name == undefined || req.body.first_name == '') {
        validation = false;
        res.json({ message: "Name is required !", status: "WARNING", error_reason: 'first_name' });
        return false;
      } else {

        if (!isNaN(req.body.first_name)) {
          validation = false;
          res.json({ message: "Name is not valid !", status: "WARNING", error_reason: 'first_name' });
          return false;
        }
      }

      //first name end


      //last name
      // if (!req.body.last_name || req.body.last_name == undefined || req.body.last_name == '') {
      //   validation = false;
      //   res.json({ message: "Last name is required !", status: "WARNING", error_reason: 'last_name' });
      //   return false;
      // } else {

      //   if (!isNaN(req.body.last_name)) {
      //     validation = false;
      //     res.json({ message: "Last name is not valid !", status: "WARNING", error_reason: 'last_name' });
      //     return false;
      //   }
      // }

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

        // if (!passwordvalidation(req.body.password)) {
        //   validation = false;
        //   res.json({ message: "Password is not valid ! Password must be between 7 to 16 characters which contain only characters, numeric digits, underscore and first character must be a letter", status: "WARNING", error_reason: 'password' });
        //   return false;
        // }
      }

      //password end

      //c_password
      if (!req.body.c_password || req.body.c_password == undefined || req.body.c_password == '') {
        validation = false;
        res.json({ message: "Confirm Password is required !", status: "WARNING", error_reason: 'c_password' });
        return false;
      } else {

        // if (!passwordvalidation(req.body.c_password)) {
        //   validation = false;
        //   res.json({ message: "Confirm Password is not valid ! Password must be between 7 to 16 characters which contain only characters, numeric digits, underscore and first character must be a letter", status: "WARNING", error_reason: 'c_password' });
        //   return false;
        // }
      }

      //c_password end

      if (req.body.c_password.trim() !== req.body.password.trim()) {
        validation = false;
        res.json({ message: "Please Confirm Password !", status: "WARNING", error_reason: 'c_password' });
        return false;
      }

      if (validation) {
        Clients.findOne({}, function (err, lastClient) {



          ////
          if (lastClient) {
            var c_id_int = lastClient.c_id_int + 1;
          } else {
            var c_id_int = 1;
          }
          var otp = Math.floor(1000 + Math.random() * 9000);
          //   var otp = 1111;
          let newClientOBJ = new Clients({
            c_id_int: c_id_int,

            email: req.body.email.trim(), mobile: req.body.mobile.trim(), first_name: req.body.first_name.trim(), password: req.body.password.trim(),
            profile_status: 'PENDING',
            app_or_website: 'WEBSITE', login_user_type: req.body.login_user_type,
            profile_verify_otp: otp,
            customer_id_int: 0, his_affilitater_c_id_int: req.body.his_affilitater_c_id_int,
            created_on: new Date(),
            adding_date: changedateformat(new_Date()),
            created_by: created_by,
            "profile_verified": true, "tablestatus": "TRUE"
          });
          newClientOBJ.save((err, client) => {
            if (err) {
              res.json({ message: "Something is wrong ", status: "ERROR", newclient: {}, error_reason: '' });
            } else {
              //    sendEmailAfterRegistrationStudent(client);
              res.json({ message: "Registration is successfull !", status: "SUCCESS", newclient: client });

            }
          });
        }).sort({ c_id_int: -1 });
      }
    }
  });

});
router.post('/student_registartion_from_website_full', (req, res, next) => {

  Clients.findOne({
    $or: [{ "email": req.body.email.trim() },
    { "mobile": req.body.mobile.trim() }], 'tablestatus': 'TRUE'
  }, function (err, Client) {
    if (Client) {
      if (Client.email == req.body.email.trim()) {
        res.json({ message: "Email Id already exists !", status: "WARNING", error_reason: 'email' });
      } else {
        res.json({ message: "Mobile number already exists !", status: "WARNING", error_reason: 'mobile' });
      }


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
        Clients.findOne({}, function (err, lastClient) {



          ////
          if (lastClient) {
            var c_id_int = lastClient.c_id_int + 1;
          } else {
            var c_id_int = 1;
          }
          var otp = Math.floor(1000 + Math.random() * 9000);
          //   var otp = 1111;
          let newClientOBJ = new Clients({
            c_id_int: c_id_int,

            email: req.body.email.trim(), mobile: req.body.mobile.trim(), first_name: req.body.first_name.trim(), last_name: req.body.last_name.trim(), password: req.body.password.trim(),
            profile_status: 'PENDING',
            app_or_website: 'WEBSITE', login_user_type: req.body.login_user_type,
            profile_verify_otp: otp,
            customer_id_int: 0, his_affilitater_c_id_int: req.body.his_affilitater_c_id_int,
            created_on: new Date(),
            adding_date: changedateformat(new_Date()),
            created_by: created_by,
            "profile_verified": true, "tablestatus": "TRUE"
          });
          newClientOBJ.save((err, client) => {
            if (err) {
              res.json({ message: "Something is wrong ", status: "ERROR", newclient: {}, error_reason: '' });
            } else {
              //    sendEmailAfterRegistrationStudent(client);
              res.json({ message: "Registration is successfull !", status: "SUCCESS", newclient: client });

            }
          });
        }).sort({ c_id_int: -1 });
      }
    }
  });

});
router.post('/detailsofstudentbycidint', (req, res, next) => {
  Clients.findOne({ $and: [{ "c_id_int": req.body.c_id_int }, { "tablestatus": "TRUE" }] }, function (err, Client) {
    res.json(Client);


  });
});
router.get('/detailsofstudentbycidint/:c_id_int', (req, res, next) => {
  Clients.findOne({ $and: [{ "c_id_int": req.params.c_id_int }, { "tablestatus": "TRUE" }] }, function (err, Client) {
    res.json(Client);


  });
});
router.post('/resendVerficationCodeToStuddnet', (req, res, next) => {
  Clients.findOne({ $and: [{ "c_id_int": req.body.c_id_int }] }, function (err, Client) {
    if (Client) {

      sendEmailAfterRegistrationStudent(Client);
      res.json({ message: "Verification Code Resent successfully !", status: "SUCCESS", error_reason: '' });



    } else {
      res.json({ message: "Something is wrong !", status: "WARNING", error_reason: '' });
    }


  });
});

router.post('/verifystudentformwebsite', (req, res, next) => {
  Clients.findOne({ $and: [{ "profile_verify_otp": req.body.otp }, { "c_id_int": req.body.c_id_int }] }, function (err, Client) {
    if (Client) {

      Clients.updateOne({ 'c_id_int': req.body.c_id_int }, { $set: { "profile_verified": true, "tablestatus": "TRUE" } }, (err, CUpdated) => {
        if (err) {
          res.json({ message: "Something is wrong!", status: "ERROR" });
        } else {


          res.json({ message: "Email Id Verified Successfully !", status: "SUCCESS" });
        }
      });




    } else {
      res.json({ message: "Verification Code is wrong !", status: "WARNING", error_reason: 'otp' });
    }


  });
});
router.get('/getDetailOfParticularorder/:order_no', (req, res, next) => {
  var order_no = req.params.order_no;
  var searchArr = [];
  searchArr.push({ "order_no": order_no });

  Orders.find({ $and: searchArr }, function (err, orderlist) {


    res.json(orderlist);




  });
});
router.post('/updateorderfromwebsite', (req, res, next) => {


  Clients.findOne({ $and: [{ "c_id_int": req.body.c_id_int }] }, function (err, Client) {
    if (Client) {

      var c_id_int = req.body.c_id_int;
      var bankArr = JSON.parse(req.body.bankArr);
      var order_no = req.body.order_no;
      var cart_array = JSON.parse(req.body.cart_array);
      var his_affilitater_c_id_int = req.body.his_affilitater_c_id_int;
      if (his_affilitater_c_id_int == c_id_int) {
        his_affilitater_c_id_int = -1;
      }
      var total_amount = req.body.totalamount;
      if (cart_array.length > 0) {
        var single_or_multiple = 'Multiple';
      } else {
        var single_or_multiple = 'Single';
      }
      var transaction_id = bankArr['payment_id'];
      var payment_id = bankArr['payment_id'];
      var payment_request_id = bankArr['payment_request_id'];
      if (bankArr['payment_status'] == 'Credit') {
        var order_status = 'SUCCESS';
        var STATUS = 'TXN_SUCCESS';
      } else {
        var order_status = 'FAIL';
        var STATUS = 'TXN_FAIL';

      }
      var coupon = '';
      var couponPercent = 0;
      var datenow = new_Date();
      var ordersaveArr = [];

      for (var t = 0; t < cart_array.length; t++) {
        var amount = cart_array[t].amount;
        var course_id = cart_array[t].course_id;
        var sub_course_id = cart_array[t].sub_course_id;
        /////


        amount = parseFloat(amount).toFixed(2);


        var itemamount = (amount * 100) / 118;
        itemamount = parseFloat(itemamount).toFixed(2);
        if (coupon == '') {
          var discount = 0;

        } else {
          var discount = ((itemamount * couponPercent) / 100);
        }
        discount = (discount).toFixed(2);


        taxableamount = +itemamount - (+discount);
        taxableamount = parseFloat(taxableamount).toFixed(2);

        var igst = +((taxableamount * 18) / 100).toFixed(2);
        var sgst = +((taxableamount * 9) / 100).toFixed(2);
        var cgst = sgst;

        var tottax = igst;


        var paid_amount = (parseFloat(taxableamount) + (tottax)).toFixed(0);

        ordersaveArr.push({

          c_id_int: c_id_int,
          his_affilitater_c_id_int: his_affilitater_c_id_int,
          course_id: course_id,
          sub_course_id: sub_course_id,
          order_no: order_no,
          order_status: 'PENDING',
          single_or_multiple: single_or_multiple,
          total_amount: total_amount,
          coupon: coupon,
          couponPercent: couponPercent,

          amount: amount,
          itemamount: itemamount,
          discount: discount,
          taxableamount: taxableamount,
          igst: igst,
          cgst: cgst,
          sgst: sgst,
          tottax: tottax,
          paid_amount: paid_amount,
          bank_array: [{ "TXNID": transaction_id, "payment_id": payment_id, "payment_request_id": payment_request_id, "STATUS": STATUS }],
          remark: '',
          order_date: datenow,
          created_on: new_Date()
        });


      }



      if (ordersaveArr.length > 0) {

        try {

          console.log(ordersaveArr);
          Orders.insertMany(ordersaveArr);
          res.json({ message: "Order saved Succeessfully ", status: "SUCCESS" });




        } catch (e) {
          res.json({ message: "Order length is 0 ", status: "ERROR" });

        }
      }



    } else {
      res.json({ message: "Client Id Does Not Exists", status: "ERROR" });
    }


  });
});
//// website student registration end
/////////////////////// otp start//////////////////////////////////////////




router.post('/checkMobileExists', (req, res, next) => {

  var appHashString = req.body.appHashString;
  Clients.findOne({ $and: [{ "mobile": req.body.mobile.trim() }, { "tablestatus": "TRUE" }] }, function (err, Client) {
    if (Client) {
      //mobile exists
      if (Client.course.length == 0) {
        sendandSaveOTP(appHashString, req.body.mobile.trim(), "zerocourse", Client.c_id_int, res, '');

      } else {
        sendandSaveOTP(appHashString, req.body.mobile.trim(), "LOGIN", Client.c_id_int, res, Client.first_name);
        let todaysDate = new Date();
        let todaysDate_justdate = covertGivenDateWithTime(todaysDate);


      }


    } else {
      Clients.findOne({}, function (err, lastClient) {



        ////
        if (lastClient) {
          var c_id_int = lastClient.c_id_int + 1;
        } else {
          var c_id_int = 1;
        }


        let newClientOBJ = new Clients({
          c_id_int: c_id_int,

          mobile: req.body.mobile.trim(),
          profile_status: 'PENDING',
          customer_id_int: 0,
          created_on: new Date(),
          adding_date: changedateformat(new_Date()),
          created_by: created_by,
          tablestatus: 'TRUE'
        });
        newClientOBJ.save((err, client) => {
          if (err) {
            res.json({ message: "Something is wrong " + err, status: "ERROR", newclient: {} });
          } else {
            sendandSaveOTP(appHashString, req.body.mobile.trim(), "SIGNIN", c_id_int, res, '');

          }
        });
      }).sort({ c_id_int: -1 });
    }
  });

});
router.post('/re_sendotpwhileloginorsignup', (req, res, next) => {
  var appHashString = req.body.appHashString;
  Clients.findOne({ $and: [{ "mobile": req.body.mobile.trim() }, { "tablestatus": "TRUE" }] }, function (err, Client) {
    if (Client) {
      sendandSaveOTP(appHashString, req.body.mobile.trim(), "RESEND", Client.c_id_int, res, Client.first_name);
    }
  });
});


function sendandSaveOTP(appHashString, mobile, action, c_id_int, res, usernameforlogin) {
  var mobile = mobile.trim();
  OTP.updateMany({ 'otp_status': 'PENDING', 'action': action, 'c_id_int': c_id_int }, { $set: { 'otp_status': 'EXPIRED' } }, (err, Qr) => {
    if (err) {
      res.json({ message: "Something is wrong", status: "ERROR" });
    } else {
      var otp = Math.floor(1000 + Math.random() * 9000);

      if (mobile == '8802010213') {
        var otp = 1111;
      }
      // var otp = 1111;
      let newOTPOBJ = new OTP({
        c_id_int: c_id_int,

        mobile: mobile, action: action,

        otp_status: 'PENDING',
        otp: otp,
        created_on: new_Date()

      });
      newOTPOBJ.save((err, otpnew) => {
        if (err) {
          res.json({ message: "Something is wrong " + err, status: "ERROR", otp: '' });
        } else {
          ///// uncomment this
          var smstext = "<#> Your lesson app OTP is: " + otp + " " + appHashString;
          // var smstext = otp + ' is your OTP verfication code for ' + appname;

          var options = {
            "method": "POST",
            "hostname": "api.msg91.com",
            "port": null,
            "path": "/api/v2/sendsms",
            "headers": {
              "authkey": "147422AELrHbUrjds58e1f859",
              "content-type": "application/json"
            }
          };

          var reqS = http.request(options, function (resS) {
            var chunks = [];

            resS.on("data", function (chunk) {
              chunks.push(chunk);
            });

            resS.on("end", function () {
              var body = Buffer.concat(chunks);

            });
          });

          reqS.write(JSON.stringify({
            sender: 'DPTOTP',
            route: '4',
            country: '91',
            sms:
              [
                { message: encodeURIComponent(smstext), to: [mobile] }
              ]
          }));
          reqS.end();
          //<#> Your ExampleApp code is: 123456 YOUR_APP_HASH_CODE_HERE


          res.json({ smstext: smstext, server_version_app: server_version_app, message: "OTP Added Successfully to " + mobile + " !!", status: "SUCCESS", otp: otp, c_id_int: c_id_int, useraction: action, "usernameforlogin": usernameforlogin });

        }
      });


    }
  });
}


/////////////////////// otp end//////////////////////////////////////////


/////////////////////// COURSES start//////////////////////////////////////////
router.get('/courses', (req, res, next) => {
  Course.find({ $and: [{ "tablestatus": "TRUE" }, { "parent_course": '0' }] }, function (err, Courselist) {
    res.json(Courselist);
  }).sort({ _id: -1 });
});
router.get('/courses_subcourse_both', (req, res, next) => {

  Course.find({ $and: [{ "tablestatus": "TRUE" }, { "wheretoshowinwebsite": { $ne: 'UPCOMING' } }] }, function (err, Courselist) {

    res.json(Courselist);
  }).sort({ _id: 1 });
});
router.get('/courses_subcourse_both_upcomming', (req, res, next) => {

  Course.find({ $and: [{ "tablestatus": "TRUE" }, { "wheretoshowinwebsite": "UPCOMING" }] }, function (err, Courselist) {

    res.json(Courselist);
  }).sort({ _id: 1 });
});

router.post('/course', (req, res, next) => {


  Course.find({ $and: [{ "course_name": req.body.course_name }, { "tablestatus": "TRUE" }, { "parent_course": '0' }] }, function (err, Courselist) {
    if (Courselist.length > 0) {
      res.json({ message: "Course Already Exists !!", status: "ERROR", newcourse: {} });

    } else {
      var is_it_last_level = true; ///  when adding it is always last
      if (req.body.upper_level_id == '') {
        var level_number = 1;

      } else {
        var lastUpperLevel = req.body.upper_level_obj.level_number;
        var level_number = lastUpperLevel + 1;

      }
      let newCourse = new Course({
        course_name: req.body.course_name,
        adding_date: new_Date(),
        created_on: new Date(),
        created_by: created_by,
        parent_course: 0, amount: 0, duration: 0,
        updated_by: 0,
        updated_on: '',
        deleted_by: 0,
        deleted_on: "",
        tablestatus: 'TRUE',
        level_number: level_number,
        upper_level_id: req.body.upper_level_id,
        is_it_last_level: is_it_last_level,
        iconforfirstcategory: req.body.iconforfirstcategory,






      });
      newCourse.save((err, course) => {
        if (err) {
          res.json({ message: "Something is wrong", status: "ERROR", newcourse: {} });
        } else {

          if (req.body.upper_level_id !== '' && req.body.upper_level_obj.is_it_last_level == true) {

            Course.update({ '_id': req.body.upper_level_id }, { $set: { 'is_it_last_level': false } }, (err1, Qr) => {
              if (err1) {
                res.json({ message: "Something is wrong !!", status: "ERROR", newcourse: {} });
              } else {



                res.json({ message: "Course Added Successfully !!", status: "SUCCESS", newcourse: course });

              }

            });





          } else {
            res.json({ message: "Course Added Successfully !!", status: "SUCCESS", newcourse: course });
          }


        }
      });
    }
  });

});
router.put('/course', (req, res, next) => {


  Course.find({ $and: [{ "course_name": req.body.course_name }, { "parent_course": '0' }, { "tablestatus": "TRUE" }, { "_id": { $ne: req.body._id } }] }, function (err, Courselist) {
    if (Courselist.length > 0) {
      res.json({ message: "Course Already Exists !!", status: "ERROR", newcourse: {} });

    } else {
      //   before_upper_level_id 
      if (req.body.upper_level_id == '') {
        var level_number = 1;
        var is_it_last_level = true;
      } else if (req.body.upper_level_id == req.body.before_upper_level_id) {
        var level_number = req.body.before_level_number;
        var is_it_last_level = req.body.before_is_it_last_level;
      } else {
        var lastUpperLevel = req.body.upper_level_obj.level_number;
        var level_number = lastUpperLevel + 1;

        var is_it_last_level = true;

      }
      Course.updateOne({ '_id': req.body._id }, {
        $set: {
          level_number: level_number, iconforfirstcategory: req.body.iconforfirstcategory,

          upper_level_id: req.body.upper_level_id,
          is_it_last_level: is_it_last_level, 'course_name': req.body.course_name, 'updated_by': created_by, 'updated_on': new Date()
        }
      }, (err, course) => {
        if (err) {
          res.json({ message: "Something is wrong", status: "ERROR" });
        } else {

          Questions.updateMany({ 'course_id': req.body._id }, { $set: { 'course_name': req.body.course_name } }, (err, Qr) => {
            if (err) {
              res.json({ message: "Something is wrong", status: "ERROR" });
            } else {

              if (req.body.upper_level_id !== '' && req.body.upper_level_obj.is_it_last_level == true) {

                Course.update({ '_id': req.body.upper_level_id }, { $set: { 'is_it_last_level': false } }, (err1, Qr) => {
                  if (err1) {
                    res.json({ message: "Something is wrong !!", status: "ERROR", newcourse: {} });
                  } else {

                    if (req.body.before_upper_level_id != '' && req.body.before_upper_level_id != req.body.upper_level_id) {

                      Course.find({ $and: [{ "upper_level_id": req.body.before_upper_level_id }, { "parent_course": '0' }, { "tablestatus": "TRUE" }] }, function (err, CourselistM) {
                        if (CourselistM.length > 0) {
                          var here_is_it_last_level = false;
                        } else {
                          var here_is_it_last_level = true;
                        }
                        Course.update({ '_id': req.body.before_upper_level_id }, { $set: { 'is_it_last_level': here_is_it_last_level } }, (err1m, Qr) => {
                          if (err1m) {
                            res.json({ message: "Something is wrong !!", status: "ERROR", newcourse: {} });
                          } else {
                            res.json({ message: "Course Updated Successfully !!", status: "SUCCESS" });
                          }
                        });
                      });

                    } else {
                      res.json({ message: "Course Updated Successfully !!", status: "SUCCESS" });
                    }
                  }

                });
              } else {
                res.json({ message: "Course Updated Successfully !!", status: "SUCCESS" });
              }



            }
          });



        }
      });
    }
  });

});

router.delete('/course/:id', (req, res, next) => {
  Course.findOne({ $and: [{ "_id": req.params.id }] }, function (err, CoursedataBeforeDelete) {

    Course.updateOne({ '_id': req.params.id }, { $set: { 'tablestatus': 'FALSE', 'deleted_by': created_by, 'deleted_on': new Date() } }, (err, course) => {
      if (err) {
        res.json({ message: "Something is wrong", status: "ERROR" });
      } else {


        if (CoursedataBeforeDelete.upper_level_id !== '' && CoursedataBeforeDelete.is_it_last_level == true) {
          Course.find({ $and: [{ "tablestatus": "TRUE" }, { "upper_level_id": CoursedataBeforeDelete.upper_level_id }] }, function (err, CourselistofsameUpperlevel) {
            if (CourselistofsameUpperlevel.length > 0) {
              res.json({ message: "Course Deleted Successfully !!", status: "SUCCESS" });
            } else {
              Course.updateOne({ '_id': CoursedataBeforeDelete.upper_level_id }, { $set: { 'is_it_last_level': true } }, (err, course) => {
                res.json({ message: "Course Deleted Successfully !!", status: "SUCCESS" });

              });
            }
          });
        } else {
          res.json({ message: "Course Deleted Successfully !!", status: "SUCCESS" });
        }


      }
    });
  });
});


/////////////////////// COURSES end//////////////////////////////////////////


/////////////////////// SUB COURSES start//////////////////////////////////////////
router.get('/subcourses', (req, res, next) => {
  Course.find({ $and: [{ "tablestatus": "TRUE" }] }, function (err, Courselist) {
    if (Courselist.length > 0) {
      var subcourseArr = [];
      for (var t = 0; t < Courselist.length; t++) {
        if (Courselist[t]['parent_course'] != '0') {
          for (var tP = 0; tP < Courselist.length; tP++) {
            if (Courselist[tP]['_id'] == Courselist[t]['parent_course']) {
              Courselist[t]['main_course_name'] = Courselist[tP]['course_name'];
            }
          }
          subcourseArr.push(Courselist[t]);
        }

      }
    }


    res.json(subcourseArr);
  }).sort({ _id: -1 });
});


router.get('/subcoursesbyid/:parent_course', (req, res, next) => {
  Course.find({ $and: [{ "tablestatus": "TRUE" }, { "parent_course": req.params.parent_course }] }, function (err, Courselist) {



    res.json(Courselist);
  }).sort({ _id: -1 });
});

function getCourseName(id) {
  Course.findOne({ $and: [{ "tablestatus": "TRUE" }, { "_id": id }] }, function (err, CourseOne) {
    // return CourseOne['course_name'];

  });
}
router.post('/subcourse', (req, res, next) => {


  Course.find({ $and: [{ "course_name": req.body.course_name }, { "parent_course": req.body.main_course_id }, { "tablestatus": "TRUE" }] }, function (err, Courselist) {
    if (Courselist.length > 0) {
      res.json({ message: "Sub Course Already Exists In Selected Main Course !!", status: "ERROR", newcourse: {} });

    } else {

      Course.findOne({ $and: [{ "tablestatus": "TRUE", "parent_course": { $ne: '0' } }] }, function (err, CourselistForInt) {
        if (CourselistForInt) {

          var course_int = CourselistForInt['course_int'] + 1;
        } else {
          var course_int = 0;
        }
        console.log(CourselistForInt);
        let newCourse = new Course({
          course_name: req.body.course_name,
          adding_date: new_Date(),
          course_int: course_int,
          created_on: new Date(),
          created_by: created_by,
          describeArr: req.body.describeArr, rating: req.body.rating,
          parent_course: req.body.main_course_id,
          amount: req.body.amount, pre_amount: req.body.pre_amount,
          showbackground: req.body.showbackground,

          wheretoshowinwebsite: req.body.wheretoshowinwebsite,


          imagepath: req.body.imagepath,
          yourcourse_imagepath: req.body.yourcourse_imagepath,
          teacherimagepath: req.body.teacherimagepath, teacher_email: req.body.teacher_email, teacher_occupation: req.body.teacher_occupation, teacher_about: req.body.teacher_about,
          thumbnailpath: req.body.thumbnailpath, demovideopath: req.body.demovideopath, backgroundimagepath: req.body.backgroundimagepath,
          instructor: req.body.instructor,
          cardArr: req.body.cardArr,
          studentnumber: req.body.studentnumber,
          skilllevel: req.body.skilllevel,
          language: req.body.language,

          sub_title: req.body.language,
          serverpath: serverpath,
          duration: req.body.duration,
          duration_type: req.body.duration_type,
          is_self_paced: req.body.is_self_paced,
          'bonus_subject_id': req.body.bonus_subject_id,

          subjectcode: req.body.subjectcode, subjectstatus: req.body.subjectstatus,
          certificate_type: req.body.certificate_type,

          updated_by: 0,
          updated_on: '',
          deleted_by: 0,
          deleted_on: "",
          tablestatus: 'TRUE'
        });
        newCourse.save((err, course) => {
          if (err) {
            res.json({ message: "Something is wrong" + err, status: "ERROR", newcourse: {} });
          } else {
            res.json({ message: "Sub Course Added Successfully !!", status: "SUCCESS", newcourse: course });

          }
        });

      }).sort({ course_int: -1 });

    }
  });

});


router.put('/subcourse', (req, res, next) => {


  Course.find({ $and: [{ "course_name": req.body.course_name }, { "parent_course": req.body.main_course_id }, { "tablestatus": "TRUE" }, { "_id": { $ne: req.body._id } }] }, function (err, Courselist) {
    if (Courselist.length > 0) {
      res.json({ message: "Sub Course Already Exists In Selected Main Course !!", status: "ERROR", newcourse: {} });

    } else {

      Course.updateOne({ '_id': req.body._id }, {
        $set: {
          cardArr: req.body.cardArr, showbackground: req.body.showbackground, instructor: req.body.instructor, yourcourse_imagepath: req.body.yourcourse_imagepath,
          thumbnailpath: req.body.thumbnailpath,
          teacherimagepath: req.body.teacherimagepath,
          teacher_email: req.body.teacher_email,
          wheretoshowinwebsite: req.body.wheretoshowinwebsite,


          studentnumber: req.body.studentnumber,
          skilllevel: req.body.skilllevel,
          language: req.body.language,
          sub_title: req.body.sub_title,






          teacher_occupation: req.body.teacher_occupation,
          teacher_about: req.body.teacher_about,

          demovideopath: req.body.demovideopath, backgroundimagepath: req.body.backgroundimagepath, imagepath: req.body.imagepath, serverpath: serverpath, 'describeArr': req.body.describeArr, 'rating': req.body.rating, 'parent_course': req.body.main_course_id, subjectstatus: req.body.subjectstatus, certificate_type: req.body.certificate_type, 'course_name': req.body.course_name,
          'subjectcode': req.body.subjectcode,
          'bonus_subject_id': req.body.bonus_subject_id,

          'duration': req.body.duration, duration_type: req.body.duration_type,
          is_self_paced: req.body.is_self_paced, 'amount': req.body.amount, 'pre_amount': req.body.pre_amount, 'updated_by': created_by, 'updated_on': new Date()
        }
      }, (err, course) => {
        if (err) {
          res.json({ message: "Something is wrong", status: "ERROR" });
        } else {
          Questions.updateMany({ 'sub_course_id': req.body._id }, { $set: { 'sub_course_name': req.body.course_name } }, (err, Qr) => {
            if (err) {
              res.json({ message: "Something is wrong", status: "ERROR" });
            } else {



              res.json({ message: "Sub Course Updated Successfully !!", status: "SUCCESS" });

            }
          });

        }
      });
    }
  });

});

router.delete('/subcourse/:id', (req, res, next) => {
  Course.updateOne({ '_id': req.params.id }, { $set: { 'tablestatus': 'FALSE', 'deleted_by': created_by, 'deleted_on': new Date() } }, (err, course) => {
    if (err) {
      res.json({ message: "Something is wrong", status: "ERROR" });
    } else {
      res.json({ message: "Sub Course Deleted Successfully !!", status: "SUCCESS" });

    }
  });
});


/////////////////////// SUB COURSES end//////////////////////////////////////////



/////////////////////// questions start//////////////////////////////////////////


router.get('/question/:limitInOneTime/:skipDocument/:totalRecord', (req, res, next) => {


  var limitInOneTime = +req.params.limitInOneTime;
  var skipDocument = +req.params.skipDocument;
  var totalRecord = +req.params.totalRecord;


  if (totalRecord == 0) {


    Questions.countDocuments({ "tablestatus": "TRUE" }, function (err, count) {
      //

      Questions.find({ "tablestatus": "TRUE" }, function (err, Questionlist) {
        res.json({ "questionList": Questionlist, "totalRecord": count });
      }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);

      //
    }).count();


  } else {

    Questions.find({ "tablestatus": "TRUE" }, function (err, Questionlist) {
      res.json({ "questionList": Questionlist, "totalRecord": totalRecord });
    }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);
  }








});

router.get('/questionbyid/:id', (req, res, next) => {
  Questions.findOne({ $and: [{ "tablestatus": "TRUE" }, { "_id": req.params.id }] }, function (err, QuestionOne) {
    res.json(QuestionOne);
  });
});
router.post('/searchQuestions', (req, res, next) => {


  var limitInOneTime = +req.body.limitInOneTime;
  var skipDocument = +req.body.skipDocument;
  var totalRecord = +req.body.totalRecord;
  let searchArr = [];

  if (req.body.question) {
    searchArr.push({ "question": { '$regex': req.body.question.trim(), '$options': 'i' } });
  }
  if (req.body.category) {
    searchArr.push({ "category": req.body.category });
  }
  if (req.body.course_id) {
    searchArr.push({ "course_name": req.body.course_name });
  }
  if (req.body.sub_course_id) {
    searchArr.push({ "sub_course_name": req.body.sub_course_name });
  }
  if (req.body.audio_line) {
    searchArr.push({ "audio_line": req.body.audio_line.trim() });
  }
  if (req.body.mark) {
    searchArr.push({ "mark": req.body.mark });
  }
  if (req.body.duration_of_question) {
    searchArr.push({ "duration_of_question": req.body.duration_of_question });
  }
  if (req.body.question_type) {
    searchArr.push({ "question_type": req.body.question_type });
  }

  if (req.body.remark) {
    searchArr.push({ "remark": req.body.remark.trim() });
  }
  if (req.body.category != 'Final') {
    if (req.body.level) {
      searchArr.push({ "level": req.body.level });
    }
  }

  if (req.body.day_number) {
    searchArr.push({ "day_number": req.body.day_number });
  }


  searchArr.push({ "tablestatus": 'TRUE' });


  if (totalRecord == 0) {


    Questions.countDocuments({ $and: searchArr }, function (err, count) {
      //

      Questions.find({ $and: searchArr }, function (err, QuestionListSearched) {
        res.json({ "questionList": QuestionListSearched, "totalRecord": count });
      }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);

      //
    }).count();


  } else {

    Questions.find({ $and: searchArr }, function (err, QuestionListSearched) {
      res.json({ "questionList": QuestionListSearched, "totalRecord": totalRecord });
    }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);
  }


});
router.post('/question', (req, res, next) => {


  Questions.find({ $and: [{ "question": req.body.question }, { "tablestatus": "TRUE" }] }, function (err, Questionlist) {
    if (Questionlist.length > 0) {
      res.json({ message: "Question Already Exists !!", status: "ERROR", newquestion: {} });

    } else {
      var question_id_join_query = mwUnique.getUniqueID();

      let newQuestionOBJ = new Questions({
        question: req.body.question,
        question_id_join_query: question_id_join_query,
        course_id: req.body.course_id,
        sub_course_id: req.body.sub_course_id,
        course_name: req.body.course_name,
        sub_course_name: req.body.sub_course_name,

        category: req.body.category,
        level: req.body.level,
        day_number: req.body.day_number,
        options: req.body.options,
        remark: req.body.remark,
        audio_line: req.body.audio_line,
        mark: req.body.mark,
        duration_of_question: req.body.duration_of_question,
        question_type: req.body.question_type,
        adding_date: new_Date(),
        created_on: new Date(),
        created_by: created_by,
        tablestatus: 'TRUE'
      });
      newQuestionOBJ.save((err, question) => {
        if (err) {
          res.json({ message: "Something is wrong " + err, status: "ERROR", newquestion: {} });
        } else {
          res.json({ message: "Question Added Successfully !!", status: "SUCCESS", newquestion: question });

        }
      });
    }
  });

});


router.put('/question', (req, res, next) => {


  Questions.find({ $and: [{ "question": req.body.question }, { "tablestatus": "TRUE" }, { "_id": { $ne: req.body._id } }] }, function (err, Questionlist) {
    if (Questionlist.length > 0) {
      res.json({ message: "Question Already Exists !!", status: "ERROR" });

    } else {
      if (req.body.question_id_join_query == '' || req.body.question_id_join_query == null || req.body.question_id_join_query == undefined) {
        var question_id_join_query = mwUnique.getUniqueID();

      } else {
        var question_id_join_query = req.body.question_id_join_query;
      }

      let updatedobj = {
        question: req.body.question,
        course_id: req.body.course_id,
        sub_course_id: req.body.sub_course_id,
        course_name: req.body.course_name,
        sub_course_name: req.body.sub_course_name,
        question_id_join_query: question_id_join_query,
        category: req.body.category,
        level: req.body.level,
        day_number: req.body.day_number,

        remark: req.body.remark,
        audio_line: req.body.audio_line,
        duration_of_question: req.body.duration_of_question,
        question_type: req.body.question_type,

        mark: req.body.mark,
        options: req.body.options,
        'updated_by': created_by,
        'updated_on': new Date()
      };
      Questions.updateOne({ '_id': req.body._id }, { $set: updatedobj }, (err, question) => {
        if (err) {
          res.json({ message: "Something is wrong " + err, status: "ERROR" });
        } else {
          res.json({ message: "Question Updated Successfully !!", status: "SUCCESS" });

        }
      });
    }
  });

});



router.delete('/question/:id', (req, res, next) => {
  Questions.updateOne({ '_id': req.params.id }, { $set: { 'tablestatus': 'FALSE', 'deleted_by': created_by, 'deleted_on': new Date() } }, (err, question) => {
    if (err) {
      res.json({ message: "Something is wrong", status: "ERROR" });
    } else {

      assigned_questions.updateMany({ 'question_id': req.params.id }, { $set: { 'tablestatus': 'FALSE', 'deleted_by': created_by, 'deleted_on': new Date() } }, (errss, assigned_questions) => {
        if (errss) {
          res.json({ message: "Something is wrong", status: "ERROR" });
        } else {
          res.json({ message: "Question Deleted Successfully !!", status: "SUCCESS" });

        }
      });





    }
  });
});


/////////////////////// questions end//////////////////////////////////////////


///////////////////////  tutorial start//////////////

router.get('/tutorial/:limitInOneTime/:skipDocument/:totalRecord', (req, res, next) => {


  var limitInOneTime = +req.params.limitInOneTime;
  var skipDocument = +req.params.skipDocument;
  var totalRecord = +req.params.totalRecord;


  if (totalRecord == 0) {


    Tutorials.countDocuments({ "tablestatus": "TRUE" }, function (err, count) {
      //

      Tutorials.find({ "tablestatus": "TRUE" }, function (err, tutorialList) {
        res.json({ "tutorialList": tutorialList, "totalRecord": count });
      }).sort({ day_number: -1 }).limit(limitInOneTime).skip(skipDocument);

      //
    }).count();


  } else {

    Tutorials.find({ "tablestatus": "TRUE" }, function (err, tutorialList) {
      res.json({ "tutorialList": tutorialList, "totalRecord": totalRecord });
    }).sort({ day_number: -1 }).limit(limitInOneTime).skip(skipDocument);
  }








});

router.get('/tutorialbyid/:id', (req, res, next) => {
  Tutorials.findOne({ $and: [{ "tablestatus": "TRUE" }, { "_id": req.params.id }] }, function (err, tutorialOne) {
    res.json(tutorialOne);
  });
});
router.post('/searchTut', (req, res, next) => {


  var limitInOneTime = +req.body.limitInOneTime;
  var skipDocument = +req.body.skipDocument;
  var totalRecord = +req.body.totalRecord;
  let searchArr = [];


  if (req.body.course_id) {
    searchArr.push({ "course_id": req.body.course_id });
  }
  if (req.body.sub_course_id) {
    searchArr.push({ "sub_course_id": req.body.sub_course_id });
  } if (req.body.day_number) {
    searchArr.push({ "day_number": req.body.day_number });
  }

  if (req.body.topic) {
    searchArr.push({ "topic": req.body.topic });
  }


  searchArr.push({ "tablestatus": 'TRUE' });


  if (totalRecord == 0) {


    Tutorials.countDocuments({ $and: searchArr }, function (err, count) {
      //

      Tutorials.find({ $and: searchArr }, function (err, tutorialListListSearched) {
        res.json({ "tutorialList": tutorialListListSearched, "totalRecord": count });
      }).sort({ day_number: -1 }).limit(limitInOneTime).skip(skipDocument);

      //
    }).count();


  } else {

    Tutorials.find({ $and: searchArr }, function (err, tutorialListListSearched) {
      res.json({ "tutorialList": tutorialListListSearched, "totalRecord": totalRecord });
    }).sort({ day_number: -1 }).limit(limitInOneTime).skip(skipDocument);
  }


});



router.post('/tutorialintoduction', (req, res, next) => {


  Tutorials.find({ $and: [{ "_id": "introduction" }, { "tablestatus": "TRUE" }] }, function (err, Tutoriallist) {
    if (Tutoriallist.length > 0) {
      let updatedobj = {

        describeArr: req.body.describeArr,

        topic: req.body.topic,

        'updated_by': created_by,
        'updated_on': new Date()
      };
      Tutorials.updateOne({ '_id': "introduction" }, { $set: updatedobj }, (err, tut) => {
        if (err) {
          res.json({ message: "Something is wrong " + err, status: "ERROR" });
        } else {
          res.json({ message: "Introduction Updated Successfully !!", status: "SUCCESS" });

        }
      });

    } else {


      let newTOBJ = new Tutorials({


        _id: "introduction",

        describeArr: req.body.describeArr,

        topic: req.body.topic,

        created_on: new Date(),
        created_by: created_by,
        tablestatus: 'TRUE'
      });
      newTOBJ.save((err, tut) => {
        if (err) {
          res.json({ message: "Something is wrong " + err, status: "ERROR", newtut: {} });
        } else {
          res.json({ message: "Introduction Added Successfully !!", status: "SUCCESS", newtut: tut });

        }
      });
    }
  });

});

router.post('/tutorial', (req, res, next) => {


  Tutorials.find({ $and: [{ "course_id": req.body.course_id }, { "day_number": req.body.day_number }, { "sub_course_id": req.body.sub_course_id }, { "tablestatus": "TRUE" }] }, function (err, Tutoriallist) {
    if (Tutoriallist.length > 0) {
      res.json({ message: "Tutorial Already Exists !!", status: "ERROR" });

    } else {


      let newTOBJ = new Tutorials({

        course_id: req.body.course_id,
        sub_course_id: req.body.sub_course_id,
        describeArr: req.body.describeArr,
        day_number: req.body.day_number,
        topic: req.body.topic,

        created_on: new Date(),
        created_by: created_by,
        tablestatus: 'TRUE'
      });
      newTOBJ.save((err, tut) => {
        if (err) {
          res.json({ message: "Something is wrong " + err, status: "ERROR", newtut: {} });
        } else {
          res.json({ message: "Tutorial Added Successfully !!", status: "SUCCESS", newtut: tut });

        }
      });
    }
  });

});


router.put('/tutorial', (req, res, next) => {


  Tutorials.find({ $and: [{ "course_id": req.body.course_id }, { "day_number": req.body.day_number }, { "sub_course_id": req.body.sub_course_id }, { "tablestatus": "TRUE" }, { "_id": { $ne: req.body._id } }] }, function (err, Tutoriallist) {
    if (Tutoriallist.length > 0) {
      res.json({ message: "Tutorial Already Exists !!", status: "ERROR" });

    } else {


      let updatedobj = {
        course_id: req.body.course_id,
        sub_course_id: req.body.sub_course_id,
        describeArr: req.body.describeArr,
        day_number: req.body.day_number,
        topic: req.body.topic,

        'updated_by': created_by,
        'updated_on': new Date()
      };
      Tutorials.updateOne({ '_id': req.body._id }, { $set: updatedobj }, (err, tut) => {
        if (err) {
          res.json({ message: "Something is wrong " + err, status: "ERROR" });
        } else {
          res.json({ message: "Tutorial Updated Successfully !!", status: "SUCCESS" });

        }
      });
    }
  });

});


router.delete('/tutorial/:id', (req, res, next) => {
  Tutorials.updateOne({ '_id': req.params.id }, { $set: { 'tablestatus': 'FALSE', 'deleted_by': created_by, 'deleted_on': new Date() } }, (err, tut) => {
    if (err) {
      res.json({ message: "Something is wrong", status: "ERROR" });
    } else {
      res.json({ message: "Tutorial Deleted Successfully !!", status: "SUCCESS" });

    }
  });
});
///////////////////////////   tutorial  end//////////////////


/////////////////////// clients start//////////////////////////////////////////


router.put('/updateEmail', (req, res, next) => {
  let updatedobj = {

    email: req.body.email

  };

  Clients.updateOne({ 'c_id_int': req.body.c_id_int }, { $set: updatedobj }, (err, client) => {
    if (err) {
      res.json({ message: "Something is wrong " + err, status: "ERROR" });
    } else {
      res.json({ message: "Email Updated Successfully !!", status: "SUCCESS" });

    }
  });

});

router.get('/clients/:limitInOneTime/:skipDocument/:totalRecord', (req, res, next) => {


  var limitInOneTime = +req.params.limitInOneTime;
  var skipDocument = +req.params.skipDocument;
  var totalRecord = +req.params.totalRecord;


  if (totalRecord == 0) {


    Clients.countDocuments({ "tablestatus": "TRUE" }, function (err, count) {
      //

      Clients.find({ "tablestatus": "TRUE" }, function (err, Clientlist) {
        res.json({ "clientList": Clientlist, "totalRecord": count });
      }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);

      //
    }).count();


  } else {

    Clients.find({ "tablestatus": "TRUE" }, function (err, Clientlist) {
      res.json({ "clientList": Clientlist, "totalRecord": totalRecord });
    }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);
  }
});

router.post('/searchClients', (req, res, next) => {


  var limitInOneTime = +req.body.limitInOneTime;
  var skipDocument = +req.body.skipDocument;
  var totalRecord = +req.body.totalRecord;
  let searchArr = [];

  if (req.body.first_name) {
    searchArr.push({ "first_name": { '$regex': req.body.first_name.trim(), '$options': 'i' } });
  }
  if (req.body.last_name) {
    searchArr.push({ "last_name": { '$regex': req.body.last_name.trim(), '$options': 'i' } });
  }
  if (req.body.customer_id) {

    searchArr.push({ "customer_id": { '$regex': req.body.customer_id.trim(), '$options': 'i' } });
  }
  if (req.body.client_added_by) {

    searchArr.push({ "client_added_by": { '$regex': req.body.client_added_by.trim(), '$options': 'i' } });
  }
  if (req.body.email) {
    searchArr.push({ "email": { '$regex': req.body.email.trim(), '$options': 'i' } });

  }
  if (req.body.c_id_int) {
    searchArr.push({ "c_id_int": req.body.c_id_int });
  }
  if (req.body.mobile) {
    searchArr.push({ "mobile": { '$regex': req.body.mobile.trim(), '$options': 'i' } });

  }
  if (req.body.alternate_mobile) {
    searchArr.push({ "alternate_mobile": { '$regex': req.body.alternate_mobile.trim(), '$options': 'i' } });


  }
  if (req.body.from_reg_date) {
    searchArr.push({ adding_date: { $gte: covertGivenDateWithTime(req.body.from_reg_date) } });
  }
  if (req.body.to_reg_date) {
    searchArr.push({ adding_date: { $lte: covertGivenDateWithTimeMax(req.body.to_reg_date) } });
  }



  var orderSearchobj = {};
  if (req.body.from_order_date) {
    orderSearchobj.order_date = { $gte: covertGivenDateWithTime(req.body.from_order_date) };

  }

  if (req.body.coupon) {
    orderSearchobj.coupon = { $gte: covertGivenDateWithTime(req.body.coupon) };

  }


  var courseSearchobj = {};
  if (req.body.duration) {
    courseSearchobj.duration = req.body.duration;

  }
  if (req.body.duration_type) {
    courseSearchobj.duration_type = req.body.duration_type;

  }
  if (req.body.is_self_paced) {
    courseSearchobj.is_self_paced = req.body.is_self_paced;

  }

  if (req.body.certificate_issued) {
    courseSearchobj.certificate_issued = req.body.certificate_issued;

  }
  if (req.body.course_status) {
    courseSearchobj.course_status = req.body.course_status;

  }
  //
  if (req.body.from_certificate_issued) {
    courseSearchobj.certificate_issued_date = { $gte: covertGivenDateWithTime(req.body.from_certificate_issued) };
    courseSearchobj.certificate_issued = 'YES';
  }

  // inside array search on same key two times does not work
  // if (req.body.to_certificate_issued) {
  //   courseSearchobj.certificate_issued_date = { $lte: covertGivenDateWithTimeMax(req.body.to_certificate_issued) };
  //   courseSearchobj.certificate_issued = 'YES';
  // }


  if (req.body.course_id) {
    courseSearchobj.course_id = req.body.course_id;

  }
  if (req.body.sub_course_id) {
    courseSearchobj.sub_course_id = req.body.sub_course_id;
  }
  if (!isEmpty(courseSearchobj)) {

    searchArr.push({ course: { $elemMatch: courseSearchobj } });

  }

  if (!isEmpty(orderSearchobj)) {

    searchArr.push({ orders: { $elemMatch: orderSearchobj } });

  }

  searchArr.push({ "tablestatus": 'TRUE' });
  console.log(orderSearchobj);


  if (totalRecord == 0) {


    Clients.countDocuments({ $and: searchArr }, function (err, count) {
      //
      Clients.find({ $and: searchArr }, function (err, ClientlistSearched) {
        res.json({ "clientList": ClientlistSearched, "totalRecord": count });
      }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);
      //
    }).count();

  } else {

    Clients.find({ $and: searchArr }, function (err, ClientlistSearched) {
      res.json({ "clientList": ClientlistSearched, "totalRecord": totalRecord });
    }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);
  }


});

router.get('/clientbyid/:id', (req, res, next) => {
  Clients.findOne({ $and: [{ "tablestatus": "TRUE" }, { "_id": req.params.id }] }, function (err, ClientOne) {
    res.json(ClientOne);
  });
});
router.get('/orderbyOrder_no/:order_no', (req, res, next) => {

  var order_no = req.params.order_no;

  Orders.find({
    "order_no": order_no
  }, function (err, orderDetailt) {



    res.json(orderDetailt);

  });





});

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}
router.post('/issue_unissue', (req, res, next) => {

  update = { "$set": {} };

  if (req.body.action == 'YES') {
    update["$set"]["course." + req.body.course_index + ".certificate_issued"] = req.body.action;
    update["$set"]["course." + req.body.course_index + ".certificate_issued_date"] = changedateformat(new_Date());
  } else {
    update["$set"]["course." + req.body.course_index + ".certificate_issued"] = req.body.action;



  }










  Clients.updateOne({ '_id': req.body.clientid }, update, (err, client) => {
    if (err) {
      res.json({ message: "Something is wrong " + err, status: "ERROR" });
    } else {
      if (req.body.action == 'YES') {
        res.json({ message: "Certificate Issued Successfully !!", status: "SUCCESS" });
      } else {
        res.json({ message: "Certificate Un-Issued Successfully !!", status: "SUCCESS" });

      }

    }
  });

});


router.post('/client', (req, res, next) => {

  /// when adding exact cliient then use changedateformat in starting and ending date of course
  Clients.find({ $and: [{ "email": req.body.email }, { "tablestatus": "TRUE" }] }, function (err, Clientlist) {
    if (Clientlist.length > 0 && 1 != 1) {
      res.json({ message: "Email Already Registered !!", status: "ERROR", newclient: {} });

    } else {

      Clients.findOne({}, function (err, lastClient) {



        ////
        if (lastClient) {
          var c_id_int = lastClient.c_id_int + 1;
        } else {
          var c_id_int = 1;
        }


        let newClientOBJ = new Clients({
          c_id_int: c_id_int,
          client_added_by: "Self",
          mobile: req.body.mobile.trim(),
          profile_status: 'PENDING',
          customer_id_int: 0,
          created_on: new Date(),
          adding_date: changedateformat(new_Date()),
          created_by: created_by,
          tablestatus: 'TRUE'
        });
        newClientOBJ.save((err, client) => {
          if (err) {
            res.json({ message: "Something is wrong " + err, status: "ERROR", newclient: {} });
          } else {
            res.json({ message: "Client Added Successfully !!", status: "SUCCESS", newclient: client });

          }
        });
      }).sort({ c_id_int: -1 });

      ////
    }
  });

});



router.post('/updatepasswordstudent', (req, res, next) => {

  var passworddetails = JSON.parse(req.body.passworddetails);
  Clients.findOne({
    'tablestatus': 'TRUE', "c_id_int": passworddetails.c_id_int
  }, function (err, Client) {
    if (Client) {
      var validation = true;
      if (passworddetails.cp !== passworddetails.p) {
        res.json({ message: "please confirm password !", status: "WARNING", error_reason: 'cp' });
        return false;
      }
      if (!passwordvalidation(passworddetails.p)) {
        validation = false;
        res.json({ message: "Password is not valid ! Password must be between 7 to 16 characters which contain only characters, numeric digits, underscore and first character must be a letter", status: "WARNING", error_reason: 'p' });
        return false;
      }

      if (passworddetails.op !== Client.password) {
        res.json({ message: "please enter correct current password !", status: "WARNING", error_reason: 'op' });
        return false;
      }
      if (validation) {
        let updatedobj = {
          password: passworddetails.p,

          'updated_by': created_by,
          'updated_on': new Date()
        };
        Clients.updateOne({ 'c_id_int': passworddetails.c_id_int }, { $set: updatedobj }, (err, client) => {
          if (err) {
            res.json({ message: "Something is wrong , Please try later... !", status: "ERROR" });
          } else {
            res.json({ message: "Password Updated Successfully !!", status: "SUCCESS" });

          }
        });
      } else {
        res.json({ message: "Something is wrong, Please try later.. !", status: "WARNING", error_reason: '' });
      }


    } else {
      res.json({ message: "Something is wrong, Please try later. !", status: "WARNING", error_reason: '' });
    }
  });

});
router.post('/studentupdatefromwebsite', (req, res, next) => {

  var userdetails = JSON.parse(req.body.userdetails);
  Clients.findOne({
    $or: [{ "email": userdetails.email.trim() },
    { "mobile": userdetails.mobile.trim() }], 'tablestatus': 'TRUE', "_id": { $ne: userdetails._id }
  }, function (err, Client) {
    if (Client) {
      if (Client.email == userdetails.email.trim()) {
        res.json({ message: "Email Id already exists !", status: "WARNING", error_reason: 'email' });
      } else {
        res.json({ message: "Mobile number already exists !", status: "WARNING", error_reason: 'mobile' });
      }
    } else {
      let updatedobj = {
        first_name: userdetails.first_name,
        last_name: userdetails.last_name,
        state: userdetails.state,
        city: userdetails.city,
        address: userdetails.address,
        pincode: userdetails.pincode,

        bank: userdetails.bank,
        ifsc: userdetails.ifsc,
        accountnumber: userdetails.accountnumber,


        email: userdetails.email, mobile: userdetails.mobile,
        'updated_by': created_by,
        'updated_on': new Date()
      };
      Clients.updateOne({ '_id': userdetails._id }, { $set: updatedobj }, (err, client) => {
        if (err) {
          res.json({ message: "Something is wrong " + err, status: "ERROR" });
        } else {
          res.json({ message: "Profile Details Updated Successfully !!", status: "SUCCESS" });

        }
      });
    }
  });

});

router.put('/client', (req, res, next) => {


  Clients.find({ $and: [{ "email": req.body.email }, { "tablestatus": "TRUE" }, { "_id": { $ne: req.body._id } }] }, function (err, Clientlist) {
    if (Clientlist.length > 0 && 1 != 1) {
      res.json({ message: "Email Already Exists !!", status: "ERROR" });

    } else {
      let updatedobj = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        state: req.body.state,
        city: req.body.city,
        address: req.body.address, address2: req.body.address2,
        pincode: req.body.pincode,
        alternate_mobile: req.body.alternate_mobile,
        email: req.body.email,
        'updated_by': created_by,
        'updated_on': new Date()
      };
      Clients.updateOne({ '_id': req.body._id }, { $set: updatedobj }, (err, client) => {
        if (err) {
          res.json({ message: "Something is wrong " + err, status: "ERROR" });
        } else {
          res.json({ message: "Client Updated Successfully !!", status: "SUCCESS" });

        }
      });
    }
  });

});
function getOrdercalCulation(amount, state, discount) {

  amount = parseFloat(amount).toFixed(2);


  var itemamount = (amount * 100) / 118;
  itemamount = parseFloat(itemamount).toFixed(2);




  discount = parseFloat(discount).toFixed(2);


  taxableamount = itemamount - discount;
  taxableamount = parseFloat(taxableamount).toFixed(2);

  var igst = +((taxableamount * 18) / 100).toFixed(2);
  var sgst = +((taxableamount * 9) / 100).toFixed(2);
  var cgst = sgst;
  if (state == 'Delhi') {
    var tottax = igst;
  } else {
    var tottax = sgst + cgst;
  }

  var paid_amount = (parseFloat(taxableamount) + (tottax)).toFixed(2);

  return {


    itemamount: itemamount,
    discount: discount,
    taxableamount: taxableamount,
    igst: igst,
    cgst: cgst,
    sgst: sgst,
    tottax: tottax,
    paid_amount: paid_amount,

  };


}

router.post('/client_from_admin', (req, res, next) => {

  /// when adding exact cliient then use changedateformat in starting and ending date of course
  Clients.find({ $and: [{ "mobile": req.body.mobile.trim() }, { "tablestatus": "TRUE" }] }, function (err, Clientlist) {
    if (Clientlist.length > 0) {
      res.json({ message: "Mobile Already Registered !!", status: "ERROR", newclient: {} });

    } else {

      Clients.findOne({}, function (err, lastClient) {

        if (lastClient) {
          var c_id_int = lastClient.c_id_int + 1;
        } else {
          var c_id_int = 1;
        }

        Orders.findOne({}, function (err, lastInvoice) {
          if (lastInvoice) {
            if (lastInvoice.invoice_int) {
              var lastInvoice_int = lastInvoice.invoice_int;
            } else {
              var lastInvoice_int = 0;
            }
            ///  increment is below

          } else {
            var lastInvoice_int = 0; ///  increment is below

          }




          ////


          var courseArrTosave = [];
          var orderArrTosave = [];
          var ordersArr_for_client_table = [];
          var courseArrToNotification = [];
          var orderArrToUpdate = [];
          var courseArrToNotification_remove_from_order_also = [];
          var courseArr = req.body.course;

          for (let t = 0; t < courseArr.length; t++) {
            if (courseArr[t].action_status == "REMOVE") {
              courseArrToNotification_remove_from_order_also.push({ "removeOrderAlso": true, "course_id": courseArr[t].course_id_old, "sub_course_id": courseArr[t].sub_course_id_old });
            } else {
              if (courseArr[t].order_added_by == 'Admin') {
                var x = courseArr[t].duration;
                var ending_date = new Date(changedateformat(new Date(courseArr[t].starting_date)));

                // ending_date.setMonth(ending_date.getMonth() + x);


                if (courseArr[t].duration_type == 'Month') {
                  ending_date.setDate(ending_date.getDate() + (x * 30) - 1);
                } else {
                  ending_date.setDate(ending_date.getDate() + (x) - 1);
                }

                ending_date = changedateformat(ending_date);

                var starting_date = changedateformat(new Date(courseArr[t].starting_date));
                if (courseArr[t].action_status == "New") {
                  var certificate_issued_date = new Date();
                } else {
                  var certificate_issued_date = courseArr[t].certificate_issued_date;
                }

              }
              else {
                var ending_date = courseArr[t].ending_date;
                var starting_date = courseArr[t].starting_date;
                var certificate_issued_date = courseArr[t].certificate_issued_date;
              }

              let courseObjTosave = {
                course_name_at_time_of_purchase: 'No Need',
                sub_course_name_at_time_of_purchase: 'No Need',
                course_id: courseArr[t].course_id,
                sub_course_id: courseArr[t].sub_course_id,
                starting_date: starting_date,



                ending_date: ending_date,


                duration: courseArr[t].duration,
                duration_type: courseArr[t].duration_type,
                is_self_paced: courseArr[t].is_self_paced,
                certificate_issued: courseArr[t].certificate_issued,
                certificate_issued_date: certificate_issued_date,
                course_status: courseArr[t].course_status,
                final_status: courseArr[t].final_status,
                generated: false,
                order_added_by: courseArr[t].order_added_by,
              };
              courseArrTosave.push(courseObjTosave);
              if (courseArr[t].action_status == "New") {
                courseArrToNotification.push(courseObjTosave);

              }


              var order_date = new Date(courseArr[t].payment_recieved_on);
              order_date.setHours(new Date().getHours());
              order_date.setMinutes(new Date().getMinutes());
              order_date.setSeconds(new Date().getSeconds());


              if (courseArr[t].action_status == "OLD") {
                var order_no = courseArr[t].order_no;
                if (courseArr[t].starting_date != courseArr[t].starting_date_old || courseArr[t].course_id != courseArr[t].course_id_old || courseArr[t].sub_course_id != courseArr[t].sub_course_id_old) {

                  courseArrToNotification_remove_from_order_also.push({ "removeOrderAlso": false, "course_id": courseArr[t].course_id_old, "sub_course_id": courseArr[t].sub_course_id_old });
                  courseArrToNotification.push(courseObjTosave);
                }

                var orderObjToupdate = {
                  course_id: courseArr[t].course_id,
                  sub_course_id: courseArr[t].sub_course_id,
                  c_id_int: c_id_int,
                  order_date: order_date,
                  state: req.body.state,
                  amount: courseArr[t].course_cost,
                  discount: courseArr[t].discount_cost,
                  paid_amount: courseArr[t].paid_cost,
                  bank_array: [{ "TXNID": courseArr[t].transaction_id, "STATUS": 'TXN_SUCCESS' }],
                  payment_recieved_on: order_date,
                }

                orderArrToUpdate.push(orderObjToupdate);
              }



              if (courseArr[t].action_status == "New") {
                var order_no = "ORDSLES" + new_Date().getTime();
                lastInvoice_int = parseInt(lastInvoice_int) + 1;
                var invoice_int = lastInvoice_int;
                var invoice = "INV" + FormatNumberLength(invoice_int, 4);
                if (courseArr[t].discount_cost == null || courseArr[t].discount_cost == undefined || courseArr[t].discount_cost == "") {
                  courseArr[t].discount_cost = 0;
                }
                var gstcal = getOrdercalCulation(courseArr[t].course_cost, req.body.state, courseArr[t].discount_cost);
                //console.log(gstcal);

                var orderObjTosave = {
                  itemamount: gstcal.itemamount,

                  taxableamount: gstcal.taxableamount,
                  igst: gstcal.igst,
                  cgst: gstcal.cgst,
                  sgst: gstcal.sgst,
                  tottax: gstcal.tottax,
                  paid_amount: gstcal.paid_amount,
                  course_id: courseArr[t].course_id,
                  sub_course_id: courseArr[t].sub_course_id,
                  c_id_int: c_id_int,
                  order_no: order_no,
                  invoice: invoice,
                  invoice_int: invoice_int,
                  order_date: order_date,
                  order_status: 'SUCCESS',  // 
                  state: req.body.state,
                  amount: courseArr[t].course_cost,
                  discount: courseArr[t].discount_cost,

                  bank_array: [{ "TXNID": courseArr[t].transaction_id, "STATUS": 'TXN_SUCCESS' }],
                  created_on: new Date(),
                  payment_recieved_on: order_date,
                };
                orderArrTosave.push(orderObjTosave);
                // console.log("orderObjTosave");
                //console.log(orderObjTosave);

              }





              ordersArr_for_client_table.push(orderObjTosave);
            }
          }





          Clients.findOne({ $and: [{ "tablestatus": { $ne: 'ANYTHING' } }] }, function (err, lastClientBycustomer_id_int) {
            if (lastClientBycustomer_id_int) {
              var new_customer_id_int = lastClientBycustomer_id_int.customer_id_int + 1;
            } else {
              var new_customer_id_int = 20200401;
            }

            var new_customer_id = "DPA" + new_customer_id_int;

            let newClientOBJ = new Clients({
              c_id_int: c_id_int,
              client_added_by: req.body.client_added_by,
              mobile: req.body.mobile.trim(), password: req.body.password.trim(),
              profile_status: 'COMPELTED',
              customer_id: new_customer_id,
              customer_id_int: new_customer_id_int,
              course: courseArrTosave,
              orders: ordersArr_for_client_table,
              created_on: new Date(),
              adding_date: changedateformat(new_Date()),
              created_by: created_by,
              tablestatus: 'TRUE',

              first_name: req.body.first_name,
              last_name: req.body.last_name,
              state: req.body.state,
              city: req.body.city,
              address: req.body.address, address2: req.body.address2,
              pincode: req.body.pincode,
              alternate_mobile: req.body.alternate_mobile,
              email: req.body.email,


            });


            newClientOBJ.save((err, newclient) => {
              if (err) {
                res.json({ message: "Something is wrong " + err, status: "ERROR", newclient: {} });
              } else {


                if (orderArrTosave.length > 0) {

                  try {
                    Orders.insertMany(orderArrTosave);


                    //console.log("ok in order save");
                  } catch (e) {
                    // console.log("no" + e);

                  }
                }

                // orderObjToupdate

                if (courseArrToNotification.length > 0) {
                  for (let d = 0; d < courseArrToNotification.length; d++) {

                    generateAutomoticnotificatios(c_id_int, courseArrToNotification[d], d, 'client_from_admin-post');
                  }
                }
                if (courseArrToNotification_remove_from_order_also.length > 0) {
                  var errorInremoving = 0;
                  for (let d = 0; d < courseArrToNotification_remove_from_order_also.length; d++) {
                    var removeArr = [];
                    removeArr.push({ "c_id_int": c_id_int, "course_id": courseArrToNotification_remove_from_order_also[d].course_id, "sub_course_id": courseArrToNotification_remove_from_order_also[d].sub_course_id });

                    Notifications.remove({ $and: removeArr }, function (err1, removedobj) {
                      if (err1) {
                        errorInremoving++;
                      } else {
                        if (courseArrToNotification_remove_from_order_also[d].removeOrderAlso) {
                          var removeArr_order = [];
                          removeArr_order.push({ "c_id_int": c_id_int, "course_id": courseArrToNotification_remove_from_order_also[d].course_id, "sub_course_id": courseArrToNotification_remove_from_order_also[d].sub_course_id });

                          Orders.remove({ $and: removeArr_order }, function (err2, removedobjorder) {
                            if (err2) {
                              errorInremoving++;
                            } else {

                            }


                          });
                        }



                      }


                    });
                  }
                  if (errorInremoving > 0) {
                    res.json({ message: "Something is wrong in notification removing or order removing !", status: "ERROR" });
                  }
                  else {
                    /////////////////////para 1  - same in para 2
                    if (orderArrToUpdate.length > 0) {

                      var errorInUpdatingOrder = 0;
                      for (let d = 0; d < orderArrToUpdate.length; d++) {

                        var updatedobjOrder = orderArrToUpdate[d];

                        Orders.updateOne({ 'c_id_int': c_id_int, "course_id": orderArrToUpdate[d].course_id, "sub_course_id": orderArrToUpdate[d].sub_course_id }, { $set: updatedobjOrder }, (err, order) => {
                          if (err) {
                            errorInUpdatingOrder++;
                          } else {

                          }
                        });

                      }
                      if (errorInUpdatingOrder > 0) {
                        res.json({ message: "Something is wrong in updating order. !", status: "ERROR" });
                      }
                      else {
                        res.json({ message: "Client Added Successfully !!", status: "SUCCESS", "newclient": newclient });
                      }
                    } else {
                      res.json({ message: "Client Added Successfully !!", status: "SUCCESS", "newclient": newclient });
                    }
                    /////////////////////para 1 -  same in para 2 end 


                  }

                } else {
                  /////////////////////para 1  - same in para 2
                  if (orderArrToUpdate.length > 0) {

                    var errorInUpdatingOrder = 0;
                    for (let d = 0; d < orderArrToUpdate.length; d++) {

                      var updatedobjOrder = orderArrToUpdate[d];

                      Orders.updateOne({ 'c_id_int': c_id_int, "course_id": orderArrToUpdate[d].course_id, "sub_course_id": orderArrToUpdate[d].sub_course_id }, { $set: updatedobjOrder }, (err, order) => {
                        if (err) {
                          errorInUpdatingOrder++;
                        } else {

                        }
                      });

                    }
                    if (errorInUpdatingOrder > 0) {
                      res.json({ message: "Something is wrong in updating order. !", status: "ERROR" });

                    }
                    else {
                      res.json({ message: "Client Added Successfully !!", status: "SUCCESS", "newclient": newclient });
                    }
                  } else {
                    res.json({ message: "Client Added Successfully !!", status: "SUCCESS", "newclient": newclient });
                  }
                  /////////////////////para 1 -  same in para 2 end 
                }









              }
            });







          }).sort({ customer_id_int: -1 });



        }).sort({ invoice_int: -1 });
      }).sort({ c_id_int: -1 });

      ////
    }
  });

});


router.put('/client_from_admin', (req, res, next) => {


  Clients.find({ $and: [{ "mobile": req.body.mobile.trim() }, { "tablestatus": "TRUE" }, { "_id": { $ne: req.body._id } }] }, function (err, Clientlist) {
    if (Clientlist.length > 0 && 1 != 1) {
      res.json({ message: "Mobile Already Exists !!", status: "ERROR" });

    } else {
      var c_id_int = req.body.c_id_int;

      Orders.findOne({}, function (err, lastInvoice) {
        if (lastInvoice) {
          if (lastInvoice.invoice_int) {
            var lastInvoice_int = lastInvoice.invoice_int;
          } else {
            var lastInvoice_int = 0;
          }
          ///  increment is below

        } else {
          var lastInvoice_int = 0; ///  increment is below

        }

        ////// after that all is same till update object

        var courseArrTosave = [];
        var orderArrTosave = [];
        var ordersArr_for_client_table = [];
        var courseArrToNotification = [];
        var orderArrToUpdate = [];
        var courseArrToNotification_remove_from_order_also = [];
        var courseArr = req.body.course;

        for (let t = 0; t < courseArr.length; t++) {
          if (courseArr[t].action_status == "REMOVE") {
            courseArrToNotification_remove_from_order_also.push({ "removeOrderAlso": true, "course_id": courseArr[t].course_id_old, "sub_course_id": courseArr[t].sub_course_id_old });
          } else {

            if (courseArr[t].order_added_by == 'Admin') {
              var x = courseArr[t].duration;
              var ending_date = new Date(changedateformat(new Date(courseArr[t].starting_date)));

              //  ending_date.setMonth(ending_date.getMonth() + x);


              if (courseArr[t].duration_type == 'Month') {


                ending_date.setDate(ending_date.getDate() + (x * 30) - 1);
              } else {
                ending_date.setDate(ending_date.getDate() + (x) - 1);
              }
              ending_date = changedateformat(ending_date);

              var starting_date = changedateformat(new Date(courseArr[t].starting_date));
              if (courseArr[t].action_status == "New") {
                var certificate_issued_date = new_Date();
              } else {
                var certificate_issued_date = courseArr[t].certificate_issued_date;
              }

            }
            else {
              var ending_date = courseArr[t].ending_date;
              var starting_date = courseArr[t].starting_date;
              var certificate_issued_date = courseArr[t].certificate_issued_date;
            }

            let courseObjTosave = {
              course_name_at_time_of_purchase: 'No Need',
              sub_course_name_at_time_of_purchase: 'No Need',
              course_id: courseArr[t].course_id,
              sub_course_id: courseArr[t].sub_course_id,
              starting_date: starting_date,



              ending_date: ending_date,


              duration: courseArr[t].duration,
              duration_type: courseArr[t].duration_type,
              is_self_paced: courseArr[t].is_self_paced,
              certificate_issued: courseArr[t].certificate_issued,
              certificate_issued_date: certificate_issued_date,
              course_status: courseArr[t].course_status,
              final_status: courseArr[t].final_status,
              generated: false,
              order_added_by: courseArr[t].order_added_by,
            };
            courseArrTosave.push(courseObjTosave);
            if (courseArr[t].action_status == "New") {
              courseArrToNotification.push(courseObjTosave);

            }

            var order_date = new Date(courseArr[t].payment_recieved_on);
            order_date.setHours(new Date().getHours());
            order_date.setMinutes(new Date().getMinutes());
            order_date.setSeconds(new Date().getSeconds());


            if (courseArr[t].action_status == "OLD") {
              var order_no = courseArr[t].order_no;
              if (courseArr[t].starting_date != courseArr[t].starting_date_old || courseArr[t].course_id != courseArr[t].course_id_old || courseArr[t].sub_course_id != courseArr[t].sub_course_id_old) {

                courseArrToNotification_remove_from_order_also.push({ "removeOrderAlso": false, "course_id": courseArr[t].course_id_old, "sub_course_id": courseArr[t].sub_course_id_old });
                courseArrToNotification.push(courseObjTosave);
              }

              var orderObjToupdate = {
                course_id: courseArr[t].course_id,
                sub_course_id: courseArr[t].sub_course_id,
                c_id_int: c_id_int,
                order_date: order_date,
                state: req.body.state,
                amount: courseArr[t].course_cost,
                discount: courseArr[t].discount_cost,
                paid_amount: courseArr[t].paid_cost,
                bank_array: [{ "TXNID": courseArr[t].transaction_id, "STATUS": 'TXN_SUCCESS' }],
                payment_recieved_on: order_date,
              }

              orderArrToUpdate.push(orderObjToupdate);
            }



            if (courseArr[t].action_status == "New") {
              var order_no = "ORDSLES" + new_Date().getTime();
              lastInvoice_int = parseInt(lastInvoice_int) + 1;
              var invoice_int = lastInvoice_int;
              var invoice = "INV" + FormatNumberLength(invoice_int, 4);
              if (courseArr[t].discount_cost == null || courseArr[t].discount_cost == undefined || courseArr[t].discount_cost == "") {
                courseArr[t].discount_cost = 0;
              }

              var gstcal = getOrdercalCulation(courseArr[t].course_cost, req.body.state, courseArr[t].discount_cost);





              var orderObjTosave = {
                itemamount: gstcal.itemamount,

                taxableamount: gstcal.taxableamount,
                igst: gstcal.igst,
                cgst: gstcal.cgst,
                sgst: gstcal.sgst,
                tottax: gstcal.tottax,
                paid_amount: gstcal.paid_amount,
                course_id: courseArr[t].course_id,
                sub_course_id: courseArr[t].sub_course_id,
                c_id_int: c_id_int,
                order_no: order_no,
                order_date: order_date, invoice: invoice, invoice_int: invoice_int,
                order_status: 'SUCCESS',  // 
                state: req.body.state,
                amount: courseArr[t].course_cost,
                discount: courseArr[t].discount_cost,

                bank_array: [{ "TXNID": courseArr[t].transaction_id, "STATUS": 'TXN_SUCCESS' }],
                created_on: new Date(),
                payment_recieved_on: order_date,
              };
              orderArrTosave.push(orderObjTosave);

            }





            ordersArr_for_client_table.push(orderObjTosave);
          }
        }







        let updatedobj = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          state: req.body.state,
          city: req.body.city,
          address: req.body.address, address2: req.body.address2,
          pincode: req.body.pincode,
          alternate_mobile: req.body.alternate_mobile, mobile: req.body.mobile,
          email: req.body.email,
          course: courseArrTosave,
          orders: ordersArr_for_client_table,
          'updated_by': created_by,
          'updated_on': new Date()
        };


        Clients.updateOne({ '_id': req.body._id }, { $set: updatedobj }, (err, client) => {
          if (err) {
            res.json({ message: "Something is wrong " + err, status: "ERROR" });
          } else {


            ///  after this also all is same as above function


            if (orderArrTosave.length > 0) {

              try {
                Orders.insertMany(orderArrTosave);

              } catch (e) {


              }
            }

            // orderObjToupdate

            if (courseArrToNotification.length > 0) {
              for (let d = 0; d < courseArrToNotification.length; d++) {

                generateAutomoticnotificatios(c_id_int, courseArrToNotification[d], d, 'client_from_admin - put');
              }
            }
            if (courseArrToNotification_remove_from_order_also.length > 0) {
              var errorInremoving = 0;
              for (let d = 0; d < courseArrToNotification_remove_from_order_also.length; d++) {
                var removeArr = [];
                removeArr.push({ "c_id_int": c_id_int, "course_id": courseArrToNotification_remove_from_order_also[d].course_id, "sub_course_id": courseArrToNotification_remove_from_order_also[d].sub_course_id });

                Notifications.remove({ $and: removeArr }, function (err1, removedobj) {
                  if (err1) {
                    errorInremoving++;
                  } else {
                    if (courseArrToNotification_remove_from_order_also[d].removeOrderAlso) {



                      var removeArr_order = [];
                      removeArr_order.push({ "c_id_int": c_id_int, "course_id": courseArrToNotification_remove_from_order_also[d].course_id, "sub_course_id": courseArrToNotification_remove_from_order_also[d].sub_course_id });

                      Orders.remove({ $and: removeArr_order }, function (err2, removedobjorder) {
                        if (err2) {
                          errorInremoving++;
                        } else {

                        }


                      });
                    }
                    var removeArr_AssignedQuestion = [];
                    removeArr_AssignedQuestion.push({ "c_id": req.body._id, "course_id": courseArrToNotification_remove_from_order_also[d].course_id, "sub_course_id": courseArrToNotification_remove_from_order_also[d].sub_course_id });

                    assigned_questions.remove({ $and: removeArr_AssignedQuestion }, function (err2, removeArr_AssignedQuestionobj) {
                      if (err2) {
                        errorInremoving++;
                      } else {

                      }


                    });


                  }


                });
              }
              if (errorInremoving > 0) {
                res.json({ message: "Something is wrong in notification removing or order removing !", status: "ERROR" });
              }
              else {
                /////////////////////para 1  - same in para 2
                if (orderArrToUpdate.length > 0) {

                  var errorInUpdatingOrder = 0;
                  for (let d = 0; d < orderArrToUpdate.length; d++) {

                    var updatedobjOrder = orderArrToUpdate[d];

                    Orders.updateOne({ 'c_id_int': c_id_int, "course_id": orderArrToUpdate[d].course_id, "sub_course_id": orderArrToUpdate[d].sub_course_id }, { $set: updatedobjOrder }, (err, order) => {
                      if (err) {
                        errorInUpdatingOrder++;
                      } else {

                      }
                    });

                  }
                  if (errorInUpdatingOrder > 0) {
                    res.json({ message: "Something is wrong in updating order. !", status: "ERROR" });
                  }
                  else {
                    res.json({ message: "Client Added Successfully !!", status: "SUCCESS" });
                  }
                } else {
                  res.json({ message: "Client Added Successfully !!", status: "SUCCESS" });
                }
                /////////////////////para 1 -  same in para 2 end 


              }

            } else {
              /////////////////////para 1  - same in para 2
              if (orderArrToUpdate.length > 0) {

                var errorInUpdatingOrder = 0;
                for (let d = 0; d < orderArrToUpdate.length; d++) {

                  var updatedobjOrder = orderArrToUpdate[d];

                  Orders.updateOne({ 'c_id_int': c_id_int, "course_id": orderArrToUpdate[d].course_id, "sub_course_id": orderArrToUpdate[d].sub_course_id }, { $set: updatedobjOrder }, (err, order) => {
                    if (err) {
                      errorInUpdatingOrder++;
                    } else {

                    }
                  });

                }
                if (errorInUpdatingOrder > 0) {
                  res.json({ message: "Something is wrong in updating order. !", status: "ERROR" });

                }
                else {
                  res.json({ message: "Client Added Successfully !!", status: "SUCCESS" });
                }
              } else {
                res.json({ message: "Client Added Successfully !!", status: "SUCCESS" });
              }
              /////////////////////para 1 -  same in para 2 end 
            }







          }
        });
      }).sort({ invoice_int: -1 });
    }
  });

});



router.delete('/client/:id', (req, res, next) => {
  Clients.updateOne({ '_id': req.params.id }, { $set: { 'tablestatus': 'FALSE', 'deleted_by': created_by, 'deleted_on': new Date() } }, (err, client) => {
    if (err) {
      res.json({ message: "Something is wrong", status: "ERROR" });
    } else {
      res.json({ message: "Client Deleted Successfully !!", status: "SUCCESS" });

    }
  });
});






/////////////////////// clients end//////////////////////////////////////////





/////   assign question to client automatic  start

router.get('/assignQuestion/:id', (req, res, next) => {
  let todaysDate = new Date();
  let todaysDate_justdate = covertGivenDateWithTime(todaysDate);

  assignQuestionAutomatciWorking(req.params.id, res, todaysDate, todaysDate_justdate, true);

});
router.get('/assignQuestion/:id/:date', (req, res, next) => {
  //console.log("Working now for  admin " + req.params.date);

  let Date1 = new Date(req.params.date);
  let Date_justdate = covertGivenDateWithTime(Date1);
  assignQuestionAutomatciWorking(req.params.id, res, Date1, Date_justdate, true);

});
function assignQuestionAutomatciWorking(_id, res, todaysDate, todaysDate_justdate, can_show_result) {
  //console.log("Working now for " + todaysDate + " and only date " + todaysDate_justdate);


  var maxleveloftest = 2;
  //_id='5e81b517bb7bed53b87f02ee';

  if (_id == 0) {
    var clientsearchArr = [{ "tablestatus": "TRUE" }, { "customer_id_int": { $ne: 0 } }];

  } else {
    var clientsearchArr = [{ "_id": _id }];
  }
  Clients.find({ $and: clientsearchArr }, { _id: 1, course: 1, first_name: 1 }, function (err, ClientList) {
    ///

    if (ClientList.length > 0) {

      for (let t = 0; t < ClientList.length; t++) {

        if (ClientList[t]['course'].length > 0) {
          for (let t_course = 0; t_course < ClientList[t]['course'].length; t_course++) {


            if (ClientList[t]['course'][t_course]['course_status'] == 'Running' || ClientList[t]['course'][t_course]['is_self_paced'] == true) {


              assigned_questions.find({ $and: [{ "c_id": ClientList[t]['_id'] }, { "course_id": ClientList[t]['course'][t_course]['course_id'] }, { "sub_course_id": ClientList[t]['course'][t_course]['sub_course_id'] }, { "exam_date": todaysDate_justdate }, { "tablestatus": "TRUE" }] }, function (err, todaysQuestionForParticularcourse) {

                var weekOrday_week_Object = breakDate_for_assignQuestionAutomatciWorking(ClientList[t]['course'][t_course], ClientList[t]['course'][t_course]['starting_date'], ClientList[t]['course'][t_course]['ending_date'], todaysDate_justdate);
                //console.log(weekOrday_week_Object);
                var level = weekOrday_week_Object.weekNo;
                var day_number = weekOrday_week_Object.day_number;
                var day_number_to_save = weekOrday_week_Object.day_number;
                var category = weekOrday_week_Object.weekOrday;

                if (category == 'Daily') {
                  var perDayQuestion = 200;
                } else {
                  var perDayQuestion = 200;
                }
                if (category == 'Final') {
                  day_number = 0;
                }
                var questionnumerAssignPerDay = perDayQuestion * maxleveloftest;
                if (todaysQuestionForParticularcourse.length < questionnumerAssignPerDay) {
                  let alreadyQuestionNumer = todaysQuestionForParticularcourse.length;
                  var howmuchquestionremainigntoassignperday = questionnumerAssignPerDay - todaysQuestionForParticularcourse.length;
                  //for this client get already assigned question id for ever so that question does not repeat start


                  assigned_questions.find({ $and: [{ "c_id": ClientList[t]['_id'] }, { "tablestatus": "TRUE" }] }, function (err, ClientQuestionsList) {
                    let arrayOfThosequestionalreadyAssignedtothisclient = [];


                    if (ClientQuestionsList.length > 0) {
                      for (let tal = 0; tal < ClientQuestionsList.length; tal++) {
                        if (ClientQuestionsList[tal]['question_id'] == '5e8907430968cc40e96951f9') {
                          // //console.log("found");

                        }
                        arrayOfThosequestionalreadyAssignedtothisclient.push(ClientQuestionsList[tal]['question_id']);
                      }
                    }


                    //for this client get already assigned question id for ever so that question does not repeat  end



                    Questions.find({ $and: [{ "_id": { $nin: arrayOfThosequestionalreadyAssignedtothisclient } }, { "tablestatus": "TRUE" }, { "category": category }, { "level": level }, { "day_number": day_number }, { "sub_course_id": ClientList[t]['course'][t_course]['sub_course_id'] }, { "course_id": ClientList[t]['course'][t_course]['course_id'] }] }, { _id: 1, question_id_join_query: 1 }, function (err, newQuestionList) {
                      if (newQuestionList.length > 0) {
                        shuffle(newQuestionList);
                        for (let Qi = 0; Qi < newQuestionList.length; Qi++) {

                          alreadyQuestionNumer++;

                          var remainderForQuestionLevel = alreadyQuestionNumer / perDayQuestion;


                          if (parseInt(remainderForQuestionLevel) === remainderForQuestionLevel) {
                            test_level = parseInt(remainderForQuestionLevel);
                          } else {
                            test_level = parseInt(remainderForQuestionLevel) + 1;
                          }



                          if (category == 'Final') {
                            var exam_date = new Date(ClientList[t]['course'][t_course]['ending_date']);
                          } else {

                            var exam_date = new Date(ClientList[t]['course'][t_course]['starting_date']);
                            //console.log(exam_date);
                            exam_date.setDate(exam_date.getDate() + (day_number) - 1);

                          }

                          //console.log(exam_date);
                          let newQAssign = new assigned_questions({
                            c_id: ClientList[t]['_id'],
                            question_id: newQuestionList[Qi]['_id'],
                            question_id_join_query: newQuestionList[Qi]['question_id_join_query'],
                            category: category,
                            level: level,
                            day_number: day_number_to_save,
                            submitted: false,
                            created_on: new Date(),
                            created_by: created_by,
                            exam_date: exam_date,
                            test_level: test_level,
                            course_id: ClientList[t]['course'][t_course]['course_id'],
                            sub_course_id: ClientList[t]['course'][t_course]['sub_course_id'],
                            review_status: "PENDING",
                            tablestatus: 'TRUE'
                          });



                          var errorcount = 0;
                          newQAssign.save((err, newAssined) => {
                            if (err) {
                              errorcount++;
                              //console.log({ message: "Something is wrong " + err, status: "ERROR", newAssined: {} });
                              if (ClientList.length == 1 && ClientList[t]['course'].length == 1 && newQuestionList.length == 1) {
                                if (can_show_result) {
                                  // res.json({ message: "Something is wrong " + err, status: "ERROR", newAssined: {} });
                                }


                              }
                            } else {
                              //console.log('weekOrday_week_Object');

                              //console.log(weekOrday_week_Object);
                              //console.log(newAssined);

                              if (category == 'Final') {
                                Clients.updateOne({ '_id': _id, 'course.course_id': ClientList[t]['course'][t_course]['course_id'], 'course.sub_course_id': ClientList[t]['course'][t_course]['sub_course_id'] },
                                  { $set: { 'course.$.course_status': 'Completed' } }, (err, clientUpdtafinal) => {
                                    if (err) {
                                      errorcount++;
                                      if (ClientList.length == 1 && ClientList[t]['course'].length == 1 && newQuestionList.length == 1) {
                                        if (can_show_result) {
                                          //res.json({ message: "Something is wrong " + err, status: "ERROR", newAssined: {} });
                                        }
                                      }
                                    } else {

                                      var returnobj = { message: "Question Assigned Successfully for final!!.", status: "SUCCESS", newAssined: newAssined };

                                      //console.log(returnobj);
                                      //console.log(clientUpdtafinal);

                                      if (ClientList.length == 1 && ClientList[t]['course'].length == 1 && newQuestionList.length == 1) {
                                        if (can_show_result) {
                                          //   res.json(returnobj); 
                                        }
                                      }

                                    }
                                  });
                              } else {
                                var returnobj = { message: "Question Assigned Successfully !!..", status: "SUCCESS", newAssined: newAssined };

                                //console.log(returnobj);
                                if (ClientList.length == 1 && ClientList[t]['course'].length == 1 && newQuestionList.length == 1) {
                                  if (can_show_result) {
                                    //   res.json(returnobj); 
                                  }
                                }
                              }

                              removeDuplicateAssignedBycustomer(ClientList[t]['c_id']);


                            }
                          });


                        }
                        if (ClientList.length == 1 && ClientList[t]['course'].length == 1) {
                          if (errorcount == 0) {
                            var returnobj = { message: "Question Assigned Successfully !! ...", status: "SUCCESS", newAssined: {} };

                            if (can_show_result) {
                              //res.json(returnobj); 
                            }
                          } else {
                            if (can_show_result) {
                              // res.json({ message: "Something is wrong " + err, status: "ERROR", newAssined: {} });
                            }

                          }

                        }
                      }
                      else {
                        var returnobj = { message: "No question found to assign client " + ClientList[t]['first_name'] + " sub_course_id " + ClientList[t]['course'][t_course]['sub_course_id'] + " Course Id - " + ClientList[t]['course'][t_course]['course_id'] + " Level - " + level + " Day Number - " + day_number + " Category  - " + category + ", oject - " + JSON.stringify(weekOrday_week_Object), status: "ERROR" };
                        //console.log(returnobj);
                        if (ClientList.length == 1 && ClientList[t]['course'].length == 1) {
                          if (can_show_result) {
                            // res.json(returnobj); 
                          }
                        }
                      }
                    }).limit(howmuchquestionremainigntoassignperday);
                  });
                }
                else {

                  var returnobj = { message: "Question Already assigned " + todaysDate_justdate, status: "ERROR" };
                  //console.log(returnobj);
                  if (ClientList.length == 1 && ClientList[t]['course'].length == 1) {
                    if (can_show_result) {
                      // res.json(returnobj); 
                    }
                  }
                }
              });
            } else {
              var returnobj = { message: "No running course found of client " + ClientList[t]['first_name'], status: "ERROR" };
              //console.log(returnobj);
              if (ClientList.length == 1) {
                if (can_show_result) {
                  //  res.json(returnobj);
                }
              }
            }
          }
        } else {



          var returnobj = { message: "No course found of client " + ClientList[t]['first_name'], status: "ERROR" };
          //console.log(returnobj);
          if (ClientList.length == 1) {
            if (can_show_result) {
              // res.json(returnobj); 
            }
          }
        }

      }
    } else {

      var returnobj = { message: "No client found ", status: "ERROR" };
      //console.log(returnobj);
      if (can_show_result) {
        //res.json(returnobj); 
      }
    }


    ///
  });



}


function shuffle(arra1) {
  var ctr = arra1.length, temp, index;

  // While there are elements in the array
  while (ctr > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * ctr);
    // Decrease ctr by 1
    ctr--;
    // And swap the last element with it
    temp = arra1[ctr];
    arra1[ctr] = arra1[index];
    arra1[index] = temp;
  }
  return arra1;
}
/////  assign question to client automatic  end

router.get('/deleteduplictaeQuestionAssigned/:c_id', (req, res, next) => {

  if (req.params.c_id == 0) {
    var clientsearchArr = [{ "tablestatus": "TRUE" }];

  } else {
    var clientsearchArr = [{ "tablestatus": "TRUE" }, { "_id": req.params.c_id }];
  }

  Clients.find({ $and: clientsearchArr }, { _id: 1, course: 1, first_name: 1 }, function (err, ClientList) {


    ///

    if (ClientList.length > 0) {
      for (let t = 0; t < ClientList.length; t++) {
        removeDuplicateAssignedBycustomer(ClientList[t]['_id']);
      }
    }
    /////delete duplicate entry of questions end
  });
});
///  Question assigned and submitted answwer by question expand start
router.get('/deleteQuestionAssigned/:c_id', (req, res, next) => {
  var searchArr = [{ "tablestatus": "TRUE" }, { "c_id": req.params.c_id }];
  assigned_questions.deleteMany({ $and: searchArr }, function (err, deletedRes) {
    if (err) {
      res.json({ message: "Something is wrong " + err, status: "ERROR" });
    } else {

      res.json({ message: "Deleted Successfully !!", status: "SUCCESS" });


    }
  });
});
router.get('/deleteSubmittedAnswer/:c_id', (req, res, next) => {
  var searchArr = [{ "c_id": req.params.c_id }];
  submitted_answer.deleteMany({ $and: searchArr }, function (err, deletedRes) {
    if (err) {
      res.json({ message: "Something is wrong " + err, status: "ERROR" });
    } else {

      res.json({ message: "Deleted Successfully !!", status: "SUCCESS" });


    }
  });
});
function removeDuplicateAssignedBycustomer(c_id) {
  ////delete duplicate entry of questions
  assigned_questions.find({ $and: [{ "c_id": c_id }, { "tablestatus": "TRUE" }] }, function (err, ClientQuestionsList_for_duplicate) {
    if (ClientQuestionsList_for_duplicate.length > 0) {
      var arrayOfThosequestionalreadyAssignedtothisclient_duplicate = [];
      for (let tal = 0; tal < ClientQuestionsList_for_duplicate.length; tal++) {
        arrayOfThosequestionalreadyAssignedtothisclient_duplicate.push(ClientQuestionsList_for_duplicate[tal]['question_id']);
      }

      var uniq = arrayOfThosequestionalreadyAssignedtothisclient_duplicate
        .map((name) => {
          return {
            count: 1,
            name: name
          }
        })
        .reduce((a, b) => {
          a[b.name] = (a[b.name] || 0) + b.count
          return a
        }, {});

      var duplicates = Object.keys(uniq).filter((a) => uniq[a] > 1);
      // [ 'Nancy' ]

      for (let tal = 0; tal < duplicates.length; tal++) {


        assigned_questions.deleteOne({ $and: [{ "question_id": duplicates[tal] }, { "c_id": c_id }, { "tablestatus": "TRUE" }] }, function (err, removereslt) {

        });
      }
    }


  });
}
router.get('/questionAssigned/:limitInOneTime/:skipDocument/:totalRecord/:submitted', (req, res, next) => {


  var limitInOneTime = +req.params.limitInOneTime;
  var skipDocument = +req.params.skipDocument;
  var totalRecord = +req.params.totalRecord;
  var submitted = +req.params.submitted;
  if (submitted == 0) {
    submitted = false;
  } else if (submitted == 1) {
    submitted = true;
  }


  let searchArr = [];

  searchArr.push({ "tablestatus": 'TRUE' });

  //searchArr.push({ "submitted": submitted });

  if (totalRecord == 0) {


    assigned_questions.countDocuments({ $and: searchArr }, function (err, count) {
      //

      assigned_questions.find({ $and: searchArr }, function (err, AssignedQuestionlist) {

        let arrayOfThosequestionWhichAreAssigned = [];


        if (AssignedQuestionlist.length > 0) {
          for (let tal = 0; tal < AssignedQuestionlist.length; tal++) {
            arrayOfThosequestionWhichAreAssigned.push(AssignedQuestionlist[tal]['question_id']);
          }
        }


        Questions.find({ $and: [{ "_id": { $in: arrayOfThosequestionWhichAreAssigned } }, { "tablestatus": "TRUE" }] }, function (err, Questionlist) {



          if (Questionlist.length > 0) {

            for (let tal = 0; tal < AssignedQuestionlist.length; tal++) {
              for (let t = 0; t < Questionlist.length; t++) {
                if (AssignedQuestionlist[tal]['question_id'] == Questionlist[t]['_id']) {




                  AssignedQuestionlist[tal].questiondata.push(Questionlist[t]);

                }
              }
            }
          }


          res.json({ "questionList": AssignedQuestionlist, "totalRecord": count });
        });


      }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);

      //
    }).count();


  } else {
    assigned_questions.find({ $and: searchArr }, function (err, AssignedQuestionlist) {
      let arrayOfThosequestionWhichAreAssigned = [];
      if (AssignedQuestionlist.length > 0) {
        for (let tal = 0; tal < AssignedQuestionlist.length; tal++) {
          arrayOfThosequestionWhichAreAssigned.push(AssignedQuestionlist[tal]['question_id']);
        }
      }
      Questions.find({ $and: [{ "_id": { $in: arrayOfThosequestionWhichAreAssigned } }, { "tablestatus": "TRUE" }] }, function (err, Questionlist) {

        if (Questionlist.length > 0) {

          for (let tal = 0; tal < AssignedQuestionlist.length; tal++) {
            for (let t = 0; t < Questionlist.length; t++) {
              if (AssignedQuestionlist[tal]['question_id'] == Questionlist[t]['_id']) {




                AssignedQuestionlist[tal].questiondata.push(Questionlist[t]);

              }
            }
          }
        }


        res.json({ "questionList": AssignedQuestionlist, "totalRecord": totalRecord });
      });
    }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);
  }
});


router.post('/searchQuestionsAssigned/:submitted', (req, res, next) => {


  var limitInOneTime = +req.body.limitInOneTime;
  var skipDocument = +req.body.skipDocument;
  var totalRecord = +req.body.totalRecord;
  var submitted = +req.params.submitted;
  if (submitted == 0) {
    submitted = false;
  } else if (submitted == 1) {
    submitted = true;
  }

  let searchArr = [];

  if (req.body.c_id) {
    searchArr.push({ "c_id": req.body.c_id });
  }
  if (req.body.course_id) {
    searchArr.push({ "course_id": req.body.course_id });
  }
  if (req.body.sub_course_id_actual) {
    searchArr.push({ "sub_course_id": req.body.sub_course_id_actual });
  }
  if (req.body.from_exam_date) {
    searchArr.push({ exam_date: { $gte: covertGivenDateWithTime(req.body.from_exam_date) } });
  }
  if (req.body.to_exam_date) {
    searchArr.push({ exam_date: { $lte: covertGivenDateWithTimeMax(req.body.to_exam_date) } });
  }
  if (req.body.category) {
    searchArr.push({ "category": req.body.category });
  }
  if (req.body.level) {
    searchArr.push({ "level": req.body.level });
  }
  if (req.body.day_number) {
    searchArr.push({ "day_number": req.body.day_number });
  }
  if (req.body.test_level) {
    searchArr.push({ "test_level": req.body.test_level });
  }
  searchArr.push({ "tablestatus": 'TRUE' });

  //searchArr.push({ "submitted": submitted });


  if (totalRecord == 0) {


    assigned_questions.countDocuments({ $and: searchArr }, function (err, count) {
      //

      assigned_questions.find({ $and: searchArr }, function (err, AssignedQuestionlist) {

        let arrayOfThosequestionWhichAreAssigned = [];


        if (AssignedQuestionlist.length > 0) {
          for (let tal = 0; tal < AssignedQuestionlist.length; tal++) {
            arrayOfThosequestionWhichAreAssigned.push(AssignedQuestionlist[tal]['question_id']);
          }
        }


        Questions.find({ $and: [{ "_id": { $in: arrayOfThosequestionWhichAreAssigned } }, { "tablestatus": "TRUE" }] }, function (err, Questionlist) {



          if (Questionlist.length > 0) {

            for (let tal = 0; tal < AssignedQuestionlist.length; tal++) {
              for (let t = 0; t < Questionlist.length; t++) {
                if (AssignedQuestionlist[tal]['question_id'] == Questionlist[t]['_id']) {




                  AssignedQuestionlist[tal].questiondata.push(Questionlist[t]);

                }
              }
            }
          }


          res.json({ "questionList": AssignedQuestionlist, "totalRecord": count });
        });


      }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);

      //
    }).count();


  } else {
    assigned_questions.find({ $and: searchArr }, function (err, AssignedQuestionlist) {
      let arrayOfThosequestionWhichAreAssigned = [];
      if (AssignedQuestionlist.length > 0) {
        for (let tal = 0; tal < AssignedQuestionlist.length; tal++) {
          arrayOfThosequestionWhichAreAssigned.push(AssignedQuestionlist[tal]['question_id']);
        }
      }
      Questions.find({ $and: [{ "_id": { $in: arrayOfThosequestionWhichAreAssigned } }, { "tablestatus": "TRUE" }] }, function (err, Questionlist) {

        if (Questionlist.length > 0) {

          for (let tal = 0; tal < AssignedQuestionlist.length; tal++) {
            for (let t = 0; t < Questionlist.length; t++) {
              if (AssignedQuestionlist[tal]['question_id'] == Questionlist[t]['_id']) {




                AssignedQuestionlist[tal].questiondata.push(Questionlist[t]);

              }
            }
          }
        }


        res.json({ "questionList": AssignedQuestionlist, "totalRecord": totalRecord });
      });
    }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);
  }



});
///  Question assigned and  submitted answwer by question expand end\\\\\


///   submitted answwer by question merge or by client end\\\\\ summary



router.post("/submit_set", (req, res, next) => {

  var c_id = req.body.c_id;
  var course_id = req.body.course_id;
  var sub_course_id = req.body.sub_course_id;
  var exam_date = req.body.exam_date;

  var category = req.body.category;
  var level = req.body.level;
  var test_level = req.body.test_level;
  var total_marks_obtained = req.body.total_marks_obtained;
  var questionpaperMarks = req.body.questionpaperMarks;
  var total_marks_obtained_first_attempt = req.body.total_marks_obtained_first_attempt;
  var day_number = req.body.day_number;
  var question_details_array = req.body.question_details_array;
  var final_status = req.body.final_status;
  var tablestatus = req.body.tablestatus;
  var isnextroundOpen = req.body.isnextroundOpen;

  var submitted_passageArray = req.body.submitted_passageArray;
  var passage_submitted = req.body.passage_submitted;
  var passage_reviewed = req.body.passage_reviewed; var halfsubmittedStage = req.body.halfsubmittedStage;



  // if (category == 'Week' || category == 'Final') {
  //   var review_status = 'Pending';
  //   var review_on = '';
  // }
  // else if (category == 'Daily') {
  //   var review_status = 'Reviewed Automatically';
  //   var review_on = new_Date()
  // }




  let searchArr_half = [{ "tablestatus": "HALF-SUBMITTED" }, { "c_id": c_id }, { "test_level": test_level }, { "exam_date": exam_date }, { "sub_course_id": sub_course_id }, { "course_id": course_id }];
  let searchArr = [{ "tablestatus": "TRUE" }, { "c_id": c_id }, { "test_level": test_level }, { "exam_date": exam_date }, { "sub_course_id": sub_course_id }, { "course_id": course_id }];




  submitted_answer.find({ $and: searchArr }, function (err, SubmittedSetList) {

    if (SubmittedSetList.length > 0) {


      how_many_attempt_for_this_set = SubmittedSetList.length + 1;


    } else {
      how_many_attempt_for_this_set = 1;

    }
    var review_status = 'Reviewed Automatically';
    var review_on = new_Date();
    if (passage_submitted) {
      var final_status = "Pending";
    } else {
      if (tablestatus == 'TRUE') {


        var percent = ((total_marks_obtained * 100) / questionpaperMarks);
        if (percent >= 50) {
          var final_status = "Pass";
        } else {
          var final_status = "Fail";
        }

        var review_status = 'Reviewed Automatically';
        var review_on = new_Date();

      } else {
        var final_status = "Pending";
        var review_status = 'Pending';
        var review_on = '';
      }
    }

    if (passage_submitted) {
      var final_status = "Pending";
    }
    if (final_status == 'Pending') {
      var review_status = "Pending";
      var review_on = '';
    }
    let new_submitted_answer_summary = new submitted_answer({
      c_id: c_id,
      course_id: course_id,
      sub_course_id: sub_course_id,
      exam_date: exam_date, halfsubmittedStage: halfsubmittedStage,
      category: category,
      level: level,
      day_number: day_number,
      test_level: test_level,
      created_on: new Date(),
      created_by: created_by,
      submitted_on: new_Date(),
      review_status: review_status,
      review_on: review_on,
      questionpaperMarks: questionpaperMarks,
      total_marks_obtained: total_marks_obtained,
      total_marks_obtained_first_attempt: total_marks_obtained_first_attempt,
      how_many_attempt_for_this_set: how_many_attempt_for_this_set,
      question_details_array: question_details_array,
      final_status: final_status,
      is_latest: true,
      isnextroundOpen: isnextroundOpen,
      updated_by: 0,
      updated_on: '',
      deleted_by: 0,
      deleted_on: "",
      tablestatus: tablestatus,
      submitted_passageArray: submitted_passageArray,
      passage_submitted: passage_submitted,
      passage_reviewed: passage_reviewed,

    });


    if (final_status == 'Pass') {
      var coursecertstatusObj = { 'course.$.final_status': final_status, 'course.$.certificate_issued': 'YES', 'course.$.certificate_issued_date': changedateformat(new_Date()) };
    } else {
      var coursecertstatusObj = { 'course.$.final_status': final_status, 'course.$.certificate_issued': 'NO' };

    }
    if (tablestatus == 'TRUE') {
      if (passage_submitted) {
        if (final_status == 'Pending') {
          sendEmailAboutNewSetToReview();
        }
      }
    }
    submitted_answer.find({ $and: searchArr_half }, function (err, SubmittedHAFSetList) {
      if (SubmittedHAFSetList.length > 0) {

        submitted_answer.updateMany({ $and: searchArr_half }, { $set: { 'tablestatus': "false" } }, (errupdateMany2, Qr2) => {
          new_submitted_answer_summary.save((err, set) => {

            if (err) {
              //console.log("Something is wrong " + err);
              res.json({ message: "Something is wrong " + err, status: "ERROR" });
            } else {
              if (SubmittedSetList.length > 0) {

                searchArr.push({ "_id": { $nin: [set._id] } });

                submitted_answer.updateMany({ $and: searchArr }, { $set: { 'is_latest': false } }, (errupdateMany, Qr) => {

                  if (errupdateMany) {
                    //console.log("Something is wrong " + errupdateMany);
                    res.json({ message: "Something is wrong ", status: "ERROR" });
                  } else {
                    /////////// update course result staus final test  

                    if (category == 'Final') {



                      Clients.updateOne({ '_id': c_id, 'course.course_id': course_id, 'course.sub_course_id': sub_course_id },
                        { $set: coursecertstatusObj }, (err, client) => {
                          res.json({ message: "Set Submitted Successfully !!", status: "SUCCESS" });
                        });
                    } else {
                      res.json({ message: "Set Submitted Successfully !!", status: "SUCCESS" });
                    }

                    /////////// update course result staus final test end
                    //console.log("Set Submitted Successfully");

                  }
                });
              } else {
                /////////// update course result staus final test  

                if (category == 'Final') {
                  Clients.updateOne({ '_id': c_id, 'course.course_id': course_id, 'course.sub_course_id': sub_course_id },
                    { $set: coursecertstatusObj }, (err, client) => {
                      res.json({ message: "Set Submitted Successfully !!", status: "SUCCESS" });
                    });
                } else {
                  res.json({ message: "Set Submitted Successfully !!", status: "SUCCESS" });
                }

                /////////// update course result staus final test end
                //console.log("Set Submitted Successfully");

              }


            }
          });


        });
      } else {

        new_submitted_answer_summary.save((err, set) => {

          if (err) {
            //console.log("Something is wrong " + err);
            res.json({ message: "Something is wrong " + err, status: "ERROR" });
          } else {
            if (SubmittedSetList.length > 0) {

              searchArr.push({ "_id": { $nin: [set._id] } });

              submitted_answer.updateMany({ $and: searchArr }, { $set: { 'is_latest': false } }, (errupdateMany, Qr) => {

                if (errupdateMany) {
                  //console.log("Something is wrong " + errupdateMany);
                  res.json({ message: "Something is wrong ", status: "ERROR" });
                } else {
                  /////////// update course result staus final test  

                  if (category == 'Final') {
                    Clients.updateOne({ '_id': c_id, 'course.course_id': course_id, 'course.sub_course_id': sub_course_id },
                      { $set: coursecertstatusObj }, (err, client) => {
                        res.json({ message: "Set Submitted Successfully !!", status: "SUCCESS" });
                      });
                  } else {
                    res.json({ message: "Set Submitted Successfully !!", status: "SUCCESS" });
                  }

                  /////////// update course result staus final test end
                  //console.log("Set Submitted Successfully");

                }
              });
            } else {
              /////////// update course result staus final test  

              if (category == 'Final') {
                Clients.updateOne({ '_id': c_id, 'course.course_id': course_id, 'course.sub_course_id': sub_course_id },
                  { $set: coursecertstatusObj }, (err, client) => {
                    res.json({ message: "Set Submitted Successfully !!", status: "SUCCESS" });
                  });
              } else {
                res.json({ message: "Set Submitted Successfully !!", status: "SUCCESS" });
              }

              /////////// update course result staus final test end
              //console.log("Set Submitted Successfully");

            }


          }
        });



      }
    });

  });


});
function sendEmailAboutNewSetToReview() {


  var mailOptions = {
    from: myemail,
    to: adminemail,
    subject: "New Question Set To Review from app user !!",
    html: '<h1></h1><p><a href=' + dashboardpath + 'submitted_answers/Pending">Click this link to review audio</a></p>'
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}


router.get('/answerSubmitted_by_client/:limitInOneTime/:skipDocument/:totalRecord', (req, res, next) => {


  var limitInOneTime = +req.params.limitInOneTime;
  var skipDocument = +req.params.skipDocument;
  var totalRecord = +req.params.totalRecord;


  let searchArr = [];

  searchArr.push({ "tablestatus": { $ne: "false" } });
  searchArr.push({ "is_latest": true });


  if (totalRecord == 0) {


    submitted_answer.countDocuments({ $and: searchArr }, function (err, count) {
      //

      submitted_answer.find({ $and: searchArr }, function (err, listofsubmittedsets) {


        res.json({ "listofsubmittedsets": listofsubmittedsets, "totalRecord": count });





      }).sort({ exam_date: -1, how_many_attempt_for_this_set: -1 }).limit(limitInOneTime).skip(skipDocument);

      //
    }).count();


  } else {
    submitted_answer.find({ $and: searchArr }, function (err, listofsubmittedsets) {


      res.json({ "listofsubmittedsets": listofsubmittedsets, "totalRecord": totalRecord });





    }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);
  }
});
router.post('/searchHalfSubmittedAnswerToConitnueForApp', (req, res, next) => {


  let searchArr = [];


  if (req.body.c_id) {
    searchArr.push({ "c_id": req.body.c_id });
  }
  if (req.body.course_id) {
    searchArr.push({ "course_id": req.body.course_id });
  }
  if (req.body.sub_course_id_actual) {
    searchArr.push({ "sub_course_id": req.body.sub_course_id_actual });
  }
  if (req.body.exam_date) {
    searchArr.push({ exam_date: { $gte: covertGivenDateWithTime(req.body.exam_date) } });
  }
  if (req.body.exam_date) {
    searchArr.push({ exam_date: { $lte: covertGivenDateWithTimeMax(req.body.exam_date) } });
  }

  if (req.body.category) {
    searchArr.push({ "category": req.body.category });
  }
  if (req.body.level) {
    searchArr.push({ "level": req.body.level });
  }
  if (req.body.day_number) {
    searchArr.push({ "day_number": req.body.day_number });
  }



  searchArr.push({ "tablestatus": req.body.tablestatus });
  searchArr.push({ "is_latest": true });
  submitted_answer.findOne({ $and: searchArr }, function (err, listofsubmittedsets_half) {


    res.json(listofsubmittedsets_half);





  });


});

router.post('/answerSubmitted_by_client_search', (req, res, next) => {


  var limitInOneTime = +req.body.limitInOneTime;
  var skipDocument = +req.body.skipDocument;
  var totalRecord = +req.body.totalRecord;


  let searchArr = [];

  if (req.body.c_id) {
    searchArr.push({ "c_id": req.body.c_id });
  }
  if (req.body.course_id) {
    searchArr.push({ "course_id": req.body.course_id });
  }
  if (req.body.sub_course_id_actual) {
    searchArr.push({ "sub_course_id": req.body.sub_course_id_actual });
  }
  if (req.body.from_exam_date) {
    searchArr.push({ exam_date: { $gte: covertGivenDateWithTime(req.body.from_exam_date) } });
  }
  if (req.body.to_exam_date) {
    searchArr.push({ exam_date: { $lte: covertGivenDateWithTimeMax(req.body.to_exam_date) } });
  }
  if (req.body.category) {
    searchArr.push({ "category": req.body.category });
  }
  if (req.body.level) {
    searchArr.push({ "level": req.body.level });
  }
  if (req.body.day_number) {
    searchArr.push({ "day_number": req.body.day_number });
  }

  if (req.body.final_status) {
    searchArr.push({ "final_status": req.body.final_status });
  }
  if (req.body.review_status) {
    searchArr.push({ "review_status": req.body.review_status });
  }

  searchArr.push({ "tablestatus": { $ne: "false" } });
  searchArr.push({ "is_latest": true });


  if (totalRecord == 0) {


    submitted_answer.countDocuments({ $and: searchArr }, function (err, count) {
      //

      submitted_answer.find({ $and: searchArr }, function (err, listofsubmittedsets) {


        res.json({ "listofsubmittedsets": listofsubmittedsets, "totalRecord": count });





      }).sort({ exam_date: -1, how_many_attempt_for_this_set: -1 }).limit(limitInOneTime).skip(skipDocument);

      //
    }).count();


  } else {
    submitted_answer.find({ $and: searchArr }, function (err, listofsubmittedsets) {


      res.json({ "listofsubmittedsets": listofsubmittedsets, "totalRecord": totalRecord });





    }).sort({ _id: -1 }).limit(limitInOneTime).skip(skipDocument);
  }
});
router.put('/updateFinalStatus', (req, res, next) => {



  if (req.body.final_status == '') {
    res.json({ message: "Select a valid status", status: "ERROR" });
  } else {




    submitted_answer.updateOne({ '_id': req.body._id }, { $set: { 'final_status': req.body.final_status, "review_status": "Reviewed Manually", 'updated_by': created_by, 'updated_on': new Date(), 'review_on': new_Date() } }, (err, set) => {
      if (err) {
        res.json({ message: "Something is wrong", status: "ERROR" });
      } else {
        if (req.body.category == 'Final') {
          Clients.updateOne({ '_id': req.body.c_id, 'course.course_id': req.body.course_id, 'course.sub_course_id': req.body.sub_course_id },
            { $set: { 'course.$.final_status': req.body.final_status } }, (err, client) => {
              if (err) {
                res.json({ message: "Something is wrong", status: "ERROR" });
              } else {

                res.json({ message: "Status Updated to " + req.body.final_status + "  Successfully !!", status: "SUCCESS" });



              }
            });
        } else {
          res.json({ message: "Status Updated to " + req.body.final_status + "  Successfully !!", status: "SUCCESS" });

        }




      }
    });
  }
});

router.put('/updatemarksofpassage', (req, res, next) => {

  //final_status

  var total_marks_obtained = req.body.total_marks_obtained;
  var questionpaperMarks = req.body.questionpaperMarks;


  var total_marks_obtained_passage = 0; var questionpaperMarks_passage = 0;
  for (var t = 0; t < req.body.submitted_passageArray.length; t++) {
    if (req.body.submitted_passageArray[t].marks_obtained) {
      total_marks_obtained_passage = total_marks_obtained_passage + parseFloat(req.body.submitted_passageArray[t].marks_obtained);
      questionpaperMarks_passage = questionpaperMarks_passage + req.body.submitted_passageArray[t].max_mark;
    }
  }



  var percent = (((total_marks_obtained + total_marks_obtained_passage) * 100) / (questionpaperMarks + questionpaperMarks_passage));
  if (percent >= 50) {
    var final_status = "Pass";
  } else {
    var final_status = "Fail";
  }


  submitted_answer.updateOne({ '_id': req.body._id }, { $set: { 'passage_reviewed': true, 'questionpaperMarks_passage': questionpaperMarks_passage, 'total_marks_obtained_passage': total_marks_obtained_passage, 'submitted_passageArray': req.body.submitted_passageArray, 'final_status': final_status, "review_status": "Reviewed Manually", 'updated_by': created_by, 'updated_on': new Date(), 'review_on': new_Date() } }, (err, set) => {
    if (err) {
      res.json({ message: "Something is wrong", status: "ERROR" });
    } else {


      Clients.findOne({ "_id": req.body.c_id }, function (err, ClientListOne) {

        if (ClientListOne) {
          var course_index = 0;

          for (let d = 0; d < ClientListOne.course.length; d++) {
            if (req.body.course_id == ClientListOne.course[d].course_id && req.body.sub_course_id == ClientListOne.course[d].sub_course_id) {
              course_index = d;
            }

          }

          var dt = req.body.exam_date;

          if (req.body.category == 'Daily') {
            var message = "Result For Practice set " + changedateformat_for_string(new Date(dt)) + " is available now !! ";
            var link = "account/examlist/Daily/" + course_index;
          } else if (req.body.category == 'Week') {
            var message = "Result For Week Test " + changedateformat_for_string(new Date(dt)) + " is available now !! ";
            var link = "account/examlist/Week/" + course_index;
          } else if (req.body.category == 'Final') {
            var message = "Result For Final Test " + changedateformat_for_string(new Date(dt)) + " is available now !! ";
            var link = "account/examlist/Final/" + course_index;
          }
          var insertArrForNotification = [];

          insertArrForNotification.push({
            'to_be_sent_on': new Date(),
            'message': message,
            "test_for_today_always": true,
            "link": link,
            "send_after_hour": 12,
            "category": "exam",
            "day_number": req.body.day_number,
            "created_on": new Date(),
            "created_by": created_by,
            "generated_type": 'AUTOMATIC',
            "c_id_int": ClientListOne.c_id_int,
            "course_id": req.body.course_id,
            "sub_course_id": req.body.sub_course_id,
            'notificationType': "PRACTICE_SET_AND_EXAM",
            "sent_status": false,
            'tablestatus': "TRUE",
            "seen_status": false
          });



          Notifications.insertMany(insertArrForNotification);

        }
        res.json({ message: "Status Updated to " + final_status + "  Successfully !!", status: "SUCCESS", final_status: final_status, questionpaperMarks_passage: questionpaperMarks_passage, 'total_marks_obtained_passage': total_marks_obtained_passage });


      });

















    }
  });

});

///   submitted answwer by question merge or by client end\\\\\ summary



////  orders  start


router.get('/getOrderDetails/:c_id_int/:course_id/:sub_course_id', (req, res, next) => {
  var c_id_int = +req.params.c_id_int;
  var course_id = req.params.course_id;
  var sub_course_id = req.params.sub_course_id;
  var searchArr = [];
  searchArr.push({ "course_id": course_id });
  searchArr.push({ "sub_course_id": sub_course_id });
  searchArr.push({ "c_id_int": c_id_int });
  searchArr.push({ "order_status": 'SUCCESS' });
  Orders.findOne({ $and: searchArr }, function (err, orderObj) {


    res.json(orderObj);





  });

});

router.post('/generateOrders', (req, res, next) => {

  var coupon = req.body.coupon;
  if (coupon == '') {
    var couponPercent = 0;

    saveorder(coupon, couponPercent, req, res);
  } else if (coupon == 'APR50') {
    var couponPercent = 50;

    saveorder(coupon, couponPercent, req, res);
  } else if (coupon == 'Admin' || coupon == 'admin' || coupon == 'ADMIN') {
    var couponPercent = 100;

    saveorder(coupon, couponPercent, req, res);
  } else {
    var searchArr = [];
    searchArr.push({ "tablestatus": 'TRUE' });
    searchArr.push({ "status": 'ACTIVE' });

    Coupons.findOne({ $and: searchArr }, function (err, couponObj) {

      if (couponObj) {
        saveorder(couponObj.coupon, couponObj.couponPercent, req, res);
      } else {
        res.json({ message: "No Coupon Found !! ", status: "ERROR", newOrder: {} });

      }



    }).sort({ _id: -1 });
  }

  //////////////

});


function FormatNumberLength(num, length) {
  var r = "" + num;
  while (r.length < length) {
    r = "0" + r;
  }
  return r;
}
router.post('/updateStatusOfOrder', (req, res, next) => {
  updateStatusOfOrder(res, req.body.order_table_id, req.body.order_status);

});
router.get('/updateStatusOfOrder/:order_table_id/:order_status', (req, res, next) => {
  updateStatusOfOrder(res, req.params.order_table_id, req.params.order_status);

});
function updateStatusOfOrder(res, order_table_id, order_status) {
  Orders.findOne({ $and: [{ "_id": order_table_id }] }, function (err, OrderData) {

    if (OrderData) {
      var newOrder = OrderData;
      if (OrderData.order_status == 'PENDING') {

        Orders.findOne({}, function (err, lastInvoice) {

          if (lastInvoice) {

            if (lastInvoice.invoice_int) {
              var invoice_int = lastInvoice.invoice_int + 1;
            } else {
              var invoice_int = 1;
            }




          } else {
            var invoice_int = 1;

          }
          var invoice = "INV" + FormatNumberLength(invoice_int, 4);
          newOrder.order_status = order_status;
          var datenow = new_Date();

          if (order_status == 'SUCCESS') {

          } else {
            var invoice = ""; var invoice_int = 0;
          }
          if (OrderData.bank_array.length == 0) {
            var updateOrderObj = { 'bank_array': [{ "TXNID": "ADMINPURCHASE", "STATUS": 'TXN_SUCCESS' }], 'invoice_int': invoice_int, 'invoice': invoice, 'order_status': order_status, 'payment_recieved_on': datenow };
          } else {
            var updateOrderObj = { 'invoice_int': invoice_int, 'invoice': invoice, 'order_status': order_status, 'payment_recieved_on': datenow };
          }

          Orders.updateOne({ '_id': order_table_id }, { $set: updateOrderObj }, (err, updateOrNotOrder) => {
            if (err) {
              res.json({ message: "Something is wrong in updating data !! ", status: "ERROR", newOrder: {} });
            } else {

              if (order_status == 'FAIL') {
                res.json({ message: "Order updated successfully !!", status: "SUCCESS", newOrder: newOrder });
              } else {


                Clients.findOne({ $and: [{ 'c_id_int': OrderData.c_id_int }] }, function (err, ClientData) {
                  if (ClientData) {
                    Course.findOne({ $and: [{ '_id': OrderData.sub_course_id }] }, function (err, subcourseDataSingle) {
                      if (subcourseDataSingle) {




                        let bonus_subject_idArr = []; let bonus_subject_idArrjust = [];
                        for (let ys = 0; ys < subcourseDataSingle.bonus_subject_id.length; ys++) {
                          if (subcourseDataSingle.bonus_subject_id[ys]) {
                            let f = false;
                            for (let ccc = 0; ccc < ClientData.course.length; ccc++) {
                              if (ClientData.course[ccc].sub_course_id == subcourseDataSingle.bonus_subject_id[ys]) {
                                f = true
                              }
                            }
                            if (f == false) {
                              bonus_subject_idArr.push({ '_id': subcourseDataSingle.bonus_subject_id[ys] })
                              bonus_subject_idArrjust.push({ '_id': subcourseDataSingle.bonus_subject_id[ys] })

                            }
                          }

                        }
                        bonus_subject_idArr.push({ '_id': subcourseDataSingle._id })
                        console.log("bonus_subject_idArr"); console.log(bonus_subject_idArr);
                        Course.find({ $or: bonus_subject_idArr }, function (err, subcourseDataArr) {

                          var date_rangeArr = [];

                          var courseArr = ClientData.course;
                          var ordersArr = ClientData.orders;

                          console.log("subcourseDataArr"); console.log(subcourseDataArr);
                          for (let y = 0; y < subcourseDataArr.length; y++) {

                            let subcourseData = subcourseDataArr[y];
                            var x = subcourseData.duration; //or whatever offset
                            var ending_date = new_Date();

                            if (subcourseData.duration_type == 'Month') {
                              ending_date.setDate(ending_date.getDate() + (x * 30) - 1);
                            } else {
                              ending_date.setDate(ending_date.getDate() + (x) - 1);
                            }
                            let found = false;
                            for (let ysss = 0; ysss < ordersArr.length; ysss++) {
                              if (ordersArr[ysss].sub_course_id == subcourseData._id) {
                                console.log(999, ordersArr[ysss].sub_course_id); found = true;
                              }
                            }
                            if (!found) {

                              let isBonus = false;
                              for (let ccc = 0; ccc < bonus_subject_idArrjust.length; ccc++) {
                                if (subcourseData._id == bonus_subject_idArrjust[ccc]._id) {
                                  isBonus = true
                                }
                              }
                              if (isBonus) {
                                ordersArr.push({
                                  course_id: subcourseData.parent_course,
                                  sub_course_id: subcourseData._id,
                                  total_amount: OrderData.total_amount,
                                  coupon: OrderData.coupon,
                                  couponPercent: OrderData.couponPercent,
                                  amount: 0,
                                  itemamount: 0,
                                  discount:0,
                                  taxableamount: 0,
                                  igst: 0,
                                  cgst: 0,
                                  sgst: 0,
                                  tottax: 0,
                                  paid_amount: 0,


                                  his_affilitater_c_id_int: OrderData.his_affilitater_c_id_int,
                                  single_or_multiple: OrderData.single_or_multiple,
                                  bank_array: OrderData.bank_array,
                                  _id: OrderData._id,
                                  c_id_int: OrderData.c_id_int,

                                  order_no: OrderData.order_no,
                                  order_status: OrderData.order_status,



                                  order_date: OrderData.order_date,
                                  created_on: OrderData.created_on,


                                });
                              } else {
                                ordersArr.push({
                                  course_id: subcourseData.parent_course,
                                  sub_course_id: subcourseData._id,
                                  total_amount: OrderData.total_amount,
                                  coupon: OrderData.coupon,
                                  couponPercent: OrderData.couponPercent,
                                  amount: subcourseData.amount,
                                  itemamount: OrderData.itemamount,
                                  discount: OrderData.discount,
                                  taxableamount: OrderData.taxableamount,
                                  igst: OrderData.igst,
                                  cgst: OrderData.cgst,
                                  sgst: OrderData.sgst,
                                  tottax: OrderData.tottax,
                                  paid_amount: OrderData.paid_amount,


                                  his_affilitater_c_id_int: OrderData.his_affilitater_c_id_int,
                                  single_or_multiple: OrderData.single_or_multiple,
                                  bank_array: OrderData.bank_array,
                                  _id: OrderData._id,
                                  c_id_int: OrderData.c_id_int,

                                  order_no: OrderData.order_no,
                                  order_status: OrderData.order_status,



                                  order_date: OrderData.order_date,
                                  created_on: OrderData.created_on,


                                });
                              }

                            }
                            courseArr.push({
                              course_name_at_time_of_purchase: 'NO NEED',
                              sub_course_name_at_time_of_purchase: 'NO NEED',
                              course_id: subcourseData.parent_course,
                              sub_course_id: subcourseData._id,
                              duration: subcourseData.duration,


                              duration_type: subcourseData.duration_type,
                              is_self_paced: subcourseData.is_self_paced,

                              starting_date: changedateformat(new_Date()),
                              ending_date: changedateformat(ending_date),
                              certificate_issued: 'NO',
                              certificate_issued_date: ' ',
                              course_status: 'Running',
                              final_status: 'Pending',
                              generated: false,
                              'order_added_by': 'Self',

                            });

                          }
                          // ordersArr.push(OrderData);  
                          console.log("OrderData"); console.log(OrderData);
                          console.log("ordersArr"); console.log(ordersArr);
                          console.log("ClientData"); console.log(ClientData);
                          console.log("courseArr"); console.log(courseArr);
                          if (ClientData.customer_id_int == null || ClientData.customer_id_int == undefined || ClientData.customer_id_int == 0) {

                            Clients.findOne({}, function (err, lastClientBycustomer_id_int) {

                              if (lastClientBycustomer_id_int) {
                                var new_customer_id_int = lastClientBycustomer_id_int.customer_id_int + 1;
                              } else {
                                var new_customer_id_int = 20200401;
                              }
                              var new_customer_id = "DPA" + new_customer_id_int;


                              var objecttoupdate = { profile_status: 'COMPELTED', login_user_type: 'STUDENT', "customer_id": new_customer_id, "customer_id_int": new_customer_id_int, 'course': courseArr, 'orders': ordersArr };
                              updateClientAfterOrderStatusChanged(ClientData._id, OrderData.c_id_int, objecttoupdate, newOrder, res)

                            }).sort({ customer_id_int: -1 });



                          } else {
                            var objecttoupdate = { 'course': courseArr, 'orders': ordersArr };


                            updateClientAfterOrderStatusChanged(ClientData._id, OrderData.c_id_int, objecttoupdate, newOrder, res)

                          }

                          ////////
                        });
                      }

                      else {
                        res.json({ message: "Something is wrong . No Course Found !! ", status: "ERROR", newOrder: {} });
                      }
                    });
                  } else {
                    res.json({ message: "Something is wrong . No Client Found !! ", status: "ERROR", newOrder: {} });
                  }
                });

              }
            }
          });
        }).sort({ invoice_int: -1 });
      } else {
        res.json({ message: "Order details, Status already updated !!", status: "SUCCESS", newOrder: OrderData });
      }
    } else {
      res.json({ message: "Something is wrong. No Order Number Found !! ", status: "ERROR", newOrder: {} });
    }


  });





}

function updateClientAfterOrderStatusChanged(_id, c_id_int, objecttoupdate, newOrder, res) {
  Clients.updateOne({ 'c_id_int': c_id_int }, { $set: objecttoupdate }, (err, Qr) => {
    if (err) {
      res.json({ message: "Something is wrong in updating client course !! ", status: "ERROR", newOrder: {} });
    } else {
      var latestCourse = objecttoupdate.course[(objecttoupdate.course.length) - 1]
      //  generateAutomoticnotificatios(c_id_int, latestCourse, (objecttoupdate.course.length) - 1,'updateClientAfterOrderStatusChanged');
      let todaysDate = new Date();
      let todaysDate_justdate = covertGivenDateWithTime(todaysDate);

      assignQuestionAutomatciWorking(_id, res, todaysDate, todaysDate_justdate, true);
      res.json({ message: "Order updated successfully !!", status: "SUCCESS", newOrder: newOrder });

    }
  });
}
function saveorder(coupon, couponPercent, req, res) {


  var datenow = new_Date();
  var amount = req.body.amount;
  amount = parseFloat(amount).toFixed(2);


  var itemamount = (req.body.amount * 100) / 118;
  itemamount = parseFloat(itemamount).toFixed(2);
  if (coupon == '') {
    var discount = 0;

  } else {
    var discount = ((itemamount * couponPercent) / 100);
  }
  discount = (discount).toFixed(2);


  taxableamount = +itemamount - (+discount);
  taxableamount = parseFloat(taxableamount).toFixed(2);

  var igst = +((taxableamount * 18) / 100).toFixed(2);
  var sgst = +((taxableamount * 9) / 100).toFixed(2);
  var cgst = sgst;
  if (req.body.state == 'Delhi') {
    var tottax = igst;
  } else {
    var tottax = sgst + cgst;
  }

  var paid_amount = (parseFloat(taxableamount) + (tottax)).toFixed(0);

  if (req.body.order_no != '') {
    var order_no = req.body.order_no;

  } else {
    var order_no = "ORDSLES" + new_Date().getTime();

  }


  let newOrderOBJ = new Orders({

    c_id_int: req.body.c_id_int,
    course_id: req.body.course_id,
    sub_course_id: req.body.sub_course_id,
    order_no: order_no,
    order_status: 'PENDING',
    state: req.body.state,

    coupon: coupon,
    couponPercent: couponPercent,

    amount: amount,
    itemamount: itemamount,
    discount: discount,
    taxableamount: taxableamount,
    igst: igst,
    cgst: cgst,
    sgst: sgst,
    tottax: tottax,
    paid_amount: paid_amount,
    bank_array: [],
    remark: '',
    order_date: datenow,
    created_on: new_Date()
  });
  newOrderOBJ.save((err, newOrder) => {
    if (err) {
      res.json({ message: "Something is wrong " + err, status: "ERROR", newOrder: {} });
    } else {

      if (req.body.previousorderid == '') {
        res.json({ message: "Order Added Successfully !!", status: "SUCCESS", newOrder: newOrder });
      } else {
        var removeArr = [];
        removeArr.push({ "_id": req.body.previousorderid });

        Orders.remove({ $and: removeArr }, function (err1, removedobj) {
          if (err1) {
            res.json({ message: "Something is wrong " + err1, status: "ERROR", newOrder: {} });
          } else {
            res.json({ message: "Order Updated Successfully !!", status: "SUCCESS", newOrder: newOrder });
          }


        });
      }

    }
  });
}
///   orders end
function changedateformat(todayDate) {


  todayDate.setMinutes(todayDate.getMinutes() - todayDate.getTimezoneOffset());
  return todayDate.toISOString().slice(0, 10);
}
function changedateformat_for_string(todayDate) {


  todayDate.setMinutes(todayDate.getMinutes() - todayDate.getTimezoneOffset());
  var str = todayDate.toISOString().slice(0, 10);
  var arr = str.split('-');
  if (arr[1] == "01") {
    var month = "Jan";
  } else if (arr[1] == "02") {
    var month = "Feb";

  } else if (arr[1] == "03") {
    var month = "March";

  } else if (arr[1] == "04") {
    var month = "April";

  } else if (arr[1] == "05") {
    var month = "May";

  } else if (arr[1] == "06") {
    var month = "June";

  } else if (arr[1] == "07") {
    var month = "July";

  } else if (arr[1] == "08") {
    var month = "Aug";

  } else if (arr[1] == "09") {
    var month = "Sept";

  } else if (arr[1] == "10") {
    var month = "Oct";

  } else if (arr[1] == "11") {
    var month = "Nov";

  } else if (arr[1] == "12") {
    var month = "Dec";

  }
  return arr[2] + " " + month + " " + arr[0];
}
router.post('/assigned_question_get_for_attempt_backup', (req, res, next) => {
  var c_id = req.body.client_id;
  var course_id = req.body.course_id;
  var sub_course_id = req.body.sub_course_id;
  var test_level = req.body.test_level;
  var exam_date = new Date(req.body.exam_date);
  assigned_questions.aggregate([

    { $match: { $and: [{ exam_date: { $lte: covertGivenDateWithTimeMax(exam_date) } }, { "exam_date": { $gte: covertGivenDateWithTime(exam_date) } }, { "c_id": c_id }, { "test_level": test_level }, { "course_id": course_id }, { "sub_course_id": sub_course_id }, { "tablestatus": "TRUE" }] } },

    {
      $lookup: {
        from: "questions",
        localField: "question_id_join_query",
        foreignField: "question_id_join_query",
        as: "questiondetails"
      }
    }

  ], function (err, assignedQuestionForParticularcourse) {
    var quetionArr = [];
    if (assignedQuestionForParticularcourse.length > 0) {

      for (let y = 0; y < assignedQuestionForParticularcourse.length; y++) {
        quetionArr.push(assignedQuestionForParticularcourse[y].questiondetails[0]);

      }

    }
    res.json({ 'assignedQuestionForParticularcourse': quetionArr });




  });
});
router.post('/assigned_question_get_for_attempt', (req, res, next) => {
  working_assigned_question_get_for_attempt(req, res);
});

function working_assigned_question_get_for_attempt(req, res) {
  var c_id = req.body.client_id;
  var course_id = req.body.course_id;
  var sub_course_id = req.body.sub_course_id;
  var test_level = req.body.test_level;
  var exam_date = new Date(req.body.exam_date);



  assigned_questions.aggregate([

    { $match: { $and: [{ exam_date: { $lte: covertGivenDateWithTimeMax(exam_date) } }, { "exam_date": { $gte: covertGivenDateWithTime(exam_date) } }, { "c_id": c_id }, { "test_level": test_level }, { "course_id": course_id }, { "sub_course_id": sub_course_id }, { "tablestatus": "TRUE" }] } },

    {
      $lookup: {
        from: "questions",
        localField: "question_id_join_query",
        foreignField: "question_id_join_query",
        as: "questiondetails"
      }
    }

  ], function (err, assignedQuestionForParticularcourse) {
    var quetionArr = [];
    if (assignedQuestionForParticularcourse.length > 0) {

      for (let y = 0; y < assignedQuestionForParticularcourse.length; y++) {
        quetionArr.push(assignedQuestionForParticularcourse[y].questiondetails[0]);

      }
      res.json({ 'assignedQuestionForParticularcourse': quetionArr });
    } else {

      let Date1 = exam_date;
      let Date_justdate = covertGivenDateWithTime(Date1);
      assignQuestionAutomatciWorking(c_id, res, Date1, Date_justdate, false);

      setTimeout(function () {
        working_assigned_question_get_for_attempt(req, res);
      }, 2000);

    }





  });
}
router.post('/sylabusdaterange', (req, res, next) => {
  var courseobj = req.body.courseobj;
  var c_id = req.body.client_id;
  var exam_date = req.body.examdate;
  //var day_number = req.body.day_number;
  var starting_date = courseobj.starting_date;
  var ending_date = courseobj.ending_date;

  var searchArr = [{ "c_id": c_id }, { "course_id": courseobj['course_id'] }, { "sub_course_id": courseobj['sub_course_id'] }, { "tablestatus": "TRUE" }];
  if (exam_date != '') {
    searchArr.push({ exam_date: { $gte: covertGivenDateWithTime(exam_date) } });
  }
  if (exam_date != '') {
    searchArr.push({ exam_date: { $lte: covertGivenDateWithTimeMax(exam_date) } });
  }
  // if (day_number != 0) {
  //   searchArr.push({ 'day_number': day_number });
  // }



  //console.log(searchArr);

  //  first check if question has been set for this date then check if has submitted or not if question found
  assigned_questions.aggregate([

    { $match: { $and: searchArr } },
    // Group by the grouping key, but keep the valid values
    {
      "$group": {
        "_id": "$day_number",
        "docId": { "$first": "$_id" },
        "docId2": { "$first": "$day_number" },
        "category": { "$first": "$category" },
        "exam_date": { "$first": "$exam_date" }

      }
    },
    // Then sort
    { "$sort": { "exam_date": 1 } }

  ], function (err, QuestionForParticularcourse) {



    if (QuestionForParticularcourse.length > 0) {
      //  //console.log(QuestionForParticularcourse);


      var arrayofexamdateforWhichQuestionSetted = [];
      var daterangeArr = [];
      for (let qn = 0; qn < QuestionForParticularcourse.length; qn++) {

        arrayofexamdateforWhichQuestionSetted.push(QuestionForParticularcourse[qn]['docId2']);

        //  //console.log("exam date - " + QuestionForParticularcourse[qn]['exam_date']);


        var alldetilabpoutDate = breakDate2(starting_date, ending_date, QuestionForParticularcourse[qn]['exam_date']);
        if (alldetilabpoutDate.whichdate == 'PAST') {
          alldetilabpoutDate.set_submit_by_user_status = "SKIPPED";
        } else if (alldetilabpoutDate.whichdate == 'CURRENT') {
          alldetilabpoutDate.set_submit_by_user_status = "NOT SUBMITTED";
        } else if (alldetilabpoutDate.whichdate == 'FUTURE') {
          alldetilabpoutDate.set_submit_by_user_status = "FUTURE";
        }
        alldetilabpoutDate.course_id = courseobj['course_id'];
        alldetilabpoutDate.sub_course_id = courseobj['sub_course_id'];
        alldetilabpoutDate.day_numberC = QuestionForParticularcourse[qn]['docId2'];
        alldetilabpoutDate.exam_date_array = [];
        daterangeArr.push(alldetilabpoutDate);
      }
      if (req.body.attemptnumber == 'latestattempt') {

        if (req.body.test_level != -10) {
          var attempobject = { "is_latest": true, "test_level": req.body.test_level };
        } else {
          var attempobject = { "is_latest": true };
        }
      } else {

        if (req.body.test_level != -10) {
          var attempobject = { "how_many_attempt_for_this_set": req.body.attemptnumber, "test_level": req.body.test_level };
        } else {
          var attempobject = { "how_many_attempt_for_this_set": req.body.attemptnumber };
        }
      }
      // //console.log(arrayofexamdateforWhichQuestionSetted);

      submitted_answer.find({ $and: [{ "c_id": c_id }, attempobject, { "course_id": courseobj['course_id'] }, { "sub_course_id": courseobj['sub_course_id'] }, { "day_number": { $in: arrayofexamdateforWhichQuestionSetted } }, { "tablestatus": { $ne: "false" } }] }, function (err2, SetSubmittedForParticularcourse) {

        ////console.log({ $and: [{ "c_id": c_id }, attempobject, { "course_id": courseobj['course_id'] }, { "sub_course_id": courseobj['sub_course_id'] }, { "day_number": { $in: arrayofexamdateforWhichQuestionSetted } }, { "tablestatus": { $ne: "false" } }] });

        ////console.log(SetSubmittedForParticularcourse);

        if (SetSubmittedForParticularcourse.length > 0) {
          for (let y = 0; y < daterangeArr.length; y++) {
            for (let sett = 0; sett < SetSubmittedForParticularcourse.length; sett++) {
              var date1 = new Date(daterangeArr[y]['exam_date']);
              var date2 = new Date(SetSubmittedForParticularcourse[sett]['exam_date']);
              var diffTimeq = Math.abs(date2 - date1);
              var diffDaysq = Math.ceil(diffTimeq / (1000 * 60 * 60 * 24));



              if (daterangeArr[y]['day_numberC'] == SetSubmittedForParticularcourse[sett]['day_number']) {
                // array will be latest always as sort  by test_level is ascending
                daterangeArr[y]['exam_date_array'].push(SetSubmittedForParticularcourse[sett]);

                daterangeArr[y]['set_submit_by_user_status'] = 'SUBMITTED';

                daterangeArr[y]['tablestatus'] = SetSubmittedForParticularcourse[sett]['tablestatus'];
                daterangeArr[y]['is_latest'] = SetSubmittedForParticularcourse[sett]['is_latest'];
                daterangeArr[y]['isnextroundOpen'] = SetSubmittedForParticularcourse[sett]['isnextroundOpen'];
                daterangeArr[y]['how_many_attempt_for_this_set'] = SetSubmittedForParticularcourse[sett]['how_many_attempt_for_this_set'];
                daterangeArr[y]['final_status'] = SetSubmittedForParticularcourse[sett]['final_status'];

                daterangeArr[y]['set_category'] = SetSubmittedForParticularcourse[sett]['category'];
                daterangeArr[y]['set_level'] = SetSubmittedForParticularcourse[sett]['level'];
                daterangeArr[y]['test_level'] = SetSubmittedForParticularcourse[sett]['test_level'];
              }


            }


          }
          res.json({ 'daterangeArr': daterangeArr, 'status': 'SUCCESS', 'message': "" });


        } else {
          res.json({ 'daterangeArr': daterangeArr, 'status': 'SUCCESS', 'message': "No set is submitted till now." });
        }
      }).sort({ test_level: 1 });

    } else {

      res.json({ 'daterangeArr': [], 'status': 'ERROR2', 'message': "No question assigned till now. Contact admin." });
    }
  });

});
router.post('/sylabusdaterange_original_backup', (req, res, next) => {
  var courseobj = req.body.courseobj;
  var c_id = req.body.client_id;
  var exam_date = req.body.examdate;
  var day_number = req.body.day_number;
  var starting_date = courseobj.starting_date;
  var ending_date = courseobj.ending_date;

  var searchArr = [{ "c_id": c_id }, { "course_id": courseobj['course_id'] }, { "sub_course_id": courseobj['sub_course_id'] }, { "tablestatus": "TRUE" }];
  if (exam_date != '') {
    //searchArr.push({ 'exam_date': new Date(exam_date) });
  }
  if (day_number != 0) {
    searchArr.push({ 'day_number': day_number });
  }



  //console.log(searchArr);

  //  first check if question has been set for this date then check if has submitted or not if question found
  assigned_questions.aggregate([

    { $match: { $and: searchArr } },
    // Group by the grouping key, but keep the valid values
    {
      "$group": {
        "_id": "$day_number",
        "docId": { "$first": "$_id" },
        "docId2": { "$first": "$day_number" },
        "category": { "$first": "$category" },
        "exam_date": { "$first": "$exam_date" }

      }
    },
    // Then sort
    { "$sort": { "exam_date": 1 } }

  ], function (err, QuestionForParticularcourse) {



    if (QuestionForParticularcourse.length > 0) {
      //  //console.log(QuestionForParticularcourse);


      var arrayofexamdateforWhichQuestionSetted = [];
      var daterangeArr = [];
      for (let qn = 0; qn < QuestionForParticularcourse.length; qn++) {

        arrayofexamdateforWhichQuestionSetted.push(QuestionForParticularcourse[qn]['docId2']);

        //  //console.log("exam date - " + QuestionForParticularcourse[qn]['exam_date']);


        var alldetilabpoutDate = breakDate2(starting_date, ending_date, QuestionForParticularcourse[qn]['exam_date']);
        if (alldetilabpoutDate.whichdate == 'PAST') {
          alldetilabpoutDate.set_submit_by_user_status = "SKIPPED";
        } else if (alldetilabpoutDate.whichdate == 'CURRENT') {
          alldetilabpoutDate.set_submit_by_user_status = "NOT SUBMITTED";
        } else if (alldetilabpoutDate.whichdate == 'FUTURE') {
          alldetilabpoutDate.set_submit_by_user_status = "FUTURE";
        }
        alldetilabpoutDate.course_id = courseobj['course_id'];
        alldetilabpoutDate.sub_course_id = courseobj['sub_course_id'];
        alldetilabpoutDate.day_numberC = QuestionForParticularcourse[qn]['docId2'];
        alldetilabpoutDate.exam_date_array = [];
        daterangeArr.push(alldetilabpoutDate);
      }
      if (req.body.attemptnumber == 'latestattempt') {

        if (req.body.test_level != -10) {
          var attempobject = { "is_latest": true, "test_level": req.body.test_level };
        } else {
          var attempobject = { "is_latest": true };
        }
      } else {

        if (req.body.test_level != -10) {
          var attempobject = { "how_many_attempt_for_this_set": req.body.attemptnumber, "test_level": req.body.test_level };
        } else {
          var attempobject = { "how_many_attempt_for_this_set": req.body.attemptnumber };
        }
      }
      // //console.log(arrayofexamdateforWhichQuestionSetted);

      submitted_answer.find({ $and: [{ "c_id": c_id }, attempobject, { "course_id": courseobj['course_id'] }, { "sub_course_id": courseobj['sub_course_id'] }, { "day_number": { $in: arrayofexamdateforWhichQuestionSetted } }, { "tablestatus": { $ne: "false" } }] }, function (err2, SetSubmittedForParticularcourse) {

        ////console.log({ $and: [{ "c_id": c_id }, attempobject, { "course_id": courseobj['course_id'] }, { "sub_course_id": courseobj['sub_course_id'] }, { "day_number": { $in: arrayofexamdateforWhichQuestionSetted } }, { "tablestatus": { $ne: "false" } }] });

        ////console.log(SetSubmittedForParticularcourse);
        Tutorials.find({ $and: [{ "course_id": courseobj['course_id'] }, { "sub_course_id": courseobj['sub_course_id'] }, { "day_number": { $in: arrayofexamdateforWhichQuestionSetted } }, { "tablestatus": "TRUE" }] }, { _id: 1, day_number: 1, topic: 1 }, function (err2, TutorialsList) {

          console.log(TutorialsList);

          if (TutorialsList.length > 0) {

            for (let y = 0; y < daterangeArr.length; y++) {


              for (let TutorialsList_y = 0; TutorialsList_y < TutorialsList.length; TutorialsList_y++) {
                if (daterangeArr[y]['day_number'] == TutorialsList[TutorialsList_y]['day_number']) {
                  daterangeArr[y]['tutorialtopic'] = TutorialsList[TutorialsList_y]['topic'];
                }
              }
            }
          }
          if (SetSubmittedForParticularcourse.length > 0) {
            for (let y = 0; y < daterangeArr.length; y++) {



              for (let sett = 0; sett < SetSubmittedForParticularcourse.length; sett++) {
                var date1 = new Date(daterangeArr[y]['exam_date']);
                var date2 = new Date(SetSubmittedForParticularcourse[sett]['exam_date']);
                var diffTimeq = Math.abs(date2 - date1);
                var diffDaysq = Math.ceil(diffTimeq / (1000 * 60 * 60 * 24));



                if (daterangeArr[y]['day_numberC'] == SetSubmittedForParticularcourse[sett]['day_number']) {
                  // array will be latest always as sort  by test_level is ascending
                  daterangeArr[y]['exam_date_array'].push(SetSubmittedForParticularcourse[sett]);

                  daterangeArr[y]['set_submit_by_user_status'] = 'SUBMITTED';

                  daterangeArr[y]['tablestatus'] = SetSubmittedForParticularcourse[sett]['tablestatus'];
                  daterangeArr[y]['is_latest'] = SetSubmittedForParticularcourse[sett]['is_latest'];
                  daterangeArr[y]['isnextroundOpen'] = SetSubmittedForParticularcourse[sett]['isnextroundOpen'];
                  daterangeArr[y]['how_many_attempt_for_this_set'] = SetSubmittedForParticularcourse[sett]['how_many_attempt_for_this_set'];
                  daterangeArr[y]['final_status'] = SetSubmittedForParticularcourse[sett]['final_status'];

                  daterangeArr[y]['set_category'] = SetSubmittedForParticularcourse[sett]['category'];
                  daterangeArr[y]['set_level'] = SetSubmittedForParticularcourse[sett]['level'];
                  daterangeArr[y]['test_level'] = SetSubmittedForParticularcourse[sett]['test_level'];
                }


              }


            }
            res.json({ 'daterangeArr': daterangeArr, 'status': 'SUCCESS', 'message': "" });


          } else {
            res.json({ 'daterangeArr': daterangeArr, 'status': 'SUCCESS', 'message': "No set is submitted till now." });
          }


        });

      }).sort({ test_level: 1 });

    } else {

      res.json({ 'daterangeArr': [], 'status': 'ERROR2', 'message': "No question assigned till now. Contact admin." });
    }
  });

});


router.post('/sylabusdaterange_original', (req, res, next) => {
  var courseobj = req.body.courseobj;
  var c_id = req.body.client_id;
  var exam_date = req.body.examdate;
  var day_number = req.body.day_number;
  var starting_date = courseobj.starting_date;
  var ending_date = courseobj.ending_date;

  var searchArr = [{ "course_id": courseobj['course_id'] }, { "sub_course_id": courseobj['sub_course_id'] }, { "tablestatus": "TRUE" }];
  if (exam_date != '') {
    //searchArr.push({ 'exam_date': new Date(exam_date) });
  }
  if (day_number != 0) {
    searchArr.push({ 'day_number': day_number });
  }



  //console.log(searchArr);

  //  first check if question has been set for this date then check if has submitted or not if question found
  Questions.aggregate([

    { $match: { $and: searchArr } },
    // Group by the grouping key, but keep the valid values
    {
      "$group": {
        "_id": "$day_number",
        "docId": { "$first": "$_id" },
        "docId2": { "$first": "$day_number" },
        "category": { "$first": "$category" },


      }
    },
    // Then sort
    { "$sort": { "docId2": 1 } }

  ], function (err, QuestionForParticularcourse) {



    if (QuestionForParticularcourse.length > 0) {
      console.log(QuestionForParticularcourse);


      var arrayofexamdateforWhichQuestionSetted = [];
      var daterangeArr = [];
      for (let qn = 0; qn < QuestionForParticularcourse.length; qn++) {

        arrayofexamdateforWhichQuestionSetted.push(QuestionForParticularcourse[qn]['docId2']);

        //  //console.log("exam date - " + QuestionForParticularcourse[qn]['exam_date']);


        var exam_dateClacualted = new Date(changedateformat(new Date(starting_date)));




        exam_dateClacualted.setDate(exam_dateClacualted.getDate() + (QuestionForParticularcourse[qn]['docId2']) - 1);




        console.log("exam_dateClacualted"); console.log(exam_dateClacualted);

        var alldetilabpoutDate = breakDate2(starting_date, ending_date, exam_dateClacualted);
        if (alldetilabpoutDate.whichdate == 'PAST') {
          alldetilabpoutDate.set_submit_by_user_status = "SKIPPED";
        } else if (alldetilabpoutDate.whichdate == 'CURRENT') {
          alldetilabpoutDate.set_submit_by_user_status = "NOT SUBMITTED";
        } else if (alldetilabpoutDate.whichdate == 'FUTURE') {
          alldetilabpoutDate.set_submit_by_user_status = "FUTURE";
        }
        alldetilabpoutDate.course_id = courseobj['course_id'];
        alldetilabpoutDate.sub_course_id = courseobj['sub_course_id'];
        alldetilabpoutDate.day_numberC = QuestionForParticularcourse[qn]['docId2'];
        alldetilabpoutDate.exam_date_array = [];
        daterangeArr.push(alldetilabpoutDate);
      }
      if (req.body.attemptnumber == 'latestattempt') {

        if (req.body.test_level != -10) {
          var attempobject = { "is_latest": true, "test_level": req.body.test_level };
        } else {
          var attempobject = { "is_latest": true };
        }
      } else {

        if (req.body.test_level != -10) {
          var attempobject = { "how_many_attempt_for_this_set": req.body.attemptnumber, "test_level": req.body.test_level };
        } else {
          var attempobject = { "how_many_attempt_for_this_set": req.body.attemptnumber };
        }
      }
      // //console.log(arrayofexamdateforWhichQuestionSetted);

      submitted_answer.find({ $and: [{ "c_id": c_id }, attempobject, { "course_id": courseobj['course_id'] }, { "sub_course_id": courseobj['sub_course_id'] }, { "day_number": { $in: arrayofexamdateforWhichQuestionSetted } }, { "tablestatus": { $ne: "false" } }] }, function (err2, SetSubmittedForParticularcourse) {

        ////console.log({ $and: [{ "c_id": c_id }, attempobject, { "course_id": courseobj['course_id'] }, { "sub_course_id": courseobj['sub_course_id'] }, { "day_number": { $in: arrayofexamdateforWhichQuestionSetted } }, { "tablestatus": { $ne: "false" } }] });

        ////console.log(SetSubmittedForParticularcourse);
        Tutorials.find({ $and: [{ "course_id": courseobj['course_id'] }, { "sub_course_id": courseobj['sub_course_id'] }, { "day_number": { $in: arrayofexamdateforWhichQuestionSetted } }, { "tablestatus": "TRUE" }] }, { _id: 1, day_number: 1, topic: 1 }, function (err2, TutorialsList) {

          console.log(TutorialsList);

          if (TutorialsList.length > 0) {

            for (let y = 0; y < daterangeArr.length; y++) {


              for (let TutorialsList_y = 0; TutorialsList_y < TutorialsList.length; TutorialsList_y++) {
                if (daterangeArr[y]['day_number'] == TutorialsList[TutorialsList_y]['day_number']) {
                  daterangeArr[y]['tutorialtopic'] = TutorialsList[TutorialsList_y]['topic'];
                }
              }
            }
          }
          if (SetSubmittedForParticularcourse.length > 0) {
            for (let y = 0; y < daterangeArr.length; y++) {



              for (let sett = 0; sett < SetSubmittedForParticularcourse.length; sett++) {
                var date1 = new Date(daterangeArr[y]['exam_date']);
                var date2 = new Date(SetSubmittedForParticularcourse[sett]['exam_date']);
                var diffTimeq = Math.abs(date2 - date1);
                var diffDaysq = Math.ceil(diffTimeq / (1000 * 60 * 60 * 24));



                if (daterangeArr[y]['day_numberC'] == SetSubmittedForParticularcourse[sett]['day_number']) {
                  // array will be latest always as sort  by test_level is ascending
                  daterangeArr[y]['exam_date_array'].push(SetSubmittedForParticularcourse[sett]);

                  daterangeArr[y]['set_submit_by_user_status'] = 'SUBMITTED';

                  daterangeArr[y]['tablestatus'] = SetSubmittedForParticularcourse[sett]['tablestatus'];
                  daterangeArr[y]['is_latest'] = SetSubmittedForParticularcourse[sett]['is_latest'];
                  daterangeArr[y]['isnextroundOpen'] = SetSubmittedForParticularcourse[sett]['isnextroundOpen'];
                  daterangeArr[y]['how_many_attempt_for_this_set'] = SetSubmittedForParticularcourse[sett]['how_many_attempt_for_this_set'];
                  daterangeArr[y]['final_status'] = SetSubmittedForParticularcourse[sett]['final_status'];

                  daterangeArr[y]['set_category'] = SetSubmittedForParticularcourse[sett]['category'];
                  daterangeArr[y]['set_level'] = SetSubmittedForParticularcourse[sett]['level'];
                  daterangeArr[y]['test_level'] = SetSubmittedForParticularcourse[sett]['test_level'];
                }


              }


            }
            res.json({ 'daterangeArr': daterangeArr, 'status': 'SUCCESS', 'message': "" });


          } else {
            res.json({ 'daterangeArr': daterangeArr, 'status': 'SUCCESS', 'message': "No set is submitted till now." });
          }


        });

      }).sort({ test_level: 1 });

    } else {

      res.json({ 'daterangeArr': [], 'status': 'ERROR2', 'message': "No question assigned till now. Contact admin." });
    }
  });

});

router.post('/uploadfileAPI_for_tutorial_module', multipartMiddleware_tutorial, (req, res, next) => {

  var originalpathoffile = req.file.path;
  var filetype = req.body.filetype;
  var uploadingwhat = req.body.uploadingwhat;

  var isallok = false;
  if (uploadingwhat == "video" && (req.body.filetype == 'video/mp4')) {
    isallok = true;
  } else if (uploadingwhat == "image" && (req.body.filetype == 'image/png' || req.body.filetype == 'image/jpeg' || req.body.filetype == 'image/jpg' || req.body.filetype == 'image/PNG' || req.body.filetype == 'image/JPG' || req.body.filetype == 'image/JPEG')) {
    isallok = true;
  } else if (uploadingwhat == "pdf" && (req.body.filetype == 'application/pdf')) {
    isallok = true;
  } else if (uploadingwhat == "audio" && (req.body.filetype == 'audio/mpeg' || req.body.filetype == 'audio/mp3')) {
    isallok = true;
  }



  if (isallok) {

    var video_image_path = req.file.path.replace("\\", "/");
    var video_image_path = video_image_path.replace("public/", "");


    res.json({ message: "File uploaded succesfully !!", status: "success", filePath: serverpath + '' + video_image_path, serverpath: serverpath, video_image_path: video_image_path, filetype: filetype });



  } else {
    try {
      fs.unlinkSync(originalpathoffile)
      res.json({
        'message': 'Upload correct file format !! Your file format is ' + req.body.filetype,
        'status': 'error', filePath: ''

      });
    } catch (err) {
      res.json({
        'message': 'Upload correct file format !! Your file format is ' + req.body.filetype + ".",
        'status': 'error', filePath: ''

      });
    }
  }

});

router.post('/uploadfileAPI_for_video_module', multipartMiddleware_video, (req, res, next) => {
  var originalpathoffile = req.file.path;
  var filetype = req.body.filetype;
  var uploadingwhat = req.body.uploadingwhat;

  var isallok = false;
  if (uploadingwhat == "video" && (req.body.filetype == 'video/mp4')) {
    isallok = true;
  } else if (uploadingwhat == "image" && (req.body.filetype == 'image/png' || req.body.filetype == 'image/jpeg' || req.body.filetype == 'image/jpg' || req.body.filetype == 'image/PNG' || req.body.filetype == 'image/JPG' || req.body.filetype == 'image/JPEG')) {
    isallok = true;
  } else if (uploadingwhat == "pdf" && (req.body.filetype == 'application/pdf')) {
    isallok = true;
  } else if (uploadingwhat == "support") {
    var n = req.body.filetype.includes('video');
    if (n) {
      isallok = false;

    } else {
      isallok = true;
    }
  }



  if (isallok) {
    var video_image_path = req.file.path.replace("\\", "/");
    var video_image_path = video_image_path.replace("public/", "");


    res.json({ message: "File uploaded succesfully !!", status: "success", filePath: serverpath + '' + video_image_path, serverpath: serverpath, video_image_path: video_image_path, filetype: filetype });



  } else {
    try {
      fs.unlinkSync(originalpathoffile)
      res.json({
        'message': 'Upload correct file format !! Your file format is ' + req.body.filetype,
        'status': 'error', filePath: ''

      });
    } catch (err) {
      res.json({
        'message': 'Upload correct file format !! Your file format is ' + req.body.filetype + ".",
        'status': 'error', filePath: ''

      });
    }
  }

});

router.post('/uploadAskQuestionAPI', multipartMiddleware_ask, (req, res, next) => {
  var originalpathoffile = req.file.path;
  var filetype = req.body.filetype;
  var filepath = req.file.path.replace("\\", "/");
  var filepath = filepath.replace("public/", "");


  res.json({ message: "File uploaded succesfully !!", status: "success", filePath: filepath, serverpath: serverpath, filetype: filetype });





});

router.post('/uploadfileAPI_for_course_module', multipartMiddleware_course, (req, res, next) => {
  var originalpathoffile = req.file.path;
  var uploadingwhat = req.body.uploadingwhat;
  var isbackground = req.body.isbackground;
  var course_int = req.body.course_int
  if ((uploadingwhat == "video" && (req.body.filetype == 'video/mp4')) || (uploadingwhat == "image" && (req.body.filetype == 'image/png' || req.body.filetype == 'image/jpeg' || req.body.filetype == 'image/jpg' || req.body.filetype == 'image/PNG' || req.body.filetype == 'image/JPG' || req.body.filetype == 'image/JPEG'))) {


    if (isbackground == 'yes') {
      fs.rename(originalpathoffile, './public/uploads/course/' + course_int + '.png', () => {
        //console.log("\nFile Renamed!\n");

        var video_image_path = 'uploads/course/' + course_int + '.png';
        res.json({ message: "File uploaded succesfully !!", status: "success", filePath: serverpath + '' + video_image_path, serverpath: serverpath, video_image_path: video_image_path });


      });
    }
    else {
      var video_image_path = req.file.path.replace("\\", "/");
      var video_image_path = video_image_path.replace("public/", "");
      res.json({ message: "File uploaded succesfully !!", status: "success", filePath: serverpath + '' + video_image_path, serverpath: serverpath, video_image_path: video_image_path });

    }




  } else {
    try {
      fs.unlinkSync(originalpathoffile)
      res.json({
        'message': 'Upload correct file format !! Your file format is ' + req.body.filetype,
        'status': 'error', filePath: ''

      });
    } catch (err) {
      res.json({
        'message': 'Upload correct file format !! Your file format is ' + req.body.filetype + ".",
        'status': 'error', filePath: ''

      });
    }
  }

});



router.post('/uploadstudentprofilepic', multipartMiddleware_profilepic, (req, res, next) => {
  var c_id_int = req.body.c_id_int;
  var originalpathoffile = req.file.path;

  var filetype = req.body.filetype;
  var uploadingwhat = req.body.uploadingwhat;
  console.log(uploadingwhat);
  var isallok = false;
  if (uploadingwhat == "video" && (req.body.filetype == 'video/mp4')) {
    isallok = true;
  } else if (uploadingwhat == "image" && (req.body.filetype == 'image/png' || req.body.filetype == 'image/jpeg' || req.body.filetype == 'image/jpg' || req.body.filetype == 'image/PNG' || req.body.filetype == 'image/JPG' || req.body.filetype == 'image/JPEG')) {
    isallok = true;
  } else if (uploadingwhat == "pdf" && (req.body.filetype == 'application/pdf')) {
    isallok = true;
  } else if (uploadingwhat == "support") {
    var n = req.body.filetype.includes('video');
    if (n) {
      isallok = false;

    } else {
      isallok = true;
    }
  }



  if (isallok) {
    var video_image_path = req.file.path.replace("\\", "/");
    var video_image_path = video_image_path.replace("\\", "/");
    var video_image_path = video_image_path.replace("\\", "/");
    var video_image_path = video_image_path.replace("public/", "");
    let updatedobj = {
      serverpath: serverpath,
      image_path: video_image_path,
      'updated_by': created_by,
      'updated_on': new Date()
    };
    Clients.updateOne({ 'c_id_int': c_id_int }, { $set: updatedobj }, (err, client) => {
      if (err) {
        res.json({ message: "Something is wrong , Please try later... !", status: "ERROR" });
      } else {
        res.json({ message: "File uploaded succesfully !!", status: "success", filePath: serverpath + '' + video_image_path, serverpath: serverpath, video_image_path: video_image_path, filetype: filetype });


      }
    });




  } else {
    try {
      fs.unlinkSync(originalpathoffile)
      res.json({
        'message': 'Upload correct file format !! Your file format is ' + req.body.filetype,
        'status': 'error', filePath: ''

      });
    } catch (err) {
      res.json({
        'message': 'Upload correct file format !! Your file format is ' + req.body.filetype + ".",
        'status': 'error', filePath: ''

      });
    }
  }


});


router.post('/uploadfileAPI', multipartMiddleware, (req, res, next) => {
  var originalpathoffile = req.file.path;

  if (req.body.filetype == 'image/png' || req.body.filetype == 'image/jpeg' || req.body.filetype == 'image/jpg' || req.body.filetype == 'image/PNG' || req.body.filetype == 'image/JPG' || req.body.filetype == 'image/JPEG') {
    var image_path = req.file.path.replace("\\", "/");
    var image_path = image_path.replace("public/", "");

    let updatedobj = {
      image_path: image_path,
      serverpath: serverpath,

    };
    Clients.updateOne({ '_id': req.body._id }, { $set: updatedobj }, (err, client) => {
      if (err) {
        res.json({ message: "Something is wrong " + err, status: "errro", filePath: '' });
      } else {
        res.json({ message: "File uploaded succesfully !!", status: "success", filePath: serverpath + '' + image_path, serverpath: serverpath, image_path: image_path });

      }
    });


  } else {
    try {
      fs.unlinkSync(originalpathoffile)
      res.json({
        'message': 'Upload correct file format !! Your file format is ' + req.body.filetype,
        'status': 'error', filePath: ''

      });
    } catch (err) {
      res.json({
        'message': 'Upload correct file format !! Your file format is ' + req.body.filetype + ".",
        'status': 'error', filePath: ''

      });
    }
  }

});

router.post('/uploadQuestionAPI', multipartMiddleware_questionfile, (req, res, next) => {
  var originalpathoffile = req.file.path;
  if (req.body.filetype == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || req.body.filetype == '.csv' || req.body.filetype == 'application/vnd.ms-excel') {

    if (req.files.profile.originalFilename.split('.')[req.files.profile.originalFilename.split('.').length - 1] === 'xlsx') {
      exceltojson = xlsxtojson;


    } else {
      exceltojson = xlstojson;
    }
    try {
      exceltojson({
        input: originalpathoffile, //the same path where we uploaded our file
        output: null, //since we don't need output.json
        lowerCaseHeaders: true
      }, function (err, result) {
        if (err) {
          fs.unlinkSync(originalpathoffile);
          res.json({
            'message': 'Something is wrong ' + err,
            'status': 'error', filePath: ''

          });

        } else {


          var QuestionArr = [];
          var errorFound = '';
          var headerArr = ['week', 'question_type', 'test_type', 'day', 'questions', "audio", 'a', 'b', 'c', 'd', 'correct_answer', 'question_marks', 'explanation', 'duration'];


          Questions.find({ $and: [{ "tablestatus": "TRUE" }, { "course_id": req.body.course_id }, { "sub_course_id": req.body.sub_course_id }] }, function (err, Questionlist) {



            for (let y = 0; y < result.length; y++) {
              if (result[y]['questions'] != '') {
                var alreadyfoundQ = false;

                for (let r = 0; r < Questionlist.length; r++) {
                  if (Questionlist[r].question == result[y]['questions']) {
                    alreadyfoundQ = true;
                    break;
                  }
                }
                if (!alreadyfoundQ) {

                  var linenumber = y + 1;
                  var headerok = true;
                  //check headers
                  var uplodedHeader = Object.keys(result[y]);
                  if (uplodedHeader.length == headerArr.length) {
                    for (var heade = 0; heade < uplodedHeader.length; heade++) {
                      var uploadedElemntHead = uplodedHeader[heade];
                      var a = headerArr.indexOf(uploadedElemntHead);
                      if (a == -1) {
                        headerok = false; break;
                      }
                    }
                  }
                  if (headerok) {
                    var everyRowOK = true;
                    if (result[y]['question_type'] == '' || result[y]['week'] == '' || result[y]['test_type'] == '' || result[y]['day'] == '' || result[y]['questions'] == '' || result[y]['a'] == '' || result[y]['b'] == '' || result[y]['c'] == '' || result[y]['d'] == '' || result[y]['correct_answer'] == '' || result[y]['question_marks'] == '' || result[y]['duration'] == '') {
                      everyRowOK = false;
                      if (result[y]['question_type'] == '') {
                        errorFound = "Correct format not found on Line " + linenumber + '. It should completely filled  ' + result[y - 1]['questions'];
                      }
                      else if (result[y]['week'] == '') {
                        errorFound = "Correct format not found on Line " + linenumber + '. It should completely filled  (week)';
                      }
                      else if (result[y]['test_type'] == '') {
                        errorFound = "Correct format not found on Line " + linenumber + '. It should completely filled (test_type)';
                      }
                      else if (result[y]['day'] == '') {
                        errorFound = "Correct format not found on Line " + linenumber + '. It should completely filled (day)';
                      }
                      else if (result[y]['questions'] == '') {
                        errorFound = "Correct format not found on Line " + linenumber + '. It should completely filled (questions)';
                      }
                      else if (result[y]['a'] == '') {
                        errorFound = "Correct format not found on Line " + linenumber + '. It should completely filled (Option A) ';
                      }
                      else if (result[y]['b'] == '') {
                        errorFound = "Correct format not found on Line " + linenumber + '. It should completely filled (Option B)';
                      }
                      else if (result[y]['c'] == '') {
                        errorFound = "Correct format not found on Line " + linenumber + '. It should completely filled (Option C)';
                      }
                      else if (result[y]['d'] == '') {
                        errorFound = "Correct format not found on Line " + linenumber + '. It should completely filled (Option D)';
                      }
                      else if (result[y]['correct_answer'] == '') {
                        errorFound = "Correct format not found on Line " + linenumber + '. It should completely filled (correct_answer)';
                      }
                      else if (result[y]['question_marks'] == '') {
                        errorFound = "Correct format not found on Line " + linenumber + '. It should completely filled (question_marks)';
                      }
                      else if (result[y]['duration'] == '') {
                        errorFound = "Correct format not found on Line " + linenumber + '. It should completely filled (duration)';
                      }





                      break;
                    }
                    var category = result[y]['test_type'];
                    var level = +result[y]['week'];
                    var question = result[y]['questions'];

                    if (result[y]['audio'] == '' || result[y]['audio'] == null || result[y]['audio'] == undefined) {
                      var audio_line = question;
                    } else {
                      var audio_line = result[y]['audio'];
                    }
                    var duration_of_question = +result[y]['duration'];
                    var day_number = +result[y]['day'];
                    var mark = +result[y]['question_marks'];
                    var question_type = result[y]['question_type'];
                    var remark = result[y]['explanation'];
                    if (question_type == 'N') {
                      question_type = 'Normal';
                    }
                    else if (question_type == 'F') {

                      //var question = question.replace(/_____/g, "_");


                      question_type = 'Fill In The Blanks';
                    }



                    var options = [];
                    if (category != 'Daily' && category != 'Week' && category != 'Final') {
                      everyRowOK = false;
                      errorFound = "Correct format of Test_Type not found on Line " + linenumber + '. It should be Daily or Final or Week';
                      break;
                    }
                    if (!Number.isInteger(level)) {
                      everyRowOK = false;
                      errorFound = "Week number is not correct at at Line  " + linenumber + '. It should be Integer';
                      break;
                    } else {
                      if (level < 1) {
                        everyRowOK = false;
                        errorFound = "Week number is not correct at at Line  " + linenumber + '. It should be more than 1';
                        break;
                      }
                    }
                    if (!Number.isInteger(day_number)) {
                      everyRowOK = false;
                      errorFound = "Day number is not correct at at Line  " + linenumber + '. It should be Integer';
                      break;
                    } else {
                      if (day_number < 1) {
                        everyRowOK = false;
                        errorFound = "Day number is not correct at at Line  " + linenumber + '. It should be more than 1';
                        break;
                      }
                    }
                    if (Number.isNaN(mark)) {
                      everyRowOK = false;
                      errorFound = "Question_Marks is not correct at at Line  " + linenumber + '. It should be Number';
                      break;
                    }
                    else {
                      if (mark < 0) {
                        everyRowOK = false;
                        errorFound = "Question_Marks is not correct at at Line  " + linenumber + '. It should be more than 0';
                        break;
                      }
                    }
                    if (Number.isNaN(duration_of_question)) {
                      everyRowOK = false;
                      errorFound = "Duration is not correct at at Line  " + linenumber + '. It should be Number';
                      break;
                    }
                    else {
                      if (duration_of_question < 0) {
                        everyRowOK = false;
                        errorFound = "Duration is not correct at at Line  " + linenumber + '. It should be more than 0';
                        break;
                      }
                    }

                    if (result[y]['correct_answer'] != 'A' && result[y]['correct_answer'] != 'D' && result[y]['correct_answer'] != 'C' && result[y]['correct_answer'] != 'B') {
                      everyRowOK = false;
                      errorFound = "Correct_Answer is not correct at at Line  " + linenumber + '. It should be A,B,C or D';
                      break;
                    }

                    if (everyRowOK) {
                      var options = [];
                      if (result[y]['correct_answer'] == 'A') {
                        options.push({ value: result[y]['a'], status: true });
                      } else {
                        options.push({ value: result[y]['a'], status: false });
                      }
                      if (result[y]['correct_answer'] == 'B') {
                        options.push({ value: result[y]['b'], status: true });
                      } else {
                        options.push({ value: result[y]['b'], status: false });
                      }
                      if (result[y]['correct_answer'] == 'C') {
                        options.push({ value: result[y]['c'], status: true });
                      } else {
                        options.push({ value: result[y]['c'], status: false });
                      }
                      if (result[y]['correct_answer'] == 'D') {
                        options.push({ value: result[y]['d'], status: true });
                      } else {
                        options.push({ value: result[y]['d'], status: false });
                      }


                      var question_id_join_query = mwUnique.getUniqueID();


                      var perQuestionObj = {
                        question: question,
                        question_id_join_query: question_id_join_query,
                        course_id: req.body.course_id,
                        sub_course_id: req.body.sub_course_id,
                        course_name: req.body.course_name,
                        sub_course_name: req.body.sub_course_name,

                        category: category,
                        level: level,
                        day_number: day_number,
                        options: options,
                        remark: remark,
                        audio_line: audio_line,
                        mark: mark,
                        duration_of_question: duration_of_question,
                        question_type: question_type,
                        adding_date: new_Date(),
                        created_on: new Date(),
                        created_by: created_by,
                        tablestatus: 'TRUE'
                      };
                      QuestionArr.push(perQuestionObj);





                    }


                  } else {

                    errorFound = "Correct format not found on Line " + linenumber + " because of not correct header";
                    break;
                  }

                  //check headrs end
                }
              }
            }
            if (errorFound == '') {

              if (QuestionArr.length > 0) {
                try {
                  Questions.insertMany(QuestionArr);
                  res.json({
                    'message': 'File Uploaded Successfully ',
                    'status': 'success', filePath: ''

                  });
                } catch (e) {

                  fs.unlinkSync(originalpathoffile);
                  res.json({
                    'message': e,
                    'status': 'error', filePath: ''

                  });
                }
              } else {
                fs.unlinkSync(originalpathoffile);
                res.json({
                  'message': 'No data (or new data ) found in file !!',
                  'status': 'error', filePath: ''

                });
              }



            } else {
              fs.unlinkSync(originalpathoffile);
              res.json({
                'message': errorFound,
                'status': 'error', filePath: ''

              });

            }
          });
        }

      });
    } catch (e) {
      fs.unlinkSync(originalpathoffile);
      res.json({
        'message': 'Corupted excel file ',
        'status': 'error', filePath: ''

      });
    }




  } else {

    try {
      fs.unlinkSync(originalpathoffile);
      res.json({
        'message': 'Upload correct file format !! Your file format is ' + req.body.filetype,
        'status': 'error', filePath: ''

      });
    } catch (err) {
      res.json({
        'message': 'Upload correct file format !! Your file format is ' + req.body.filetype + ". Error in removing file",
        'status': 'error', filePath: ''

      });
    }

  }

});


function breakDate2(starting_date, ending_date, loopdate) {
  //   //console.log("loop date " + loopdate);
  //   //console.log("starting_date date " + starting_date);
  //   //console.log("ending_date date " + ending_date);

  //   //console.log("loop date after convert " + covertGivenDateWithTime(loopdate));
  //   //console.log("starting_date after convert " + covertGivenDateWithTime(starting_date));
  //   //console.log("ending_date after convert " + covertGivenDateWithTime(ending_date));
  ending_date = covertGivenDateWithTime(ending_date);
  starting_date = covertGivenDateWithTime(starting_date);
  //   //console.log("loopdate " + covertGivenDateWithTime(loopdate).getTime());
  //   //console.log("ending_date " + covertGivenDateWithTime(ending_date).getTime());

  var diffForEnddate = Math.abs(covertGivenDateWithTime(starting_date).getTime() - covertGivenDateWithTime(loopdate).getTime());
  var diffDaysEndDate = Math.ceil(diffForEnddate / (1000 * 3600 * 24));


  //   //console.log("start - loop " + diffDaysEndDate);


  var diffForSSEnddate = Math.abs(covertGivenDateWithTime(ending_date).getTime() - covertGivenDateWithTime(starting_date).getTime());
  var diffDaysSSEndDate = Math.ceil(diffForSSEnddate / (1000 * 3600 * 24));


  //   //console.log("end - start " + diffDaysSSEndDate);
  //   //console.log("ending_date toString" + covertGivenDateWithTime(ending_date).toString());
  //   //console.log("loop date toString" + covertGivenDateWithTime(loopdate).toString());

  var dt1 = new Date(starting_date);
  var dt2 = new Date(loopdate);

  var diffDays = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));


  var day_number = diffDays + 1;


  if (covertGivenDateWithTime(loopdate).toString() == covertGivenDateWithTime(ending_date).toString()) {
    // that means last day of course
    //console.log("that means last day of course");
    var weekOrday = "Final"; var weekNo = 0;
  } else {



    var remainder = day_number / 7;
    if (parseInt(remainder) === remainder) {
      var weekNo = parseInt(remainder);
    } else {
      var weekNo = parseInt(remainder) + 1;
    }


    if (remainder < weekNo) {
      var weekOrday = "Daily";
    } else if (remainder == weekNo) {
      var weekOrday = "Week";

    }
  }

  ///

  var dt1 = new Date(loopdate);
  var dt2 = new Date();

  var diffDaysFromCurrentdate = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));

  ///
  if (diffDaysFromCurrentdate < 0) {
    var whichdate = "FUTURE";
  }
  else if (diffDaysFromCurrentdate == 0) {
    var whichdate = "CURRENT";
  } else {
    var whichdate = "PAST";
  }

  //  console.log({
  //   'diffDaysFromCurrentdate': diffDaysFromCurrentdate,
  //   'whichdate': whichdate, 'loopdate': covertGivenDateWithTime(loopdate), 'exam_date': covertGivenDateWithTime(loopdate), 'weekOrday': weekOrday, 'weekNo': weekNo, 'diffDays': diffDays,
  //   'day_number': day_number, 'remainder': remainder
  // });
  return {
    'diffDaysFromCurrentdate': diffDaysFromCurrentdate, 'whichdate': whichdate, 'loopdate': covertGivenDateWithTime(loopdate),
    'exam_date': covertGivenDateWithTime(loopdate), 'weekOrday': weekOrday, 'weekNo': weekNo, 'diffDays': diffDays,
    'day_number': day_number, 'remainder': remainder
  }
}

function breakDate_for_assignQuestionAutomatciWorking(percourse, starting_date, ending_date, todaysDate) {
  var dt1 = new Date(starting_date);
  var dt2 = new Date(todaysDate);

  var diffDays = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));


  var day_number = diffDays + 1;


  if (changedateformat(todaysDate) == changedateformat(ending_date)) {
    // that means last day of course
    //console.log("that means last day of course");
    var weekOrday = "Final"; var weekNo = 0;
  } else {



    var remainder = day_number / 7;
    if (parseInt(remainder) === remainder) {
      var weekNo = parseInt(remainder);
    } else {
      var weekNo = parseInt(remainder) + 1;
    }


    if (remainder < weekNo) {
      var weekOrday = "Daily";
    } else if (remainder == weekNo) {
      var weekOrday = "Week";

    }
  }

  // //console.log({ 'date': todaysDate, 'weekOrday': weekOrday, 'weekNo': weekNo, 'diffDays': diffDays, 'day_number': day_number, 'remainder': remainder });

  return { 'date': todaysDate, 'weekOrday': weekOrday, 'weekNo': weekNo, 'diffDays': diffDays, 'day_number': day_number, 'remainder': remainder }
}



///  payment 
var PaytmConfig = {
  mid: "XcelTe17922011826413",
  key: "lSOcxP_9g2536#iL",
  website: "XcelTeWEB"
}

const checksum_lib = require('./checksum');

router.get('/payoptionprovidedbyPAYTM/:orderId/:c_id_int/:amount', (req, res, next) => {
  var c_id_int = +req.params.c_id_int;
  var orderId = req.params.orderId;
  var amount = req.params.amount;

  var params = {};
  params['MID'] = PaytmConfig.mid;
  params['WEBSITE'] = PaytmConfig.website;
  params['CHANNEL_ID'] = 'WEB';
  params['INDUSTRY_TYPE_ID'] = 'Retail';
  params['ORDER_ID'] = orderId;
  params['CUST_ID'] = 'C_' + c_id_int;
  params['TXN_AMOUNT'] = amount;
  params['CALLBACK_URL'] = serverpath + "api/callback";
  params['EMAIL'] = 'kishanrock777@gmail.com';
  params['MOBILE_NO'] = '8802010213';

  checksum_lib.genchecksum(params, PaytmConfig.key, function (err, checksum) {

    //	var txn_url = "https://securegw-stage.paytm.in/theia/processTransaction"; // for staging
    var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production

    var form_fields = "";
    for (var x in params) {
      form_fields += "<input type='hidden' name='" + x + "' value='" + params[x] + "' >";
    }
    form_fields += "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "' >";

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="' + txn_url + '" name="f1">' + form_fields + '</form><script type="text/javascript">document.f1.submit();</script></body></html>');
    res.end();
  });
});


router.get('/payoptionprovidedbyPAYTM_test', (req, res, next) => {
  var c_id_int = new_Date().getTime();
  var orderId = 'TEST_' + new_Date().getTime();    // returns a random integer from 0 to 9  
  var amount = "10.00";

  var paytmParams = {};
  paytmParams['MID'] = mid;
  paytmParams['WEBSITE'] = websiteName;
  paytmParams['CHANNEL_ID'] = 'WEB';
  paytmParams['INDUSTRY_TYPE_ID'] = 'Retail';
  paytmParams['ORDER_ID'] = orderId;
  paytmParams['CUST_ID'] = c_id_int;
  paytmParams['TXN_AMOUNT'] = amount;
  paytmParams['CALLBACK_URL'] = serverpath + "api/callback/" + orderId + '/' + c_id_int;
  paytmParams['MOBILE_NO'] = "8802010213";
  paytmParams['EMAIL'] = "kishanrock777@gmail.com";
  checksum_lib.genchecksumbystring(JSON.stringify(paytmParams), key, function (err, checksum) {


    if (!checksum_lib.verifychecksumbystring(JSON.stringify(paytmParams), key, checksum)) {
      var html = "<html><body><br/><br/><br/><br/><h1 align='center'>Not valid   checksum  " + checksum + "</h1> </body></html>";
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write(html);
      res.end();
    } else {
      let txn_url = 'https://securegw.paytm.in/order/process';
      let form_field = "";
      for (x in paytmParams) {
        form_field += "<input type='hidden' name='" + x + "'  value='" + paytmParams[x] + "'/>";
      }
      form_field += "<input type='hidden' name='CHECKSUMHASH'  value='" + checksum + "'/>";

      var html = "<html><body><br/><br/><br/><br/><h1 align='center'>Please do not refresh the page</h1><form name='f1' method='post' action='" + txn_url + "'>" + form_field + "<button onclick='document.f1.submit()'>save </button></form><script type='text/javascript'></script></body></html>";
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write(html);
      res.end();
    }



  });
});
router.post('/callback', (req, res, next) => {

  var body = '';

  req.on('data', function (data) {
    body += data;
  });

  req.on('end', function () {
    var html = "";
    var post_data = qs.parse(body);
    let newTempOrdersOBJ = new TempOrders({


      order_no: post_data['ORDERID'],

      bank_array: post_data,
      created_on: new Date(),

    });


    newTempOrdersOBJ.save((err, client) => {
      if (err) {
        //console.log("Error in payment order - " + req.params.orderId);
      } else {
        //console.log("success in payment order - " + req.params.orderId);

      }
    });
    // *******************  commenting this  ***************
    // received params in callback
    //console.log('Callback Response: ', post_data, "\n");
    html += "<b>Callback Response</b><br>";
    for (var x in post_data) {
      html += x + " => " + post_data[x] + "<br/>";
    }
    html += "<br/><br/>";


    // verify the checksum
    var checksumhash = post_data.CHECKSUMHASH;
    // delete post_data.CHECKSUMHASH;
    var result = checksum_lib.verifychecksum(post_data, PaytmConfig.key, checksumhash);
    //console.log("Checksum Result => ", result, "\n");
    html += "<b>Checksum Result</b> => " + (result ? "True" : "False");
    html += "<br/><br/>";



    // Send Server-to-Server request to verify Order Status
    var params = { "MID": PaytmConfig.mid, "ORDERID": post_data.ORDERID };

    checksum_lib.genchecksum(params, PaytmConfig.key, function (err, checksum) {

      params.CHECKSUMHASH = checksum;
      post_data = 'JsonData=' + JSON.stringify(params);

      var options = {
        //	hostname: 'securegw-stage.paytm.in', // for staging
        hostname: 'securegw.paytm.in', // for production
        port: 443,
        path: '/merchant-status/getTxnStatus',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': post_data.length
        }
      };


      // Set up the request
      var response = "";
      var post_req = https.request(options, function (post_res) {
        post_res.on('data', function (chunk) {
          response += chunk;
        });

        post_res.on('end', function () {
          console.log('S2S Response: ', response, "\n");

          var _result = JSON.parse(response);
          html += "<b>Status Check Response</b><br>";
          for (var x in _result) {
            html += x + " => " + _result[x] + "<br/>";
          }

          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.write(html);
          res.end();
        });
      });

      // post the data
      post_req.write(post_data);
      post_req.end();
    });
    // *******************  commenting this  ***************


  });





});

router.post('/getOrderListOfSelectedClient', (req, res, next) => {

  let searchArr = [];
  var c_id_intArr = req.body.c_id_intArr;
  searchArr.push({ "c_id_int": { $in: c_id_intArr } });

  Orders.find({ $and: searchArr }, function (err, orderlist) {
    res.json(orderlist);
  });
});

router.get('/pending_oredrList', (req, res, next) => {

  let searchArr = [];

  searchArr.push({ "order_status": 'PENDING' });


  Orders.find({ $and: searchArr }, function (err, pendingorder) {
    res.json(pendingorder);
  }).sort({ 'created_on': -1 });
});

router.get('/Nonpending_oredrList', (req, res, next) => {

  var searchArr = [{ "order_no": { $ne: "PENDING" } }];



  Orders.find({ $and: searchArr }, function (err, Nonpendingorder) {
    res.json(Nonpendingorder);
  }).sort({ 'created_on': -1 });
});
router.get('/check_order_status_directly_by_order_id_from_paytm_package/:orderNO', (req, res, next) => {

  var orderNO = req.params.orderNO;

  request("http://xcellinsindiapro.com/sale/TxnStatusAPI.php?order_id=" + orderNO, function (error, response, body) {
    body = JSON.parse(body);

    if (body.status == 'SUCCESS') {
      console.log("Order no " + body.responseParamList.ORDERID);

      if (body.responseParamList.STATUS !== 'TXN_SUCCESS') {

        res.json({ "message": "Transaction is not successfull", 'status': 'ERROR', "extra": body.responseParamList });

      } else {



        let searchArr = [];
        searchArr.push({ "order_no": orderNO });


        Orders.findOne({ $and: searchArr }, function (err, OrderOneByOne) {
          if (OrderOneByOne) {
            if (OrderOneByOne.order_status == 'PENDING') {

              TempOrders.findOne({ 'order_no': orderNO }, function (err, checkifthisorderisinoutTemporder) {
                if (err) {
                  res.json({ "message": "Transaction is successfull but Something Is Wrong", 'status': 'ERROR', "extra": body.responseParamList });

                } else {







                  if (checkifthisorderisinoutTemporder) {
                    if (checkifthisorderisinoutTemporder.bank_array[0].STATUS == 'PENDING') {
                      var bank_array = [];
                      bank_array.push(body.responseParamList);
                      TempOrders.updateOne({ '_id': checkifthisorderisinoutTemporder._id }, { $set: { 'bank_array': bank_array } }, (err1, rd) => {
                        if (err1) {
                          res.json({ "message": "Transaction is successfull but error in updating Temp order", 'status': 'ERROR', "extra": body.responseParamList });
                        } else {
                          res.json({ "message": "Transaction is successfull now updating in our database. ", 'status': 'SUCCESS', "extra": body.responseParamList });
                        }
                      });
                    } else {
                      res.json({ "message": "Transaction is successfull now updating in our database.", 'status': 'SUCCESS', "extra": body.responseParamList });
                    }

                  } else {
                    var bank_array = [];
                    bank_array.push(body.responseParamList);
                    let newTempOrdersOBJ = new TempOrders({


                      order_no: orderNO,

                      bank_array: bank_array,
                      created_on: new Date(),

                    });


                    newTempOrdersOBJ.save((err, client) => {
                      if (err) {
                        res.json({ "message": "Transaction is successfull but Something Is Wrong. can not save in temp orders", 'status': 'ERROR', "extra": body.responseParamList });
                      } else {
                        res.json({ "message": "Transaction is successfull now updating in our database", 'status': 'SUCCESS', "extra": body.responseParamList });

                      }
                    });
                  }
                }


              }).sort({ 'created_on': -1 });



            } else {
              res.json({ 'status': 'SUCCESS2', "message": "Order Status IS Successfull and we already have it in our database with success status", "extra": body.responseParamList });
            }
          } else {

            res.json({ "message": "Transaction is successfull but This Order does not belong to " + appname, 'status': 'ERROR', "extra": body.responseParamList });
          }
        });





      }

    } else {
      console.log("body.message i am here paytm plugin");
      res.json({ "message": body.message, 'status': 'ERROR' });


    }

  });


});




router.get('/check_payment_status/:orderId/:c_id_int', (req, res, next) => {
  var c_id_int = +req.params.c_id_int;
  var orderId = req.params.orderId;

  TempOrders.findOne({ 'order_no': orderId }, function (err, paymentstatsus) {
    if (err) {

      res.json({ "paymentstatsus": { bank_array: [{ 'STATUS': 'TXN_FAILURE' }] }, 'status': 'Found' });
    } else {
      if (paymentstatsus) {
        Orders.updateOne({ 'order_no': orderId }, { $set: { 'bank_array': paymentstatsus.bank_array } }, (err1, rd) => {
          if (err1) {
            res.json({ "paymentstatsus": paymentstatsus, 'status': 'Found', "message": "With error in saving" });
          } else {
            res.json({ "paymentstatsus": paymentstatsus, 'status': 'Found' });
          }
        });

      } else {
        res.json({ "paymentstatsus": {}, 'status': 'Not Found', "message": "Not found c_id_int " + c_id_int + ", orderId " + orderId });
      }
    }


  }).sort({ 'created_on': -1 });


});
///  payment emd

router.get('/run_check_payment_status_in_backened/:orderNO', (req, res, next) => {
  var orderNO = req.params.orderNO;
  request(serverpath + "api/updateOrderStatusOfPendingOrdersOneByOne/" + orderNO, function (error, response, body) {
    body = JSON.parse(body);

    if (body.status == 'SUCCESS') {
      console.log("Order no " + body.pendingOrderOneByOne.order_no + "c_id_int " + body.pendingOrderOneByOne.c_id_int);
      request(serverpath + "api/check_payment_status/" + body.pendingOrderOneByOne.order_no + "/" + body.pendingOrderOneByOne.c_id_int, function (error1, response1, body1) {
        body1 = JSON.parse(body1);

        if (body1.status == 'Found') {
          if (body1.paymentstatsus.bank_array[0].STATUS == "TXN_FAILURE") {
            var order_status = 'FAIL';
          } else {
            var order_status = 'SUCCESS';
          }

          request(serverpath + "api/updateStatusOfOrder/" + body.pendingOrderOneByOne._id + "/" + order_status, function (error12, response12, body12) {
            body12 = JSON.parse(body12);

            if (body12.status == 'SUCCESS') {
              if (orderNO != 'ALL') {
                res.send(body12.message);
              } else {
                console.log("body12.message"); console.log(body12.message);
              }



            } else {
              if (orderNO != 'ALL') {
                res.send(body12.message);
              } else {
                console.log("body12.message fail"); console.log(body12.message);
              }
            }

          });


        } else {
          if (orderNO != 'ALL') {
            res.send(body1.message);
          } else {
            console.log("body1.message--"); console.log(body1.message);
          }
        }

      });
    } else {
      console.log("body.message i am here");
      if (orderNO != 'ALL') {
        res.send(body.message);
      } else {
        console.log("body.message"); console.log(body.message);
      }
    }

  });


});

router.get('/updateOrderStatusOfPendingOrdersOneByOne/:orderNO', (req, res, next) => {
  var orderNO = req.params.orderNO;

  if (orderNO != 'ALL') {
    var searchArrTemp = [{ "order_no": orderNO }];
  } else {
    var searchArrTemp = [{ "order_no": { $ne: "" } }];
  }



  TempOrders.find({ $and: searchArrTemp }, function (err, TempOrdersList) {

    if (TempOrdersList.length > 0) {
      var order_noArr = [];
      for (var d = 0; d < TempOrdersList.length; d++) {
        order_noArr.push(TempOrdersList[d].order_no);
      }
      let searchArr = [];
      searchArr.push({ "order_no": { $in: order_noArr } });

      searchArr.push({ "order_status": 'PENDING' });
      Orders.findOne({ $and: searchArr }, function (err, pendingOrderOneByOne) {
        if (pendingOrderOneByOne) {
          res.json({ 'status': 'SUCCESS', "pendingOrderOneByOne": pendingOrderOneByOne });
        } else {
          res.json({ 'status': 'ERROR', "message": "No pending order found " });
        }
      });


    } else {
      if (orderNO != 'ALL') {
        res.json({ 'status': 'ERROR', "message": "Order Status Is Pending" });
      } else {
        res.json({ 'status': 'ERROR', "message": "No order found !" });

      }
    }



  });




});


router.get('/deleteExtraNotification', (req, res, next) => {
  Clients.find({ "tablestatus": "FALSE" }, function (err, ClientsList) {
    //
    var c_id_intArrClient = [];

    for (let c = 0; c < ClientsList.length; c++) {

      c_id_intArrClient.push(ClientsList[c].c_id_int);
    }
    var c_idArrClient = [];

    for (let c = 0; c < ClientsList.length; c++) {

      c_idArrClient.push(ClientsList[c]._id);
    }


    var searchArr = [];


    searchArr.push({ "c_id_int": { $in: c_id_intArrClient } });
    var searchArr2 = [];


    searchArr2.push({ "c_id": { $in: c_idArrClient } });




    Notifications.remove({ $and: searchArr }, function (err1, removedobj) {
      if (err1) {
        assigned_questions.remove({ $and: searchArr2 }, function (err12, removedobj2) {
          if (err12) {
            submitted_answer.remove({ $and: searchArr2 }, function (err122, removedobj22) {
              if (err122) {
                console.log({ message: "Something is wrong " + err122, status: "ERROR" });
              } else {
                console.log({ message: "extar deleted Successfully !!", status: "SUCCESS" });
              }


            });
          } else {
            submitted_answer.remove({ $and: searchArr2 }, function (err122, removedobj22) {
              if (err122) {
                console.log({ message: "Something is wrong " + err122, status: "ERROR" });
              } else {
                console.log({ message: "extar deleted Successfully !!", status: "SUCCESS" });
              }


            });
          }


        });
      } else {
        assigned_questions.remove({ $and: searchArr2 }, function (err12, removedobj2) {
          if (err12) {
            submitted_answer.remove({ $and: searchArr2 }, function (err122, removedobj22) {
              if (err122) {
                console.log({ message: "Something is wrong " + err122, status: "ERROR" });
              } else {
                console.log({ message: "extar deleted Successfully !!", status: "SUCCESS" });
              }


            });
          } else {
            submitted_answer.remove({ $and: searchArr2 }, function (err122, removedobj22) {
              if (err122) {
                console.log({ message: "Something is wrong " + err122, status: "ERROR" });
              } else {
                console.log({ message: "extar deleted Successfully !!", status: "SUCCESS" });
              }


            });
          }


        });

      }


    });



    //
  });
});


///  empty db
router.get('/emptytable/:tablename', (req, res, next) => {
  var tablename = req.params.tablename;

  if (tablename == 'Orders') {


    Orders.remove({}, function (err1, removedobj) {
      if (err1) {
        res.json({ message: "Something is wrong " + err1, status: "ERROR" });
      } else {
        res.json({ message: "Order deleted Successfully !!", status: "SUCCESS" });
      }


    });
  }
  else if (tablename == 'submitted_answer') {


    submitted_answer.remove({}, function (err1, removedobj) {
      if (err1) {
        res.json({ message: "Something is wrong " + err1, status: "ERROR" });
      } else {
        res.json({ message: "submitted_answer deleted Successfully !!", status: "SUCCESS" });
      }


    });
  }
  else if (tablename == 'assigned_questions') {


    assigned_questions.remove({}, function (err1, removedobj) {
      if (err1) {
        res.json({ message: "Something is wrong " + err1, status: "ERROR" });
      } else {
        res.json({ message: "assigned_questions deleted Successfully !!", status: "SUCCESS" });
      }


    });
  }

  else if (tablename == 'contact') {


    contact.remove({}, function (err1, removedobj) {
      if (err1) {
        res.json({ message: "Something is wrong " + err1, status: "ERROR" });
      } else {
        res.json({ message: "contact deleted Successfully !!", status: "SUCCESS" });
      }


    });
  }


  else if (tablename == 'Coupons') {


    Coupons.remove({}, function (err1, removedobj) {
      if (err1) {
        res.json({ message: "Something is wrong " + err1, status: "ERROR" });
      } else {
        res.json({ message: "Coupons deleted Successfully !!", status: "SUCCESS" });
      }


    });
  }

  else if (tablename == 'Clients') {


    Clients.remove({}, function (err1, removedobj) {
      if (err1) {
        res.json({ message: "Something is wrong " + err1, status: "ERROR" });
      } else {
        res.json({ message: "Clients deleted Successfully !!", status: "SUCCESS" });
      }


    });
  }


  else if (tablename == 'Tutorials') {


    Tutorials.remove({}, function (err1, removedobj) {
      if (err1) {
        res.json({ message: "Something is wrong " + err1, status: "ERROR" });
      } else {
        res.json({ message: "Tutorials deleted Successfully !!", status: "SUCCESS" });
      }


    });
  }
  else if (tablename == 'Questions') {


    Questions.remove({}, function (err1, removedobj) {
      if (err1) {
        res.json({ message: "Something is wrong " + err1, status: "ERROR" });
      } else {
        res.json({ message: "Questions deleted Successfully !!", status: "SUCCESS" });
      }


    });
  }

  else if (tablename == 'Course') {


    Course.remove({}, function (err1, removedobj) {
      if (err1) {
        res.json({ message: "Something is wrong " + err1, status: "ERROR" });
      } else {
        res.json({ message: "Course deleted Successfully !!", status: "SUCCESS" });
      }


    });
  }
  else if (tablename == 'Notifications') {


    Notifications.remove({}, function (err1, removedobj) {
      if (err1) {
        res.json({ message: "Something is wrong " + err1, status: "ERROR" });
      } else {
        res.json({ message: "Notifications deleted Successfully !!", status: "SUCCESS" });
      }


    });
  }

  else if (tablename == 'TempOrders') {


    TempOrders.remove({}, function (err1, removedobj) {
      if (err1) {
        res.json({ message: "Something is wrong " + err1, status: "ERROR" });
      } else {
        res.json({ message: "TempOrders deleted Successfully !!", status: "SUCCESS" });
      }


    });
  }
  else if (tablename == 'OTP') {


    OTP.remove({}, function (err1, removedobj) {
      if (err1) {
        res.json({ message: "Something is wrong " + err1, status: "ERROR" });
      } else {
        res.json({ message: "OTP deleted Successfully !!", status: "SUCCESS" });
      }


    });
  }
  else if (tablename == 'ASK') {


    Asked.remove({}, function (err1, removedobj) {
      if (err1) {
        res.json({ message: "Something is wrong " + err1, status: "ERROR" });
      } else {
        Asked_Chat.remove({}, function (err1s, removedobjs) {
          if (err1s) {
            res.json({ message: "Something is wrong " + err1s, status: "ERROR" });
          } else {
            res.json({ message: "Asked deleted Successfully !!", status: "SUCCESS" });
          }


        });
      }


    });
  }

});

////  empty db end

////  dashboard
router.get('/dashboarddata', (req, res, next) => {

  var totalInstall = 0; // that have provided mobile number..
  var totalUser = 0; // that have paid at least one time
  var totalOrder = 0; // successfull order...or how many curse sold
  var totalSaleAmount = 0; // successfull order....

  Clients.find({ "tablestatus": "TRUE" }, function (err, ClientsList) {
    //
    var c_id_intArrClient = [];
    totalInstall = ClientsList.length;
    for (let c = 0; c < ClientsList.length; c++) {

      c_id_intArrClient.push(ClientsList[c].c_id_int);
    }



    var searchArr = [];

    searchArr.push({ "order_status": 'SUCCESS' });
    searchArr.push({ "c_id_int": { $in: c_id_intArrClient } });
    Orders.find({ $and: searchArr }, function (err, orderList) {

      var c_id_intArr = [];

      if (orderList.length > 0) {

        for (let c = 0; c < orderList.length; c++) {
          if (orderList[c].bank_array[0].TXNID != 'ADMINPURCHASE') {
            totalSaleAmount = totalSaleAmount + orderList[c].amount;
            c_id_intArr.push(orderList[c].c_id_int);
            totalOrder = totalOrder + 1;
          }

        }
      }
      totalUser = new Set(c_id_intArr).size;

      res.json({ "totalInstall": totalInstall, 'totalUser': totalUser, 'totalOrder': totalOrder, 'totalSaleAmount': totalSaleAmount });


    });


    //




    //
  });



});
router.post('/dashboarddata', (req, res, next) => {

  var totalInstall = 0; // that have provided mobile number..
  var totalUser = 0; // that have paid at least one time
  var totalOrder = 0; // successfull order...or how many curse sold
  var totalSaleAmount = 0; // successfull order....
  var dateType = req.body.dateType;
  if (dateType == 'ALL') {
    var to_date = covertGivenDateWithTimeMax(new Date());
  }
  else if (dateType == 'Todays' || dateType == 'Today') {
    var from_date = covertGivenDateWithTime(new Date());
    var to_date = covertGivenDateWithTimeMax(new Date());
  } else if (dateType == 'Range') {
    var from_date = covertGivenDateWithTime(req.body.from_date);
    var to_date = covertGivenDateWithTimeMax(req.body.to_date);
  } else if (dateType == 'Yesterday') {
    var from_date = covertGivenDateWithTime(new Date().setDate(new Date().getDate() - 1));
    var to_date = covertGivenDateWithTimeMax(new Date().setDate(new Date().getDate() - 1));
  } else if (dateType == 'Last 7 days') {
    var from_date = covertGivenDateWithTime(new Date().setDate(new Date().getDate() - 6));
    var to_date = covertGivenDateWithTimeMax(new Date());
  } else if (dateType == 'Last 30 days') {
    var from_date = covertGivenDateWithTime(new Date().setDate(new Date().getDate() - 29));
    var to_date = covertGivenDateWithTimeMax(new Date());
  } else if (dateType == "This Month") {
    var date = new Date();
    var from_date = covertGivenDateWithTime(new Date(date.getFullYear(), date.getMonth(), 1));
    var to_date = covertGivenDateWithTimeMax(new Date(date.getFullYear(), date.getMonth() + 1, 0));
  }
  else if (dateType == "Last Month") {
    var now = new Date();
    var prevMonthLastDate = new Date(now.getFullYear(), now.getMonth(), 0);
    var prevMonthFirstDate = new Date(now.getFullYear() - (now.getMonth() > 0 ? 0 : 1), (now.getMonth() - 1 + 12) % 12, 1);
    var from_date = covertGivenDateWithTime(prevMonthFirstDate);
    var to_date = covertGivenDateWithTimeMax(prevMonthLastDate);

  }
  else if (dateType == "This Week") { ///////////////////
    var curr = new Date;
    var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
    var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));
    var from_date = covertGivenDateWithTime(firstday);
    var to_date = covertGivenDateWithTimeMax(lastday);
  }
  else if (dateType == "Last Week") { ///////////////////
    var curr = new Date;
    var startOfWeek_cuurent = new Date(curr.setDate(curr.getDate() - curr.getDay()));
    var lastdayoflastweek = startOfWeek_cuurent.setDate(startOfWeek_cuurent.getDate() - 1);
    var firstdayoflastweek = startOfWeek_cuurent.setDate(startOfWeek_cuurent.getDate() - 6);

    var from_date = covertGivenDateWithTime(firstdayoflastweek);
    var to_date = covertGivenDateWithTimeMax(lastdayoflastweek);
  }


  var fisrtFrom;
  Clients.find({ "tablestatus": "TRUE" }, function (err, ClientsList) {
    //
    var c_id_intArrClient = [];
    var c_id_intArrClient_console = [];
    for (let c = 0; c < ClientsList.length; c++) {
      if (c == 0) {
        var fisrtFrom = ClientsList[c].adding_date;
      }
      c_id_intArrClient.push(ClientsList[c].c_id_int);
      if (dateType == 'ALL') {

        totalInstall = totalInstall + 1;

      } else {
        if (ClientsList[c].adding_date <= to_date && ClientsList[c].adding_date >= from_date) {
          totalInstall = totalInstall + 1;
          c_id_intArrClient_console.push(ClientsList[c].c_id_int);

        }
      }
    }



    var searchArr = [];

    searchArr.push({ "order_status": 'SUCCESS' });
    searchArr.push({ "c_id_int": { $in: c_id_intArrClient } });


    if (dateType !== 'ALL') {
      searchArr.push({ order_date: { $gte: from_date } });

      searchArr.push({ order_date: { $lte: to_date } });


    }


    Orders.find({ $and: searchArr }, function (err, orderList) {

      var c_id_intArr = [];

      if (orderList.length > 0) {

        for (let c = 0; c < orderList.length; c++) {
          if (orderList[c].bank_array[0].TXNID != 'ADMINPURCHASE') {
            totalSaleAmount = totalSaleAmount + orderList[c].amount;
            c_id_intArr.push(orderList[c].c_id_int);
            totalOrder = totalOrder + 1;
          }

        }
      }
      totalUser = new Set(c_id_intArr).size;

      res.json({ "orderList": orderList, "fisrtFrom": fisrtFrom, "totalInstall": totalInstall, "from_date": from_date, "to_date": to_date, 'totalUser': totalUser, 'totalOrder': totalOrder, 'totalSaleAmount': totalSaleAmount });


    });


    //




    //
  });



});

///  dashboard  end
//
router.post('/getAffiliateDashboardData', (req, res, next) => {

  var totalInstall = 0; // that have provided mobile number..
  var totalUser = 0; // that have paid at least one time
  var totalOrder = 0; // successfull order...or how many curse sold
  var totalSaleAmount = 0; // successfull order....
  var dateType = req.body.dateType;
  if (dateType == 'ALL') {
    var to_date = covertGivenDateWithTimeMax(new Date());
  }
  else if (dateType == 'Todays' || dateType == 'Today') {
    var from_date = covertGivenDateWithTime(new Date());
    var to_date = covertGivenDateWithTimeMax(new Date());
  } else if (dateType == 'Range') {
    var from_date = covertGivenDateWithTime(req.body.from_date);
    var to_date = covertGivenDateWithTimeMax(req.body.to_date);
  } else if (dateType == 'Yesterday') {
    var from_date = covertGivenDateWithTime(new Date().setDate(new Date().getDate() - 1));
    var to_date = covertGivenDateWithTimeMax(new Date().setDate(new Date().getDate() - 1));
  } else if (dateType == 'Day Before Yesterday') {
    var from_date = covertGivenDateWithTime(new Date().setDate(new Date().getDate() - 2));
    var to_date = covertGivenDateWithTimeMax(new Date().setDate(new Date().getDate() - 2));
  } else if (dateType == 'Last 7 days') {
    var from_date = covertGivenDateWithTime(new Date().setDate(new Date().getDate() - 6));
    var to_date = covertGivenDateWithTimeMax(new Date());
  } else if (dateType == 'Last 30 days') {
    var from_date = covertGivenDateWithTime(new Date().setDate(new Date().getDate() - 29));
    var to_date = covertGivenDateWithTimeMax(new Date());
  } else if (dateType == "This Month") {
    var date = new Date();
    var from_date = covertGivenDateWithTime(new Date(date.getFullYear(), date.getMonth(), 1));
    var to_date = covertGivenDateWithTimeMax(new Date(date.getFullYear(), date.getMonth() + 1, 0));
  }
  else if (dateType == "Last Month") {
    var now = new Date();
    var prevMonthLastDate = new Date(now.getFullYear(), now.getMonth(), 0);
    var prevMonthFirstDate = new Date(now.getFullYear() - (now.getMonth() > 0 ? 0 : 1), (now.getMonth() - 1 + 12) % 12, 1);
    var from_date = covertGivenDateWithTime(prevMonthFirstDate);
    var to_date = covertGivenDateWithTimeMax(prevMonthLastDate);

  }
  else if (dateType == "This Week") { ///////////////////
    var curr = new Date;
    var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
    var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));
    var from_date = covertGivenDateWithTime(firstday);
    var to_date = covertGivenDateWithTimeMax(lastday);
  }
  else if (dateType == "Last Week") { ///////////////////
    var curr = new Date;
    var startOfWeek_cuurent = new Date(curr.setDate(curr.getDate() - curr.getDay()));
    var lastdayoflastweek = startOfWeek_cuurent.setDate(startOfWeek_cuurent.getDate() - 1);
    var firstdayoflastweek = startOfWeek_cuurent.setDate(startOfWeek_cuurent.getDate() - 6);

    var from_date = covertGivenDateWithTime(firstdayoflastweek);
    var to_date = covertGivenDateWithTimeMax(lastdayoflastweek);
  }


  var fisrtFrom;
  Clients.find({ $and: [{ "tablestatus": "TRUE" }, { "his_affilitater_c_id_int": req.body.cidint }] }, function (err, ClientsList) {

    //
    var c_id_intArrClient = [];
    var c_id_intArrClient_console = [];
    for (let c = 0; c < ClientsList.length; c++) {
      if (c == 0) {
        var fisrtFrom = ClientsList[c].adding_date;
      }
      c_id_intArrClient.push(ClientsList[c].c_id_int);
      if (dateType == 'ALL') {

        totalInstall = totalInstall + 1;

      } else {
        if (ClientsList[c].adding_date <= to_date && ClientsList[c].adding_date >= from_date) {
          totalInstall = totalInstall + 1;
          c_id_intArrClient_console.push(ClientsList[c].c_id_int);

        }
      }
    }



    var searchArr = [];

    searchArr.push({ "order_status": 'SUCCESS' });
    searchArr.push({ "c_id_int": { $in: c_id_intArrClient } });

    searchArr.push({ "his_affilitater_c_id_int": req.body.cidint });

    if (dateType !== 'ALL') {
      searchArr.push({ order_date: { $gte: from_date } });

      searchArr.push({ order_date: { $lte: to_date } });


    }


    Orders.find({ $and: searchArr }, function (err, orderList) {

      var c_id_intArr = [];

      if (orderList.length > 0) {

        for (let c = 0; c < orderList.length; c++) {
          if (orderList[c].bank_array[0].TXNID != 'ADMINPURCHASE') {
            totalSaleAmount = totalSaleAmount + orderList[c].amount;
            c_id_intArr.push(orderList[c].c_id_int);
            totalOrder = totalOrder + 1;
          }

        }
      }
      totalUser = new Set(c_id_intArr).size;


      var searchArr2 = [];


      searchArr2.push({ "c_id_int": req.body.cidint });

      if (dateType !== 'ALL') {
        searchArr2.push({ created_on: { $gte: from_date } });

        searchArr2.push({ created_on: { $lte: to_date } });


      }




      AfVisits.find({ $and: searchArr2 }, function (err, affList) {

        var uniquevisitorWebsite = 0;
        if (affList.length > 0) {

          for (let c = 0; c < affList.length; c++) {
            if (affList[c].course_id == 'website') {

              uniquevisitorWebsite = uniquevisitorWebsite + 1;
            }

          }
        }

        res.json({ "uniquevisitorWebsite": uniquevisitorWebsite, "affList": affList, "orderList": orderList, "fisrtFrom": fisrtFrom, "totalregistration": totalInstall, "from_date": from_date, "to_date": to_date, 'totalStudentNumber': totalUser, 'totalOrderNumber': totalOrder, 'totalSaleAmount': totalSaleAmount });



      });


    });


    //




    //
  });



});
// getAffiliateDashboardData end

//razorpay

router.post('/generateBackenedorder', (req, res, next) => {

  var login_id = req.body.login_id; var order_id = req.body.order_id;
  var amount = +req.body.amount;
  // var key_id = 'rzp_test_j7RLzYPQkJqadt';
  // var instance = new Razorpay({
  //   key_id: key_id,
  //   key_secret: '4vXK6ldx0cm6msN1ys00Ptcs'
  // })
  var key_id = 'rzp_test_080GPiVpRfZ8Jr';
  var instance = new Razorpay({
    key_id: key_id,
    key_secret: 'Z5lPcnT6EfO4z5rYSy33nUw9'
  })


  var options = {
    amount: parseInt(amount) * 100,  // amount in the smallest currency unit
    currency: "INR",
    receipt: order_id,
    notes: { "login_id": login_id, "order_id": order_id }
  };

  instance.orders.create(options, function (err, order) {

    if (err) {
      res.json({ message: "Something went wrong ! ", err, status: "ERROR" });
    } else {
      res.json({ message: "Worked Successfully !", rajororder: order, order_id: order_id, key: key_id, status: "true" });
    }
  });
});

//razorpay end
var formatDateComponent = function (dateComponent) {
  return (dateComponent < 10 ? '0' : '') + dateComponent;
};

var formatDate = function (date) {
  return formatDateComponent(date.getMonth() + 1) + '/' + formatDateComponent(date.getDate()) + '/' + date.getFullYear();
};
module.exports = router;