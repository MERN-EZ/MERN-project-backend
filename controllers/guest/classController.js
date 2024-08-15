import { getClassModel } from '../../models/classModel.js';

export const getClasses = async (req, res) => {
  try {
    const Class = getClassModel(req.dbConnection);
    const classes = await Class.find();
    res.status(200).json(classes);
  } catch (error) {
    console.error('Error fetching classes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
