const mongoose = require('mongoose')

const mongoURI = 'mongodb+srv://aryan:aryan123@cluster0.520m4fw.mongodb.net/?appName=Cluster0'

console.log('Testing MongoDB connection...')
console.log('Connection string:', mongoURI)

mongoose.connect(mongoURI, { 
    useNewUrlParser: true,
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4
}, async (err, result) => {
    if (err) {
        console.error('❌ Connection failed:', err.message)
        process.exit(1)
    } else {
        console.log('✅ Connected to MongoDB')
        
        // Try to create a test collection
        try {
            const testSchema = new mongoose.Schema({ test: String })
            const TestModel = mongoose.model('test_connection', testSchema)
            
            console.log('Attempting to insert test document...')
            const doc = await TestModel.create({ test: 'connection test' })
            console.log('✅ Insert successful:', doc._id)
            
            // Clean up
            await TestModel.deleteOne({ _id: doc._id })
            console.log('✅ Cleanup successful')
        } catch (error) {
            console.error('❌ Insert/write failed:', error.message)
            process.exit(1)
        }
        
        mongoose.disconnect()
        console.log('✅ All tests passed!')
        process.exit(0)
    }
})
