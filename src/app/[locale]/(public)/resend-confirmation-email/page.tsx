import Layout from "@/hoc/layout";
import ResendConfirmationEmailContainer from "@/containers/resend-confirmation-email/resend-confirmation-email";

export default function Login() {
    return (
        <Layout title="Resend confirmation email">
            <ResendConfirmationEmailContainer />
        </Layout>
    );
}