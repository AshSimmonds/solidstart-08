import Layout from "~/components/Layout"
import PageTitle from "~/components/PageTitle"
import { createForm, Field, Form, minLength, required } from "@modular-forms/solid"

type LoginForm = {
    username: string
    password: string
}


function loginUserFake() {
    console.log(`loginUserFake`)
}


export default function ModularFormsPage() {

    const loginForm = createForm<LoginForm>()

    return (
        <Layout>
            <PageTitle>Modular Forms</PageTitle>
            <h1>Modular Forms</h1>

            <div class="alert alert-info"><a href="https://github.com/fabian-hiller/modular-forms" target="_blank">github.com/fabian-hiller/modular-forms</a></div>

            <h2>Login form</h2>
            <div id="xcomblueleft" data-augmented-ui="tr-2-clip-y br-clip b-clip-x bl-2-clip-x l-clip-y border 
" class="styleme p-12 mt-12">

                <Form of={loginForm} onSubmit={loginUserFake} >

                    <Field of={loginForm} name="username" validate={[
                        required("Username is required"),
                        minLength(3, "Username must be at least 3 characters long"),
                    ]}

                    >
                        {(field) => <input {...field.props} type="text" class="input input-bordered" />}
                    </Field>

                    <Field of={loginForm} name="password" validate={[
                        required("Password is required"),
                        minLength(3, "Password must be at least 3 characters long"),
                    ]}
                    >
                        {(field) => (
                            <>
                                <input {...field.props} type="password" class="input" />
                                {field.error && <div class="alert alert-warning">{field.error}</div>}
                            </>
                        )}
                    </Field>

                    <button type="submit">Login</button>
                </Form>
            </div>

        </Layout>
    )
}
