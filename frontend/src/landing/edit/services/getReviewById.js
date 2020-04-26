import { GET_REVIEWS } from "../../../general/config";
/**
 * API call for getting data for a single restaurant
 * @param id
 * @returns {Promise<any>}
 */
export default async (id) => {
    const response = await fetch(GET_REVIEWS(id)).then((res) => res.json());
    return response;
  };
  