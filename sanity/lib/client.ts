import { createClient } from "next-sanity"

import { apiVersion, dataset, projectId, useCdn } from "../env"

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token:
    "skWiGCMMjL1ffzOxLYI6xVJo2KsYN8oNb3Q5AqfGLgy8jGYMx4uAmHACFUhi87WpaNvV3eEHPK9BbDCPLAVbgMnTLubPNl7fJLGLBZEJbbGnQXtWpofVWjacwVFe4uvBBFER96vZL1ywpsVXYubIqCmG7UGl1bcEJhMNlcEtpiReqJLRtFzy",
})
