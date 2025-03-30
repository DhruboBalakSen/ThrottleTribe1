interface PostParams {
  id: number,
  userId: string;
  content: string | null;
  imageUrl: string | null;
}

type UserProfileProps = {
  username: { username: string };
};