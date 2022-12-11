module.exports = (sequelize, DataTypes) => {
    const profesorModel = sequelize.define('profesores', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nombres: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        apellidos: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        numeroEmpleado: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        horasClase: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      });

    return profesorModel;
}