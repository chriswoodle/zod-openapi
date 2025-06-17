/*
This code is heavily inspired by https://github.com/asteasolutions/zod-to-openapi/blob/master/src/zod-extensions.ts
 */

import { extendApi } from './zod-openapi30';
import { z } from "zod";
import type { SchemaObject } from "openapi3-ts/oas30";
import { ZodTypeDef } from "zod";

export function extendZodWithOpenApi(zod: typeof z, forceOverride = false) {
    if (!forceOverride && typeof zod.ZodSchema.prototype.openapi !== 'undefined') {
        // This zod instance is already extended with the required methods,
        // doing it again will just result in multiple wrapper methods for
        // `optional` and `nullable`
        return;
    }

    zod.ZodSchema.prototype.openapi = function (
        metadata?: Partial<SchemaObject>
    ) {
        return extendApi(this, metadata)
    }
}
