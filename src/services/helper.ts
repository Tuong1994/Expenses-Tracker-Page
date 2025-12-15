import { ApiQuery } from "./type";

export const LIST_LIMIT_ITEMS = 20;

export const getApiQuery = (query: ApiQuery) => {
  let {
    langCode,
    page,
    limit,
    keywords,
    sortBy,
    ids,
    userId,
    categoryId,
    transactionId,
    imageId,
    cityId,
    cityCode,
    districtId,
    districtCode,
    wardId,
    wardCode,
    role,
    gender,
  } = query;

  let rs = "?";

  const result = Object.entries(query).map(([key, value], idx) => {
    let queryName = key;
    let queryValue = value;
    if (queryName === "page" && Number(queryValue) < 1) queryValue = 1;
    if (queryName === "limit" && (Number(queryValue) < 10 || Number(queryValue) > 100))
      queryValue = LIST_LIMIT_ITEMS;
    return `${idx > 0 ? "&" : ""}${queryName}=${queryValue}`;
  });

  // page && page < 1 && (page = 1);
  // limit && limit < 10 && (limit = LIST_LIMIT_ITEMS);
  // limit && limit > 100 && (limit = LIST_LIMIT_ITEMS);

  // langCode && (rs += `langCode=${langCode}`);
  // page && (rs += `&page=${page}`);
  // limit && (rs += `&limit=${limit}`);
  // keywords && (rs += `&keywords=${keywords}`);
  // sortBy && (rs += `&sortBy=${sortBy}`);

  // ids && (rs += `&ids=${ids}`);
  // userId && (rs += `&userId=${userId}`);
  // categoryId && (rs += `&categoryId=${categoryId}`);
  // transactionId && (rs += `&transactionId=${transactionId}`);
  // imageId && (rs += `&imageId=${imageId}`);
  // cityId && (rs += `&cityId=${cityId}`);
  // cityCode && (rs += `&cityCode=${cityCode}`);
  // districtId && (rs += `&districtId=${districtId}`);
  // districtCode && (rs += `&districtCode=${districtCode}`);
  // wardId && (rs += `&wardId=${wardId}`);
  // wardCode && (rs += `&wardCode=${wardCode}`);
  // role && (rs += `&role=${role}`);
  // gender && (rs += `&gender=${gender}`);

  return rs + result.join("");
};
