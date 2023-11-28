async function getAllTeams(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  try {
    const teamData = await db.Teams.query().withGraphFetched("[region]");
    return h.response(utils.buildResponse("Successfully Fetched All team.", true, teamData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function getTeam(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { idTeam } = request.params;
  try {
    const teamData = await db.Teams.query().findById(idTeam).withGraphFetched("[region]");

    return h.response(utils.buildResponse("Successfully Fetched One team.", true, teamData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function createTeam(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { name, url, idRegion, acronym } = request.payload;
  try {
    const teamData = await db.Teams.query().insertAndFetch({ name, url, idRegion, acronym });

    return h.response(utils.buildResponse("Successfully Created team.", true, teamData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function patchTeam(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { idTeam } = request.params;
  const { name, url, idRegion, acronym } = request.payload;
  try {
    const teamData = await db.Teams.query().patchAndFetchById(idTeam, { name, url, idRegion, acronym });

    return h.response(utils.buildResponse("Successfully Patched team.", true, teamData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function deleteTeam(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { idTeam } = request.params;
  try {
    // await db.QuickAnswers.query().patch({ idTeam: null }).where("idTeam", idTeam);
    // await db.Tags.query().patch({ idTeam: null }).where("idTeam", idTeam);
    // await db.PresetMessages.query().patch({ idTeam: null }).where("idTeam", idTeam);
    // await db.CompanyGroups.query().patch({ idTeam: null }).where("idTeam", idTeam);
    await db.Teams.query().delete().where("idTeam", idTeam);
    return h.response(utils.buildResponse("Successfully Deleted Team.", true));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

module.exports = {
  getAllTeams,
  getTeam,
  createTeam,
  patchTeam,
  deleteTeam,
};
