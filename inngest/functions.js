import {inngest} from './client' 
import prisma from '../lib/prisma'

//Inngest function to save user data to db
export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-create", triggers: { event: "clerk/user.created" } },
  async ({ event, step }) => {
    const { data } = event;

    const user = {
      id: data.id,
      email: data.email_addresses[0].email_address,
      name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      image: data.image_url,
    };

    await step.run("Sync User to Database", async () => {
      await prisma.user.create({
        data: user,
      });
    });

    return { success: true };
  }
);

export const syncUserUpdation = inngest.createFunction(
  { id: "sync-user-update", triggers: { event: "clerk/user.updated" } },
  async ({ event, step }) => {
    const { data } = event;

    const userData = {
      email: data.email_addresses[0].email_address,
      name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      image: data.image_url,
    };

    await step.run("Update User in Database", async () => {
      await prisma.user.update({
        where: { id: data.id },
        data: userData,
      });
    });

    return { success: true };
  }
);

export const syncUserDeletion = inngest.createFunction(
  { id: "sync-user-delete", triggers: { event: "clerk/user.deleted" } },
  async ({ event, step }) => {
    const { data } = event;

    await step.run("Delete User from Database", async () => {
      await prisma.user.delete({
        where: { id: data.id },
      });
    });

    return { success: true };
  }
);
