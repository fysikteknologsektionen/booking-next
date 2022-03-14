import DashboardLayout from 'components/DashboardLayout';
import UserController from 'controllers/UserController';
import type { UserDocument } from 'models/UserModel';
import type { LeanDocument } from 'mongoose';
import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import type { ParsedUrlQuery } from 'querystring';

interface Props {
  user: LeanDocument<UserDocument>;
}

interface Query extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps<Props, Query> = async ({
  params,
}) => {
  try {
    if (params?.id) {
      const controller = new UserController();
      const user = await controller.delete(params.id);
      return {
        props: {
          user: JSON.parse(JSON.stringify(user)),
        },
      };
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(error);
    }
  }
  return {
    notFound: true,
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
