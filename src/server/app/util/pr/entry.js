'use strict';

module.exports = function(sequelize, DataTypes) {
  var models = {
    entry: sequelize.define('entry', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        validate: {
          isUUID: 4
        },
        primaryKey: true
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
        }
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      }
    }, {
    }),

    tag: sequelize.define('tag', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
          isUUID: 4
        },
        primaryKey: true
      },
      value: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
        }
      }
    }, {
    })
  };

  models.tag.belongsToMany(models.entry, { through: 'entry_tag' });
  models.entry.belongsToMany(models.tag, { through: 'entry_tag' });

  return models;
};
