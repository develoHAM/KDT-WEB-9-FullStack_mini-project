const TodoModel = (sequelize, Sequelize) => {
	return sequelize.define('todo', {
		id: {
			type: Sequelize.DataTypes.INTEGER(),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: Sequelize.DataTypes.STRING(100),
			allowNull: false,
		},
		done: {
			type: Sequelize.DataTypes.TINYINT(1),
			allowNull: false,
			defaultValue: 0,
		},
	});
};

module.exports = TodoModel;
