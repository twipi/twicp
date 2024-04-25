/* eslint-disable */
import _m0 from "protobufjs/minimal.js"
import { Schema } from "./twicmdcfg.js"
import { Message, MessageBody } from "./twisms.js"

export const protobufPackage = "twicmd"

export enum CommandArgumentHint {
  COMMAND_ARGUMENT_HINT_UNSPECIFIED = 0,
  COMMAND_ARGUMENT_HINT_STRING = 1,
  COMMAND_ARGUMENT_HINT_NUMBER = 2,
  COMMAND_ARGUMENT_HINT_INTEGER = 3,
  COMMAND_ARGUMENT_HINT_PERSON = 4,
  COMMAND_ARGUMENT_HINT_EMAIL = 5,
  COMMAND_ARGUMENT_HINT_PHONE_NUMBER = 6,
  COMMAND_ARGUMENT_HINT_ADDRESS = 7,
  COMMAND_ARGUMENT_HINT_DURATION = 8,
  /** COMMAND_ARGUMENT_HINT_DATE - ... */
  COMMAND_ARGUMENT_HINT_DATE = 9,
  UNRECOGNIZED = -1,
}

export function commandArgumentHintFromJSON(object: any): CommandArgumentHint {
  switch (object) {
    case 0:
    case "COMMAND_ARGUMENT_HINT_UNSPECIFIED":
      return CommandArgumentHint.COMMAND_ARGUMENT_HINT_UNSPECIFIED
    case 1:
    case "COMMAND_ARGUMENT_HINT_STRING":
      return CommandArgumentHint.COMMAND_ARGUMENT_HINT_STRING
    case 2:
    case "COMMAND_ARGUMENT_HINT_NUMBER":
      return CommandArgumentHint.COMMAND_ARGUMENT_HINT_NUMBER
    case 3:
    case "COMMAND_ARGUMENT_HINT_INTEGER":
      return CommandArgumentHint.COMMAND_ARGUMENT_HINT_INTEGER
    case 4:
    case "COMMAND_ARGUMENT_HINT_PERSON":
      return CommandArgumentHint.COMMAND_ARGUMENT_HINT_PERSON
    case 5:
    case "COMMAND_ARGUMENT_HINT_EMAIL":
      return CommandArgumentHint.COMMAND_ARGUMENT_HINT_EMAIL
    case 6:
    case "COMMAND_ARGUMENT_HINT_PHONE_NUMBER":
      return CommandArgumentHint.COMMAND_ARGUMENT_HINT_PHONE_NUMBER
    case 7:
    case "COMMAND_ARGUMENT_HINT_ADDRESS":
      return CommandArgumentHint.COMMAND_ARGUMENT_HINT_ADDRESS
    case 8:
    case "COMMAND_ARGUMENT_HINT_DURATION":
      return CommandArgumentHint.COMMAND_ARGUMENT_HINT_DURATION
    case 9:
    case "COMMAND_ARGUMENT_HINT_DATE":
      return CommandArgumentHint.COMMAND_ARGUMENT_HINT_DATE
    case -1:
    case "UNRECOGNIZED":
    default:
      return CommandArgumentHint.UNRECOGNIZED
  }
}

export function commandArgumentHintToJSON(object: CommandArgumentHint): string {
  switch (object) {
    case CommandArgumentHint.COMMAND_ARGUMENT_HINT_UNSPECIFIED:
      return "COMMAND_ARGUMENT_HINT_UNSPECIFIED"
    case CommandArgumentHint.COMMAND_ARGUMENT_HINT_STRING:
      return "COMMAND_ARGUMENT_HINT_STRING"
    case CommandArgumentHint.COMMAND_ARGUMENT_HINT_NUMBER:
      return "COMMAND_ARGUMENT_HINT_NUMBER"
    case CommandArgumentHint.COMMAND_ARGUMENT_HINT_INTEGER:
      return "COMMAND_ARGUMENT_HINT_INTEGER"
    case CommandArgumentHint.COMMAND_ARGUMENT_HINT_PERSON:
      return "COMMAND_ARGUMENT_HINT_PERSON"
    case CommandArgumentHint.COMMAND_ARGUMENT_HINT_EMAIL:
      return "COMMAND_ARGUMENT_HINT_EMAIL"
    case CommandArgumentHint.COMMAND_ARGUMENT_HINT_PHONE_NUMBER:
      return "COMMAND_ARGUMENT_HINT_PHONE_NUMBER"
    case CommandArgumentHint.COMMAND_ARGUMENT_HINT_ADDRESS:
      return "COMMAND_ARGUMENT_HINT_ADDRESS"
    case CommandArgumentHint.COMMAND_ARGUMENT_HINT_DURATION:
      return "COMMAND_ARGUMENT_HINT_DURATION"
    case CommandArgumentHint.COMMAND_ARGUMENT_HINT_DATE:
      return "COMMAND_ARGUMENT_HINT_DATE"
    case CommandArgumentHint.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED"
  }
}

/** A service that provides commands to be executed. */
export interface Service {
  /**
   * The name of the service. Each service registers its own single-word name,
   * usually the brand name, to be used in this.
   */
  name: string
  /** The human-readable description of the service. */
  description: string
  /** The list of descriptions of commands that the service provides. */
  commands: CommandDescription[]
  /** The URL of the service's icon. */
  iconUrl?: string | undefined
  /** The optional brand color of the service. */
  color?: string | undefined
  /** The optional control panel schema of the service. */
  optionsSchema?: Schema | undefined
}

/**
 * A description of a command that the service provides.
 * It mostly contains human-readable information about the command, but some
 * data may be used by the natural language processor.
 */
export interface CommandDescription {
  /** The name of the slash command. */
  name: string
  /** The human-readable description of the command. */
  description: string
  /** The map of named arguments that the command accepts. */
  arguments: { [key: string]: CommandArgumentDescription }
  /**
   * The order in which the named arguments are expected.
   * This is only useful for positional parsing.
   * Such a parser must also implement a fallback name=value parser.
   */
  argumentPositions: string[]
  /**
   * Whether the command accepts a trailing argument at the end.
   * The last argument in the positions list is considered trailing.
   * This is only meaningful if argument_positions is set.
   */
  argumentTrailing: boolean
}

export interface CommandDescription_ArgumentsEntry {
  key: string
  value: CommandArgumentDescription | undefined
}

/** A description of a command argument within a command. */
export interface CommandArgumentDescription {
  /** Whether the argument is required. */
  required: boolean
  /** The human-readable description of the argument. */
  description: string
  /**
   * The hint that the parser will use.
   * The NLP will also use it to determine the argument's context.
   */
  hint: CommandArgumentHint
}

/**
 * A request to autocomplete an argument.
 * It returns a list of possible values for the given argument sorted by
 * relevance.
 */
export interface ArgumentAutocompleteRequest {
  /** The name of the service. */
  service: string
  /** The name of the command. */
  command: string
  /** The name of the argument within the command. */
  argument: string
  /**
   * The input to autocomplete.
   * If empty, list as many suggestions as possible.
   */
  input: string
}

/** The response to an argument autocompletion request. */
export interface ArgumentAutocompleteResponse {
  suggestions: string[]
}

/** A command to be executed sent by the user. */
export interface Command {
  service: string
  command: string
  arguments: CommandArgument[]
}

/** A command argument. */
export interface CommandArgument {
  name: string
  value: string
}

/** The request sent on the POST /execute endpoint. */
export interface ExecuteRequest {
  command: Command | undefined
  message: Message | undefined
}

/** The response sent back to the user after executing a command. */
export interface ExecuteResponse {
  /**
   * A plain text response.
   * This is the same as the Text field in MessageBody.
   */
  text?: string | undefined
  /** A response with a message body. */
  body?: MessageBody | undefined
  /**
   * A system response, including errors.
   * These responses may be localized or transformed.
   */
  status?: string | undefined
}

function createBaseService(): Service {
  return {
    name: "",
    description: "",
    commands: [],
    iconUrl: undefined,
    color: undefined,
    optionsSchema: undefined,
  }
}

export const Service = {
  encode(message: Service, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name)
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description)
    }
    for (const v of message.commands) {
      CommandDescription.encode(v!, writer.uint32(18).fork()).ldelim()
    }
    if (message.iconUrl !== undefined) {
      writer.uint32(34).string(message.iconUrl)
    }
    if (message.color !== undefined) {
      writer.uint32(42).string(message.color)
    }
    if (message.optionsSchema !== undefined) {
      Schema.encode(message.optionsSchema, writer.uint32(50).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Service {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseService()
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
        case 2:
          if (tag !== 18) {
            break
          }

          message.commands.push(CommandDescription.decode(reader, reader.uint32()))
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
        case 6:
          if (tag !== 50) {
            break
          }

          message.optionsSchema = Schema.decode(reader, reader.uint32())
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): Service {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      commands: globalThis.Array.isArray(object?.commands)
        ? object.commands.map((e: any) => CommandDescription.fromJSON(e))
        : [],
      iconUrl: isSet(object.iconUrl) ? globalThis.String(object.iconUrl) : undefined,
      color: isSet(object.color) ? globalThis.String(object.color) : undefined,
      optionsSchema: isSet(object.optionsSchema)
        ? Schema.fromJSON(object.optionsSchema)
        : undefined,
    }
  },

  toJSON(message: Service): unknown {
    const obj: any = {}
    if (message.name !== "") {
      obj.name = message.name
    }
    if (message.description !== "") {
      obj.description = message.description
    }
    if (message.commands?.length) {
      obj.commands = message.commands.map((e) => CommandDescription.toJSON(e))
    }
    if (message.iconUrl !== undefined) {
      obj.iconUrl = message.iconUrl
    }
    if (message.color !== undefined) {
      obj.color = message.color
    }
    if (message.optionsSchema !== undefined) {
      obj.optionsSchema = Schema.toJSON(message.optionsSchema)
    }
    return obj
  },

  create<I extends Exact<DeepPartial<Service>, I>>(base?: I): Service {
    return Service.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<Service>, I>>(object: I): Service {
    const message = createBaseService()
    message.name = object.name ?? ""
    message.description = object.description ?? ""
    message.commands = object.commands?.map((e) => CommandDescription.fromPartial(e)) || []
    message.iconUrl = object.iconUrl ?? undefined
    message.color = object.color ?? undefined
    message.optionsSchema =
      object.optionsSchema !== undefined && object.optionsSchema !== null
        ? Schema.fromPartial(object.optionsSchema)
        : undefined
    return message
  },
}

function createBaseCommandDescription(): CommandDescription {
  return {
    name: "",
    description: "",
    arguments: {},
    argumentPositions: [],
    argumentTrailing: false,
  }
}

export const CommandDescription = {
  encode(message: CommandDescription, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name)
    }
    if (message.description !== "") {
      writer.uint32(42).string(message.description)
    }
    Object.entries(message.arguments).forEach(([key, value]) => {
      CommandDescription_ArgumentsEntry.encode(
        { key: key as any, value },
        writer.uint32(18).fork(),
      ).ldelim()
    })
    for (const v of message.argumentPositions) {
      writer.uint32(26).string(v!)
    }
    if (message.argumentTrailing !== false) {
      writer.uint32(32).bool(message.argumentTrailing)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandDescription {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseCommandDescription()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.name = reader.string()
          continue
        case 5:
          if (tag !== 42) {
            break
          }

          message.description = reader.string()
          continue
        case 2:
          if (tag !== 18) {
            break
          }

          const entry2 = CommandDescription_ArgumentsEntry.decode(reader, reader.uint32())
          if (entry2.value !== undefined) {
            message.arguments[entry2.key] = entry2.value
          }
          continue
        case 3:
          if (tag !== 26) {
            break
          }

          message.argumentPositions.push(reader.string())
          continue
        case 4:
          if (tag !== 32) {
            break
          }

          message.argumentTrailing = reader.bool()
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): CommandDescription {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      arguments: isObject(object.arguments)
        ? Object.entries(object.arguments).reduce<{ [key: string]: CommandArgumentDescription }>(
            (acc, [key, value]) => {
              acc[key] = CommandArgumentDescription.fromJSON(value)
              return acc
            },
            {},
          )
        : {},
      argumentPositions: globalThis.Array.isArray(object?.argumentPositions)
        ? object.argumentPositions.map((e: any) => globalThis.String(e))
        : [],
      argumentTrailing: isSet(object.argumentTrailing)
        ? globalThis.Boolean(object.argumentTrailing)
        : false,
    }
  },

  toJSON(message: CommandDescription): unknown {
    const obj: any = {}
    if (message.name !== "") {
      obj.name = message.name
    }
    if (message.description !== "") {
      obj.description = message.description
    }
    if (message.arguments) {
      const entries = Object.entries(message.arguments)
      if (entries.length > 0) {
        obj.arguments = {}
        entries.forEach(([k, v]) => {
          obj.arguments[k] = CommandArgumentDescription.toJSON(v)
        })
      }
    }
    if (message.argumentPositions?.length) {
      obj.argumentPositions = message.argumentPositions
    }
    if (message.argumentTrailing !== false) {
      obj.argumentTrailing = message.argumentTrailing
    }
    return obj
  },

  create<I extends Exact<DeepPartial<CommandDescription>, I>>(base?: I): CommandDescription {
    return CommandDescription.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<CommandDescription>, I>>(object: I): CommandDescription {
    const message = createBaseCommandDescription()
    message.name = object.name ?? ""
    message.description = object.description ?? ""
    message.arguments = Object.entries(object.arguments ?? {}).reduce<{
      [key: string]: CommandArgumentDescription
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = CommandArgumentDescription.fromPartial(value)
      }
      return acc
    }, {})
    message.argumentPositions = object.argumentPositions?.map((e) => e) || []
    message.argumentTrailing = object.argumentTrailing ?? false
    return message
  },
}

function createBaseCommandDescription_ArgumentsEntry(): CommandDescription_ArgumentsEntry {
  return { key: "", value: undefined }
}

export const CommandDescription_ArgumentsEntry = {
  encode(
    message: CommandDescription_ArgumentsEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key)
    }
    if (message.value !== undefined) {
      CommandArgumentDescription.encode(message.value, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandDescription_ArgumentsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseCommandDescription_ArgumentsEntry()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.key = reader.string()
          continue
        case 2:
          if (tag !== 18) {
            break
          }

          message.value = CommandArgumentDescription.decode(reader, reader.uint32())
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): CommandDescription_ArgumentsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? CommandArgumentDescription.fromJSON(object.value) : undefined,
    }
  },

  toJSON(message: CommandDescription_ArgumentsEntry): unknown {
    const obj: any = {}
    if (message.key !== "") {
      obj.key = message.key
    }
    if (message.value !== undefined) {
      obj.value = CommandArgumentDescription.toJSON(message.value)
    }
    return obj
  },

  create<I extends Exact<DeepPartial<CommandDescription_ArgumentsEntry>, I>>(
    base?: I,
  ): CommandDescription_ArgumentsEntry {
    return CommandDescription_ArgumentsEntry.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<CommandDescription_ArgumentsEntry>, I>>(
    object: I,
  ): CommandDescription_ArgumentsEntry {
    const message = createBaseCommandDescription_ArgumentsEntry()
    message.key = object.key ?? ""
    message.value =
      object.value !== undefined && object.value !== null
        ? CommandArgumentDescription.fromPartial(object.value)
        : undefined
    return message
  },
}

function createBaseCommandArgumentDescription(): CommandArgumentDescription {
  return { required: false, description: "", hint: 0 }
}

export const CommandArgumentDescription = {
  encode(
    message: CommandArgumentDescription,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.required !== false) {
      writer.uint32(8).bool(message.required)
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description)
    }
    if (message.hint !== 0) {
      writer.uint32(24).int32(message.hint)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandArgumentDescription {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseCommandArgumentDescription()
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
          if (tag !== 18) {
            break
          }

          message.description = reader.string()
          continue
        case 3:
          if (tag !== 24) {
            break
          }

          message.hint = reader.int32() as any
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): CommandArgumentDescription {
    return {
      required: isSet(object.required) ? globalThis.Boolean(object.required) : false,
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      hint: isSet(object.hint) ? commandArgumentHintFromJSON(object.hint) : 0,
    }
  },

  toJSON(message: CommandArgumentDescription): unknown {
    const obj: any = {}
    if (message.required !== false) {
      obj.required = message.required
    }
    if (message.description !== "") {
      obj.description = message.description
    }
    if (message.hint !== 0) {
      obj.hint = commandArgumentHintToJSON(message.hint)
    }
    return obj
  },

  create<I extends Exact<DeepPartial<CommandArgumentDescription>, I>>(
    base?: I,
  ): CommandArgumentDescription {
    return CommandArgumentDescription.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<CommandArgumentDescription>, I>>(
    object: I,
  ): CommandArgumentDescription {
    const message = createBaseCommandArgumentDescription()
    message.required = object.required ?? false
    message.description = object.description ?? ""
    message.hint = object.hint ?? 0
    return message
  },
}

function createBaseArgumentAutocompleteRequest(): ArgumentAutocompleteRequest {
  return { service: "", command: "", argument: "", input: "" }
}

export const ArgumentAutocompleteRequest = {
  encode(
    message: ArgumentAutocompleteRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.service !== "") {
      writer.uint32(10).string(message.service)
    }
    if (message.command !== "") {
      writer.uint32(18).string(message.command)
    }
    if (message.argument !== "") {
      writer.uint32(26).string(message.argument)
    }
    if (message.input !== "") {
      writer.uint32(34).string(message.input)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ArgumentAutocompleteRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseArgumentAutocompleteRequest()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.service = reader.string()
          continue
        case 2:
          if (tag !== 18) {
            break
          }

          message.command = reader.string()
          continue
        case 3:
          if (tag !== 26) {
            break
          }

          message.argument = reader.string()
          continue
        case 4:
          if (tag !== 34) {
            break
          }

          message.input = reader.string()
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): ArgumentAutocompleteRequest {
    return {
      service: isSet(object.service) ? globalThis.String(object.service) : "",
      command: isSet(object.command) ? globalThis.String(object.command) : "",
      argument: isSet(object.argument) ? globalThis.String(object.argument) : "",
      input: isSet(object.input) ? globalThis.String(object.input) : "",
    }
  },

  toJSON(message: ArgumentAutocompleteRequest): unknown {
    const obj: any = {}
    if (message.service !== "") {
      obj.service = message.service
    }
    if (message.command !== "") {
      obj.command = message.command
    }
    if (message.argument !== "") {
      obj.argument = message.argument
    }
    if (message.input !== "") {
      obj.input = message.input
    }
    return obj
  },

  create<I extends Exact<DeepPartial<ArgumentAutocompleteRequest>, I>>(
    base?: I,
  ): ArgumentAutocompleteRequest {
    return ArgumentAutocompleteRequest.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<ArgumentAutocompleteRequest>, I>>(
    object: I,
  ): ArgumentAutocompleteRequest {
    const message = createBaseArgumentAutocompleteRequest()
    message.service = object.service ?? ""
    message.command = object.command ?? ""
    message.argument = object.argument ?? ""
    message.input = object.input ?? ""
    return message
  },
}

function createBaseArgumentAutocompleteResponse(): ArgumentAutocompleteResponse {
  return { suggestions: [] }
}

export const ArgumentAutocompleteResponse = {
  encode(
    message: ArgumentAutocompleteResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.suggestions) {
      writer.uint32(10).string(v!)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ArgumentAutocompleteResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseArgumentAutocompleteResponse()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.suggestions.push(reader.string())
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): ArgumentAutocompleteResponse {
    return {
      suggestions: globalThis.Array.isArray(object?.suggestions)
        ? object.suggestions.map((e: any) => globalThis.String(e))
        : [],
    }
  },

  toJSON(message: ArgumentAutocompleteResponse): unknown {
    const obj: any = {}
    if (message.suggestions?.length) {
      obj.suggestions = message.suggestions
    }
    return obj
  },

  create<I extends Exact<DeepPartial<ArgumentAutocompleteResponse>, I>>(
    base?: I,
  ): ArgumentAutocompleteResponse {
    return ArgumentAutocompleteResponse.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<ArgumentAutocompleteResponse>, I>>(
    object: I,
  ): ArgumentAutocompleteResponse {
    const message = createBaseArgumentAutocompleteResponse()
    message.suggestions = object.suggestions?.map((e) => e) || []
    return message
  },
}

function createBaseCommand(): Command {
  return { service: "", command: "", arguments: [] }
}

export const Command = {
  encode(message: Command, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.service !== "") {
      writer.uint32(10).string(message.service)
    }
    if (message.command !== "") {
      writer.uint32(18).string(message.command)
    }
    for (const v of message.arguments) {
      CommandArgument.encode(v!, writer.uint32(26).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Command {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseCommand()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.service = reader.string()
          continue
        case 2:
          if (tag !== 18) {
            break
          }

          message.command = reader.string()
          continue
        case 3:
          if (tag !== 26) {
            break
          }

          message.arguments.push(CommandArgument.decode(reader, reader.uint32()))
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): Command {
    return {
      service: isSet(object.service) ? globalThis.String(object.service) : "",
      command: isSet(object.command) ? globalThis.String(object.command) : "",
      arguments: globalThis.Array.isArray(object?.arguments)
        ? object.arguments.map((e: any) => CommandArgument.fromJSON(e))
        : [],
    }
  },

  toJSON(message: Command): unknown {
    const obj: any = {}
    if (message.service !== "") {
      obj.service = message.service
    }
    if (message.command !== "") {
      obj.command = message.command
    }
    if (message.arguments?.length) {
      obj.arguments = message.arguments.map((e) => CommandArgument.toJSON(e))
    }
    return obj
  },

  create<I extends Exact<DeepPartial<Command>, I>>(base?: I): Command {
    return Command.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<Command>, I>>(object: I): Command {
    const message = createBaseCommand()
    message.service = object.service ?? ""
    message.command = object.command ?? ""
    message.arguments = object.arguments?.map((e) => CommandArgument.fromPartial(e)) || []
    return message
  },
}

function createBaseCommandArgument(): CommandArgument {
  return { name: "", value: "" }
}

export const CommandArgument = {
  encode(message: CommandArgument, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name)
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandArgument {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseCommandArgument()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.name = reader.string()
          continue
        case 2:
          if (tag !== 18) {
            break
          }

          message.value = reader.string()
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): CommandArgument {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    }
  },

  toJSON(message: CommandArgument): unknown {
    const obj: any = {}
    if (message.name !== "") {
      obj.name = message.name
    }
    if (message.value !== "") {
      obj.value = message.value
    }
    return obj
  },

  create<I extends Exact<DeepPartial<CommandArgument>, I>>(base?: I): CommandArgument {
    return CommandArgument.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<CommandArgument>, I>>(object: I): CommandArgument {
    const message = createBaseCommandArgument()
    message.name = object.name ?? ""
    message.value = object.value ?? ""
    return message
  },
}

function createBaseExecuteRequest(): ExecuteRequest {
  return { command: undefined, message: undefined }
}

export const ExecuteRequest = {
  encode(message: ExecuteRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.command !== undefined) {
      Command.encode(message.command, writer.uint32(10).fork()).ldelim()
    }
    if (message.message !== undefined) {
      Message.encode(message.message, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecuteRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseExecuteRequest()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.command = Command.decode(reader, reader.uint32())
          continue
        case 2:
          if (tag !== 18) {
            break
          }

          message.message = Message.decode(reader, reader.uint32())
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): ExecuteRequest {
    return {
      command: isSet(object.command) ? Command.fromJSON(object.command) : undefined,
      message: isSet(object.message) ? Message.fromJSON(object.message) : undefined,
    }
  },

  toJSON(message: ExecuteRequest): unknown {
    const obj: any = {}
    if (message.command !== undefined) {
      obj.command = Command.toJSON(message.command)
    }
    if (message.message !== undefined) {
      obj.message = Message.toJSON(message.message)
    }
    return obj
  },

  create<I extends Exact<DeepPartial<ExecuteRequest>, I>>(base?: I): ExecuteRequest {
    return ExecuteRequest.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<ExecuteRequest>, I>>(object: I): ExecuteRequest {
    const message = createBaseExecuteRequest()
    message.command =
      object.command !== undefined && object.command !== null
        ? Command.fromPartial(object.command)
        : undefined
    message.message =
      object.message !== undefined && object.message !== null
        ? Message.fromPartial(object.message)
        : undefined
    return message
  },
}

function createBaseExecuteResponse(): ExecuteResponse {
  return { text: undefined, body: undefined, status: undefined }
}

export const ExecuteResponse = {
  encode(message: ExecuteResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.text !== undefined) {
      writer.uint32(10).string(message.text)
    }
    if (message.body !== undefined) {
      MessageBody.encode(message.body, writer.uint32(18).fork()).ldelim()
    }
    if (message.status !== undefined) {
      writer.uint32(26).string(message.status)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecuteResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseExecuteResponse()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.text = reader.string()
          continue
        case 2:
          if (tag !== 18) {
            break
          }

          message.body = MessageBody.decode(reader, reader.uint32())
          continue
        case 3:
          if (tag !== 26) {
            break
          }

          message.status = reader.string()
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): ExecuteResponse {
    return {
      text: isSet(object.text) ? globalThis.String(object.text) : undefined,
      body: isSet(object.body) ? MessageBody.fromJSON(object.body) : undefined,
      status: isSet(object.status) ? globalThis.String(object.status) : undefined,
    }
  },

  toJSON(message: ExecuteResponse): unknown {
    const obj: any = {}
    if (message.text !== undefined) {
      obj.text = message.text
    }
    if (message.body !== undefined) {
      obj.body = MessageBody.toJSON(message.body)
    }
    if (message.status !== undefined) {
      obj.status = message.status
    }
    return obj
  },

  create<I extends Exact<DeepPartial<ExecuteResponse>, I>>(base?: I): ExecuteResponse {
    return ExecuteResponse.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<ExecuteResponse>, I>>(object: I): ExecuteResponse {
    const message = createBaseExecuteResponse()
    message.text = object.text ?? undefined
    message.body =
      object.body !== undefined && object.body !== null
        ? MessageBody.fromPartial(object.body)
        : undefined
    message.status = object.status ?? undefined
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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined
}
