export const roles = ["owner", "admin", "manager", "member", "viewer"] as const;
export type Role = (typeof roles)[number];

export const permissions = [
  "organizations:read",
  "organizations:write",
  "users:read",
  "users:write",
  "products:read",
  "products:write",
  "inventory:read",
  "inventory:write",
  "analytics:read",
  "audit:read"
] as const;
export type Permission = (typeof permissions)[number];

export const rolePermissions: Record<Role, readonly Permission[]> = {
  owner: permissions,
  admin: permissions.filter((permission) => permission !== "audit:read"),
  manager: ["organizations:read", "users:read", "products:read", "products:write", "inventory:read", "inventory:write", "analytics:read"],
  member: ["organizations:read", "products:read", "inventory:read"],
  viewer: ["organizations:read", "products:read", "inventory:read", "analytics:read"]
};

export function roleHasPermission(role: Role, permission: Permission): boolean {
  return rolePermissions[role].includes(permission);
}
