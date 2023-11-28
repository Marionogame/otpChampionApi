async function getAllSummoners(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  try {
    const summonerData = await db.Summoners.query();
    return h.response(utils.buildResponse("Successfully Fetched All summoner.", true, summonerData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function getSummoner(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { idSummoner } = request.params;
  try {
    const summonerData = await db.Summoners.query().findById(idSummoner).withGraphFetched("[region]");

    return h.response(utils.buildResponse("Successfully Fetched One summoner.", true, summonerData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function createSummoner(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { name } = request.payload;
  try {
    const summonerData = await db.Summoners.query().insertAndFetch({ name });

    return h.response(utils.buildResponse("Successfully Created summoner.", true, summonerData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function patchSummoner(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { idSummoner } = request.params;
  const { name } = request.payload;
  try {
    const summonerData = await db.Summoners.query().patchAndFetchById(idSummoner, { name });

    return h.response(utils.buildResponse("Successfully Patched summoner.", true, summonerData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function deleteSummoner(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { idSummoner } = request.params;
  try {
    // await db.QuickAnswers.query().patch({ idSummoner: null }).where("idSummoner", idSummoner);
    // await db.Tags.query().patch({ idSummoner: null }).where("idSummoner", idSummoner);
    // await db.PresetMessages.query().patch({ idSummoner: null }).where("idSummoner", idSummoner);
    // await db.CompanyGroups.query().patch({ idSummoner: null }).where("idSummoner", idSummoner);
    await db.Summoners.query().delete().where("idSummoner", idSummoner);
    return h.response(utils.buildResponse("Successfully Deleted Summoner.", true));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

module.exports = {
  getAllSummoners,
  getSummoner,
  createSummoner,
  patchSummoner,
  deleteSummoner,
};
