import { db } from "./db";
import { Users, users } from "./schema";

export async function insertUser(newUser: Users): Promise<Users[]> {
  const insertedUser = await db
    .insert(users)
    .values(newUser)
    .onConflictDoUpdate({
      target: users.id,
      set: {
        email: newUser.email,
        fullName: newUser.fullName,
        userName: newUser.userName,
        updatedAt: newUser.updatedAt,
      },
    })
    .returning();

  return insertedUser;
}
