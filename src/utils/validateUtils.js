export const validate = (text, deadline) => {
  const trimmed = text.trim();
  if (!trimmed) return "Task cannot be empty.";
  if (trimmed.length < 3) return "Task must be at least 3 characters long.";
  if (!deadline) return "Deadline cannot be empty.";
};
