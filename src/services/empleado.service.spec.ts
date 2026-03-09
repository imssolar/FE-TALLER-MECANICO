import { empleadoService } from './empleado.service'
import api from './api'
import type { CreateEmpleadoDto } from '@/types/empleado'

vi.mock('./api')

const mockApi = vi.mocked(api)

describe('empleadoService', () => {
  afterEach(() => vi.restoreAllMocks())

  describe('getAll', () => {
    it('calls GET on the empleados endpoint and returns the data', async () => {
      const empleados = [{ id: 1, rut: '12345678-9', nombres: 'Juan' }]
      mockApi.get.mockResolvedValue({ data: empleados })

      const result = await empleadoService.getAll()

      expect(mockApi.get).toHaveBeenCalledWith(expect.stringContaining('/empleados'))
      expect(result).toEqual(empleados)
    })
  })

  describe('getById', () => {
    it('calls GET with the correct id URL', async () => {
      const empleado = { id: 3, rut: '33333333-3', nombres: 'Pedro' }
      mockApi.get.mockResolvedValue({ data: empleado })

      const result = await empleadoService.getById(3)

      expect(mockApi.get).toHaveBeenCalledWith(expect.stringContaining('/empleados/3'))
      expect(result).toEqual(empleado)
    })
  })

  describe('create', () => {
    it('calls POST with the DTO and returns the created empleado', async () => {
      const dto: CreateEmpleadoDto = {
        rut: '12345678-9',
        nombres: 'Juan',
        apellidoPaterno: 'Perez',
        apellidoMaterno: 'Soto',
        cargo: 'CONDUCTOR',
        fechaIngreso: '2025-01-01',
      }
      const created = { id: 1, ...dto }
      mockApi.post.mockResolvedValue({ data: created })

      const result = await empleadoService.create(dto)

      expect(mockApi.post).toHaveBeenCalledWith(expect.stringContaining('/empleados'), dto)
      expect(result).toEqual(created)
    })
  })

  describe('update', () => {
    it('calls PATCH with the id and update data', async () => {
      const updateData = { nombres: 'Juan Carlos' }
      const updated = { id: 1, ...updateData }
      mockApi.patch.mockResolvedValue({ data: updated })

      const result = await empleadoService.update(1, updateData)

      expect(mockApi.patch).toHaveBeenCalledWith(expect.stringContaining('/empleados/1'), updateData)
      expect(result).toEqual(updated)
    })
  })

  describe('delete', () => {
    it('calls DELETE with the correct URL', async () => {
      mockApi.delete.mockResolvedValue({})

      await empleadoService.delete(5)

      expect(mockApi.delete).toHaveBeenCalledWith(expect.stringContaining('/empleados/5'))
    })
  })
})
