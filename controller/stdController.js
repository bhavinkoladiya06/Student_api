const student = require("../model/stdData");

exports.createResult = async (req, res) => {
  try {
    total = parseInt(req.body.eng) + parseInt(req.body.guj);
    +parseInt(req.body.maths);
    var {name,email,contact,eng,guj,maths}=req.body
    if(!name|| !email|| !contact|| !eng || !guj|| !maths){
        throw new Error('please fillUp all filds')
    }
    const data = await student.create(req.body);

    res.status(201).json({
      message: "record create successfull",
      data: data,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

exports.getAllResult = async (req, res) => {
  try {
    const allData = await student.aggregate([
      {
        $addFields: {
          total: { $sum: ["$eng", "$guj", "$maths"] },
          avg: { $avg: ["$eng", "$guj", "$maths"] },
          max: { $max: ["$eng", "$guj", "$maths"] },
          min: { $min: ["$eng", "$guj", "$maths"] },
        },
      },
      {
        $addFields: {
          per: { $divide: ["$total", 3] },
        },
      },
    ]);
    if (!allData){
        throw new Error('no data found')
    }
      res.status(200).json({
        message: "All record",
        data: allData,
      });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

exports.deleteResult = async (req, res) => {
  try {
    console.log(req.params);
    await student.findByIdAndDelete(req.params.id);

    res.status(204).json({});
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

exports.updateResult = async (req, res) => {
  try {
    await student.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).json({
      message: "record update successfull",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};