import axios from "axios";

const REACT_APP_API_ROOT_PATH = "http://localhost:3000";
// Root path should come from Environment variables
export const AUTH_BASE_PATH = "/auth";
export const AUTH_ACCEPT_PATH = `${AUTH_BASE_PATH}/invitation`;
export const AUTH_CREATE_END_POINT = AUTH_BASE_PATH + "/sign_in";
export const AUTH_DESTROY_END_POINT = AUTH_BASE_PATH + "/sign_out";
export const AUTH_VALIDATE_TOKEN_END_POINT = AUTH_BASE_PATH + "/validate_token";

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const constructPath = (path) => REACT_APP_API_ROOT_PATH + "/" + path;

const _buildHeaders = (headers = {}) => {
  return { ...DEFAULT_HEADERS, ...headers };
};

export class NetworkUnauthorizedError extends Error {
  constructor(...params) {
    super(...params);

    this.name = "NetworkUnauthorizedError";
  }
}

export class NetworkNotFoundError extends Error {
  constructor(args = {}, ...params) {
    super(...params);
    this.name = "NetworkNotFoundError";
    this.errors = args.errors || {};
    this.response = args.response || {};
  }
}

export class NetworkParamError extends Error {
  constructor(errors, ...params) {
    super(...params);

    this.name = "NetworkParamError";
    this.errors = errors;
  }
}

export const networkApiCall = (
  path,
  options = { method: "get", headers: {}, data: null }
) => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const promise = axios(constructPath(path), {
    ...options,
    headers: _buildHeaders(options.headers),
    cancelToken: source.token,
    withCredentials: true,
  }).catch((error) => {
    if (
      error?.response?.status !== 404 &&
      (error?.response?.data?.error || error?.response?.data?.errors)
    ) {
      // If its a "regular" error, pass the messages back to the user
      const singleError = error?.response?.data?.error
        ? [error?.response?.data?.error]
        : [];
      const errorsObj = error?.response?.data?.errors;
      const otherErrors = !errorsObj
        ? []
        : Array.isArray(errorsObj)
        ? errorsObj
        : Object.keys(errorsObj).map((key) => `${key} ${errorsObj[key][0]}`);
      throw new NetworkParamError([...singleError, ...otherErrors]);
    }
  });

  return promise;
};
