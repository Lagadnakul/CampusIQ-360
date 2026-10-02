import "../styles/components/StatCard.css";

function StatCard({
  title,
  value,
  description,
  icon: Icon
}) {
  return (
    <div className="stat-card">

      <div className="stat-card-header">

        <p className="stat-card-title">
          {title}
        </p>

        <div className="stat-card-icon">
          <Icon size={20} />
        </div>

      </div>

      <h3 className="stat-card-value">
        {value}
      </h3>

      <p className="stat-card-description">
        {description}
      </p>

    </div>
  );
}

export default StatCard;