// require mongo db models
const Setting = require("../model/Setting")

exports.getAll = (req, res, next) => {
    Setting.find({}).exec((error, data) => {
        if (error)
        {
            res.json({response : false, message : Constant.MESSAGE.INVALID_SECTION , error : error})
        } 
        else {
            res.json({response : true, message : Message.SETTING.SETTING_SUCCESS, data : data})
        }
    })
}

exports.update = (req, res, next) => {
    const _id = req.params.id;
    console.log("Id :",req.body)
    Setting.findOneAndUpdate(
        { _id: { $eq: _id } },
        { $addToSet: { tab: req.body[0] } },
        (error, result) => {
          if (error) {
            res.json({response : false, message : Constant.MESSAGE.INVALID_SECTION , error : error})
          }
          else
          {
            res.json({response : true, message : Message.SETTING.SETTING_ADD_SUCCESS, data : result})
          }
        }
      );
    // Setting.findOneAndUpdate({ deliveryFee: { $exists: true } }, req.body, { new: true, upsert: true }).exec((err, data) => {
    //     if (err) return next(err)
    //     else {
    //         res.json({
    //             response: true,
    //             message: "Setttings has been updated successfully. ",
    //             data
    //         });
    //     }
    // })
}