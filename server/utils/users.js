const users = [];

// Join user to chat
export function userJoin(id, room, userType) {
  const user = { id, room, userType };
  users.push(user);
  return user;
}

// Get current user
export function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

// User leaves chat
export function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}
