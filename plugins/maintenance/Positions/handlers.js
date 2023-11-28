async function getAllPositions(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  try {
    const championData = await db.Positions.query();
    return h.response(utils.buildResponse("Successfully Fetched All champion.", true, championData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function getPosition(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { idPosition } = request.params;
  try {
    const championData = await db.Positions.query().findById(idPosition);

    return h.response(utils.buildResponse("Successfully Fetched One champion.", true, championData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function createPosition(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { name } = request.payload;
  try {
    const championData = await db.Positions.query().insertAndFetch({ name });

    return h.response(utils.buildResponse("Successfully Created champion.", true, championData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function patchPosition(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { idPosition } = request.params;
  const { name } = request.payload;
  try {
    const championData = await db.Positions.query().patchAndFetchById(idPosition, { name });

    return h.response(utils.buildResponse("Successfully Patched champion.", true, championData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function deletePosition(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { idPosition } = request.params;
  try {
    // await db.QuickAnswers.query().patch({ idPosition: null }).where("idPosition", idPosition);
    // await db.Tags.query().patch({ idPosition: null }).where("idPosition", idPosition);
    // await db.PresetMessages.query().patch({ idPosition: null }).where("idPosition", idPosition);
    // await db.CompanyGroups.query().patch({ idPosition: null }).where("idPosition", idPosition);
    await db.Positions.query().delete().where("idPosition", idPosition);
    return h.response(utils.buildResponse("Successfully Deleted Position.", true));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

module.exports = {
  getAllPositions,
  getPosition,
  createPosition,
  patchPosition,
  deletePosition,
};
