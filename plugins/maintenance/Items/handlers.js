async function getAllItems(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  try {
    const itemData = await db.Items.query();
    return h.response(utils.buildResponse("Successfully Fetched All item.", true, itemData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function getItem(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { idItem } = request.params;
  try {
    const itemData = await db.Items.query().findById(idItem);

    return h.response(utils.buildResponse("Successfully Fetched One item.", true, itemData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function createItem(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { name, url } = request.payload;
  try {
    const itemData = await db.Items.query().insertGraph(request.payload);

    return h.response(utils.buildResponse("Successfully Created item.", true, itemData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function patchItem(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { idItem } = request.params;
  const { name, url } = request.payload;
  try {
    const itemData = await db.Items.query().patchAndFetchById(idItem, { name, url });

    return h.response(utils.buildResponse("Successfully Patched item.", true, itemData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function deleteItem(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { idItem } = request.params;
  try {
    // await db.QuickAnswers.query().patch({ idItem: null }).where("idItem", idItem);
    // await db.Tags.query().patch({ idItem: null }).where("idItem", idItem);
    // await db.PresetMessages.query().patch({ idItem: null }).where("idItem", idItem);
    // await db.CompanyGroups.query().patch({ idItem: null }).where("idItem", idItem);
    await db.Items.query().delete().where("idItem", idItem);
    return h.response(utils.buildResponse("Successfully Deleted Item.", true));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

module.exports = {
  getAllItems,
  getItem,
  createItem,
  patchItem,
  deleteItem,
};
