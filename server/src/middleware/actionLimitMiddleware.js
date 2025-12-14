const userDBRepo = require('../repositories/userDbRepo');
const { actionsLoggingMiddleware } = require('./actionsLoggingMiddleware');

const checkActionLimit = async (req, res, next) => {
    try {
        const username = req.user.username;
        let user = await userDBRepo.checkAndResetActions(username);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.remainingActions > 0) {
            await userDBRepo.decrementRemainingActions(username);
            user = await userDBRepo.getUserByUsername(username);
            req.user.remainingActions = user.remainingActions;
            await actionsLoggingMiddleware(req, res, () => {});
            next();
        } else {
            return res.status(403).json({ message: 'Daily action limit reached. You are logged off for the day.' });
        }
    } catch (error) {
        console.error('Action limit check error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { checkActionLimit };