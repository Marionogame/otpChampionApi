async function getAllCategories(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { companyid } = request.headers;
  try {
    const category = await db.Category.query().where("companyId", parseInt(companyid));

    return h.response(utils.buildResponse("Successfully Fetched All category.", true, category));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function getCategory(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { categoryId } = request.params;
  try {
    const category = await db.Category.query().findById(categoryId);

    return h.response(utils.buildResponse("Successfully Fetched One category.", true, category));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function createCategory(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { companyid } = request.headers;
  const { name, type } = request.payload;
  try {
    const category = await db.Category.query().insertAndFetch({ companyId: parseInt(companyid), name, type });

    return h.response(utils.buildResponse("Successfully Created category.", true, category));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function patchCategory(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { categoryId } = request.params;
  const { name, type } = request.payload;
  try {
    const category = await db.Category.query().patchAndFetchById(categoryId, { name, type });

    return h.response(utils.buildResponse("Successfully Patched category.", true, category));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function deleteCategory(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { categoryId } = request.params;
  try {
    await db.QuickAnswers.query().patch({ categoryId: null }).where("categoryId", categoryId);
    await db.Tags.query().patch({ categoryId: null }).where("categoryId", categoryId);
    await db.PresetMessages.query().patch({ categoryId: null }).where("categoryId", categoryId);
    await db.CompanyGroups.query().patch({ categoryId: null }).where("categoryId", categoryId);
    await db.Category.query().delete().where("id", categoryId);

    return h.response(utils.buildResponse("Successfully Deleted Category.", true));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  patchCategory,
  deleteCategory,
};
