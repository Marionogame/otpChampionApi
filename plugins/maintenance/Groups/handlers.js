async function getAllGroups(request, h) {
  const { utils } = request.server.methods;
  try {
    const { db } = request.server.app;
    const { companyid } = request.headers;

    const groups = await db.CompanyGroups.query().withGraphFetched("category").where("companyId", parseInt(companyid));

    return h.response(utils.buildResponse("Succesfully Fetched All Groups.", true, groups));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error));
  }
}

async function getGroup(request, h) {
  const { utils } = request.server.methods;
  try {
    const { db } = request.server.app;
    const { groupId } = request.params;

    const group = await db.CompanyGroups.query().findById(groupId).withGraphFetched("category");

    return h.response(utils.buildResponse("Succesfully Fetched One Group.", true, group));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error));
  }
}

async function createGroup(request, h) {
  const { utils } = request.server.methods;
  try {
    const { db } = request.server.app;
    const { companyid } = request.headers;
    const { name, categoryId } = request.payload;

    const newGroup = await db.CompanyGroups.query().insertAndFetch({ companyId: parseInt(companyid), name, categoryId });
    const createdGroup = await db.CompanyGroups.query().findById(newGroup.groupId).withGraphFetched("category");

    return h.response(utils.buildResponse("Succesfully Created Group.", true, createdGroup));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error));
  }
}

async function patchGroup(request, h) {
  const { utils } = request.server.methods;
  try {
    const { db } = request.server.app;
    const { groupId } = request.params;

    const newGroup = await db.CompanyGroups.query().patchAndFetchById(groupId, request.payload);
    const patchedGroup = await db.CompanyGroups.query().findById(newGroup.groupId).withGraphFetched("category");

    return h.response(utils.buildResponse("Succesfully Patched Group.", true, patchedGroup));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error));
  }
}

async function deleteGroup(request, h) {
  const { utils } = request.server.methods;
  try {
    const { db } = request.server.app;
    const { groupId } = request.params;

    await db.CompanyGroups.query().delete().where("groupId", groupId);

    return h.response(utils.buildResponse("Succesfully Deleted Group.", true));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error));
  }
}

module.exports = {
  getAllGroups,
  getGroup,
  createGroup,
  patchGroup,
  deleteGroup,
};
