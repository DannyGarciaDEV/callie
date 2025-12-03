// Simple admin authentication middleware
export const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const adminSecret = process.env.ADMIN_SECRET || 'dannylovescallie';

  if (!authHeader) {
    return res.status(401).json({ error: 'No authorization header' });
  }

  const token = authHeader.replace('Bearer ', '');

  if (token !== adminSecret) {
    return res.status(401).json({ error: 'Invalid admin token' });
  }

  next();
};

