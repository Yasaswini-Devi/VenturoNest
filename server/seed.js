const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

// --- Import your Mongoose models ---
const User = require('./models/User');
const VideoPitch = require('./models/VideoPitch');
const Connection = require('./models/Connection');
const Message = require('./models/Message');

// Your MongoDB Atlas connection string from .env
const mongoURI = process.env.MONGO_URI;

const seedDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully!');

        // --- Clear existing data ---
        await User.deleteMany({});
        await VideoPitch.deleteMany({});
        await Connection.deleteMany({});
        await Message.deleteMany({});
        console.log('Database cleared.');

        // --- 1. Create 5 Entrepreneurs & 5 Investors ---
        const entrepreneurs = [];
        for (let i = 0; i < 5; i++) {
            const hashedPassword = await bcrypt.hash('password123', 10);
            entrepreneurs.push({
                name: faker.person.fullName(),
                email: `entrepreneur${i + 1}@startup.com`, 
                password: hashedPassword,
                role: 'entrepreneur',
                companyName: faker.company.name(),
            });
        }
        const createdEntrepreneurs = await User.insertMany(entrepreneurs);

        const investors = [];
        const investorEmails = ['ankur@investments.com', 'jane@investments.com', 'mark@vc.com', 'lisa@angel.com', 'peter@fund.com'];
        for (let i = 0; i < 5; i++) {
            const hashedPassword = await bcrypt.hash('password123', 10);
            investors.push({
                name: faker.person.fullName(),
                email: investorEmails[i],
                password: hashedPassword,
                role: 'investor',
                investmentFocus: faker.lorem.words({ min: 2, max: 4 }), 
            });
        }
        const createdInvestors = await User.insertMany(investors);
        console.log('Dummy users created.');

        // --- 2. Create Video Pitches ---
        const videoPitches = [];
        for (const entrepreneur of createdEntrepreneurs) {
            videoPitches.push({
                title: faker.commerce.productName(),
                description: faker.lorem.paragraph(),
                videoUrl: `https://fakevideo.com/pitch-${faker.string.uuid()}.mp4`, // Unique URLs
                investmentRequired: faker.finance.amount({ min: 100000, max: 2000000, dec: 0 }),
                entrepreneur: entrepreneur._id,
                likes: [],
                saves: [],
            });
        }
        const createdPitches = await VideoPitch.insertMany(videoPitches);
        console.log('Dummy video pitches created.');

        // --- 3. Simulate Interactions (Likes, Saves, Connections) ---
        // Have investor1 like and save some pitches
        createdPitches[0].likes.push(createdInvestors[0]._id);
        createdPitches[0].saves.push(createdInvestors[0]._id);
        await createdPitches[0].save();

        createdPitches[1].likes.push(createdInvestors[1]._id);
        await createdPitches[1].save();

        // --- 4. Create Believable Connections ---
        // investor1 connects with entrepreneur1 (pitch1)
        await Connection.create({
            investor: createdInvestors[0]._id,
            entrepreneur: createdEntrepreneurs[0]._id,
            videoPitch: createdPitches[0]._id,
            status: 'accepted', // Use one 'accepted' for chat demo
        });

        // investor2 connects with entrepreneur1 (pitch1)
        await Connection.create({
            investor: createdInvestors[1]._id,
            entrepreneur: createdEntrepreneurs[0]._id,
            videoPitch: createdPitches[0]._id,
            status: 'pending',
        });

        // investor2 connects with entrepreneur2 (pitch2)
        await Connection.create({
            investor: createdInvestors[1]._id,
            entrepreneur: createdEntrepreneurs[1]._id,
            videoPitch: createdPitches[1]._id,
            status: 'pending',
        });
        console.log('Believable connections created.');

        // --- 5. Create Sample Chat Messages ---
        await Message.create({
            sender: createdInvestors[0]._id,
            receiver: createdEntrepreneurs[0]._id,
            content: "Hi, I loved your pitch on the new EdTech platform. I think it has great potential!",
            timestamp: faker.date.recent(),
        });
        await Message.create({
            sender: createdEntrepreneurs[0]._id,
            receiver: createdInvestors[0]._id,
            content: "Thanks so much for reaching out! I'd love to tell you more about our business model.",
            timestamp: faker.date.recent(),
        });
        console.log('Sample chat messages created.');

    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        await mongoose.connection.close();
        console.log('Connection closed.');
    }
};

seedDB();