import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import {
  syncUserCreation,
  syncUserUpdation,
  syncUserDeletion,
} from "@/inngest/functions";


await inngest.send({
  // The event name
  name: "clerk/user.created",
  // The event's data
  data: {
    id: "ed12c8bde",
    itemIds: ["9f08sdh84", "sdf098487", "0fnun498n"],
    account: {
      id: 123,
      email: "[EMAIL_ADDRESS]",
    },
  },
});

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [syncUserCreation, syncUserUpdation, syncUserDeletion],
});
