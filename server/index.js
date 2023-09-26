const express = require('express');
const app = express();
const PORT = 8000;
const db = require('./models/index');
const mainRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', mainRouter);

db.sequelize.sync({ force: true }).then(() => {
	app.listen(PORT, () => {
		console.log(`http://localhost:${PORT}`);
	});
});
