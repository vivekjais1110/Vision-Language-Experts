const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const assetController = require('../controllers/assetSQL_Controller');
const authenticate = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload.js');

// Validation rules (can be extracted to a separate file if preferred)
const assetValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('imagePaths').optional().isArray().withMessage('ImagePaths must be an array'),
  body('code').notEmpty().withMessage('Code is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('cwipInvoiceId').optional().isString(),
  body('location').notEmpty().withMessage('Location is required'),
  body('status').notEmpty().withMessage('Status is required'),
  body('condition').notEmpty().withMessage('Condition is required'),
  body('brand').optional().isString(),
  body('model').optional().isString(),
  body('linkedAssetId').optional().isInt().withMessage('linkedAssetId must be an integer'),
  body('description').optional().isString(),
  body('filePaths').optional().isArray().withMessage('filePaths must be an array'),
  body('vendorName').optional().isString(),
  body('poNumber').optional().isString(),
  body('invoiceDate').optional().isISO8601().withMessage('InvoiceDate must be a valid date'),
  body('invoiceNo').optional().isString(),
  body('purchaseDate').optional().isISO8601().withMessage('PurchaseDate must be a valid date'),
  body('purchasePrice').optional().isFloat({ min: 0 }).withMessage('PurchasePrice must be a positive number'),
  body('ownership').notEmpty().withMessage('Ownership is required'),
  body('capitalizationPrice').optional().isFloat({ min: 0 }).withMessage('CapitalizationPrice must be a positive number'),
  body('endOfLife').optional().isISO8601().withMessage('EndOfLife must be a valid date'),
  body('capitalizationDate').notEmpty().isISO8601().withMessage('CapitalizationDate is required and must be a valid date'),
  body('depreciationPercent').optional().isFloat({ min: 0, max: 100 }).withMessage('DepreciationPercent must be between 0 and 100'),
  body('accumulatedDepreciation').optional().isFloat({ min: 0 }).withMessage('AccumulatedDepreciation must be positive'),
  body('scrapValue').optional().isFloat({ min: 0 }).withMessage('ScrapValue must be positive'),
  body('incomeTaxDepreciationPercent').optional().isFloat({ min: 0, max: 100 }).withMessage('IncomeTaxDepreciationPercent must be between 0 and 100'),
];

// Middleware to check validation errors after express-validator
function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
}

// All routes require authentication
router.use(authenticate);


router.post(
  '/asset_create',
  upload.fields([
    { name: 'images', maxCount: 10 },
    { name: 'documents', maxCount: 10 },
  ]),
  assetValidationRules,
  validate,
  assetController.createAsset
);


router.get('/assets', assetController.getAssets_by_status_category);


router.put(
  '/asset_update/:id',
  upload.fields([
    { name: 'images', maxCount: 10 },
    { name: 'documents', maxCount: 10 },
  ]),
  assetValidationRules,
  validate,
  assetController.updateAsset
);


router.delete('/asset_delete/:id', assetController.deleteAsset);

module.exports = router;
