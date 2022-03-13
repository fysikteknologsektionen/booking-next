interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.VFC<Props> = ({ children }) => (
  <main className="container">{children}</main>
);

export default DashboardLayout;
