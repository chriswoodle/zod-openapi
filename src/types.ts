import { z } from "zod";
import type { SchemaObject as SchemaObject30 } from "openapi3-ts/oas30";
import type { SchemaObject as SchemaObject31 } from "openapi3-ts/oas31";
import { ZodTypeDef } from "zod";  

export type OpenAPIVersion = '3.0' | '3.1';

export const fragmentName = Symbol('fragmentName');

declare module 'zod' {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    interface ZodSchema<Output = any, Def extends ZodTypeDef = ZodTypeDef, Input = Output> {
        openapi<T extends ZodSchema<Output, Def, Input>>(
            this: T,
            metadata: Partial<SchemaObject30>
        ): T;
    }
}