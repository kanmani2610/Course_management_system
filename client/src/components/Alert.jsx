export default function Alert({ alert }) {
  if (!alert) return null;
  return <div className={`alert alert-${alert.type}`}>{alert.message}</div>;
}
