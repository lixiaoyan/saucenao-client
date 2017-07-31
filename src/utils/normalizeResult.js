const getType = item => {
  switch (item.header.index_id) {
    case 5:
    case 6:
      return "pixiv";
    case 35:
      return "pawoo";
    default:
      return "unknown";
  }
};

const getID = (item, type) => {
  switch (type) {
    case "pixiv":
      return item.data.pixiv_id;
    case "pawoo":
      return item.data.pawoo_id;
    default:
      return null;
  }
};

const getAuthor = (item, type) => {
  switch (type) {
    case "pixiv":
      return {
        id: item.data.member_id,
        name: item.data.member_name,
      };
    case "pawoo":
      return {
        id: item.data.pawoo_user_acct,
        name: item.data.pawoo_user_display_name,
      };
    default:
      return null;
  }
};

const getUrl = (item, type, id, author) => {
  switch (type) {
    case "pixiv":
      return `https://www.pixiv.net/member_illust.php?mode=medium&illust_id=${id}`;
    case "pawoo":
      return `https://pawoo.net/@${author.id}/${id}`;
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
    const author = getAuthor(item, type);
    const url = getUrl(item, type, id, author);
    const similarity = item.header.similarity;
    return { type, id, title, thumbnail, author, url, similarity };
  });
};

export default normalizeResult;
