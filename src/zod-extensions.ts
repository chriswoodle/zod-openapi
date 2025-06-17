/*
This code is heavily inspired by https://github.com/asteasolutions/zod-to-openapi/blob/master/src/zod-extensions.ts
 */

import { extendApi as extendApi30, OpenApiZodAny as OpenApiZodAny30, ExtendedSchemaObject as ExtendedSchemaObject30 } from './zod-openapi30';
import { extendApi as extendApi31, OpenApiZodAny as OpenApiZodAny31, ExtendedSchemaObject as ExtendedSchemaObject31 } from './zod-openapi31';
import {z} from "zod";
import type{ SchemaObject as SchemaObject31 } from "openapi3-ts/oas31";
import type{ SchemaObject as SchemaObject30 } from "openapi3-ts/oas30";
import {ZodTypeDef} from "zod";
import { OpenAPIVersion } from './types';

declare module 'zod' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface ZodSchema<Output = any, Def extends ZodTypeDef = ZodTypeDef, Input = Output> {
    openapi<T extends ZodSchema<Output, Def, Input>>(
      this: T,
      metadata: Partial<SchemaObject30 | SchemaObject31>
    ): T;
  }
}

export function extendZodWithOpenApi(zod: typeof z, openApiVersion: OpenAPIVersion = '3.0', forceOverride = false) {
  if (!forceOverride && typeof zod.ZodSchema.prototype.openapi !== 'undefined') {
    // This zod instance is already extended with the required methods,
    // doing it again will just result in multiple wrapper methods for
    // `optional` and `nullable`
    return;
  }

  zod.ZodSchema.prototype.openapi = function (
    metadata?: Partial<SchemaObject30 | SchemaObject31>
  ) {
    if (openApiVersion === '3.0') {
      return extendApi(this, metadata as SchemaObject30, openApiVersion)
    } else {
      return extendApi(this, metadata as SchemaObject31, openApiVersion)
    }
  }
}

export function extendApi<T extends OpenApiZodAny30>(
    schema: T,
    schemaObject: ExtendedSchemaObject30,
    openApiVersion: '3.0'
): T;
export function extendApi<T extends OpenApiZodAny31>(
    schema: T,
    schemaObject: ExtendedSchemaObject31,
    openApiVersion: '3.1'
): T;
export function extendApi<T extends OpenApiZodAny30 | OpenApiZodAny31>(
    schema: T,
    schemaObject: ExtendedSchemaObject30 | ExtendedSchemaObject31 = {},
    openApiVersion: OpenAPIVersion = '3.0'
): T {
    if (openApiVersion === '3.0') {
        return extendApi30(schema as OpenApiZodAny30, schemaObject as ExtendedSchemaObject30) as T
    } else {
        return extendApi31(schema as OpenApiZodAny31, schemaObject as ExtendedSchemaObject31) as T
    }
}