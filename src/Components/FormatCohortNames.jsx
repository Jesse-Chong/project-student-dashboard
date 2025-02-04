export const formatCohortCode = (cohortCode) => {
  if (cohortCode.includes(" ")) {
    return cohortCode;
  }

  const season = cohortCode.slice(0, -4);
  const year = cohortCode.slice(-4);
  return `${season} ${year}`;
};

const FormatCohortNames = ({ studentsData, setSelectedCohort }) => {
  const handleCohortClick = (cohortCode) => {
    setSelectedCohort(cohortCode);
  };

  const sortedCohortCodes = [];
  studentsData.forEach((student) => {
    const formattedCode = formatCohortCode(student.cohort.cohortCode);
    if (!sortedCohortCodes.includes(formattedCode)) {
      sortedCohortCodes.push(formattedCode);
    }
  });

  sortedCohortCodes.sort((a, b) => {
    const seasonOrder = ["Winter", "Fall", "Summer", "Spring"];
    const seasonA = a.slice(0, -4);
    const seasonB = b.slice(0, -4);
    const yearA = parseInt(a.slice(-4));
    const yearB = parseInt(b.slice(-4));

    if (seasonOrder.indexOf(seasonA) !== seasonOrder.indexOf(seasonB)) {
      return seasonOrder.indexOf(seasonA) - seasonOrder.indexOf(seasonB);
    } else {
      return yearB - yearA;
    }
  });

  const handleAllStudentsClick = () => {
    setSelectedCohort("");
  };

  return (
    <div>
      <ul>
        <li onClick={handleAllStudentsClick} style={{ cursor: "pointer" }}>
          All Students
        </li>
        {sortedCohortCodes.map((cohortCode) => (
          <li
            key={cohortCode}
            onClick={() => handleCohortClick(cohortCode)}
            style={{ cursor: "pointer" }}
          >
            {formatCohortCode(cohortCode)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormatCohortNames;
