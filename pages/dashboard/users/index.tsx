import DashboardLayout from 'components/DashboardLayout';
import type { UserDocument } from 'models/UserModel';
import UserController from 'controllers/UserController';
import type { LeanDocument } from 'mongoose';
import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';

interface Props {
  users: LeanDocument<UserDocument>[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const controller = new UserController();
  const users = await controller.index();

  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
    },
  };
};

const ViewUsers: NextPage<Props> = ({ users }) => (
  <DashboardLayout>
    <table className="table table-hover align-middle">
      <thead>
        <th scope="col">Name</th>
        <th scope="col">E-mail</th>
        <th scope="col">Google ID</th>
        <th scope="col">Role</th>
        <th scope="col" aria-label="Options" />
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.googleId}</td>
            <td>{user.role}</td>
            <td style={{ width: 0 }}>
              <div className="dropdown">
                <button
                  className="btn btn-sm dropdown-toggle"
                  type="button"
                  id={`dropdown-toggle-${user._id}`}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-three-dots-vertical" />
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby={`dropdown-toggle-${user._id}`}
                >
                  <li>
                    <Link href={`/dashboard/users/${user._id}/edit`}>
                      <a className="dropdown-item">Edit</a>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/dashboard/users/${user._id}/delete`}>
                      <a className="dropdown-item text-danger">Delete</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </DashboardLayout>
);

export default ViewUsers;
