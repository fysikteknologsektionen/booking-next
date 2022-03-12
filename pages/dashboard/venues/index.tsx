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
            <td>
              {venue.enabled ? (
                <span className="text-success">Enabled</span>
              ) : (
                <span className="text-danger">Disabled</span>
              )}
            </td>
            <td style={{ width: 0 }}>
              <Link href={`/dashboard/venues/${venue._id}`} passHref>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  type="button"
                >
                  View
                </button>
              </Link>
            </td>
          </tr>
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
