const express = require('express');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const protect = require('./middlewares/authMiddleware');

const app = express();
const PORT = 3000;


app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api', userRoutes);

app.use('/api/admin', adminRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
