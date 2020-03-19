import { GET_ALL_RESTAURANTS } from "../../general/config";

export default async (id) => {
  const response = await fetch(`${GET_ALL_RESTAURANTS}${id}`).then((res) => res.json());
  return response;
};
