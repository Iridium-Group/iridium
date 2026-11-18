export type StatusId = "stable" | "active" | "experimental" | "development" | "archived";

export interface StatusDefinition {
  id: StatusId;
  label: string;
  description: string;
}

export const STATUSES: readonly StatusDefinition[] = [
  {
    id: "stable",
    label: "Stable",
    description:
      "Released, documented, and versioned with care. Breaking changes follow a major version and a changelog entry.",
  },
  {
    id: "active",
    label: "Active",
    description:
      "In regular use and maintained. The public API is settling, but minor releases may still adjust it.",
  },
  {
    id: "experimental",
    label: "Experimental",
    description:
      "Working, tested code that is still being shaped. APIs and behavior can change between any two versions.",
  },
  {
    id: "development",
    label: "Development",
    description:
      "An early build or content project. It works for its stated purpose, but its scope and structure are still moving.",
  },
  {
    id: "archived",
    label: "Archived",
    description: "No longer maintained. Kept read-only for reference.",
  },
];

export function statusLabel(id: StatusId): string {
  return STATUSES.find((s) => s.id === id)?.label ?? id;
}
