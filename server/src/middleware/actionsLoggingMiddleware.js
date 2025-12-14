const e = require('express');
const jf  = require('jsonfile');
const path = require('path');

const LOGS_FILE_PATH = path.join(__dirname, '../logs/actionLogs.json');

const logAction = (userId, maxActions, remainingActions) => {
    try {
        let logs = { actions: [] };
        try {
            logs = jf.readFileSync(LOGS_FILE_PATH);
            if (!logs.actions) {
                logs.actions = [];
            }
        } catch (err) {
            // File doesn't exist or is empty, use default
        }

        const newLog = {
            userId,
            maxActions,
            timestamp: new Date().toISOString(),
            remainingActions
        };

        logs.actions.push(newLog);
        jf.writeFileSync(LOGS_FILE_PATH, logs);
    } catch (error) {
        console.error('Error logging action:', error);
    }
};

const actionsLoggingMiddleware = async (req, res, next) => {
    if (req.user && req.user._id && req.user.numOfActions !== undefined && req.user.remainingActions !== undefined) {
        await logAction(req.user._id.toString(), req.user.numOfActions, req.user.remainingActions);
    }
    next();
};

module.exports = {
    actionsLoggingMiddleware
};