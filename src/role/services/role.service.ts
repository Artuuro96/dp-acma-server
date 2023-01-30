import { Injectable } from '@nestjs/common';
import { RoleDTO } from 'src/dtos/role.dto';
import { Role } from 'src/repository/entities/role.entity';
import { RoleRepository } from 'src/repository/repositories/role/role.repository';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async create(role: RoleDTO): Promise<Role> {
    const newRole = new Role({
      ...role,
      createdBy: 'Arturo',
      createdAt: new Date(),
    });
    return await this.roleRepository.create(newRole);
  }
}
