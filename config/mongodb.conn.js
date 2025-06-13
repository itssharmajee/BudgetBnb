import mongoose from 'mongoose';
// Connect to MongoDB
function connectToDatabase(dbURI) {
    mongoose.connect(dbURI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });
}

export default connectToDatabase;