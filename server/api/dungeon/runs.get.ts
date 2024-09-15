import { z } from "zod";
import type { RunDungeonResult } from "~/utils/dungeons";

const getRunsSchema = z.object({
  limit: z.number().optional(),
})

export default defineEventHandler(async (event): Promise<Array<RunDungeonResult>> => {
  const query = getQuery(event)
  const { limit } = getRunsSchema.parse(query)

  const { getRuns } = useUserService(TEMP_USER_ID)
  const runs = await getRuns(limit)
  return runs
})