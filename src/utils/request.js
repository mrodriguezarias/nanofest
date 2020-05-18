import { API_URL } from "../core/constants"
import qs from "qs"
import { objectUtils } from "./"
import { storage } from "../utils"

export const doRequest = async (method, uri, data) => {
  const url = `${API_URL}/${uri}`
  const authorize = ["POST", "PUT", "DELETE"].includes(method)
  const response = await fetch(url, {
    method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      ...(authorize && { Authorization: storage.load("secret") }),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    ...(data && { body: JSON.stringify(data) }),
  })
  if (!response.ok) {
    console.error("Fetch error", response.status)
    return null
  }
  const json = await response.json()
  return json
}

export const get = async (uri, filters) => {
  const params = qs.stringify(objectUtils.replaceKey(filters, "id", "_id"))
  const result = await doRequest("GET", `${uri}?${params}`)
  return result && Array.isArray(result)
    ? result.map((row) => objectUtils.replaceKey(row, "_id", "id"))
    : result
}

export const post = async (uri, data) => {
  return doRequest("POST", uri, data)
}

export const put = async (uri, filters, data) => {
  const params = qs.stringify(objectUtils.replaceKey(filters, "id", "_id"))
  return doRequest("PUT", `${uri}?${params}`, data)
}

export const del = async (uri, filters) => {
  const params = qs.stringify(objectUtils.replaceKey(filters, "id", "_id"))
  return doRequest("DELETE", `${uri}?${params}`)
}

const request = {
  get,
  post,
  put,
  delete: del,
}

export { request }
export default request
