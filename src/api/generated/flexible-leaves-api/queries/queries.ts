// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { DefaultService } from "../requests/services.gen";
import * as Common from "./common";
export const useDefaultServicePost2FaSetup = <TData = Common.DefaultServicePost2FaSetupMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, void, TContext>, "mutationFn">) => useMutation<TData, TError, void, TContext>({ mutationFn: () => DefaultService.post2FaSetup() as unknown as Promise<TData>, ...options });
export const useDefaultServicePost2FaVerifySetup = <TData = Common.DefaultServicePost2FaVerifySetupMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: { code: string; };
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: { code: string; };
}, TContext>({ mutationFn: ({ requestBody }) => DefaultService.post2FaVerifySetup({ requestBody }) as unknown as Promise<TData>, ...options });
export const useDefaultServicePost2FaRecover = <TData = Common.DefaultServicePost2FaRecoverMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: { email: string; };
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: { email: string; };
}, TContext>({ mutationFn: ({ requestBody }) => DefaultService.post2FaRecover({ requestBody }) as unknown as Promise<TData>, ...options });
export const useDefaultServicePost2FaConfirmRecover = <TData = Common.DefaultServicePost2FaConfirmRecoverMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: { token: string; };
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: { token: string; };
}, TContext>({ mutationFn: ({ requestBody }) => DefaultService.post2FaConfirmRecover({ requestBody }) as unknown as Promise<TData>, ...options });
export const useDefaultServicePostAuthSignup = <TData = Common.DefaultServicePostAuthSignupMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: { firstName: string; lastName: string; email: string; password: string; };
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: { firstName: string; lastName: string; email: string; password: string; };
}, TContext>({ mutationFn: ({ requestBody }) => DefaultService.postAuthSignup({ requestBody }) as unknown as Promise<TData>, ...options });
export const useDefaultServicePostAuthVerifySignup = <TData = Common.DefaultServicePostAuthVerifySignupMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: { token: string; };
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: { token: string; };
}, TContext>({ mutationFn: ({ requestBody }) => DefaultService.postAuthVerifySignup({ requestBody }) as unknown as Promise<TData>, ...options });
export const useDefaultServicePostAuthLogin = <TData = Common.DefaultServicePostAuthLoginMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: { email?: string; password?: string; };
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: { email?: string; password?: string; };
}, TContext>({ mutationFn: ({ requestBody }) => DefaultService.postAuthLogin({ requestBody }) as unknown as Promise<TData>, ...options });
export const useDefaultServicePostAuthLogout = <TData = Common.DefaultServicePostAuthLogoutMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, void, TContext>, "mutationFn">) => useMutation<TData, TError, void, TContext>({ mutationFn: () => DefaultService.postAuthLogout() as unknown as Promise<TData>, ...options });
export const useDefaultServicePostAuthRefresh = <TData = Common.DefaultServicePostAuthRefreshMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, void, TContext>, "mutationFn">) => useMutation<TData, TError, void, TContext>({ mutationFn: () => DefaultService.postAuthRefresh() as unknown as Promise<TData>, ...options });
export const useDefaultServicePostAuthResetPasswordRequest = <TData = Common.DefaultServicePostAuthResetPasswordRequestMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: { userEmail: string; };
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: { userEmail: string; };
}, TContext>({ mutationFn: ({ requestBody }) => DefaultService.postAuthResetPasswordRequest({ requestBody }) as unknown as Promise<TData>, ...options });
export const useDefaultServicePostAuthResetPassword = <TData = Common.DefaultServicePostAuthResetPasswordMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: { token: string; newPassword: string; };
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: { token: string; newPassword: string; };
}, TContext>({ mutationFn: ({ requestBody }) => DefaultService.postAuthResetPassword({ requestBody }) as unknown as Promise<TData>, ...options });
export const useDefaultServiceDelete2FaDisable = <TData = Common.DefaultServiceDelete2FaDisableMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, void, TContext>, "mutationFn">) => useMutation<TData, TError, void, TContext>({ mutationFn: () => DefaultService.delete2FaDisable() as unknown as Promise<TData>, ...options });
