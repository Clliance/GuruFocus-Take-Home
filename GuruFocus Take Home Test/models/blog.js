import mongoose from 'mongoose'
import blogSchema from '../schemas/blog'

module.exports = mongoose.model('Blog',blogSchema);