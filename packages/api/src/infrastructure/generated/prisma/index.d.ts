/**
 * Client
 **/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types; // general types
import $Public = runtime.Types.Public;
import $Utils = runtime.Types.Utils;
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export type PrismaPromise<T> = $Public.PrismaPromise<T>;

/**
 * Model Tenant
 *
 */
export type Tenant = $Result.DefaultSelection<Prisma.$TenantPayload>;
/**
 * Model User
 *
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>;
/**
 * Model RefreshToken
 *
 */
export type RefreshToken = $Result.DefaultSelection<Prisma.$RefreshTokenPayload>;
/**
 * Model Client
 *
 */
export type Client = $Result.DefaultSelection<Prisma.$ClientPayload>;
/**
 * Model Interaction
 *
 */
export type Interaction = $Result.DefaultSelection<Prisma.$InteractionPayload>;
/**
 * Model Segment
 *
 */
export type Segment = $Result.DefaultSelection<Prisma.$SegmentPayload>;
/**
 * Model Notification
 *
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>;
/**
 * Model AuditLog
 *
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Tenants
 * const tenants = await prisma.tenant.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions
    ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<ClientOptions['log']>
      : never
    : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] };

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Tenants
   * const tenants = await prisma.tenant.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(
    eventType: V,
    callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void
  ): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(
    arg: [...P],
    options?: { isolationLevel?: Prisma.TransactionIsolationLevel }
  ): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;

  $transaction<R>(
    fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    }
  ): $Utils.JsPromise<R>;

  $extends: $Extensions.ExtendsHook<
    'extends',
    Prisma.TypeMapCb<ClientOptions>,
    ExtArgs,
    $Utils.Call<
      Prisma.TypeMapCb<ClientOptions>,
      {
        extArgs: ExtArgs;
      }
    >
  >;

  /**
   * `prisma.tenant`: Exposes CRUD operations for the **Tenant** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Tenants
   * const tenants = await prisma.tenant.findMany()
   * ```
   */
  get tenant(): Prisma.TenantDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.refreshToken`: Exposes CRUD operations for the **RefreshToken** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more RefreshTokens
   * const refreshTokens = await prisma.refreshToken.findMany()
   * ```
   */
  get refreshToken(): Prisma.RefreshTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.client`: Exposes CRUD operations for the **Client** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Clients
   * const clients = await prisma.client.findMany()
   * ```
   */
  get client(): Prisma.ClientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.interaction`: Exposes CRUD operations for the **Interaction** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Interactions
   * const interactions = await prisma.interaction.findMany()
   * ```
   */
  get interaction(): Prisma.InteractionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.segment`: Exposes CRUD operations for the **Segment** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Segments
   * const segments = await prisma.segment.findMany()
   * ```
   */
  get segment(): Prisma.SegmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Notifications
   * const notifications = await prisma.notification.findMany()
   * ```
   */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more AuditLogs
   * const auditLogs = await prisma.auditLog.findMany()
   * ```
   */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF;

  export type PrismaPromise<T> = $Public.PrismaPromise<T>;

  /**
   * Validator
   */
  export import validator = runtime.Public.validator;

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
  export import PrismaClientValidationError = runtime.PrismaClientValidationError;

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag;
  export import empty = runtime.empty;
  export import join = runtime.join;
  export import raw = runtime.raw;
  export import Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal;

  export type DecimalJsLike = runtime.DecimalJsLike;

  /**
   * Extensions
   */
  export import Extension = $Extensions.UserArgs;
  export import getExtensionContext = runtime.Extensions.getExtensionContext;
  export import Args = $Public.Args;
  export import Payload = $Public.Payload;
  export import Result = $Public.Result;
  export import Exact = $Public.Exact;

  /**
   * Prisma Client JS version: 7.3.0
   * Query Engine version: 9d6ad21cbbceab97458517b147a6a09ff43aa735
   */
  export type PrismaVersion = {
    client: string;
    engine: string;
  };

  export const prismaVersion: PrismaVersion;

  /**
   * Utility Types
   */

  export import Bytes = runtime.Bytes;
  export import JsonObject = runtime.JsonObject;
  export import JsonArray = runtime.JsonArray;
  export import JsonValue = runtime.JsonValue;
  export import InputJsonObject = runtime.InputJsonObject;
  export import InputJsonArray = runtime.InputJsonArray;
  export import InputJsonValue = runtime.InputJsonValue;

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
     * Type of `Prisma.DbNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class DbNull {
      private DbNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.JsonNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class JsonNull {
      private JsonNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.AnyNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class AnyNull {
      private AnyNull: never;
      private constructor();
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull;

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull;

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull;

  type SelectAndInclude = {
    select: any;
    include: any;
  };

  type SelectAndOmit = {
    select: any;
    omit: any;
  };

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<
    ReturnType<T>
  >;

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
  }[keyof T];

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
  };

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & (T extends SelectAndInclude
    ? 'Please either choose `select` or `include`.'
    : T extends SelectAndOmit
      ? 'Please either choose `select` or `omit`.'
      : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & K;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T extends object
    ? U extends object
      ? (Without<T, U> & U) | (Without<U, T> & T)
      : U
    : T;

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> =
    T extends Array<any>
      ? False
      : T extends Date
        ? False
        : T extends Uint8Array
          ? False
          : T extends BigInt
            ? False
            : T extends object
              ? True
              : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
    }[K];

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;

  type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
  }[strict];

  type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown
    ? _Either<O, K, strict>
    : never;

  export type Union = any;

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
  } & {};

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (
    k: infer I
  ) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function
    ? A
    : {
        [K in keyof A]: A[K];
      } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
      ?
          | (K extends keyof O ? { [P in K]: O[P] } & O : O)
          | ({ [P in keyof O as P extends K ? P : never]-?: O[P] } & O)
      : never
  >;

  type _Strict<U, _U = U> = U extends unknown
    ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
    : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False;

  // /**
  // 1
  // */
  export type True = 1;

  /**
  0
  */
  export type False = 0;

  export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
      ? 1
      : 0;

  export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
      }
    : never;

  type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> =
    IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
        ? never
        : K;
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<
    T,
    MaybeTupleToUnion<K>
  >;

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

  type FieldRefInputType<Model, FieldType> = Model extends never
    ? never
    : FieldRef<Model, FieldType>;

  export const ModelName: {
    Tenant: 'Tenant';
    User: 'User';
    RefreshToken: 'RefreshToken';
    Client: 'Client';
    Interaction: 'Interaction';
    Segment: 'Segment';
    Notification: 'Notification';
    AuditLog: 'AuditLog';
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName];

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<
    { extArgs: $Extensions.InternalArgs },
    $Utils.Record<string, any>
  > {
    returns: Prisma.TypeMap<
      this['params']['extArgs'],
      ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}
    >;
  }

  export type TypeMap<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > = {
    globalOmitOptions: {
      omit: GlobalOmitOptions;
    };
    meta: {
      modelProps:
        | 'tenant'
        | 'user'
        | 'refreshToken'
        | 'client'
        | 'interaction'
        | 'segment'
        | 'notification'
        | 'auditLog';
      txIsolationLevel: Prisma.TransactionIsolationLevel;
    };
    model: {
      Tenant: {
        payload: Prisma.$TenantPayload<ExtArgs>;
        fields: Prisma.TenantFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.TenantFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TenantPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.TenantFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>;
          };
          findFirst: {
            args: Prisma.TenantFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TenantPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.TenantFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>;
          };
          findMany: {
            args: Prisma.TenantFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[];
          };
          create: {
            args: Prisma.TenantCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>;
          };
          createMany: {
            args: Prisma.TenantCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.TenantCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[];
          };
          delete: {
            args: Prisma.TenantDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>;
          };
          update: {
            args: Prisma.TenantUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>;
          };
          deleteMany: {
            args: Prisma.TenantDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.TenantUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.TenantUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[];
          };
          upsert: {
            args: Prisma.TenantUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>;
          };
          aggregate: {
            args: Prisma.TenantAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateTenant>;
          };
          groupBy: {
            args: Prisma.TenantGroupByArgs<ExtArgs>;
            result: $Utils.Optional<TenantGroupByOutputType>[];
          };
          count: {
            args: Prisma.TenantCountArgs<ExtArgs>;
            result: $Utils.Optional<TenantCountAggregateOutputType> | number;
          };
        };
      };
      User: {
        payload: Prisma.$UserPayload<ExtArgs>;
        fields: Prisma.UserFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateUser>;
          };
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>;
            result: $Utils.Optional<UserGroupByOutputType>[];
          };
          count: {
            args: Prisma.UserCountArgs<ExtArgs>;
            result: $Utils.Optional<UserCountAggregateOutputType> | number;
          };
        };
      };
      RefreshToken: {
        payload: Prisma.$RefreshTokenPayload<ExtArgs>;
        fields: Prisma.RefreshTokenFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.RefreshTokenFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.RefreshTokenFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
          };
          findFirst: {
            args: Prisma.RefreshTokenFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.RefreshTokenFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
          };
          findMany: {
            args: Prisma.RefreshTokenFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[];
          };
          create: {
            args: Prisma.RefreshTokenCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
          };
          createMany: {
            args: Prisma.RefreshTokenCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.RefreshTokenCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[];
          };
          delete: {
            args: Prisma.RefreshTokenDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
          };
          update: {
            args: Prisma.RefreshTokenUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
          };
          deleteMany: {
            args: Prisma.RefreshTokenDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.RefreshTokenUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.RefreshTokenUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[];
          };
          upsert: {
            args: Prisma.RefreshTokenUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
          };
          aggregate: {
            args: Prisma.RefreshTokenAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateRefreshToken>;
          };
          groupBy: {
            args: Prisma.RefreshTokenGroupByArgs<ExtArgs>;
            result: $Utils.Optional<RefreshTokenGroupByOutputType>[];
          };
          count: {
            args: Prisma.RefreshTokenCountArgs<ExtArgs>;
            result: $Utils.Optional<RefreshTokenCountAggregateOutputType> | number;
          };
        };
      };
      Client: {
        payload: Prisma.$ClientPayload<ExtArgs>;
        fields: Prisma.ClientFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ClientFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ClientFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>;
          };
          findFirst: {
            args: Prisma.ClientFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ClientFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>;
          };
          findMany: {
            args: Prisma.ClientFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[];
          };
          create: {
            args: Prisma.ClientCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>;
          };
          createMany: {
            args: Prisma.ClientCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ClientCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[];
          };
          delete: {
            args: Prisma.ClientDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>;
          };
          update: {
            args: Prisma.ClientUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>;
          };
          deleteMany: {
            args: Prisma.ClientDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ClientUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.ClientUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[];
          };
          upsert: {
            args: Prisma.ClientUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>;
          };
          aggregate: {
            args: Prisma.ClientAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateClient>;
          };
          groupBy: {
            args: Prisma.ClientGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ClientGroupByOutputType>[];
          };
          count: {
            args: Prisma.ClientCountArgs<ExtArgs>;
            result: $Utils.Optional<ClientCountAggregateOutputType> | number;
          };
        };
      };
      Interaction: {
        payload: Prisma.$InteractionPayload<ExtArgs>;
        fields: Prisma.InteractionFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.InteractionFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InteractionPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.InteractionFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InteractionPayload>;
          };
          findFirst: {
            args: Prisma.InteractionFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InteractionPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.InteractionFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InteractionPayload>;
          };
          findMany: {
            args: Prisma.InteractionFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InteractionPayload>[];
          };
          create: {
            args: Prisma.InteractionCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InteractionPayload>;
          };
          createMany: {
            args: Prisma.InteractionCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.InteractionCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InteractionPayload>[];
          };
          delete: {
            args: Prisma.InteractionDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InteractionPayload>;
          };
          update: {
            args: Prisma.InteractionUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InteractionPayload>;
          };
          deleteMany: {
            args: Prisma.InteractionDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.InteractionUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.InteractionUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InteractionPayload>[];
          };
          upsert: {
            args: Prisma.InteractionUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InteractionPayload>;
          };
          aggregate: {
            args: Prisma.InteractionAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateInteraction>;
          };
          groupBy: {
            args: Prisma.InteractionGroupByArgs<ExtArgs>;
            result: $Utils.Optional<InteractionGroupByOutputType>[];
          };
          count: {
            args: Prisma.InteractionCountArgs<ExtArgs>;
            result: $Utils.Optional<InteractionCountAggregateOutputType> | number;
          };
        };
      };
      Segment: {
        payload: Prisma.$SegmentPayload<ExtArgs>;
        fields: Prisma.SegmentFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.SegmentFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SegmentPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.SegmentFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SegmentPayload>;
          };
          findFirst: {
            args: Prisma.SegmentFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SegmentPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.SegmentFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SegmentPayload>;
          };
          findMany: {
            args: Prisma.SegmentFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SegmentPayload>[];
          };
          create: {
            args: Prisma.SegmentCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SegmentPayload>;
          };
          createMany: {
            args: Prisma.SegmentCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.SegmentCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SegmentPayload>[];
          };
          delete: {
            args: Prisma.SegmentDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SegmentPayload>;
          };
          update: {
            args: Prisma.SegmentUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SegmentPayload>;
          };
          deleteMany: {
            args: Prisma.SegmentDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.SegmentUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.SegmentUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SegmentPayload>[];
          };
          upsert: {
            args: Prisma.SegmentUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SegmentPayload>;
          };
          aggregate: {
            args: Prisma.SegmentAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateSegment>;
          };
          groupBy: {
            args: Prisma.SegmentGroupByArgs<ExtArgs>;
            result: $Utils.Optional<SegmentGroupByOutputType>[];
          };
          count: {
            args: Prisma.SegmentCountArgs<ExtArgs>;
            result: $Utils.Optional<SegmentCountAggregateOutputType> | number;
          };
        };
      };
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>;
        fields: Prisma.NotificationFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>;
          };
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>;
          };
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[];
          };
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>;
          };
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[];
          };
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>;
          };
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>;
          };
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[];
          };
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>;
          };
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateNotification>;
          };
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>;
            result: $Utils.Optional<NotificationGroupByOutputType>[];
          };
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>;
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number;
          };
        };
      };
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>;
        fields: Prisma.AuditLogFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>;
          };
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>;
          };
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[];
          };
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>;
          };
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[];
          };
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>;
          };
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>;
          };
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[];
          };
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>;
          };
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateAuditLog>;
          };
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>;
            result: $Utils.Optional<AuditLogGroupByOutputType>[];
          };
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>;
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number;
          };
        };
      };
    };
  } & {
    other: {
      payload: any;
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
      };
    };
  };
  export const defineExtension: $Extensions.ExtendsHook<
    'define',
    Prisma.TypeMapCb,
    $Extensions.DefaultArgs
  >;
  export type DefaultPrismaClient = PrismaClient;
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     *
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     *
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    };
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory;
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string;
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig;
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[];
  }
  export type GlobalOmitConfig = {
    tenant?: TenantOmit;
    user?: UserOmit;
    refreshToken?: RefreshTokenOmit;
    client?: ClientOmit;
    interaction?: InteractionOmit;
    segment?: SegmentOmit;
    notification?: NotificationOmit;
    auditLog?: AuditLogOmit;
  };

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error';
  export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
  };

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;

  export type GetEvents<T extends any[]> =
    T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
  /* End Types for Logging */

  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy';

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>;

  export type Datasource = {
    url?: string;
  };

  /**
   * Count Types
   */

  /**
   * Count Type TenantCountOutputType
   */

  export type TenantCountOutputType = {
    users: number;
    clients: number;
    interactions: number;
    segments: number;
    notifications: number;
    auditLogs: number;
  };

  export type TenantCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    users?: boolean | TenantCountOutputTypeCountUsersArgs;
    clients?: boolean | TenantCountOutputTypeCountClientsArgs;
    interactions?: boolean | TenantCountOutputTypeCountInteractionsArgs;
    segments?: boolean | TenantCountOutputTypeCountSegmentsArgs;
    notifications?: boolean | TenantCountOutputTypeCountNotificationsArgs;
    auditLogs?: boolean | TenantCountOutputTypeCountAuditLogsArgs;
  };

  // Custom InputTypes
  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the TenantCountOutputType
     */
    select?: TenantCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountUsersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: UserWhereInput;
  };

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountClientsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ClientWhereInput;
  };

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountInteractionsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: InteractionWhereInput;
  };

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountSegmentsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: SegmentWhereInput;
  };

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountNotificationsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: NotificationWhereInput;
  };

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountAuditLogsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: AuditLogWhereInput;
  };

  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    refreshTokens: number;
    assignedClients: number;
    interactions: number;
    notifications: number;
    auditLogs: number;
  };

  export type UserCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    refreshTokens?: boolean | UserCountOutputTypeCountRefreshTokensArgs;
    assignedClients?: boolean | UserCountOutputTypeCountAssignedClientsArgs;
    interactions?: boolean | UserCountOutputTypeCountInteractionsArgs;
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs;
    auditLogs?: boolean | UserCountOutputTypeCountAuditLogsArgs;
  };

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRefreshTokensArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: RefreshTokenWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAssignedClientsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ClientWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountInteractionsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: InteractionWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotificationsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: NotificationWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuditLogsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: AuditLogWhereInput;
  };

  /**
   * Count Type ClientCountOutputType
   */

  export type ClientCountOutputType = {
    interactions: number;
  };

  export type ClientCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    interactions?: boolean | ClientCountOutputTypeCountInteractionsArgs;
  };

  // Custom InputTypes
  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ClientCountOutputType
     */
    select?: ClientCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountInteractionsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: InteractionWhereInput;
  };

  /**
   * Models
   */

  /**
   * Model Tenant
   */

  export type AggregateTenant = {
    _count: TenantCountAggregateOutputType | null;
    _min: TenantMinAggregateOutputType | null;
    _max: TenantMaxAggregateOutputType | null;
  };

  export type TenantMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    slug: string | null;
    status: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type TenantMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    slug: string | null;
    status: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type TenantCountAggregateOutputType = {
    id: number;
    name: number;
    slug: number;
    status: number;
    settings: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type TenantMinAggregateInputType = {
    id?: true;
    name?: true;
    slug?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type TenantMaxAggregateInputType = {
    id?: true;
    name?: true;
    slug?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type TenantCountAggregateInputType = {
    id?: true;
    name?: true;
    slug?: true;
    status?: true;
    settings?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type TenantAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Tenant to aggregate.
     */
    where?: TenantWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: TenantWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Tenants.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Tenants
     **/
    _count?: true | TenantCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: TenantMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: TenantMaxAggregateInputType;
  };

  export type GetTenantAggregateType<T extends TenantAggregateArgs> = {
    [P in keyof T & keyof AggregateTenant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTenant[P]>
      : GetScalarType<T[P], AggregateTenant[P]>;
  };

  export type TenantGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: TenantWhereInput;
    orderBy?: TenantOrderByWithAggregationInput | TenantOrderByWithAggregationInput[];
    by: TenantScalarFieldEnum[] | TenantScalarFieldEnum;
    having?: TenantScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TenantCountAggregateInputType | true;
    _min?: TenantMinAggregateInputType;
    _max?: TenantMaxAggregateInputType;
  };

  export type TenantGroupByOutputType = {
    id: string;
    name: string;
    slug: string;
    status: string;
    settings: JsonValue | null;
    createdAt: Date;
    updatedAt: Date;
    _count: TenantCountAggregateOutputType | null;
    _min: TenantMinAggregateOutputType | null;
    _max: TenantMaxAggregateOutputType | null;
  };

  type GetTenantGroupByPayload<T extends TenantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TenantGroupByOutputType, T['by']> & {
        [P in keyof T & keyof TenantGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], TenantGroupByOutputType[P]>
          : GetScalarType<T[P], TenantGroupByOutputType[P]>;
      }
    >
  >;

  export type TenantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        name?: boolean;
        slug?: boolean;
        status?: boolean;
        settings?: boolean;
        createdAt?: boolean;
        updatedAt?: boolean;
        users?: boolean | Tenant$usersArgs<ExtArgs>;
        clients?: boolean | Tenant$clientsArgs<ExtArgs>;
        interactions?: boolean | Tenant$interactionsArgs<ExtArgs>;
        segments?: boolean | Tenant$segmentsArgs<ExtArgs>;
        notifications?: boolean | Tenant$notificationsArgs<ExtArgs>;
        auditLogs?: boolean | Tenant$auditLogsArgs<ExtArgs>;
        _count?: boolean | TenantCountOutputTypeDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['tenant']
    >;

  export type TenantSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      slug?: boolean;
      status?: boolean;
      settings?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['tenant']
  >;

  export type TenantSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      slug?: boolean;
      status?: boolean;
      settings?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['tenant']
  >;

  export type TenantSelectScalar = {
    id?: boolean;
    name?: boolean;
    slug?: boolean;
    status?: boolean;
    settings?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type TenantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetOmit<
      'id' | 'name' | 'slug' | 'status' | 'settings' | 'createdAt' | 'updatedAt',
      ExtArgs['result']['tenant']
    >;
  export type TenantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Tenant$usersArgs<ExtArgs>;
    clients?: boolean | Tenant$clientsArgs<ExtArgs>;
    interactions?: boolean | Tenant$interactionsArgs<ExtArgs>;
    segments?: boolean | Tenant$segmentsArgs<ExtArgs>;
    notifications?: boolean | Tenant$notificationsArgs<ExtArgs>;
    auditLogs?: boolean | Tenant$auditLogsArgs<ExtArgs>;
    _count?: boolean | TenantCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type TenantIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};
  export type TenantIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $TenantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: 'Tenant';
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[];
      clients: Prisma.$ClientPayload<ExtArgs>[];
      interactions: Prisma.$InteractionPayload<ExtArgs>[];
      segments: Prisma.$SegmentPayload<ExtArgs>[];
      notifications: Prisma.$NotificationPayload<ExtArgs>[];
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        name: string;
        slug: string;
        status: string;
        settings: Prisma.JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['tenant']
    >;
    composites: {};
  };

  type TenantGetPayload<S extends boolean | null | undefined | TenantDefaultArgs> =
    $Result.GetResult<Prisma.$TenantPayload, S>;

  type TenantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    TenantFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: TenantCountAggregateInputType | true;
  };

  export interface TenantDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tenant']; meta: { name: 'Tenant' } };
    /**
     * Find zero or one Tenant that matches the filter.
     * @param {TenantFindUniqueArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TenantFindUniqueArgs>(
      args: SelectSubset<T, TenantFindUniqueArgs<ExtArgs>>
    ): Prisma__TenantClient<
      $Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, 'findUnique', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Tenant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TenantFindUniqueOrThrowArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TenantFindUniqueOrThrowArgs>(
      args: SelectSubset<T, TenantFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__TenantClient<
      $Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Tenant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindFirstArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TenantFindFirstArgs>(
      args?: SelectSubset<T, TenantFindFirstArgs<ExtArgs>>
    ): Prisma__TenantClient<
      $Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, 'findFirst', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Tenant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindFirstOrThrowArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TenantFindFirstOrThrowArgs>(
      args?: SelectSubset<T, TenantFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__TenantClient<
      $Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, 'findFirstOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Tenants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tenants
     * const tenants = await prisma.tenant.findMany()
     *
     * // Get first 10 Tenants
     * const tenants = await prisma.tenant.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const tenantWithIdOnly = await prisma.tenant.findMany({ select: { id: true } })
     *
     */
    findMany<T extends TenantFindManyArgs>(
      args?: SelectSubset<T, TenantFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a Tenant.
     * @param {TenantCreateArgs} args - Arguments to create a Tenant.
     * @example
     * // Create one Tenant
     * const Tenant = await prisma.tenant.create({
     *   data: {
     *     // ... data to create a Tenant
     *   }
     * })
     *
     */
    create<T extends TenantCreateArgs>(
      args: SelectSubset<T, TenantCreateArgs<ExtArgs>>
    ): Prisma__TenantClient<
      $Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Tenants.
     * @param {TenantCreateManyArgs} args - Arguments to create many Tenants.
     * @example
     * // Create many Tenants
     * const tenant = await prisma.tenant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends TenantCreateManyArgs>(
      args?: SelectSubset<T, TenantCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Tenants and returns the data saved in the database.
     * @param {TenantCreateManyAndReturnArgs} args - Arguments to create many Tenants.
     * @example
     * // Create many Tenants
     * const tenant = await prisma.tenant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Tenants and only return the `id`
     * const tenantWithIdOnly = await prisma.tenant.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends TenantCreateManyAndReturnArgs>(
      args?: SelectSubset<T, TenantCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, 'createManyAndReturn', GlobalOmitOptions>
    >;

    /**
     * Delete a Tenant.
     * @param {TenantDeleteArgs} args - Arguments to delete one Tenant.
     * @example
     * // Delete one Tenant
     * const Tenant = await prisma.tenant.delete({
     *   where: {
     *     // ... filter to delete one Tenant
     *   }
     * })
     *
     */
    delete<T extends TenantDeleteArgs>(
      args: SelectSubset<T, TenantDeleteArgs<ExtArgs>>
    ): Prisma__TenantClient<
      $Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Tenant.
     * @param {TenantUpdateArgs} args - Arguments to update one Tenant.
     * @example
     * // Update one Tenant
     * const tenant = await prisma.tenant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends TenantUpdateArgs>(
      args: SelectSubset<T, TenantUpdateArgs<ExtArgs>>
    ): Prisma__TenantClient<
      $Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Tenants.
     * @param {TenantDeleteManyArgs} args - Arguments to filter Tenants to delete.
     * @example
     * // Delete a few Tenants
     * const { count } = await prisma.tenant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends TenantDeleteManyArgs>(
      args?: SelectSubset<T, TenantDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tenants
     * const tenant = await prisma.tenant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends TenantUpdateManyArgs>(
      args: SelectSubset<T, TenantUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Tenants and returns the data updated in the database.
     * @param {TenantUpdateManyAndReturnArgs} args - Arguments to update many Tenants.
     * @example
     * // Update many Tenants
     * const tenant = await prisma.tenant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Tenants and only return the `id`
     * const tenantWithIdOnly = await prisma.tenant.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends TenantUpdateManyAndReturnArgs>(
      args: SelectSubset<T, TenantUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, 'updateManyAndReturn', GlobalOmitOptions>
    >;

    /**
     * Create or update one Tenant.
     * @param {TenantUpsertArgs} args - Arguments to update or create a Tenant.
     * @example
     * // Update or create a Tenant
     * const tenant = await prisma.tenant.upsert({
     *   create: {
     *     // ... data to create a Tenant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tenant we want to update
     *   }
     * })
     */
    upsert<T extends TenantUpsertArgs>(
      args: SelectSubset<T, TenantUpsertArgs<ExtArgs>>
    ): Prisma__TenantClient<
      $Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantCountArgs} args - Arguments to filter Tenants to count.
     * @example
     * // Count the number of Tenants
     * const count = await prisma.tenant.count({
     *   where: {
     *     // ... the filter for the Tenants we want to count
     *   }
     * })
     **/
    count<T extends TenantCountArgs>(
      args?: Subset<T, TenantCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TenantCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Tenant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends TenantAggregateArgs>(
      args: Subset<T, TenantAggregateArgs>
    ): Prisma.PrismaPromise<GetTenantAggregateType<T>>;

    /**
     * Group by Tenant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends TenantGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TenantGroupByArgs['orderBy'] }
        : { orderBy?: TenantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, TenantGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors ? GetTenantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Tenant model
     */
    readonly fields: TenantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tenant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TenantClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    users<T extends Tenant$usersArgs<ExtArgs> = {}>(
      args?: Subset<T, Tenant$usersArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions> | Null
    >;
    clients<T extends Tenant$clientsArgs<ExtArgs> = {}>(
      args?: Subset<T, Tenant$clientsArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions> | Null
    >;
    interactions<T extends Tenant$interactionsArgs<ExtArgs> = {}>(
      args?: Subset<T, Tenant$interactionsArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | $Result.GetResult<Prisma.$InteractionPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
      | Null
    >;
    segments<T extends Tenant$segmentsArgs<ExtArgs> = {}>(
      args?: Subset<T, Tenant$segmentsArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$SegmentPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions> | Null
    >;
    notifications<T extends Tenant$notificationsArgs<ExtArgs> = {}>(
      args?: Subset<T, Tenant$notificationsArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | $Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
      | Null
    >;
    auditLogs<T extends Tenant$auditLogsArgs<ExtArgs> = {}>(
      args?: Subset<T, Tenant$auditLogsArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions> | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Tenant model
   */
  interface TenantFieldRefs {
    readonly id: FieldRef<'Tenant', 'String'>;
    readonly name: FieldRef<'Tenant', 'String'>;
    readonly slug: FieldRef<'Tenant', 'String'>;
    readonly status: FieldRef<'Tenant', 'String'>;
    readonly settings: FieldRef<'Tenant', 'Json'>;
    readonly createdAt: FieldRef<'Tenant', 'DateTime'>;
    readonly updatedAt: FieldRef<'Tenant', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Tenant findUnique
   */
  export type TenantFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null;
    /**
     * Filter, which Tenant to fetch.
     */
    where: TenantWhereUniqueInput;
  };

  /**
   * Tenant findUniqueOrThrow
   */
  export type TenantFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null;
    /**
     * Filter, which Tenant to fetch.
     */
    where: TenantWhereUniqueInput;
  };

  /**
   * Tenant findFirst
   */
  export type TenantFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null;
    /**
     * Filter, which Tenant to fetch.
     */
    where?: TenantWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Tenants.
     */
    cursor?: TenantWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Tenants.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Tenants.
     */
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[];
  };

  /**
   * Tenant findFirstOrThrow
   */
  export type TenantFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null;
    /**
     * Filter, which Tenant to fetch.
     */
    where?: TenantWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Tenants.
     */
    cursor?: TenantWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Tenants.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Tenants.
     */
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[];
  };

  /**
   * Tenant findMany
   */
  export type TenantFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null;
    /**
     * Filter, which Tenants to fetch.
     */
    where?: TenantWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Tenants.
     */
    cursor?: TenantWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Tenants.
     */
    skip?: number;
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[];
  };

  /**
   * Tenant create
   */
  export type TenantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Tenant
       */
      select?: TenantSelect<ExtArgs> | null;
      /**
       * Omit specific fields from the Tenant
       */
      omit?: TenantOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: TenantInclude<ExtArgs> | null;
      /**
       * The data needed to create a Tenant.
       */
      data: XOR<TenantCreateInput, TenantUncheckedCreateInput>;
    };

  /**
   * Tenant createMany
   */
  export type TenantCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Tenants.
     */
    data: TenantCreateManyInput | TenantCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Tenant createManyAndReturn
   */
  export type TenantCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null;
    /**
     * The data used to create many Tenants.
     */
    data: TenantCreateManyInput | TenantCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Tenant update
   */
  export type TenantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Tenant
       */
      select?: TenantSelect<ExtArgs> | null;
      /**
       * Omit specific fields from the Tenant
       */
      omit?: TenantOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: TenantInclude<ExtArgs> | null;
      /**
       * The data needed to update a Tenant.
       */
      data: XOR<TenantUpdateInput, TenantUncheckedUpdateInput>;
      /**
       * Choose, which Tenant to update.
       */
      where: TenantWhereUniqueInput;
    };

  /**
   * Tenant updateMany
   */
  export type TenantUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Tenants.
     */
    data: XOR<TenantUpdateManyMutationInput, TenantUncheckedUpdateManyInput>;
    /**
     * Filter which Tenants to update
     */
    where?: TenantWhereInput;
    /**
     * Limit how many Tenants to update.
     */
    limit?: number;
  };

  /**
   * Tenant updateManyAndReturn
   */
  export type TenantUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null;
    /**
     * The data used to update Tenants.
     */
    data: XOR<TenantUpdateManyMutationInput, TenantUncheckedUpdateManyInput>;
    /**
     * Filter which Tenants to update
     */
    where?: TenantWhereInput;
    /**
     * Limit how many Tenants to update.
     */
    limit?: number;
  };

  /**
   * Tenant upsert
   */
  export type TenantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Tenant
       */
      select?: TenantSelect<ExtArgs> | null;
      /**
       * Omit specific fields from the Tenant
       */
      omit?: TenantOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: TenantInclude<ExtArgs> | null;
      /**
       * The filter to search for the Tenant to update in case it exists.
       */
      where: TenantWhereUniqueInput;
      /**
       * In case the Tenant found by the `where` argument doesn't exist, create a new Tenant with this data.
       */
      create: XOR<TenantCreateInput, TenantUncheckedCreateInput>;
      /**
       * In case the Tenant was found with the provided `where` argument, update it with this data.
       */
      update: XOR<TenantUpdateInput, TenantUncheckedUpdateInput>;
    };

  /**
   * Tenant delete
   */
  export type TenantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Tenant
       */
      select?: TenantSelect<ExtArgs> | null;
      /**
       * Omit specific fields from the Tenant
       */
      omit?: TenantOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: TenantInclude<ExtArgs> | null;
      /**
       * Filter which Tenant to delete.
       */
      where: TenantWhereUniqueInput;
    };

  /**
   * Tenant deleteMany
   */
  export type TenantDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Tenants to delete
     */
    where?: TenantWhereInput;
    /**
     * Limit how many Tenants to delete.
     */
    limit?: number;
  };

  /**
   * Tenant.users
   */
  export type Tenant$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the User
       */
      select?: UserSelect<ExtArgs> | null;
      /**
       * Omit specific fields from the User
       */
      omit?: UserOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: UserInclude<ExtArgs> | null;
      where?: UserWhereInput;
      orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
      cursor?: UserWhereUniqueInput;
      take?: number;
      skip?: number;
      distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
    };

  /**
   * Tenant.clients
   */
  export type Tenant$clientsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null;
    where?: ClientWhereInput;
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[];
    cursor?: ClientWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[];
  };

  /**
   * Tenant.interactions
   */
  export type Tenant$interactionsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Interaction
     */
    select?: InteractionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Interaction
     */
    omit?: InteractionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InteractionInclude<ExtArgs> | null;
    where?: InteractionWhereInput;
    orderBy?: InteractionOrderByWithRelationInput | InteractionOrderByWithRelationInput[];
    cursor?: InteractionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: InteractionScalarFieldEnum | InteractionScalarFieldEnum[];
  };

  /**
   * Tenant.segments
   */
  export type Tenant$segmentsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Segment
     */
    select?: SegmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Segment
     */
    omit?: SegmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SegmentInclude<ExtArgs> | null;
    where?: SegmentWhereInput;
    orderBy?: SegmentOrderByWithRelationInput | SegmentOrderByWithRelationInput[];
    cursor?: SegmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: SegmentScalarFieldEnum | SegmentScalarFieldEnum[];
  };

  /**
   * Tenant.notifications
   */
  export type Tenant$notificationsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null;
    where?: NotificationWhereInput;
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[];
    cursor?: NotificationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[];
  };

  /**
   * Tenant.auditLogs
   */
  export type Tenant$auditLogsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null;
    where?: AuditLogWhereInput;
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[];
    cursor?: AuditLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[];
  };

  /**
   * Tenant without action
   */
  export type TenantDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null;
  };

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  export type UserMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    email: string | null;
    passwordHash: string | null;
    firstName: string | null;
    lastName: string | null;
    role: string | null;
    status: string | null;
    avatarUrl: string | null;
    lastLoginAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type UserMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    email: string | null;
    passwordHash: string | null;
    firstName: string | null;
    lastName: string | null;
    role: string | null;
    status: string | null;
    avatarUrl: string | null;
    lastLoginAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type UserCountAggregateOutputType = {
    id: number;
    tenantId: number;
    email: number;
    passwordHash: number;
    firstName: number;
    lastName: number;
    role: number;
    status: number;
    avatarUrl: number;
    lastLoginAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type UserMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    email?: true;
    passwordHash?: true;
    firstName?: true;
    lastName?: true;
    role?: true;
    status?: true;
    avatarUrl?: true;
    lastLoginAt?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type UserMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    email?: true;
    passwordHash?: true;
    firstName?: true;
    lastName?: true;
    role?: true;
    status?: true;
    avatarUrl?: true;
    lastLoginAt?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type UserCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    email?: true;
    passwordHash?: true;
    firstName?: true;
    lastName?: true;
    role?: true;
    status?: true;
    avatarUrl?: true;
    lastLoginAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type UserAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
     **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: UserMaxAggregateInputType;
  };

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>;
  };

  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      where?: UserWhereInput;
      orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[];
      by: UserScalarFieldEnum[] | UserScalarFieldEnum;
      having?: UserScalarWhereWithAggregatesInput;
      take?: number;
      skip?: number;
      _count?: UserCountAggregateInputType | true;
      _min?: UserMinAggregateInputType;
      _max?: UserMaxAggregateInputType;
    };

  export type UserGroupByOutputType = {
    id: string;
    tenantId: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    role: string;
    status: string;
    avatarUrl: string | null;
    lastLoginAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> & {
        [P in keyof T & keyof UserGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], UserGroupByOutputType[P]>
          : GetScalarType<T[P], UserGroupByOutputType[P]>;
      }
    >
  >;

  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        tenantId?: boolean;
        email?: boolean;
        passwordHash?: boolean;
        firstName?: boolean;
        lastName?: boolean;
        role?: boolean;
        status?: boolean;
        avatarUrl?: boolean;
        lastLoginAt?: boolean;
        createdAt?: boolean;
        updatedAt?: boolean;
        tenant?: boolean | TenantDefaultArgs<ExtArgs>;
        refreshTokens?: boolean | User$refreshTokensArgs<ExtArgs>;
        assignedClients?: boolean | User$assignedClientsArgs<ExtArgs>;
        interactions?: boolean | User$interactionsArgs<ExtArgs>;
        notifications?: boolean | User$notificationsArgs<ExtArgs>;
        auditLogs?: boolean | User$auditLogsArgs<ExtArgs>;
        _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['user']
    >;

  export type UserSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      tenantId?: boolean;
      email?: boolean;
      passwordHash?: boolean;
      firstName?: boolean;
      lastName?: boolean;
      role?: boolean;
      status?: boolean;
      avatarUrl?: boolean;
      lastLoginAt?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      tenant?: boolean | TenantDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['user']
  >;

  export type UserSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      tenantId?: boolean;
      email?: boolean;
      passwordHash?: boolean;
      firstName?: boolean;
      lastName?: boolean;
      role?: boolean;
      status?: boolean;
      avatarUrl?: boolean;
      lastLoginAt?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      tenant?: boolean | TenantDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['user']
  >;

  export type UserSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    email?: boolean;
    passwordHash?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    role?: boolean;
    status?: boolean;
    avatarUrl?: boolean;
    lastLoginAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetOmit<
      | 'id'
      | 'tenantId'
      | 'email'
      | 'passwordHash'
      | 'firstName'
      | 'lastName'
      | 'role'
      | 'status'
      | 'avatarUrl'
      | 'lastLoginAt'
      | 'createdAt'
      | 'updatedAt',
      ExtArgs['result']['user']
    >;
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>;
    refreshTokens?: boolean | User$refreshTokensArgs<ExtArgs>;
    assignedClients?: boolean | User$assignedClientsArgs<ExtArgs>;
    interactions?: boolean | User$interactionsArgs<ExtArgs>;
    notifications?: boolean | User$notificationsArgs<ExtArgs>;
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>;
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type UserIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>;
  };
  export type UserIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>;
  };

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: 'User';
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>;
      refreshTokens: Prisma.$RefreshTokenPayload<ExtArgs>[];
      assignedClients: Prisma.$ClientPayload<ExtArgs>[];
      interactions: Prisma.$InteractionPayload<ExtArgs>[];
      notifications: Prisma.$NotificationPayload<ExtArgs>[];
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        tenantId: string;
        email: string;
        passwordHash: string;
        firstName: string;
        lastName: string;
        role: string;
        status: string;
        avatarUrl: string | null;
        lastLoginAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['user']
    >;
    composites: {};
  };

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<
    Prisma.$UserPayload,
    S
  >;

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    UserFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: UserCountAggregateInputType | true;
  };

  export interface UserDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User']; meta: { name: 'User' } };
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUnique', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirst', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirstOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     */
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(
      args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'createManyAndReturn', GlobalOmitOptions>
    >;

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     */
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(
      args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'updateManyAndReturn', GlobalOmitOptions>
    >;

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
     **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends UserAggregateArgs>(
      args: Subset<T, UserAggregateArgs>
    ): Prisma.PrismaPromise<GetUserAggregateType<T>>;

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the User model
     */
    readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, TenantDefaultArgs<ExtArgs>>
    ): Prisma__TenantClient<
      | $Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    refreshTokens<T extends User$refreshTokensArgs<ExtArgs> = {}>(
      args?: Subset<T, User$refreshTokensArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | $Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
      | Null
    >;
    assignedClients<T extends User$assignedClientsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$assignedClientsArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions> | Null
    >;
    interactions<T extends User$interactionsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$interactionsArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | $Result.GetResult<Prisma.$InteractionPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
      | Null
    >;
    notifications<T extends User$notificationsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$notificationsArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | $Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
      | Null
    >;
    auditLogs<T extends User$auditLogsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$auditLogsArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions> | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<'User', 'String'>;
    readonly tenantId: FieldRef<'User', 'String'>;
    readonly email: FieldRef<'User', 'String'>;
    readonly passwordHash: FieldRef<'User', 'String'>;
    readonly firstName: FieldRef<'User', 'String'>;
    readonly lastName: FieldRef<'User', 'String'>;
    readonly role: FieldRef<'User', 'String'>;
    readonly status: FieldRef<'User', 'String'>;
    readonly avatarUrl: FieldRef<'User', 'String'>;
    readonly lastLoginAt: FieldRef<'User', 'DateTime'>;
    readonly createdAt: FieldRef<'User', 'DateTime'>;
    readonly updatedAt: FieldRef<'User', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the User
       */
      select?: UserSelect<ExtArgs> | null;
      /**
       * Omit specific fields from the User
       */
      omit?: UserOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: UserInclude<ExtArgs> | null;
      /**
       * Filter, which Users to fetch.
       */
      where?: UserWhereInput;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
       *
       * Determine the order of Users to fetch.
       */
      orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
       *
       * Sets the position for listing Users.
       */
      cursor?: UserWhereUniqueInput;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Take `±n` Users from the position of the cursor.
       */
      take?: number;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Skip the first `n` Users.
       */
      skip?: number;
      distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
    };

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>;
  };

  /**
   * User createMany
   */
  export type UserCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
  };

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
  };

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to delete.
     */
    limit?: number;
  };

  /**
   * User.refreshTokens
   */
  export type User$refreshTokensArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null;
    where?: RefreshTokenWhereInput;
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[];
    cursor?: RefreshTokenWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[];
  };

  /**
   * User.assignedClients
   */
  export type User$assignedClientsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null;
    where?: ClientWhereInput;
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[];
    cursor?: ClientWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[];
  };

  /**
   * User.interactions
   */
  export type User$interactionsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Interaction
     */
    select?: InteractionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Interaction
     */
    omit?: InteractionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InteractionInclude<ExtArgs> | null;
    where?: InteractionWhereInput;
    orderBy?: InteractionOrderByWithRelationInput | InteractionOrderByWithRelationInput[];
    cursor?: InteractionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: InteractionScalarFieldEnum | InteractionScalarFieldEnum[];
  };

  /**
   * User.notifications
   */
  export type User$notificationsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null;
    where?: NotificationWhereInput;
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[];
    cursor?: NotificationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[];
  };

  /**
   * User.auditLogs
   */
  export type User$auditLogsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null;
    where?: AuditLogWhereInput;
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[];
    cursor?: AuditLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[];
  };

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the User
       */
      select?: UserSelect<ExtArgs> | null;
      /**
       * Omit specific fields from the User
       */
      omit?: UserOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: UserInclude<ExtArgs> | null;
    };

  /**
   * Model RefreshToken
   */

  export type AggregateRefreshToken = {
    _count: RefreshTokenCountAggregateOutputType | null;
    _min: RefreshTokenMinAggregateOutputType | null;
    _max: RefreshTokenMaxAggregateOutputType | null;
  };

  export type RefreshTokenMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    tokenHash: string | null;
    expiresAt: Date | null;
    createdAt: Date | null;
    revokedAt: Date | null;
  };

  export type RefreshTokenMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    tokenHash: string | null;
    expiresAt: Date | null;
    createdAt: Date | null;
    revokedAt: Date | null;
  };

  export type RefreshTokenCountAggregateOutputType = {
    id: number;
    userId: number;
    tokenHash: number;
    expiresAt: number;
    createdAt: number;
    revokedAt: number;
    _all: number;
  };

  export type RefreshTokenMinAggregateInputType = {
    id?: true;
    userId?: true;
    tokenHash?: true;
    expiresAt?: true;
    createdAt?: true;
    revokedAt?: true;
  };

  export type RefreshTokenMaxAggregateInputType = {
    id?: true;
    userId?: true;
    tokenHash?: true;
    expiresAt?: true;
    createdAt?: true;
    revokedAt?: true;
  };

  export type RefreshTokenCountAggregateInputType = {
    id?: true;
    userId?: true;
    tokenHash?: true;
    expiresAt?: true;
    createdAt?: true;
    revokedAt?: true;
    _all?: true;
  };

  export type RefreshTokenAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which RefreshToken to aggregate.
     */
    where?: RefreshTokenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: RefreshTokenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RefreshTokens.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned RefreshTokens
     **/
    _count?: true | RefreshTokenCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: RefreshTokenMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: RefreshTokenMaxAggregateInputType;
  };

  export type GetRefreshTokenAggregateType<T extends RefreshTokenAggregateArgs> = {
    [P in keyof T & keyof AggregateRefreshToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefreshToken[P]>
      : GetScalarType<T[P], AggregateRefreshToken[P]>;
  };

  export type RefreshTokenGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: RefreshTokenWhereInput;
    orderBy?: RefreshTokenOrderByWithAggregationInput | RefreshTokenOrderByWithAggregationInput[];
    by: RefreshTokenScalarFieldEnum[] | RefreshTokenScalarFieldEnum;
    having?: RefreshTokenScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RefreshTokenCountAggregateInputType | true;
    _min?: RefreshTokenMinAggregateInputType;
    _max?: RefreshTokenMaxAggregateInputType;
  };

  export type RefreshTokenGroupByOutputType = {
    id: string;
    userId: string;
    tokenHash: string;
    expiresAt: Date;
    createdAt: Date;
    revokedAt: Date | null;
    _count: RefreshTokenCountAggregateOutputType | null;
    _min: RefreshTokenMinAggregateOutputType | null;
    _max: RefreshTokenMaxAggregateOutputType | null;
  };

  type GetRefreshTokenGroupByPayload<T extends RefreshTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RefreshTokenGroupByOutputType, T['by']> & {
        [P in keyof T & keyof RefreshTokenGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
          : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>;
      }
    >
  >;

  export type RefreshTokenSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      tokenHash?: boolean;
      expiresAt?: boolean;
      createdAt?: boolean;
      revokedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['refreshToken']
  >;

  export type RefreshTokenSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      tokenHash?: boolean;
      expiresAt?: boolean;
      createdAt?: boolean;
      revokedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['refreshToken']
  >;

  export type RefreshTokenSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      tokenHash?: boolean;
      expiresAt?: boolean;
      createdAt?: boolean;
      revokedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['refreshToken']
  >;

  export type RefreshTokenSelectScalar = {
    id?: boolean;
    userId?: boolean;
    tokenHash?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
    revokedAt?: boolean;
  };

  export type RefreshTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetOmit<
      'id' | 'userId' | 'tokenHash' | 'expiresAt' | 'createdAt' | 'revokedAt',
      ExtArgs['result']['refreshToken']
    >;
  export type RefreshTokenInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type RefreshTokenIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type RefreshTokenIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $RefreshTokenPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'RefreshToken';
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        userId: string;
        tokenHash: string;
        expiresAt: Date;
        createdAt: Date;
        revokedAt: Date | null;
      },
      ExtArgs['result']['refreshToken']
    >;
    composites: {};
  };

  type RefreshTokenGetPayload<S extends boolean | null | undefined | RefreshTokenDefaultArgs> =
    $Result.GetResult<Prisma.$RefreshTokenPayload, S>;

  type RefreshTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RefreshTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RefreshTokenCountAggregateInputType | true;
    };

  export interface RefreshTokenDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['RefreshToken'];
      meta: { name: 'RefreshToken' };
    };
    /**
     * Find zero or one RefreshToken that matches the filter.
     * @param {RefreshTokenFindUniqueArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RefreshTokenFindUniqueArgs>(
      args: SelectSubset<T, RefreshTokenFindUniqueArgs<ExtArgs>>
    ): Prisma__RefreshTokenClient<
      $Result.GetResult<
        Prisma.$RefreshTokenPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one RefreshToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RefreshTokenFindUniqueOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RefreshTokenFindUniqueOrThrowArgs>(
      args: SelectSubset<T, RefreshTokenFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__RefreshTokenClient<
      $Result.GetResult<
        Prisma.$RefreshTokenPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first RefreshToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RefreshTokenFindFirstArgs>(
      args?: SelectSubset<T, RefreshTokenFindFirstArgs<ExtArgs>>
    ): Prisma__RefreshTokenClient<
      $Result.GetResult<
        Prisma.$RefreshTokenPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first RefreshToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RefreshTokenFindFirstOrThrowArgs>(
      args?: SelectSubset<T, RefreshTokenFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__RefreshTokenClient<
      $Result.GetResult<
        Prisma.$RefreshTokenPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more RefreshTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany()
     *
     * // Get first 10 RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.findMany({ select: { id: true } })
     *
     */
    findMany<T extends RefreshTokenFindManyArgs>(
      args?: SelectSubset<T, RefreshTokenFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a RefreshToken.
     * @param {RefreshTokenCreateArgs} args - Arguments to create a RefreshToken.
     * @example
     * // Create one RefreshToken
     * const RefreshToken = await prisma.refreshToken.create({
     *   data: {
     *     // ... data to create a RefreshToken
     *   }
     * })
     *
     */
    create<T extends RefreshTokenCreateArgs>(
      args: SelectSubset<T, RefreshTokenCreateArgs<ExtArgs>>
    ): Prisma__RefreshTokenClient<
      $Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many RefreshTokens.
     * @param {RefreshTokenCreateManyArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends RefreshTokenCreateManyArgs>(
      args?: SelectSubset<T, RefreshTokenCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many RefreshTokens and returns the data saved in the database.
     * @param {RefreshTokenCreateManyAndReturnArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends RefreshTokenCreateManyAndReturnArgs>(
      args?: SelectSubset<T, RefreshTokenCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$RefreshTokenPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a RefreshToken.
     * @param {RefreshTokenDeleteArgs} args - Arguments to delete one RefreshToken.
     * @example
     * // Delete one RefreshToken
     * const RefreshToken = await prisma.refreshToken.delete({
     *   where: {
     *     // ... filter to delete one RefreshToken
     *   }
     * })
     *
     */
    delete<T extends RefreshTokenDeleteArgs>(
      args: SelectSubset<T, RefreshTokenDeleteArgs<ExtArgs>>
    ): Prisma__RefreshTokenClient<
      $Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one RefreshToken.
     * @param {RefreshTokenUpdateArgs} args - Arguments to update one RefreshToken.
     * @example
     * // Update one RefreshToken
     * const refreshToken = await prisma.refreshToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends RefreshTokenUpdateArgs>(
      args: SelectSubset<T, RefreshTokenUpdateArgs<ExtArgs>>
    ): Prisma__RefreshTokenClient<
      $Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more RefreshTokens.
     * @param {RefreshTokenDeleteManyArgs} args - Arguments to filter RefreshTokens to delete.
     * @example
     * // Delete a few RefreshTokens
     * const { count } = await prisma.refreshToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends RefreshTokenDeleteManyArgs>(
      args?: SelectSubset<T, RefreshTokenDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends RefreshTokenUpdateManyArgs>(
      args: SelectSubset<T, RefreshTokenUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more RefreshTokens and returns the data updated in the database.
     * @param {RefreshTokenUpdateManyAndReturnArgs} args - Arguments to update many RefreshTokens.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends RefreshTokenUpdateManyAndReturnArgs>(
      args: SelectSubset<T, RefreshTokenUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$RefreshTokenPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one RefreshToken.
     * @param {RefreshTokenUpsertArgs} args - Arguments to update or create a RefreshToken.
     * @example
     * // Update or create a RefreshToken
     * const refreshToken = await prisma.refreshToken.upsert({
     *   create: {
     *     // ... data to create a RefreshToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RefreshToken we want to update
     *   }
     * })
     */
    upsert<T extends RefreshTokenUpsertArgs>(
      args: SelectSubset<T, RefreshTokenUpsertArgs<ExtArgs>>
    ): Prisma__RefreshTokenClient<
      $Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenCountArgs} args - Arguments to filter RefreshTokens to count.
     * @example
     * // Count the number of RefreshTokens
     * const count = await prisma.refreshToken.count({
     *   where: {
     *     // ... the filter for the RefreshTokens we want to count
     *   }
     * })
     **/
    count<T extends RefreshTokenCountArgs>(
      args?: Subset<T, RefreshTokenCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RefreshTokenCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends RefreshTokenAggregateArgs>(
      args: Subset<T, RefreshTokenAggregateArgs>
    ): Prisma.PrismaPromise<GetRefreshTokenAggregateType<T>>;

    /**
     * Group by RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends RefreshTokenGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RefreshTokenGroupByArgs['orderBy'] }
        : { orderBy?: RefreshTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, RefreshTokenGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetRefreshTokenGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the RefreshToken model
     */
    readonly fields: RefreshTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RefreshToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RefreshTokenClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>
    ): Prisma__UserClient<
      | $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the RefreshToken model
   */
  interface RefreshTokenFieldRefs {
    readonly id: FieldRef<'RefreshToken', 'String'>;
    readonly userId: FieldRef<'RefreshToken', 'String'>;
    readonly tokenHash: FieldRef<'RefreshToken', 'String'>;
    readonly expiresAt: FieldRef<'RefreshToken', 'DateTime'>;
    readonly createdAt: FieldRef<'RefreshToken', 'DateTime'>;
    readonly revokedAt: FieldRef<'RefreshToken', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * RefreshToken findUnique
   */
  export type RefreshTokenFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null;
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput;
  };

  /**
   * RefreshToken findUniqueOrThrow
   */
  export type RefreshTokenFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null;
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput;
  };

  /**
   * RefreshToken findFirst
   */
  export type RefreshTokenFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null;
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RefreshTokens.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[];
  };

  /**
   * RefreshToken findFirstOrThrow
   */
  export type RefreshTokenFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null;
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RefreshTokens.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[];
  };

  /**
   * RefreshToken findMany
   */
  export type RefreshTokenFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null;
    /**
     * Filter, which RefreshTokens to fetch.
     */
    where?: RefreshTokenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RefreshTokens.
     */
    skip?: number;
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[];
  };

  /**
   * RefreshToken create
   */
  export type RefreshTokenCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null;
    /**
     * The data needed to create a RefreshToken.
     */
    data: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>;
  };

  /**
   * RefreshToken createMany
   */
  export type RefreshTokenCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * RefreshToken createManyAndReturn
   */
  export type RefreshTokenCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null;
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * RefreshToken update
   */
  export type RefreshTokenUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null;
    /**
     * The data needed to update a RefreshToken.
     */
    data: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>;
    /**
     * Choose, which RefreshToken to update.
     */
    where: RefreshTokenWhereUniqueInput;
  };

  /**
   * RefreshToken updateMany
   */
  export type RefreshTokenUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>;
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput;
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number;
  };

  /**
   * RefreshToken updateManyAndReturn
   */
  export type RefreshTokenUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null;
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>;
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput;
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * RefreshToken upsert
   */
  export type RefreshTokenUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null;
    /**
     * The filter to search for the RefreshToken to update in case it exists.
     */
    where: RefreshTokenWhereUniqueInput;
    /**
     * In case the RefreshToken found by the `where` argument doesn't exist, create a new RefreshToken with this data.
     */
    create: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>;
    /**
     * In case the RefreshToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>;
  };

  /**
   * RefreshToken delete
   */
  export type RefreshTokenDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null;
    /**
     * Filter which RefreshToken to delete.
     */
    where: RefreshTokenWhereUniqueInput;
  };

  /**
   * RefreshToken deleteMany
   */
  export type RefreshTokenDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which RefreshTokens to delete
     */
    where?: RefreshTokenWhereInput;
    /**
     * Limit how many RefreshTokens to delete.
     */
    limit?: number;
  };

  /**
   * RefreshToken without action
   */
  export type RefreshTokenDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null;
  };

  /**
   * Model Client
   */

  export type AggregateClient = {
    _count: ClientCountAggregateOutputType | null;
    _min: ClientMinAggregateOutputType | null;
    _max: ClientMaxAggregateOutputType | null;
  };

  export type ClientMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    assignedToId: string | null;
    companyName: string | null;
    contactName: string | null;
    email: string | null;
    phone: string | null;
    status: string | null;
    segment: string | null;
    address: string | null;
    notes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ClientMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    assignedToId: string | null;
    companyName: string | null;
    contactName: string | null;
    email: string | null;
    phone: string | null;
    status: string | null;
    segment: string | null;
    address: string | null;
    notes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ClientCountAggregateOutputType = {
    id: number;
    tenantId: number;
    assignedToId: number;
    companyName: number;
    contactName: number;
    email: number;
    phone: number;
    status: number;
    segment: number;
    tags: number;
    customFields: number;
    address: number;
    notes: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type ClientMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    assignedToId?: true;
    companyName?: true;
    contactName?: true;
    email?: true;
    phone?: true;
    status?: true;
    segment?: true;
    address?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ClientMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    assignedToId?: true;
    companyName?: true;
    contactName?: true;
    email?: true;
    phone?: true;
    status?: true;
    segment?: true;
    address?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ClientCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    assignedToId?: true;
    companyName?: true;
    contactName?: true;
    email?: true;
    phone?: true;
    status?: true;
    segment?: true;
    tags?: true;
    customFields?: true;
    address?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type ClientAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Client to aggregate.
     */
    where?: ClientWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ClientWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Clients.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Clients
     **/
    _count?: true | ClientCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ClientMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ClientMaxAggregateInputType;
  };

  export type GetClientAggregateType<T extends ClientAggregateArgs> = {
    [P in keyof T & keyof AggregateClient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClient[P]>
      : GetScalarType<T[P], AggregateClient[P]>;
  };

  export type ClientGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ClientWhereInput;
    orderBy?: ClientOrderByWithAggregationInput | ClientOrderByWithAggregationInput[];
    by: ClientScalarFieldEnum[] | ClientScalarFieldEnum;
    having?: ClientScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ClientCountAggregateInputType | true;
    _min?: ClientMinAggregateInputType;
    _max?: ClientMaxAggregateInputType;
  };

  export type ClientGroupByOutputType = {
    id: string;
    tenantId: string;
    assignedToId: string | null;
    companyName: string;
    contactName: string;
    email: string | null;
    phone: string | null;
    status: string;
    segment: string | null;
    tags: JsonValue | null;
    customFields: JsonValue | null;
    address: string | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: ClientCountAggregateOutputType | null;
    _min: ClientMinAggregateOutputType | null;
    _max: ClientMaxAggregateOutputType | null;
  };

  type GetClientGroupByPayload<T extends ClientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClientGroupByOutputType, T['by']> & {
        [P in keyof T & keyof ClientGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], ClientGroupByOutputType[P]>
          : GetScalarType<T[P], ClientGroupByOutputType[P]>;
      }
    >
  >;

  export type ClientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        tenantId?: boolean;
        assignedToId?: boolean;
        companyName?: boolean;
        contactName?: boolean;
        email?: boolean;
        phone?: boolean;
        status?: boolean;
        segment?: boolean;
        tags?: boolean;
        customFields?: boolean;
        address?: boolean;
        notes?: boolean;
        createdAt?: boolean;
        updatedAt?: boolean;
        tenant?: boolean | TenantDefaultArgs<ExtArgs>;
        assignedTo?: boolean | Client$assignedToArgs<ExtArgs>;
        interactions?: boolean | Client$interactionsArgs<ExtArgs>;
        _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['client']
    >;

  export type ClientSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      tenantId?: boolean;
      assignedToId?: boolean;
      companyName?: boolean;
      contactName?: boolean;
      email?: boolean;
      phone?: boolean;
      status?: boolean;
      segment?: boolean;
      tags?: boolean;
      customFields?: boolean;
      address?: boolean;
      notes?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      tenant?: boolean | TenantDefaultArgs<ExtArgs>;
      assignedTo?: boolean | Client$assignedToArgs<ExtArgs>;
    },
    ExtArgs['result']['client']
  >;

  export type ClientSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      tenantId?: boolean;
      assignedToId?: boolean;
      companyName?: boolean;
      contactName?: boolean;
      email?: boolean;
      phone?: boolean;
      status?: boolean;
      segment?: boolean;
      tags?: boolean;
      customFields?: boolean;
      address?: boolean;
      notes?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      tenant?: boolean | TenantDefaultArgs<ExtArgs>;
      assignedTo?: boolean | Client$assignedToArgs<ExtArgs>;
    },
    ExtArgs['result']['client']
  >;

  export type ClientSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    assignedToId?: boolean;
    companyName?: boolean;
    contactName?: boolean;
    email?: boolean;
    phone?: boolean;
    status?: boolean;
    segment?: boolean;
    tags?: boolean;
    customFields?: boolean;
    address?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type ClientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetOmit<
      | 'id'
      | 'tenantId'
      | 'assignedToId'
      | 'companyName'
      | 'contactName'
      | 'email'
      | 'phone'
      | 'status'
      | 'segment'
      | 'tags'
      | 'customFields'
      | 'address'
      | 'notes'
      | 'createdAt'
      | 'updatedAt',
      ExtArgs['result']['client']
    >;
  export type ClientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>;
    assignedTo?: boolean | Client$assignedToArgs<ExtArgs>;
    interactions?: boolean | Client$interactionsArgs<ExtArgs>;
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type ClientIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>;
    assignedTo?: boolean | Client$assignedToArgs<ExtArgs>;
  };
  export type ClientIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>;
    assignedTo?: boolean | Client$assignedToArgs<ExtArgs>;
  };

  export type $ClientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: 'Client';
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>;
      assignedTo: Prisma.$UserPayload<ExtArgs> | null;
      interactions: Prisma.$InteractionPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        tenantId: string;
        assignedToId: string | null;
        companyName: string;
        contactName: string;
        email: string | null;
        phone: string | null;
        status: string;
        segment: string | null;
        tags: Prisma.JsonValue | null;
        customFields: Prisma.JsonValue | null;
        address: string | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['client']
    >;
    composites: {};
  };

  type ClientGetPayload<S extends boolean | null | undefined | ClientDefaultArgs> =
    $Result.GetResult<Prisma.$ClientPayload, S>;

  type ClientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    ClientFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: ClientCountAggregateInputType | true;
  };

  export interface ClientDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Client']; meta: { name: 'Client' } };
    /**
     * Find zero or one Client that matches the filter.
     * @param {ClientFindUniqueArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClientFindUniqueArgs>(
      args: SelectSubset<T, ClientFindUniqueArgs<ExtArgs>>
    ): Prisma__ClientClient<
      $Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, 'findUnique', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Client that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClientFindUniqueOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClientFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ClientFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ClientClient<
      $Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Client that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClientFindFirstArgs>(
      args?: SelectSubset<T, ClientFindFirstArgs<ExtArgs>>
    ): Prisma__ClientClient<
      $Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, 'findFirst', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Client that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClientFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ClientFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ClientClient<
      $Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, 'findFirstOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Clients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clients
     * const clients = await prisma.client.findMany()
     *
     * // Get first 10 Clients
     * const clients = await prisma.client.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const clientWithIdOnly = await prisma.client.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ClientFindManyArgs>(
      args?: SelectSubset<T, ClientFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a Client.
     * @param {ClientCreateArgs} args - Arguments to create a Client.
     * @example
     * // Create one Client
     * const Client = await prisma.client.create({
     *   data: {
     *     // ... data to create a Client
     *   }
     * })
     *
     */
    create<T extends ClientCreateArgs>(
      args: SelectSubset<T, ClientCreateArgs<ExtArgs>>
    ): Prisma__ClientClient<
      $Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Clients.
     * @param {ClientCreateManyArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ClientCreateManyArgs>(
      args?: SelectSubset<T, ClientCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Clients and returns the data saved in the database.
     * @param {ClientCreateManyAndReturnArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Clients and only return the `id`
     * const clientWithIdOnly = await prisma.client.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ClientCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ClientCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, 'createManyAndReturn', GlobalOmitOptions>
    >;

    /**
     * Delete a Client.
     * @param {ClientDeleteArgs} args - Arguments to delete one Client.
     * @example
     * // Delete one Client
     * const Client = await prisma.client.delete({
     *   where: {
     *     // ... filter to delete one Client
     *   }
     * })
     *
     */
    delete<T extends ClientDeleteArgs>(
      args: SelectSubset<T, ClientDeleteArgs<ExtArgs>>
    ): Prisma__ClientClient<
      $Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Client.
     * @param {ClientUpdateArgs} args - Arguments to update one Client.
     * @example
     * // Update one Client
     * const client = await prisma.client.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ClientUpdateArgs>(
      args: SelectSubset<T, ClientUpdateArgs<ExtArgs>>
    ): Prisma__ClientClient<
      $Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Clients.
     * @param {ClientDeleteManyArgs} args - Arguments to filter Clients to delete.
     * @example
     * // Delete a few Clients
     * const { count } = await prisma.client.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ClientDeleteManyArgs>(
      args?: SelectSubset<T, ClientDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ClientUpdateManyArgs>(
      args: SelectSubset<T, ClientUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Clients and returns the data updated in the database.
     * @param {ClientUpdateManyAndReturnArgs} args - Arguments to update many Clients.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Clients and only return the `id`
     * const clientWithIdOnly = await prisma.client.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends ClientUpdateManyAndReturnArgs>(
      args: SelectSubset<T, ClientUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, 'updateManyAndReturn', GlobalOmitOptions>
    >;

    /**
     * Create or update one Client.
     * @param {ClientUpsertArgs} args - Arguments to update or create a Client.
     * @example
     * // Update or create a Client
     * const client = await prisma.client.upsert({
     *   create: {
     *     // ... data to create a Client
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Client we want to update
     *   }
     * })
     */
    upsert<T extends ClientUpsertArgs>(
      args: SelectSubset<T, ClientUpsertArgs<ExtArgs>>
    ): Prisma__ClientClient<
      $Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientCountArgs} args - Arguments to filter Clients to count.
     * @example
     * // Count the number of Clients
     * const count = await prisma.client.count({
     *   where: {
     *     // ... the filter for the Clients we want to count
     *   }
     * })
     **/
    count<T extends ClientCountArgs>(
      args?: Subset<T, ClientCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClientCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ClientAggregateArgs>(
      args: Subset<T, ClientAggregateArgs>
    ): Prisma.PrismaPromise<GetClientAggregateType<T>>;

    /**
     * Group by Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ClientGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClientGroupByArgs['orderBy'] }
        : { orderBy?: ClientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, ClientGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors ? GetClientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Client model
     */
    readonly fields: ClientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Client.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClientClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, TenantDefaultArgs<ExtArgs>>
    ): Prisma__TenantClient<
      | $Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    assignedTo<T extends Client$assignedToArgs<ExtArgs> = {}>(
      args?: Subset<T, Client$assignedToArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;
    interactions<T extends Client$interactionsArgs<ExtArgs> = {}>(
      args?: Subset<T, Client$interactionsArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | $Result.GetResult<Prisma.$InteractionPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Client model
   */
  interface ClientFieldRefs {
    readonly id: FieldRef<'Client', 'String'>;
    readonly tenantId: FieldRef<'Client', 'String'>;
    readonly assignedToId: FieldRef<'Client', 'String'>;
    readonly companyName: FieldRef<'Client', 'String'>;
    readonly contactName: FieldRef<'Client', 'String'>;
    readonly email: FieldRef<'Client', 'String'>;
    readonly phone: FieldRef<'Client', 'String'>;
    readonly status: FieldRef<'Client', 'String'>;
    readonly segment: FieldRef<'Client', 'String'>;
    readonly tags: FieldRef<'Client', 'Json'>;
    readonly customFields: FieldRef<'Client', 'Json'>;
    readonly address: FieldRef<'Client', 'String'>;
    readonly notes: FieldRef<'Client', 'String'>;
    readonly createdAt: FieldRef<'Client', 'DateTime'>;
    readonly updatedAt: FieldRef<'Client', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Client findUnique
   */
  export type ClientFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null;
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput;
  };

  /**
   * Client findUniqueOrThrow
   */
  export type ClientFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null;
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput;
  };

  /**
   * Client findFirst
   */
  export type ClientFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null;
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Clients.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[];
  };

  /**
   * Client findFirstOrThrow
   */
  export type ClientFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null;
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Clients.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[];
  };

  /**
   * Client findMany
   */
  export type ClientFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null;
    /**
     * Filter, which Clients to fetch.
     */
    where?: ClientWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Clients.
     */
    cursor?: ClientWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Clients.
     */
    skip?: number;
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[];
  };

  /**
   * Client create
   */
  export type ClientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Client
       */
      select?: ClientSelect<ExtArgs> | null;
      /**
       * Omit specific fields from the Client
       */
      omit?: ClientOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: ClientInclude<ExtArgs> | null;
      /**
       * The data needed to create a Client.
       */
      data: XOR<ClientCreateInput, ClientUncheckedCreateInput>;
    };

  /**
   * Client createMany
   */
  export type ClientCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Client createManyAndReturn
   */
  export type ClientCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null;
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Client update
   */
  export type ClientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Client
       */
      select?: ClientSelect<ExtArgs> | null;
      /**
       * Omit specific fields from the Client
       */
      omit?: ClientOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: ClientInclude<ExtArgs> | null;
      /**
       * The data needed to update a Client.
       */
      data: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>;
      /**
       * Choose, which Client to update.
       */
      where: ClientWhereUniqueInput;
    };

  /**
   * Client updateMany
   */
  export type ClientUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>;
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput;
    /**
     * Limit how many Clients to update.
     */
    limit?: number;
  };

  /**
   * Client updateManyAndReturn
   */
  export type ClientUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null;
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>;
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput;
    /**
     * Limit how many Clients to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Client upsert
   */
  export type ClientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Client
       */
      select?: ClientSelect<ExtArgs> | null;
      /**
       * Omit specific fields from the Client
       */
      omit?: ClientOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: ClientInclude<ExtArgs> | null;
      /**
       * The filter to search for the Client to update in case it exists.
       */
      where: ClientWhereUniqueInput;
      /**
       * In case the Client found by the `where` argument doesn't exist, create a new Client with this data.
       */
      create: XOR<ClientCreateInput, ClientUncheckedCreateInput>;
      /**
       * In case the Client was found with the provided `where` argument, update it with this data.
       */
      update: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>;
    };

  /**
   * Client delete
   */
  export type ClientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Client
       */
      select?: ClientSelect<ExtArgs> | null;
      /**
       * Omit specific fields from the Client
       */
      omit?: ClientOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: ClientInclude<ExtArgs> | null;
      /**
       * Filter which Client to delete.
       */
      where: ClientWhereUniqueInput;
    };

  /**
   * Client deleteMany
   */
  export type ClientDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Clients to delete
     */
    where?: ClientWhereInput;
    /**
     * Limit how many Clients to delete.
     */
    limit?: number;
  };

  /**
   * Client.assignedTo
   */
  export type Client$assignedToArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    where?: UserWhereInput;
  };

  /**
   * Client.interactions
   */
  export type Client$interactionsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Interaction
     */
    select?: InteractionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Interaction
     */
    omit?: InteractionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InteractionInclude<ExtArgs> | null;
    where?: InteractionWhereInput;
    orderBy?: InteractionOrderByWithRelationInput | InteractionOrderByWithRelationInput[];
    cursor?: InteractionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: InteractionScalarFieldEnum | InteractionScalarFieldEnum[];
  };

  /**
   * Client without action
   */
  export type ClientDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null;
  };

  /**
   * Model Interaction
   */

  export type AggregateInteraction = {
    _count: InteractionCountAggregateOutputType | null;
    _min: InteractionMinAggregateOutputType | null;
    _max: InteractionMaxAggregateOutputType | null;
  };

  export type InteractionMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    clientId: string | null;
    userId: string | null;
    type: string | null;
    notes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type InteractionMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    clientId: string | null;
    userId: string | null;
    type: string | null;
    notes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type InteractionCountAggregateOutputType = {
    id: number;
    tenantId: number;
    clientId: number;
    userId: number;
    type: number;
    notes: number;
    metadata: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type InteractionMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    clientId?: true;
    userId?: true;
    type?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type InteractionMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    clientId?: true;
    userId?: true;
    type?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type InteractionCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    clientId?: true;
    userId?: true;
    type?: true;
    notes?: true;
    metadata?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type InteractionAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Interaction to aggregate.
     */
    where?: InteractionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Interactions to fetch.
     */
    orderBy?: InteractionOrderByWithRelationInput | InteractionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: InteractionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Interactions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Interactions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Interactions
     **/
    _count?: true | InteractionCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: InteractionMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: InteractionMaxAggregateInputType;
  };

  export type GetInteractionAggregateType<T extends InteractionAggregateArgs> = {
    [P in keyof T & keyof AggregateInteraction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInteraction[P]>
      : GetScalarType<T[P], AggregateInteraction[P]>;
  };

  export type InteractionGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: InteractionWhereInput;
    orderBy?: InteractionOrderByWithAggregationInput | InteractionOrderByWithAggregationInput[];
    by: InteractionScalarFieldEnum[] | InteractionScalarFieldEnum;
    having?: InteractionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: InteractionCountAggregateInputType | true;
    _min?: InteractionMinAggregateInputType;
    _max?: InteractionMaxAggregateInputType;
  };

  export type InteractionGroupByOutputType = {
    id: string;
    tenantId: string;
    clientId: string;
    userId: string;
    type: string;
    notes: string | null;
    metadata: JsonValue | null;
    createdAt: Date;
    updatedAt: Date;
    _count: InteractionCountAggregateOutputType | null;
    _min: InteractionMinAggregateOutputType | null;
    _max: InteractionMaxAggregateOutputType | null;
  };

  type GetInteractionGroupByPayload<T extends InteractionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InteractionGroupByOutputType, T['by']> & {
        [P in keyof T & keyof InteractionGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], InteractionGroupByOutputType[P]>
          : GetScalarType<T[P], InteractionGroupByOutputType[P]>;
      }
    >
  >;

  export type InteractionSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      tenantId?: boolean;
      clientId?: boolean;
      userId?: boolean;
      type?: boolean;
      notes?: boolean;
      metadata?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      tenant?: boolean | TenantDefaultArgs<ExtArgs>;
      client?: boolean | ClientDefaultArgs<ExtArgs>;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['interaction']
  >;

  export type InteractionSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      tenantId?: boolean;
      clientId?: boolean;
      userId?: boolean;
      type?: boolean;
      notes?: boolean;
      metadata?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      tenant?: boolean | TenantDefaultArgs<ExtArgs>;
      client?: boolean | ClientDefaultArgs<ExtArgs>;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['interaction']
  >;

  export type InteractionSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      tenantId?: boolean;
      clientId?: boolean;
      userId?: boolean;
      type?: boolean;
      notes?: boolean;
      metadata?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      tenant?: boolean | TenantDefaultArgs<ExtArgs>;
      client?: boolean | ClientDefaultArgs<ExtArgs>;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['interaction']
  >;

  export type InteractionSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    clientId?: boolean;
    userId?: boolean;
    type?: boolean;
    notes?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type InteractionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetOmit<
      | 'id'
      | 'tenantId'
      | 'clientId'
      | 'userId'
      | 'type'
      | 'notes'
      | 'metadata'
      | 'createdAt'
      | 'updatedAt',
      ExtArgs['result']['interaction']
    >;
  export type InteractionInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>;
    client?: boolean | ClientDefaultArgs<ExtArgs>;
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type InteractionIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>;
    client?: boolean | ClientDefaultArgs<ExtArgs>;
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type InteractionIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>;
    client?: boolean | ClientDefaultArgs<ExtArgs>;
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $InteractionPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'Interaction';
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>;
      client: Prisma.$ClientPayload<ExtArgs>;
      user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        tenantId: string;
        clientId: string;
        userId: string;
        type: string;
        notes: string | null;
        metadata: Prisma.JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['interaction']
    >;
    composites: {};
  };

  type InteractionGetPayload<S extends boolean | null | undefined | InteractionDefaultArgs> =
    $Result.GetResult<Prisma.$InteractionPayload, S>;

  type InteractionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InteractionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InteractionCountAggregateInputType | true;
    };

  export interface InteractionDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Interaction'];
      meta: { name: 'Interaction' };
    };
    /**
     * Find zero or one Interaction that matches the filter.
     * @param {InteractionFindUniqueArgs} args - Arguments to find a Interaction
     * @example
     * // Get one Interaction
     * const interaction = await prisma.interaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InteractionFindUniqueArgs>(
      args: SelectSubset<T, InteractionFindUniqueArgs<ExtArgs>>
    ): Prisma__InteractionClient<
      $Result.GetResult<
        Prisma.$InteractionPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Interaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InteractionFindUniqueOrThrowArgs} args - Arguments to find a Interaction
     * @example
     * // Get one Interaction
     * const interaction = await prisma.interaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InteractionFindUniqueOrThrowArgs>(
      args: SelectSubset<T, InteractionFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__InteractionClient<
      $Result.GetResult<
        Prisma.$InteractionPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Interaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InteractionFindFirstArgs} args - Arguments to find a Interaction
     * @example
     * // Get one Interaction
     * const interaction = await prisma.interaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InteractionFindFirstArgs>(
      args?: SelectSubset<T, InteractionFindFirstArgs<ExtArgs>>
    ): Prisma__InteractionClient<
      $Result.GetResult<
        Prisma.$InteractionPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Interaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InteractionFindFirstOrThrowArgs} args - Arguments to find a Interaction
     * @example
     * // Get one Interaction
     * const interaction = await prisma.interaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InteractionFindFirstOrThrowArgs>(
      args?: SelectSubset<T, InteractionFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__InteractionClient<
      $Result.GetResult<
        Prisma.$InteractionPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Interactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InteractionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Interactions
     * const interactions = await prisma.interaction.findMany()
     *
     * // Get first 10 Interactions
     * const interactions = await prisma.interaction.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const interactionWithIdOnly = await prisma.interaction.findMany({ select: { id: true } })
     *
     */
    findMany<T extends InteractionFindManyArgs>(
      args?: SelectSubset<T, InteractionFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$InteractionPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a Interaction.
     * @param {InteractionCreateArgs} args - Arguments to create a Interaction.
     * @example
     * // Create one Interaction
     * const Interaction = await prisma.interaction.create({
     *   data: {
     *     // ... data to create a Interaction
     *   }
     * })
     *
     */
    create<T extends InteractionCreateArgs>(
      args: SelectSubset<T, InteractionCreateArgs<ExtArgs>>
    ): Prisma__InteractionClient<
      $Result.GetResult<Prisma.$InteractionPayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Interactions.
     * @param {InteractionCreateManyArgs} args - Arguments to create many Interactions.
     * @example
     * // Create many Interactions
     * const interaction = await prisma.interaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends InteractionCreateManyArgs>(
      args?: SelectSubset<T, InteractionCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Interactions and returns the data saved in the database.
     * @param {InteractionCreateManyAndReturnArgs} args - Arguments to create many Interactions.
     * @example
     * // Create many Interactions
     * const interaction = await prisma.interaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Interactions and only return the `id`
     * const interactionWithIdOnly = await prisma.interaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends InteractionCreateManyAndReturnArgs>(
      args?: SelectSubset<T, InteractionCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$InteractionPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Interaction.
     * @param {InteractionDeleteArgs} args - Arguments to delete one Interaction.
     * @example
     * // Delete one Interaction
     * const Interaction = await prisma.interaction.delete({
     *   where: {
     *     // ... filter to delete one Interaction
     *   }
     * })
     *
     */
    delete<T extends InteractionDeleteArgs>(
      args: SelectSubset<T, InteractionDeleteArgs<ExtArgs>>
    ): Prisma__InteractionClient<
      $Result.GetResult<Prisma.$InteractionPayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Interaction.
     * @param {InteractionUpdateArgs} args - Arguments to update one Interaction.
     * @example
     * // Update one Interaction
     * const interaction = await prisma.interaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends InteractionUpdateArgs>(
      args: SelectSubset<T, InteractionUpdateArgs<ExtArgs>>
    ): Prisma__InteractionClient<
      $Result.GetResult<Prisma.$InteractionPayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Interactions.
     * @param {InteractionDeleteManyArgs} args - Arguments to filter Interactions to delete.
     * @example
     * // Delete a few Interactions
     * const { count } = await prisma.interaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends InteractionDeleteManyArgs>(
      args?: SelectSubset<T, InteractionDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Interactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InteractionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Interactions
     * const interaction = await prisma.interaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends InteractionUpdateManyArgs>(
      args: SelectSubset<T, InteractionUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Interactions and returns the data updated in the database.
     * @param {InteractionUpdateManyAndReturnArgs} args - Arguments to update many Interactions.
     * @example
     * // Update many Interactions
     * const interaction = await prisma.interaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Interactions and only return the `id`
     * const interactionWithIdOnly = await prisma.interaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends InteractionUpdateManyAndReturnArgs>(
      args: SelectSubset<T, InteractionUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$InteractionPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Interaction.
     * @param {InteractionUpsertArgs} args - Arguments to update or create a Interaction.
     * @example
     * // Update or create a Interaction
     * const interaction = await prisma.interaction.upsert({
     *   create: {
     *     // ... data to create a Interaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Interaction we want to update
     *   }
     * })
     */
    upsert<T extends InteractionUpsertArgs>(
      args: SelectSubset<T, InteractionUpsertArgs<ExtArgs>>
    ): Prisma__InteractionClient<
      $Result.GetResult<Prisma.$InteractionPayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Interactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InteractionCountArgs} args - Arguments to filter Interactions to count.
     * @example
     * // Count the number of Interactions
     * const count = await prisma.interaction.count({
     *   where: {
     *     // ... the filter for the Interactions we want to count
     *   }
     * })
     **/
    count<T extends InteractionCountArgs>(
      args?: Subset<T, InteractionCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InteractionCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Interaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InteractionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends InteractionAggregateArgs>(
      args: Subset<T, InteractionAggregateArgs>
    ): Prisma.PrismaPromise<GetInteractionAggregateType<T>>;

    /**
     * Group by Interaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InteractionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends InteractionGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InteractionGroupByArgs['orderBy'] }
        : { orderBy?: InteractionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, InteractionGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors ? GetInteractionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Interaction model
     */
    readonly fields: InteractionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Interaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InteractionClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, TenantDefaultArgs<ExtArgs>>
    ): Prisma__TenantClient<
      | $Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    client<T extends ClientDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, ClientDefaultArgs<ExtArgs>>
    ): Prisma__ClientClient<
      | $Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>
    ): Prisma__UserClient<
      | $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Interaction model
   */
  interface InteractionFieldRefs {
    readonly id: FieldRef<'Interaction', 'String'>;
    readonly tenantId: FieldRef<'Interaction', 'String'>;
    readonly clientId: FieldRef<'Interaction', 'String'>;
    readonly userId: FieldRef<'Interaction', 'String'>;
    readonly type: FieldRef<'Interaction', 'String'>;
    readonly notes: FieldRef<'Interaction', 'String'>;
    readonly metadata: FieldRef<'Interaction', 'Json'>;
    readonly createdAt: FieldRef<'Interaction', 'DateTime'>;
    readonly updatedAt: FieldRef<'Interaction', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Interaction findUnique
   */
  export type InteractionFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Interaction
     */
    select?: InteractionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Interaction
     */
    omit?: InteractionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InteractionInclude<ExtArgs> | null;
    /**
     * Filter, which Interaction to fetch.
     */
    where: InteractionWhereUniqueInput;
  };

  /**
   * Interaction findUniqueOrThrow
   */
  export type InteractionFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Interaction
     */
    select?: InteractionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Interaction
     */
    omit?: InteractionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InteractionInclude<ExtArgs> | null;
    /**
     * Filter, which Interaction to fetch.
     */
    where: InteractionWhereUniqueInput;
  };

  /**
   * Interaction findFirst
   */
  export type InteractionFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Interaction
     */
    select?: InteractionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Interaction
     */
    omit?: InteractionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InteractionInclude<ExtArgs> | null;
    /**
     * Filter, which Interaction to fetch.
     */
    where?: InteractionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Interactions to fetch.
     */
    orderBy?: InteractionOrderByWithRelationInput | InteractionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Interactions.
     */
    cursor?: InteractionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Interactions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Interactions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Interactions.
     */
    distinct?: InteractionScalarFieldEnum | InteractionScalarFieldEnum[];
  };

  /**
   * Interaction findFirstOrThrow
   */
  export type InteractionFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Interaction
     */
    select?: InteractionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Interaction
     */
    omit?: InteractionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InteractionInclude<ExtArgs> | null;
    /**
     * Filter, which Interaction to fetch.
     */
    where?: InteractionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Interactions to fetch.
     */
    orderBy?: InteractionOrderByWithRelationInput | InteractionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Interactions.
     */
    cursor?: InteractionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Interactions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Interactions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Interactions.
     */
    distinct?: InteractionScalarFieldEnum | InteractionScalarFieldEnum[];
  };

  /**
   * Interaction findMany
   */
  export type InteractionFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Interaction
     */
    select?: InteractionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Interaction
     */
    omit?: InteractionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InteractionInclude<ExtArgs> | null;
    /**
     * Filter, which Interactions to fetch.
     */
    where?: InteractionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Interactions to fetch.
     */
    orderBy?: InteractionOrderByWithRelationInput | InteractionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Interactions.
     */
    cursor?: InteractionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Interactions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Interactions.
     */
    skip?: number;
    distinct?: InteractionScalarFieldEnum | InteractionScalarFieldEnum[];
  };

  /**
   * Interaction create
   */
  export type InteractionCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Interaction
     */
    select?: InteractionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Interaction
     */
    omit?: InteractionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InteractionInclude<ExtArgs> | null;
    /**
     * The data needed to create a Interaction.
     */
    data: XOR<InteractionCreateInput, InteractionUncheckedCreateInput>;
  };

  /**
   * Interaction createMany
   */
  export type InteractionCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Interactions.
     */
    data: InteractionCreateManyInput | InteractionCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Interaction createManyAndReturn
   */
  export type InteractionCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Interaction
     */
    select?: InteractionSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Interaction
     */
    omit?: InteractionOmit<ExtArgs> | null;
    /**
     * The data used to create many Interactions.
     */
    data: InteractionCreateManyInput | InteractionCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InteractionIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Interaction update
   */
  export type InteractionUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Interaction
     */
    select?: InteractionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Interaction
     */
    omit?: InteractionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InteractionInclude<ExtArgs> | null;
    /**
     * The data needed to update a Interaction.
     */
    data: XOR<InteractionUpdateInput, InteractionUncheckedUpdateInput>;
    /**
     * Choose, which Interaction to update.
     */
    where: InteractionWhereUniqueInput;
  };

  /**
   * Interaction updateMany
   */
  export type InteractionUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Interactions.
     */
    data: XOR<InteractionUpdateManyMutationInput, InteractionUncheckedUpdateManyInput>;
    /**
     * Filter which Interactions to update
     */
    where?: InteractionWhereInput;
    /**
     * Limit how many Interactions to update.
     */
    limit?: number;
  };

  /**
   * Interaction updateManyAndReturn
   */
  export type InteractionUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Interaction
     */
    select?: InteractionSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Interaction
     */
    omit?: InteractionOmit<ExtArgs> | null;
    /**
     * The data used to update Interactions.
     */
    data: XOR<InteractionUpdateManyMutationInput, InteractionUncheckedUpdateManyInput>;
    /**
     * Filter which Interactions to update
     */
    where?: InteractionWhereInput;
    /**
     * Limit how many Interactions to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InteractionIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Interaction upsert
   */
  export type InteractionUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Interaction
     */
    select?: InteractionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Interaction
     */
    omit?: InteractionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InteractionInclude<ExtArgs> | null;
    /**
     * The filter to search for the Interaction to update in case it exists.
     */
    where: InteractionWhereUniqueInput;
    /**
     * In case the Interaction found by the `where` argument doesn't exist, create a new Interaction with this data.
     */
    create: XOR<InteractionCreateInput, InteractionUncheckedCreateInput>;
    /**
     * In case the Interaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InteractionUpdateInput, InteractionUncheckedUpdateInput>;
  };

  /**
   * Interaction delete
   */
  export type InteractionDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Interaction
     */
    select?: InteractionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Interaction
     */
    omit?: InteractionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InteractionInclude<ExtArgs> | null;
    /**
     * Filter which Interaction to delete.
     */
    where: InteractionWhereUniqueInput;
  };

  /**
   * Interaction deleteMany
   */
  export type InteractionDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Interactions to delete
     */
    where?: InteractionWhereInput;
    /**
     * Limit how many Interactions to delete.
     */
    limit?: number;
  };

  /**
   * Interaction without action
   */
  export type InteractionDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Interaction
     */
    select?: InteractionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Interaction
     */
    omit?: InteractionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InteractionInclude<ExtArgs> | null;
  };

  /**
   * Model Segment
   */

  export type AggregateSegment = {
    _count: SegmentCountAggregateOutputType | null;
    _min: SegmentMinAggregateOutputType | null;
    _max: SegmentMaxAggregateOutputType | null;
  };

  export type SegmentMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    name: string | null;
    color: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type SegmentMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    name: string | null;
    color: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type SegmentCountAggregateOutputType = {
    id: number;
    tenantId: number;
    name: number;
    criteria: number;
    color: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type SegmentMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    name?: true;
    color?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type SegmentMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    name?: true;
    color?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type SegmentCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    name?: true;
    criteria?: true;
    color?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type SegmentAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Segment to aggregate.
     */
    where?: SegmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Segments to fetch.
     */
    orderBy?: SegmentOrderByWithRelationInput | SegmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: SegmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Segments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Segments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Segments
     **/
    _count?: true | SegmentCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: SegmentMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: SegmentMaxAggregateInputType;
  };

  export type GetSegmentAggregateType<T extends SegmentAggregateArgs> = {
    [P in keyof T & keyof AggregateSegment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSegment[P]>
      : GetScalarType<T[P], AggregateSegment[P]>;
  };

  export type SegmentGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: SegmentWhereInput;
    orderBy?: SegmentOrderByWithAggregationInput | SegmentOrderByWithAggregationInput[];
    by: SegmentScalarFieldEnum[] | SegmentScalarFieldEnum;
    having?: SegmentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SegmentCountAggregateInputType | true;
    _min?: SegmentMinAggregateInputType;
    _max?: SegmentMaxAggregateInputType;
  };

  export type SegmentGroupByOutputType = {
    id: string;
    tenantId: string;
    name: string;
    criteria: JsonValue | null;
    color: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: SegmentCountAggregateOutputType | null;
    _min: SegmentMinAggregateOutputType | null;
    _max: SegmentMaxAggregateOutputType | null;
  };

  type GetSegmentGroupByPayload<T extends SegmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SegmentGroupByOutputType, T['by']> & {
        [P in keyof T & keyof SegmentGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], SegmentGroupByOutputType[P]>
          : GetScalarType<T[P], SegmentGroupByOutputType[P]>;
      }
    >
  >;

  export type SegmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        tenantId?: boolean;
        name?: boolean;
        criteria?: boolean;
        color?: boolean;
        createdAt?: boolean;
        updatedAt?: boolean;
        tenant?: boolean | TenantDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['segment']
    >;

  export type SegmentSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      tenantId?: boolean;
      name?: boolean;
      criteria?: boolean;
      color?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      tenant?: boolean | TenantDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['segment']
  >;

  export type SegmentSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      tenantId?: boolean;
      name?: boolean;
      criteria?: boolean;
      color?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      tenant?: boolean | TenantDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['segment']
  >;

  export type SegmentSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    name?: boolean;
    criteria?: boolean;
    color?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type SegmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetOmit<
      'id' | 'tenantId' | 'name' | 'criteria' | 'color' | 'createdAt' | 'updatedAt',
      ExtArgs['result']['segment']
    >;
  export type SegmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>;
  };
  export type SegmentIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>;
  };
  export type SegmentIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>;
  };

  export type $SegmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      name: 'Segment';
      objects: {
        tenant: Prisma.$TenantPayload<ExtArgs>;
      };
      scalars: $Extensions.GetPayloadResult<
        {
          id: string;
          tenantId: string;
          name: string;
          criteria: Prisma.JsonValue | null;
          color: string | null;
          createdAt: Date;
          updatedAt: Date;
        },
        ExtArgs['result']['segment']
      >;
      composites: {};
    };

  type SegmentGetPayload<S extends boolean | null | undefined | SegmentDefaultArgs> =
    $Result.GetResult<Prisma.$SegmentPayload, S>;

  type SegmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    SegmentFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: SegmentCountAggregateInputType | true;
  };

  export interface SegmentDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Segment']; meta: { name: 'Segment' } };
    /**
     * Find zero or one Segment that matches the filter.
     * @param {SegmentFindUniqueArgs} args - Arguments to find a Segment
     * @example
     * // Get one Segment
     * const segment = await prisma.segment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SegmentFindUniqueArgs>(
      args: SelectSubset<T, SegmentFindUniqueArgs<ExtArgs>>
    ): Prisma__SegmentClient<
      $Result.GetResult<Prisma.$SegmentPayload<ExtArgs>, T, 'findUnique', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Segment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SegmentFindUniqueOrThrowArgs} args - Arguments to find a Segment
     * @example
     * // Get one Segment
     * const segment = await prisma.segment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SegmentFindUniqueOrThrowArgs>(
      args: SelectSubset<T, SegmentFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__SegmentClient<
      $Result.GetResult<Prisma.$SegmentPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Segment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SegmentFindFirstArgs} args - Arguments to find a Segment
     * @example
     * // Get one Segment
     * const segment = await prisma.segment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SegmentFindFirstArgs>(
      args?: SelectSubset<T, SegmentFindFirstArgs<ExtArgs>>
    ): Prisma__SegmentClient<
      $Result.GetResult<Prisma.$SegmentPayload<ExtArgs>, T, 'findFirst', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Segment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SegmentFindFirstOrThrowArgs} args - Arguments to find a Segment
     * @example
     * // Get one Segment
     * const segment = await prisma.segment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SegmentFindFirstOrThrowArgs>(
      args?: SelectSubset<T, SegmentFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__SegmentClient<
      $Result.GetResult<Prisma.$SegmentPayload<ExtArgs>, T, 'findFirstOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Segments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SegmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Segments
     * const segments = await prisma.segment.findMany()
     *
     * // Get first 10 Segments
     * const segments = await prisma.segment.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const segmentWithIdOnly = await prisma.segment.findMany({ select: { id: true } })
     *
     */
    findMany<T extends SegmentFindManyArgs>(
      args?: SelectSubset<T, SegmentFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$SegmentPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a Segment.
     * @param {SegmentCreateArgs} args - Arguments to create a Segment.
     * @example
     * // Create one Segment
     * const Segment = await prisma.segment.create({
     *   data: {
     *     // ... data to create a Segment
     *   }
     * })
     *
     */
    create<T extends SegmentCreateArgs>(
      args: SelectSubset<T, SegmentCreateArgs<ExtArgs>>
    ): Prisma__SegmentClient<
      $Result.GetResult<Prisma.$SegmentPayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Segments.
     * @param {SegmentCreateManyArgs} args - Arguments to create many Segments.
     * @example
     * // Create many Segments
     * const segment = await prisma.segment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends SegmentCreateManyArgs>(
      args?: SelectSubset<T, SegmentCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Segments and returns the data saved in the database.
     * @param {SegmentCreateManyAndReturnArgs} args - Arguments to create many Segments.
     * @example
     * // Create many Segments
     * const segment = await prisma.segment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Segments and only return the `id`
     * const segmentWithIdOnly = await prisma.segment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends SegmentCreateManyAndReturnArgs>(
      args?: SelectSubset<T, SegmentCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$SegmentPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Segment.
     * @param {SegmentDeleteArgs} args - Arguments to delete one Segment.
     * @example
     * // Delete one Segment
     * const Segment = await prisma.segment.delete({
     *   where: {
     *     // ... filter to delete one Segment
     *   }
     * })
     *
     */
    delete<T extends SegmentDeleteArgs>(
      args: SelectSubset<T, SegmentDeleteArgs<ExtArgs>>
    ): Prisma__SegmentClient<
      $Result.GetResult<Prisma.$SegmentPayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Segment.
     * @param {SegmentUpdateArgs} args - Arguments to update one Segment.
     * @example
     * // Update one Segment
     * const segment = await prisma.segment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends SegmentUpdateArgs>(
      args: SelectSubset<T, SegmentUpdateArgs<ExtArgs>>
    ): Prisma__SegmentClient<
      $Result.GetResult<Prisma.$SegmentPayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Segments.
     * @param {SegmentDeleteManyArgs} args - Arguments to filter Segments to delete.
     * @example
     * // Delete a few Segments
     * const { count } = await prisma.segment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends SegmentDeleteManyArgs>(
      args?: SelectSubset<T, SegmentDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Segments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SegmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Segments
     * const segment = await prisma.segment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends SegmentUpdateManyArgs>(
      args: SelectSubset<T, SegmentUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Segments and returns the data updated in the database.
     * @param {SegmentUpdateManyAndReturnArgs} args - Arguments to update many Segments.
     * @example
     * // Update many Segments
     * const segment = await prisma.segment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Segments and only return the `id`
     * const segmentWithIdOnly = await prisma.segment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends SegmentUpdateManyAndReturnArgs>(
      args: SelectSubset<T, SegmentUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$SegmentPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Segment.
     * @param {SegmentUpsertArgs} args - Arguments to update or create a Segment.
     * @example
     * // Update or create a Segment
     * const segment = await prisma.segment.upsert({
     *   create: {
     *     // ... data to create a Segment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Segment we want to update
     *   }
     * })
     */
    upsert<T extends SegmentUpsertArgs>(
      args: SelectSubset<T, SegmentUpsertArgs<ExtArgs>>
    ): Prisma__SegmentClient<
      $Result.GetResult<Prisma.$SegmentPayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Segments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SegmentCountArgs} args - Arguments to filter Segments to count.
     * @example
     * // Count the number of Segments
     * const count = await prisma.segment.count({
     *   where: {
     *     // ... the filter for the Segments we want to count
     *   }
     * })
     **/
    count<T extends SegmentCountArgs>(
      args?: Subset<T, SegmentCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SegmentCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Segment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SegmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends SegmentAggregateArgs>(
      args: Subset<T, SegmentAggregateArgs>
    ): Prisma.PrismaPromise<GetSegmentAggregateType<T>>;

    /**
     * Group by Segment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SegmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends SegmentGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SegmentGroupByArgs['orderBy'] }
        : { orderBy?: SegmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, SegmentGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors ? GetSegmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Segment model
     */
    readonly fields: SegmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Segment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SegmentClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, TenantDefaultArgs<ExtArgs>>
    ): Prisma__TenantClient<
      | $Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Segment model
   */
  interface SegmentFieldRefs {
    readonly id: FieldRef<'Segment', 'String'>;
    readonly tenantId: FieldRef<'Segment', 'String'>;
    readonly name: FieldRef<'Segment', 'String'>;
    readonly criteria: FieldRef<'Segment', 'Json'>;
    readonly color: FieldRef<'Segment', 'String'>;
    readonly createdAt: FieldRef<'Segment', 'DateTime'>;
    readonly updatedAt: FieldRef<'Segment', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Segment findUnique
   */
  export type SegmentFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Segment
     */
    select?: SegmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Segment
     */
    omit?: SegmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SegmentInclude<ExtArgs> | null;
    /**
     * Filter, which Segment to fetch.
     */
    where: SegmentWhereUniqueInput;
  };

  /**
   * Segment findUniqueOrThrow
   */
  export type SegmentFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Segment
     */
    select?: SegmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Segment
     */
    omit?: SegmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SegmentInclude<ExtArgs> | null;
    /**
     * Filter, which Segment to fetch.
     */
    where: SegmentWhereUniqueInput;
  };

  /**
   * Segment findFirst
   */
  export type SegmentFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Segment
     */
    select?: SegmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Segment
     */
    omit?: SegmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SegmentInclude<ExtArgs> | null;
    /**
     * Filter, which Segment to fetch.
     */
    where?: SegmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Segments to fetch.
     */
    orderBy?: SegmentOrderByWithRelationInput | SegmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Segments.
     */
    cursor?: SegmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Segments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Segments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Segments.
     */
    distinct?: SegmentScalarFieldEnum | SegmentScalarFieldEnum[];
  };

  /**
   * Segment findFirstOrThrow
   */
  export type SegmentFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Segment
     */
    select?: SegmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Segment
     */
    omit?: SegmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SegmentInclude<ExtArgs> | null;
    /**
     * Filter, which Segment to fetch.
     */
    where?: SegmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Segments to fetch.
     */
    orderBy?: SegmentOrderByWithRelationInput | SegmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Segments.
     */
    cursor?: SegmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Segments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Segments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Segments.
     */
    distinct?: SegmentScalarFieldEnum | SegmentScalarFieldEnum[];
  };

  /**
   * Segment findMany
   */
  export type SegmentFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Segment
     */
    select?: SegmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Segment
     */
    omit?: SegmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SegmentInclude<ExtArgs> | null;
    /**
     * Filter, which Segments to fetch.
     */
    where?: SegmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Segments to fetch.
     */
    orderBy?: SegmentOrderByWithRelationInput | SegmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Segments.
     */
    cursor?: SegmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Segments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Segments.
     */
    skip?: number;
    distinct?: SegmentScalarFieldEnum | SegmentScalarFieldEnum[];
  };

  /**
   * Segment create
   */
  export type SegmentCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Segment
     */
    select?: SegmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Segment
     */
    omit?: SegmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SegmentInclude<ExtArgs> | null;
    /**
     * The data needed to create a Segment.
     */
    data: XOR<SegmentCreateInput, SegmentUncheckedCreateInput>;
  };

  /**
   * Segment createMany
   */
  export type SegmentCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Segments.
     */
    data: SegmentCreateManyInput | SegmentCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Segment createManyAndReturn
   */
  export type SegmentCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Segment
     */
    select?: SegmentSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Segment
     */
    omit?: SegmentOmit<ExtArgs> | null;
    /**
     * The data used to create many Segments.
     */
    data: SegmentCreateManyInput | SegmentCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SegmentIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Segment update
   */
  export type SegmentUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Segment
     */
    select?: SegmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Segment
     */
    omit?: SegmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SegmentInclude<ExtArgs> | null;
    /**
     * The data needed to update a Segment.
     */
    data: XOR<SegmentUpdateInput, SegmentUncheckedUpdateInput>;
    /**
     * Choose, which Segment to update.
     */
    where: SegmentWhereUniqueInput;
  };

  /**
   * Segment updateMany
   */
  export type SegmentUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Segments.
     */
    data: XOR<SegmentUpdateManyMutationInput, SegmentUncheckedUpdateManyInput>;
    /**
     * Filter which Segments to update
     */
    where?: SegmentWhereInput;
    /**
     * Limit how many Segments to update.
     */
    limit?: number;
  };

  /**
   * Segment updateManyAndReturn
   */
  export type SegmentUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Segment
     */
    select?: SegmentSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Segment
     */
    omit?: SegmentOmit<ExtArgs> | null;
    /**
     * The data used to update Segments.
     */
    data: XOR<SegmentUpdateManyMutationInput, SegmentUncheckedUpdateManyInput>;
    /**
     * Filter which Segments to update
     */
    where?: SegmentWhereInput;
    /**
     * Limit how many Segments to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SegmentIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Segment upsert
   */
  export type SegmentUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Segment
     */
    select?: SegmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Segment
     */
    omit?: SegmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SegmentInclude<ExtArgs> | null;
    /**
     * The filter to search for the Segment to update in case it exists.
     */
    where: SegmentWhereUniqueInput;
    /**
     * In case the Segment found by the `where` argument doesn't exist, create a new Segment with this data.
     */
    create: XOR<SegmentCreateInput, SegmentUncheckedCreateInput>;
    /**
     * In case the Segment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SegmentUpdateInput, SegmentUncheckedUpdateInput>;
  };

  /**
   * Segment delete
   */
  export type SegmentDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Segment
     */
    select?: SegmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Segment
     */
    omit?: SegmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SegmentInclude<ExtArgs> | null;
    /**
     * Filter which Segment to delete.
     */
    where: SegmentWhereUniqueInput;
  };

  /**
   * Segment deleteMany
   */
  export type SegmentDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Segments to delete
     */
    where?: SegmentWhereInput;
    /**
     * Limit how many Segments to delete.
     */
    limit?: number;
  };

  /**
   * Segment without action
   */
  export type SegmentDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Segment
     */
    select?: SegmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Segment
     */
    omit?: SegmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SegmentInclude<ExtArgs> | null;
  };

  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null;
    _min: NotificationMinAggregateOutputType | null;
    _max: NotificationMaxAggregateOutputType | null;
  };

  export type NotificationMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    userId: string | null;
    type: string | null;
    title: string | null;
    message: string | null;
    read: boolean | null;
    createdAt: Date | null;
  };

  export type NotificationMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    userId: string | null;
    type: string | null;
    title: string | null;
    message: string | null;
    read: boolean | null;
    createdAt: Date | null;
  };

  export type NotificationCountAggregateOutputType = {
    id: number;
    tenantId: number;
    userId: number;
    type: number;
    title: number;
    message: number;
    data: number;
    read: number;
    createdAt: number;
    _all: number;
  };

  export type NotificationMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    userId?: true;
    type?: true;
    title?: true;
    message?: true;
    read?: true;
    createdAt?: true;
  };

  export type NotificationMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    userId?: true;
    type?: true;
    title?: true;
    message?: true;
    read?: true;
    createdAt?: true;
  };

  export type NotificationCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    userId?: true;
    type?: true;
    title?: true;
    message?: true;
    data?: true;
    read?: true;
    createdAt?: true;
    _all?: true;
  };

  export type NotificationAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Notifications.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Notifications
     **/
    _count?: true | NotificationCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: NotificationMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: NotificationMaxAggregateInputType;
  };

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
    [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>;
  };

  export type NotificationGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: NotificationWhereInput;
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[];
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum;
    having?: NotificationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: NotificationCountAggregateInputType | true;
    _min?: NotificationMinAggregateInputType;
    _max?: NotificationMaxAggregateInputType;
  };

  export type NotificationGroupByOutputType = {
    id: string;
    tenantId: string;
    userId: string;
    type: string;
    title: string;
    message: string | null;
    data: JsonValue | null;
    read: boolean;
    createdAt: Date;
    _count: NotificationCountAggregateOutputType | null;
    _min: NotificationMinAggregateOutputType | null;
    _max: NotificationMaxAggregateOutputType | null;
  };

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> & {
        [P in keyof T & keyof NotificationGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
          : GetScalarType<T[P], NotificationGroupByOutputType[P]>;
      }
    >
  >;

  export type NotificationSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      tenantId?: boolean;
      userId?: boolean;
      type?: boolean;
      title?: boolean;
      message?: boolean;
      data?: boolean;
      read?: boolean;
      createdAt?: boolean;
      tenant?: boolean | TenantDefaultArgs<ExtArgs>;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['notification']
  >;

  export type NotificationSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      tenantId?: boolean;
      userId?: boolean;
      type?: boolean;
      title?: boolean;
      message?: boolean;
      data?: boolean;
      read?: boolean;
      createdAt?: boolean;
      tenant?: boolean | TenantDefaultArgs<ExtArgs>;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['notification']
  >;

  export type NotificationSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      tenantId?: boolean;
      userId?: boolean;
      type?: boolean;
      title?: boolean;
      message?: boolean;
      data?: boolean;
      read?: boolean;
      createdAt?: boolean;
      tenant?: boolean | TenantDefaultArgs<ExtArgs>;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['notification']
  >;

  export type NotificationSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    userId?: boolean;
    type?: boolean;
    title?: boolean;
    message?: boolean;
    data?: boolean;
    read?: boolean;
    createdAt?: boolean;
  };

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetOmit<
      'id' | 'tenantId' | 'userId' | 'type' | 'title' | 'message' | 'data' | 'read' | 'createdAt',
      ExtArgs['result']['notification']
    >;
  export type NotificationInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>;
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type NotificationIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>;
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type NotificationIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>;
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $NotificationPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'Notification';
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>;
      user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        tenantId: string;
        userId: string;
        type: string;
        title: string;
        message: string | null;
        data: Prisma.JsonValue | null;
        read: boolean;
        createdAt: Date;
      },
      ExtArgs['result']['notification']
    >;
    composites: {};
  };

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> =
    $Result.GetResult<Prisma.$NotificationPayload, S>;

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true;
    };

  export interface NotificationDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Notification'];
      meta: { name: 'Notification' };
    };
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(
      args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>
    ): Prisma__NotificationClient<
      $Result.GetResult<
        Prisma.$NotificationPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(
      args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__NotificationClient<
      $Result.GetResult<
        Prisma.$NotificationPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(
      args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>
    ): Prisma__NotificationClient<
      $Result.GetResult<
        Prisma.$NotificationPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(
      args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__NotificationClient<
      $Result.GetResult<
        Prisma.$NotificationPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     *
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     *
     */
    findMany<T extends NotificationFindManyArgs>(
      args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     *
     */
    create<T extends NotificationCreateArgs>(
      args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>
    ): Prisma__NotificationClient<
      $Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends NotificationCreateManyArgs>(
      args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(
      args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$NotificationPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     *
     */
    delete<T extends NotificationDeleteArgs>(
      args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>
    ): Prisma__NotificationClient<
      $Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends NotificationUpdateArgs>(
      args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>
    ): Prisma__NotificationClient<
      $Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends NotificationDeleteManyArgs>(
      args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends NotificationUpdateManyArgs>(
      args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Notifications and returns the data updated in the database.
     * @param {NotificationUpdateManyAndReturnArgs} args - Arguments to update many Notifications.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends NotificationUpdateManyAndReturnArgs>(
      args: SelectSubset<T, NotificationUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$NotificationPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(
      args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>
    ): Prisma__NotificationClient<
      $Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
     **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends NotificationAggregateArgs>(
      args: Subset<T, NotificationAggregateArgs>
    ): Prisma.PrismaPromise<GetNotificationAggregateType<T>>;

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetNotificationGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Notification model
     */
    readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, TenantDefaultArgs<ExtArgs>>
    ): Prisma__TenantClient<
      | $Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>
    ): Prisma__UserClient<
      | $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Notification model
   */
  interface NotificationFieldRefs {
    readonly id: FieldRef<'Notification', 'String'>;
    readonly tenantId: FieldRef<'Notification', 'String'>;
    readonly userId: FieldRef<'Notification', 'String'>;
    readonly type: FieldRef<'Notification', 'String'>;
    readonly title: FieldRef<'Notification', 'String'>;
    readonly message: FieldRef<'Notification', 'String'>;
    readonly data: FieldRef<'Notification', 'Json'>;
    readonly read: FieldRef<'Notification', 'Boolean'>;
    readonly createdAt: FieldRef<'Notification', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null;
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput;
  };

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null;
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput;
  };

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null;
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Notifications.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[];
  };

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null;
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Notifications.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[];
  };

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null;
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Notifications.
     */
    skip?: number;
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[];
  };

  /**
   * Notification create
   */
  export type NotificationCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null;
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>;
  };

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null;
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null;
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>;
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput;
  };

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>;
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput;
    /**
     * Limit how many Notifications to update.
     */
    limit?: number;
  };

  /**
   * Notification updateManyAndReturn
   */
  export type NotificationUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null;
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>;
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput;
    /**
     * Limit how many Notifications to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null;
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput;
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>;
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>;
  };

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null;
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput;
  };

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput;
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number;
  };

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null;
  };

  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null;
    _min: AuditLogMinAggregateOutputType | null;
    _max: AuditLogMaxAggregateOutputType | null;
  };

  export type AuditLogMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    userId: string | null;
    action: string | null;
    entity: string | null;
    entityId: string | null;
    ipAddress: string | null;
    userAgent: string | null;
    createdAt: Date | null;
  };

  export type AuditLogMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    userId: string | null;
    action: string | null;
    entity: string | null;
    entityId: string | null;
    ipAddress: string | null;
    userAgent: string | null;
    createdAt: Date | null;
  };

  export type AuditLogCountAggregateOutputType = {
    id: number;
    tenantId: number;
    userId: number;
    action: number;
    entity: number;
    entityId: number;
    oldValues: number;
    newValues: number;
    ipAddress: number;
    userAgent: number;
    createdAt: number;
    _all: number;
  };

  export type AuditLogMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    userId?: true;
    action?: true;
    entity?: true;
    entityId?: true;
    ipAddress?: true;
    userAgent?: true;
    createdAt?: true;
  };

  export type AuditLogMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    userId?: true;
    action?: true;
    entity?: true;
    entityId?: true;
    ipAddress?: true;
    userAgent?: true;
    createdAt?: true;
  };

  export type AuditLogCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    userId?: true;
    action?: true;
    entity?: true;
    entityId?: true;
    oldValues?: true;
    newValues?: true;
    ipAddress?: true;
    userAgent?: true;
    createdAt?: true;
    _all?: true;
  };

  export type AuditLogAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AuditLogs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned AuditLogs
     **/
    _count?: true | AuditLogCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: AuditLogMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: AuditLogMaxAggregateInputType;
  };

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
    [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>;
  };

  export type AuditLogGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: AuditLogWhereInput;
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[];
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum;
    having?: AuditLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AuditLogCountAggregateInputType | true;
    _min?: AuditLogMinAggregateInputType;
    _max?: AuditLogMaxAggregateInputType;
  };

  export type AuditLogGroupByOutputType = {
    id: string;
    tenantId: string;
    userId: string | null;
    action: string;
    entity: string;
    entityId: string | null;
    oldValues: JsonValue | null;
    newValues: JsonValue | null;
    ipAddress: string | null;
    userAgent: string | null;
    createdAt: Date;
    _count: AuditLogCountAggregateOutputType | null;
    _min: AuditLogMinAggregateOutputType | null;
    _max: AuditLogMaxAggregateOutputType | null;
  };

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> & {
        [P in keyof T & keyof AuditLogGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
          : GetScalarType<T[P], AuditLogGroupByOutputType[P]>;
      }
    >
  >;

  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        tenantId?: boolean;
        userId?: boolean;
        action?: boolean;
        entity?: boolean;
        entityId?: boolean;
        oldValues?: boolean;
        newValues?: boolean;
        ipAddress?: boolean;
        userAgent?: boolean;
        createdAt?: boolean;
        tenant?: boolean | TenantDefaultArgs<ExtArgs>;
        user?: boolean | AuditLog$userArgs<ExtArgs>;
      },
      ExtArgs['result']['auditLog']
    >;

  export type AuditLogSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      tenantId?: boolean;
      userId?: boolean;
      action?: boolean;
      entity?: boolean;
      entityId?: boolean;
      oldValues?: boolean;
      newValues?: boolean;
      ipAddress?: boolean;
      userAgent?: boolean;
      createdAt?: boolean;
      tenant?: boolean | TenantDefaultArgs<ExtArgs>;
      user?: boolean | AuditLog$userArgs<ExtArgs>;
    },
    ExtArgs['result']['auditLog']
  >;

  export type AuditLogSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      tenantId?: boolean;
      userId?: boolean;
      action?: boolean;
      entity?: boolean;
      entityId?: boolean;
      oldValues?: boolean;
      newValues?: boolean;
      ipAddress?: boolean;
      userAgent?: boolean;
      createdAt?: boolean;
      tenant?: boolean | TenantDefaultArgs<ExtArgs>;
      user?: boolean | AuditLog$userArgs<ExtArgs>;
    },
    ExtArgs['result']['auditLog']
  >;

  export type AuditLogSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    userId?: boolean;
    action?: boolean;
    entity?: boolean;
    entityId?: boolean;
    oldValues?: boolean;
    newValues?: boolean;
    ipAddress?: boolean;
    userAgent?: boolean;
    createdAt?: boolean;
  };

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetOmit<
      | 'id'
      | 'tenantId'
      | 'userId'
      | 'action'
      | 'entity'
      | 'entityId'
      | 'oldValues'
      | 'newValues'
      | 'ipAddress'
      | 'userAgent'
      | 'createdAt',
      ExtArgs['result']['auditLog']
    >;
  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      tenant?: boolean | TenantDefaultArgs<ExtArgs>;
      user?: boolean | AuditLog$userArgs<ExtArgs>;
    };
  export type AuditLogIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>;
    user?: boolean | AuditLog$userArgs<ExtArgs>;
  };
  export type AuditLogIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>;
    user?: boolean | AuditLog$userArgs<ExtArgs>;
  };

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      name: 'AuditLog';
      objects: {
        tenant: Prisma.$TenantPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs> | null;
      };
      scalars: $Extensions.GetPayloadResult<
        {
          id: string;
          tenantId: string;
          userId: string | null;
          action: string;
          entity: string;
          entityId: string | null;
          oldValues: Prisma.JsonValue | null;
          newValues: Prisma.JsonValue | null;
          ipAddress: string | null;
          userAgent: string | null;
          createdAt: Date;
        },
        ExtArgs['result']['auditLog']
      >;
      composites: {};
    };

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> =
    $Result.GetResult<Prisma.$AuditLogPayload, S>;

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    AuditLogFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: AuditLogCountAggregateInputType | true;
  };

  export interface AuditLogDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'];
      meta: { name: 'AuditLog' };
    };
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(
      args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>
    ): Prisma__AuditLogClient<
      $Result.GetResult<
        Prisma.$AuditLogPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(
      args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__AuditLogClient<
      $Result.GetResult<
        Prisma.$AuditLogPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(
      args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>
    ): Prisma__AuditLogClient<
      $Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, 'findFirst', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__AuditLogClient<
      $Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, 'findFirstOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     *
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     *
     */
    findMany<T extends AuditLogFindManyArgs>(
      args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     *
     */
    create<T extends AuditLogCreateArgs>(
      args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>
    ): Prisma__AuditLogClient<
      $Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends AuditLogCreateManyArgs>(
      args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(
      args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$AuditLogPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     *
     */
    delete<T extends AuditLogDeleteArgs>(
      args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>
    ): Prisma__AuditLogClient<
      $Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends AuditLogUpdateArgs>(
      args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>
    ): Prisma__AuditLogClient<
      $Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(
      args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends AuditLogUpdateManyArgs>(
      args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(
      args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$AuditLogPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(
      args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>
    ): Prisma__AuditLogClient<
      $Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
     **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends AuditLogAggregateArgs>(
      args: Subset<T, AuditLogAggregateArgs>
    ): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>;

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the AuditLog model
     */
    readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, TenantDefaultArgs<ExtArgs>>
    ): Prisma__TenantClient<
      | $Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    user<T extends AuditLog$userArgs<ExtArgs> = {}>(
      args?: Subset<T, AuditLog$userArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<'AuditLog', 'String'>;
    readonly tenantId: FieldRef<'AuditLog', 'String'>;
    readonly userId: FieldRef<'AuditLog', 'String'>;
    readonly action: FieldRef<'AuditLog', 'String'>;
    readonly entity: FieldRef<'AuditLog', 'String'>;
    readonly entityId: FieldRef<'AuditLog', 'String'>;
    readonly oldValues: FieldRef<'AuditLog', 'Json'>;
    readonly newValues: FieldRef<'AuditLog', 'Json'>;
    readonly ipAddress: FieldRef<'AuditLog', 'String'>;
    readonly userAgent: FieldRef<'AuditLog', 'String'>;
    readonly createdAt: FieldRef<'AuditLog', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null;
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput;
  };

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null;
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput;
  };

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null;
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AuditLogs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[];
  };

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null;
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AuditLogs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[];
  };

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null;
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AuditLogs.
     */
    skip?: number;
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[];
  };

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null;
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>;
  };

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null;
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null;
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>;
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput;
  };

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>;
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput;
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number;
  };

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null;
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>;
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput;
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null;
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput;
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>;
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>;
  };

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null;
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput;
  };

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput;
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number;
  };

  /**
   * AuditLog.user
   */
  export type AuditLog$userArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    where?: UserWhereInput;
  };

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null;
  };

  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted';
    ReadCommitted: 'ReadCommitted';
    RepeatableRead: 'RepeatableRead';
    Serializable: 'Serializable';
  };

  export type TransactionIsolationLevel =
    (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

  export const TenantScalarFieldEnum: {
    id: 'id';
    name: 'name';
    slug: 'slug';
    status: 'status';
    settings: 'settings';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type TenantScalarFieldEnum =
    (typeof TenantScalarFieldEnum)[keyof typeof TenantScalarFieldEnum];

  export const UserScalarFieldEnum: {
    id: 'id';
    tenantId: 'tenantId';
    email: 'email';
    passwordHash: 'passwordHash';
    firstName: 'firstName';
    lastName: 'lastName';
    role: 'role';
    status: 'status';
    avatarUrl: 'avatarUrl';
    lastLoginAt: 'lastLoginAt';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];

  export const RefreshTokenScalarFieldEnum: {
    id: 'id';
    userId: 'userId';
    tokenHash: 'tokenHash';
    expiresAt: 'expiresAt';
    createdAt: 'createdAt';
    revokedAt: 'revokedAt';
  };

  export type RefreshTokenScalarFieldEnum =
    (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum];

  export const ClientScalarFieldEnum: {
    id: 'id';
    tenantId: 'tenantId';
    assignedToId: 'assignedToId';
    companyName: 'companyName';
    contactName: 'contactName';
    email: 'email';
    phone: 'phone';
    status: 'status';
    segment: 'segment';
    tags: 'tags';
    customFields: 'customFields';
    address: 'address';
    notes: 'notes';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type ClientScalarFieldEnum =
    (typeof ClientScalarFieldEnum)[keyof typeof ClientScalarFieldEnum];

  export const InteractionScalarFieldEnum: {
    id: 'id';
    tenantId: 'tenantId';
    clientId: 'clientId';
    userId: 'userId';
    type: 'type';
    notes: 'notes';
    metadata: 'metadata';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type InteractionScalarFieldEnum =
    (typeof InteractionScalarFieldEnum)[keyof typeof InteractionScalarFieldEnum];

  export const SegmentScalarFieldEnum: {
    id: 'id';
    tenantId: 'tenantId';
    name: 'name';
    criteria: 'criteria';
    color: 'color';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type SegmentScalarFieldEnum =
    (typeof SegmentScalarFieldEnum)[keyof typeof SegmentScalarFieldEnum];

  export const NotificationScalarFieldEnum: {
    id: 'id';
    tenantId: 'tenantId';
    userId: 'userId';
    type: 'type';
    title: 'title';
    message: 'message';
    data: 'data';
    read: 'read';
    createdAt: 'createdAt';
  };

  export type NotificationScalarFieldEnum =
    (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum];

  export const AuditLogScalarFieldEnum: {
    id: 'id';
    tenantId: 'tenantId';
    userId: 'userId';
    action: 'action';
    entity: 'entity';
    entityId: 'entityId';
    oldValues: 'oldValues';
    newValues: 'newValues';
    ipAddress: 'ipAddress';
    userAgent: 'userAgent';
    createdAt: 'createdAt';
  };

  export type AuditLogScalarFieldEnum =
    (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum];

  export const SortOrder: {
    asc: 'asc';
    desc: 'desc';
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull;
    JsonNull: typeof JsonNull;
  };

  export type NullableJsonNullValueInput =
    (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];

  export const QueryMode: {
    default: 'default';
    insensitive: 'insensitive';
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

  export const JsonNullValueFilter: {
    DbNull: typeof DbNull;
    JsonNull: typeof JsonNull;
    AnyNull: typeof AnyNull;
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];

  export const NullsOrder: {
    first: 'first';
    last: 'last';
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;

  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;

  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;

  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'QueryMode'
  >;

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;

  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'DateTime[]'
  >;

  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;

  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;

  /**
   * Deep Input Types
   */

  export type TenantWhereInput = {
    AND?: TenantWhereInput | TenantWhereInput[];
    OR?: TenantWhereInput[];
    NOT?: TenantWhereInput | TenantWhereInput[];
    id?: StringFilter<'Tenant'> | string;
    name?: StringFilter<'Tenant'> | string;
    slug?: StringFilter<'Tenant'> | string;
    status?: StringFilter<'Tenant'> | string;
    settings?: JsonNullableFilter<'Tenant'>;
    createdAt?: DateTimeFilter<'Tenant'> | Date | string;
    updatedAt?: DateTimeFilter<'Tenant'> | Date | string;
    users?: UserListRelationFilter;
    clients?: ClientListRelationFilter;
    interactions?: InteractionListRelationFilter;
    segments?: SegmentListRelationFilter;
    notifications?: NotificationListRelationFilter;
    auditLogs?: AuditLogListRelationFilter;
  };

  export type TenantOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    slug?: SortOrder;
    status?: SortOrder;
    settings?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    users?: UserOrderByRelationAggregateInput;
    clients?: ClientOrderByRelationAggregateInput;
    interactions?: InteractionOrderByRelationAggregateInput;
    segments?: SegmentOrderByRelationAggregateInput;
    notifications?: NotificationOrderByRelationAggregateInput;
    auditLogs?: AuditLogOrderByRelationAggregateInput;
  };

  export type TenantWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      slug?: string;
      AND?: TenantWhereInput | TenantWhereInput[];
      OR?: TenantWhereInput[];
      NOT?: TenantWhereInput | TenantWhereInput[];
      name?: StringFilter<'Tenant'> | string;
      status?: StringFilter<'Tenant'> | string;
      settings?: JsonNullableFilter<'Tenant'>;
      createdAt?: DateTimeFilter<'Tenant'> | Date | string;
      updatedAt?: DateTimeFilter<'Tenant'> | Date | string;
      users?: UserListRelationFilter;
      clients?: ClientListRelationFilter;
      interactions?: InteractionListRelationFilter;
      segments?: SegmentListRelationFilter;
      notifications?: NotificationListRelationFilter;
      auditLogs?: AuditLogListRelationFilter;
    },
    'id' | 'slug'
  >;

  export type TenantOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    slug?: SortOrder;
    status?: SortOrder;
    settings?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: TenantCountOrderByAggregateInput;
    _max?: TenantMaxOrderByAggregateInput;
    _min?: TenantMinOrderByAggregateInput;
  };

  export type TenantScalarWhereWithAggregatesInput = {
    AND?: TenantScalarWhereWithAggregatesInput | TenantScalarWhereWithAggregatesInput[];
    OR?: TenantScalarWhereWithAggregatesInput[];
    NOT?: TenantScalarWhereWithAggregatesInput | TenantScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Tenant'> | string;
    name?: StringWithAggregatesFilter<'Tenant'> | string;
    slug?: StringWithAggregatesFilter<'Tenant'> | string;
    status?: StringWithAggregatesFilter<'Tenant'> | string;
    settings?: JsonNullableWithAggregatesFilter<'Tenant'>;
    createdAt?: DateTimeWithAggregatesFilter<'Tenant'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'Tenant'> | Date | string;
  };

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[];
    OR?: UserWhereInput[];
    NOT?: UserWhereInput | UserWhereInput[];
    id?: StringFilter<'User'> | string;
    tenantId?: StringFilter<'User'> | string;
    email?: StringFilter<'User'> | string;
    passwordHash?: StringFilter<'User'> | string;
    firstName?: StringFilter<'User'> | string;
    lastName?: StringFilter<'User'> | string;
    role?: StringFilter<'User'> | string;
    status?: StringFilter<'User'> | string;
    avatarUrl?: StringNullableFilter<'User'> | string | null;
    lastLoginAt?: DateTimeNullableFilter<'User'> | Date | string | null;
    createdAt?: DateTimeFilter<'User'> | Date | string;
    updatedAt?: DateTimeFilter<'User'> | Date | string;
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>;
    refreshTokens?: RefreshTokenListRelationFilter;
    assignedClients?: ClientListRelationFilter;
    interactions?: InteractionListRelationFilter;
    notifications?: NotificationListRelationFilter;
    auditLogs?: AuditLogListRelationFilter;
  };

  export type UserOrderByWithRelationInput = {
    id?: SortOrder;
    tenantId?: SortOrder;
    email?: SortOrder;
    passwordHash?: SortOrder;
    firstName?: SortOrder;
    lastName?: SortOrder;
    role?: SortOrder;
    status?: SortOrder;
    avatarUrl?: SortOrderInput | SortOrder;
    lastLoginAt?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    tenant?: TenantOrderByWithRelationInput;
    refreshTokens?: RefreshTokenOrderByRelationAggregateInput;
    assignedClients?: ClientOrderByRelationAggregateInput;
    interactions?: InteractionOrderByRelationAggregateInput;
    notifications?: NotificationOrderByRelationAggregateInput;
    auditLogs?: AuditLogOrderByRelationAggregateInput;
  };

  export type UserWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      tenantId_email?: UserTenantIdEmailCompoundUniqueInput;
      AND?: UserWhereInput | UserWhereInput[];
      OR?: UserWhereInput[];
      NOT?: UserWhereInput | UserWhereInput[];
      tenantId?: StringFilter<'User'> | string;
      email?: StringFilter<'User'> | string;
      passwordHash?: StringFilter<'User'> | string;
      firstName?: StringFilter<'User'> | string;
      lastName?: StringFilter<'User'> | string;
      role?: StringFilter<'User'> | string;
      status?: StringFilter<'User'> | string;
      avatarUrl?: StringNullableFilter<'User'> | string | null;
      lastLoginAt?: DateTimeNullableFilter<'User'> | Date | string | null;
      createdAt?: DateTimeFilter<'User'> | Date | string;
      updatedAt?: DateTimeFilter<'User'> | Date | string;
      tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>;
      refreshTokens?: RefreshTokenListRelationFilter;
      assignedClients?: ClientListRelationFilter;
      interactions?: InteractionListRelationFilter;
      notifications?: NotificationListRelationFilter;
      auditLogs?: AuditLogListRelationFilter;
    },
    'id' | 'tenantId_email'
  >;

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder;
    tenantId?: SortOrder;
    email?: SortOrder;
    passwordHash?: SortOrder;
    firstName?: SortOrder;
    lastName?: SortOrder;
    role?: SortOrder;
    status?: SortOrder;
    avatarUrl?: SortOrderInput | SortOrder;
    lastLoginAt?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: UserCountOrderByAggregateInput;
    _max?: UserMaxOrderByAggregateInput;
    _min?: UserMinOrderByAggregateInput;
  };

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[];
    OR?: UserScalarWhereWithAggregatesInput[];
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'User'> | string;
    tenantId?: StringWithAggregatesFilter<'User'> | string;
    email?: StringWithAggregatesFilter<'User'> | string;
    passwordHash?: StringWithAggregatesFilter<'User'> | string;
    firstName?: StringWithAggregatesFilter<'User'> | string;
    lastName?: StringWithAggregatesFilter<'User'> | string;
    role?: StringWithAggregatesFilter<'User'> | string;
    status?: StringWithAggregatesFilter<'User'> | string;
    avatarUrl?: StringNullableWithAggregatesFilter<'User'> | string | null;
    lastLoginAt?: DateTimeNullableWithAggregatesFilter<'User'> | Date | string | null;
    createdAt?: DateTimeWithAggregatesFilter<'User'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'User'> | Date | string;
  };

  export type RefreshTokenWhereInput = {
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[];
    OR?: RefreshTokenWhereInput[];
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[];
    id?: StringFilter<'RefreshToken'> | string;
    userId?: StringFilter<'RefreshToken'> | string;
    tokenHash?: StringFilter<'RefreshToken'> | string;
    expiresAt?: DateTimeFilter<'RefreshToken'> | Date | string;
    createdAt?: DateTimeFilter<'RefreshToken'> | Date | string;
    revokedAt?: DateTimeNullableFilter<'RefreshToken'> | Date | string | null;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
  };

  export type RefreshTokenOrderByWithRelationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    tokenHash?: SortOrder;
    expiresAt?: SortOrder;
    createdAt?: SortOrder;
    revokedAt?: SortOrderInput | SortOrder;
    user?: UserOrderByWithRelationInput;
  };

  export type RefreshTokenWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      tokenHash?: string;
      AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[];
      OR?: RefreshTokenWhereInput[];
      NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[];
      userId?: StringFilter<'RefreshToken'> | string;
      expiresAt?: DateTimeFilter<'RefreshToken'> | Date | string;
      createdAt?: DateTimeFilter<'RefreshToken'> | Date | string;
      revokedAt?: DateTimeNullableFilter<'RefreshToken'> | Date | string | null;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    },
    'id' | 'tokenHash'
  >;

  export type RefreshTokenOrderByWithAggregationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    tokenHash?: SortOrder;
    expiresAt?: SortOrder;
    createdAt?: SortOrder;
    revokedAt?: SortOrderInput | SortOrder;
    _count?: RefreshTokenCountOrderByAggregateInput;
    _max?: RefreshTokenMaxOrderByAggregateInput;
    _min?: RefreshTokenMinOrderByAggregateInput;
  };

  export type RefreshTokenScalarWhereWithAggregatesInput = {
    AND?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[];
    OR?: RefreshTokenScalarWhereWithAggregatesInput[];
    NOT?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'RefreshToken'> | string;
    userId?: StringWithAggregatesFilter<'RefreshToken'> | string;
    tokenHash?: StringWithAggregatesFilter<'RefreshToken'> | string;
    expiresAt?: DateTimeWithAggregatesFilter<'RefreshToken'> | Date | string;
    createdAt?: DateTimeWithAggregatesFilter<'RefreshToken'> | Date | string;
    revokedAt?: DateTimeNullableWithAggregatesFilter<'RefreshToken'> | Date | string | null;
  };

  export type ClientWhereInput = {
    AND?: ClientWhereInput | ClientWhereInput[];
    OR?: ClientWhereInput[];
    NOT?: ClientWhereInput | ClientWhereInput[];
    id?: StringFilter<'Client'> | string;
    tenantId?: StringFilter<'Client'> | string;
    assignedToId?: StringNullableFilter<'Client'> | string | null;
    companyName?: StringFilter<'Client'> | string;
    contactName?: StringFilter<'Client'> | string;
    email?: StringNullableFilter<'Client'> | string | null;
    phone?: StringNullableFilter<'Client'> | string | null;
    status?: StringFilter<'Client'> | string;
    segment?: StringNullableFilter<'Client'> | string | null;
    tags?: JsonNullableFilter<'Client'>;
    customFields?: JsonNullableFilter<'Client'>;
    address?: StringNullableFilter<'Client'> | string | null;
    notes?: StringNullableFilter<'Client'> | string | null;
    createdAt?: DateTimeFilter<'Client'> | Date | string;
    updatedAt?: DateTimeFilter<'Client'> | Date | string;
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>;
    assignedTo?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null;
    interactions?: InteractionListRelationFilter;
  };

  export type ClientOrderByWithRelationInput = {
    id?: SortOrder;
    tenantId?: SortOrder;
    assignedToId?: SortOrderInput | SortOrder;
    companyName?: SortOrder;
    contactName?: SortOrder;
    email?: SortOrderInput | SortOrder;
    phone?: SortOrderInput | SortOrder;
    status?: SortOrder;
    segment?: SortOrderInput | SortOrder;
    tags?: SortOrderInput | SortOrder;
    customFields?: SortOrderInput | SortOrder;
    address?: SortOrderInput | SortOrder;
    notes?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    tenant?: TenantOrderByWithRelationInput;
    assignedTo?: UserOrderByWithRelationInput;
    interactions?: InteractionOrderByRelationAggregateInput;
  };

  export type ClientWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: ClientWhereInput | ClientWhereInput[];
      OR?: ClientWhereInput[];
      NOT?: ClientWhereInput | ClientWhereInput[];
      tenantId?: StringFilter<'Client'> | string;
      assignedToId?: StringNullableFilter<'Client'> | string | null;
      companyName?: StringFilter<'Client'> | string;
      contactName?: StringFilter<'Client'> | string;
      email?: StringNullableFilter<'Client'> | string | null;
      phone?: StringNullableFilter<'Client'> | string | null;
      status?: StringFilter<'Client'> | string;
      segment?: StringNullableFilter<'Client'> | string | null;
      tags?: JsonNullableFilter<'Client'>;
      customFields?: JsonNullableFilter<'Client'>;
      address?: StringNullableFilter<'Client'> | string | null;
      notes?: StringNullableFilter<'Client'> | string | null;
      createdAt?: DateTimeFilter<'Client'> | Date | string;
      updatedAt?: DateTimeFilter<'Client'> | Date | string;
      tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>;
      assignedTo?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null;
      interactions?: InteractionListRelationFilter;
    },
    'id'
  >;

  export type ClientOrderByWithAggregationInput = {
    id?: SortOrder;
    tenantId?: SortOrder;
    assignedToId?: SortOrderInput | SortOrder;
    companyName?: SortOrder;
    contactName?: SortOrder;
    email?: SortOrderInput | SortOrder;
    phone?: SortOrderInput | SortOrder;
    status?: SortOrder;
    segment?: SortOrderInput | SortOrder;
    tags?: SortOrderInput | SortOrder;
    customFields?: SortOrderInput | SortOrder;
    address?: SortOrderInput | SortOrder;
    notes?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: ClientCountOrderByAggregateInput;
    _max?: ClientMaxOrderByAggregateInput;
    _min?: ClientMinOrderByAggregateInput;
  };

  export type ClientScalarWhereWithAggregatesInput = {
    AND?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[];
    OR?: ClientScalarWhereWithAggregatesInput[];
    NOT?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Client'> | string;
    tenantId?: StringWithAggregatesFilter<'Client'> | string;
    assignedToId?: StringNullableWithAggregatesFilter<'Client'> | string | null;
    companyName?: StringWithAggregatesFilter<'Client'> | string;
    contactName?: StringWithAggregatesFilter<'Client'> | string;
    email?: StringNullableWithAggregatesFilter<'Client'> | string | null;
    phone?: StringNullableWithAggregatesFilter<'Client'> | string | null;
    status?: StringWithAggregatesFilter<'Client'> | string;
    segment?: StringNullableWithAggregatesFilter<'Client'> | string | null;
    tags?: JsonNullableWithAggregatesFilter<'Client'>;
    customFields?: JsonNullableWithAggregatesFilter<'Client'>;
    address?: StringNullableWithAggregatesFilter<'Client'> | string | null;
    notes?: StringNullableWithAggregatesFilter<'Client'> | string | null;
    createdAt?: DateTimeWithAggregatesFilter<'Client'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'Client'> | Date | string;
  };

  export type InteractionWhereInput = {
    AND?: InteractionWhereInput | InteractionWhereInput[];
    OR?: InteractionWhereInput[];
    NOT?: InteractionWhereInput | InteractionWhereInput[];
    id?: StringFilter<'Interaction'> | string;
    tenantId?: StringFilter<'Interaction'> | string;
    clientId?: StringFilter<'Interaction'> | string;
    userId?: StringFilter<'Interaction'> | string;
    type?: StringFilter<'Interaction'> | string;
    notes?: StringNullableFilter<'Interaction'> | string | null;
    metadata?: JsonNullableFilter<'Interaction'>;
    createdAt?: DateTimeFilter<'Interaction'> | Date | string;
    updatedAt?: DateTimeFilter<'Interaction'> | Date | string;
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>;
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
  };

  export type InteractionOrderByWithRelationInput = {
    id?: SortOrder;
    tenantId?: SortOrder;
    clientId?: SortOrder;
    userId?: SortOrder;
    type?: SortOrder;
    notes?: SortOrderInput | SortOrder;
    metadata?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    tenant?: TenantOrderByWithRelationInput;
    client?: ClientOrderByWithRelationInput;
    user?: UserOrderByWithRelationInput;
  };

  export type InteractionWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: InteractionWhereInput | InteractionWhereInput[];
      OR?: InteractionWhereInput[];
      NOT?: InteractionWhereInput | InteractionWhereInput[];
      tenantId?: StringFilter<'Interaction'> | string;
      clientId?: StringFilter<'Interaction'> | string;
      userId?: StringFilter<'Interaction'> | string;
      type?: StringFilter<'Interaction'> | string;
      notes?: StringNullableFilter<'Interaction'> | string | null;
      metadata?: JsonNullableFilter<'Interaction'>;
      createdAt?: DateTimeFilter<'Interaction'> | Date | string;
      updatedAt?: DateTimeFilter<'Interaction'> | Date | string;
      tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>;
      client?: XOR<ClientScalarRelationFilter, ClientWhereInput>;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    },
    'id'
  >;

  export type InteractionOrderByWithAggregationInput = {
    id?: SortOrder;
    tenantId?: SortOrder;
    clientId?: SortOrder;
    userId?: SortOrder;
    type?: SortOrder;
    notes?: SortOrderInput | SortOrder;
    metadata?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: InteractionCountOrderByAggregateInput;
    _max?: InteractionMaxOrderByAggregateInput;
    _min?: InteractionMinOrderByAggregateInput;
  };

  export type InteractionScalarWhereWithAggregatesInput = {
    AND?: InteractionScalarWhereWithAggregatesInput | InteractionScalarWhereWithAggregatesInput[];
    OR?: InteractionScalarWhereWithAggregatesInput[];
    NOT?: InteractionScalarWhereWithAggregatesInput | InteractionScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Interaction'> | string;
    tenantId?: StringWithAggregatesFilter<'Interaction'> | string;
    clientId?: StringWithAggregatesFilter<'Interaction'> | string;
    userId?: StringWithAggregatesFilter<'Interaction'> | string;
    type?: StringWithAggregatesFilter<'Interaction'> | string;
    notes?: StringNullableWithAggregatesFilter<'Interaction'> | string | null;
    metadata?: JsonNullableWithAggregatesFilter<'Interaction'>;
    createdAt?: DateTimeWithAggregatesFilter<'Interaction'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'Interaction'> | Date | string;
  };

  export type SegmentWhereInput = {
    AND?: SegmentWhereInput | SegmentWhereInput[];
    OR?: SegmentWhereInput[];
    NOT?: SegmentWhereInput | SegmentWhereInput[];
    id?: StringFilter<'Segment'> | string;
    tenantId?: StringFilter<'Segment'> | string;
    name?: StringFilter<'Segment'> | string;
    criteria?: JsonNullableFilter<'Segment'>;
    color?: StringNullableFilter<'Segment'> | string | null;
    createdAt?: DateTimeFilter<'Segment'> | Date | string;
    updatedAt?: DateTimeFilter<'Segment'> | Date | string;
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>;
  };

  export type SegmentOrderByWithRelationInput = {
    id?: SortOrder;
    tenantId?: SortOrder;
    name?: SortOrder;
    criteria?: SortOrderInput | SortOrder;
    color?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    tenant?: TenantOrderByWithRelationInput;
  };

  export type SegmentWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      tenantId_name?: SegmentTenantIdNameCompoundUniqueInput;
      AND?: SegmentWhereInput | SegmentWhereInput[];
      OR?: SegmentWhereInput[];
      NOT?: SegmentWhereInput | SegmentWhereInput[];
      tenantId?: StringFilter<'Segment'> | string;
      name?: StringFilter<'Segment'> | string;
      criteria?: JsonNullableFilter<'Segment'>;
      color?: StringNullableFilter<'Segment'> | string | null;
      createdAt?: DateTimeFilter<'Segment'> | Date | string;
      updatedAt?: DateTimeFilter<'Segment'> | Date | string;
      tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>;
    },
    'id' | 'tenantId_name'
  >;

  export type SegmentOrderByWithAggregationInput = {
    id?: SortOrder;
    tenantId?: SortOrder;
    name?: SortOrder;
    criteria?: SortOrderInput | SortOrder;
    color?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: SegmentCountOrderByAggregateInput;
    _max?: SegmentMaxOrderByAggregateInput;
    _min?: SegmentMinOrderByAggregateInput;
  };

  export type SegmentScalarWhereWithAggregatesInput = {
    AND?: SegmentScalarWhereWithAggregatesInput | SegmentScalarWhereWithAggregatesInput[];
    OR?: SegmentScalarWhereWithAggregatesInput[];
    NOT?: SegmentScalarWhereWithAggregatesInput | SegmentScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Segment'> | string;
    tenantId?: StringWithAggregatesFilter<'Segment'> | string;
    name?: StringWithAggregatesFilter<'Segment'> | string;
    criteria?: JsonNullableWithAggregatesFilter<'Segment'>;
    color?: StringNullableWithAggregatesFilter<'Segment'> | string | null;
    createdAt?: DateTimeWithAggregatesFilter<'Segment'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'Segment'> | Date | string;
  };

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[];
    OR?: NotificationWhereInput[];
    NOT?: NotificationWhereInput | NotificationWhereInput[];
    id?: StringFilter<'Notification'> | string;
    tenantId?: StringFilter<'Notification'> | string;
    userId?: StringFilter<'Notification'> | string;
    type?: StringFilter<'Notification'> | string;
    title?: StringFilter<'Notification'> | string;
    message?: StringNullableFilter<'Notification'> | string | null;
    data?: JsonNullableFilter<'Notification'>;
    read?: BoolFilter<'Notification'> | boolean;
    createdAt?: DateTimeFilter<'Notification'> | Date | string;
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
  };

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder;
    tenantId?: SortOrder;
    userId?: SortOrder;
    type?: SortOrder;
    title?: SortOrder;
    message?: SortOrderInput | SortOrder;
    data?: SortOrderInput | SortOrder;
    read?: SortOrder;
    createdAt?: SortOrder;
    tenant?: TenantOrderByWithRelationInput;
    user?: UserOrderByWithRelationInput;
  };

  export type NotificationWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: NotificationWhereInput | NotificationWhereInput[];
      OR?: NotificationWhereInput[];
      NOT?: NotificationWhereInput | NotificationWhereInput[];
      tenantId?: StringFilter<'Notification'> | string;
      userId?: StringFilter<'Notification'> | string;
      type?: StringFilter<'Notification'> | string;
      title?: StringFilter<'Notification'> | string;
      message?: StringNullableFilter<'Notification'> | string | null;
      data?: JsonNullableFilter<'Notification'>;
      read?: BoolFilter<'Notification'> | boolean;
      createdAt?: DateTimeFilter<'Notification'> | Date | string;
      tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    },
    'id'
  >;

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder;
    tenantId?: SortOrder;
    userId?: SortOrder;
    type?: SortOrder;
    title?: SortOrder;
    message?: SortOrderInput | SortOrder;
    data?: SortOrderInput | SortOrder;
    read?: SortOrder;
    createdAt?: SortOrder;
    _count?: NotificationCountOrderByAggregateInput;
    _max?: NotificationMaxOrderByAggregateInput;
    _min?: NotificationMinOrderByAggregateInput;
  };

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[];
    OR?: NotificationScalarWhereWithAggregatesInput[];
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Notification'> | string;
    tenantId?: StringWithAggregatesFilter<'Notification'> | string;
    userId?: StringWithAggregatesFilter<'Notification'> | string;
    type?: StringWithAggregatesFilter<'Notification'> | string;
    title?: StringWithAggregatesFilter<'Notification'> | string;
    message?: StringNullableWithAggregatesFilter<'Notification'> | string | null;
    data?: JsonNullableWithAggregatesFilter<'Notification'>;
    read?: BoolWithAggregatesFilter<'Notification'> | boolean;
    createdAt?: DateTimeWithAggregatesFilter<'Notification'> | Date | string;
  };

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[];
    OR?: AuditLogWhereInput[];
    NOT?: AuditLogWhereInput | AuditLogWhereInput[];
    id?: StringFilter<'AuditLog'> | string;
    tenantId?: StringFilter<'AuditLog'> | string;
    userId?: StringNullableFilter<'AuditLog'> | string | null;
    action?: StringFilter<'AuditLog'> | string;
    entity?: StringFilter<'AuditLog'> | string;
    entityId?: StringNullableFilter<'AuditLog'> | string | null;
    oldValues?: JsonNullableFilter<'AuditLog'>;
    newValues?: JsonNullableFilter<'AuditLog'>;
    ipAddress?: StringNullableFilter<'AuditLog'> | string | null;
    userAgent?: StringNullableFilter<'AuditLog'> | string | null;
    createdAt?: DateTimeFilter<'AuditLog'> | Date | string;
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>;
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null;
  };

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder;
    tenantId?: SortOrder;
    userId?: SortOrderInput | SortOrder;
    action?: SortOrder;
    entity?: SortOrder;
    entityId?: SortOrderInput | SortOrder;
    oldValues?: SortOrderInput | SortOrder;
    newValues?: SortOrderInput | SortOrder;
    ipAddress?: SortOrderInput | SortOrder;
    userAgent?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    tenant?: TenantOrderByWithRelationInput;
    user?: UserOrderByWithRelationInput;
  };

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: AuditLogWhereInput | AuditLogWhereInput[];
      OR?: AuditLogWhereInput[];
      NOT?: AuditLogWhereInput | AuditLogWhereInput[];
      tenantId?: StringFilter<'AuditLog'> | string;
      userId?: StringNullableFilter<'AuditLog'> | string | null;
      action?: StringFilter<'AuditLog'> | string;
      entity?: StringFilter<'AuditLog'> | string;
      entityId?: StringNullableFilter<'AuditLog'> | string | null;
      oldValues?: JsonNullableFilter<'AuditLog'>;
      newValues?: JsonNullableFilter<'AuditLog'>;
      ipAddress?: StringNullableFilter<'AuditLog'> | string | null;
      userAgent?: StringNullableFilter<'AuditLog'> | string | null;
      createdAt?: DateTimeFilter<'AuditLog'> | Date | string;
      tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>;
      user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null;
    },
    'id'
  >;

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder;
    tenantId?: SortOrder;
    userId?: SortOrderInput | SortOrder;
    action?: SortOrder;
    entity?: SortOrder;
    entityId?: SortOrderInput | SortOrder;
    oldValues?: SortOrderInput | SortOrder;
    newValues?: SortOrderInput | SortOrder;
    ipAddress?: SortOrderInput | SortOrder;
    userAgent?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    _count?: AuditLogCountOrderByAggregateInput;
    _max?: AuditLogMaxOrderByAggregateInput;
    _min?: AuditLogMinOrderByAggregateInput;
  };

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[];
    OR?: AuditLogScalarWhereWithAggregatesInput[];
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'AuditLog'> | string;
    tenantId?: StringWithAggregatesFilter<'AuditLog'> | string;
    userId?: StringNullableWithAggregatesFilter<'AuditLog'> | string | null;
    action?: StringWithAggregatesFilter<'AuditLog'> | string;
    entity?: StringWithAggregatesFilter<'AuditLog'> | string;
    entityId?: StringNullableWithAggregatesFilter<'AuditLog'> | string | null;
    oldValues?: JsonNullableWithAggregatesFilter<'AuditLog'>;
    newValues?: JsonNullableWithAggregatesFilter<'AuditLog'>;
    ipAddress?: StringNullableWithAggregatesFilter<'AuditLog'> | string | null;
    userAgent?: StringNullableWithAggregatesFilter<'AuditLog'> | string | null;
    createdAt?: DateTimeWithAggregatesFilter<'AuditLog'> | Date | string;
  };

  export type TenantCreateInput = {
    id?: string;
    name: string;
    slug: string;
    status?: string;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: UserCreateNestedManyWithoutTenantInput;
    clients?: ClientCreateNestedManyWithoutTenantInput;
    interactions?: InteractionCreateNestedManyWithoutTenantInput;
    segments?: SegmentCreateNestedManyWithoutTenantInput;
    notifications?: NotificationCreateNestedManyWithoutTenantInput;
    auditLogs?: AuditLogCreateNestedManyWithoutTenantInput;
  };

  export type TenantUncheckedCreateInput = {
    id?: string;
    name: string;
    slug: string;
    status?: string;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: UserUncheckedCreateNestedManyWithoutTenantInput;
    clients?: ClientUncheckedCreateNestedManyWithoutTenantInput;
    interactions?: InteractionUncheckedCreateNestedManyWithoutTenantInput;
    segments?: SegmentUncheckedCreateNestedManyWithoutTenantInput;
    notifications?: NotificationUncheckedCreateNestedManyWithoutTenantInput;
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutTenantInput;
  };

  export type TenantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    status?: StringFieldUpdateOperationsInput | string;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    users?: UserUpdateManyWithoutTenantNestedInput;
    clients?: ClientUpdateManyWithoutTenantNestedInput;
    interactions?: InteractionUpdateManyWithoutTenantNestedInput;
    segments?: SegmentUpdateManyWithoutTenantNestedInput;
    notifications?: NotificationUpdateManyWithoutTenantNestedInput;
    auditLogs?: AuditLogUpdateManyWithoutTenantNestedInput;
  };

  export type TenantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    status?: StringFieldUpdateOperationsInput | string;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    users?: UserUncheckedUpdateManyWithoutTenantNestedInput;
    clients?: ClientUncheckedUpdateManyWithoutTenantNestedInput;
    interactions?: InteractionUncheckedUpdateManyWithoutTenantNestedInput;
    segments?: SegmentUncheckedUpdateManyWithoutTenantNestedInput;
    notifications?: NotificationUncheckedUpdateManyWithoutTenantNestedInput;
    auditLogs?: AuditLogUncheckedUpdateManyWithoutTenantNestedInput;
  };

  export type TenantCreateManyInput = {
    id?: string;
    name: string;
    slug: string;
    status?: string;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type TenantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    status?: StringFieldUpdateOperationsInput | string;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type TenantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    status?: StringFieldUpdateOperationsInput | string;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserCreateInput = {
    id?: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    role?: string;
    status?: string;
    avatarUrl?: string | null;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: TenantCreateNestedOneWithoutUsersInput;
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput;
    assignedClients?: ClientCreateNestedManyWithoutAssignedToInput;
    interactions?: InteractionCreateNestedManyWithoutUserInput;
    notifications?: NotificationCreateNestedManyWithoutUserInput;
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    role?: string;
    status?: string;
    avatarUrl?: string | null;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    assignedClients?: ClientUncheckedCreateNestedManyWithoutAssignedToInput;
    interactions?: InteractionUncheckedCreateNestedManyWithoutUserInput;
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput;
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    status?: StringFieldUpdateOperationsInput | string;
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: TenantUpdateOneRequiredWithoutUsersNestedInput;
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput;
    assignedClients?: ClientUpdateManyWithoutAssignedToNestedInput;
    interactions?: InteractionUpdateManyWithoutUserNestedInput;
    notifications?: NotificationUpdateManyWithoutUserNestedInput;
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    tenantId?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    status?: StringFieldUpdateOperationsInput | string;
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    assignedClients?: ClientUncheckedUpdateManyWithoutAssignedToNestedInput;
    interactions?: InteractionUncheckedUpdateManyWithoutUserNestedInput;
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput;
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type UserCreateManyInput = {
    id?: string;
    tenantId: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    role?: string;
    status?: string;
    avatarUrl?: string | null;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    status?: StringFieldUpdateOperationsInput | string;
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    tenantId?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    status?: StringFieldUpdateOperationsInput | string;
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type RefreshTokenCreateInput = {
    id?: string;
    tokenHash: string;
    expiresAt: Date | string;
    createdAt?: Date | string;
    revokedAt?: Date | string | null;
    user: UserCreateNestedOneWithoutRefreshTokensInput;
  };

  export type RefreshTokenUncheckedCreateInput = {
    id?: string;
    userId: string;
    tokenHash: string;
    expiresAt: Date | string;
    createdAt?: Date | string;
    revokedAt?: Date | string | null;
  };

  export type RefreshTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    tokenHash?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: UserUpdateOneRequiredWithoutRefreshTokensNestedInput;
  };

  export type RefreshTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    tokenHash?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type RefreshTokenCreateManyInput = {
    id?: string;
    userId: string;
    tokenHash: string;
    expiresAt: Date | string;
    createdAt?: Date | string;
    revokedAt?: Date | string | null;
  };

  export type RefreshTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    tokenHash?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type RefreshTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    tokenHash?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type ClientCreateInput = {
    id?: string;
    companyName: string;
    contactName: string;
    email?: string | null;
    phone?: string | null;
    status?: string;
    segment?: string | null;
    tags?: NullableJsonNullValueInput | InputJsonValue;
    customFields?: NullableJsonNullValueInput | InputJsonValue;
    address?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: TenantCreateNestedOneWithoutClientsInput;
    assignedTo?: UserCreateNestedOneWithoutAssignedClientsInput;
    interactions?: InteractionCreateNestedManyWithoutClientInput;
  };

  export type ClientUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    assignedToId?: string | null;
    companyName: string;
    contactName: string;
    email?: string | null;
    phone?: string | null;
    status?: string;
    segment?: string | null;
    tags?: NullableJsonNullValueInput | InputJsonValue;
    customFields?: NullableJsonNullValueInput | InputJsonValue;
    address?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    interactions?: InteractionUncheckedCreateNestedManyWithoutClientInput;
  };

  export type ClientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    companyName?: StringFieldUpdateOperationsInput | string;
    contactName?: StringFieldUpdateOperationsInput | string;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    segment?: NullableStringFieldUpdateOperationsInput | string | null;
    tags?: NullableJsonNullValueInput | InputJsonValue;
    customFields?: NullableJsonNullValueInput | InputJsonValue;
    address?: NullableStringFieldUpdateOperationsInput | string | null;
    notes?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: TenantUpdateOneRequiredWithoutClientsNestedInput;
    assignedTo?: UserUpdateOneWithoutAssignedClientsNestedInput;
    interactions?: InteractionUpdateManyWithoutClientNestedInput;
  };

  export type ClientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    tenantId?: StringFieldUpdateOperationsInput | string;
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null;
    companyName?: StringFieldUpdateOperationsInput | string;
    contactName?: StringFieldUpdateOperationsInput | string;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    segment?: NullableStringFieldUpdateOperationsInput | string | null;
    tags?: NullableJsonNullValueInput | InputJsonValue;
    customFields?: NullableJsonNullValueInput | InputJsonValue;
    address?: NullableStringFieldUpdateOperationsInput | string | null;
    notes?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    interactions?: InteractionUncheckedUpdateManyWithoutClientNestedInput;
  };

  export type ClientCreateManyInput = {
    id?: string;
    tenantId: string;
    assignedToId?: string | null;
    companyName: string;
    contactName: string;
    email?: string | null;
    phone?: string | null;
    status?: string;
    segment?: string | null;
    tags?: NullableJsonNullValueInput | InputJsonValue;
    customFields?: NullableJsonNullValueInput | InputJsonValue;
    address?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ClientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    companyName?: StringFieldUpdateOperationsInput | string;
    contactName?: StringFieldUpdateOperationsInput | string;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    segment?: NullableStringFieldUpdateOperationsInput | string | null;
    tags?: NullableJsonNullValueInput | InputJsonValue;
    customFields?: NullableJsonNullValueInput | InputJsonValue;
    address?: NullableStringFieldUpdateOperationsInput | string | null;
    notes?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ClientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    tenantId?: StringFieldUpdateOperationsInput | string;
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null;
    companyName?: StringFieldUpdateOperationsInput | string;
    contactName?: StringFieldUpdateOperationsInput | string;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    segment?: NullableStringFieldUpdateOperationsInput | string | null;
    tags?: NullableJsonNullValueInput | InputJsonValue;
    customFields?: NullableJsonNullValueInput | InputJsonValue;
    address?: NullableStringFieldUpdateOperationsInput | string | null;
    notes?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type InteractionCreateInput = {
    id?: string;
    type: string;
    notes?: string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: TenantCreateNestedOneWithoutInteractionsInput;
    client: ClientCreateNestedOneWithoutInteractionsInput;
    user: UserCreateNestedOneWithoutInteractionsInput;
  };

  export type InteractionUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    clientId: string;
    userId: string;
    type: string;
    notes?: string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type InteractionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    notes?: NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: TenantUpdateOneRequiredWithoutInteractionsNestedInput;
    client?: ClientUpdateOneRequiredWithoutInteractionsNestedInput;
    user?: UserUpdateOneRequiredWithoutInteractionsNestedInput;
  };

  export type InteractionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    tenantId?: StringFieldUpdateOperationsInput | string;
    clientId?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    notes?: NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type InteractionCreateManyInput = {
    id?: string;
    tenantId: string;
    clientId: string;
    userId: string;
    type: string;
    notes?: string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type InteractionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    notes?: NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type InteractionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    tenantId?: StringFieldUpdateOperationsInput | string;
    clientId?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    notes?: NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SegmentCreateInput = {
    id?: string;
    name: string;
    criteria?: NullableJsonNullValueInput | InputJsonValue;
    color?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: TenantCreateNestedOneWithoutSegmentsInput;
  };

  export type SegmentUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    name: string;
    criteria?: NullableJsonNullValueInput | InputJsonValue;
    color?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type SegmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    criteria?: NullableJsonNullValueInput | InputJsonValue;
    color?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: TenantUpdateOneRequiredWithoutSegmentsNestedInput;
  };

  export type SegmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    tenantId?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    criteria?: NullableJsonNullValueInput | InputJsonValue;
    color?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SegmentCreateManyInput = {
    id?: string;
    tenantId: string;
    name: string;
    criteria?: NullableJsonNullValueInput | InputJsonValue;
    color?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type SegmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    criteria?: NullableJsonNullValueInput | InputJsonValue;
    color?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SegmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    tenantId?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    criteria?: NullableJsonNullValueInput | InputJsonValue;
    color?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type NotificationCreateInput = {
    id?: string;
    type: string;
    title: string;
    message?: string | null;
    data?: NullableJsonNullValueInput | InputJsonValue;
    read?: boolean;
    createdAt?: Date | string;
    tenant: TenantCreateNestedOneWithoutNotificationsInput;
    user: UserCreateNestedOneWithoutNotificationsInput;
  };

  export type NotificationUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    userId: string;
    type: string;
    title: string;
    message?: string | null;
    data?: NullableJsonNullValueInput | InputJsonValue;
    read?: boolean;
    createdAt?: Date | string;
  };

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    message?: NullableStringFieldUpdateOperationsInput | string | null;
    data?: NullableJsonNullValueInput | InputJsonValue;
    read?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: TenantUpdateOneRequiredWithoutNotificationsNestedInput;
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput;
  };

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    tenantId?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    message?: NullableStringFieldUpdateOperationsInput | string | null;
    data?: NullableJsonNullValueInput | InputJsonValue;
    read?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type NotificationCreateManyInput = {
    id?: string;
    tenantId: string;
    userId: string;
    type: string;
    title: string;
    message?: string | null;
    data?: NullableJsonNullValueInput | InputJsonValue;
    read?: boolean;
    createdAt?: Date | string;
  };

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    message?: NullableStringFieldUpdateOperationsInput | string | null;
    data?: NullableJsonNullValueInput | InputJsonValue;
    read?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    tenantId?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    message?: NullableStringFieldUpdateOperationsInput | string | null;
    data?: NullableJsonNullValueInput | InputJsonValue;
    read?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AuditLogCreateInput = {
    id?: string;
    action: string;
    entity: string;
    entityId?: string | null;
    oldValues?: NullableJsonNullValueInput | InputJsonValue;
    newValues?: NullableJsonNullValueInput | InputJsonValue;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt?: Date | string;
    tenant: TenantCreateNestedOneWithoutAuditLogsInput;
    user?: UserCreateNestedOneWithoutAuditLogsInput;
  };

  export type AuditLogUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    userId?: string | null;
    action: string;
    entity: string;
    entityId?: string | null;
    oldValues?: NullableJsonNullValueInput | InputJsonValue;
    newValues?: NullableJsonNullValueInput | InputJsonValue;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt?: Date | string;
  };

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    action?: StringFieldUpdateOperationsInput | string;
    entity?: StringFieldUpdateOperationsInput | string;
    entityId?: NullableStringFieldUpdateOperationsInput | string | null;
    oldValues?: NullableJsonNullValueInput | InputJsonValue;
    newValues?: NullableJsonNullValueInput | InputJsonValue;
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: TenantUpdateOneRequiredWithoutAuditLogsNestedInput;
    user?: UserUpdateOneWithoutAuditLogsNestedInput;
  };

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    tenantId?: StringFieldUpdateOperationsInput | string;
    userId?: NullableStringFieldUpdateOperationsInput | string | null;
    action?: StringFieldUpdateOperationsInput | string;
    entity?: StringFieldUpdateOperationsInput | string;
    entityId?: NullableStringFieldUpdateOperationsInput | string | null;
    oldValues?: NullableJsonNullValueInput | InputJsonValue;
    newValues?: NullableJsonNullValueInput | InputJsonValue;
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AuditLogCreateManyInput = {
    id?: string;
    tenantId: string;
    userId?: string | null;
    action: string;
    entity: string;
    entityId?: string | null;
    oldValues?: NullableJsonNullValueInput | InputJsonValue;
    newValues?: NullableJsonNullValueInput | InputJsonValue;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt?: Date | string;
  };

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    action?: StringFieldUpdateOperationsInput | string;
    entity?: StringFieldUpdateOperationsInput | string;
    entityId?: NullableStringFieldUpdateOperationsInput | string | null;
    oldValues?: NullableJsonNullValueInput | InputJsonValue;
    newValues?: NullableJsonNullValueInput | InputJsonValue;
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    tenantId?: StringFieldUpdateOperationsInput | string;
    userId?: NullableStringFieldUpdateOperationsInput | string | null;
    action?: StringFieldUpdateOperationsInput | string;
    entity?: StringFieldUpdateOperationsInput | string;
    entityId?: NullableStringFieldUpdateOperationsInput | string | null;
    oldValues?: NullableJsonNullValueInput | InputJsonValue;
    newValues?: NullableJsonNullValueInput | InputJsonValue;
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringFilter<$PrismaModel> | string;
  };
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonNullableFilterBase<$PrismaModel>>,
          Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>;

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    path?: string[];
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
  };

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type UserListRelationFilter = {
    every?: UserWhereInput;
    some?: UserWhereInput;
    none?: UserWhereInput;
  };

  export type ClientListRelationFilter = {
    every?: ClientWhereInput;
    some?: ClientWhereInput;
    none?: ClientWhereInput;
  };

  export type InteractionListRelationFilter = {
    every?: InteractionWhereInput;
    some?: InteractionWhereInput;
    none?: InteractionWhereInput;
  };

  export type SegmentListRelationFilter = {
    every?: SegmentWhereInput;
    some?: SegmentWhereInput;
    none?: SegmentWhereInput;
  };

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput;
    some?: NotificationWhereInput;
    none?: NotificationWhereInput;
  };

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput;
    some?: AuditLogWhereInput;
    none?: AuditLogWhereInput;
  };

  export type SortOrderInput = {
    sort: SortOrder;
    nulls?: NullsOrder;
  };

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type ClientOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type InteractionOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type SegmentOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type TenantCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    slug?: SortOrder;
    status?: SortOrder;
    settings?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type TenantMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    slug?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type TenantMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    slug?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>,
          Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>;

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    path?: string[];
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedJsonNullableFilter<$PrismaModel>;
    _max?: NestedJsonNullableFilter<$PrismaModel>;
  };

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type TenantScalarRelationFilter = {
    is?: TenantWhereInput;
    isNot?: TenantWhereInput;
  };

  export type RefreshTokenListRelationFilter = {
    every?: RefreshTokenWhereInput;
    some?: RefreshTokenWhereInput;
    none?: RefreshTokenWhereInput;
  };

  export type RefreshTokenOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type UserTenantIdEmailCompoundUniqueInput = {
    tenantId: string;
    email: string;
  };

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder;
    tenantId?: SortOrder;
    email?: SortOrder;
    passwordHash?: SortOrder;
    firstName?: SortOrder;
    lastName?: SortOrder;
    role?: SortOrder;
    status?: SortOrder;
    avatarUrl?: SortOrder;
    lastLoginAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder;
    tenantId?: SortOrder;
    email?: SortOrder;
    passwordHash?: SortOrder;
    firstName?: SortOrder;
    lastName?: SortOrder;
    role?: SortOrder;
    status?: SortOrder;
    avatarUrl?: SortOrder;
    lastLoginAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder;
    tenantId?: SortOrder;
    email?: SortOrder;
    passwordHash?: SortOrder;
    firstName?: SortOrder;
    lastName?: SortOrder;
    role?: SortOrder;
    status?: SortOrder;
    avatarUrl?: SortOrder;
    lastLoginAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: NestedDateTimeNullableFilter<$PrismaModel>;
  };

  export type UserScalarRelationFilter = {
    is?: UserWhereInput;
    isNot?: UserWhereInput;
  };

  export type RefreshTokenCountOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    tokenHash?: SortOrder;
    expiresAt?: SortOrder;
    createdAt?: SortOrder;
    revokedAt?: SortOrder;
  };

  export type RefreshTokenMaxOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    tokenHash?: SortOrder;
    expiresAt?: SortOrder;
    createdAt?: SortOrder;
    revokedAt?: SortOrder;
  };

  export type RefreshTokenMinOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    tokenHash?: SortOrder;
    expiresAt?: SortOrder;
    createdAt?: SortOrder;
    revokedAt?: SortOrder;
  };

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null;
    isNot?: UserWhereInput | null;
  };

  export type ClientCountOrderByAggregateInput = {
    id?: SortOrder;
    tenantId?: SortOrder;
    assignedToId?: SortOrder;
    companyName?: SortOrder;
    contactName?: SortOrder;
    email?: SortOrder;
    phone?: SortOrder;
    status?: SortOrder;
    segment?: SortOrder;
    tags?: SortOrder;
    customFields?: SortOrder;
    address?: SortOrder;
    notes?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ClientMaxOrderByAggregateInput = {
    id?: SortOrder;
    tenantId?: SortOrder;
    assignedToId?: SortOrder;
    companyName?: SortOrder;
    contactName?: SortOrder;
    email?: SortOrder;
    phone?: SortOrder;
    status?: SortOrder;
    segment?: SortOrder;
    address?: SortOrder;
    notes?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ClientMinOrderByAggregateInput = {
    id?: SortOrder;
    tenantId?: SortOrder;
    assignedToId?: SortOrder;
    companyName?: SortOrder;
    contactName?: SortOrder;
    email?: SortOrder;
    phone?: SortOrder;
    status?: SortOrder;
    segment?: SortOrder;
    address?: SortOrder;
    notes?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ClientScalarRelationFilter = {
    is?: ClientWhereInput;
    isNot?: ClientWhereInput;
  };

  export type InteractionCountOrderByAggregateInput = {
    id?: SortOrder;
    tenantId?: SortOrder;
    clientId?: SortOrder;
    userId?: SortOrder;
    type?: SortOrder;
    notes?: SortOrder;
    metadata?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type InteractionMaxOrderByAggregateInput = {
    id?: SortOrder;
    tenantId?: SortOrder;
    clientId?: SortOrder;
    userId?: SortOrder;
    type?: SortOrder;
    notes?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type InteractionMinOrderByAggregateInput = {
    id?: SortOrder;
    tenantId?: SortOrder;
    clientId?: SortOrder;
    userId?: SortOrder;
    type?: SortOrder;
    notes?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type SegmentTenantIdNameCompoundUniqueInput = {
    tenantId: string;
    name: string;
  };

  export type SegmentCountOrderByAggregateInput = {
    id?: SortOrder;
    tenantId?: SortOrder;
    name?: SortOrder;
    criteria?: SortOrder;
    color?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type SegmentMaxOrderByAggregateInput = {
    id?: SortOrder;
    tenantId?: SortOrder;
    name?: SortOrder;
    color?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type SegmentMinOrderByAggregateInput = {
    id?: SortOrder;
    tenantId?: SortOrder;
    name?: SortOrder;
    color?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder;
    tenantId?: SortOrder;
    userId?: SortOrder;
    type?: SortOrder;
    title?: SortOrder;
    message?: SortOrder;
    data?: SortOrder;
    read?: SortOrder;
    createdAt?: SortOrder;
  };

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder;
    tenantId?: SortOrder;
    userId?: SortOrder;
    type?: SortOrder;
    title?: SortOrder;
    message?: SortOrder;
    read?: SortOrder;
    createdAt?: SortOrder;
  };

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder;
    tenantId?: SortOrder;
    userId?: SortOrder;
    type?: SortOrder;
    title?: SortOrder;
    message?: SortOrder;
    read?: SortOrder;
    createdAt?: SortOrder;
  };

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder;
    tenantId?: SortOrder;
    userId?: SortOrder;
    action?: SortOrder;
    entity?: SortOrder;
    entityId?: SortOrder;
    oldValues?: SortOrder;
    newValues?: SortOrder;
    ipAddress?: SortOrder;
    userAgent?: SortOrder;
    createdAt?: SortOrder;
  };

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder;
    tenantId?: SortOrder;
    userId?: SortOrder;
    action?: SortOrder;
    entity?: SortOrder;
    entityId?: SortOrder;
    ipAddress?: SortOrder;
    userAgent?: SortOrder;
    createdAt?: SortOrder;
  };

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder;
    tenantId?: SortOrder;
    userId?: SortOrder;
    action?: SortOrder;
    entity?: SortOrder;
    entityId?: SortOrder;
    ipAddress?: SortOrder;
    userAgent?: SortOrder;
    createdAt?: SortOrder;
  };

  export type UserCreateNestedManyWithoutTenantInput = {
    create?:
      | XOR<UserCreateWithoutTenantInput, UserUncheckedCreateWithoutTenantInput>
      | UserCreateWithoutTenantInput[]
      | UserUncheckedCreateWithoutTenantInput[];
    connectOrCreate?:
      | UserCreateOrConnectWithoutTenantInput
      | UserCreateOrConnectWithoutTenantInput[];
    createMany?: UserCreateManyTenantInputEnvelope;
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[];
  };

  export type ClientCreateNestedManyWithoutTenantInput = {
    create?:
      | XOR<ClientCreateWithoutTenantInput, ClientUncheckedCreateWithoutTenantInput>
      | ClientCreateWithoutTenantInput[]
      | ClientUncheckedCreateWithoutTenantInput[];
    connectOrCreate?:
      | ClientCreateOrConnectWithoutTenantInput
      | ClientCreateOrConnectWithoutTenantInput[];
    createMany?: ClientCreateManyTenantInputEnvelope;
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[];
  };

  export type InteractionCreateNestedManyWithoutTenantInput = {
    create?:
      | XOR<InteractionCreateWithoutTenantInput, InteractionUncheckedCreateWithoutTenantInput>
      | InteractionCreateWithoutTenantInput[]
      | InteractionUncheckedCreateWithoutTenantInput[];
    connectOrCreate?:
      | InteractionCreateOrConnectWithoutTenantInput
      | InteractionCreateOrConnectWithoutTenantInput[];
    createMany?: InteractionCreateManyTenantInputEnvelope;
    connect?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[];
  };

  export type SegmentCreateNestedManyWithoutTenantInput = {
    create?:
      | XOR<SegmentCreateWithoutTenantInput, SegmentUncheckedCreateWithoutTenantInput>
      | SegmentCreateWithoutTenantInput[]
      | SegmentUncheckedCreateWithoutTenantInput[];
    connectOrCreate?:
      | SegmentCreateOrConnectWithoutTenantInput
      | SegmentCreateOrConnectWithoutTenantInput[];
    createMany?: SegmentCreateManyTenantInputEnvelope;
    connect?: SegmentWhereUniqueInput | SegmentWhereUniqueInput[];
  };

  export type NotificationCreateNestedManyWithoutTenantInput = {
    create?:
      | XOR<NotificationCreateWithoutTenantInput, NotificationUncheckedCreateWithoutTenantInput>
      | NotificationCreateWithoutTenantInput[]
      | NotificationUncheckedCreateWithoutTenantInput[];
    connectOrCreate?:
      | NotificationCreateOrConnectWithoutTenantInput
      | NotificationCreateOrConnectWithoutTenantInput[];
    createMany?: NotificationCreateManyTenantInputEnvelope;
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[];
  };

  export type AuditLogCreateNestedManyWithoutTenantInput = {
    create?:
      | XOR<AuditLogCreateWithoutTenantInput, AuditLogUncheckedCreateWithoutTenantInput>
      | AuditLogCreateWithoutTenantInput[]
      | AuditLogUncheckedCreateWithoutTenantInput[];
    connectOrCreate?:
      | AuditLogCreateOrConnectWithoutTenantInput
      | AuditLogCreateOrConnectWithoutTenantInput[];
    createMany?: AuditLogCreateManyTenantInputEnvelope;
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[];
  };

  export type UserUncheckedCreateNestedManyWithoutTenantInput = {
    create?:
      | XOR<UserCreateWithoutTenantInput, UserUncheckedCreateWithoutTenantInput>
      | UserCreateWithoutTenantInput[]
      | UserUncheckedCreateWithoutTenantInput[];
    connectOrCreate?:
      | UserCreateOrConnectWithoutTenantInput
      | UserCreateOrConnectWithoutTenantInput[];
    createMany?: UserCreateManyTenantInputEnvelope;
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[];
  };

  export type ClientUncheckedCreateNestedManyWithoutTenantInput = {
    create?:
      | XOR<ClientCreateWithoutTenantInput, ClientUncheckedCreateWithoutTenantInput>
      | ClientCreateWithoutTenantInput[]
      | ClientUncheckedCreateWithoutTenantInput[];
    connectOrCreate?:
      | ClientCreateOrConnectWithoutTenantInput
      | ClientCreateOrConnectWithoutTenantInput[];
    createMany?: ClientCreateManyTenantInputEnvelope;
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[];
  };

  export type InteractionUncheckedCreateNestedManyWithoutTenantInput = {
    create?:
      | XOR<InteractionCreateWithoutTenantInput, InteractionUncheckedCreateWithoutTenantInput>
      | InteractionCreateWithoutTenantInput[]
      | InteractionUncheckedCreateWithoutTenantInput[];
    connectOrCreate?:
      | InteractionCreateOrConnectWithoutTenantInput
      | InteractionCreateOrConnectWithoutTenantInput[];
    createMany?: InteractionCreateManyTenantInputEnvelope;
    connect?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[];
  };

  export type SegmentUncheckedCreateNestedManyWithoutTenantInput = {
    create?:
      | XOR<SegmentCreateWithoutTenantInput, SegmentUncheckedCreateWithoutTenantInput>
      | SegmentCreateWithoutTenantInput[]
      | SegmentUncheckedCreateWithoutTenantInput[];
    connectOrCreate?:
      | SegmentCreateOrConnectWithoutTenantInput
      | SegmentCreateOrConnectWithoutTenantInput[];
    createMany?: SegmentCreateManyTenantInputEnvelope;
    connect?: SegmentWhereUniqueInput | SegmentWhereUniqueInput[];
  };

  export type NotificationUncheckedCreateNestedManyWithoutTenantInput = {
    create?:
      | XOR<NotificationCreateWithoutTenantInput, NotificationUncheckedCreateWithoutTenantInput>
      | NotificationCreateWithoutTenantInput[]
      | NotificationUncheckedCreateWithoutTenantInput[];
    connectOrCreate?:
      | NotificationCreateOrConnectWithoutTenantInput
      | NotificationCreateOrConnectWithoutTenantInput[];
    createMany?: NotificationCreateManyTenantInputEnvelope;
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[];
  };

  export type AuditLogUncheckedCreateNestedManyWithoutTenantInput = {
    create?:
      | XOR<AuditLogCreateWithoutTenantInput, AuditLogUncheckedCreateWithoutTenantInput>
      | AuditLogCreateWithoutTenantInput[]
      | AuditLogUncheckedCreateWithoutTenantInput[];
    connectOrCreate?:
      | AuditLogCreateOrConnectWithoutTenantInput
      | AuditLogCreateOrConnectWithoutTenantInput[];
    createMany?: AuditLogCreateManyTenantInputEnvelope;
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[];
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
  };

  export type UserUpdateManyWithoutTenantNestedInput = {
    create?:
      | XOR<UserCreateWithoutTenantInput, UserUncheckedCreateWithoutTenantInput>
      | UserCreateWithoutTenantInput[]
      | UserUncheckedCreateWithoutTenantInput[];
    connectOrCreate?:
      | UserCreateOrConnectWithoutTenantInput
      | UserCreateOrConnectWithoutTenantInput[];
    upsert?:
      | UserUpsertWithWhereUniqueWithoutTenantInput
      | UserUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: UserCreateManyTenantInputEnvelope;
    set?: UserWhereUniqueInput | UserWhereUniqueInput[];
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[];
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[];
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[];
    update?:
      | UserUpdateWithWhereUniqueWithoutTenantInput
      | UserUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?:
      | UserUpdateManyWithWhereWithoutTenantInput
      | UserUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[];
  };

  export type ClientUpdateManyWithoutTenantNestedInput = {
    create?:
      | XOR<ClientCreateWithoutTenantInput, ClientUncheckedCreateWithoutTenantInput>
      | ClientCreateWithoutTenantInput[]
      | ClientUncheckedCreateWithoutTenantInput[];
    connectOrCreate?:
      | ClientCreateOrConnectWithoutTenantInput
      | ClientCreateOrConnectWithoutTenantInput[];
    upsert?:
      | ClientUpsertWithWhereUniqueWithoutTenantInput
      | ClientUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: ClientCreateManyTenantInputEnvelope;
    set?: ClientWhereUniqueInput | ClientWhereUniqueInput[];
    disconnect?: ClientWhereUniqueInput | ClientWhereUniqueInput[];
    delete?: ClientWhereUniqueInput | ClientWhereUniqueInput[];
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[];
    update?:
      | ClientUpdateWithWhereUniqueWithoutTenantInput
      | ClientUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?:
      | ClientUpdateManyWithWhereWithoutTenantInput
      | ClientUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: ClientScalarWhereInput | ClientScalarWhereInput[];
  };

  export type InteractionUpdateManyWithoutTenantNestedInput = {
    create?:
      | XOR<InteractionCreateWithoutTenantInput, InteractionUncheckedCreateWithoutTenantInput>
      | InteractionCreateWithoutTenantInput[]
      | InteractionUncheckedCreateWithoutTenantInput[];
    connectOrCreate?:
      | InteractionCreateOrConnectWithoutTenantInput
      | InteractionCreateOrConnectWithoutTenantInput[];
    upsert?:
      | InteractionUpsertWithWhereUniqueWithoutTenantInput
      | InteractionUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: InteractionCreateManyTenantInputEnvelope;
    set?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[];
    disconnect?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[];
    delete?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[];
    connect?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[];
    update?:
      | InteractionUpdateWithWhereUniqueWithoutTenantInput
      | InteractionUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?:
      | InteractionUpdateManyWithWhereWithoutTenantInput
      | InteractionUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: InteractionScalarWhereInput | InteractionScalarWhereInput[];
  };

  export type SegmentUpdateManyWithoutTenantNestedInput = {
    create?:
      | XOR<SegmentCreateWithoutTenantInput, SegmentUncheckedCreateWithoutTenantInput>
      | SegmentCreateWithoutTenantInput[]
      | SegmentUncheckedCreateWithoutTenantInput[];
    connectOrCreate?:
      | SegmentCreateOrConnectWithoutTenantInput
      | SegmentCreateOrConnectWithoutTenantInput[];
    upsert?:
      | SegmentUpsertWithWhereUniqueWithoutTenantInput
      | SegmentUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: SegmentCreateManyTenantInputEnvelope;
    set?: SegmentWhereUniqueInput | SegmentWhereUniqueInput[];
    disconnect?: SegmentWhereUniqueInput | SegmentWhereUniqueInput[];
    delete?: SegmentWhereUniqueInput | SegmentWhereUniqueInput[];
    connect?: SegmentWhereUniqueInput | SegmentWhereUniqueInput[];
    update?:
      | SegmentUpdateWithWhereUniqueWithoutTenantInput
      | SegmentUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?:
      | SegmentUpdateManyWithWhereWithoutTenantInput
      | SegmentUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: SegmentScalarWhereInput | SegmentScalarWhereInput[];
  };

  export type NotificationUpdateManyWithoutTenantNestedInput = {
    create?:
      | XOR<NotificationCreateWithoutTenantInput, NotificationUncheckedCreateWithoutTenantInput>
      | NotificationCreateWithoutTenantInput[]
      | NotificationUncheckedCreateWithoutTenantInput[];
    connectOrCreate?:
      | NotificationCreateOrConnectWithoutTenantInput
      | NotificationCreateOrConnectWithoutTenantInput[];
    upsert?:
      | NotificationUpsertWithWhereUniqueWithoutTenantInput
      | NotificationUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: NotificationCreateManyTenantInputEnvelope;
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[];
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[];
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[];
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[];
    update?:
      | NotificationUpdateWithWhereUniqueWithoutTenantInput
      | NotificationUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?:
      | NotificationUpdateManyWithWhereWithoutTenantInput
      | NotificationUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[];
  };

  export type AuditLogUpdateManyWithoutTenantNestedInput = {
    create?:
      | XOR<AuditLogCreateWithoutTenantInput, AuditLogUncheckedCreateWithoutTenantInput>
      | AuditLogCreateWithoutTenantInput[]
      | AuditLogUncheckedCreateWithoutTenantInput[];
    connectOrCreate?:
      | AuditLogCreateOrConnectWithoutTenantInput
      | AuditLogCreateOrConnectWithoutTenantInput[];
    upsert?:
      | AuditLogUpsertWithWhereUniqueWithoutTenantInput
      | AuditLogUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: AuditLogCreateManyTenantInputEnvelope;
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[];
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[];
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[];
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[];
    update?:
      | AuditLogUpdateWithWhereUniqueWithoutTenantInput
      | AuditLogUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?:
      | AuditLogUpdateManyWithWhereWithoutTenantInput
      | AuditLogUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[];
  };

  export type UserUncheckedUpdateManyWithoutTenantNestedInput = {
    create?:
      | XOR<UserCreateWithoutTenantInput, UserUncheckedCreateWithoutTenantInput>
      | UserCreateWithoutTenantInput[]
      | UserUncheckedCreateWithoutTenantInput[];
    connectOrCreate?:
      | UserCreateOrConnectWithoutTenantInput
      | UserCreateOrConnectWithoutTenantInput[];
    upsert?:
      | UserUpsertWithWhereUniqueWithoutTenantInput
      | UserUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: UserCreateManyTenantInputEnvelope;
    set?: UserWhereUniqueInput | UserWhereUniqueInput[];
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[];
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[];
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[];
    update?:
      | UserUpdateWithWhereUniqueWithoutTenantInput
      | UserUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?:
      | UserUpdateManyWithWhereWithoutTenantInput
      | UserUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[];
  };

  export type ClientUncheckedUpdateManyWithoutTenantNestedInput = {
    create?:
      | XOR<ClientCreateWithoutTenantInput, ClientUncheckedCreateWithoutTenantInput>
      | ClientCreateWithoutTenantInput[]
      | ClientUncheckedCreateWithoutTenantInput[];
    connectOrCreate?:
      | ClientCreateOrConnectWithoutTenantInput
      | ClientCreateOrConnectWithoutTenantInput[];
    upsert?:
      | ClientUpsertWithWhereUniqueWithoutTenantInput
      | ClientUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: ClientCreateManyTenantInputEnvelope;
    set?: ClientWhereUniqueInput | ClientWhereUniqueInput[];
    disconnect?: ClientWhereUniqueInput | ClientWhereUniqueInput[];
    delete?: ClientWhereUniqueInput | ClientWhereUniqueInput[];
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[];
    update?:
      | ClientUpdateWithWhereUniqueWithoutTenantInput
      | ClientUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?:
      | ClientUpdateManyWithWhereWithoutTenantInput
      | ClientUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: ClientScalarWhereInput | ClientScalarWhereInput[];
  };

  export type InteractionUncheckedUpdateManyWithoutTenantNestedInput = {
    create?:
      | XOR<InteractionCreateWithoutTenantInput, InteractionUncheckedCreateWithoutTenantInput>
      | InteractionCreateWithoutTenantInput[]
      | InteractionUncheckedCreateWithoutTenantInput[];
    connectOrCreate?:
      | InteractionCreateOrConnectWithoutTenantInput
      | InteractionCreateOrConnectWithoutTenantInput[];
    upsert?:
      | InteractionUpsertWithWhereUniqueWithoutTenantInput
      | InteractionUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: InteractionCreateManyTenantInputEnvelope;
    set?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[];
    disconnect?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[];
    delete?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[];
    connect?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[];
    update?:
      | InteractionUpdateWithWhereUniqueWithoutTenantInput
      | InteractionUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?:
      | InteractionUpdateManyWithWhereWithoutTenantInput
      | InteractionUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: InteractionScalarWhereInput | InteractionScalarWhereInput[];
  };

  export type SegmentUncheckedUpdateManyWithoutTenantNestedInput = {
    create?:
      | XOR<SegmentCreateWithoutTenantInput, SegmentUncheckedCreateWithoutTenantInput>
      | SegmentCreateWithoutTenantInput[]
      | SegmentUncheckedCreateWithoutTenantInput[];
    connectOrCreate?:
      | SegmentCreateOrConnectWithoutTenantInput
      | SegmentCreateOrConnectWithoutTenantInput[];
    upsert?:
      | SegmentUpsertWithWhereUniqueWithoutTenantInput
      | SegmentUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: SegmentCreateManyTenantInputEnvelope;
    set?: SegmentWhereUniqueInput | SegmentWhereUniqueInput[];
    disconnect?: SegmentWhereUniqueInput | SegmentWhereUniqueInput[];
    delete?: SegmentWhereUniqueInput | SegmentWhereUniqueInput[];
    connect?: SegmentWhereUniqueInput | SegmentWhereUniqueInput[];
    update?:
      | SegmentUpdateWithWhereUniqueWithoutTenantInput
      | SegmentUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?:
      | SegmentUpdateManyWithWhereWithoutTenantInput
      | SegmentUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: SegmentScalarWhereInput | SegmentScalarWhereInput[];
  };

  export type NotificationUncheckedUpdateManyWithoutTenantNestedInput = {
    create?:
      | XOR<NotificationCreateWithoutTenantInput, NotificationUncheckedCreateWithoutTenantInput>
      | NotificationCreateWithoutTenantInput[]
      | NotificationUncheckedCreateWithoutTenantInput[];
    connectOrCreate?:
      | NotificationCreateOrConnectWithoutTenantInput
      | NotificationCreateOrConnectWithoutTenantInput[];
    upsert?:
      | NotificationUpsertWithWhereUniqueWithoutTenantInput
      | NotificationUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: NotificationCreateManyTenantInputEnvelope;
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[];
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[];
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[];
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[];
    update?:
      | NotificationUpdateWithWhereUniqueWithoutTenantInput
      | NotificationUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?:
      | NotificationUpdateManyWithWhereWithoutTenantInput
      | NotificationUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[];
  };

  export type AuditLogUncheckedUpdateManyWithoutTenantNestedInput = {
    create?:
      | XOR<AuditLogCreateWithoutTenantInput, AuditLogUncheckedCreateWithoutTenantInput>
      | AuditLogCreateWithoutTenantInput[]
      | AuditLogUncheckedCreateWithoutTenantInput[];
    connectOrCreate?:
      | AuditLogCreateOrConnectWithoutTenantInput
      | AuditLogCreateOrConnectWithoutTenantInput[];
    upsert?:
      | AuditLogUpsertWithWhereUniqueWithoutTenantInput
      | AuditLogUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: AuditLogCreateManyTenantInputEnvelope;
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[];
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[];
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[];
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[];
    update?:
      | AuditLogUpdateWithWhereUniqueWithoutTenantInput
      | AuditLogUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?:
      | AuditLogUpdateManyWithWhereWithoutTenantInput
      | AuditLogUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[];
  };

  export type TenantCreateNestedOneWithoutUsersInput = {
    create?: XOR<TenantCreateWithoutUsersInput, TenantUncheckedCreateWithoutUsersInput>;
    connectOrCreate?: TenantCreateOrConnectWithoutUsersInput;
    connect?: TenantWhereUniqueInput;
  };

  export type RefreshTokenCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
      | RefreshTokenCreateWithoutUserInput[]
      | RefreshTokenUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | RefreshTokenCreateOrConnectWithoutUserInput
      | RefreshTokenCreateOrConnectWithoutUserInput[];
    createMany?: RefreshTokenCreateManyUserInputEnvelope;
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[];
  };

  export type ClientCreateNestedManyWithoutAssignedToInput = {
    create?:
      | XOR<ClientCreateWithoutAssignedToInput, ClientUncheckedCreateWithoutAssignedToInput>
      | ClientCreateWithoutAssignedToInput[]
      | ClientUncheckedCreateWithoutAssignedToInput[];
    connectOrCreate?:
      | ClientCreateOrConnectWithoutAssignedToInput
      | ClientCreateOrConnectWithoutAssignedToInput[];
    createMany?: ClientCreateManyAssignedToInputEnvelope;
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[];
  };

  export type InteractionCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<InteractionCreateWithoutUserInput, InteractionUncheckedCreateWithoutUserInput>
      | InteractionCreateWithoutUserInput[]
      | InteractionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | InteractionCreateOrConnectWithoutUserInput
      | InteractionCreateOrConnectWithoutUserInput[];
    createMany?: InteractionCreateManyUserInputEnvelope;
    connect?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[];
  };

  export type NotificationCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
      | NotificationCreateWithoutUserInput[]
      | NotificationUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | NotificationCreateOrConnectWithoutUserInput
      | NotificationCreateOrConnectWithoutUserInput[];
    createMany?: NotificationCreateManyUserInputEnvelope;
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[];
  };

  export type AuditLogCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
      | AuditLogCreateWithoutUserInput[]
      | AuditLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AuditLogCreateOrConnectWithoutUserInput
      | AuditLogCreateOrConnectWithoutUserInput[];
    createMany?: AuditLogCreateManyUserInputEnvelope;
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[];
  };

  export type RefreshTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
      | RefreshTokenCreateWithoutUserInput[]
      | RefreshTokenUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | RefreshTokenCreateOrConnectWithoutUserInput
      | RefreshTokenCreateOrConnectWithoutUserInput[];
    createMany?: RefreshTokenCreateManyUserInputEnvelope;
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[];
  };

  export type ClientUncheckedCreateNestedManyWithoutAssignedToInput = {
    create?:
      | XOR<ClientCreateWithoutAssignedToInput, ClientUncheckedCreateWithoutAssignedToInput>
      | ClientCreateWithoutAssignedToInput[]
      | ClientUncheckedCreateWithoutAssignedToInput[];
    connectOrCreate?:
      | ClientCreateOrConnectWithoutAssignedToInput
      | ClientCreateOrConnectWithoutAssignedToInput[];
    createMany?: ClientCreateManyAssignedToInputEnvelope;
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[];
  };

  export type InteractionUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<InteractionCreateWithoutUserInput, InteractionUncheckedCreateWithoutUserInput>
      | InteractionCreateWithoutUserInput[]
      | InteractionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | InteractionCreateOrConnectWithoutUserInput
      | InteractionCreateOrConnectWithoutUserInput[];
    createMany?: InteractionCreateManyUserInputEnvelope;
    connect?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[];
  };

  export type NotificationUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
      | NotificationCreateWithoutUserInput[]
      | NotificationUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | NotificationCreateOrConnectWithoutUserInput
      | NotificationCreateOrConnectWithoutUserInput[];
    createMany?: NotificationCreateManyUserInputEnvelope;
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[];
  };

  export type AuditLogUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
      | AuditLogCreateWithoutUserInput[]
      | AuditLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AuditLogCreateOrConnectWithoutUserInput
      | AuditLogCreateOrConnectWithoutUserInput[];
    createMany?: AuditLogCreateManyUserInputEnvelope;
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[];
  };

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
  };

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
  };

  export type TenantUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<TenantCreateWithoutUsersInput, TenantUncheckedCreateWithoutUsersInput>;
    connectOrCreate?: TenantCreateOrConnectWithoutUsersInput;
    upsert?: TenantUpsertWithoutUsersInput;
    connect?: TenantWhereUniqueInput;
    update?: XOR<
      XOR<TenantUpdateToOneWithWhereWithoutUsersInput, TenantUpdateWithoutUsersInput>,
      TenantUncheckedUpdateWithoutUsersInput
    >;
  };

  export type RefreshTokenUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
      | RefreshTokenCreateWithoutUserInput[]
      | RefreshTokenUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | RefreshTokenCreateOrConnectWithoutUserInput
      | RefreshTokenCreateOrConnectWithoutUserInput[];
    upsert?:
      | RefreshTokenUpsertWithWhereUniqueWithoutUserInput
      | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: RefreshTokenCreateManyUserInputEnvelope;
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[];
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[];
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[];
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[];
    update?:
      | RefreshTokenUpdateWithWhereUniqueWithoutUserInput
      | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | RefreshTokenUpdateManyWithWhereWithoutUserInput
      | RefreshTokenUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[];
  };

  export type ClientUpdateManyWithoutAssignedToNestedInput = {
    create?:
      | XOR<ClientCreateWithoutAssignedToInput, ClientUncheckedCreateWithoutAssignedToInput>
      | ClientCreateWithoutAssignedToInput[]
      | ClientUncheckedCreateWithoutAssignedToInput[];
    connectOrCreate?:
      | ClientCreateOrConnectWithoutAssignedToInput
      | ClientCreateOrConnectWithoutAssignedToInput[];
    upsert?:
      | ClientUpsertWithWhereUniqueWithoutAssignedToInput
      | ClientUpsertWithWhereUniqueWithoutAssignedToInput[];
    createMany?: ClientCreateManyAssignedToInputEnvelope;
    set?: ClientWhereUniqueInput | ClientWhereUniqueInput[];
    disconnect?: ClientWhereUniqueInput | ClientWhereUniqueInput[];
    delete?: ClientWhereUniqueInput | ClientWhereUniqueInput[];
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[];
    update?:
      | ClientUpdateWithWhereUniqueWithoutAssignedToInput
      | ClientUpdateWithWhereUniqueWithoutAssignedToInput[];
    updateMany?:
      | ClientUpdateManyWithWhereWithoutAssignedToInput
      | ClientUpdateManyWithWhereWithoutAssignedToInput[];
    deleteMany?: ClientScalarWhereInput | ClientScalarWhereInput[];
  };

  export type InteractionUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<InteractionCreateWithoutUserInput, InteractionUncheckedCreateWithoutUserInput>
      | InteractionCreateWithoutUserInput[]
      | InteractionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | InteractionCreateOrConnectWithoutUserInput
      | InteractionCreateOrConnectWithoutUserInput[];
    upsert?:
      | InteractionUpsertWithWhereUniqueWithoutUserInput
      | InteractionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: InteractionCreateManyUserInputEnvelope;
    set?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[];
    disconnect?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[];
    delete?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[];
    connect?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[];
    update?:
      | InteractionUpdateWithWhereUniqueWithoutUserInput
      | InteractionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | InteractionUpdateManyWithWhereWithoutUserInput
      | InteractionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: InteractionScalarWhereInput | InteractionScalarWhereInput[];
  };

  export type NotificationUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
      | NotificationCreateWithoutUserInput[]
      | NotificationUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | NotificationCreateOrConnectWithoutUserInput
      | NotificationCreateOrConnectWithoutUserInput[];
    upsert?:
      | NotificationUpsertWithWhereUniqueWithoutUserInput
      | NotificationUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: NotificationCreateManyUserInputEnvelope;
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[];
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[];
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[];
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[];
    update?:
      | NotificationUpdateWithWhereUniqueWithoutUserInput
      | NotificationUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | NotificationUpdateManyWithWhereWithoutUserInput
      | NotificationUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[];
  };

  export type AuditLogUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
      | AuditLogCreateWithoutUserInput[]
      | AuditLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AuditLogCreateOrConnectWithoutUserInput
      | AuditLogCreateOrConnectWithoutUserInput[];
    upsert?:
      | AuditLogUpsertWithWhereUniqueWithoutUserInput
      | AuditLogUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: AuditLogCreateManyUserInputEnvelope;
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[];
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[];
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[];
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[];
    update?:
      | AuditLogUpdateWithWhereUniqueWithoutUserInput
      | AuditLogUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | AuditLogUpdateManyWithWhereWithoutUserInput
      | AuditLogUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[];
  };

  export type RefreshTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
      | RefreshTokenCreateWithoutUserInput[]
      | RefreshTokenUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | RefreshTokenCreateOrConnectWithoutUserInput
      | RefreshTokenCreateOrConnectWithoutUserInput[];
    upsert?:
      | RefreshTokenUpsertWithWhereUniqueWithoutUserInput
      | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: RefreshTokenCreateManyUserInputEnvelope;
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[];
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[];
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[];
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[];
    update?:
      | RefreshTokenUpdateWithWhereUniqueWithoutUserInput
      | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | RefreshTokenUpdateManyWithWhereWithoutUserInput
      | RefreshTokenUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[];
  };

  export type ClientUncheckedUpdateManyWithoutAssignedToNestedInput = {
    create?:
      | XOR<ClientCreateWithoutAssignedToInput, ClientUncheckedCreateWithoutAssignedToInput>
      | ClientCreateWithoutAssignedToInput[]
      | ClientUncheckedCreateWithoutAssignedToInput[];
    connectOrCreate?:
      | ClientCreateOrConnectWithoutAssignedToInput
      | ClientCreateOrConnectWithoutAssignedToInput[];
    upsert?:
      | ClientUpsertWithWhereUniqueWithoutAssignedToInput
      | ClientUpsertWithWhereUniqueWithoutAssignedToInput[];
    createMany?: ClientCreateManyAssignedToInputEnvelope;
    set?: ClientWhereUniqueInput | ClientWhereUniqueInput[];
    disconnect?: ClientWhereUniqueInput | ClientWhereUniqueInput[];
    delete?: ClientWhereUniqueInput | ClientWhereUniqueInput[];
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[];
    update?:
      | ClientUpdateWithWhereUniqueWithoutAssignedToInput
      | ClientUpdateWithWhereUniqueWithoutAssignedToInput[];
    updateMany?:
      | ClientUpdateManyWithWhereWithoutAssignedToInput
      | ClientUpdateManyWithWhereWithoutAssignedToInput[];
    deleteMany?: ClientScalarWhereInput | ClientScalarWhereInput[];
  };

  export type InteractionUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<InteractionCreateWithoutUserInput, InteractionUncheckedCreateWithoutUserInput>
      | InteractionCreateWithoutUserInput[]
      | InteractionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | InteractionCreateOrConnectWithoutUserInput
      | InteractionCreateOrConnectWithoutUserInput[];
    upsert?:
      | InteractionUpsertWithWhereUniqueWithoutUserInput
      | InteractionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: InteractionCreateManyUserInputEnvelope;
    set?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[];
    disconnect?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[];
    delete?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[];
    connect?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[];
    update?:
      | InteractionUpdateWithWhereUniqueWithoutUserInput
      | InteractionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | InteractionUpdateManyWithWhereWithoutUserInput
      | InteractionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: InteractionScalarWhereInput | InteractionScalarWhereInput[];
  };

  export type NotificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
      | NotificationCreateWithoutUserInput[]
      | NotificationUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | NotificationCreateOrConnectWithoutUserInput
      | NotificationCreateOrConnectWithoutUserInput[];
    upsert?:
      | NotificationUpsertWithWhereUniqueWithoutUserInput
      | NotificationUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: NotificationCreateManyUserInputEnvelope;
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[];
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[];
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[];
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[];
    update?:
      | NotificationUpdateWithWhereUniqueWithoutUserInput
      | NotificationUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | NotificationUpdateManyWithWhereWithoutUserInput
      | NotificationUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[];
  };

  export type AuditLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
      | AuditLogCreateWithoutUserInput[]
      | AuditLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AuditLogCreateOrConnectWithoutUserInput
      | AuditLogCreateOrConnectWithoutUserInput[];
    upsert?:
      | AuditLogUpsertWithWhereUniqueWithoutUserInput
      | AuditLogUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: AuditLogCreateManyUserInputEnvelope;
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[];
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[];
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[];
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[];
    update?:
      | AuditLogUpdateWithWhereUniqueWithoutUserInput
      | AuditLogUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | AuditLogUpdateManyWithWhereWithoutUserInput
      | AuditLogUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[];
  };

  export type UserCreateNestedOneWithoutRefreshTokensInput = {
    create?: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>;
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokensInput;
    connect?: UserWhereUniqueInput;
  };

  export type UserUpdateOneRequiredWithoutRefreshTokensNestedInput = {
    create?: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>;
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokensInput;
    upsert?: UserUpsertWithoutRefreshTokensInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<UserUpdateToOneWithWhereWithoutRefreshTokensInput, UserUpdateWithoutRefreshTokensInput>,
      UserUncheckedUpdateWithoutRefreshTokensInput
    >;
  };

  export type TenantCreateNestedOneWithoutClientsInput = {
    create?: XOR<TenantCreateWithoutClientsInput, TenantUncheckedCreateWithoutClientsInput>;
    connectOrCreate?: TenantCreateOrConnectWithoutClientsInput;
    connect?: TenantWhereUniqueInput;
  };

  export type UserCreateNestedOneWithoutAssignedClientsInput = {
    create?: XOR<
      UserCreateWithoutAssignedClientsInput,
      UserUncheckedCreateWithoutAssignedClientsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutAssignedClientsInput;
    connect?: UserWhereUniqueInput;
  };

  export type InteractionCreateNestedManyWithoutClientInput = {
    create?:
      | XOR<InteractionCreateWithoutClientInput, InteractionUncheckedCreateWithoutClientInput>
      | InteractionCreateWithoutClientInput[]
      | InteractionUncheckedCreateWithoutClientInput[];
    connectOrCreate?:
      | InteractionCreateOrConnectWithoutClientInput
      | InteractionCreateOrConnectWithoutClientInput[];
    createMany?: InteractionCreateManyClientInputEnvelope;
    connect?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[];
  };

  export type InteractionUncheckedCreateNestedManyWithoutClientInput = {
    create?:
      | XOR<InteractionCreateWithoutClientInput, InteractionUncheckedCreateWithoutClientInput>
      | InteractionCreateWithoutClientInput[]
      | InteractionUncheckedCreateWithoutClientInput[];
    connectOrCreate?:
      | InteractionCreateOrConnectWithoutClientInput
      | InteractionCreateOrConnectWithoutClientInput[];
    createMany?: InteractionCreateManyClientInputEnvelope;
    connect?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[];
  };

  export type TenantUpdateOneRequiredWithoutClientsNestedInput = {
    create?: XOR<TenantCreateWithoutClientsInput, TenantUncheckedCreateWithoutClientsInput>;
    connectOrCreate?: TenantCreateOrConnectWithoutClientsInput;
    upsert?: TenantUpsertWithoutClientsInput;
    connect?: TenantWhereUniqueInput;
    update?: XOR<
      XOR<TenantUpdateToOneWithWhereWithoutClientsInput, TenantUpdateWithoutClientsInput>,
      TenantUncheckedUpdateWithoutClientsInput
    >;
  };

  export type UserUpdateOneWithoutAssignedClientsNestedInput = {
    create?: XOR<
      UserCreateWithoutAssignedClientsInput,
      UserUncheckedCreateWithoutAssignedClientsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutAssignedClientsInput;
    upsert?: UserUpsertWithoutAssignedClientsInput;
    disconnect?: UserWhereInput | boolean;
    delete?: UserWhereInput | boolean;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutAssignedClientsInput,
        UserUpdateWithoutAssignedClientsInput
      >,
      UserUncheckedUpdateWithoutAssignedClientsInput
    >;
  };

  export type InteractionUpdateManyWithoutClientNestedInput = {
    create?:
      | XOR<InteractionCreateWithoutClientInput, InteractionUncheckedCreateWithoutClientInput>
      | InteractionCreateWithoutClientInput[]
      | InteractionUncheckedCreateWithoutClientInput[];
    connectOrCreate?:
      | InteractionCreateOrConnectWithoutClientInput
      | InteractionCreateOrConnectWithoutClientInput[];
    upsert?:
      | InteractionUpsertWithWhereUniqueWithoutClientInput
      | InteractionUpsertWithWhereUniqueWithoutClientInput[];
    createMany?: InteractionCreateManyClientInputEnvelope;
    set?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[];
    disconnect?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[];
    delete?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[];
    connect?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[];
    update?:
      | InteractionUpdateWithWhereUniqueWithoutClientInput
      | InteractionUpdateWithWhereUniqueWithoutClientInput[];
    updateMany?:
      | InteractionUpdateManyWithWhereWithoutClientInput
      | InteractionUpdateManyWithWhereWithoutClientInput[];
    deleteMany?: InteractionScalarWhereInput | InteractionScalarWhereInput[];
  };

  export type InteractionUncheckedUpdateManyWithoutClientNestedInput = {
    create?:
      | XOR<InteractionCreateWithoutClientInput, InteractionUncheckedCreateWithoutClientInput>
      | InteractionCreateWithoutClientInput[]
      | InteractionUncheckedCreateWithoutClientInput[];
    connectOrCreate?:
      | InteractionCreateOrConnectWithoutClientInput
      | InteractionCreateOrConnectWithoutClientInput[];
    upsert?:
      | InteractionUpsertWithWhereUniqueWithoutClientInput
      | InteractionUpsertWithWhereUniqueWithoutClientInput[];
    createMany?: InteractionCreateManyClientInputEnvelope;
    set?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[];
    disconnect?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[];
    delete?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[];
    connect?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[];
    update?:
      | InteractionUpdateWithWhereUniqueWithoutClientInput
      | InteractionUpdateWithWhereUniqueWithoutClientInput[];
    updateMany?:
      | InteractionUpdateManyWithWhereWithoutClientInput
      | InteractionUpdateManyWithWhereWithoutClientInput[];
    deleteMany?: InteractionScalarWhereInput | InteractionScalarWhereInput[];
  };

  export type TenantCreateNestedOneWithoutInteractionsInput = {
    create?: XOR<
      TenantCreateWithoutInteractionsInput,
      TenantUncheckedCreateWithoutInteractionsInput
    >;
    connectOrCreate?: TenantCreateOrConnectWithoutInteractionsInput;
    connect?: TenantWhereUniqueInput;
  };

  export type ClientCreateNestedOneWithoutInteractionsInput = {
    create?: XOR<
      ClientCreateWithoutInteractionsInput,
      ClientUncheckedCreateWithoutInteractionsInput
    >;
    connectOrCreate?: ClientCreateOrConnectWithoutInteractionsInput;
    connect?: ClientWhereUniqueInput;
  };

  export type UserCreateNestedOneWithoutInteractionsInput = {
    create?: XOR<UserCreateWithoutInteractionsInput, UserUncheckedCreateWithoutInteractionsInput>;
    connectOrCreate?: UserCreateOrConnectWithoutInteractionsInput;
    connect?: UserWhereUniqueInput;
  };

  export type TenantUpdateOneRequiredWithoutInteractionsNestedInput = {
    create?: XOR<
      TenantCreateWithoutInteractionsInput,
      TenantUncheckedCreateWithoutInteractionsInput
    >;
    connectOrCreate?: TenantCreateOrConnectWithoutInteractionsInput;
    upsert?: TenantUpsertWithoutInteractionsInput;
    connect?: TenantWhereUniqueInput;
    update?: XOR<
      XOR<TenantUpdateToOneWithWhereWithoutInteractionsInput, TenantUpdateWithoutInteractionsInput>,
      TenantUncheckedUpdateWithoutInteractionsInput
    >;
  };

  export type ClientUpdateOneRequiredWithoutInteractionsNestedInput = {
    create?: XOR<
      ClientCreateWithoutInteractionsInput,
      ClientUncheckedCreateWithoutInteractionsInput
    >;
    connectOrCreate?: ClientCreateOrConnectWithoutInteractionsInput;
    upsert?: ClientUpsertWithoutInteractionsInput;
    connect?: ClientWhereUniqueInput;
    update?: XOR<
      XOR<ClientUpdateToOneWithWhereWithoutInteractionsInput, ClientUpdateWithoutInteractionsInput>,
      ClientUncheckedUpdateWithoutInteractionsInput
    >;
  };

  export type UserUpdateOneRequiredWithoutInteractionsNestedInput = {
    create?: XOR<UserCreateWithoutInteractionsInput, UserUncheckedCreateWithoutInteractionsInput>;
    connectOrCreate?: UserCreateOrConnectWithoutInteractionsInput;
    upsert?: UserUpsertWithoutInteractionsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<UserUpdateToOneWithWhereWithoutInteractionsInput, UserUpdateWithoutInteractionsInput>,
      UserUncheckedUpdateWithoutInteractionsInput
    >;
  };

  export type TenantCreateNestedOneWithoutSegmentsInput = {
    create?: XOR<TenantCreateWithoutSegmentsInput, TenantUncheckedCreateWithoutSegmentsInput>;
    connectOrCreate?: TenantCreateOrConnectWithoutSegmentsInput;
    connect?: TenantWhereUniqueInput;
  };

  export type TenantUpdateOneRequiredWithoutSegmentsNestedInput = {
    create?: XOR<TenantCreateWithoutSegmentsInput, TenantUncheckedCreateWithoutSegmentsInput>;
    connectOrCreate?: TenantCreateOrConnectWithoutSegmentsInput;
    upsert?: TenantUpsertWithoutSegmentsInput;
    connect?: TenantWhereUniqueInput;
    update?: XOR<
      XOR<TenantUpdateToOneWithWhereWithoutSegmentsInput, TenantUpdateWithoutSegmentsInput>,
      TenantUncheckedUpdateWithoutSegmentsInput
    >;
  };

  export type TenantCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<
      TenantCreateWithoutNotificationsInput,
      TenantUncheckedCreateWithoutNotificationsInput
    >;
    connectOrCreate?: TenantCreateOrConnectWithoutNotificationsInput;
    connect?: TenantWhereUniqueInput;
  };

  export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>;
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput;
    connect?: UserWhereUniqueInput;
  };

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
  };

  export type TenantUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<
      TenantCreateWithoutNotificationsInput,
      TenantUncheckedCreateWithoutNotificationsInput
    >;
    connectOrCreate?: TenantCreateOrConnectWithoutNotificationsInput;
    upsert?: TenantUpsertWithoutNotificationsInput;
    connect?: TenantWhereUniqueInput;
    update?: XOR<
      XOR<
        TenantUpdateToOneWithWhereWithoutNotificationsInput,
        TenantUpdateWithoutNotificationsInput
      >,
      TenantUncheckedUpdateWithoutNotificationsInput
    >;
  };

  export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>;
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput;
    upsert?: UserUpsertWithoutNotificationsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<UserUpdateToOneWithWhereWithoutNotificationsInput, UserUpdateWithoutNotificationsInput>,
      UserUncheckedUpdateWithoutNotificationsInput
    >;
  };

  export type TenantCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<TenantCreateWithoutAuditLogsInput, TenantUncheckedCreateWithoutAuditLogsInput>;
    connectOrCreate?: TenantCreateOrConnectWithoutAuditLogsInput;
    connect?: TenantWhereUniqueInput;
  };

  export type UserCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>;
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput;
    connect?: UserWhereUniqueInput;
  };

  export type TenantUpdateOneRequiredWithoutAuditLogsNestedInput = {
    create?: XOR<TenantCreateWithoutAuditLogsInput, TenantUncheckedCreateWithoutAuditLogsInput>;
    connectOrCreate?: TenantCreateOrConnectWithoutAuditLogsInput;
    upsert?: TenantUpsertWithoutAuditLogsInput;
    connect?: TenantWhereUniqueInput;
    update?: XOR<
      XOR<TenantUpdateToOneWithWhereWithoutAuditLogsInput, TenantUpdateWithoutAuditLogsInput>,
      TenantUncheckedUpdateWithoutAuditLogsInput
    >;
  };

  export type UserUpdateOneWithoutAuditLogsNestedInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>;
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput;
    upsert?: UserUpsertWithoutAuditLogsInput;
    disconnect?: UserWhereInput | boolean;
    delete?: UserWhereInput | boolean;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<UserUpdateToOneWithWhereWithoutAuditLogsInput, UserUpdateWithoutAuditLogsInput>,
      UserUncheckedUpdateWithoutAuditLogsInput
    >;
  };

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<NestedJsonNullableFilterBase<$PrismaModel>>,
          Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>;

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    path?: string[];
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
  };

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: NestedDateTimeNullableFilter<$PrismaModel>;
  };

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type UserCreateWithoutTenantInput = {
    id?: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    role?: string;
    status?: string;
    avatarUrl?: string | null;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput;
    assignedClients?: ClientCreateNestedManyWithoutAssignedToInput;
    interactions?: InteractionCreateNestedManyWithoutUserInput;
    notifications?: NotificationCreateNestedManyWithoutUserInput;
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutTenantInput = {
    id?: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    role?: string;
    status?: string;
    avatarUrl?: string | null;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    assignedClients?: ClientUncheckedCreateNestedManyWithoutAssignedToInput;
    interactions?: InteractionUncheckedCreateNestedManyWithoutUserInput;
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput;
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutTenantInput = {
    where: UserWhereUniqueInput;
    create: XOR<UserCreateWithoutTenantInput, UserUncheckedCreateWithoutTenantInput>;
  };

  export type UserCreateManyTenantInputEnvelope = {
    data: UserCreateManyTenantInput | UserCreateManyTenantInput[];
    skipDuplicates?: boolean;
  };

  export type ClientCreateWithoutTenantInput = {
    id?: string;
    companyName: string;
    contactName: string;
    email?: string | null;
    phone?: string | null;
    status?: string;
    segment?: string | null;
    tags?: NullableJsonNullValueInput | InputJsonValue;
    customFields?: NullableJsonNullValueInput | InputJsonValue;
    address?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    assignedTo?: UserCreateNestedOneWithoutAssignedClientsInput;
    interactions?: InteractionCreateNestedManyWithoutClientInput;
  };

  export type ClientUncheckedCreateWithoutTenantInput = {
    id?: string;
    assignedToId?: string | null;
    companyName: string;
    contactName: string;
    email?: string | null;
    phone?: string | null;
    status?: string;
    segment?: string | null;
    tags?: NullableJsonNullValueInput | InputJsonValue;
    customFields?: NullableJsonNullValueInput | InputJsonValue;
    address?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    interactions?: InteractionUncheckedCreateNestedManyWithoutClientInput;
  };

  export type ClientCreateOrConnectWithoutTenantInput = {
    where: ClientWhereUniqueInput;
    create: XOR<ClientCreateWithoutTenantInput, ClientUncheckedCreateWithoutTenantInput>;
  };

  export type ClientCreateManyTenantInputEnvelope = {
    data: ClientCreateManyTenantInput | ClientCreateManyTenantInput[];
    skipDuplicates?: boolean;
  };

  export type InteractionCreateWithoutTenantInput = {
    id?: string;
    type: string;
    notes?: string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    client: ClientCreateNestedOneWithoutInteractionsInput;
    user: UserCreateNestedOneWithoutInteractionsInput;
  };

  export type InteractionUncheckedCreateWithoutTenantInput = {
    id?: string;
    clientId: string;
    userId: string;
    type: string;
    notes?: string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type InteractionCreateOrConnectWithoutTenantInput = {
    where: InteractionWhereUniqueInput;
    create: XOR<InteractionCreateWithoutTenantInput, InteractionUncheckedCreateWithoutTenantInput>;
  };

  export type InteractionCreateManyTenantInputEnvelope = {
    data: InteractionCreateManyTenantInput | InteractionCreateManyTenantInput[];
    skipDuplicates?: boolean;
  };

  export type SegmentCreateWithoutTenantInput = {
    id?: string;
    name: string;
    criteria?: NullableJsonNullValueInput | InputJsonValue;
    color?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type SegmentUncheckedCreateWithoutTenantInput = {
    id?: string;
    name: string;
    criteria?: NullableJsonNullValueInput | InputJsonValue;
    color?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type SegmentCreateOrConnectWithoutTenantInput = {
    where: SegmentWhereUniqueInput;
    create: XOR<SegmentCreateWithoutTenantInput, SegmentUncheckedCreateWithoutTenantInput>;
  };

  export type SegmentCreateManyTenantInputEnvelope = {
    data: SegmentCreateManyTenantInput | SegmentCreateManyTenantInput[];
    skipDuplicates?: boolean;
  };

  export type NotificationCreateWithoutTenantInput = {
    id?: string;
    type: string;
    title: string;
    message?: string | null;
    data?: NullableJsonNullValueInput | InputJsonValue;
    read?: boolean;
    createdAt?: Date | string;
    user: UserCreateNestedOneWithoutNotificationsInput;
  };

  export type NotificationUncheckedCreateWithoutTenantInput = {
    id?: string;
    userId: string;
    type: string;
    title: string;
    message?: string | null;
    data?: NullableJsonNullValueInput | InputJsonValue;
    read?: boolean;
    createdAt?: Date | string;
  };

  export type NotificationCreateOrConnectWithoutTenantInput = {
    where: NotificationWhereUniqueInput;
    create: XOR<
      NotificationCreateWithoutTenantInput,
      NotificationUncheckedCreateWithoutTenantInput
    >;
  };

  export type NotificationCreateManyTenantInputEnvelope = {
    data: NotificationCreateManyTenantInput | NotificationCreateManyTenantInput[];
    skipDuplicates?: boolean;
  };

  export type AuditLogCreateWithoutTenantInput = {
    id?: string;
    action: string;
    entity: string;
    entityId?: string | null;
    oldValues?: NullableJsonNullValueInput | InputJsonValue;
    newValues?: NullableJsonNullValueInput | InputJsonValue;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt?: Date | string;
    user?: UserCreateNestedOneWithoutAuditLogsInput;
  };

  export type AuditLogUncheckedCreateWithoutTenantInput = {
    id?: string;
    userId?: string | null;
    action: string;
    entity: string;
    entityId?: string | null;
    oldValues?: NullableJsonNullValueInput | InputJsonValue;
    newValues?: NullableJsonNullValueInput | InputJsonValue;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt?: Date | string;
  };

  export type AuditLogCreateOrConnectWithoutTenantInput = {
    where: AuditLogWhereUniqueInput;
    create: XOR<AuditLogCreateWithoutTenantInput, AuditLogUncheckedCreateWithoutTenantInput>;
  };

  export type AuditLogCreateManyTenantInputEnvelope = {
    data: AuditLogCreateManyTenantInput | AuditLogCreateManyTenantInput[];
    skipDuplicates?: boolean;
  };

  export type UserUpsertWithWhereUniqueWithoutTenantInput = {
    where: UserWhereUniqueInput;
    update: XOR<UserUpdateWithoutTenantInput, UserUncheckedUpdateWithoutTenantInput>;
    create: XOR<UserCreateWithoutTenantInput, UserUncheckedCreateWithoutTenantInput>;
  };

  export type UserUpdateWithWhereUniqueWithoutTenantInput = {
    where: UserWhereUniqueInput;
    data: XOR<UserUpdateWithoutTenantInput, UserUncheckedUpdateWithoutTenantInput>;
  };

  export type UserUpdateManyWithWhereWithoutTenantInput = {
    where: UserScalarWhereInput;
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutTenantInput>;
  };

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[];
    OR?: UserScalarWhereInput[];
    NOT?: UserScalarWhereInput | UserScalarWhereInput[];
    id?: StringFilter<'User'> | string;
    tenantId?: StringFilter<'User'> | string;
    email?: StringFilter<'User'> | string;
    passwordHash?: StringFilter<'User'> | string;
    firstName?: StringFilter<'User'> | string;
    lastName?: StringFilter<'User'> | string;
    role?: StringFilter<'User'> | string;
    status?: StringFilter<'User'> | string;
    avatarUrl?: StringNullableFilter<'User'> | string | null;
    lastLoginAt?: DateTimeNullableFilter<'User'> | Date | string | null;
    createdAt?: DateTimeFilter<'User'> | Date | string;
    updatedAt?: DateTimeFilter<'User'> | Date | string;
  };

  export type ClientUpsertWithWhereUniqueWithoutTenantInput = {
    where: ClientWhereUniqueInput;
    update: XOR<ClientUpdateWithoutTenantInput, ClientUncheckedUpdateWithoutTenantInput>;
    create: XOR<ClientCreateWithoutTenantInput, ClientUncheckedCreateWithoutTenantInput>;
  };

  export type ClientUpdateWithWhereUniqueWithoutTenantInput = {
    where: ClientWhereUniqueInput;
    data: XOR<ClientUpdateWithoutTenantInput, ClientUncheckedUpdateWithoutTenantInput>;
  };

  export type ClientUpdateManyWithWhereWithoutTenantInput = {
    where: ClientScalarWhereInput;
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyWithoutTenantInput>;
  };

  export type ClientScalarWhereInput = {
    AND?: ClientScalarWhereInput | ClientScalarWhereInput[];
    OR?: ClientScalarWhereInput[];
    NOT?: ClientScalarWhereInput | ClientScalarWhereInput[];
    id?: StringFilter<'Client'> | string;
    tenantId?: StringFilter<'Client'> | string;
    assignedToId?: StringNullableFilter<'Client'> | string | null;
    companyName?: StringFilter<'Client'> | string;
    contactName?: StringFilter<'Client'> | string;
    email?: StringNullableFilter<'Client'> | string | null;
    phone?: StringNullableFilter<'Client'> | string | null;
    status?: StringFilter<'Client'> | string;
    segment?: StringNullableFilter<'Client'> | string | null;
    tags?: JsonNullableFilter<'Client'>;
    customFields?: JsonNullableFilter<'Client'>;
    address?: StringNullableFilter<'Client'> | string | null;
    notes?: StringNullableFilter<'Client'> | string | null;
    createdAt?: DateTimeFilter<'Client'> | Date | string;
    updatedAt?: DateTimeFilter<'Client'> | Date | string;
  };

  export type InteractionUpsertWithWhereUniqueWithoutTenantInput = {
    where: InteractionWhereUniqueInput;
    update: XOR<InteractionUpdateWithoutTenantInput, InteractionUncheckedUpdateWithoutTenantInput>;
    create: XOR<InteractionCreateWithoutTenantInput, InteractionUncheckedCreateWithoutTenantInput>;
  };

  export type InteractionUpdateWithWhereUniqueWithoutTenantInput = {
    where: InteractionWhereUniqueInput;
    data: XOR<InteractionUpdateWithoutTenantInput, InteractionUncheckedUpdateWithoutTenantInput>;
  };

  export type InteractionUpdateManyWithWhereWithoutTenantInput = {
    where: InteractionScalarWhereInput;
    data: XOR<InteractionUpdateManyMutationInput, InteractionUncheckedUpdateManyWithoutTenantInput>;
  };

  export type InteractionScalarWhereInput = {
    AND?: InteractionScalarWhereInput | InteractionScalarWhereInput[];
    OR?: InteractionScalarWhereInput[];
    NOT?: InteractionScalarWhereInput | InteractionScalarWhereInput[];
    id?: StringFilter<'Interaction'> | string;
    tenantId?: StringFilter<'Interaction'> | string;
    clientId?: StringFilter<'Interaction'> | string;
    userId?: StringFilter<'Interaction'> | string;
    type?: StringFilter<'Interaction'> | string;
    notes?: StringNullableFilter<'Interaction'> | string | null;
    metadata?: JsonNullableFilter<'Interaction'>;
    createdAt?: DateTimeFilter<'Interaction'> | Date | string;
    updatedAt?: DateTimeFilter<'Interaction'> | Date | string;
  };

  export type SegmentUpsertWithWhereUniqueWithoutTenantInput = {
    where: SegmentWhereUniqueInput;
    update: XOR<SegmentUpdateWithoutTenantInput, SegmentUncheckedUpdateWithoutTenantInput>;
    create: XOR<SegmentCreateWithoutTenantInput, SegmentUncheckedCreateWithoutTenantInput>;
  };

  export type SegmentUpdateWithWhereUniqueWithoutTenantInput = {
    where: SegmentWhereUniqueInput;
    data: XOR<SegmentUpdateWithoutTenantInput, SegmentUncheckedUpdateWithoutTenantInput>;
  };

  export type SegmentUpdateManyWithWhereWithoutTenantInput = {
    where: SegmentScalarWhereInput;
    data: XOR<SegmentUpdateManyMutationInput, SegmentUncheckedUpdateManyWithoutTenantInput>;
  };

  export type SegmentScalarWhereInput = {
    AND?: SegmentScalarWhereInput | SegmentScalarWhereInput[];
    OR?: SegmentScalarWhereInput[];
    NOT?: SegmentScalarWhereInput | SegmentScalarWhereInput[];
    id?: StringFilter<'Segment'> | string;
    tenantId?: StringFilter<'Segment'> | string;
    name?: StringFilter<'Segment'> | string;
    criteria?: JsonNullableFilter<'Segment'>;
    color?: StringNullableFilter<'Segment'> | string | null;
    createdAt?: DateTimeFilter<'Segment'> | Date | string;
    updatedAt?: DateTimeFilter<'Segment'> | Date | string;
  };

  export type NotificationUpsertWithWhereUniqueWithoutTenantInput = {
    where: NotificationWhereUniqueInput;
    update: XOR<
      NotificationUpdateWithoutTenantInput,
      NotificationUncheckedUpdateWithoutTenantInput
    >;
    create: XOR<
      NotificationCreateWithoutTenantInput,
      NotificationUncheckedCreateWithoutTenantInput
    >;
  };

  export type NotificationUpdateWithWhereUniqueWithoutTenantInput = {
    where: NotificationWhereUniqueInput;
    data: XOR<NotificationUpdateWithoutTenantInput, NotificationUncheckedUpdateWithoutTenantInput>;
  };

  export type NotificationUpdateManyWithWhereWithoutTenantInput = {
    where: NotificationScalarWhereInput;
    data: XOR<
      NotificationUpdateManyMutationInput,
      NotificationUncheckedUpdateManyWithoutTenantInput
    >;
  };

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[];
    OR?: NotificationScalarWhereInput[];
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[];
    id?: StringFilter<'Notification'> | string;
    tenantId?: StringFilter<'Notification'> | string;
    userId?: StringFilter<'Notification'> | string;
    type?: StringFilter<'Notification'> | string;
    title?: StringFilter<'Notification'> | string;
    message?: StringNullableFilter<'Notification'> | string | null;
    data?: JsonNullableFilter<'Notification'>;
    read?: BoolFilter<'Notification'> | boolean;
    createdAt?: DateTimeFilter<'Notification'> | Date | string;
  };

  export type AuditLogUpsertWithWhereUniqueWithoutTenantInput = {
    where: AuditLogWhereUniqueInput;
    update: XOR<AuditLogUpdateWithoutTenantInput, AuditLogUncheckedUpdateWithoutTenantInput>;
    create: XOR<AuditLogCreateWithoutTenantInput, AuditLogUncheckedCreateWithoutTenantInput>;
  };

  export type AuditLogUpdateWithWhereUniqueWithoutTenantInput = {
    where: AuditLogWhereUniqueInput;
    data: XOR<AuditLogUpdateWithoutTenantInput, AuditLogUncheckedUpdateWithoutTenantInput>;
  };

  export type AuditLogUpdateManyWithWhereWithoutTenantInput = {
    where: AuditLogScalarWhereInput;
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutTenantInput>;
  };

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[];
    OR?: AuditLogScalarWhereInput[];
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[];
    id?: StringFilter<'AuditLog'> | string;
    tenantId?: StringFilter<'AuditLog'> | string;
    userId?: StringNullableFilter<'AuditLog'> | string | null;
    action?: StringFilter<'AuditLog'> | string;
    entity?: StringFilter<'AuditLog'> | string;
    entityId?: StringNullableFilter<'AuditLog'> | string | null;
    oldValues?: JsonNullableFilter<'AuditLog'>;
    newValues?: JsonNullableFilter<'AuditLog'>;
    ipAddress?: StringNullableFilter<'AuditLog'> | string | null;
    userAgent?: StringNullableFilter<'AuditLog'> | string | null;
    createdAt?: DateTimeFilter<'AuditLog'> | Date | string;
  };

  export type TenantCreateWithoutUsersInput = {
    id?: string;
    name: string;
    slug: string;
    status?: string;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    clients?: ClientCreateNestedManyWithoutTenantInput;
    interactions?: InteractionCreateNestedManyWithoutTenantInput;
    segments?: SegmentCreateNestedManyWithoutTenantInput;
    notifications?: NotificationCreateNestedManyWithoutTenantInput;
    auditLogs?: AuditLogCreateNestedManyWithoutTenantInput;
  };

  export type TenantUncheckedCreateWithoutUsersInput = {
    id?: string;
    name: string;
    slug: string;
    status?: string;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    clients?: ClientUncheckedCreateNestedManyWithoutTenantInput;
    interactions?: InteractionUncheckedCreateNestedManyWithoutTenantInput;
    segments?: SegmentUncheckedCreateNestedManyWithoutTenantInput;
    notifications?: NotificationUncheckedCreateNestedManyWithoutTenantInput;
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutTenantInput;
  };

  export type TenantCreateOrConnectWithoutUsersInput = {
    where: TenantWhereUniqueInput;
    create: XOR<TenantCreateWithoutUsersInput, TenantUncheckedCreateWithoutUsersInput>;
  };

  export type RefreshTokenCreateWithoutUserInput = {
    id?: string;
    tokenHash: string;
    expiresAt: Date | string;
    createdAt?: Date | string;
    revokedAt?: Date | string | null;
  };

  export type RefreshTokenUncheckedCreateWithoutUserInput = {
    id?: string;
    tokenHash: string;
    expiresAt: Date | string;
    createdAt?: Date | string;
    revokedAt?: Date | string | null;
  };

  export type RefreshTokenCreateOrConnectWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput;
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>;
  };

  export type RefreshTokenCreateManyUserInputEnvelope = {
    data: RefreshTokenCreateManyUserInput | RefreshTokenCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type ClientCreateWithoutAssignedToInput = {
    id?: string;
    companyName: string;
    contactName: string;
    email?: string | null;
    phone?: string | null;
    status?: string;
    segment?: string | null;
    tags?: NullableJsonNullValueInput | InputJsonValue;
    customFields?: NullableJsonNullValueInput | InputJsonValue;
    address?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: TenantCreateNestedOneWithoutClientsInput;
    interactions?: InteractionCreateNestedManyWithoutClientInput;
  };

  export type ClientUncheckedCreateWithoutAssignedToInput = {
    id?: string;
    tenantId: string;
    companyName: string;
    contactName: string;
    email?: string | null;
    phone?: string | null;
    status?: string;
    segment?: string | null;
    tags?: NullableJsonNullValueInput | InputJsonValue;
    customFields?: NullableJsonNullValueInput | InputJsonValue;
    address?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    interactions?: InteractionUncheckedCreateNestedManyWithoutClientInput;
  };

  export type ClientCreateOrConnectWithoutAssignedToInput = {
    where: ClientWhereUniqueInput;
    create: XOR<ClientCreateWithoutAssignedToInput, ClientUncheckedCreateWithoutAssignedToInput>;
  };

  export type ClientCreateManyAssignedToInputEnvelope = {
    data: ClientCreateManyAssignedToInput | ClientCreateManyAssignedToInput[];
    skipDuplicates?: boolean;
  };

  export type InteractionCreateWithoutUserInput = {
    id?: string;
    type: string;
    notes?: string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: TenantCreateNestedOneWithoutInteractionsInput;
    client: ClientCreateNestedOneWithoutInteractionsInput;
  };

  export type InteractionUncheckedCreateWithoutUserInput = {
    id?: string;
    tenantId: string;
    clientId: string;
    type: string;
    notes?: string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type InteractionCreateOrConnectWithoutUserInput = {
    where: InteractionWhereUniqueInput;
    create: XOR<InteractionCreateWithoutUserInput, InteractionUncheckedCreateWithoutUserInput>;
  };

  export type InteractionCreateManyUserInputEnvelope = {
    data: InteractionCreateManyUserInput | InteractionCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type NotificationCreateWithoutUserInput = {
    id?: string;
    type: string;
    title: string;
    message?: string | null;
    data?: NullableJsonNullValueInput | InputJsonValue;
    read?: boolean;
    createdAt?: Date | string;
    tenant: TenantCreateNestedOneWithoutNotificationsInput;
  };

  export type NotificationUncheckedCreateWithoutUserInput = {
    id?: string;
    tenantId: string;
    type: string;
    title: string;
    message?: string | null;
    data?: NullableJsonNullValueInput | InputJsonValue;
    read?: boolean;
    createdAt?: Date | string;
  };

  export type NotificationCreateOrConnectWithoutUserInput = {
    where: NotificationWhereUniqueInput;
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>;
  };

  export type NotificationCreateManyUserInputEnvelope = {
    data: NotificationCreateManyUserInput | NotificationCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type AuditLogCreateWithoutUserInput = {
    id?: string;
    action: string;
    entity: string;
    entityId?: string | null;
    oldValues?: NullableJsonNullValueInput | InputJsonValue;
    newValues?: NullableJsonNullValueInput | InputJsonValue;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt?: Date | string;
    tenant: TenantCreateNestedOneWithoutAuditLogsInput;
  };

  export type AuditLogUncheckedCreateWithoutUserInput = {
    id?: string;
    tenantId: string;
    action: string;
    entity: string;
    entityId?: string | null;
    oldValues?: NullableJsonNullValueInput | InputJsonValue;
    newValues?: NullableJsonNullValueInput | InputJsonValue;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt?: Date | string;
  };

  export type AuditLogCreateOrConnectWithoutUserInput = {
    where: AuditLogWhereUniqueInput;
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>;
  };

  export type AuditLogCreateManyUserInputEnvelope = {
    data: AuditLogCreateManyUserInput | AuditLogCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type TenantUpsertWithoutUsersInput = {
    update: XOR<TenantUpdateWithoutUsersInput, TenantUncheckedUpdateWithoutUsersInput>;
    create: XOR<TenantCreateWithoutUsersInput, TenantUncheckedCreateWithoutUsersInput>;
    where?: TenantWhereInput;
  };

  export type TenantUpdateToOneWithWhereWithoutUsersInput = {
    where?: TenantWhereInput;
    data: XOR<TenantUpdateWithoutUsersInput, TenantUncheckedUpdateWithoutUsersInput>;
  };

  export type TenantUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    status?: StringFieldUpdateOperationsInput | string;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    clients?: ClientUpdateManyWithoutTenantNestedInput;
    interactions?: InteractionUpdateManyWithoutTenantNestedInput;
    segments?: SegmentUpdateManyWithoutTenantNestedInput;
    notifications?: NotificationUpdateManyWithoutTenantNestedInput;
    auditLogs?: AuditLogUpdateManyWithoutTenantNestedInput;
  };

  export type TenantUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    status?: StringFieldUpdateOperationsInput | string;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    clients?: ClientUncheckedUpdateManyWithoutTenantNestedInput;
    interactions?: InteractionUncheckedUpdateManyWithoutTenantNestedInput;
    segments?: SegmentUncheckedUpdateManyWithoutTenantNestedInput;
    notifications?: NotificationUncheckedUpdateManyWithoutTenantNestedInput;
    auditLogs?: AuditLogUncheckedUpdateManyWithoutTenantNestedInput;
  };

  export type RefreshTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput;
    update: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>;
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>;
  };

  export type RefreshTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput;
    data: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>;
  };

  export type RefreshTokenUpdateManyWithWhereWithoutUserInput = {
    where: RefreshTokenScalarWhereInput;
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyWithoutUserInput>;
  };

  export type RefreshTokenScalarWhereInput = {
    AND?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[];
    OR?: RefreshTokenScalarWhereInput[];
    NOT?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[];
    id?: StringFilter<'RefreshToken'> | string;
    userId?: StringFilter<'RefreshToken'> | string;
    tokenHash?: StringFilter<'RefreshToken'> | string;
    expiresAt?: DateTimeFilter<'RefreshToken'> | Date | string;
    createdAt?: DateTimeFilter<'RefreshToken'> | Date | string;
    revokedAt?: DateTimeNullableFilter<'RefreshToken'> | Date | string | null;
  };

  export type ClientUpsertWithWhereUniqueWithoutAssignedToInput = {
    where: ClientWhereUniqueInput;
    update: XOR<ClientUpdateWithoutAssignedToInput, ClientUncheckedUpdateWithoutAssignedToInput>;
    create: XOR<ClientCreateWithoutAssignedToInput, ClientUncheckedCreateWithoutAssignedToInput>;
  };

  export type ClientUpdateWithWhereUniqueWithoutAssignedToInput = {
    where: ClientWhereUniqueInput;
    data: XOR<ClientUpdateWithoutAssignedToInput, ClientUncheckedUpdateWithoutAssignedToInput>;
  };

  export type ClientUpdateManyWithWhereWithoutAssignedToInput = {
    where: ClientScalarWhereInput;
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyWithoutAssignedToInput>;
  };

  export type InteractionUpsertWithWhereUniqueWithoutUserInput = {
    where: InteractionWhereUniqueInput;
    update: XOR<InteractionUpdateWithoutUserInput, InteractionUncheckedUpdateWithoutUserInput>;
    create: XOR<InteractionCreateWithoutUserInput, InteractionUncheckedCreateWithoutUserInput>;
  };

  export type InteractionUpdateWithWhereUniqueWithoutUserInput = {
    where: InteractionWhereUniqueInput;
    data: XOR<InteractionUpdateWithoutUserInput, InteractionUncheckedUpdateWithoutUserInput>;
  };

  export type InteractionUpdateManyWithWhereWithoutUserInput = {
    where: InteractionScalarWhereInput;
    data: XOR<InteractionUpdateManyMutationInput, InteractionUncheckedUpdateManyWithoutUserInput>;
  };

  export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput;
    update: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>;
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>;
  };

  export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput;
    data: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>;
  };

  export type NotificationUpdateManyWithWhereWithoutUserInput = {
    where: NotificationScalarWhereInput;
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutUserInput>;
  };

  export type AuditLogUpsertWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput;
    update: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>;
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>;
  };

  export type AuditLogUpdateWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput;
    data: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>;
  };

  export type AuditLogUpdateManyWithWhereWithoutUserInput = {
    where: AuditLogScalarWhereInput;
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutUserInput>;
  };

  export type UserCreateWithoutRefreshTokensInput = {
    id?: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    role?: string;
    status?: string;
    avatarUrl?: string | null;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: TenantCreateNestedOneWithoutUsersInput;
    assignedClients?: ClientCreateNestedManyWithoutAssignedToInput;
    interactions?: InteractionCreateNestedManyWithoutUserInput;
    notifications?: NotificationCreateNestedManyWithoutUserInput;
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutRefreshTokensInput = {
    id?: string;
    tenantId: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    role?: string;
    status?: string;
    avatarUrl?: string | null;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    assignedClients?: ClientUncheckedCreateNestedManyWithoutAssignedToInput;
    interactions?: InteractionUncheckedCreateNestedManyWithoutUserInput;
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput;
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutRefreshTokensInput = {
    where: UserWhereUniqueInput;
    create: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>;
  };

  export type UserUpsertWithoutRefreshTokensInput = {
    update: XOR<UserUpdateWithoutRefreshTokensInput, UserUncheckedUpdateWithoutRefreshTokensInput>;
    create: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutRefreshTokensInput = {
    where?: UserWhereInput;
    data: XOR<UserUpdateWithoutRefreshTokensInput, UserUncheckedUpdateWithoutRefreshTokensInput>;
  };

  export type UserUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    status?: StringFieldUpdateOperationsInput | string;
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: TenantUpdateOneRequiredWithoutUsersNestedInput;
    assignedClients?: ClientUpdateManyWithoutAssignedToNestedInput;
    interactions?: InteractionUpdateManyWithoutUserNestedInput;
    notifications?: NotificationUpdateManyWithoutUserNestedInput;
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string;
    tenantId?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    status?: StringFieldUpdateOperationsInput | string;
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    assignedClients?: ClientUncheckedUpdateManyWithoutAssignedToNestedInput;
    interactions?: InteractionUncheckedUpdateManyWithoutUserNestedInput;
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput;
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type TenantCreateWithoutClientsInput = {
    id?: string;
    name: string;
    slug: string;
    status?: string;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: UserCreateNestedManyWithoutTenantInput;
    interactions?: InteractionCreateNestedManyWithoutTenantInput;
    segments?: SegmentCreateNestedManyWithoutTenantInput;
    notifications?: NotificationCreateNestedManyWithoutTenantInput;
    auditLogs?: AuditLogCreateNestedManyWithoutTenantInput;
  };

  export type TenantUncheckedCreateWithoutClientsInput = {
    id?: string;
    name: string;
    slug: string;
    status?: string;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: UserUncheckedCreateNestedManyWithoutTenantInput;
    interactions?: InteractionUncheckedCreateNestedManyWithoutTenantInput;
    segments?: SegmentUncheckedCreateNestedManyWithoutTenantInput;
    notifications?: NotificationUncheckedCreateNestedManyWithoutTenantInput;
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutTenantInput;
  };

  export type TenantCreateOrConnectWithoutClientsInput = {
    where: TenantWhereUniqueInput;
    create: XOR<TenantCreateWithoutClientsInput, TenantUncheckedCreateWithoutClientsInput>;
  };

  export type UserCreateWithoutAssignedClientsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    role?: string;
    status?: string;
    avatarUrl?: string | null;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: TenantCreateNestedOneWithoutUsersInput;
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput;
    interactions?: InteractionCreateNestedManyWithoutUserInput;
    notifications?: NotificationCreateNestedManyWithoutUserInput;
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutAssignedClientsInput = {
    id?: string;
    tenantId: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    role?: string;
    status?: string;
    avatarUrl?: string | null;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    interactions?: InteractionUncheckedCreateNestedManyWithoutUserInput;
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput;
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutAssignedClientsInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutAssignedClientsInput,
      UserUncheckedCreateWithoutAssignedClientsInput
    >;
  };

  export type InteractionCreateWithoutClientInput = {
    id?: string;
    type: string;
    notes?: string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: TenantCreateNestedOneWithoutInteractionsInput;
    user: UserCreateNestedOneWithoutInteractionsInput;
  };

  export type InteractionUncheckedCreateWithoutClientInput = {
    id?: string;
    tenantId: string;
    userId: string;
    type: string;
    notes?: string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type InteractionCreateOrConnectWithoutClientInput = {
    where: InteractionWhereUniqueInput;
    create: XOR<InteractionCreateWithoutClientInput, InteractionUncheckedCreateWithoutClientInput>;
  };

  export type InteractionCreateManyClientInputEnvelope = {
    data: InteractionCreateManyClientInput | InteractionCreateManyClientInput[];
    skipDuplicates?: boolean;
  };

  export type TenantUpsertWithoutClientsInput = {
    update: XOR<TenantUpdateWithoutClientsInput, TenantUncheckedUpdateWithoutClientsInput>;
    create: XOR<TenantCreateWithoutClientsInput, TenantUncheckedCreateWithoutClientsInput>;
    where?: TenantWhereInput;
  };

  export type TenantUpdateToOneWithWhereWithoutClientsInput = {
    where?: TenantWhereInput;
    data: XOR<TenantUpdateWithoutClientsInput, TenantUncheckedUpdateWithoutClientsInput>;
  };

  export type TenantUpdateWithoutClientsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    status?: StringFieldUpdateOperationsInput | string;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    users?: UserUpdateManyWithoutTenantNestedInput;
    interactions?: InteractionUpdateManyWithoutTenantNestedInput;
    segments?: SegmentUpdateManyWithoutTenantNestedInput;
    notifications?: NotificationUpdateManyWithoutTenantNestedInput;
    auditLogs?: AuditLogUpdateManyWithoutTenantNestedInput;
  };

  export type TenantUncheckedUpdateWithoutClientsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    status?: StringFieldUpdateOperationsInput | string;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    users?: UserUncheckedUpdateManyWithoutTenantNestedInput;
    interactions?: InteractionUncheckedUpdateManyWithoutTenantNestedInput;
    segments?: SegmentUncheckedUpdateManyWithoutTenantNestedInput;
    notifications?: NotificationUncheckedUpdateManyWithoutTenantNestedInput;
    auditLogs?: AuditLogUncheckedUpdateManyWithoutTenantNestedInput;
  };

  export type UserUpsertWithoutAssignedClientsInput = {
    update: XOR<
      UserUpdateWithoutAssignedClientsInput,
      UserUncheckedUpdateWithoutAssignedClientsInput
    >;
    create: XOR<
      UserCreateWithoutAssignedClientsInput,
      UserUncheckedCreateWithoutAssignedClientsInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutAssignedClientsInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutAssignedClientsInput,
      UserUncheckedUpdateWithoutAssignedClientsInput
    >;
  };

  export type UserUpdateWithoutAssignedClientsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    status?: StringFieldUpdateOperationsInput | string;
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: TenantUpdateOneRequiredWithoutUsersNestedInput;
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput;
    interactions?: InteractionUpdateManyWithoutUserNestedInput;
    notifications?: NotificationUpdateManyWithoutUserNestedInput;
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutAssignedClientsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    tenantId?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    status?: StringFieldUpdateOperationsInput | string;
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    interactions?: InteractionUncheckedUpdateManyWithoutUserNestedInput;
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput;
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type InteractionUpsertWithWhereUniqueWithoutClientInput = {
    where: InteractionWhereUniqueInput;
    update: XOR<InteractionUpdateWithoutClientInput, InteractionUncheckedUpdateWithoutClientInput>;
    create: XOR<InteractionCreateWithoutClientInput, InteractionUncheckedCreateWithoutClientInput>;
  };

  export type InteractionUpdateWithWhereUniqueWithoutClientInput = {
    where: InteractionWhereUniqueInput;
    data: XOR<InteractionUpdateWithoutClientInput, InteractionUncheckedUpdateWithoutClientInput>;
  };

  export type InteractionUpdateManyWithWhereWithoutClientInput = {
    where: InteractionScalarWhereInput;
    data: XOR<InteractionUpdateManyMutationInput, InteractionUncheckedUpdateManyWithoutClientInput>;
  };

  export type TenantCreateWithoutInteractionsInput = {
    id?: string;
    name: string;
    slug: string;
    status?: string;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: UserCreateNestedManyWithoutTenantInput;
    clients?: ClientCreateNestedManyWithoutTenantInput;
    segments?: SegmentCreateNestedManyWithoutTenantInput;
    notifications?: NotificationCreateNestedManyWithoutTenantInput;
    auditLogs?: AuditLogCreateNestedManyWithoutTenantInput;
  };

  export type TenantUncheckedCreateWithoutInteractionsInput = {
    id?: string;
    name: string;
    slug: string;
    status?: string;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: UserUncheckedCreateNestedManyWithoutTenantInput;
    clients?: ClientUncheckedCreateNestedManyWithoutTenantInput;
    segments?: SegmentUncheckedCreateNestedManyWithoutTenantInput;
    notifications?: NotificationUncheckedCreateNestedManyWithoutTenantInput;
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutTenantInput;
  };

  export type TenantCreateOrConnectWithoutInteractionsInput = {
    where: TenantWhereUniqueInput;
    create: XOR<
      TenantCreateWithoutInteractionsInput,
      TenantUncheckedCreateWithoutInteractionsInput
    >;
  };

  export type ClientCreateWithoutInteractionsInput = {
    id?: string;
    companyName: string;
    contactName: string;
    email?: string | null;
    phone?: string | null;
    status?: string;
    segment?: string | null;
    tags?: NullableJsonNullValueInput | InputJsonValue;
    customFields?: NullableJsonNullValueInput | InputJsonValue;
    address?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: TenantCreateNestedOneWithoutClientsInput;
    assignedTo?: UserCreateNestedOneWithoutAssignedClientsInput;
  };

  export type ClientUncheckedCreateWithoutInteractionsInput = {
    id?: string;
    tenantId: string;
    assignedToId?: string | null;
    companyName: string;
    contactName: string;
    email?: string | null;
    phone?: string | null;
    status?: string;
    segment?: string | null;
    tags?: NullableJsonNullValueInput | InputJsonValue;
    customFields?: NullableJsonNullValueInput | InputJsonValue;
    address?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ClientCreateOrConnectWithoutInteractionsInput = {
    where: ClientWhereUniqueInput;
    create: XOR<
      ClientCreateWithoutInteractionsInput,
      ClientUncheckedCreateWithoutInteractionsInput
    >;
  };

  export type UserCreateWithoutInteractionsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    role?: string;
    status?: string;
    avatarUrl?: string | null;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: TenantCreateNestedOneWithoutUsersInput;
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput;
    assignedClients?: ClientCreateNestedManyWithoutAssignedToInput;
    notifications?: NotificationCreateNestedManyWithoutUserInput;
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutInteractionsInput = {
    id?: string;
    tenantId: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    role?: string;
    status?: string;
    avatarUrl?: string | null;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    assignedClients?: ClientUncheckedCreateNestedManyWithoutAssignedToInput;
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput;
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutInteractionsInput = {
    where: UserWhereUniqueInput;
    create: XOR<UserCreateWithoutInteractionsInput, UserUncheckedCreateWithoutInteractionsInput>;
  };

  export type TenantUpsertWithoutInteractionsInput = {
    update: XOR<
      TenantUpdateWithoutInteractionsInput,
      TenantUncheckedUpdateWithoutInteractionsInput
    >;
    create: XOR<
      TenantCreateWithoutInteractionsInput,
      TenantUncheckedCreateWithoutInteractionsInput
    >;
    where?: TenantWhereInput;
  };

  export type TenantUpdateToOneWithWhereWithoutInteractionsInput = {
    where?: TenantWhereInput;
    data: XOR<TenantUpdateWithoutInteractionsInput, TenantUncheckedUpdateWithoutInteractionsInput>;
  };

  export type TenantUpdateWithoutInteractionsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    status?: StringFieldUpdateOperationsInput | string;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    users?: UserUpdateManyWithoutTenantNestedInput;
    clients?: ClientUpdateManyWithoutTenantNestedInput;
    segments?: SegmentUpdateManyWithoutTenantNestedInput;
    notifications?: NotificationUpdateManyWithoutTenantNestedInput;
    auditLogs?: AuditLogUpdateManyWithoutTenantNestedInput;
  };

  export type TenantUncheckedUpdateWithoutInteractionsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    status?: StringFieldUpdateOperationsInput | string;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    users?: UserUncheckedUpdateManyWithoutTenantNestedInput;
    clients?: ClientUncheckedUpdateManyWithoutTenantNestedInput;
    segments?: SegmentUncheckedUpdateManyWithoutTenantNestedInput;
    notifications?: NotificationUncheckedUpdateManyWithoutTenantNestedInput;
    auditLogs?: AuditLogUncheckedUpdateManyWithoutTenantNestedInput;
  };

  export type ClientUpsertWithoutInteractionsInput = {
    update: XOR<
      ClientUpdateWithoutInteractionsInput,
      ClientUncheckedUpdateWithoutInteractionsInput
    >;
    create: XOR<
      ClientCreateWithoutInteractionsInput,
      ClientUncheckedCreateWithoutInteractionsInput
    >;
    where?: ClientWhereInput;
  };

  export type ClientUpdateToOneWithWhereWithoutInteractionsInput = {
    where?: ClientWhereInput;
    data: XOR<ClientUpdateWithoutInteractionsInput, ClientUncheckedUpdateWithoutInteractionsInput>;
  };

  export type ClientUpdateWithoutInteractionsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    companyName?: StringFieldUpdateOperationsInput | string;
    contactName?: StringFieldUpdateOperationsInput | string;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    segment?: NullableStringFieldUpdateOperationsInput | string | null;
    tags?: NullableJsonNullValueInput | InputJsonValue;
    customFields?: NullableJsonNullValueInput | InputJsonValue;
    address?: NullableStringFieldUpdateOperationsInput | string | null;
    notes?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: TenantUpdateOneRequiredWithoutClientsNestedInput;
    assignedTo?: UserUpdateOneWithoutAssignedClientsNestedInput;
  };

  export type ClientUncheckedUpdateWithoutInteractionsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    tenantId?: StringFieldUpdateOperationsInput | string;
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null;
    companyName?: StringFieldUpdateOperationsInput | string;
    contactName?: StringFieldUpdateOperationsInput | string;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    segment?: NullableStringFieldUpdateOperationsInput | string | null;
    tags?: NullableJsonNullValueInput | InputJsonValue;
    customFields?: NullableJsonNullValueInput | InputJsonValue;
    address?: NullableStringFieldUpdateOperationsInput | string | null;
    notes?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserUpsertWithoutInteractionsInput = {
    update: XOR<UserUpdateWithoutInteractionsInput, UserUncheckedUpdateWithoutInteractionsInput>;
    create: XOR<UserCreateWithoutInteractionsInput, UserUncheckedCreateWithoutInteractionsInput>;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutInteractionsInput = {
    where?: UserWhereInput;
    data: XOR<UserUpdateWithoutInteractionsInput, UserUncheckedUpdateWithoutInteractionsInput>;
  };

  export type UserUpdateWithoutInteractionsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    status?: StringFieldUpdateOperationsInput | string;
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: TenantUpdateOneRequiredWithoutUsersNestedInput;
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput;
    assignedClients?: ClientUpdateManyWithoutAssignedToNestedInput;
    notifications?: NotificationUpdateManyWithoutUserNestedInput;
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutInteractionsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    tenantId?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    status?: StringFieldUpdateOperationsInput | string;
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    assignedClients?: ClientUncheckedUpdateManyWithoutAssignedToNestedInput;
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput;
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type TenantCreateWithoutSegmentsInput = {
    id?: string;
    name: string;
    slug: string;
    status?: string;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: UserCreateNestedManyWithoutTenantInput;
    clients?: ClientCreateNestedManyWithoutTenantInput;
    interactions?: InteractionCreateNestedManyWithoutTenantInput;
    notifications?: NotificationCreateNestedManyWithoutTenantInput;
    auditLogs?: AuditLogCreateNestedManyWithoutTenantInput;
  };

  export type TenantUncheckedCreateWithoutSegmentsInput = {
    id?: string;
    name: string;
    slug: string;
    status?: string;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: UserUncheckedCreateNestedManyWithoutTenantInput;
    clients?: ClientUncheckedCreateNestedManyWithoutTenantInput;
    interactions?: InteractionUncheckedCreateNestedManyWithoutTenantInput;
    notifications?: NotificationUncheckedCreateNestedManyWithoutTenantInput;
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutTenantInput;
  };

  export type TenantCreateOrConnectWithoutSegmentsInput = {
    where: TenantWhereUniqueInput;
    create: XOR<TenantCreateWithoutSegmentsInput, TenantUncheckedCreateWithoutSegmentsInput>;
  };

  export type TenantUpsertWithoutSegmentsInput = {
    update: XOR<TenantUpdateWithoutSegmentsInput, TenantUncheckedUpdateWithoutSegmentsInput>;
    create: XOR<TenantCreateWithoutSegmentsInput, TenantUncheckedCreateWithoutSegmentsInput>;
    where?: TenantWhereInput;
  };

  export type TenantUpdateToOneWithWhereWithoutSegmentsInput = {
    where?: TenantWhereInput;
    data: XOR<TenantUpdateWithoutSegmentsInput, TenantUncheckedUpdateWithoutSegmentsInput>;
  };

  export type TenantUpdateWithoutSegmentsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    status?: StringFieldUpdateOperationsInput | string;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    users?: UserUpdateManyWithoutTenantNestedInput;
    clients?: ClientUpdateManyWithoutTenantNestedInput;
    interactions?: InteractionUpdateManyWithoutTenantNestedInput;
    notifications?: NotificationUpdateManyWithoutTenantNestedInput;
    auditLogs?: AuditLogUpdateManyWithoutTenantNestedInput;
  };

  export type TenantUncheckedUpdateWithoutSegmentsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    status?: StringFieldUpdateOperationsInput | string;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    users?: UserUncheckedUpdateManyWithoutTenantNestedInput;
    clients?: ClientUncheckedUpdateManyWithoutTenantNestedInput;
    interactions?: InteractionUncheckedUpdateManyWithoutTenantNestedInput;
    notifications?: NotificationUncheckedUpdateManyWithoutTenantNestedInput;
    auditLogs?: AuditLogUncheckedUpdateManyWithoutTenantNestedInput;
  };

  export type TenantCreateWithoutNotificationsInput = {
    id?: string;
    name: string;
    slug: string;
    status?: string;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: UserCreateNestedManyWithoutTenantInput;
    clients?: ClientCreateNestedManyWithoutTenantInput;
    interactions?: InteractionCreateNestedManyWithoutTenantInput;
    segments?: SegmentCreateNestedManyWithoutTenantInput;
    auditLogs?: AuditLogCreateNestedManyWithoutTenantInput;
  };

  export type TenantUncheckedCreateWithoutNotificationsInput = {
    id?: string;
    name: string;
    slug: string;
    status?: string;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: UserUncheckedCreateNestedManyWithoutTenantInput;
    clients?: ClientUncheckedCreateNestedManyWithoutTenantInput;
    interactions?: InteractionUncheckedCreateNestedManyWithoutTenantInput;
    segments?: SegmentUncheckedCreateNestedManyWithoutTenantInput;
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutTenantInput;
  };

  export type TenantCreateOrConnectWithoutNotificationsInput = {
    where: TenantWhereUniqueInput;
    create: XOR<
      TenantCreateWithoutNotificationsInput,
      TenantUncheckedCreateWithoutNotificationsInput
    >;
  };

  export type UserCreateWithoutNotificationsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    role?: string;
    status?: string;
    avatarUrl?: string | null;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: TenantCreateNestedOneWithoutUsersInput;
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput;
    assignedClients?: ClientCreateNestedManyWithoutAssignedToInput;
    interactions?: InteractionCreateNestedManyWithoutUserInput;
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: string;
    tenantId: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    role?: string;
    status?: string;
    avatarUrl?: string | null;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    assignedClients?: ClientUncheckedCreateNestedManyWithoutAssignedToInput;
    interactions?: InteractionUncheckedCreateNestedManyWithoutUserInput;
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutNotificationsInput = {
    where: UserWhereUniqueInput;
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>;
  };

  export type TenantUpsertWithoutNotificationsInput = {
    update: XOR<
      TenantUpdateWithoutNotificationsInput,
      TenantUncheckedUpdateWithoutNotificationsInput
    >;
    create: XOR<
      TenantCreateWithoutNotificationsInput,
      TenantUncheckedCreateWithoutNotificationsInput
    >;
    where?: TenantWhereInput;
  };

  export type TenantUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: TenantWhereInput;
    data: XOR<
      TenantUpdateWithoutNotificationsInput,
      TenantUncheckedUpdateWithoutNotificationsInput
    >;
  };

  export type TenantUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    status?: StringFieldUpdateOperationsInput | string;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    users?: UserUpdateManyWithoutTenantNestedInput;
    clients?: ClientUpdateManyWithoutTenantNestedInput;
    interactions?: InteractionUpdateManyWithoutTenantNestedInput;
    segments?: SegmentUpdateManyWithoutTenantNestedInput;
    auditLogs?: AuditLogUpdateManyWithoutTenantNestedInput;
  };

  export type TenantUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    status?: StringFieldUpdateOperationsInput | string;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    users?: UserUncheckedUpdateManyWithoutTenantNestedInput;
    clients?: ClientUncheckedUpdateManyWithoutTenantNestedInput;
    interactions?: InteractionUncheckedUpdateManyWithoutTenantNestedInput;
    segments?: SegmentUncheckedUpdateManyWithoutTenantNestedInput;
    auditLogs?: AuditLogUncheckedUpdateManyWithoutTenantNestedInput;
  };

  export type UserUpsertWithoutNotificationsInput = {
    update: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>;
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: UserWhereInput;
    data: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>;
  };

  export type UserUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    status?: StringFieldUpdateOperationsInput | string;
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: TenantUpdateOneRequiredWithoutUsersNestedInput;
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput;
    assignedClients?: ClientUpdateManyWithoutAssignedToNestedInput;
    interactions?: InteractionUpdateManyWithoutUserNestedInput;
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    tenantId?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    status?: StringFieldUpdateOperationsInput | string;
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    assignedClients?: ClientUncheckedUpdateManyWithoutAssignedToNestedInput;
    interactions?: InteractionUncheckedUpdateManyWithoutUserNestedInput;
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type TenantCreateWithoutAuditLogsInput = {
    id?: string;
    name: string;
    slug: string;
    status?: string;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: UserCreateNestedManyWithoutTenantInput;
    clients?: ClientCreateNestedManyWithoutTenantInput;
    interactions?: InteractionCreateNestedManyWithoutTenantInput;
    segments?: SegmentCreateNestedManyWithoutTenantInput;
    notifications?: NotificationCreateNestedManyWithoutTenantInput;
  };

  export type TenantUncheckedCreateWithoutAuditLogsInput = {
    id?: string;
    name: string;
    slug: string;
    status?: string;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: UserUncheckedCreateNestedManyWithoutTenantInput;
    clients?: ClientUncheckedCreateNestedManyWithoutTenantInput;
    interactions?: InteractionUncheckedCreateNestedManyWithoutTenantInput;
    segments?: SegmentUncheckedCreateNestedManyWithoutTenantInput;
    notifications?: NotificationUncheckedCreateNestedManyWithoutTenantInput;
  };

  export type TenantCreateOrConnectWithoutAuditLogsInput = {
    where: TenantWhereUniqueInput;
    create: XOR<TenantCreateWithoutAuditLogsInput, TenantUncheckedCreateWithoutAuditLogsInput>;
  };

  export type UserCreateWithoutAuditLogsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    role?: string;
    status?: string;
    avatarUrl?: string | null;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: TenantCreateNestedOneWithoutUsersInput;
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput;
    assignedClients?: ClientCreateNestedManyWithoutAssignedToInput;
    interactions?: InteractionCreateNestedManyWithoutUserInput;
    notifications?: NotificationCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutAuditLogsInput = {
    id?: string;
    tenantId: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    role?: string;
    status?: string;
    avatarUrl?: string | null;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    assignedClients?: ClientUncheckedCreateNestedManyWithoutAssignedToInput;
    interactions?: InteractionUncheckedCreateNestedManyWithoutUserInput;
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutAuditLogsInput = {
    where: UserWhereUniqueInput;
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>;
  };

  export type TenantUpsertWithoutAuditLogsInput = {
    update: XOR<TenantUpdateWithoutAuditLogsInput, TenantUncheckedUpdateWithoutAuditLogsInput>;
    create: XOR<TenantCreateWithoutAuditLogsInput, TenantUncheckedCreateWithoutAuditLogsInput>;
    where?: TenantWhereInput;
  };

  export type TenantUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: TenantWhereInput;
    data: XOR<TenantUpdateWithoutAuditLogsInput, TenantUncheckedUpdateWithoutAuditLogsInput>;
  };

  export type TenantUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    status?: StringFieldUpdateOperationsInput | string;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    users?: UserUpdateManyWithoutTenantNestedInput;
    clients?: ClientUpdateManyWithoutTenantNestedInput;
    interactions?: InteractionUpdateManyWithoutTenantNestedInput;
    segments?: SegmentUpdateManyWithoutTenantNestedInput;
    notifications?: NotificationUpdateManyWithoutTenantNestedInput;
  };

  export type TenantUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    status?: StringFieldUpdateOperationsInput | string;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    users?: UserUncheckedUpdateManyWithoutTenantNestedInput;
    clients?: ClientUncheckedUpdateManyWithoutTenantNestedInput;
    interactions?: InteractionUncheckedUpdateManyWithoutTenantNestedInput;
    segments?: SegmentUncheckedUpdateManyWithoutTenantNestedInput;
    notifications?: NotificationUncheckedUpdateManyWithoutTenantNestedInput;
  };

  export type UserUpsertWithoutAuditLogsInput = {
    update: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>;
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: UserWhereInput;
    data: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>;
  };

  export type UserUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    status?: StringFieldUpdateOperationsInput | string;
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: TenantUpdateOneRequiredWithoutUsersNestedInput;
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput;
    assignedClients?: ClientUpdateManyWithoutAssignedToNestedInput;
    interactions?: InteractionUpdateManyWithoutUserNestedInput;
    notifications?: NotificationUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    tenantId?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    status?: StringFieldUpdateOperationsInput | string;
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    assignedClients?: ClientUncheckedUpdateManyWithoutAssignedToNestedInput;
    interactions?: InteractionUncheckedUpdateManyWithoutUserNestedInput;
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type UserCreateManyTenantInput = {
    id?: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    role?: string;
    status?: string;
    avatarUrl?: string | null;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ClientCreateManyTenantInput = {
    id?: string;
    assignedToId?: string | null;
    companyName: string;
    contactName: string;
    email?: string | null;
    phone?: string | null;
    status?: string;
    segment?: string | null;
    tags?: NullableJsonNullValueInput | InputJsonValue;
    customFields?: NullableJsonNullValueInput | InputJsonValue;
    address?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type InteractionCreateManyTenantInput = {
    id?: string;
    clientId: string;
    userId: string;
    type: string;
    notes?: string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type SegmentCreateManyTenantInput = {
    id?: string;
    name: string;
    criteria?: NullableJsonNullValueInput | InputJsonValue;
    color?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type NotificationCreateManyTenantInput = {
    id?: string;
    userId: string;
    type: string;
    title: string;
    message?: string | null;
    data?: NullableJsonNullValueInput | InputJsonValue;
    read?: boolean;
    createdAt?: Date | string;
  };

  export type AuditLogCreateManyTenantInput = {
    id?: string;
    userId?: string | null;
    action: string;
    entity: string;
    entityId?: string | null;
    oldValues?: NullableJsonNullValueInput | InputJsonValue;
    newValues?: NullableJsonNullValueInput | InputJsonValue;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt?: Date | string;
  };

  export type UserUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    status?: StringFieldUpdateOperationsInput | string;
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput;
    assignedClients?: ClientUpdateManyWithoutAssignedToNestedInput;
    interactions?: InteractionUpdateManyWithoutUserNestedInput;
    notifications?: NotificationUpdateManyWithoutUserNestedInput;
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    status?: StringFieldUpdateOperationsInput | string;
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    assignedClients?: ClientUncheckedUpdateManyWithoutAssignedToNestedInput;
    interactions?: InteractionUncheckedUpdateManyWithoutUserNestedInput;
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput;
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    status?: StringFieldUpdateOperationsInput | string;
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ClientUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string;
    companyName?: StringFieldUpdateOperationsInput | string;
    contactName?: StringFieldUpdateOperationsInput | string;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    segment?: NullableStringFieldUpdateOperationsInput | string | null;
    tags?: NullableJsonNullValueInput | InputJsonValue;
    customFields?: NullableJsonNullValueInput | InputJsonValue;
    address?: NullableStringFieldUpdateOperationsInput | string | null;
    notes?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    assignedTo?: UserUpdateOneWithoutAssignedClientsNestedInput;
    interactions?: InteractionUpdateManyWithoutClientNestedInput;
  };

  export type ClientUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string;
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null;
    companyName?: StringFieldUpdateOperationsInput | string;
    contactName?: StringFieldUpdateOperationsInput | string;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    segment?: NullableStringFieldUpdateOperationsInput | string | null;
    tags?: NullableJsonNullValueInput | InputJsonValue;
    customFields?: NullableJsonNullValueInput | InputJsonValue;
    address?: NullableStringFieldUpdateOperationsInput | string | null;
    notes?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    interactions?: InteractionUncheckedUpdateManyWithoutClientNestedInput;
  };

  export type ClientUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string;
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null;
    companyName?: StringFieldUpdateOperationsInput | string;
    contactName?: StringFieldUpdateOperationsInput | string;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    segment?: NullableStringFieldUpdateOperationsInput | string | null;
    tags?: NullableJsonNullValueInput | InputJsonValue;
    customFields?: NullableJsonNullValueInput | InputJsonValue;
    address?: NullableStringFieldUpdateOperationsInput | string | null;
    notes?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type InteractionUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    notes?: NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    client?: ClientUpdateOneRequiredWithoutInteractionsNestedInput;
    user?: UserUpdateOneRequiredWithoutInteractionsNestedInput;
  };

  export type InteractionUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string;
    clientId?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    notes?: NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type InteractionUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string;
    clientId?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    notes?: NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SegmentUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    criteria?: NullableJsonNullValueInput | InputJsonValue;
    color?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SegmentUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    criteria?: NullableJsonNullValueInput | InputJsonValue;
    color?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SegmentUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    criteria?: NullableJsonNullValueInput | InputJsonValue;
    color?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type NotificationUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    message?: NullableStringFieldUpdateOperationsInput | string | null;
    data?: NullableJsonNullValueInput | InputJsonValue;
    read?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput;
  };

  export type NotificationUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    message?: NullableStringFieldUpdateOperationsInput | string | null;
    data?: NullableJsonNullValueInput | InputJsonValue;
    read?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type NotificationUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    message?: NullableStringFieldUpdateOperationsInput | string | null;
    data?: NullableJsonNullValueInput | InputJsonValue;
    read?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AuditLogUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string;
    action?: StringFieldUpdateOperationsInput | string;
    entity?: StringFieldUpdateOperationsInput | string;
    entityId?: NullableStringFieldUpdateOperationsInput | string | null;
    oldValues?: NullableJsonNullValueInput | InputJsonValue;
    newValues?: NullableJsonNullValueInput | InputJsonValue;
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneWithoutAuditLogsNestedInput;
  };

  export type AuditLogUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: NullableStringFieldUpdateOperationsInput | string | null;
    action?: StringFieldUpdateOperationsInput | string;
    entity?: StringFieldUpdateOperationsInput | string;
    entityId?: NullableStringFieldUpdateOperationsInput | string | null;
    oldValues?: NullableJsonNullValueInput | InputJsonValue;
    newValues?: NullableJsonNullValueInput | InputJsonValue;
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AuditLogUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: NullableStringFieldUpdateOperationsInput | string | null;
    action?: StringFieldUpdateOperationsInput | string;
    entity?: StringFieldUpdateOperationsInput | string;
    entityId?: NullableStringFieldUpdateOperationsInput | string | null;
    oldValues?: NullableJsonNullValueInput | InputJsonValue;
    newValues?: NullableJsonNullValueInput | InputJsonValue;
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type RefreshTokenCreateManyUserInput = {
    id?: string;
    tokenHash: string;
    expiresAt: Date | string;
    createdAt?: Date | string;
    revokedAt?: Date | string | null;
  };

  export type ClientCreateManyAssignedToInput = {
    id?: string;
    tenantId: string;
    companyName: string;
    contactName: string;
    email?: string | null;
    phone?: string | null;
    status?: string;
    segment?: string | null;
    tags?: NullableJsonNullValueInput | InputJsonValue;
    customFields?: NullableJsonNullValueInput | InputJsonValue;
    address?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type InteractionCreateManyUserInput = {
    id?: string;
    tenantId: string;
    clientId: string;
    type: string;
    notes?: string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type NotificationCreateManyUserInput = {
    id?: string;
    tenantId: string;
    type: string;
    title: string;
    message?: string | null;
    data?: NullableJsonNullValueInput | InputJsonValue;
    read?: boolean;
    createdAt?: Date | string;
  };

  export type AuditLogCreateManyUserInput = {
    id?: string;
    tenantId: string;
    action: string;
    entity: string;
    entityId?: string | null;
    oldValues?: NullableJsonNullValueInput | InputJsonValue;
    newValues?: NullableJsonNullValueInput | InputJsonValue;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt?: Date | string;
  };

  export type RefreshTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    tokenHash?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type RefreshTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    tokenHash?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type RefreshTokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    tokenHash?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type ClientUpdateWithoutAssignedToInput = {
    id?: StringFieldUpdateOperationsInput | string;
    companyName?: StringFieldUpdateOperationsInput | string;
    contactName?: StringFieldUpdateOperationsInput | string;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    segment?: NullableStringFieldUpdateOperationsInput | string | null;
    tags?: NullableJsonNullValueInput | InputJsonValue;
    customFields?: NullableJsonNullValueInput | InputJsonValue;
    address?: NullableStringFieldUpdateOperationsInput | string | null;
    notes?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: TenantUpdateOneRequiredWithoutClientsNestedInput;
    interactions?: InteractionUpdateManyWithoutClientNestedInput;
  };

  export type ClientUncheckedUpdateWithoutAssignedToInput = {
    id?: StringFieldUpdateOperationsInput | string;
    tenantId?: StringFieldUpdateOperationsInput | string;
    companyName?: StringFieldUpdateOperationsInput | string;
    contactName?: StringFieldUpdateOperationsInput | string;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    segment?: NullableStringFieldUpdateOperationsInput | string | null;
    tags?: NullableJsonNullValueInput | InputJsonValue;
    customFields?: NullableJsonNullValueInput | InputJsonValue;
    address?: NullableStringFieldUpdateOperationsInput | string | null;
    notes?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    interactions?: InteractionUncheckedUpdateManyWithoutClientNestedInput;
  };

  export type ClientUncheckedUpdateManyWithoutAssignedToInput = {
    id?: StringFieldUpdateOperationsInput | string;
    tenantId?: StringFieldUpdateOperationsInput | string;
    companyName?: StringFieldUpdateOperationsInput | string;
    contactName?: StringFieldUpdateOperationsInput | string;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    segment?: NullableStringFieldUpdateOperationsInput | string | null;
    tags?: NullableJsonNullValueInput | InputJsonValue;
    customFields?: NullableJsonNullValueInput | InputJsonValue;
    address?: NullableStringFieldUpdateOperationsInput | string | null;
    notes?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type InteractionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    notes?: NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: TenantUpdateOneRequiredWithoutInteractionsNestedInput;
    client?: ClientUpdateOneRequiredWithoutInteractionsNestedInput;
  };

  export type InteractionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    tenantId?: StringFieldUpdateOperationsInput | string;
    clientId?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    notes?: NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type InteractionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    tenantId?: StringFieldUpdateOperationsInput | string;
    clientId?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    notes?: NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type NotificationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    message?: NullableStringFieldUpdateOperationsInput | string | null;
    data?: NullableJsonNullValueInput | InputJsonValue;
    read?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: TenantUpdateOneRequiredWithoutNotificationsNestedInput;
  };

  export type NotificationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    tenantId?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    message?: NullableStringFieldUpdateOperationsInput | string | null;
    data?: NullableJsonNullValueInput | InputJsonValue;
    read?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type NotificationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    tenantId?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    message?: NullableStringFieldUpdateOperationsInput | string | null;
    data?: NullableJsonNullValueInput | InputJsonValue;
    read?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AuditLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    action?: StringFieldUpdateOperationsInput | string;
    entity?: StringFieldUpdateOperationsInput | string;
    entityId?: NullableStringFieldUpdateOperationsInput | string | null;
    oldValues?: NullableJsonNullValueInput | InputJsonValue;
    newValues?: NullableJsonNullValueInput | InputJsonValue;
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: TenantUpdateOneRequiredWithoutAuditLogsNestedInput;
  };

  export type AuditLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    tenantId?: StringFieldUpdateOperationsInput | string;
    action?: StringFieldUpdateOperationsInput | string;
    entity?: StringFieldUpdateOperationsInput | string;
    entityId?: NullableStringFieldUpdateOperationsInput | string | null;
    oldValues?: NullableJsonNullValueInput | InputJsonValue;
    newValues?: NullableJsonNullValueInput | InputJsonValue;
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AuditLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    tenantId?: StringFieldUpdateOperationsInput | string;
    action?: StringFieldUpdateOperationsInput | string;
    entity?: StringFieldUpdateOperationsInput | string;
    entityId?: NullableStringFieldUpdateOperationsInput | string | null;
    oldValues?: NullableJsonNullValueInput | InputJsonValue;
    newValues?: NullableJsonNullValueInput | InputJsonValue;
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type InteractionCreateManyClientInput = {
    id?: string;
    tenantId: string;
    userId: string;
    type: string;
    notes?: string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type InteractionUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    notes?: NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: TenantUpdateOneRequiredWithoutInteractionsNestedInput;
    user?: UserUpdateOneRequiredWithoutInteractionsNestedInput;
  };

  export type InteractionUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string;
    tenantId?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    notes?: NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type InteractionUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string;
    tenantId?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    notes?: NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number;
  };

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF;
}
