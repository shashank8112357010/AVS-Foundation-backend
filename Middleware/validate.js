const { validationResult } = require("express-validator");
const { validateRes } = require("../Helper/baseResponse");

const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
    }

    const errors = validationResult(req);
    let tmp = [];
    let errs = errors.array().filter((error) => {
      if (tmp.includes(error.param)) {
        return false;
      }
      tmp.push(error.param);
      return true;
    });
      
    console.log(errs[0]?.msg);

    if (errors.isEmpty()) {
      return next();
    }
      console.log(errs);
    return res.status(400).json(validateRes(errs[0].msg));
  };
};

module.exports = {
  validate,
};
