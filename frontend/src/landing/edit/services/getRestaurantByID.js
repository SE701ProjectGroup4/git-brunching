import { GET_ALL_RESTAURANTS } from "../../../general/config";

/**
 * API call for getting data for a single restaurant
 * @param id
 * @returns {Promise<any>}
 */
export default async (id) => {
  const response = await fetch(`${GET_ALL_RESTAURANTS}${id}`).then((res) => res.json());
  return response;
};
