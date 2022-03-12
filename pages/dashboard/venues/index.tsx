import DashboardLayout from '@components/DashboardLayout';
import type { VenueDocument } from '@models/VenueModel';
import type { LeanDocument } from 'mongoose';
import type { InferGetServerSidePropsType, NextPage } from 'next';
import Link from 'next/link';
import { indexVenues } from 'pages/api/venues';

export const getServerSideProps = async () => {
  const venues = await indexVenues({});
  return {
    props: {
      venues: JSON.parse(
        JSON.stringify(venues),
      ) as LeanDocument<VenueDocument>[],
    },
  };
};

const ViewVenues: NextPage<
InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ venues }) => (
  <DashboardLayout>
    <table className="table table-hover">
      <thead>
        <th scope="col">Name</th>
        <th scope="col">Managers</th>
        <th scope="col">Status</th>
      </thead>
      <tbody>
        {venues.map((venue) => (
          <Link key={venue._id} href={`/dashboard/venues/${venue._id}`} passHref>
            <tr style={{ cursor: 'pointer' }}>
              <td>{venue.name}</td>
              <td>{venue.managers}</td>
              <td>
                {venue.enabled ? (
                  <span className="text-success">Enabled</span>
                ) : (
                  <span className="text-danger">Disabled</span>
                )}
              </td>
            </tr>
          </Link>
        ))}
      </tbody>
    </table>
    <Link href="/dashboard/venues/create" passHref>
      <button className="btn btn-outline-primary" type="button">
        + Create new venue
      </button>
    </Link>
  </DashboardLayout>
);

export default ViewVenues;
