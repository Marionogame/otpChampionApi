async function getAllTeamstats(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  try {
    const teamstatData = await db.Teamstats.query().withGraphFetched("[team,championstat]");
    return h.response(utils.buildResponse("Successfully Fetched All teamstat.", true, teamstatData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function getTeamstat(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { idTeamstat } = request.params;
  try {
    const teamstatData = await db.Teamstats.query().findById(idTeamstat).withGraphFetched("[team,championstat]");

    return h.response(utils.buildResponse("Successfully Fetched One teamstat.", true, teamstatData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function createTeamstat(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { idTeam, winner, kdaKill, kdaDeath, kdaAssist, gold, tower, idGame, blue } = request.payload;
  try {
    const teamstatData = await db.Teamstats.query().insertAndFetch({ idTeam, winner, kdaKill, kdaDeath, kdaAssist, gold, tower, idGame, blue });

    return h.response(utils.buildResponse("Successfully Created teamstat.", true, teamstatData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function patchTeamstat(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { idTeamstat } = request.params;
  const { idTeam, winner, kdaKill, kdaDeath, kdaAssist, gold, tower, idGame, blue } = request.payload;
  try {
    const teamstatData = await db.Teamstats.query().patchAndFetchById(idTeamstat, {
      idTeam,
      winner,
      kdaKill,
      kdaDeath,
      kdaAssist,
      gold,
      tower,
      idGame,
      blue,
    });

    return h.response(utils.buildResponse("Successfully Patched teamstat.", true, teamstatData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function deleteTeamstat(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { idTeamstat } = request.params;
  try {
    // await db.QuickAnswers.query().patch({ idTeamstat: null }).where("idTeamstat", idTeamstat);
    // await db.Tags.query().patch({ idTeamstat: null }).where("idTeamstat", idTeamstat);
    // await db.PresetMessages.query().patch({ idTeamstat: null }).where("idTeamstat", idTeamstat);
    // await db.CompanyGroups.query().patch({ idTeamstat: null }).where("idTeamstat", idTeamstat);
    await db.Teamstats.query().delete().where("idTeamstat", idTeamstat);
    return h.response(utils.buildResponse("Successfully Deleted Teamstat.", true));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

module.exports = {
  getAllTeamstats,
  getTeamstat,
  createTeamstat,
  patchTeamstat,
  deleteTeamstat,
};
