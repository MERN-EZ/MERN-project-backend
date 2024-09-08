import jwt from 'jsonwebtoken';
import logger from './logger.js';
const SECRET_KEY = process.env.SECRET_KEY;

export function generateToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
}

export function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token) {
    logger.error('Access Denied: No token provided');
    return res.status(401).send('Access Denied');
  }
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      logger.error('Invalid Token');
      return res.status(403).send('Invalid Token');
    }
    logger.info("User's token is valid");
    req.user = user; 
    next();
  });
}

export function authorizeRole(...roles) {
  return (req, res, next) => {
    if (req.user && roles.includes(req.user.role)) {
      logger.info(roles);
      logger.info(`User has role: ${req.user.role}`);
      next(); 
    } else {
      logger.error(`User does not have access`);
      res.status(403).send('Forbidden'); 
    }
  };
}
