import { getUserModel } from "../../models/userModel.js";
import logger from "../../utils/logger.js";

export const getUserById = async (req, res) => {
    logger.info(`Getting user with ID: ${req.params.id}`);
    try {
        const UserModel = getUserModel(req.dbConnection);
        const user = await UserModel.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        logger.error('Error fetching user by ID', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
