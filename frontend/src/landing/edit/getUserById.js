import { RESERVATION } from "../../general/config";

export default async (id) => {
  const response = await fetch(`http://localhost:3001/user/${id}`).then((res) => res.json());
  return response;
};
