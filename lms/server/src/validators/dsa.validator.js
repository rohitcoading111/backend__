import {
  body,
  param,
  query,
  validationResult
} from "express-validator";

// 1. Create DSA Question Validator
export const questionValidator = [
  body("title")
    .trim()
    .exists().withMessage("Title is required").bail()
    .isString().withMessage("Title must be a string").bail()
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("slug")
    .trim()
    .exists().withMessage("Slug is required").bail()
    .isString().withMessage("Slug must be a string").bail()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage("Invalid slug format"),

  body("description")
    .trim()
    .exists().withMessage("Description is required").bail()
    .isString().withMessage("Description must be a string").bail()
    .isLength({ min: 5 })
    .withMessage("Description must be at least 5 characters"),

  body("difficulty")
    .isIn(["EASY", "MEDIUM", "HARD"])
    .withMessage("Invalid difficulty"),

  body("topics")
    .isArray({ min: 1 })
    .withMessage("At least one topic is required"),

  body("topics.*")
    .isString()
    .withMessage("Each topic must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Topic cannot be empty"),

  body("platform")
    .isIn(["LEETCODE", "GFG", "CODEFORCES", "HACKERRANK", "OTHER"])
    .withMessage("Invalid platform"),

  body("externalUrl")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Invalid external URL"),

  body("examples")
    .optional()
    .isArray()
    .withMessage("Examples must be an array"),

  body("examples.*.input")
    .if(body("examples").exists())
    .trim()
    .notEmpty()
    .withMessage("Example input is required"),

  body("examples.*.output")
    .if(body("examples").exists())
    .trim()
    .notEmpty()
    .withMessage("Example output is required"),

  body("examples.*.explanation")
    .optional()
    .isString()
    .withMessage("Explanation must be a string"),

  body("constraints")
    .optional()
    .isArray()
    .withMessage("Constraints must be an array"),

  body("hints")
    .optional()
    .isArray()
    .withMessage("Hints must be an array"),

  body("companies")
    .optional()
    .isArray()
    .withMessage("Companies must be an array"),
];

// 2. Get Single Question Validator
export const questionIdValidator = [
  param("questionId")
    .isMongoId()
    .withMessage("Invalid question ID"),
];

// 3. Get Questions Validator
export const getQuestionsValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),

  query("difficulty")
    .optional()
    .isIn(["EASY", "MEDIUM", "HARD"])
    .withMessage("Invalid difficulty"),

  query("platform")
    .optional()
    .isIn(["LEETCODE", "GFG", "CODEFORCES", "HACKERRANK", "OTHER"])
    .withMessage("Invalid platform"),

  query("topic")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Invalid topic"),
];

// 4. Update DSA Progress Validator
export const updateDsaProgressValidator = [
  body("questionId")
    .isMongoId()
    .withMessage("Invalid question ID"),

  body("status")
    .optional()
    .isIn(["ATTEMPTED", "SOLVED", "NEEDS_REVISION"])
    .withMessage("Invalid progress status"),

  body("confidence")
    .optional()
    .isIn(["LOW", "MEDIUM", "HIGH"])
    .withMessage("Invalid confidence level"),

  body("notes")
    .optional()
    .isString()
    .withMessage("Notes must be a string"),
];

// 5. Submit DSA Revision Validator
export const submitRevisionValidator = [
  body("questionId")
    .isMongoId()
    .withMessage("Invalid question ID"),

  body("confidenceBefore")
    .isIn(["LOW", "MEDIUM", "HIGH"])
    .withMessage("Invalid previous confidence"),

  body("confidenceAfter")
    .isIn(["LOW", "MEDIUM", "HIGH"])
    .withMessage("Invalid updated confidence"),

  body("outcome")
    .isIn(["EASY", "MODERATE", "DIFFICULT"])
    .withMessage("Invalid revision outcome"),

  body("notes")
    .optional()
    .isString()
    .withMessage("Notes must be a string"),
];


export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  next();
};