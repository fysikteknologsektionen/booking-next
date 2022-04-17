import Link from 'next/link';

interface Props {
  resourceId: number;
  resourceType: string;
}

const TableOptionsButton: React.VFC<Props> = ({ resourceId, resourceType }) => (
  <div className="dropdown">
    <button
      className="btn btn-sm dropdown-toggle"
      type="button"
      id={`dropdown-toggle-${resourceId}`}
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <i className="bi bi-three-dots-vertical" />
    </button>
    <ul
      className="dropdown-menu"
      aria-labelledby={`dropdown-toggle-${resourceId}`}
    >
      <li>
        <Link href={`/dashboard/${resourceType}/${resourceId}/edit`}>
          <a className="dropdown-item">Edit</a>
        </Link>
      </li>
      <li>
        <Link href={`/dashboard/${resourceType}/${resourceId}/delete`}>
          <a className="dropdown-item text-danger">Delete</a>
        </Link>
      </li>
    </ul>
  </div>
);

export default TableOptionsButton;
