async function getAllTags(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { companyid } = request.headers;
  try {
    const tags = await db.Tags.query().where("companyId", parseInt(companyid)).withGraphFetched("[category, group]");

    return h.response(utils.buildResponse("Succesfully Fetched All Tags.", true, tags));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error));
  }
}

async function getTag(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { tagId } = request.params;
  try {
    const tag = await db.Tags.query().findById(tagId).withGraphFetched("[category, group]");

    return h.response(utils.buildResponse("Succesfully Fetched One Tag.", true, tag));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error));
  }
}

async function createTag(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { companyid } = request.headers;
  const { name, groupId = null, categoryId = null } = request.payload;
  try {
    const newTag = await db.Tags.query().insertAndFetch({ companyId: parseInt(companyid), name, groupId, categoryId });
    const createdTag = await db.Tags.query().findById(newTag.tagId).withGraphFetched("[category, group]");

    return h.response(utils.buildResponse("Succesfully Created Tag.", true, createdTag));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error));
  }
}

async function patchTag(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { tagId } = request.params;
  try {
    const newTag = await db.Tags.query().patchAndFetchById(tagId, request.payload);
    const patchedTag = await db.Tags.query().findById(newTag.tagId).withGraphFetched("[category, group]");

    return h.response(utils.buildResponse("Succesfully Patched Tag.", true, patchedTag));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error));
  }
}

async function deleteTag(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { tagId } = request.params;
  try {
    await db.Tags.query().delete().where("tagId", tagId);

    return h.response(utils.buildResponse("Succesfully Deleted Tag.", true));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error));
  }
}

module.exports = {
  getAllTags,
  getTag,
  createTag,
  patchTag,
  deleteTag,
};
