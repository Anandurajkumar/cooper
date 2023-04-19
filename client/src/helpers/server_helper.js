import { APIClient } from "./api_helper";
import * as url from "./user_auth";


const api = new APIClient();

//REGISTER METHOD

export const postRegister = data => api.create(url.USER_REGISTER,data);
