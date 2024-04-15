import { auth } from "@clerk/nextjs";

export const checkSubscription = async () => {
const {userId}=auth();
}