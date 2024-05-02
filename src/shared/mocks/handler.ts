import { signin } from "@/features/auth/apis/sign-in.mock";

import { HttpHandler } from "msw";

export const handlers: HttpHandler[] = [signin];
