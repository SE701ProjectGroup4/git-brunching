import { RESERVATION } from "../../../general/config";

/**
 * Delete a reservation based on the reference ID
 * @param id
 * @returns {Promise<any>}
 */
export default async (id) => {
  const response = await fetch(`${RESERVATION}${id}`, { method: "DELETE" }).then((res) => res.json());
  return response;
};
