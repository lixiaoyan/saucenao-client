const getType = item => {
  switch (item.header.index_id) {
    case 5:
    case 6:
      return "pixiv";
    default:
      return "unknown";
  }
};

const getID = (item, type) => {
  switch (type) {
    case "pixiv":
      return item.data.pixiv_id;
    default:
      return null;
  }
};

const getUrl = (item, type, id) => {
  switch (type) {
    case "pixiv":
      return `https://www.pixiv.net/member_illust.php?mode=medium&illust_id=${id}`;
    default:
      return null;
  }
};

const normalizeResult = result => {
  return result.results.map(item => {
    const type = getType(item);
    const id = getID(item, type);
    const title = item.data.title;
    const thumbnail = item.header.thumbnail;
    const url = getUrl(item, type, id);
    return { type, id, title, thumbnail, url };
  });
};

export default normalizeResult;
