// Sample drones in the airspace
// Each drone has: id, name, lat, lng, heading, altitude (m), speed (m/s), status, slug (visual style)

export const sampleDrones = [
  {
    id: "DRN-DEL-001",
    name: "Courier-Alpha",
    lat: 25.2048, // Dubai
    lng: 55.2708,
    heading: 110,
    altitude: 120,
    speed: 12,
    status: "En route",
    slug: "delivery",
    type: "Quad-copter",
    wings: 4,
    pilot: "Jane Doe"
  },
  {
    id: "DRN-SURV-014",
    name: "Watchtower",
    lat: 51.5072, // London
    lng: -0.1276,
    heading: 250,
    altitude: 200,
    speed: 8,
    status: "Patrolling",
    slug: "surveillance",
    type: "Fixed-wing",
    wings: 2,
    pilot: "John Smith"
  },
  {
    id: "DRN-EMR-911",
    name: "Medic-One",
    lat: 48.8566, // Paris
    lng: 2.3522,
    heading: 45,
    altitude: 150,
    speed: 15,
    status: "Responding",
    slug: "emergency",
    type: "Hexa-copter",
    wings: 6,
    pilot: "Will Johnson"
  },
  {
    id: "DRN-MAP-302",
    name: "Mapper",
    lat: 40.7128, // NYC
    lng: -74.0060,
    heading: 180,
    altitude: 100,
    speed: 5,
    status: "Surveying",
    slug: "mapping",
    type: "Fixed-wing",
    wings: 2,
    pilot: "James Brown"
  },
  {
    id: "DRN-STD-777",
    name: "Scout",
    lat: 28.6139, // Delhi
    lng: 77.2090,
    heading: 90,
    altitude: 130,
    speed: 10,
    status: "Hovering",
    slug: "standard",
    type: "Quad-copter",
    wings: 4,
    pilot: "Robert Davis"
  },
];


