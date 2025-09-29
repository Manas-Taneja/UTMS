// Registry for different drones flying in the airspace ("slugs")
// Each slug maps to visual properties used by the Drone component

export const DRONE_SLUGS = {
  standard: { label: "Standard", color: "#1e3a8a" }, // blue
  delivery: { label: "Delivery", color: "#f59e0b" }, // amber-500
  surveillance: { label: "Surveillance", color: "#22d3ee" }, // cyan-400
  emergency: { label: "Emergency", color: "#ef4444" }, // red-500
  mapping: { label: "Mapping", color: "#22c55e" }, // green-500
  inspection: { label: "Inspection", color: "#64748b" }, // slate-500
};

export function getDroneStyle(slug) {
  if (!slug) return DRONE_SLUGS.standard;
  return DRONE_SLUGS[slug] || DRONE_SLUGS.standard;
}


