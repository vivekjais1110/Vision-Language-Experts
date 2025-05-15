const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbSQL');
const User = require('./userSQL');

const AssetSQL = sequelize.define('asset', {

    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
    // title: { 
    //     type: DataTypes.STRING, 
    //     allowNull: false 
    // },
    // description: {
    //     type: DataTypes.STRING,
    // },
    // status: {
    //   type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
    //   defaultValue: 'pending'
    // },
    // dueDate: {
    //   type: DataTypes.DATE,
    //   allowNull: false
    // },

    name: { 
      type: DataTypes.STRING(100),
      allowNull: false, unique: true
    },
    imagePaths: { type: DataTypes.JSON, allowNull: true },
    code: { type: DataTypes.STRING, allowNull: false, unique: true },
    category: { type: DataTypes.STRING, allowNull: false },
    cwipInvoiceId: { type: DataTypes.STRING(50), allowNull: true },
    location: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    condition: { type: DataTypes.STRING, allowNull: false },
    brand: { type: DataTypes.STRING(50), allowNull: true },
    model: { type: DataTypes.STRING(50), allowNull: true },
    linkedAssetId: { type: DataTypes.INTEGER, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    filePaths: { type: DataTypes.JSON, allowNull: true },
    vendorName: { type: DataTypes.STRING, allowNull: true },
    poNumber: { type: DataTypes.STRING(20), allowNull: true },
    invoiceDate: { type: DataTypes.DATEONLY, allowNull: true },
    invoiceNo: { type: DataTypes.STRING, allowNull: true },
    purchaseDate: { type: DataTypes.DATEONLY, allowNull: true },
    purchasePrice: { type: DataTypes.FLOAT, allowNull: true },
    ownership: { type: DataTypes.STRING, allowNull: false },
    capitalizationPrice: { type: DataTypes.FLOAT, allowNull: true },
    endOfLife: { type: DataTypes.DATEONLY, allowNull: true },
    capitalizationDate: { type: DataTypes.DATEONLY, allowNull: false },
    depreciationPercent: { type: DataTypes.FLOAT, allowNull: true },
    accumulatedDepreciation: { type: DataTypes.FLOAT, allowNull: true },
    scrapValue: { type: DataTypes.FLOAT, defaultValue: 0 },
    incomeTaxDepreciationPercent: { type: DataTypes.FLOAT, allowNull: true },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
  });


  
  User.hasMany(AssetSQL, { foreignKey: 'userId' });
  AssetSQL.belongsTo(User, { foreignKey: 'userId' });

module.exports = AssetSQL;
