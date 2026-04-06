export const protect = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Login required" });
  }
  next();
};

export const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }
  next();
};

export const facultyOnly = (req, res, next) => {
  if (req.user.role !== "faculty") {
    return res.status(403).json({ message: "Faculty only" });
  }
  next();
};


export const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

export const isOwnerOrAdmin = (Model) => {
  return async (req, res, next) => {
    try {
      const doc = await Model.findById(req.params.id);

      if (!doc) {
        return res.status(404).json({ message: "Not found" });
      }

      // Admin can do anything
      if (req.user.role === "admin") {
        return next();
      }

      // Faculty can only modify their own
      if (
        req.user.role === "faculty" &&
        doc.createdBy.toString() === req.user._id.toString()
      ) {
        return next();
      }

      return res.status(403).json({ message: "Not authorized" });
    } catch (err) {
      return res.status(500).json({ message: "Authorization check failed" });
    }
  };
};
