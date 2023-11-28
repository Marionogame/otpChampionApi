const { omit, isEqual, difference, isEmpty } = require("lodash");

async function getAllGames(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  try {
    const gameData = await db.Games.query().withGraphFetched("[region,teamstat.[team,championstat.[champion,summoner,position,item]]]");
    return h.response(utils.buildResponse("Successfully Fetched All game.", true, gameData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function getGame(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { idGame } = request.params;
  try {
    const gameData = await db.Games.query().findById(idGame).withGraphFetched("[region,teamstat.[team,championstat.[champion,summoner,position,item]]]");

    return h.response(utils.buildResponse("Successfully Fetched One game.", true, gameData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function createGame(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const trx = await db.Games.startTransaction();
  const { kdaKill, kdaDeath, kdaAssist, idRegion, date, tournament, teamstatList, phase, patch, link } = request.payload;

  try {
    const gameData = await db.Games.query(trx).insertAndFetch({ kdaKill, kdaDeath, kdaAssist, idRegion, date, tournament, phase, patch, link });

    for (const teamstatObj of teamstatList) {
      const teamstatObjList = omit(teamstatObj, ["championstatList"]);
      const teamstatData = await db.Teamstats.query(trx).insert({ idGame: gameData.idGame, ...teamstatObjList });
      for (const championObj of teamstatObj.championstatList) {
        const teamstatObjList = omit(championObj, ["itemIdList"]);
        const championstatData = await db.Championstats.query(trx).insert({ idTeamStat: teamstatData.idTeamstat, ...teamstatObjList });
        for (const idItem of championObj.itemIdList) {
          await db.Championstatitems.query(trx).insert({ idChampionStat: championstatData.idChampionStat, idItem: idItem });
        }
      }
    }
    // const savedata = {
    //   kdaKill: 52,
    //   kdaDeath: 42,
    //   kdaAssist: 88,
    //   idRegion: 1,
    //   date: "2015-04-03",
    //   tournament: "Latino America",
    //   phase: "Finales",
    //   patch: "23.45",
    //   link: "asasasasasasasasasasasDQWDqwdQWDQ",
    //   teamstatList: [
    //     {
    //       idTeam: 1,
    //       winner: true,
    //       kdaKill: 32,
    //       kdaDeath: 23,
    //       kdaAssist: 67,
    //       gold: 345,
    //       tower: 6,
    //       blue: true,
    //       championstatList: [
    //         {
    //           idChampion: 1,
    //           idSummoner: 1,
    //           kdaKill: 2,
    //           kdaDeath: 5,
    //           kdaAssist: 4,
    //           gold: 78,
    //           farm: 139,
    //           idPosition: 1,
    //           itemIdList: [1, 2],
    //         },
    //         {
    //           idChampion: 1,
    //           idSummoner: 1,
    //           kdaKill: 2,
    //           kdaDeath: 4,
    //           kdaAssist: 4,
    //           gold: 78,
    //           farm: 139,
    //           idPosition: 1,
    //           itemIdList: [1, 2],
    //         },
    //         {
    //           idChampion: 1,
    //           idSummoner: 1,
    //           kdaKill: 2,
    //           kdaDeath: 4,
    //           kdaAssist: 4,
    //           gold: 78,
    //           farm: 139,
    //           idPosition: 1,
    //           itemIdList: [1, 2],
    //         },
    //       ],
    //     },
    //     {
    //       idTeam: 1,
    //       winner: false,
    //       kdaKill: 32,
    //       kdaDeath: 23,
    //       kdaAssist: 67,
    //       gold: 345,
    //       tower: 6,

    //       blue: false,
    //       championstatList: [
    //         {
    //           idChampion: 1,
    //           idSummoner: 1,
    //           kdaKill: 2,
    //           kdaDeath: 1,
    //           kdaAssist: 1,
    //           gold: 78,
    //           farm: 139,
    //           idPosition: 1,
    //           itemIdList: [1, 2],
    //         },
    //         {
    //           idChampion: 1,
    //           idSummoner: 1,
    //           kdaKill: 2,
    //           kdaDeath: 1,
    //           kdaAssist: 1,
    //           gold: 78,
    //           farm: 139,
    //           idPosition: 1,
    //           itemIdList: [1, 2],
    //         },
    //         {
    //           idChampion: 1,
    //           idSummoner: 1,
    //           kdaKill: 2,
    //           kdaDeath: 1,
    //           kdaAssist: 1,
    //           gold: 78,
    //           farm: 139,
    //           idPosition: 1,
    //           itemIdList: [1, 2],
    //         },
    //       ],
    //     },
    //   ],
    // };
    await trx.commit();
    return h.response(utils.buildResponse("Successfully Created game.", true, gameData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function patchGame(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { idGame } = request.params;
  const trx = await db.Games.startTransaction();
  const { kdaKill, kdaDeath, kdaAssist, idRegion, date, tournament, teamstatList, phase, patch, link } = request.payload;

  try {
    await db.Games.query(trx).patchAndFetchById(idGame, { kdaKill, kdaDeath, kdaAssist, idRegion, date, tournament, phase, patch, link });

    for (const teamstatObj of teamstatList) {
      const teamstatObjList = omit(teamstatObj, ["championstatList", "idTeamStat"]);
      await db.Teamstats.query(trx).patchAndFetchById(teamstatObj.idTeamStat, teamstatObjList);

      for (const championObj of teamstatObj.championstatList) {
        const ChampionObjList = omit(championObj, ["itemIdList", "prevItemIdList", "idChampionStat"]);
        await db.Championstats.query(trx).patchAndFetchById(championObj.idChampionStat, ChampionObjList);
        const prevItemIdList = championObj.prevItemIdList;
        const itemIdList = championObj.itemIdList;

        if (!isEqual(prevItemIdList, itemIdList)) {
          const itemsToRemove = difference(prevItemIdList, itemIdList);
          const itemsToAdd = difference(itemIdList, prevItemIdList);
          if (!isEmpty(itemsToRemove)) {
            for (const idItem of itemsToRemove) {
              await db.Championstatitems.query(trx).delete().where("idChampionStat", parseInt(championObj.idChampionStat)).andWhere("idItem", idItem);
            }
          }
          if (!isEmpty(itemsToAdd)) {
            for (const idItem of itemsToAdd) {
              await db.Championstatitems.query(trx).insert({ idChampionStat: parseInt(championObj.idChampionStat), idItem });
            }
          }
        }
      }
    }
    const gameData = await db.Games.query(trx)
      .findById(idGame)
      .withGraphFetched("[region,teamstat.[team,championstat.[champion,summoner,position,item]]]");

    await trx.commit();
    // const editdata = {
    //   kdaKill: 52,
    //   kdaDeath: 78,
    //   kdaAssist: 88,
    //   idRegion: 1,
    //   date: "2015-04-03",
    //   tournament: "Latino America",
    //   phase: "Finales",
    //   patch: "23.45",
    //   link: "asasasasasasasasasasasDQWDqwdQWDQ",
    //   teamstatList: [
    //     {
    //       idTeamStat: 44,-------------
    //       idTeam: 1,
    //       winner: true,
    //       kdaKill: 32,
    //       kdaDeath: 23,
    //       kdaAssist: 67,
    //       gold: 345,
    //       tower: 6,
    //       blue: true,
    //       championstatList: [
    //         {
    //           idChampionStat: 55,--------------
    //           idChampion: 1,
    //           idSummoner: 1,
    //           kdaKill: 2,
    //           kdaDeath: 5,
    //           kdaAssist: 4,
    //           gold: 78,
    //           farm: 139,
    //           idPosition: 1,
    //           prevItemIdList: [1, 2],
    //           itemIdList: [1],
    //         },
    //         {
    //           idChampionStat: 56,
    //           idChampion: 1,
    //           idSummoner: 1,
    //           kdaKill: 2,
    //           kdaDeath: 4,
    //           kdaAssist: 4,
    //           gold: 78,
    //           farm: 139,
    //           idPosition: 1,
    //           prevItemIdList: [1, 2],
    //           itemIdList: [1],
    //         },
    //         {
    //           idChampionStat: 57,
    //           idChampion: 1,
    //           idSummoner: 1,
    //           kdaKill: 2,
    //           kdaDeath: 4,
    //           kdaAssist: 4,
    //           gold: 78,
    //           farm: 139,
    //           idPosition: 1,
    //           prevItemIdList: [1, 2],
    //           itemIdList: [1],
    //         },
    //       ],
    //     },
    //     {
    //       idTeamStat: 45,
    //       idTeam: 1,
    //       winner: false,
    //       kdaKill: 32,
    //       kdaDeath: 23,
    //       kdaAssist: 67,
    //       gold: 345,
    //       tower: 6,

    //       blue: false,
    //       championstatList: [
    //         {
    //           idChampionStat: 58,
    //           idChampion: 1,
    //           idSummoner: 1,
    //           kdaKill: 2,
    //           kdaDeath: 1,
    //           kdaAssist: 1,
    //           gold: 78,
    //           farm: 139,
    //           idPosition: 1,
    //           prevItemIdList: [1, 2],
    //           itemIdList: [1],
    //         },
    //         {
    //           idChampionStat: 59,
    //           idChampion: 1,
    //           idSummoner: 1,
    //           kdaKill: 2,
    //           kdaDeath: 1,
    //           kdaAssist: 1,
    //           gold: 78,
    //           farm: 139,
    //           idPosition: 1,
    //           prevItemIdList: [1, 2],
    //           itemIdList: [1],
    //         },
    //         {
    //           idChampionStat: 60,
    //           idChampion: 1,
    //           idSummoner: 1,
    //           kdaKill: 2,
    //           kdaDeath: 1,
    //           kdaAssist: 1,
    //           gold: 78,
    //           farm: 139,
    //           idPosition: 1,
    //           prevItemIdList: [1],
    //           itemIdList: [1, 1],
    //         },
    //       ],
    //     },
    //   ],
    // };

    return h.response(utils.buildResponse("Successfully Patched game.", true, gameData));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

async function deleteGame(request, h) {
  const { utils } = request.server.methods;
  const { db } = request.server.app;
  const { idGame } = request.params;
  const trx = await db.Games.startTransaction();

  try {
    const gameData = await db.Games.query().findById(idGame).withGraphFetched("[teamstat.[championstat.[item]]]");

    for (const teamstatObj of gameData.teamstat) {
      for (const championObj of teamstatObj.championstat) {
        for (const itemObj of championObj.item) {
          await db.Championstatitems.query(trx).delete().where("idChampionStat", parseInt(championObj.idChampionStat)).andWhere("idItem", itemObj.idItem);
        }
        await db.Championstats.query(trx).delete().where("idChampionStat", championObj.idChampionStat);
      }
      await db.Teamstats.query(trx).delete().where("idTeamStat", teamstatObj.idTeamStat);
    }
    await db.Games.query(trx).delete().where("idGame", idGame);
    await trx.commit();
    return h.response(utils.buildResponse("Successfully Deleted Game.", true));
  } catch (error) {
    console.log(error);
    return h.response(utils.buildResponse(error.message));
  }
}

module.exports = {
  getAllGames,
  getGame,
  createGame,
  patchGame,
  deleteGame,
};
