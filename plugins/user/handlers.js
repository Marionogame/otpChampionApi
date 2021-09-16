const { writeFile } = require("fs");
const { findIndex, isEmpty, pick } = require("lodash");
const { getResetTemplate } = require("../email/templates");
const { assetFolder } = require("../../config");

async function register(request, h) {
  const { utils } = request.server.methods;
  try {
    const { db, secretKey, userControl } = request.server.app;
    const { platform } = request.headers;
    const { user, deviceToken = "" } = request.payload;

    const fetchedUser = await db.User.query().where("email", user.email);
    const isRegistered = !isEmpty(fetchedUser);
    if (isRegistered) return h.response(utils.buildResponse("User already exists."));

    const encryptedPassword = await utils.encryptPassword(user.password);
    const validPhone = utils.validatePhone(user.phone);
    const payload = { ...user, password: encryptedPassword, phone: validPhone };
    const newUser = await db.User.query().insertAndFetch(payload);
    let controlledUser = {
      platform,
      userId: newUser.userId,
      userName: newUser.fullName,
      socketId: "",
      expoToken: "",
    };
    const loginToken = utils.generateJWT({ userId: newUser.userId }, secretKey, platform === "mobile");
    const data = {
      token: loginToken,
      user: newUser,
    };
    if (platform === "mobile") {
      await db.User.query().findById(newUser.userId).patch({ expoToken: deviceToken });
      controlledUser = { ...controlledUser, expoToken: deviceToken };
    }
    userControl.add(controlledUser);
    writeFile(assetFolder + "userControl.json", JSON.stringify(userControl), (err) => {
      if (err) throw err;
    });
    return h.response(utils.buildResponse("Successful Register", true, data));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function login(request, h) {
  const { utils } = request.server.methods;
  try {
    const { db, socket, userControl, secretKey } = request.server.app;
    const { platform } = request.headers;
    const { password, userName, deviceToken = "" } = request.payload;

    const type = utils.getUserType(userName);
    let field = "";
    let value = "";
    switch (type) {
      case "Email":
        field = "email";
        value = userName;
        break;
      case "Phone":
        const validPhone = utils.validatePhone(userName);
        field = "phone";
        value = validPhone;
        break;
      case "Username":
        field = "nickName";
        value = userName;
        break;
    }

    const user = await db.User.query().where("state", true).where(field, value).first();

    if (isEmpty(user)) return h.response(utils.buildResponse("Usuario o Contraseña incorrectos."));
    //Validate Password
    const validPass = await utils.checkPassword(password, user.password);
    if (!validPass) return h.response(utils.buildResponse("Usuario o Contraseña incorrectos."));

    let newUser = {
      platform,
      userId: user.userId,
      userName: user.fullName,
      socketId: "",
      expoToken: "",
    };
    //Generate Token
    const token = utils.generateJWT({ userId: user.userId }, secretKey, platform === "mobile");
    const date = new Date().toISOString().replace("Z", "").replace("T", " ");

    //Check if User is logged in
    const isLoggedIn = userControl.isLoggedIn(user.userId, platform);
    if (isLoggedIn) {
      const loggedUser = userControl[compIndex].getLoggedUser(user.userId, platform);
      socket.to(loggedUser.socketId).emit("logout", "logout");
      userControl.remove(user.userId, platform);
    }

    await db.UserLog.query().insert({
      userId: user.userId,
      ipAddress: request.info.remoteAddress,
      loginDate: date,
    });
    const data = {
      token,
      user,
    };
    if (platform === "mobile") {
      await db.User.query().findById(user.userId).patch({ expoToken: deviceToken });
      newUser = { ...newUser, expoToken: deviceToken };
    }
    userControl.add(newUser);
    writeFile(assetFolder + "userControl.json", JSON.stringify(userControl), (err) => {
      if (err) throw err;
    });
    return h.response(utils.buildResponse("Successful Login", true, data));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function rehydrate(request, h) {
  const { utils } = request.server.methods;
  try {
    const { db, secretKey } = request.server.app;
    const { platform, userId } = request.headers;

    const user = await db.User.query().where("state", true).where("userId", userId).first();
    if (isEmpty(user)) return h.response(utils.buildResponse("Usuario o Contraseña incorrectos."));
    //Generate Token
    const token = utils.generateJWT({ userId: user.userId }, secretKey, platform === "mobile");
    const data = {
      token,
      user,
    };
    return h.response(utils.buildResponse("Successful Rehydrate", true, data));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function forgotPassword(request, h) {
  const { utils } = request.server.methods;
  try {
    const { db, secretKey, emailer } = request.server.app;
    const { linkingURL, userName } = request.payload;

    const type = utils.getUserType(userName);
    let user = {};
    switch (type) {
      case "Email":
        user = await db.User.query().where("email", userName).first();
        break;
      case "Phone":
        const validPhone = utils.validatePhone(userName);
        user = await db.User.query().where("phone", validPhone).first();
        break;
      case "Username":
        user = await db.User.query().where("nickName", userName).first();
        break;
    }

    if (!isEmpty(user)) {
      const token = utils.generateJWT({ user }, secretKey, true);
      const newLink = linkingURL + token;
      //Send Link Via Chat

      //Send Link Via Email
      await emailer.sendMail({
        from: "Max Monitor Support <info.maxmonitor@gmail.com>",
        to: user.email,
        subject: "Max Monitor: Instrucciones para Cambiar Contraseña",
        html: getResetTemplate(newLink, "Max Monitor"),
      });
      const encryptedEmail = utils.encryptEmail(user.email);
      console.log(encryptedEmail);
      return h.response(utils.buildResponse("Succesfully initiated the recovery process", true, encryptedEmail));
    } else {
      return h.response(utils.buildResponse("Usuario incorrecto."));
    }
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error));
  }
}

async function resetPassword(request, h) {
  const { utils } = request.server.methods;
  try {
    const { db, secretKey } = request.server.app;
    const { token, password } = request.payload;

    const decoded = utils.checkJWT(token, secretKey);
    if (decoded.valid) {
      const user = await db.User.query().findById(decoded.data.user.userId);
      if (user.password === decoded.data.user.password) {
        const encryptedPassword = await utils.encryptPassword(password);
        await db.User.query().patch({ password: encryptedPassword }).findById(decoded.data.user.userId);
        return h.response(utils.buildResponse("Succesfully completed the recovery process.", true));
      } else {
        return h.response(utils.buildResponse("El token ya fue utilizado."));
      }
    } else {
      return h.response(utils.buildResponse("El token ha expirado."));
    }
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error));
  }
}

async function logout(request, h) {
  const { utils } = request.server.methods;
  try {
    const { db, userControl } = request.server.app;
    const { platform, userid } = request.headers;

    const date = new Date().toISOString().replace("Z", "").replace("T", " ");
    await db.UserLog.query().where("userId", parseInt(userid)).orderBy("loginDate", "desc").first().patch({ logoutDate: date });
    if (platform === "mobile") await db.User.query().findById(parseInt(userid)).patch({ expoToken: null });
    userControl.remove(parseInt(userid), platform);
    writeFile(assetFolder + "userControl.json", JSON.stringify(userControl), (err) => {
      if (err) throw err;
    });
    return h.response(utils.buildResponse("Succesfully Logged Out.", true));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error));
  }
}

module.exports = {
  register,
  login,
  rehydrate,
  forgotPassword,
  resetPassword,
  logout,
};
