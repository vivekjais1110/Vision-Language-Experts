const  Asset = require('../models/assetSQL');

const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

exports.createAsset = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const imagePaths = req.files?.images?.map(file => file.path) || [];
    const filePaths = req.files?.documents?.map(file => ({
      path: file.path,
      category: file.originalname.split('_')[0],
    })) || [];

    const {
      name,
      code,
      category,
      cwipInvoiceId,
      location,
      status,
      condition,
      brand,
      model,
      linkedAssetId,
      description,
      vendorName,
      poNumber,
      invoiceDate,
      invoiceNo,
      purchaseDate,
      purchasePrice,
      ownership,
      capitalizationPrice,
      endOfLife,
      capitalizationDate,
      depreciationPercent,
      accumulatedDepreciation,
      scrapValue,
      incomeTaxDepreciationPercent,
    } = req.body;


    const duplicate = await Asset.findOne({
      where: {
        userId: req.user.id,
        name,
        code,
      },
    });

    if (duplicate) {
      return res.status(400).json({ message: 'Asset with the same name and code already exists.' });
    }


    const asset = await Asset.create({
      userId: req.user.id,
      name,
      imagePaths,
      code,
      category,
      cwipInvoiceId,
      location,
      status,
      condition,
      brand,
      model,
      linkedAssetId,
      description,
      filePaths,
      vendorName,
      poNumber,
      invoiceDate,
      invoiceNo,
      purchaseDate,
      purchasePrice,
      ownership,
      capitalizationPrice,
      endOfLife,
      capitalizationDate,
      depreciationPercent,
      accumulatedDepreciation,
      scrapValue,
      incomeTaxDepreciationPercent,
    });

    return res.status(201).json({
      message: 'Asset created successfully',
      data: asset,
    });
  } catch (error) {
    console.error('Error creating asset:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getAssets_by_status_category = async (req, res) => {
  try {
    const { category, status } = req.query;

    const query = {
      where: { userId: req.user.id },
      attributes: ['name', 'code', 'category', 'location', 'status', 'condition'],
    };

    if (status) query.where.status = status;
    if (category) query.where.category = category;

    const assets = await Asset.findAll(query);
    res.status(200).json({ assets });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateAsset = async (req, res) => {
  try {
    const asset = await Asset.findByPk(req.params.id);
    if (!asset) return res.status(404).json({ message: 'Asset not found' });

    // Assuming user ownership check - add if you want to restrict updates to owner's assets
    // if (asset.userId !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

    const imagePaths = req.files?.images?.map(file => file.path) || asset.imagePaths;
    const filePaths = req.files?.documents?.map(file => ({
      path: file.path,
      category: file.originalname.split('_')[0],
    })) || asset.filePaths;

    const { name, code } = req.body;

    // Check for duplicates (excluding current asset)
    const duplicate = await Asset.findOne({
      where: {
        userId: req.user.id,
        [Op.or]: [{ name }, { code }],
        id: { [Op.ne]: req.params.id },
      },
    });

    if (duplicate) {
      return res.status(400).json({ message: 'Another asset with the same name or code exists.' });
    }

    await asset.update({ ...req.body, imagePaths, filePaths });

    res.status(200).json({ message: 'Asset Updated Successfully', asset });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAsset = async (req, res) => {
  try {
    const asset = await Asset.findByPk(req.params.id);

    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    // Optional: check ownership
    if (asset.userId !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to delete this asset' });
    }

    await asset.destroy();

    res.status(200).json({ message: 'Asset Deleted Successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

