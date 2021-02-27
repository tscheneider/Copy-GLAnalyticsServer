const { Course } = require('../models');
const { notFound } = require('../exceptions');

const validCourse = async (req, res, next) => {
  const course = await Course.findOne({
    where: {
      id: req.params.idCourse,
    }
  });

  if (!course) {
    return next(new notFound('course not found'));
  }

  req.GA = {
    idCourse: course.id
  };
  next();
};

module.exports = {
  validCourse,
};
