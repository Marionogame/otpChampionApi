const { isString, isEmpty } = require("lodash");
const { sign, verify } = require("jsonwebtoken");
const { hash, compare } = require("bcryptjs");
const { parsePhoneNumber } = require("libphonenumber-js");
const { extension } = require("mime-types");

function guidGenerator() {
  const S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
}

function extractMethodsArray(name, object) {
  const methodsArray = [];
  for (property in object) {
    methodsArray.push({
      name: `${name}.${property}`,
      method: object[property],
    });
  }
  return methodsArray;
}

const generateJWT = (payload, secretKey, mobile = false) => {
  let options = {};
  if (mobile) {
    options = {
      expiresIn: "30d",
    };
  } else {
    options = {
      expiresIn: "24h",
    };
  }
  return sign(payload, secretKey, options);
};

const checkJWT = (token, secretKey) => {
  try {
    const decoded = verify(token, secretKey);
    return { data: decoded, valid: true };
  } catch (err) {
    return { data: {}, valid: false };
  }
};

const buildResponse = (message, success = false, data = {}) => {
  return {
    success,
    message,
    data,
  };
};

function fixPhoneNumber(string) {
  if ((string.search("809") >= 0 || string.search("829") >= 0 || string.search("849") >= 0) && string.length === 10) {
    return "1" + string;
  } else {
    return string;
  }
}

function jsonParse(json) {
  if (isString(json)) {
    return JSON.parse(json);
  } else {
    return json;
  }
}

function encryptPassword(password) {
  return hash(password, 10);
}

function checkPassword(password, encryptPassword) {
  return compare(password, encryptPassword);
}

function validatePhone(phone) {
  const phoneNumber = parsePhoneNumber(phone, "DO");
  const isValid = phoneNumber.isValid();
  if (isValid) {
    return phoneNumber.number;
  } else {
    throw {
      name: "InvalidPhoneNumber",
      message: `Phone Number ${phoneNumber.number} for Country: ${phoneNumber.country} is not valid.`,
    };
  }
}

function isEmail(string) {
  return string.search("@") >= 0;
}

function isPhone(string) {
  return !isNaN(string);
}

function formatIdArray(array) {
  const mappedArray = map(array, (item) => {
    return item.groupId;
  });
  console.log(mappedArray);
  return mappedArray;
}

function getUserType(string) {
  if (isEmail(string)) {
    return "Email";
  } else if (isPhone(string)) {
    return "Phone";
  } else {
    return "Username";
  }
}

function getExtension(contentType) {
  let ext = extension(contentType);
  if (contentType === "video/quicktime") {
    ext = "mov";
  } else if (contentType === "audio/wave") {
    ext = "wav";
  } else if (contentType === "image/jpeg") {
    ext = "jpg";
  }
  return ext;
}

function getFacebookType(type) {
  switch (type) {
    case "image":
      return "Image";
    case "audio":
      return "Audio";
    case "video":
      return "Video";
    case "file":
      return "Document";
  }
}

function setFacebookType(type) {
  switch (type) {
    case "Image":
      return "image";
    case "Audio":
      return "audio";
    case "Video":
      return "video";
    case "Document":
      return "file";
  }
}

function getTelegramType(type) {
  switch (type) {
    case "video":
      return "Video";
    case "photo":
      return "Image";
    case "voice":
      return "Audio";
    case "audio":
      return "Audio";
    case "document":
      return "Document";
  }
}

function encryptEmail(email) {
  const temp = email.split("@");
  const hint = temp[0].substr(0, 3);
  const asterisks = temp[0].substr(3).replace(/./g, "*");
  return hint + asterisks + "@" + temp[1];
}

function getUserIdToAssignChat(userControl) {
  if (!userControl.users.length) return null;
  const lastIndex = userControl.lastUserAssignChat;
  let nextIndex = lastIndex + 1;
  if (userControl.users.length <= nextIndex) {
    userControl.setLastUserAssignChat(0);
    nextIndex = 0;
  }
  for (let index = nextIndex; index < userControl.users.length; index++) {
    const user = userControl.users[index];
    if (user && user.permissions && user.permissions.allowChatAssign) {
      userControl.setLastUserAssignChat(index);
      return user.userId;
    }
  }
  return null;
}

function handleMessageDelivery(socket, userControl, chat, companyId, sendData) {
  if (chat.userId) {
    if (userControl.isLoggedIn(chat.userId)) {
      const users = userControl.getLoggedUsers(chat.userId);
      for (const item of users) {
        socket.to(item.socketId).emit("receiveMsg", sendData);
      }
    }
  } else if (chat.groupId) {
    socket.to(`Room-${companyId}-${chat.groupId}`).emit("receiveMsg", sendData);
  } else {
    socket.to(`Room-${companyId}`).emit("receiveMsg", sendData);
  }
}

module.exports = extractMethodsArray("utils", {
  generateJWT,
  checkJWT,
  buildResponse,
  fixPhoneNumber,
  jsonParse,
  encryptPassword,
  checkPassword,
  validatePhone,
  isEmail,
  isPhone,
  formatIdArray,
  getUserType,
  getExtension,
  getFacebookType,
  setFacebookType,
  getTelegramType,
  encryptEmail,
  getUserIdToAssignChat,
  handleMessageDelivery,
  guidGenerator,
});
