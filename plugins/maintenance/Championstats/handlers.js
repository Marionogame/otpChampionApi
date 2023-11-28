async function getAllChampionstats(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  try {
    const championstatData = await db.Championstats.query().withGraphFetched("[champion,summoner,position,item]");
    return h.response(utils.buildResponse("Successfully Fetched All championstat.", true, championstatData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function getChampionstat(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { idChampionStat } = request.params;
  try {
    const championstatData = await db.Championstats.query().findById(idChampionStat).withGraphFetched("[champion,summoner,position,item]");

    return h.response(utils.buildResponse("Successfully Fetched One championstat.", true, championstatData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function createChampionstat(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { name, url, idRegion, acronym } = request.payload;
  try {
    const championstatData = await db.Championstats.query().insertAndFetch({ name, url, idRegion, acronym });

    return h.response(utils.buildResponse("Successfully Created championstat.", true, championstatData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function patchChampionstat(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { idChampionStat } = request.params;
  const { name, url, idRegion, acronym } = request.payload;
  try {
    const championstatData = await db.Championstats.query().patchAndFetchById(idChampionStat, { name, url, idRegion, acronym });

    return h.response(utils.buildResponse("Successfully Patched championstat.", true, championstatData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function deleteChampionstat(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { idChampionStat } = request.params;
  try {
    // await db.QuickAnswers.query().patch({ idChampionStat: null }).where("idChampionStat", idChampionStat);
    // await db.Tags.query().patch({ idChampionStat: null }).where("idChampionStat", idChampionStat);
    // await db.PresetMessages.query().patch({ idChampionStat: null }).where("idChampionStat", idChampionStat);
    // await db.CompanyGroups.query().patch({ idChampionStat: null }).where("idChampionStat", idChampionStat);
    await db.Championstats.query().delete().where("idChampionStat", idChampionStat);
    return h.response(utils.buildResponse("Successfully Deleted Championstat.", true));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

module.exports = {
  getAllChampionstats,
  getChampionstat,
  createChampionstat,
  patchChampionstat,
  deleteChampionstat,
};
