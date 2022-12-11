module.exports = (sequelize, DataTypes) => {
    const alumnoModel = sequelize.define('alumnos', {
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
          matricula: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          promedio: {
            type: DataTypes.DOUBLE,
            allowNull: false,
          },
          fotoPerfilUrl: {
            type: DataTypes.STRING,
            allowNull: true,
          },
      });

    return alumnoModel;
}