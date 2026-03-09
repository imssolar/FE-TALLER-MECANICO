import { AxiosError, type AxiosResponse } from 'axios'
import { getErrorMessage } from './get-error-message'

describe('getErrorMessage', () => {
  it('returns the fallback when error is not an AxiosError', () => {
    const result = getErrorMessage(new Error('random'), 'Algo salió mal')
    expect(result).toBe('Algo salió mal')
  })

  it('returns data.message when AxiosError has response.data.message', () => {
    const error = new AxiosError('fail', '400', undefined, undefined, {
      data: { message: 'RUT duplicado' },
      status: 400,
    } as AxiosResponse)

    expect(getErrorMessage(error, 'fallback')).toBe('RUT duplicado')
  })

  it('returns data.error when AxiosError has response.data.error but no message', () => {
    const error = new AxiosError('fail', '500', undefined, undefined, {
      data: { error: 'Internal server error' },
      status: 500,
    } as AxiosResponse)

    expect(getErrorMessage(error, 'fallback')).toBe('Internal server error')
  })

  it('returns fallback when AxiosError has no response data', () => {
    const error = new AxiosError('fail')
    expect(getErrorMessage(error, 'Sin conexión')).toBe('Sin conexión')
  })

  it('returns fallback for non-Error values', () => {
    expect(getErrorMessage('unexpected', 'Error desconocido')).toBe('Error desconocido')
  })
})
