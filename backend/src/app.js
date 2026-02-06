import express from 'express';

const app = express(); // Create an instance of the Express application

app.use(express.json()); // Middleware to parse JSON request bodies

// routes
import userRoutes from './routes/user.route.js';

// route middlewares
app.use('/api/users', userRoutes); // Use the user routes for any requests to /api/users

// example route
app.get('/', (req, res) => {
    res.send('Welcome to the Intro Backend API!');
});

export default app;