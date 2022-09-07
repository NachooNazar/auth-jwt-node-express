import app from './app';
import './db';
const PORT = 3000;

app.listen(PORT, () => console.log(`Server listen at ${PORT}`));
