import { Logo, FormRow } from '../components'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import {
  Link,
  Form,
  redirect,
  useNavigation,
  useActionData,
} from 'react-router-dom'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { SubmitBtn } from '../components'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  const errors = { msg: '' }
  if (data.password.length < 3) {
    errors.msg = 'password too short'
    return errors
  }
  try {
    await customFetch.post('/auth/login', data)
    toast.success('Login successful')
    return redirect('/dashboard')
  } catch (error) {
    errors.msg = error.response.data.msg
    return error
  }
}

const Login = () => {
  const errors = useActionData()
  const loginDemoUser = async () => {
    const data = {
      email: 'test@test.com',
      password: 'secret123',
    }
    try {
      await customFetch.post('/auth/login', data)
      toast.success('take a test')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error?.response?.data?.msg)
    }
  }
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        {errors && <p style={{ color: 'red' }}>{errors.msg}</p>}
        <FormRow type="email" name="email" defaultValue="testmern@gmail.com" />
        <FormRow type="password" name="password" defaultValue="12345678" />
        <SubmitBtn />
        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  )
}
export default Login
