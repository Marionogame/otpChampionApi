async function getAllChampions(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  try {
    const championData = await db.Champions.query().withGraphFetched("[position,role]");
    return h.response(utils.buildResponse("Successfully Fetched All champion.", true, championData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function getChampion(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { idChampion } = request.params;
  try {
    const championData = await db.Champions.query().findById(idChampion).withGraphFetched("[position,role]");

    return h.response(utils.buildResponse("Successfully Fetched One champion.", true, championData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function createChampion(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { name, url, idPosition, idRole } = request.payload;
  try {
    const championData = await db.Champions.query().insertAndFetch({ name, url, idPosition, idRole });

    return h.response(utils.buildResponse("Successfully Created champion.", true, championData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function patchChampion(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { idChampion } = request.params;
  const { name, url, idPosition, idRole } = request.payload;
  try {
    const championData = await db.Champions.query().patchAndFetchById(idChampion, { name, url, idPosition, idRole });

    return h.response(utils.buildResponse("Successfully Patched champion.", true, championData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function deleteChampion(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { idChampion } = request.params;
  try {
    // await db.QuickAnswers.query().patch({ idChampion: null }).where("idChampion", idChampion);
    // await db.Tags.query().patch({ idChampion: null }).where("idChampion", idChampion);
    // await db.PresetMessages.query().patch({ idChampion: null }).where("idChampion", idChampion);
    // await db.CompanyGroups.query().patch({ idChampion: null }).where("idChampion", idChampion);
    await db.Champions.query().delete().where("idChampion", idChampion);
    return h.response(utils.buildResponse("Successfully Deleted Champion.", true));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

module.exports = {
  getAllChampions,
  getChampion,
  createChampion,
  patchChampion,
  deleteChampion,
};
