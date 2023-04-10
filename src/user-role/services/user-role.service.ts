import { Injectable } from '@nestjs/common';
import { Context } from 'src/auth/context/execution-ctx';
import { Role } from 'src/repository/entities/role.entity';
import { UserRole } from 'src/repository/entities/user-role.entity';
import { User } from 'src/repository/entities/user.entity';
import { UserRoleRepository } from 'src/repository/repositories/user-role/user-role.repository';
import { RoleService } from 'src/role/services/role.service';

@Injectable()
export class UserRoleService {
  constructor(
    private readonly userRoleRepository: UserRoleRepository,
    private readonly roleService: RoleService,
  ) {}

  async create(executionCtx: Context, user: User, roles: Role[]): Promise<UserRole[]> {
    const userRoles = roles.map((role) => {
      const newUserRole = new UserRole({
        user,
        role,
        createdAt: new Date(),
        createdBy: executionCtx.userId,
      });
      return this.userRoleRepository.create(newUserRole);
    });

    return await Promise.all(userRoles);
  }

  async assignByUserId(executionCtx: Context, user: User, roleNames: string[]): Promise<UserRole[]> {
    const rolesPromise = roleNames.map((role) => this.roleService.findByName(role));
    const rolesFound = await Promise.all(rolesPromise);

    await this.userRoleRepository.deleteByUserId(user.id);

    return await this.create(executionCtx, user, rolesFound);
  }
}
