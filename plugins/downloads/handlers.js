const { stat, accessSync, constants, createReadStream } = require("fs");
const { promisify } = require("util");
const fileInfo = promisify(stat);
const mime = require("mime-types");

const { assetFolder } = require("../../config");

async function downloadFiles(request, h) {
  const { utils } = request.server.methods;
  try {
    const { url } = request.params;
    const { range } = request.headers;

    const pathToFile = assetFolder + url;
    let exists = null;
    try {
      accessSync(pathToFile, constants.F_OK);
      exists = true;
    } catch (err) {
      exists = false;
    }

    if (exists) {
      const { size } = await fileInfo(pathToFile);
      const type = mime.lookup(pathToFile);
      if (range) {
        let [start, end] = range.replace("bytes=", "").split("-");
        start = parseInt(start, 10);
        end = end ? parseInt(end, 10) : size - 1;
        if (!isNaN(start) && isNaN(end)) {
          end = size - 1;
        }
        if (isNaN(start) && !isNaN(end)) {
          start = size - end;
          end = size - 1;
        }

        if (start >= size || end >= size) {
          return h.response(utils.buildResponse("Unavailable Range")).code(416).header("Content-Range", `bytes */${size}`);
        }

        let file = createReadStream(pathToFile, { start, end });
        return h
          .response(file)
          .code(206)
          .header("Content-Range", `bytes ${start}-${end}/${size}`)
          .header("Accept-Ranges", "bytes")
          .bytes(end - start + 1)
          .charset(type);
      } else {
        let file = createReadStream(pathToFile);
        return h.response(file).bytes(size).charset(type);
      }
    } else {
      console.log("File on the url does not exist");
      return h.response(utils.buildResponse("File on the url does not exist."));
    }
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error));
  }
}

module.exports = {
  downloadFiles,
};
