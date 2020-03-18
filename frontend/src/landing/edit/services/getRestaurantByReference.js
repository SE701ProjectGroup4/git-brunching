import { RESERVATION } from "../../../general/config";

export default async (id) => {
  const response = await fetch(`${RESERVATION}${id}`).then((res) => res.json());
  return response;
};
