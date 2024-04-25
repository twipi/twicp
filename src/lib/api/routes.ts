import * as twid from "#/lib/proto/twid"

export const baseURL = "/api"

type protoMessage<T> =
  T extends Record<string, any>
    ? {
        fromJSON(obj: any): T
        toJSON(_: T): unknown
      }
    : undefined

// Route is a type that represents a route in the API.
export type Route<
  RequestT extends Record<string, any> | undefined = any,
  ResponseT extends Record<string, any> | undefined = any,
  RequestMessageT extends protoMessage<RequestT> = any,
  ResponseMessageT extends protoMessage<ResponseT> = any,
> = {
  method: string
  path: string
  requestType: RequestMessageT
  responseType: ResponseMessageT
}

// RequestType returns the request type of a route.
export type RequestTypeOf<T> = T extends Route<infer ReqT, any, any, any> ? ReqT : never

// ResponseType returns the response type of a route.
export type ResponseTypeOf<T> = T extends Route<any, infer RespT, any, any> ? RespT : never

export const loginPhase1: Route<
  twid.LoginPhase1Request,
  undefined,
  typeof twid.LoginPhase1Request,
  typeof undefined
> = {
  method: "POST",
  path: "/login/phase1",
  requestType: twid.LoginPhase1Request,
  responseType: undefined,
}

export const loginPhase2: Route<
  twid.LoginPhase2Request,
  twid.LoginResponse,
  typeof twid.LoginPhase2Request,
  typeof twid.LoginResponse
> = {
  method: "POST",
  path: "/login/phase2",
  requestType: twid.LoginPhase2Request,
  responseType: twid.LoginResponse,
}

export const listServices: Route<
  twid.ListServicesRequest,
  twid.ListServicesResponse,
  typeof twid.ListServicesRequest,
  typeof twid.ListServicesResponse
> = {
  method: "GET",
  path: "/",
  requestType: twid.ListServicesRequest,
  responseType: twid.ListServicesResponse,
}

export const getService: Route<
  twid.GetServiceRequest,
  twid.GetServiceResponse,
  typeof twid.GetServiceRequest,
  typeof twid.GetServiceResponse
> = {
  method: "GET",
  path: "/:name",
  requestType: twid.GetServiceRequest,
  responseType: twid.GetServiceResponse,
}

export const getControlPanel: Route<
  twid.GetControlPanelRequest,
  twid.GetControlPanelResponse,
  typeof twid.GetControlPanelRequest,
  typeof twid.GetControlPanelResponse
> = {
  method: "GET",
  path: "/:name/cp",
  requestType: twid.GetControlPanelRequest,
  responseType: twid.GetControlPanelResponse,
}
