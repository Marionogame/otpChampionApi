async function getAllRegions(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  try {
    console.log("regionData", db.Region);

    const regionData = await db.Region.query();
    console.log("regionData4444444", regionData);

    return h.response(utils.buildResponse("Successfully Fetched All region.", true, regionData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function getRegion(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { idRegion } = request.params;
  try {
    const regionData = await db.Region.query().findById(idRegion);

    return h.response(utils.buildResponse("Successfully Fetched One region.", true, regionData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function createRegion(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { region, acronym } = request.payload;
  try {
    const regionData = await db.Region.query().insertAndFetch({ region, acronym });

    return h.response(utils.buildResponse("Successfully Created region.", true, regionData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function patchRegion(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { idRegion } = request.params;
  const { region, acronym } = request.payload;
  try {
    const regionData = await db.Region.query().patchAndFetchById(idRegion, { region, acronym });

    return h.response(utils.buildResponse("Successfully Patched region.", true, regionData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function deleteRegion(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { idRegion } = request.params;
  try {
    await db.QuickAnswers.query().patch({ idRegion: null }).where("idRegion", idRegion);
    await db.Tags.query().patch({ idRegion: null }).where("idRegion", idRegion);
    await db.PresetMessages.query().patch({ idRegion: null }).where("idRegion", idRegion);
    await db.CompanyGroups.query().patch({ idRegion: null }).where("idRegion", idRegion);
    await db.Region.query().delete().where("idRegion", idRegion);

    return h.response(utils.buildResponse("Successfully Deleted Region.", true));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

module.exports = {
  getAllRegions,
  getRegion,
  createRegion,
  patchRegion,
  deleteRegion,
};
