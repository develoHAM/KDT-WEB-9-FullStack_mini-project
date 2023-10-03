import express from 'express';
import cors from 'cors';
import db from './models/index.js';
import mainRouter from './routes/index.js';
const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/', mainRouter);

db.sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => {
		console.log(`http://localhost:${PORT}`);
	});
});
