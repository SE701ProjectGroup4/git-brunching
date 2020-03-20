import { USER } from "../../../general/config";

/**
 * Get user information base on their ID
 * @param id
 * @returns {Promise<any>}
 */
export default async (id) => {
  const response = await fetch(`${USER}${id}`).then((res) => res.json());
  return response;
};
