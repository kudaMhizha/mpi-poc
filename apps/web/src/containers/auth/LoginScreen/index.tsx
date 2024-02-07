import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@mpi-app/ui';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {useSayHelloQuery} from 'generated-graphql'

function LoginScreen() {
  //State for dialog to be by opened and closed by DialogTrigger
  const [open, setOpen] = useState(false);

  const [email, setEmail] = useState('');

  const form = useForm({
    defaultValues: {identifier: '', password: '', email: ''},
  });

  const navigate = useNavigate();

  const onSubmit = async () => {
    navigate('/auth/dashboard');
  };
  // TODO: remove this, just for testing purposes.
  const { data, loading, error } = useSayHelloQuery({
    variables: {
    },
  });
  console.log('data', data, loading, error)

  return (
    <div>
      <Card className="w-[400px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Please enter your details below to log in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center w-full ">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                      <FormItem className="w-full">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            className="w-full"
                            placeholder="Password"
                            type={'password'}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="grid gap-2 py-4">
                <Button type="submit" className="flex gap-2 h-12">
                  <span>Login</span>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-5">
          <div className="text-sm text-gray-500">
            Need password reset? Click
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger className="text-blue-500">
                <span className="px-1">here</span>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="p-5">Password Reset</DialogTitle>
                  <DialogDescription className="p-5">
                    Enter your email address and we will send new password to
                    your e-mail.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex px-2 space-x-5 py-5">
                  <Input
                    type="email"
                    placeholder="name@domain.com"
                    onChange={e => setEmail(e.target.value)}
                  />
                  <Button disabled={email === ''}>Reset</Button>
                </div>
                <DialogTrigger className="w-full text-right pt-5 ">
                  <Button variant={'ghost'}>Cancel</Button>
                </DialogTrigger>
              </DialogContent>
            </Dialog>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginScreen;
