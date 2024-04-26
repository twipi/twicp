/* eslint-disable */
import _m0 from "protobufjs/minimal.js"
import { Timestamp } from "./google/protobuf/timestamp.js"
import { Service } from "./twicmd.js"
import { OptionValue } from "./twicmdcfg.js"

export const protobufPackage = "twid"

export interface LoginPhase1Request {
  phoneNumber: string
}

export interface LoginPhase2Request {
  phoneNumber: string
  code: string
}

export interface LoginResponse {
  token: string
  expiresAt: Date | undefined
}

export interface ListServicesRequest {}

export interface ListServicesResponse {
  services: ServiceListItem[]
}

export interface ServiceListItem {
  name: string
  description: string
  humanName?: string | undefined
  websiteUrl?: string | undefined
  iconUrl?: string | undefined
  color?: string | undefined
}

export interface GetServiceRequest {}

export interface GetServiceResponse {
  service: Service | undefined
}

export interface GetControlPanelRequest {}

export interface GetControlPanelResponse {
  service: Service | undefined
  values: OptionValue[]
}

function createBaseLoginPhase1Request(): LoginPhase1Request {
  return { phoneNumber: "" }
}

export const LoginPhase1Request = {
  encode(message: LoginPhase1Request, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.phoneNumber !== "") {
      writer.uint32(10).string(message.phoneNumber)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoginPhase1Request {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseLoginPhase1Request()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.phoneNumber = reader.string()
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): LoginPhase1Request {
    return { phoneNumber: isSet(object.phoneNumber) ? globalThis.String(object.phoneNumber) : "" }
  },

  toJSON(message: LoginPhase1Request): unknown {
    const obj: any = {}
    if (message.phoneNumber !== "") {
      obj.phoneNumber = message.phoneNumber
    }
    return obj
  },

  create<I extends Exact<DeepPartial<LoginPhase1Request>, I>>(base?: I): LoginPhase1Request {
    return LoginPhase1Request.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<LoginPhase1Request>, I>>(object: I): LoginPhase1Request {
    const message = createBaseLoginPhase1Request()
    message.phoneNumber = object.phoneNumber ?? ""
    return message
  },
}

function createBaseLoginPhase2Request(): LoginPhase2Request {
  return { phoneNumber: "", code: "" }
}

export const LoginPhase2Request = {
  encode(message: LoginPhase2Request, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.phoneNumber !== "") {
      writer.uint32(10).string(message.phoneNumber)
    }
    if (message.code !== "") {
      writer.uint32(18).string(message.code)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoginPhase2Request {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseLoginPhase2Request()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.phoneNumber = reader.string()
          continue
        case 2:
          if (tag !== 18) {
            break
          }

          message.code = reader.string()
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): LoginPhase2Request {
    return {
      phoneNumber: isSet(object.phoneNumber) ? globalThis.String(object.phoneNumber) : "",
      code: isSet(object.code) ? globalThis.String(object.code) : "",
    }
  },

  toJSON(message: LoginPhase2Request): unknown {
    const obj: any = {}
    if (message.phoneNumber !== "") {
      obj.phoneNumber = message.phoneNumber
    }
    if (message.code !== "") {
      obj.code = message.code
    }
    return obj
  },

  create<I extends Exact<DeepPartial<LoginPhase2Request>, I>>(base?: I): LoginPhase2Request {
    return LoginPhase2Request.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<LoginPhase2Request>, I>>(object: I): LoginPhase2Request {
    const message = createBaseLoginPhase2Request()
    message.phoneNumber = object.phoneNumber ?? ""
    message.code = object.code ?? ""
    return message
  },
}

function createBaseLoginResponse(): LoginResponse {
  return { token: "", expiresAt: undefined }
}

export const LoginResponse = {
  encode(message: LoginResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token)
    }
    if (message.expiresAt !== undefined) {
      Timestamp.encode(toTimestamp(message.expiresAt), writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoginResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseLoginResponse()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.token = reader.string()
          continue
        case 2:
          if (tag !== 18) {
            break
          }

          message.expiresAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()))
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): LoginResponse {
    return {
      token: isSet(object.token) ? globalThis.String(object.token) : "",
      expiresAt: isSet(object.expiresAt) ? fromJsonTimestamp(object.expiresAt) : undefined,
    }
  },

  toJSON(message: LoginResponse): unknown {
    const obj: any = {}
    if (message.token !== "") {
      obj.token = message.token
    }
    if (message.expiresAt !== undefined) {
      obj.expiresAt = message.expiresAt.toISOString()
    }
    return obj
  },

  create<I extends Exact<DeepPartial<LoginResponse>, I>>(base?: I): LoginResponse {
    return LoginResponse.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<LoginResponse>, I>>(object: I): LoginResponse {
    const message = createBaseLoginResponse()
    message.token = object.token ?? ""
    message.expiresAt = object.expiresAt ?? undefined
    return message
  },
}

function createBaseListServicesRequest(): ListServicesRequest {
  return {}
}

export const ListServicesRequest = {
  encode(_: ListServicesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListServicesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseListServicesRequest()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(_: any): ListServicesRequest {
    return {}
  },

  toJSON(_: ListServicesRequest): unknown {
    const obj: any = {}
    return obj
  },

  create<I extends Exact<DeepPartial<ListServicesRequest>, I>>(base?: I): ListServicesRequest {
    return ListServicesRequest.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<ListServicesRequest>, I>>(_: I): ListServicesRequest {
    const message = createBaseListServicesRequest()
    return message
  },
}

function createBaseListServicesResponse(): ListServicesResponse {
  return { services: [] }
}

export const ListServicesResponse = {
  encode(message: ListServicesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.services) {
      ServiceListItem.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListServicesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseListServicesResponse()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.services.push(ServiceListItem.decode(reader, reader.uint32()))
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): ListServicesResponse {
    return {
      services: globalThis.Array.isArray(object?.services)
        ? object.services.map((e: any) => ServiceListItem.fromJSON(e))
        : [],
    }
  },

  toJSON(message: ListServicesResponse): unknown {
    const obj: any = {}
    if (message.services?.length) {
      obj.services = message.services.map((e) => ServiceListItem.toJSON(e))
    }
    return obj
  },

  create<I extends Exact<DeepPartial<ListServicesResponse>, I>>(base?: I): ListServicesResponse {
    return ListServicesResponse.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<ListServicesResponse>, I>>(
    object: I,
  ): ListServicesResponse {
    const message = createBaseListServicesResponse()
    message.services = object.services?.map((e) => ServiceListItem.fromPartial(e)) || []
    return message
  },
}

function createBaseServiceListItem(): ServiceListItem {
  return {
    name: "",
    description: "",
    humanName: undefined,
    websiteUrl: undefined,
    iconUrl: undefined,
    color: undefined,
  }
}

export const ServiceListItem = {
  encode(message: ServiceListItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name)
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description)
    }
    if (message.humanName !== undefined) {
      writer.uint32(58).string(message.humanName)
    }
    if (message.websiteUrl !== undefined) {
      writer.uint32(66).string(message.websiteUrl)
    }
    if (message.iconUrl !== undefined) {
      writer.uint32(34).string(message.iconUrl)
    }
    if (message.color !== undefined) {
      writer.uint32(42).string(message.color)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ServiceListItem {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseServiceListItem()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.name = reader.string()
          continue
        case 3:
          if (tag !== 26) {
            break
          }

          message.description = reader.string()
          continue
        case 7:
          if (tag !== 58) {
            break
          }

          message.humanName = reader.string()
          continue
        case 8:
          if (tag !== 66) {
            break
          }

          message.websiteUrl = reader.string()
          continue
        case 4:
          if (tag !== 34) {
            break
          }

          message.iconUrl = reader.string()
          continue
        case 5:
          if (tag !== 42) {
            break
          }

          message.color = reader.string()
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): ServiceListItem {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      humanName: isSet(object.humanName) ? globalThis.String(object.humanName) : undefined,
      websiteUrl: isSet(object.websiteUrl) ? globalThis.String(object.websiteUrl) : undefined,
      iconUrl: isSet(object.iconUrl) ? globalThis.String(object.iconUrl) : undefined,
      color: isSet(object.color) ? globalThis.String(object.color) : undefined,
    }
  },

  toJSON(message: ServiceListItem): unknown {
    const obj: any = {}
    if (message.name !== "") {
      obj.name = message.name
    }
    if (message.description !== "") {
      obj.description = message.description
    }
    if (message.humanName !== undefined) {
      obj.humanName = message.humanName
    }
    if (message.websiteUrl !== undefined) {
      obj.websiteUrl = message.websiteUrl
    }
    if (message.iconUrl !== undefined) {
      obj.iconUrl = message.iconUrl
    }
    if (message.color !== undefined) {
      obj.color = message.color
    }
    return obj
  },

  create<I extends Exact<DeepPartial<ServiceListItem>, I>>(base?: I): ServiceListItem {
    return ServiceListItem.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<ServiceListItem>, I>>(object: I): ServiceListItem {
    const message = createBaseServiceListItem()
    message.name = object.name ?? ""
    message.description = object.description ?? ""
    message.humanName = object.humanName ?? undefined
    message.websiteUrl = object.websiteUrl ?? undefined
    message.iconUrl = object.iconUrl ?? undefined
    message.color = object.color ?? undefined
    return message
  },
}

function createBaseGetServiceRequest(): GetServiceRequest {
  return {}
}

export const GetServiceRequest = {
  encode(_: GetServiceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetServiceRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseGetServiceRequest()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(_: any): GetServiceRequest {
    return {}
  },

  toJSON(_: GetServiceRequest): unknown {
    const obj: any = {}
    return obj
  },

  create<I extends Exact<DeepPartial<GetServiceRequest>, I>>(base?: I): GetServiceRequest {
    return GetServiceRequest.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<GetServiceRequest>, I>>(_: I): GetServiceRequest {
    const message = createBaseGetServiceRequest()
    return message
  },
}

function createBaseGetServiceResponse(): GetServiceResponse {
  return { service: undefined }
}

export const GetServiceResponse = {
  encode(message: GetServiceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.service !== undefined) {
      Service.encode(message.service, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetServiceResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseGetServiceResponse()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.service = Service.decode(reader, reader.uint32())
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): GetServiceResponse {
    return { service: isSet(object.service) ? Service.fromJSON(object.service) : undefined }
  },

  toJSON(message: GetServiceResponse): unknown {
    const obj: any = {}
    if (message.service !== undefined) {
      obj.service = Service.toJSON(message.service)
    }
    return obj
  },

  create<I extends Exact<DeepPartial<GetServiceResponse>, I>>(base?: I): GetServiceResponse {
    return GetServiceResponse.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<GetServiceResponse>, I>>(object: I): GetServiceResponse {
    const message = createBaseGetServiceResponse()
    message.service =
      object.service !== undefined && object.service !== null
        ? Service.fromPartial(object.service)
        : undefined
    return message
  },
}

function createBaseGetControlPanelRequest(): GetControlPanelRequest {
  return {}
}

export const GetControlPanelRequest = {
  encode(_: GetControlPanelRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetControlPanelRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseGetControlPanelRequest()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(_: any): GetControlPanelRequest {
    return {}
  },

  toJSON(_: GetControlPanelRequest): unknown {
    const obj: any = {}
    return obj
  },

  create<I extends Exact<DeepPartial<GetControlPanelRequest>, I>>(
    base?: I,
  ): GetControlPanelRequest {
    return GetControlPanelRequest.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<GetControlPanelRequest>, I>>(
    _: I,
  ): GetControlPanelRequest {
    const message = createBaseGetControlPanelRequest()
    return message
  },
}

function createBaseGetControlPanelResponse(): GetControlPanelResponse {
  return { service: undefined, values: [] }
}

export const GetControlPanelResponse = {
  encode(message: GetControlPanelResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.service !== undefined) {
      Service.encode(message.service, writer.uint32(10).fork()).ldelim()
    }
    for (const v of message.values) {
      OptionValue.encode(v!, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetControlPanelResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseGetControlPanelResponse()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.service = Service.decode(reader, reader.uint32())
          continue
        case 2:
          if (tag !== 18) {
            break
          }

          message.values.push(OptionValue.decode(reader, reader.uint32()))
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): GetControlPanelResponse {
    return {
      service: isSet(object.service) ? Service.fromJSON(object.service) : undefined,
      values: globalThis.Array.isArray(object?.values)
        ? object.values.map((e: any) => OptionValue.fromJSON(e))
        : [],
    }
  },

  toJSON(message: GetControlPanelResponse): unknown {
    const obj: any = {}
    if (message.service !== undefined) {
      obj.service = Service.toJSON(message.service)
    }
    if (message.values?.length) {
      obj.values = message.values.map((e) => OptionValue.toJSON(e))
    }
    return obj
  },

  create<I extends Exact<DeepPartial<GetControlPanelResponse>, I>>(
    base?: I,
  ): GetControlPanelResponse {
    return GetControlPanelResponse.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<GetControlPanelResponse>, I>>(
    object: I,
  ): GetControlPanelResponse {
    const message = createBaseGetControlPanelResponse()
    message.service =
      object.service !== undefined && object.service !== null
        ? Service.fromPartial(object.service)
        : undefined
    message.values = object.values?.map((e) => OptionValue.fromPartial(e)) || []
    return message
  },
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends globalThis.Array<infer U>
    ? globalThis.Array<DeepPartial<U>>
    : T extends ReadonlyArray<infer U>
      ? ReadonlyArray<DeepPartial<U>>
      : T extends {}
        ? { [K in keyof T]?: DeepPartial<T[K]> }
        : Partial<T>

type KeysOfUnion<T> = T extends T ? keyof T : never
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never }

function toTimestamp(date: Date): Timestamp {
  const seconds = Math.trunc(date.getTime() / 1_000)
  const nanos = (date.getTime() % 1_000) * 1_000_000
  return { seconds, nanos }
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds || 0) * 1_000
  millis += (t.nanos || 0) / 1_000_000
  return new globalThis.Date(millis)
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof globalThis.Date) {
    return o
  } else if (typeof o === "string") {
    return new globalThis.Date(o)
  } else {
    return fromTimestamp(Timestamp.fromJSON(o))
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined
}
