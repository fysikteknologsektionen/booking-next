import { AbilityBuilder, Ability } from '@casl/ability';
import type { IncomingMessage } from 'http';
import { getSession } from 'next-auth/react';
import { UserRole } from 'src/models/UserModel';
import { getUserRoleById } from 'src/services/UserService';

export default async function defineAbility<T extends IncomingMessage>(req: T) {
  const session = await getSession({ req });

  const { can, build } = new AbilityBuilder(Ability);

  if (session) {
    const role = await getUserRoleById(session.user.id);
    switch (role) {
      case UserRole.USER:
        break;
      case UserRole.MANAGER:
        can(['read', 'update'], 'Venue', ['name', 'description', 'enabled'], { managers: session.user.id });
        break;
      case UserRole.ADMIN:
        can('manage', 'all');
        break;
      default:
    }
  }

  return build();
}
