const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: 'Untitled',
        trim: true,
        maxLength: 50
    },
    description: {
        type: String,
        trim: true,
        maxLength: 500
    },
    completionDeadline: {
        type: Date, // TODO: See mongoose docs for updating dates
        /*validate: ,*/
        min: Date.now(), // TODO: Plus like an hour or something
        /*max: Date.now()*/ // TODO: 10 years out?
    },
    idealCompletionDate: {
        type: Date,
        /*validate: ,*/
        min: Date.now(), // TODO: Plus like an hour or something
        /*max: Date.now()*/ // TODO: 10 years out?
    },
    estimatedTimeRequired: { // Minutes
        type: Number,
        required: true,
        default: 60,
        min: 10,
        max: 600000 // 10,000 hours
    },
    priority: {
        type: Number,
        min: 1,
        max: 5
    },
    repeatPattern: {
        type: String, // TODO: Figure out how to do this
    },
    estimatedDifficulty: { // burnout factor
        type: Number,
        min: 1,
        max: 10
    },
    percentCompleted: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    workOnDate: { // Date when task will show on the schedule // TODO: Auto scheduling (set default to function?)
        type: Date,
        /*validate: ,*/
        min: Date.now(), // TODO: Plus like an hour or something
        /*max: Date.now()*/ // TODO: 10 years out?
    },
    category: {
        type: String,
        trim: true,
        lowercase: true,
        maxLength: 50
    },
    reminders: { // TODO: Creat reminder store id
        type: [mongoose.Schema.Types.ObjectId],
    },
    questions: { // TODO: Creat question store id
        type: [mongoose.Schema.Types.ObjectId],
    },
    notes: { // TODO: Come back to this
        type: [mongoose.Schema.Types.ObjectId],
    },
    lastCompletionDate: {
        type: Date,
        /*validate: ,*/
        /*min: Date.now(),*/ // TODO: 10 years back?
        /*max: Date.now()*/ // TODO: 10 years out?
    },
    completionStreak: {
        type: Number,
        default: 0,
        min: 0
    },
    timeWorkedOn: { // Minutes
        type: Number,
        default: 0,
        min: 0
    }
});

module.exports = mongoose.model('Task', TaskSchema);

//! TODO: Goal sub tasks
// TODO: Repeating tasks completion rate
