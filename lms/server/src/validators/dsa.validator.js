
import {
  body,
  param,
  query,
  validationResult
} from "express-validator";

// 1. Create DSA Question
export const questionValidator = [
  body("title")
    .trim()
    .notEmpty().withMessage("Title is required").bail()
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("slug")
    .trim()
    .notEmpty().withMessage("Slug is required").bail()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage("Invalid slug format"),

  body("description")
    .trim()
    .notEmpty().withMessage("Description is required"),

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
    .optional()
    .isString()
    .withMessage("Example input must be a string"),

  body("examples.*.output")
    .optional()
    .isString()
    .withMessage("Example output must be a string"),

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


// 2. Get Single Question
export const questionIdValidator = [
  param("questionId")
    .isMongoId()
    .withMessage("Invalid question ID"),
];


// 3. Get All Questions
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


// 4. Mark Question as Solved
export const markQuestionSolvedValidator = [
  body("questionId")
    .isMongoId()
    .withMessage("Invalid question ID"),
];


// 5. Submit Question Revision
export const reviseQuestionValidator = [
  body("questionId")
    .isMongoId()
    .withMessage("Invalid question ID"),
];


// 6. Validate Request Middleware
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
