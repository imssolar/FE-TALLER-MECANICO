import { renderHook, waitFor, act } from '@testing-library/react'
import { useEmpleados } from './useEmpleados'
import { empleadoService } from '@/services/empleado.service'
import { createWrapper } from '@/test/test-utils'
import type { Empleado } from '@/types/empleado'

vi.mock('@/services/empleado.service')

const mockEmpleados: Empleado[] = [
  {
    id: 1,
    rut: '11111111-1',
    nombres: 'Juan',
    apellidoPaterno: 'Perez',
    apellidoMaterno: 'Soto',
    nombreCompleto: 'Juan Perez Soto',
    cargo: 'CONDUCTOR',
    telefono: '+56912345678',
    activo: true,
    fechaIngreso: '2025-01-01',
    licenciaConducir: null,
    fechaVencimientoLicencia: null,
    talla: null,
    calzado: null,
    fechaNacimiento: null,
    estadoCivil: null,
    hijos: null,
    direccion: null,
    comuna: null,
    ciudad: null,
    telefono2: null,
    escolaridad: null,
    nacionalidad: null,
    tipoVisa: null,
    contactoEmergencia: null,
    fonoContactoEmergencia: null,
    parentesco: null,
    exTrabajador: false,
    observaciones: null,
    costo: null,
    taller: null,
  },
  {
    id: 2,
    rut: '22222222-2',
    nombres: 'Ana',
    apellidoPaterno: 'Lopez',
    apellidoMaterno: 'Diaz',
    nombreCompleto: 'Ana Lopez Diaz',
    cargo: 'MECANICO',
    telefono: null,
    activo: false,
    fechaIngreso: '2024-06-15',
    licenciaConducir: null,
    fechaVencimientoLicencia: null,
    talla: null,
    calzado: null,
    fechaNacimiento: null,
    estadoCivil: null,
    hijos: null,
    direccion: null,
    comuna: null,
    ciudad: null,
    telefono2: null,
    escolaridad: null,
    nacionalidad: null,
    tipoVisa: null,
    contactoEmergencia: null,
    fonoContactoEmergencia: null,
    parentesco: null,
    exTrabajador: false,
    observaciones: null,
    costo: null,
    taller: null,
  },
]

describe('useEmpleados', () => {
  beforeEach(() => {
    vi.mocked(empleadoService.getAll).mockResolvedValue(mockEmpleados)
  })

  afterEach(() => vi.restoreAllMocks())

  it('loads empleados from the service', async () => {
    const { result } = renderHook(() => useEmpleados(), { wrapper: createWrapper() })

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.filteredEmpleados).toHaveLength(2)
    expect(empleadoService.getAll).toHaveBeenCalledOnce()
  })

  it('filters empleados by name', async () => {
    const { result } = renderHook(() => useEmpleados(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    act(() => result.current.setSearch('juan'))

    expect(result.current.filteredEmpleados).toHaveLength(1)
    expect(result.current.filteredEmpleados[0].nombres).toBe('Juan')
  })

  it('filters empleados by RUT', async () => {
    const { result } = renderHook(() => useEmpleados(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    act(() => result.current.setSearch('22222222'))

    expect(result.current.filteredEmpleados).toHaveLength(1)
    expect(result.current.filteredEmpleados[0].rut).toBe('22222222-2')
  })

  it('filters empleados by cargo', async () => {
    const { result } = renderHook(() => useEmpleados(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    act(() => result.current.setSearch('mecanico'))

    expect(result.current.filteredEmpleados).toHaveLength(1)
    expect(result.current.filteredEmpleados[0].cargo).toBe('MECANICO')
  })

  it('opens create dialog with default values', async () => {
    const { result } = renderHook(() => useEmpleados(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.dialogOpen).toBe(false)

    act(() => result.current.openCreate())

    expect(result.current.dialogOpen).toBe(true)
    expect(result.current.editingEmpleado).toBeNull()
  })

  it('opens edit dialog with empleado data', async () => {
    const { result } = renderHook(() => useEmpleados(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    act(() => result.current.openEdit(mockEmpleados[0]))

    expect(result.current.dialogOpen).toBe(true)
    expect(result.current.editingEmpleado).toEqual(mockEmpleados[0])
  })

  it('closes dialog and resets state', async () => {
    const { result } = renderHook(() => useEmpleados(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    act(() => result.current.openCreate())
    expect(result.current.dialogOpen).toBe(true)

    act(() => result.current.closeDialog())
    expect(result.current.dialogOpen).toBe(false)
    expect(result.current.editingEmpleado).toBeNull()
  })
})
