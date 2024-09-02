import { getClassModel } from '../../models/classModel.js';

export const getClass = async (req, res) => {
    try {
      const Class = getClassModel(req.dbConnection);
      const classes = await Class.find();
      const dbName = req.headers['db-name'].slice(-2);
      const filteredClasses = classes.filter((c) => c.name.includes(dbName));
      res.status(200).json(filteredClasses);
    } catch (error) {
      console.error('Error fetching classes:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };