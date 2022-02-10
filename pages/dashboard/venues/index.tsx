import DashboardLayout from '@components/DashboardLayout';
import dbConnect from '@lib/dbConnect';
import parseObjectId from '@lib/parseObjectId';
import VenueModel from '@models/VenueModel';
import type {
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Link from 'next/link';

export const getServerSideProps = async () => {
  await dbConnect();
  const venueDocs = await VenueModel.find().lean().exec();
  const venues = parseObjectId(venueDocs);
  return {
    props: {
      venues,
    },
  };
};

const ListVenues: NextPage<
InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ venues }) => (
  <DashboardLayout>
    <table className="table">
      <thead>
        <th scope="col">Name</th>
        <th scope="col">Managers</th>
        <th scope="col">Status</th>
        <th scope="col" aria-label="Edit" />
      </thead>
      <tbody>
        {venues.map((venue) => (
          <tr key={venue._id}>
            <td>{venue.name}</td>
            <td>{venue.managers}</td>
            <td>{venue.enabled ? <span className="text-success">Enabled</span> : <span className="text-danger">Disabled</span>}</td>
            <td style={{ width: 0 }}>
              <Link href={`/dashboard/venues/${venue._id}/edit`} passHref>
                <button className="btn btn-outline-secondary" type="button">Edit</button>
              </Link>

            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <Link href="/dashboard/venues/create" passHref>
      <button className="btn btn-outline-primary" type="button">+ Create new venue</button>
    </Link>
  </DashboardLayout>
);

export default ListVenues;
