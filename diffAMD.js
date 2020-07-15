const { prop, difference, includes, map, indexBy, groupBy } = require('rambda');

/**
 * 输入两个版本的数据和主键，找出哪些是新增、修改、删除。用于数据比对或同步
 * @param {Object[]} source - 新数据或数据源
 * @param {Object[]} target - 旧数据或需要被更新的目标
 * @param {string} id - 主键名称
 */
const diffAMD = (source, target, id) => {
  const getIds = map(prop(id));
  const sourceIds = getIds(source);
  const targetIds = getIds(target);

  // 删除的项目，新版本中有，旧版本中无
  const deleteIds = difference(targetIds, sourceIds);
  const indexedTarget = indexBy(prop(id), target);
  const D = map((v) => indexedTarget[v])(deleteIds);

  // 变更的项目，包括修改和添加
  const upserts = difference(source, target);

  // 新项目编号
  const appendIds = difference(sourceIds, targetIds);

  // 将变更项目分为新加和修改
  const { A, M } = groupBy((v) => (includes(v[id], appendIds) ? 'A' : 'M'))(upserts);

  return { A, M, D };
};

module.exports = diffAMD;
