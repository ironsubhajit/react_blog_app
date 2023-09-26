const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: 'https://c0.wallpaperflare.com/preview/728/375/731/aerial-analog-background-blog.jpg',
    },
    category: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    userId: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('blogs', BlogSchema);
