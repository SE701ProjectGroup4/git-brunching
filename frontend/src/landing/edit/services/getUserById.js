import { USER } from "../../../general/config";

export default async (id) => {
  const response = await fetch(`${USER}${id}`).then((res) => res.json());
  return response;
};
