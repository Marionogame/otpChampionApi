const { find, reject, filter, isEmpty, map } = require("lodash");

function UserControl(users = []) {
  this.users = users;
}

UserControl.prototype.add = function (objUser) {
  this.users = [...this.users, objUser];
  return this.users;
};

UserControl.prototype.remove = function (userId, platform = null) {
  let user = {};
  if (platform === null) {
    user = find(this.users, { userId });
  } else {
    user = find(this.users, { userId, platform });
  }

  if (user) {
    this.users = reject(this.users, user);
    return this.users;
  }
  throw {
    name: "UserNotLoggedIn",
    message: `User with id: ${userId} in platform: ${platform} is not logged in.`,
  };
};

UserControl.prototype.edit = function (editUser) {
  const newList = map(this.users, (item) => {
    if (item.userId === editUser.userId) return { ...item, ...editUser };
    return item;
  });
  this.users = newList;
  return this.users;
};

UserControl.prototype.isLoggedIn = function (userId, platform = null) {
  let user = {};
  if (platform === null) {
    user = find(this.users, { userId });
  } else {
    user = find(this.users, { userId, platform });
  }
  return user !== undefined;
};

UserControl.prototype.isSocketConnected = function (userId, platform) {
  let user = {};
  user = find(this.users, { userId, platform });
  if (user) {
    return !isEmpty(user.socketId);
  }
  return false;
};

UserControl.prototype.getLoggedUser = function (userId, platform) {
  const user = find(this.users, { userId, platform });

  if (user !== undefined) {
    return user;
  }
  throw {
    name: "UserNotLoggedIn",
    message: `User with id: ${userId} is not logged in.`,
  };
};

UserControl.prototype.getLoggedUsers = function (userId) {
  const users = filter(this.users, { userId });

  if (!isEmpty(users)) {
    return users;
  }
  throw {
    name: "UserNotLoggedIn",
    message: `User with id: ${userId} is not logged in.`,
  };
};

UserControl.prototype.showLoggedUsers = function (userId = null) {
  if (userId) {
    const user = find(this.users, { userId });
    if (user !== undefined) {
      const newList = reject(this.users, user);
      return newList;
    }
    return this.users;
  }
  return this.users;
};

module.exports = UserControl;
