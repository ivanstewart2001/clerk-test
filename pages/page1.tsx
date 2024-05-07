import {
  GetServerSideProps,
  GetServerSidePropsContext,
  PreviewData,
} from "next";
import { routeValidation } from "../routeValidation";
import { ParsedUrlQuery } from "querystring";
import { useClerk } from "@clerk/nextjs";

function Page1(props: any) {
  console.log(props);

  const { signOut } = useClerk();

  async function handleSubmit() {
    const res = await fetch("http://192.168.1.185:4000/verifyToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: props.accessToken }),
    });
  }

  return (
    <div>
      <h1>Page 1</h1>

      <p>User ID: {JSON.stringify(props.userId)}</p>
      <p>Access Token: {JSON.stringify(props.accessToken)}</p>

      <button onClick={handleSubmit}>Verify Token</button>

      <button onClick={async () => await signOut()}>Logout</button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = routeValidation(
  async (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
    const accessToken = JSON.parse((context as any).accessToken);
    const userId = JSON.parse((context as any).userId);

    return {
      props: { accessToken, userId },
    };
  }
);

export default Page1;
