/* eslint-disable */
import Long from "long"
import _m0 from "protobufjs/minimal.js"

export const protobufPackage = "twicmdcfg"

/** The schema of the options available for the control panel. */
export interface Schema {
  /** The list of option categories. */
  categories: OptionCategory[]
  /** The list of options. */
  options: OptionType[]
}

/** The list of options available for a given resource. */
export interface OptionCategory {
  /** The title of the category. */
  title: string
  /** The human-readable description of the category. */
  description: string
  /** The list of options in the category. */
  options: OptionType[]
}

/** The type of the option. */
export interface OptionType {
  id: string
  /** The name of the option. */
  name: string
  /** The human-readable description of the option. */
  description: string
  string?: StringType | undefined
  stringList?: StringListType | undefined
  int?: NumberType | undefined
  switch?: SwitchType | undefined
}

/** A string option type. */
export interface StringType {
  /**
   * Whether to enforce the value to be non-empty.
   * Will not allow the user to apply without a value.
   */
  required: boolean
  /**
   * Whether the value is sensitive and should not be printed.
   * The server may choose to randomly generate a value for this option.
   * The client will only send over updated values, so the user may leave this
   * field alone.
   */
  sensitive: boolean
}

/** A string list option type. */
export interface StringListType {
  /**
   * The regex to use for structuring string values into a prettier table.
   * Each column in the table is named by the field in the structuring_fields
   * list. Each submatch in the regex is a column in the table.
   */
  structuringRegex?: string | undefined
  structuringColumns: string[]
}

export interface NumberType {
  /** The minimum value allowed. */
  min: number
  /** The maximum value allowed. */
  max: number
  /** Whether the value is a decimal number (floating point). */
  decimal: boolean
}

export interface SwitchType {}

/** A single option value. */
export interface OptionValue {
  id: string
  string?: string | undefined
  stringList?: StringListValue | undefined
  int?: number | undefined
  switch?: boolean | undefined
}

export interface StringListValue {
  values: string[]
}

export interface OptionsRequest {
  /** The phone number of the user to get the options for. */
  phoneNumber: string
}

export interface OptionsResponse {
  /** The list of option values for the user. */
  values: OptionValue[]
}

/** A request to apply a list of options. */
export interface ApplyRequest {
  /** The phone number of the user to apply the options to. */
  phoneNumber: string
  /**
   * The list of options to apply.
   * Only the values specified here will be updated.
   */
  values: OptionValue[]
}

/** The result of applying a list of options. */
export interface ApplyResponse {
  /**
   * Whether the apply was successful. If false, the errors field will be
   * populated.
   */
  success: boolean
  /** The list of errors that occurred when applying the options. */
  errors: ApplyError[]
}

/** A single error message when applying an option. */
export interface ApplyError {
  /** The ID of the option that caused the error. */
  optionId: string
  /** The error message. */
  message: string
}

function createBaseSchema(): Schema {
  return { categories: [], options: [] }
}

export const Schema = {
  encode(message: Schema, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.categories) {
      OptionCategory.encode(v!, writer.uint32(18).fork()).ldelim()
    }
    for (const v of message.options) {
      OptionType.encode(v!, writer.uint32(26).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Schema {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseSchema()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break
          }

          message.categories.push(OptionCategory.decode(reader, reader.uint32()))
          continue
        case 3:
          if (tag !== 26) {
            break
          }

          message.options.push(OptionType.decode(reader, reader.uint32()))
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): Schema {
    return {
      categories: globalThis.Array.isArray(object?.categories)
        ? object.categories.map((e: any) => OptionCategory.fromJSON(e))
        : [],
      options: globalThis.Array.isArray(object?.options)
        ? object.options.map((e: any) => OptionType.fromJSON(e))
        : [],
    }
  },

  toJSON(message: Schema): unknown {
    const obj: any = {}
    if (message.categories?.length) {
      obj.categories = message.categories.map((e) => OptionCategory.toJSON(e))
    }
    if (message.options?.length) {
      obj.options = message.options.map((e) => OptionType.toJSON(e))
    }
    return obj
  },

  create<I extends Exact<DeepPartial<Schema>, I>>(base?: I): Schema {
    return Schema.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<Schema>, I>>(object: I): Schema {
    const message = createBaseSchema()
    message.categories = object.categories?.map((e) => OptionCategory.fromPartial(e)) || []
    message.options = object.options?.map((e) => OptionType.fromPartial(e)) || []
    return message
  },
}

function createBaseOptionCategory(): OptionCategory {
  return { title: "", description: "", options: [] }
}

export const OptionCategory = {
  encode(message: OptionCategory, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title)
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description)
    }
    for (const v of message.options) {
      OptionType.encode(v!, writer.uint32(26).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OptionCategory {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseOptionCategory()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.title = reader.string()
          continue
        case 2:
          if (tag !== 18) {
            break
          }

          message.description = reader.string()
          continue
        case 3:
          if (tag !== 26) {
            break
          }

          message.options.push(OptionType.decode(reader, reader.uint32()))
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): OptionCategory {
    return {
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      options: globalThis.Array.isArray(object?.options)
        ? object.options.map((e: any) => OptionType.fromJSON(e))
        : [],
    }
  },

  toJSON(message: OptionCategory): unknown {
    const obj: any = {}
    if (message.title !== "") {
      obj.title = message.title
    }
    if (message.description !== "") {
      obj.description = message.description
    }
    if (message.options?.length) {
      obj.options = message.options.map((e) => OptionType.toJSON(e))
    }
    return obj
  },

  create<I extends Exact<DeepPartial<OptionCategory>, I>>(base?: I): OptionCategory {
    return OptionCategory.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<OptionCategory>, I>>(object: I): OptionCategory {
    const message = createBaseOptionCategory()
    message.title = object.title ?? ""
    message.description = object.description ?? ""
    message.options = object.options?.map((e) => OptionType.fromPartial(e)) || []
    return message
  },
}

function createBaseOptionType(): OptionType {
  return {
    id: "",
    name: "",
    description: "",
    string: undefined,
    stringList: undefined,
    int: undefined,
    switch: undefined,
  }
}

export const OptionType = {
  encode(message: OptionType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id)
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name)
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description)
    }
    if (message.string !== undefined) {
      StringType.encode(message.string, writer.uint32(82).fork()).ldelim()
    }
    if (message.stringList !== undefined) {
      StringListType.encode(message.stringList, writer.uint32(106).fork()).ldelim()
    }
    if (message.int !== undefined) {
      NumberType.encode(message.int, writer.uint32(90).fork()).ldelim()
    }
    if (message.switch !== undefined) {
      SwitchType.encode(message.switch, writer.uint32(98).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OptionType {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseOptionType()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.id = reader.string()
          continue
        case 2:
          if (tag !== 18) {
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
        case 10:
          if (tag !== 82) {
            break
          }

          message.string = StringType.decode(reader, reader.uint32())
          continue
        case 13:
          if (tag !== 106) {
            break
          }

          message.stringList = StringListType.decode(reader, reader.uint32())
          continue
        case 11:
          if (tag !== 90) {
            break
          }

          message.int = NumberType.decode(reader, reader.uint32())
          continue
        case 12:
          if (tag !== 98) {
            break
          }

          message.switch = SwitchType.decode(reader, reader.uint32())
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): OptionType {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      string: isSet(object.string) ? StringType.fromJSON(object.string) : undefined,
      stringList: isSet(object.stringList) ? StringListType.fromJSON(object.stringList) : undefined,
      int: isSet(object.int) ? NumberType.fromJSON(object.int) : undefined,
      switch: isSet(object.switch) ? SwitchType.fromJSON(object.switch) : undefined,
    }
  },

  toJSON(message: OptionType): unknown {
    const obj: any = {}
    if (message.id !== "") {
      obj.id = message.id
    }
    if (message.name !== "") {
      obj.name = message.name
    }
    if (message.description !== "") {
      obj.description = message.description
    }
    if (message.string !== undefined) {
      obj.string = StringType.toJSON(message.string)
    }
    if (message.stringList !== undefined) {
      obj.stringList = StringListType.toJSON(message.stringList)
    }
    if (message.int !== undefined) {
      obj.int = NumberType.toJSON(message.int)
    }
    if (message.switch !== undefined) {
      obj.switch = SwitchType.toJSON(message.switch)
    }
    return obj
  },

  create<I extends Exact<DeepPartial<OptionType>, I>>(base?: I): OptionType {
    return OptionType.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<OptionType>, I>>(object: I): OptionType {
    const message = createBaseOptionType()
    message.id = object.id ?? ""
    message.name = object.name ?? ""
    message.description = object.description ?? ""
    message.string =
      object.string !== undefined && object.string !== null
        ? StringType.fromPartial(object.string)
        : undefined
    message.stringList =
      object.stringList !== undefined && object.stringList !== null
        ? StringListType.fromPartial(object.stringList)
        : undefined
    message.int =
      object.int !== undefined && object.int !== null
        ? NumberType.fromPartial(object.int)
        : undefined
    message.switch =
      object.switch !== undefined && object.switch !== null
        ? SwitchType.fromPartial(object.switch)
        : undefined
    return message
  },
}

function createBaseStringType(): StringType {
  return { required: false, sensitive: false }
}

export const StringType = {
  encode(message: StringType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.required !== false) {
      writer.uint32(8).bool(message.required)
    }
    if (message.sensitive !== false) {
      writer.uint32(16).bool(message.sensitive)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StringType {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseStringType()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break
          }

          message.required = reader.bool()
          continue
        case 2:
          if (tag !== 16) {
            break
          }

          message.sensitive = reader.bool()
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): StringType {
    return {
      required: isSet(object.required) ? globalThis.Boolean(object.required) : false,
      sensitive: isSet(object.sensitive) ? globalThis.Boolean(object.sensitive) : false,
    }
  },

  toJSON(message: StringType): unknown {
    const obj: any = {}
    if (message.required !== false) {
      obj.required = message.required
    }
    if (message.sensitive !== false) {
      obj.sensitive = message.sensitive
    }
    return obj
  },

  create<I extends Exact<DeepPartial<StringType>, I>>(base?: I): StringType {
    return StringType.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<StringType>, I>>(object: I): StringType {
    const message = createBaseStringType()
    message.required = object.required ?? false
    message.sensitive = object.sensitive ?? false
    return message
  },
}

function createBaseStringListType(): StringListType {
  return { structuringRegex: undefined, structuringColumns: [] }
}

export const StringListType = {
  encode(message: StringListType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.structuringRegex !== undefined) {
      writer.uint32(10).string(message.structuringRegex)
    }
    for (const v of message.structuringColumns) {
      writer.uint32(18).string(v!)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StringListType {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseStringListType()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.structuringRegex = reader.string()
          continue
        case 2:
          if (tag !== 18) {
            break
          }

          message.structuringColumns.push(reader.string())
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): StringListType {
    return {
      structuringRegex: isSet(object.structuringRegex)
        ? globalThis.String(object.structuringRegex)
        : undefined,
      structuringColumns: globalThis.Array.isArray(object?.structuringColumns)
        ? object.structuringColumns.map((e: any) => globalThis.String(e))
        : [],
    }
  },

  toJSON(message: StringListType): unknown {
    const obj: any = {}
    if (message.structuringRegex !== undefined) {
      obj.structuringRegex = message.structuringRegex
    }
    if (message.structuringColumns?.length) {
      obj.structuringColumns = message.structuringColumns
    }
    return obj
  },

  create<I extends Exact<DeepPartial<StringListType>, I>>(base?: I): StringListType {
    return StringListType.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<StringListType>, I>>(object: I): StringListType {
    const message = createBaseStringListType()
    message.structuringRegex = object.structuringRegex ?? undefined
    message.structuringColumns = object.structuringColumns?.map((e) => e) || []
    return message
  },
}

function createBaseNumberType(): NumberType {
  return { min: 0, max: 0, decimal: false }
}

export const NumberType = {
  encode(message: NumberType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.min !== 0) {
      writer.uint32(8).int64(message.min)
    }
    if (message.max !== 0) {
      writer.uint32(16).int64(message.max)
    }
    if (message.decimal !== false) {
      writer.uint32(24).bool(message.decimal)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NumberType {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseNumberType()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break
          }

          message.min = longToNumber(reader.int64() as Long)
          continue
        case 2:
          if (tag !== 16) {
            break
          }

          message.max = longToNumber(reader.int64() as Long)
          continue
        case 3:
          if (tag !== 24) {
            break
          }

          message.decimal = reader.bool()
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): NumberType {
    return {
      min: isSet(object.min) ? globalThis.Number(object.min) : 0,
      max: isSet(object.max) ? globalThis.Number(object.max) : 0,
      decimal: isSet(object.decimal) ? globalThis.Boolean(object.decimal) : false,
    }
  },

  toJSON(message: NumberType): unknown {
    const obj: any = {}
    if (message.min !== 0) {
      obj.min = Math.round(message.min)
    }
    if (message.max !== 0) {
      obj.max = Math.round(message.max)
    }
    if (message.decimal !== false) {
      obj.decimal = message.decimal
    }
    return obj
  },

  create<I extends Exact<DeepPartial<NumberType>, I>>(base?: I): NumberType {
    return NumberType.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<NumberType>, I>>(object: I): NumberType {
    const message = createBaseNumberType()
    message.min = object.min ?? 0
    message.max = object.max ?? 0
    message.decimal = object.decimal ?? false
    return message
  },
}

function createBaseSwitchType(): SwitchType {
  return {}
}

export const SwitchType = {
  encode(_: SwitchType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SwitchType {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseSwitchType()
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

  fromJSON(_: any): SwitchType {
    return {}
  },

  toJSON(_: SwitchType): unknown {
    const obj: any = {}
    return obj
  },

  create<I extends Exact<DeepPartial<SwitchType>, I>>(base?: I): SwitchType {
    return SwitchType.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<SwitchType>, I>>(_: I): SwitchType {
    const message = createBaseSwitchType()
    return message
  },
}

function createBaseOptionValue(): OptionValue {
  return { id: "", string: undefined, stringList: undefined, int: undefined, switch: undefined }
}

export const OptionValue = {
  encode(message: OptionValue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id)
    }
    if (message.string !== undefined) {
      writer.uint32(82).string(message.string)
    }
    if (message.stringList !== undefined) {
      StringListValue.encode(message.stringList, writer.uint32(106).fork()).ldelim()
    }
    if (message.int !== undefined) {
      writer.uint32(88).int64(message.int)
    }
    if (message.switch !== undefined) {
      writer.uint32(96).bool(message.switch)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OptionValue {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseOptionValue()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.id = reader.string()
          continue
        case 10:
          if (tag !== 82) {
            break
          }

          message.string = reader.string()
          continue
        case 13:
          if (tag !== 106) {
            break
          }

          message.stringList = StringListValue.decode(reader, reader.uint32())
          continue
        case 11:
          if (tag !== 88) {
            break
          }

          message.int = longToNumber(reader.int64() as Long)
          continue
        case 12:
          if (tag !== 96) {
            break
          }

          message.switch = reader.bool()
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): OptionValue {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      string: isSet(object.string) ? globalThis.String(object.string) : undefined,
      stringList: isSet(object.stringList)
        ? StringListValue.fromJSON(object.stringList)
        : undefined,
      int: isSet(object.int) ? globalThis.Number(object.int) : undefined,
      switch: isSet(object.switch) ? globalThis.Boolean(object.switch) : undefined,
    }
  },

  toJSON(message: OptionValue): unknown {
    const obj: any = {}
    if (message.id !== "") {
      obj.id = message.id
    }
    if (message.string !== undefined) {
      obj.string = message.string
    }
    if (message.stringList !== undefined) {
      obj.stringList = StringListValue.toJSON(message.stringList)
    }
    if (message.int !== undefined) {
      obj.int = Math.round(message.int)
    }
    if (message.switch !== undefined) {
      obj.switch = message.switch
    }
    return obj
  },

  create<I extends Exact<DeepPartial<OptionValue>, I>>(base?: I): OptionValue {
    return OptionValue.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<OptionValue>, I>>(object: I): OptionValue {
    const message = createBaseOptionValue()
    message.id = object.id ?? ""
    message.string = object.string ?? undefined
    message.stringList =
      object.stringList !== undefined && object.stringList !== null
        ? StringListValue.fromPartial(object.stringList)
        : undefined
    message.int = object.int ?? undefined
    message.switch = object.switch ?? undefined
    return message
  },
}

function createBaseStringListValue(): StringListValue {
  return { values: [] }
}

export const StringListValue = {
  encode(message: StringListValue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.values) {
      writer.uint32(10).string(v!)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StringListValue {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseStringListValue()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.values.push(reader.string())
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): StringListValue {
    return {
      values: globalThis.Array.isArray(object?.values)
        ? object.values.map((e: any) => globalThis.String(e))
        : [],
    }
  },

  toJSON(message: StringListValue): unknown {
    const obj: any = {}
    if (message.values?.length) {
      obj.values = message.values
    }
    return obj
  },

  create<I extends Exact<DeepPartial<StringListValue>, I>>(base?: I): StringListValue {
    return StringListValue.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<StringListValue>, I>>(object: I): StringListValue {
    const message = createBaseStringListValue()
    message.values = object.values?.map((e) => e) || []
    return message
  },
}

function createBaseOptionsRequest(): OptionsRequest {
  return { phoneNumber: "" }
}

export const OptionsRequest = {
  encode(message: OptionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.phoneNumber !== "") {
      writer.uint32(10).string(message.phoneNumber)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OptionsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseOptionsRequest()
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

  fromJSON(object: any): OptionsRequest {
    return { phoneNumber: isSet(object.phoneNumber) ? globalThis.String(object.phoneNumber) : "" }
  },

  toJSON(message: OptionsRequest): unknown {
    const obj: any = {}
    if (message.phoneNumber !== "") {
      obj.phoneNumber = message.phoneNumber
    }
    return obj
  },

  create<I extends Exact<DeepPartial<OptionsRequest>, I>>(base?: I): OptionsRequest {
    return OptionsRequest.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<OptionsRequest>, I>>(object: I): OptionsRequest {
    const message = createBaseOptionsRequest()
    message.phoneNumber = object.phoneNumber ?? ""
    return message
  },
}

function createBaseOptionsResponse(): OptionsResponse {
  return { values: [] }
}

export const OptionsResponse = {
  encode(message: OptionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.values) {
      OptionValue.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OptionsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseOptionsResponse()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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

  fromJSON(object: any): OptionsResponse {
    return {
      values: globalThis.Array.isArray(object?.values)
        ? object.values.map((e: any) => OptionValue.fromJSON(e))
        : [],
    }
  },

  toJSON(message: OptionsResponse): unknown {
    const obj: any = {}
    if (message.values?.length) {
      obj.values = message.values.map((e) => OptionValue.toJSON(e))
    }
    return obj
  },

  create<I extends Exact<DeepPartial<OptionsResponse>, I>>(base?: I): OptionsResponse {
    return OptionsResponse.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<OptionsResponse>, I>>(object: I): OptionsResponse {
    const message = createBaseOptionsResponse()
    message.values = object.values?.map((e) => OptionValue.fromPartial(e)) || []
    return message
  },
}

function createBaseApplyRequest(): ApplyRequest {
  return { phoneNumber: "", values: [] }
}

export const ApplyRequest = {
  encode(message: ApplyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.phoneNumber !== "") {
      writer.uint32(10).string(message.phoneNumber)
    }
    for (const v of message.values) {
      OptionValue.encode(v!, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ApplyRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseApplyRequest()
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

  fromJSON(object: any): ApplyRequest {
    return {
      phoneNumber: isSet(object.phoneNumber) ? globalThis.String(object.phoneNumber) : "",
      values: globalThis.Array.isArray(object?.values)
        ? object.values.map((e: any) => OptionValue.fromJSON(e))
        : [],
    }
  },

  toJSON(message: ApplyRequest): unknown {
    const obj: any = {}
    if (message.phoneNumber !== "") {
      obj.phoneNumber = message.phoneNumber
    }
    if (message.values?.length) {
      obj.values = message.values.map((e) => OptionValue.toJSON(e))
    }
    return obj
  },

  create<I extends Exact<DeepPartial<ApplyRequest>, I>>(base?: I): ApplyRequest {
    return ApplyRequest.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<ApplyRequest>, I>>(object: I): ApplyRequest {
    const message = createBaseApplyRequest()
    message.phoneNumber = object.phoneNumber ?? ""
    message.values = object.values?.map((e) => OptionValue.fromPartial(e)) || []
    return message
  },
}

function createBaseApplyResponse(): ApplyResponse {
  return { success: false, errors: [] }
}

export const ApplyResponse = {
  encode(message: ApplyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success !== false) {
      writer.uint32(8).bool(message.success)
    }
    for (const v of message.errors) {
      ApplyError.encode(v!, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ApplyResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseApplyResponse()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break
          }

          message.success = reader.bool()
          continue
        case 2:
          if (tag !== 18) {
            break
          }

          message.errors.push(ApplyError.decode(reader, reader.uint32()))
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): ApplyResponse {
    return {
      success: isSet(object.success) ? globalThis.Boolean(object.success) : false,
      errors: globalThis.Array.isArray(object?.errors)
        ? object.errors.map((e: any) => ApplyError.fromJSON(e))
        : [],
    }
  },

  toJSON(message: ApplyResponse): unknown {
    const obj: any = {}
    if (message.success !== false) {
      obj.success = message.success
    }
    if (message.errors?.length) {
      obj.errors = message.errors.map((e) => ApplyError.toJSON(e))
    }
    return obj
  },

  create<I extends Exact<DeepPartial<ApplyResponse>, I>>(base?: I): ApplyResponse {
    return ApplyResponse.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<ApplyResponse>, I>>(object: I): ApplyResponse {
    const message = createBaseApplyResponse()
    message.success = object.success ?? false
    message.errors = object.errors?.map((e) => ApplyError.fromPartial(e)) || []
    return message
  },
}

function createBaseApplyError(): ApplyError {
  return { optionId: "", message: "" }
}

export const ApplyError = {
  encode(message: ApplyError, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.optionId !== "") {
      writer.uint32(10).string(message.optionId)
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ApplyError {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseApplyError()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.optionId = reader.string()
          continue
        case 2:
          if (tag !== 18) {
            break
          }

          message.message = reader.string()
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): ApplyError {
    return {
      optionId: isSet(object.optionId) ? globalThis.String(object.optionId) : "",
      message: isSet(object.message) ? globalThis.String(object.message) : "",
    }
  },

  toJSON(message: ApplyError): unknown {
    const obj: any = {}
    if (message.optionId !== "") {
      obj.optionId = message.optionId
    }
    if (message.message !== "") {
      obj.message = message.message
    }
    return obj
  },

  create<I extends Exact<DeepPartial<ApplyError>, I>>(base?: I): ApplyError {
    return ApplyError.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<ApplyError>, I>>(object: I): ApplyError {
    const message = createBaseApplyError()
    message.optionId = object.optionId ?? ""
    message.message = object.message ?? ""
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

function longToNumber(long: Long): number {
  if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER")
  }
  return long.toNumber()
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any
  _m0.configure()
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined
}
