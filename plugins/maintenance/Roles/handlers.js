async function getAllRoles(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  try {
    const roleData = await db.Roles.query();
    return h.response(utils.buildResponse("Successfully Fetched All role.", true, roleData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function getRole(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { idRole } = request.params;
  try {
    const roleData = await db.Roles.query().findById(idRole);

    return h.response(utils.buildResponse("Successfully Fetched One role.", true, roleData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function createRole(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { name, url, idRegion, acronym } = request.payload;
  try {
    const roleData = await db.Roles.query().insertAndFetch({ name, url, idRegion, acronym });

    return h.response(utils.buildResponse("Successfully Created role.", true, roleData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function patchRole(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { idRole } = request.params;
  const { name, url, idRegion, acronym } = request.payload;
  try {
    const roleData = await db.Roles.query().patchAndFetchById(idRole, { name, url, idRegion, acronym });

    return h.response(utils.buildResponse("Successfully Patched role.", true, roleData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function deleteRole(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { idRole } = request.params;
  try {
    // await db.QuickAnswers.query().patch({ idRole: null }).where("idRole", idRole);
    // await db.Tags.query().patch({ idRole: null }).where("idRole", idRole);
    // await db.PresetMessages.query().patch({ idRole: null }).where("idRole", idRole);
    // await db.CompanyGroups.query().patch({ idRole: null }).where("idRole", idRole);
    await db.Roles.query().delete().where("idRole", idRole);
    return h.response(utils.buildResponse("Successfully Deleted Role.", true));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

module.exports = {
  getAllRoles,
  getRole,
  createRole,
  patchRole,
  deleteRole,
};
