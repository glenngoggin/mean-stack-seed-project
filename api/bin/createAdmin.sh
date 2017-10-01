db.createUser(
{
    user: "admin",
    pwd: "admin",
    roles: [
      { role: "userAdminAnyDatabase", db: "jsjobs" },
      { role: "readWrite", db: "jsjobs" }
    ]
});