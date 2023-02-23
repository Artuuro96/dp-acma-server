import { Injectable } from '@nestjs/common';
import { Role } from 'src/repository/entities/role.entity';
import { UserRole } from 'src/repository/entities/user-role.entity';
import { User } from 'src/repository/entities/user.entity';
import { UserRoleRepository } from 'src/repository/repositories/user-role/user-role.repository';

@Injectable()
export class UserRoleService {
  constructor(private readonly userRoleRepository: UserRoleRepository) {}

  async create(user: User, roles: Role[]): Promise<UserRole[]> {
    const userRoles = roles.map((role) => {
      const newUserRole = new UserRole({
        user,
        role,
      });
      return this.userRoleRepository.create(newUserRole);
    });

    return await Promise.all(userRoles);
  }
}
