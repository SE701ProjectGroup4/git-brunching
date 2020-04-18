import { GET_RESERVATION } from "../../../general/config";

/**
 * Get a reservation based on the reference ID
 * @param id
 * @returns {Promise<any>}
 */
export default async (id) => {
  const response = await fetch(GET_RESERVATION(id)).then((res) => res.json());
  return response;
};
