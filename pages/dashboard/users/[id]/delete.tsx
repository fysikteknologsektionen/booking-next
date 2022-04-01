import DashboardLayout from 'components/DashboardLayout';
import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import type { ParsedUrlQuery } from 'querystring';
import type { User } from 'src/models/UserModel';
import { getUserById } from 'src/services/UserService';

interface Props {
  user: User & { _id: string };
}

interface Query extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps<Props, Query> = async ({
  params,
}) => {
  if (!params?.id) {
    return {
      notFound: true,
    };
  }

  // TODO: Handle 404 errors
  const user = await getUserById(params.id);

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
};

const DeleteUser: NextPage<Props> = ({ user }) => {
  const router = useRouter();
  const deleteUser = async () => {
    const res = await fetch(`/api/users/${user._id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error(`Network error: ${res.status} ${res.statusText}`);
    }

    router.push('/dashboard/users');
  };

  return (
    <DashboardLayout>
      <p>Are you sure you want to want to delete the following user:</p>
      <p>
        Name:
        {' '}
        {user.name}
        <br />
        E-mail:
        {' '}
        {user.email}
        <br />
      </p>
      <p>
        Note that doing this will only remove the local record of the user, and
        the user can still log in with default permissions.
      </p>
      <button className="btn btn-danger" type="button" onClick={deleteUser}>
        Delete
      </button>
    </DashboardLayout>
  );
};

export default DeleteUser;
