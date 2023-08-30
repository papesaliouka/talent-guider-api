import express from 'express';
import apiRoutes from './routes/apiRoutes';
import { errorHandler } from './utils/errorHandler';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3300;


// Middleware
app.use(express.json());
app.use(cors());
// Routes
app.use('/api', apiRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
