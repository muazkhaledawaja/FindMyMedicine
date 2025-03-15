export const defaultTableSettings = {
  timestamps: true,
  paranoid: true,
  underscored: true,
  defaultScope: {
    attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
  },
};
