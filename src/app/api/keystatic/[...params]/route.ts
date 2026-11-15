import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../../keystatic.config";
import { adminEnabled } from "@/lib/admin";

const handler = makeRouteHandler({ config });
const notFound = () => new Response("Not found", { status: 404 });

export const GET = adminEnabled ? handler.GET : notFound;
export const POST = adminEnabled ? handler.POST : notFound;
