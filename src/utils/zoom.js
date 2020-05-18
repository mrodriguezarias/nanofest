import { ZOOM_URL, ZOOM_PMI, ZOOM_PASS } from "../core/constants"

export const zoom = {
  url: `https://zoom.us/j/${ZOOM_PMI}`,
  passUrl: ZOOM_URL,
  pass: ZOOM_PASS,
  get pmi() {
    const p1 = ZOOM_PMI.slice(0, 3)
    const p2 = ZOOM_PMI.slice(3, 6)
    const p3 = ZOOM_PMI.slice(6)
    return [p1, p2, p3].join(" ")
  },
}
