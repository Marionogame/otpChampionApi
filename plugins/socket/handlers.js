const { findIndex, isEmpty, find } = require("lodash");

function connect(server, client) {
  const { userControl } = server.app;
  const { userId, platform } = client.handshake.query;
  //client.disconnect(true); //Solo para quitar los usuarios enganchados
  if (userControl.isLoggedIn(parseInt(userId), platform)) {
    const user = userControl.getLoggedUser(parseInt(userId), platform);
    const modifiedUser = { ...user, socketId: client.id };
    userControl.edit(modifiedUser);
  } else {
    client.disconnect(true);
  }
  console.log(JSON.stringify(userControl, null, 2));
}

function disconnect(server, client) {
  const { userControl } = server.app;
  const loggedUser = find(userControl, { users: [{ socketId: client.id }] });
  if (loggedUser) {
    const modifiedUser = { ...loggedUser, socketId: "" };
    userControl.edit(modifiedUser);
    console.log(JSON.stringify(userControl, null, 2));
  } else {
    client.disconnect(true);
  }
}

module.exports = {
  connect,
  disconnect,
};
