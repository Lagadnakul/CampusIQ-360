const initialZones = [
  {
    name: "Central Library",
    location: "Academic Block",
    people: 84,
    capacity: 200,
    status: "Low Activity",
    statusType: "low",
  },
  {
    name: "Main Cafeteria",
    location: "Student Center",
    people: 312,
    capacity: 350,
    status: "Crowded",
    statusType: "high",
  },
  {
    name: "Computer Lab",
    location: "Technology Block",
    people: 118,
    capacity: 150,
    status: "Busy",
    statusType: "medium",
  },
  {
    name: "Campus Parking",
    location: "North Entrance",
    people: 267,
    capacity: 300,
    status: "Moderate",
    statusType: "medium",
  },
];

function getStatus(people, capacity) {
  const occupancy = people / capacity;

  if (occupancy >= 0.9) {
    return {
      status: "Crowded",
      statusType: "high",
    };
  }

  if (occupancy >= 0.65) {
    return {
      status: "Busy",
      statusType: "medium",
    };
  }

  return {
    status: "Low Activity",
    statusType: "low",
  };
}

export function generatePulseUpdate(previousZones) {
  return previousZones.map((zone) => {
    const variation = Math.floor(Math.random() * 11) - 5;

    let newPeople = zone.people + variation;

    newPeople = Math.max(
      0,
      Math.min(newPeople, zone.capacity)
    );

    const { status, statusType } = getStatus(
      newPeople,
      zone.capacity
    );

    return {
      ...zone,
      people: newPeople,
      status,
      statusType,
    };
  });
}

export function getInitialZones() {
  return initialZones;
}