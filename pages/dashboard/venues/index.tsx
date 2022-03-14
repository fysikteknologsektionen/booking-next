import DashboardLayout from 'components/DashboardLayout';
import type { VenueDocument } from 'models/VenueModel';
import VenueController from 'controllers/VenueController';
import type { LeanDocument } from 'mongoose';
import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';

interface Props {
  venues: LeanDocument<VenueDocument>[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const controller = new VenueController();
  const venues = await controller.index();

  return {
    props: {
      venues: JSON.parse(JSON.stringify(venues)),
    },
  };
};

const ViewVenues: NextPage<Props> = ({ venues }) => (
  <DashboardLayout>
    <table className="table table-hover align-middle">
      <thead>
        <th scope="col">Name</th>
        <th scope="col">Description</th>
        <th scope="col">Managers</th>
        <th scope="col">Status</th>
        <th scope="col" aria-label="Options" />
      </thead>
      <tbody>
        {venues.map((venue) => (
          <tr key={venue._id}>
            <td>{venue.name}</td>
            <td>{venue.description}</td>
            <td>{venue.managers}</td>
            <td>
              {venue.enabled ? (
                <span className="text-success">Enabled</span>
              ) : (
                <span className="text-danger">Disabled</span>
              )}
            </td>
            <td style={{ width: 0 }}>
              <div className="dropdown">
                <button
                  className="btn btn-sm dropdown-toggle"
                  type="button"
                  id={`dropdown-toggle-${venue._id}`}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-three-dots-vertical" />
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby={`dropdown-toggle-${venue._id}`}
                >
                  <li>
                    <Link href={`/dashboard/venues/${venue._id}/edit`}>
                      <a className="dropdown-item">Edit</a>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/dashboard/venues/${venue._id}/delete`}>
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
    <Link href="/dashboard/venues/create" passHref>
      <button className="btn btn-outline-primary" type="button">
        + New
      </button>
    </Link>
  </DashboardLayout>
);

export default ViewVenues;
